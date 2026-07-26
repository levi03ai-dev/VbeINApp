import { Howl } from "howler";
import { AppError, AudioPlaybackError, StreamNotFoundError } from "@/core/errors/app-error";
import type { Track } from "@/lib/music-data";
import { parseDurationToSeconds } from "@/lib/utils";

export type PlaybackState = {
  track: Track | null;
  isPlaying: boolean;
  isBuffering: boolean;
  progress: number; // 0..1
  duration: number; // in seconds
  volume: number; // 0..1
  isMuted: boolean;
  candidateIndex: number;
  totalCandidates: number;
  error: AppError | null;
};

export type PlaybackEvent =
  "play" | "pause" | "end" | "error" | "progress" | "buffering" | "trackChange" | "seek";

export type PlaybackListener = (state: PlaybackState, event: PlaybackEvent) => void;

export class AudioPlaybackManager {
  private static instance: AudioPlaybackManager;

  private sound: Howl | null = null;
  private currentTrack: Track | null = null;
  private candidateUrls: string[] = [];
  private currentCandidateIdx = 0;

  private isPlaying = false;
  private isBuffering = false;
  private progress = 0; // 0..1
  private duration = 0; // seconds
  private targetDuration = 180; // fallback duration
  private volume = 1.0;
  private isMuted = false;
  private lastError: AppError | null = null;

  private progressInterval: ReturnType<typeof setInterval> | null = null;
  private listeners: Set<PlaybackListener> = new Set();

  private constructor() {
    this.setupMediaSessionHandlers();

    // Adjust polling frequency based on page visibility for power efficiency
    if (typeof document !== "undefined") {
      document.addEventListener("visibilitychange", () => {
        if (this.isPlaying) {
          this.startProgressTicker();
        }
      });
    }
  }

  public static getInstance(): AudioPlaybackManager {
    if (!AudioPlaybackManager.instance) {
      AudioPlaybackManager.instance = new AudioPlaybackManager();
    }
    return AudioPlaybackManager.instance;
  }

