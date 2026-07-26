import type { Track } from "@/lib/music-data";
import { globalAudioPlaybackManager, type PlaybackEvent } from "./audio-playback-manager";
import { globalMusicStateManager } from "./MusicStateManager";

export type PlayerEventType =
  "play" | "pause" | "trackChange" | "progress" | "buffering" | "seek" | "end" | "error";

export interface PlayerSyncEvent {
  type: PlayerEventType;
  track: Track | null;
  isPlaying: boolean;
  isBuffering: boolean;
  progress: number; // 0..1
  duration: number; // in seconds
  timestamp: number; // performance.now() high-res time
  error: string | null;
}

export type PlayerSyncListener = (event: PlayerSyncEvent) => void;

export class PlayerSyncHandler {
  private static instance: PlayerSyncHandler;

  private listeners: Set<PlayerSyncListener> = new Set();
  private eventSpecificListeners: Map<PlayerEventType, Set<PlayerSyncListener>> = new Map();

  private lastEvent: PlayerSyncEvent;

  private constructor() {
    this.lastEvent = {
      type: "pause",
      track: null,
      isPlaying: false,
      isBuffering: false,
      progress: 0,
      duration: 0,
      timestamp: typeof performance !== "undefined" ? performance.now() : Date.now(),
      error: null,
    };

    // Bind audio playback manager event emissions
    globalAudioPlaybackManager.subscribe((state, event) => {
      this.handlePlaybackEvent(event, state);
    });

    // Bind music state manager
    globalMusicStateManager.subscribe((syncState) => {
      if (syncState.currentTrack && syncState.currentTrack !== this.lastEvent.track) {
        this.emit("trackChange", {
          track: syncState.currentTrack,
          isPlaying: syncState.isPlaying,
          isBuffering: syncState.isBuffering,
          error: syncState.error,
        });
      }
    });
  }

  public static getInstance(): PlayerSyncHandler {
    if (!PlayerSyncHandler.instance) {
      PlayerSyncHandler.instance = new PlayerSyncHandler();
    }
    return PlayerSyncHandler.instance;
  }

  private handlePlaybackEvent(
    event: PlaybackEvent,
    state: ReturnType<typeof globalAudioPlaybackManager.getState>,
  ): void {
    const mappedType: PlayerEventType = (event as PlayerEventType) || "progress";
    this.emit(mappedType, {
      track: state.track,
      isPlaying: state.isPlaying,
      isBuffering: state.isBuffering,
      progress: state.progress,
      duration: state.duration,
      error: state.error ? state.error.message : null,
    });
  }

  public emit(type: PlayerEventType, payload: Partial<PlayerSyncEvent> = {}): void {
    const now = typeof performance !== "undefined" ? performance.now() : Date.now();
    const event: PlayerSyncEvent = {
      ...this.lastEvent,
      ...payload,
      type,
      timestamp: now,
    };

    this.lastEvent = event;

    // Dispatch to general listeners
    this.listeners.forEach((fn) => {
      try {
        fn(event);
      } catch (err) {
        console.error("PlayerSyncHandler dispatch error:", err);
      }
    });

    // Dispatch to event-specific listeners
    const specific = this.eventSpecificListeners.get(type);
    if (specific) {
      specific.forEach((fn) => {
        try {
          fn(event);
        } catch (err) {
          console.error(`PlayerSyncHandler dispatch error for ${type}:`, err);
        }
      });
    }
  }

  public subscribe(listener: PlayerSyncListener): () => void {
    this.listeners.add(listener);
    // Send immediate snapshot on subscription for sync alignment
    listener(this.lastEvent);
    return () => {
      this.listeners.delete(listener);
    };
  }

  public subscribeToEvent(type: PlayerEventType, listener: PlayerSyncListener): () => void {
    if (!this.eventSpecificListeners.has(type)) {
      this.eventSpecificListeners.set(type, new Set());
    }
    this.eventSpecificListeners.get(type)!.add(listener);
    return () => {
      const set = this.eventSpecificListeners.get(type);
      if (set) {
        set.delete(listener);
      }
    };
  }

  public getSnapshot(): PlayerSyncEvent {
    return { ...this.lastEvent };
  }
}

export const globalPlayerSyncHandler = PlayerSyncHandler.getInstance();
