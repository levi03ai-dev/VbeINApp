import { topCharts, type Track } from "@/lib/music-data";
import { globalAudioPlaybackManager } from "./audio-playback-manager";
import { globalRecommendationValidator } from "../recommendation/validation/RecommendationValidator";
import { parseDurationToSeconds } from "@/lib/utils";
import { recommendationService } from "../recommendation";

export interface SynchronizedTrackState {
  currentTrack: Track | null;
  activeCoverUrl: string;
  activeStreamUrl: string;
  queue: Track[];
  currentIndex: number;
  isPlaying: boolean;
  isBuffering: boolean;
  isSyncing: boolean;
  error: string | null;
  repeatMode: "off" | "queue" | "one";
  shuffleActive: boolean;
}

export type MusicStateListener = (state: SynchronizedTrackState) => void;

export class MusicStateManager {
  private static instance: MusicStateManager;
  private static streamCache = new Map<string, string[]>();

  private currentTrack: Track | null = topCharts[0] || null;
  private activeCoverUrl = topCharts[0]?.coverUrl || "";
  private activeStreamUrl = "";
  private queue: Track[] = topCharts;
  private currentIndex = 0;
  private isPlaying = false;
  private isBuffering = false;
  private isSyncing = false;
  private lastError: string | null = null;
  private repeatMode: "off" | "queue" | "one" = "off";
  private shuffleActive = false;

  private currentPlaySessionId = 0;
  private listeners: Set<MusicStateListener> = new Set();

  private constructor() {
    // Listen to underlying audio manager events to keep in sync
    globalAudioPlaybackManager.subscribe((state) => {
      this.isPlaying = state.isPlaying;
      this.isBuffering = state.isBuffering;
      this.currentTrack = state.track;
      this.activeCoverUrl = state.track?.coverUrl || "";
      if (state.error) {
        this.lastError = state.error.message;
      }
      this.notifyListeners();
    });
  }

  public static getInstance(): MusicStateManager {
    if (!MusicStateManager.instance) {
      MusicStateManager.instance = new MusicStateManager();
    }
    return MusicStateManager.instance;
  }