  public subscribe(listener: PlaybackListener): () => void {
    this.listeners.add(listener);
    // Initial emit
    listener(this.getState(), "trackChange");
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify(event: PlaybackEvent): void {
    const currentState = this.getState();
    this.listeners.forEach((fn) => fn(currentState, event));
  }

  public getState(): PlaybackState {
    return {
      track: this.currentTrack,
      isPlaying: this.isPlaying,
      isBuffering: this.isBuffering,
      progress: this.progress,
      duration: this.duration,
      volume: this.volume,
      isMuted: this.isMuted,
      candidateIndex: this.currentCandidateIdx,
      totalCandidates: this.candidateUrls.length,
      error: this.lastError,
    };
  }

  /**
   * Immediately silences the active player and prepares state for the next track
   */
  public prepareTrack(track: Track): void {
    this.stopCurrentSound();
    this.currentTrack = track;
    this.isPlaying = true;
    this.isBuffering = true;
    this.progress = 0;
    const fallbackSec = parseDurationToSeconds(track.duration);
    this.targetDuration = fallbackSec > 0 ? fallbackSec : 180;
    this.duration = this.targetDuration;
    this.notify("trackChange");
  }

  /**
   * Main method to play a track with candidate stream URLs using Howler.js exclusively
   */
  public async loadAndPlay(
    track: Track,
    candidates: string[],
    initialProgress = 0,
    onTrackEnd?: () => void,
  ): Promise<void> {
    this.stopCurrentSound();

    this.currentTrack = track;
    this.candidateUrls = candidates;
    this.currentCandidateIdx = 0;
    this.lastError = null;

    const fallbackSec = parseDurationToSeconds(track.duration);
    this.targetDuration = fallbackSec > 0 ? fallbackSec : 180;
    this.duration = this.targetDuration;
    this.progress = Math.max(0, Math.min(1, initialProgress));
    this.isBuffering = true;
    this.isPlaying = true;

    this.updateMediaSession(track);
    this.notify("trackChange");

    if (!candidates || candidates.length === 0) {
      this.isPlaying = false;
      this.isBuffering = false;
      this.lastError = new StreamNotFoundError(
        track.title,
        `No stream source candidates available for "${track.title}"`,
      );
      this.notify("error");
      return;
    }

    this.tryPlayCandidate(track, this.currentCandidateIdx, initialProgress, onTrackEnd);
  }

  private tryPlayCandidate(
    track: Track,
    candidateIdx: number,
    initialProgress = 0,
    onTrackEnd?: () => void,
  ): void {
    if (candidateIdx >= this.candidateUrls.length) {
      this.isPlaying = false;
      this.isBuffering = false;
      this.lastError = new AudioPlaybackError(
        this.currentTrack?.title || "Unknown Track",
        `All ${this.candidateUrls.length} stream sources failed to load.`,
      );
      this.notify("error");
      return;
    }

    this.currentCandidateIdx = candidateIdx;
    const url = this.candidateUrls[candidateIdx];

    let soundFormat: string[] = ["mp3", "mp4", "m4a", "webm"];
    if (url.includes(".mp4") || url.includes(".m4a")) {
      soundFormat = ["mp4", "m4a", "mp3"];
    } else if (url.includes(".webm")) {
      soundFormat = ["webm", "mp3"];
    } else if (url.includes(".ogg")) {
      soundFormat = ["ogg", "mp3"];
    }

    const sound = new Howl({
      src: [url],
      format: soundFormat,
      html5: true,
      autoplay: true,
      preload: true,
      volume: this.isMuted ? 0 : this.volume,
      onload: () => {
        if (this.currentTrack?.id !== track.id) return;
        this.isBuffering = false;
        const dur = sound.duration();
        if (dur && isFinite(dur) && dur > 0) {
          this.duration = dur;
          this.targetDuration = dur;
          if (initialProgress > 0) {
            sound.seek(initialProgress * dur);
          }
        }
        this.notify("buffering");
      },
      onplay: () => {
        if (this.currentTrack?.id !== track.id) return;
        this.isPlaying = true;
        this.isBuffering = false;
        this.lastError = null;
        this.startProgressTicker();
        if ("mediaSession" in navigator) {
          navigator.mediaSession.playbackState = "playing";
        }
        this.notify("play");
      },
      onpause: () => {
        if (this.currentTrack?.id !== track.id) return;
        this.isPlaying = false;
        this.stopProgressTicker();
        if ("mediaSession" in navigator) {
          navigator.mediaSession.playbackState = "paused";
        }
        this.notify("pause");
      },
      onstop: () => {
        if (this.currentTrack?.id !== track.id) return;
        this.isPlaying = false;
        this.isBuffering = false;
        this.stopProgressTicker();
        this.notify("pause");
      },
      onend: () => {
        if (this.currentTrack?.id !== track.id) return;
        this.isPlaying = false;
        this.isBuffering = false;
        this.progress = 0;
        this.stopProgressTicker();
        this.notify("end");
        if (onTrackEnd) onTrackEnd();
      },
      onseek: () => {
        if (this.currentTrack?.id !== track.id) return;
        this.notify("seek");
      },
      onloaderror: (_id, err) => {
        if (this.currentTrack?.id !== track.id) return;
        try {
          sound.unload();
        } catch {
          /* ignore */
        }
        this.sound = null;
        // Fallback to next candidate
        this.tryPlayCandidate(track, candidateIdx + 1, initialProgress, onTrackEnd);
      },
      onplayerror: (_id, err) => {
        if (this.currentTrack?.id !== track.id) return;
        sound.once("unlock", () => {
          sound.play();
        });
      },
    });

    // Attach native HTML5 audio listeners for accurate buffering state and Android MediaSession optimization
    const node = (sound as unknown as { _sounds?: { _node?: unknown }[] })._sounds?.[0]?._node;
    if (node instanceof HTMLAudioElement) {
      node.crossOrigin = "anonymous";
      node.preload = "auto";
      (node as unknown as { playsInline?: boolean }).playsInline = true;

      node.addEventListener("waiting", () => {
        this.isBuffering = true;
        this.notify("buffering");
      });
      node.addEventListener("playing", () => {
        this.isBuffering = false;
        this.notify("buffering");
      });
      node.addEventListener("stalled", () => {
        this.isBuffering = true;
        this.notify("buffering");
      });
      node.addEventListener("error", () => {
        this.notify("error");
      });
    }

    this.sound = sound;
  }

  public getCurrentTime(): number {
    if (this.sound && this.sound.playing()) {
      const pos = this.sound.seek();
      return typeof pos === "number" ? pos : this.progress * this.duration;
    }
    return this.progress * this.duration;
  }

  public toggle(): void {
    if (!this.sound) return;
    if (this.isPlaying) {
      this.pause();
    } else {
      this.resume();
    }
  }

  public pause(): void {
    if (this.sound && this.sound.playing()) {
      this.sound.pause();
    } else {
      this.isPlaying = false;
      this.stopProgressTicker();
      this.notify("pause");
    }
  }

  public resume(): void {
    if (this.sound) {
      this.sound.play();
    }
  }

  public seek(percent: number): void {
    const clamped = Math.max(0, Math.min(1, percent));
    this.progress = clamped;
    if (this.sound && this.duration > 0) {
      const targetSec = clamped * this.duration;
      this.sound.seek(targetSec);
    }
    this.updatePositionState();
    this.notify("seek");
  }

  public setVolume(vol: number): void {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.sound && !this.isMuted) {
      this.sound.volume(this.volume);
    }
  }

  public setMute(muted: boolean): void {
    this.isMuted = muted;
    if (this.sound) {
      this.sound.volume(muted ? 0 : this.volume);
    }
  }