  public subscribe(listener: MusicStateListener): () => void {
    this.listeners.add(listener);
    listener(this.getState());
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notifyListeners(): void {
    const currentState = this.getState();
    this.listeners.forEach((fn) => {
      try {
        fn(currentState);
      } catch (err) {
        console.error("MusicStateManager listener error:", err);
      }
    });
  }

  public getState(): SynchronizedTrackState {
    return {
      currentTrack: this.currentTrack,
      activeCoverUrl: this.activeCoverUrl,
      activeStreamUrl: this.activeStreamUrl,
      queue: this.queue,
      currentIndex: this.currentIndex,
      isPlaying: this.isPlaying,
      isBuffering: this.isBuffering,
      isSyncing: this.isSyncing,
      error: this.lastError,
      repeatMode: this.repeatMode,
      shuffleActive: this.shuffleActive,
    };
  }

  public getRepeatMode(): "off" | "queue" | "one" {
    return this.repeatMode;
  }

  public setRepeatMode(mode: "off" | "queue" | "one"): void {
    this.repeatMode = mode;
    this.notifyListeners();
  }

  public isShuffleActive(): boolean {
    return this.shuffleActive;
  }

  public setShuffleActive(active: boolean): void {
    this.shuffleActive = active;
    this.notifyListeners();
  }

  private async resolveStreamCandidates(t: Track): Promise<string[]> {
    const cached = MusicStateManager.streamCache.get(t.id);
    if (cached && cached.length > 0) {
      return cached;
    }

    const list: string[] = [];
    const push = (url: string) => {
      if (
        url &&
        !list.includes(url) &&
        !url.includes("/api/stream/resolve") &&
        !url.includes("/api/piped/stream") &&
        !url.includes("/api/invidious/stream")
      ) {
        list.push(url);
      }
    };

    if (t.audioUrl) {
      push(t.audioUrl);
    }

    // CRITICAL FAST PATH: If we already have a fully-resolved direct playback stream,
    // skip the slow backend stream resolution entirely! This avoids the 5-10s API delay.
    if (list.length > 0) {
      MusicStateManager.streamCache.set(t.id, list);
      return list;
    }

    try {
      const res = await fetch(
        `/api/stream/resolve?q=${encodeURIComponent(`${t.title} ${t.artist || ""}`.trim())}&id=${encodeURIComponent(t.id)}`,
      );
      if (res.ok) {
        const data = await res.json();
        if (data.audioUrl) {
          push(data.audioUrl);
        }
      }
    } catch (e) {
      console.warn("Stream resolution failed in MusicStateManager:", e);
    }

    if (list.length > 0) {
      MusicStateManager.streamCache.set(t.id, list);
    }
    return list;
  }

  /**
   * Synchronizes metadata, thumbnail URL, and audio stream for a target track atomically.
   * Instantly stops any current playback and updates state to buffering/loading for the new track.
   */
  public async playTrackSynchronized(
    rawTrack: Track,
    queueContext: Track[] = [],
    indexInQueue = 0,
  ): Promise<void> {
    const sessionId = ++this.currentPlaySessionId;
    this.isSyncing = true;
    this.lastError = null;

    // 1. Validate track and update metadata instantly
    const validation = await globalRecommendationValidator.validateTrackBeforePlayback(
      rawTrack,
      this.queue,
    );
    const trackToPlay = validation.validatedTrack;

    if (sessionId !== this.currentPlaySessionId) return;

    this.currentTrack = trackToPlay;
    this.activeCoverUrl = trackToPlay.coverUrl || "";
    this.isPlaying = true;
    this.isBuffering = true;

    // 2. Instantly stop old audio and prepare the play state
    globalAudioPlaybackManager.prepareTrack(trackToPlay);

    // 3. Update queue index immediately
    if (queueContext.length > 0) {
      this.queue = globalRecommendationValidator.deduplicateTracks(queueContext);
      const newIdx = this.queue.findIndex((t) => t.id === trackToPlay.id);
      this.currentIndex = newIdx >= 0 ? newIdx : indexInQueue;
    } else if (!this.queue.some((t) => t.id === trackToPlay.id)) {
      this.queue = globalRecommendationValidator.deduplicateTracks([...this.queue, trackToPlay]);
      this.currentIndex = this.queue.findIndex((t) => t.id === trackToPlay.id);
    }

    this.notifyListeners();

    try {
      // 4. Resolve verified playable candidates in the background
      const candidateList = await this.resolveStreamCandidates(trackToPlay);

      if (sessionId !== this.currentPlaySessionId) return;

      if (candidateList.length === 0) {
        this.isPlaying = false;
        this.isBuffering = false;
        this.lastError = `Unable to resolve audio stream for "${trackToPlay.title}"`;
        this.notifyListeners();
        return;
      }

      this.activeStreamUrl = candidateList[0];

      // 5. Initialize active audio stream play immediately
      await globalAudioPlaybackManager.loadAndPlay(trackToPlay, candidateList, 0, () => {
        this.handleTrackEnded();
      });
    } catch (err: unknown) {
      if (sessionId === this.currentPlaySessionId) {
        this.lastError = err instanceof Error ? err.message : "Synchronization failure";
        this.isPlaying = false;
        this.isBuffering = false;
        this.notifyListeners();
      }
    } finally {
      if (sessionId === this.currentPlaySessionId) {
        this.isSyncing = false;
        this.notifyListeners();
      }
    }
  }

  public setQueue(newQueue: Track[]): void {
    this.queue = globalRecommendationValidator.deduplicateTracks(newQueue);
    this.notifyListeners();
  }

  public async nextTrack(): Promise<void> {
    if (this.queue.length === 0) return;

    if (this.shuffleActive && this.queue.length > 1) {
      let randIdx = this.currentIndex;
      while (randIdx === this.currentIndex) {
        randIdx = Math.floor(Math.random() * this.queue.length);
      }
      const nextTrack = this.queue[randIdx];
      if (nextTrack) {
        await this.playTrackSynchronized(nextTrack, this.queue, randIdx);
      }
      return;
    }

    const isLast = this.currentIndex >= this.queue.length - 1;

    if (isLast) {
      if (this.repeatMode === "queue") {
        const nextTrack = this.queue[0];
        if (nextTrack) {
          await this.playTrackSynchronized(nextTrack, this.queue, 0);
        }
      } else if (this.repeatMode === "off") {
        // Auto Radio Feature: fetch next tracks
        try {
          const currentTrack = this.queue[this.currentIndex];
          const nextTracks = await recommendationService.getNextQueue(
            {
              currentTrackId: currentTrack?.id,
              currentTrackTitle: currentTrack?.title,
              currentArtistId: currentTrack?.artist,
              playedTrackIds: this.queue.map((t) => t.id),
            },
            10,
          );
          if (nextTracks && nextTracks.length > 0) {
            const uniqueNext = nextTracks.filter((nt) => !this.queue.some((q) => q.id === nt.id));
            if (uniqueNext.length > 0) {
              const newQueue = [...this.queue, ...uniqueNext];
              this.setQueue(newQueue);
              const nextIdx = this.currentIndex + 1;
              const nextTrack = newQueue[nextIdx];
              if (nextTrack) {
                await this.playTrackSynchronized(nextTrack, newQueue, nextIdx);
                return;
              }
            }
          }
        } catch (err) {
          console.error("AutoRadio error in MusicStateManager nextTrack", err);
        }

        // Fallback: loop back to beginning if no auto radio songs resolved
        const nextTrack = this.queue[0];
        if (nextTrack) {
          await this.playTrackSynchronized(nextTrack, this.queue, 0);
        }
      }
    } else {
      const nextIdx = this.currentIndex + 1;
      const nextTrack = this.queue[nextIdx];
      if (nextTrack) {
        await this.playTrackSynchronized(nextTrack, this.queue, nextIdx);
      }
    }
  }

  public previousTrack(): void {
    if (this.queue.length === 0) return;
    const prevIdx = (this.currentIndex - 1 + this.queue.length) % this.queue.length;
    const prevTrack = this.queue[prevIdx];
    if (prevTrack) {
      this.playTrackSynchronized(prevTrack, this.queue, prevIdx);
    }
  }

  public toggle(): void {
    globalAudioPlaybackManager.toggle();
  }

  public pause(): void {
    globalAudioPlaybackManager.pause();
  }

  public resume(): void {
    globalAudioPlaybackManager.resume();
  }

  public seek(percent: number): void {
    globalAudioPlaybackManager.seek(percent);
  }

  private handleTrackEnded(): void {
    if (this.repeatMode === "one" && this.currentTrack) {
      this.playTrackSynchronized(this.currentTrack, this.queue, this.currentIndex);
    } else {
      this.nextTrack();
    }
  }
}

export const globalMusicStateManager = MusicStateManager.getInstance();