  public stopCurrentSound(clearTrack: boolean = false): void {
    this.stopProgressTicker();
    if (this.sound) {
      try {
        // Direct HTML5 Audio element cleanup to prevent Howler's background streaming leak bug!
        const node = (this.sound as unknown as { _sounds?: { _node?: unknown }[] })._sounds?.[0]
          ?._node;
        if (node instanceof HTMLAudioElement) {
          node.pause();
          node.src = "";
          node.load(); // Force release network and media resources
        }
        this.sound.stop();
        this.sound.unload();
      } catch {
        /* ignore */
      }
      this.sound = null;
    }
    this.isPlaying = false;
    this.isBuffering = false;
    if (clearTrack) {
      this.currentTrack = null;
      this.notify("trackChange");
    }
  }

  private startProgressTicker(): void {
    this.stopProgressTicker();

    // Adaptive interval polling: scale down frequency when backgrounded or display is off to optimize battery efficiency
    const isHidden = typeof document !== "undefined" && document.hidden;
    const intervalMs = isHidden ? 2500 : 250;

    this.progressInterval = setInterval(() => {
      if (!this.sound || !this.sound.playing()) return;
      const dur = this.sound.duration() || this.targetDuration;
      const pos = this.sound.seek();
      const currentSec = typeof pos === "number" ? pos : 0;
      if (dur > 0) {
        this.duration = dur;
        this.progress = Math.min(1, Math.max(0, currentSec / dur));
        this.updatePositionState();
        this.notify("progress");
      }
    }, intervalMs);
  }

  private stopProgressTicker(): void {
    if (this.progressInterval) {
      clearInterval(this.progressInterval);
      this.progressInterval = null;
    }
  }

  /**
   * Resolves absolute origin URL required for Android MediaSession artwork
   */
  private resolveAbsoluteOriginUrl(src?: string): string {
    if (!src) return "";
    try {
      if (typeof window !== "undefined") {
        return new URL(src, window.location.origin).href;
      }
      return src;
    } catch {
      return src;
    }
  }

  public updatePositionState(): void {
    if ("mediaSession" in navigator && "setPositionState" in navigator.mediaSession) {
      try {
        if (this.duration > 0) {
          const currentPos = Math.max(0, Math.min(this.duration, this.getCurrentTime()));
          navigator.mediaSession.setPositionState({
            duration: this.duration,
            playbackRate: 1.0,
            position: currentPos,
          });
        }
      } catch {
        // Ignore position state errors in background transitions
      }
    }
  }

  private updateMediaSession(track: Track): void {
    if ("mediaSession" in navigator) {
      try {
        const absoluteArtwork = this.resolveAbsoluteOriginUrl(track.coverUrl);
        navigator.mediaSession.metadata = new MediaMetadata({
          title: track.title,
          artist: track.artist || "Unknown Artist",
          album: track.album || "VibeIN",
          artwork: absoluteArtwork
            ? [
                { src: absoluteArtwork, sizes: "96x96", type: "image/jpeg" },
                { src: absoluteArtwork, sizes: "128x128", type: "image/jpeg" },
                { src: absoluteArtwork, sizes: "192x192", type: "image/jpeg" },
                { src: absoluteArtwork, sizes: "256x256", type: "image/jpeg" },
                { src: absoluteArtwork, sizes: "384x384", type: "image/jpeg" },
                { src: absoluteArtwork, sizes: "512x512", type: "image/jpeg" },
              ]
            : [],
        });
        this.updatePositionState();
      } catch (e) {
        // Ignore
      }
    }
  }

  private setupMediaSessionHandlers(): void {
    if ("mediaSession" in navigator) {
      try {
        navigator.mediaSession.setActionHandler("play", () => this.resume());
        navigator.mediaSession.setActionHandler("pause", () => this.pause());
        navigator.mediaSession.setActionHandler("seekto", (details) => {
          if (details.seekTime !== undefined && details.seekTime !== null && this.duration > 0) {
            this.seek(details.seekTime / this.duration);
          }
        });
        navigator.mediaSession.setActionHandler("seekbackward", (details) => {
          const skip = details.seekOffset || 10;
          if (this.duration > 0) {
            const cur = this.getCurrentTime();
            this.seek(Math.max(0, cur - skip) / this.duration);
          }
        });
        navigator.mediaSession.setActionHandler("seekforward", (details) => {
          const skip = details.seekOffset || 10;
          if (this.duration > 0) {
            const cur = this.getCurrentTime();
            this.seek(Math.min(this.duration, cur + skip) / this.duration);
          }
        });
        navigator.mediaSession.setActionHandler("stop", () => {
          this.pause();
        });
      } catch (e) {
        // Ignore
      }
    }
  }
}

export const globalAudioPlaybackManager = AudioPlaybackManager.getInstance();
