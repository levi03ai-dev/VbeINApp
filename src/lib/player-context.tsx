import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { topCharts, normalizeSongInfo, type Track, type Album } from "./music-data";
import { getRecommendations } from "./music-service";
import { stopPreview } from "./preview-audio";
import { Haptics } from "./haptics";
import { toast } from "sonner";
import { parseDurationToSeconds } from "@/lib/utils";
import { globalAudioPlaybackManager } from "@/features/music/services/audio-playback-manager";
import { globalMusicStateManager } from "@/features/music/services/MusicStateManager";
import {
  globalPlayerSyncHandler,
  type PlayerSyncEvent,
  type PlayerEventType,
} from "@/features/music/services/PlayerSyncHandler";
import { globalRecommendationValidator } from "@/features/music/recommendation/validation/RecommendationValidator";
import { recommendationService } from "@/features/music/recommendation";
import { normalizeError, AppError } from "@/core/errors/app-error";

type PlayerState = {
  track: Track | null;
  queue: Track[];
  currentIndex: number;
  isPlaying: boolean;
  isBuffering: boolean;
  progress: number; // 0..1
  duration: number; // in seconds
  nowPlayingOpen: boolean;
  setTrack: (t: Track | null) => void;
  toggle: () => void;
  pause: () => void;
  next: () => void;
  prev: () => void;
  repeatMode: "off" | "queue" | "one";
  toggleRepeat: () => void;
  shuffleActive: boolean;
  toggleShuffle: () => void;
  playAt: (index: number) => void;
  removeAt: (index: number) => void;
  moveItem: (from: number, to: number) => void;
  openNowPlaying: () => void;
  closeNowPlaying: () => void;
  setQueue: React.Dispatch<React.SetStateAction<Track[]>>;
  sleepTimerRemaining: number | null;
  setSleepTimer: (minutes: number | null) => void;
  addToPlayNext: (t: Track) => void;
  addToQueue: (t: Track) => void;
  seek: (p: number) => void;
  toggleFavorite: (t: Track | string) => void;
  isFavorite: (id: string | Track | null | undefined) => boolean;
  likedTracks: Track[];
  savedTracks: Track[];
  toggleSaveTrack: (t: Track | string) => void;
  isTrackSaved: (id: string | Track | null | undefined) => boolean;
  savedAlbums: Album[];
  toggleSaveAlbum: (a: Album) => void;
  isAlbumSaved: (id: string) => boolean;
  recentlyPlayed: Track[];
  listeningTimeSeconds: number;
  totalTracksPlayed: number;
};

const Ctx = createContext<PlayerState | null>(null);

const APP_NAME = "VibeIN";

export function isSameSong(a: Track | null | undefined, b: Track | null | undefined): boolean {
  if (!a || !b) return false;
  if (a.id && b.id && a.id === b.id) return true;

  const infoA = normalizeSongInfo(a.title, a.artist);
  const infoB = normalizeSongInfo(b.title, b.artist);

  if (infoA.key && infoB.key && infoA.key === infoB.key) {
    return true;
  }

  const [titleA, artA] = infoA.key.split("::");
  const [titleB, artB] = infoB.key.split("::");

  if (titleA && titleB && titleA === titleB) {
    if (!artA || !artB || artA.includes(artB) || artB.includes(artA)) {
      return true;
    }
  }

  return false;
}

export function PlayerProvider({ children }: { children: ReactNode }) {
  const [queue, setQueue] = useState<Track[]>(topCharts);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);
  const [nowPlayingOpen, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  const howlRef = useRef<Howl | null>(null);
  const progressRef = useRef<number>(0);
  const targetDurationRef = useRef<number>(180);

  const candidatesRef = useRef<string[]>([]);
  const candidateIdxRef = useRef<number>(0);
  const currentTrackRef = useRef<Track | null>(null);

  const lastSkipTimeRef = useRef<number>(0);
  const consecutiveSkipsRef = useRef<number>(0);

  const lastControlClickRef = useRef<number>(0);

  const checkThrottle = useCallback((cooldown = 400) => {
    const now = Date.now();
    if (now - lastControlClickRef.current < cooldown) {
      return false; // Throttled
    }
    lastControlClickRef.current = now;
    return true;
  }, []);

  const [sleepTimerRemaining, setSleepTimerRemaining] = useState<number | null>(null);
  const [savedAlbums, setSavedAlbums] = useState<Album[]>([]);
  const timerIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const [repeatMode, setRepeatMode] = useState<"off" | "queue" | "one">(() => globalMusicStateManager.getRepeatMode());
  const [shuffleActive, setShuffleActive] = useState<boolean>(() => globalMusicStateManager.isShuffleActive());

  // Real-time app data state
  const [likedTracks, setLikedTracks] = useState<Track[]>(topCharts.slice(0, 3));
  const [savedTracks, setSavedTracks] = useState<Track[]>(topCharts.slice(3, 7));
  const [recentlyPlayed, setRecentlyPlayed] = useState<Track[]>(topCharts.slice(0, 4));
  const [listeningTimeSeconds, setListeningTimeSeconds] = useState<number>(4820);
  const [totalTracksPlayed, setTotalTracksPlayed] = useState<number>(42);

  const nextRef = useRef<(() => void) | null>(null);
  const prevRef = useRef<(() => void) | null>(null);

  // Hydrate from localStorage on client mount
  useEffect(() => {
    try {
      const vl = localStorage.getItem("melody_stream_liked_tracks");
      if (vl) setLikedTracks(JSON.parse(vl));
      const vs = localStorage.getItem("melody_stream_saved_tracks");
      if (vs) setSavedTracks(JSON.parse(vs));
      const vr = localStorage.getItem("melody_stream_recently_played");
      if (vr) {
        const rp = JSON.parse(vr);
        setRecentlyPlayed(rp);
        setQueue(rp);
        if (
          rp.length > 0 &&
          (!currentTrackRef.current || currentTrackRef.current.id === topCharts[0].id)
        ) {
          setActiveTrack(rp[0]);
          currentTrackRef.current = rp[0];
        }
      }
    } catch {
      /* ignore */
    }
  }, []);

  const stopHowl = useCallback(() => {
    if (howlRef.current) {
      try {
        howlRef.current.unload();
      } catch {
        /* ignore */
      }
      howlRef.current = null;
    }
  }, []);

  useEffect(() => {
    try {
      const savedAlbumsData = localStorage.getItem("melody_stream_saved_albums");
      if (savedAlbumsData) {
        try {
          setSavedAlbums(JSON.parse(savedAlbumsData));
        } catch (e) {
          /* ignore */
        }
      }
      const savedLiked = localStorage.getItem("melody_stream_liked_tracks");
      if (savedLiked) {
        const parsed = JSON.parse(savedLiked);
        if (Array.isArray(parsed)) setLikedTracks(parsed);
      }

      const savedSaved = localStorage.getItem("melody_stream_saved_tracks");
      if (savedSaved) {
        const parsed = JSON.parse(savedSaved);
        if (Array.isArray(parsed)) setSavedTracks(parsed);
      }

      const savedRecent = localStorage.getItem("melody_stream_recently_played");
      if (savedRecent) {
        const parsed = JSON.parse(savedRecent);
        if (Array.isArray(parsed)) setRecentlyPlayed(parsed);
      }

      const savedTime = localStorage.getItem("melody_stream_listening_time");
      if (savedTime) {
        const t = parseInt(savedTime, 10);
        if (!isNaN(t)) setListeningTimeSeconds(t);
      }

      const savedPlays = localStorage.getItem("melody_stream_total_plays");
      if (savedPlays) {
        const p = parseInt(savedPlays, 10);
        if (!isNaN(p)) setTotalTracksPlayed(p);
      }
    } catch {
      /* ignore */
    }
  }, []);

  // Sync Howler audio playback position in real-time with requestAnimationFrame
  useEffect(() => {
    if (!isPlaying) return;

    let rafId: number;
    let lastUpdate = 0;

    const tick = () => {
      const state = globalAudioPlaybackManager.getState();
      const currentSec = globalAudioPlaybackManager.getCurrentTime();
      const dur = state.duration || targetDurationRef.current;

      if (dur > 0) {
        const now = Date.now();
        // Update React state at most once per 100ms for smooth slider and metadata display
        if (now - lastUpdate >= 100) {
          setDuration(dur);
          const p = Math.min(1, Math.max(0, currentSec / dur));
          setProgress(p);
          progressRef.current = p;
          lastUpdate = now;
        }
      }
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [isPlaying]);

  // Track listening time with adaptive background polling for battery efficiency
  useEffect(() => {
    if (!isPlaying) return;

    let lastTick = Date.now();

    const updateListeningTime = () => {
      const now = Date.now();
      const deltaSec = Math.floor((now - lastTick) / 1000);
      if (deltaSec >= 1) {
        lastTick = now;
        setListeningTimeSeconds((prev) => {
          const nextSec = prev + deltaSec;
          try {
            localStorage.setItem("melody_stream_listening_time", String(nextSec));
          } catch {
            /* ignore */
          }
          return nextSec;
        });
      }
    };

    // Use adaptive polling: 1000ms when visible, 5000ms when backgrounded
    const getInterval = () => (typeof document !== "undefined" && document.hidden ? 5000 : 1000);

    let intervalId = setInterval(updateListeningTime, getInterval());

    const handleVisibilityChange = () => {
      clearInterval(intervalId);
      updateListeningTime();
      intervalId = setInterval(updateListeningTime, getInterval());
    };

    if (typeof document !== "undefined") {
      document.addEventListener("visibilitychange", handleVisibilityChange);
    }

    return () => {
      clearInterval(intervalId);
      if (typeof document !== "undefined") {
        document.removeEventListener("visibilitychange", handleVisibilityChange);
      }
    };
  }, [isPlaying]);

  // Subscribe to central MusicStateManager
  useEffect(() => {
    const unsubscribe = globalMusicStateManager.subscribe((state) => {
      requestAnimationFrame(() => {
        setIsPlaying(state.isPlaying);
        setIsBuffering(state.isBuffering);

        setActiveTrack(state.currentTrack);
        currentTrackRef.current = state.currentTrack;

        if (state.queue && state.queue.length > 0) {
          setQueue(state.queue);
        }

        setCurrentIndex(state.currentIndex);
        setRepeatMode(state.repeatMode);
        setShuffleActive(state.shuffleActive);

        if (state.error) {
          toast.error(state.error);
        }
      });
    });
    return unsubscribe;
  }, []);

  // Save liked tracks
  useEffect(() => {
    try {
      localStorage.setItem("melody_stream_liked_tracks", JSON.stringify(likedTracks));
    } catch {
      /* ignore */
    }
  }, [likedTracks]);

  // Save saved tracks
  useEffect(() => {
    try {
      localStorage.setItem("melody_stream_saved_tracks", JSON.stringify(savedTracks));
    } catch {
      /* ignore */
    }
  }, [savedTracks]);

  // Save recently played
  useEffect(() => {
    try {
      localStorage.setItem("melody_stream_recently_played", JSON.stringify(recentlyPlayed));
    } catch {
      /* ignore */
    }
  }, [recentlyPlayed]);

  const [activeTrack, setActiveTrack] = useState<Track | null>(topCharts[0]);
  const track = activeTrack;

  const resolveStreamCandidates = async (t: Track): Promise<string[]> => {
    const list: string[] = [];
    const push = (rawUrl?: string) => {
      if (!rawUrl) return;
      let finalUrl = rawUrl;
      if (finalUrl.startsWith("http") && !finalUrl.includes("/api/proxy/audio")) {
        let ext = "mp3";
        if (finalUrl.includes(".mp4") || finalUrl.includes(".m4a") || finalUrl.includes(".aac")) {
          ext = "mp4";
        } else if (finalUrl.includes(".webm")) {
          ext = "webm";
        } else if (finalUrl.includes(".ogg")) {
          ext = "ogg";
        }
        finalUrl = `/api/proxy/audio.${ext}?url=${encodeURIComponent(finalUrl)}`;
      }
      if (!list.includes(finalUrl)) {
        list.push(finalUrl);
      }
    };

    if (
      t.audioUrl &&
      !t.audioUrl.startsWith("/api/stream/resolve") &&
      !t.audioUrl.startsWith("/api/piped/stream") &&
      !t.audioUrl.startsWith("/api/invidious/stream")
    ) {
      push(t.audioUrl);
    }

    try {
      const res = await fetch(
        `/api/stream/resolve?q=${encodeURIComponent(t.title + " " + t.artist)}&id=${encodeURIComponent(t.id)}`,
      );
      if (res.ok) {
        const data = await res.json();
        if (data.audioUrl) push(data.audioUrl);
      }
    } catch (e) {
      const err = normalizeError(e, "Stream resolution failed");
      console.warn(err.getUserMessage());
    }

    if (t.id && (t.id.startsWith("piped_") || t.id.startsWith("invidious_"))) {
      const cleanVid = t.id.replace(/^(piped_|invidious_)/, "");
      push(`/api/piped/stream?id=${cleanVid}`);
      push(`/api/invidious/stream?id=${cleanVid}`);
    }

    return list;
  };

  const play = useCallback(
    async (t: Track | null, resumeProgress = 0) => {
      if (!t) return;

      // Cross-reference track metadata with validation layer before playback
      const validation = await globalRecommendationValidator.validateTrackBeforePlayback(t, queue);
      const validTrack = validation.validatedTrack;

      requestAnimationFrame(() => {
        setActiveTrack(validTrack);
      });
      currentTrackRef.current = validTrack;
      Haptics.doublePulse();
      stopPreview();

      // Anti rapid loop safeguard
      const now = Date.now();
      if (now - lastSkipTimeRef.current < 600) {
        consecutiveSkipsRef.current += 1;
      } else {
        consecutiveSkipsRef.current = 0;
      }
      lastSkipTimeRef.current = now;

      if (consecutiveSkipsRef.current > 4) {
        globalMusicStateManager.pause();
        consecutiveSkipsRef.current = 0;
        toast.info("Playback paused. Please select a song to continue.");
        return;
      }

      setRecentlyPlayed((prev) => {
        const filtered = prev.filter((item) => item.id !== validTrack.id);
        return [validTrack, ...filtered].slice(0, 50);
      });

      setTotalTracksPlayed((prev) => {
        const nextVal = prev + 1;
        try {
          localStorage.setItem("melody_stream_total_plays", String(nextVal));
        } catch {
          /* ignore */
        }
        return nextVal;
      });

      const fallbackDurSec = parseDurationToSeconds(validTrack.duration);
      setDuration(fallbackDurSec > 0 ? fallbackDurSec : 180);
      setProgress(resumeProgress);

      // Play via high-priority state manager singleton
      await globalMusicStateManager.playTrackSynchronized(validTrack, queue, currentIndex);
    },
    [queue, currentIndex],
  );

  const pause = useCallback(() => {
    Haptics.light();
    stopPreview();
    globalMusicStateManager.pause();
  }, []);

  const toggle = useCallback(() => {
    if (!checkThrottle(300)) return;
    Haptics.light();
    const state = globalMusicStateManager.getState();
    if (state.currentTrack) {
      globalMusicStateManager.toggle();
    } else if (track) {
      play(track, progressRef.current);
    } else if (queue.length > 0 && queue[0]) {
      play(queue[0], 0);
    }
  }, [track, queue, play, checkThrottle]);

  const setTrack = useCallback(
    (t: Track | null) => {
      if (t !== null && !checkThrottle(400)) return;
      if (!t) {
        pause();
        setActiveTrack(null);
        currentTrackRef.current = null;
        globalAudioPlaybackManager.stopCurrentSound(true);
        return;
      }

      if (currentTrackRef.current && isSameSong(currentTrackRef.current, t)) {
        toggle();
        return;
      }

      setActiveTrack(t);
      currentTrackRef.current = t;
      const idx = queue.findIndex((x) => x && isSameSong(x, t));
      if (idx >= 0) {
        setCurrentIndex(idx);
        play(queue[idx], 0);
      } else {
        setQueue((q) => [t, ...q.filter((x) => !isSameSong(x, t))]);
        setCurrentIndex(0);
        play(t, 0);
      }
    },
    [play, pause, toggle, queue, checkThrottle],
  );

  const seek = useCallback(
    (p: number) => {
      setProgress(p);
      progressRef.current = p;
      const state = globalAudioPlaybackManager.getState();
      if (state.track) {
        globalAudioPlaybackManager.seek(p);
      } else if (track) {
        play(track, p);
      }
    },
    [track, play],
  );

  const setSleepTimer = useCallback((minutes: number | null) => {
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current as unknown as number);
      timerIntervalRef.current = null;
    }

    if (minutes === null) {
      setSleepTimerRemaining(null);
      toast.success("Sleep timer cancelled");
      return;
    }

    const seconds = minutes * 60;
    setSleepTimerRemaining(seconds);
    toast.success(`Sleep timer set for ${minutes} minute${minutes > 1 ? "s" : ""}`);

    timerIntervalRef.current = setInterval(() => {
      setSleepTimerRemaining((prev) => {
        if (prev === null || prev <= 1) {
          clearInterval(timerIntervalRef.current as unknown as number);
          timerIntervalRef.current = null;

          stopPreview();
          globalAudioPlaybackManager.pause();

          toast.info("Sleep timer ended. Playback stopped.");
          return null;
        }
        return prev - 1;
      });
    }, 1000);
  }, []);

  useEffect(() => {
    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current as unknown as number);
      }
    };
  }, []);

  const playAt = useCallback(
    (index: number) => {
      if (!checkThrottle(400)) return;
      setCurrentIndex(index);
      const t = queue[index];
      if (t) play(t);
    },
    [play, queue, checkThrottle],
  );

  // Auto-fetch recommendations
  const [isFetchingReco, setIsFetchingReco] = useState(false);
  useEffect(() => {
    if (track && queue.length > 0 && currentIndex >= queue.length - 2 && !isFetchingReco) {
      setIsFetchingReco(true);
      getRecommendations(track.id)
        .then((recos) => {
          if (recos.length > 0) {
            // Filter by language if present
            let filteredRecos = recos;
            if (track.language) {
              const trackLang = track.language.toLowerCase();
              filteredRecos = recos.filter(
                (r) => !r.language || r.language.toLowerCase() === trackLang,
              );
              if (filteredRecos.length === 0) filteredRecos = recos; // Fallback if too strict
            }

            setQueue((prev) => {
              const newTracks = filteredRecos.filter((r) => !prev.some((p) => isSameSong(p, r)));
              if (newTracks.length > 0) {
                return [...prev, ...newTracks];
              }
              return prev;
            });
          }
        })
        .catch(console.error)
        .finally(() => {
          setIsFetchingReco(false);
        });
    }
  }, [track, currentIndex, queue.length, isFetchingReco]);

  const next = useCallback(async () => {
    if (!checkThrottle(400)) return;
    await globalMusicStateManager.nextTrack();
  }, [checkThrottle]);

  useEffect(() => {
    nextRef.current = next;
  }, [next]);

  const prev = useCallback(() => {
    if (!checkThrottle(400)) return;
    globalMusicStateManager.previousTrack();
  }, [checkThrottle]);

  useEffect(() => {
    prevRef.current = prev;
  }, [prev]);

  useEffect(() => {
    if ("mediaSession" in navigator) {
      if (track) {
        const getAbsoluteArtworkUrl = (url?: string) => {
          if (!url) return "";
          try {
            if (typeof window !== "undefined") {
              return new URL(url, window.location.origin).href;
            }
            return url;
          } catch {
            return url;
          }
        };

        const artworkUrl = getAbsoluteArtworkUrl(track.coverUrl);

        navigator.mediaSession.metadata = new MediaMetadata({
          title: track.title,
          artist: track.artist || "Unknown Artist",
          album: track.album || APP_NAME,
          artwork: artworkUrl
            ? [
                { src: artworkUrl, sizes: "96x96", type: "image/jpeg" },
                { src: artworkUrl, sizes: "128x128", type: "image/jpeg" },
                { src: artworkUrl, sizes: "192x192", type: "image/jpeg" },
                { src: artworkUrl, sizes: "256x256", type: "image/jpeg" },
                { src: artworkUrl, sizes: "384x384", type: "image/jpeg" },
                { src: artworkUrl, sizes: "512x512", type: "image/jpeg" },
              ]
            : [],
        });

        navigator.mediaSession.setActionHandler("play", () => {
          if (!isPlaying) toggle();
        });
        navigator.mediaSession.setActionHandler("pause", () => {
          if (isPlaying) toggle();
        });
        navigator.mediaSession.setActionHandler("previoustrack", () => {
          prevRef.current?.();
        });
        navigator.mediaSession.setActionHandler("nexttrack", () => {
          nextRef.current?.();
        });
        navigator.mediaSession.setActionHandler("seekto", (details) => {
          if (details.seekTime !== undefined && duration > 0) {
            seek(details.seekTime / duration);
          }
        });
        navigator.mediaSession.setActionHandler("seekbackward", (details) => {
          const skip = details.seekOffset || 10;
          if (duration > 0) {
            seek(Math.max(0, (progress * duration - skip) / duration));
          }
        });
        navigator.mediaSession.setActionHandler("seekforward", (details) => {
          const skip = details.seekOffset || 10;
          if (duration > 0) {
            seek(Math.min(1, (progress * duration + skip) / duration));
          }
        });
        try {
          navigator.mediaSession.setActionHandler("stop", () => {
            pause();
          });
        } catch {
          /* ignore */
        }
      } else {
        navigator.mediaSession.metadata = null;
      }
    }
  }, [track, isPlaying, toggle, duration, seek, progress, pause]);

  useEffect(() => {
    if ("mediaSession" in navigator && isPlaying && duration > 0) {
      try {
        navigator.mediaSession.setPositionState({
          duration: duration,
          playbackRate: 1,
          position: progress * duration,
        });
      } catch (e) {
        // Ignore
      }
    }
  }, [isPlaying, duration, track]);

  useEffect(() => {
    return () => {
      stopPreview();
      globalAudioPlaybackManager.stopCurrentSound();
    };
  }, []);

  const removeAt = useCallback((index: number) => {
    Haptics.light();
    setQueue((q) => {
      if (q.length <= 1) return q;
      const nq = q.filter((_, i) => i !== index);
      setCurrentIndex((ci) => {
        if (index < ci) return ci - 1;
        if (index === ci) return Math.min(ci, nq.length - 1);
        return ci;
      });
      return nq;
    });
  }, []);

  const moveItem = useCallback((from: number, to: number) => {
    Haptics.light();
    setQueue((q) => {
      if (from === to || from < 0 || to < 0 || from >= q.length || to >= q.length) return q;
      const nq = q.slice();
      const [item] = nq.splice(from, 1);
      nq.splice(to, 0, item);
      setCurrentIndex((ci) => {
        if (ci === from) return to;
        if (from < ci && to >= ci) return ci - 1;
        if (from > ci && to <= ci) return ci + 1;
        return ci;
      });
      return nq;
    });
  }, []);

  const addToPlayNext = useCallback(
    (t: Track) => {
      if (!t) return;
      Haptics.light();
      setQueue((q) => {
        if (isSameSong(q[currentIndex], t)) return q;

        const filtered = q.filter((x) => !isSameSong(x, t));
        const currentTrack = q[currentIndex];
        let nextIndex = currentTrack ? filtered.findIndex((x) => isSameSong(x, currentTrack)) : 0;
        if (nextIndex === -1) {
          nextIndex = 0;
        }
        const nq = [...filtered];
        nq.splice(nextIndex + 1, 0, t);
        setCurrentIndex(nextIndex);
        return nq;
      });
      toast.success(`"${t.title}" will play next`);
    },
    [currentIndex],
  );

  const addToQueue = useCallback(
    (t: Track) => {
      if (!t) return;
      Haptics.light();
      setQueue((q) => {
        const filtered = q.filter((x) => !isSameSong(x, t));
        const currentTrack = q[currentIndex];
        let nextIndex = currentTrack ? filtered.findIndex((x) => isSameSong(x, currentTrack)) : 0;
        if (nextIndex === -1) nextIndex = 0;
        setCurrentIndex(nextIndex);
        return [...filtered, t];
      });
      toast.success(`Added "${t.title}" to queue`);
    },
    [currentIndex],
  );

  const isFavorite = useCallback(
    (input: string | Track | null | undefined) => {
      if (!input) return false;
      if (typeof input === "string") {
        return likedTracks.some(
          (t) =>
            t.id === input ||
            (currentTrackRef.current &&
              currentTrackRef.current.id === input &&
              isSameSong(t, currentTrackRef.current)),
        );
      }
      return likedTracks.some((t) => t.id === input.id || isSameSong(t, input));
    },
    [likedTracks],
  );

  const toggleFavorite = useCallback(
    (input: Track | string) => {
      Haptics.medium();
      let targetTrack: Track | null = null;
      if (typeof input === "object" && input) {
        targetTrack = input;
      } else if (typeof input === "string") {
        if (currentTrackRef.current && currentTrackRef.current.id === input) {
          targetTrack = currentTrackRef.current;
        } else {
          targetTrack =
            queue.find((t) => t.id === input) ||
            recentlyPlayed.find((t) => t.id === input) ||
            likedTracks.find((t) => t.id === input) ||
            topCharts.find((t) => t.id === input) ||
            currentTrackRef.current;
        }
      }

      if (!targetTrack) return;

      setLikedTracks((prev) => {
        const exists = prev.some((t) => t.id === targetTrack!.id || isSameSong(t, targetTrack!));
        if (exists) {
          toast.info(`Removed "${targetTrack!.title}" from Liked Songs`);
          return prev.filter((t) => t.id !== targetTrack!.id && !isSameSong(t, targetTrack!));
        } else {
          toast.success(`Added "${targetTrack!.title}" to Liked Songs`);
          return [targetTrack!, ...prev];
        }
      });
    },
    [queue, recentlyPlayed, likedTracks],
  );

  const isTrackSaved = useCallback(
    (input: string | Track | null | undefined) => {
      if (!input) return false;
      if (typeof input === "string") {
        return savedTracks.some(
          (t) =>
            t.id === input ||
            (currentTrackRef.current &&
              currentTrackRef.current.id === input &&
              isSameSong(t, currentTrackRef.current)),
        );
      }
      return savedTracks.some((t) => t.id === input.id || isSameSong(t, input));
    },
    [savedTracks],
  );

  const toggleSaveTrack = useCallback(
    (input: Track | string) => {
      Haptics.medium();
      let targetTrack: Track | null = null;
      if (typeof input === "object" && input) {
        targetTrack = input;
      } else if (typeof input === "string") {
        if (currentTrackRef.current && currentTrackRef.current.id === input) {
          targetTrack = currentTrackRef.current;
        } else {
          targetTrack =
            queue.find((t) => t.id === input) ||
            recentlyPlayed.find((t) => t.id === input) ||
            savedTracks.find((t) => t.id === input) ||
            topCharts.find((t) => t.id === input) ||
            currentTrackRef.current;
        }
      }

      if (!targetTrack) return;

      setSavedTracks((prev) => {
        const exists = prev.some((t) => t.id === targetTrack!.id || isSameSong(t, targetTrack!));
        if (exists) {
          toast.info(`Removed "${targetTrack!.title}" from Saved Songs`);
          return prev.filter((t) => t.id !== targetTrack!.id && !isSameSong(t, targetTrack!));
        } else {
          toast.success(`Saved "${targetTrack!.title}" to Saved Songs`);
          return [targetTrack!, ...prev];
        }
      });
    },
    [queue, recentlyPlayed, savedTracks],
  );

  const isAlbumSaved = useCallback(
    (id: string) => savedAlbums.some((a) => a.id === id),
    [savedAlbums],
  );

  const toggleSaveAlbum = useCallback((album: Album) => {
    setSavedAlbums((prev) => {
      const exists = prev.some((a) => a.id === album.id);
      let next;
      if (exists) {
        next = prev.filter((a) => a.id !== album.id);
        toast.success(`Removed "${album.title}" from Library`);
      } else {
        next = [album, ...prev];
        toast.success(`Saved "${album.title}" to Library`);
      }
      localStorage.setItem("melody_stream_saved_albums", JSON.stringify(next));
      return next;
    });
  }, []);

  const toggleRepeat = useCallback(() => {
    Haptics.light();
    setRepeatMode((prev) => {
      let nextMode: "off" | "queue" | "one" = "off";
      if (prev === "off") nextMode = "queue";
      else if (prev === "queue") nextMode = "one";
      globalMusicStateManager.setRepeatMode(nextMode);
      return nextMode;
    });
  }, []);

  const toggleShuffle = useCallback(() => {
    Haptics.light();
    setShuffleActive((prev) => {
      const nextVal = !prev;
      globalMusicStateManager.setShuffleActive(nextVal);
      return nextVal;
    });
  }, []);

  return (
    <Ctx.Provider
      value={{
        track,
        queue,
        currentIndex,
        isPlaying,
        isBuffering,
        progress,
        duration,
        nowPlayingOpen,
        setTrack,
        toggle,
        pause,
        next,
        prev,
        repeatMode,
        toggleRepeat,
        shuffleActive,
        toggleShuffle,
        playAt,
        removeAt,
        moveItem,
        openNowPlaying: () => {
          Haptics.light();
          setOpen(true);
        },
        closeNowPlaying: () => {
          Haptics.light();
          setOpen(false);
        },
        setQueue,
        sleepTimerRemaining,
        setSleepTimer,
        toggleFavorite,
        isFavorite,
        savedTracks,
        toggleSaveTrack,
        isTrackSaved,
        addToPlayNext,
        addToQueue,
        seek,
        likedTracks,
        savedAlbums,
        toggleSaveAlbum,
        isAlbumSaved,
        recentlyPlayed,
        listeningTimeSeconds,
        totalTracksPlayed,
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export function usePlaybackProgress() {
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    return globalAudioPlaybackManager.subscribe((state) => {
      setProgress(state.progress);
      if (state.duration > 0) {
        setDuration(state.duration);
      }
    });
  }, []);

  return { progress, duration };
}

export function usePlayerSync(callback?: (event: PlayerSyncEvent) => void) {
  const [syncEvent, setSyncEvent] = useState<PlayerSyncEvent>(() =>
    globalPlayerSyncHandler.getSnapshot(),
  );
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  useEffect(() => {
    const unsub = globalPlayerSyncHandler.subscribe((evt) => {
      // Avoid re-rendering React component tree on high-frequency "progress" and "seek" events
      if (evt.type !== "progress" && evt.type !== "seek") {
        setSyncEvent(evt);
      }
      if (callbackRef.current) {
        callbackRef.current(evt);
      }
    });
    return unsub;
  }, []);

  return syncEvent;
}

export function usePlayerEvent(
  eventType: PlayerEventType,
  callback: (event: PlayerSyncEvent) => void,
) {
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  useEffect(() => {
    const unsub = globalPlayerSyncHandler.subscribeToEvent(eventType, (evt) => {
      if (callbackRef.current) {
        callbackRef.current(evt);
      }
    });
    return unsub;
  }, [eventType]);
}

const defaultPlayerState: PlayerState = {
  track: null,
  queue: [],
  currentIndex: 0,
  isPlaying: false,
  isBuffering: false,
  progress: 0,
  duration: 0,
  nowPlayingOpen: false,
  setTrack: () => {},
  toggle: () => {},
  pause: () => {},
  next: () => {},
  prev: () => {},
  repeatMode: "off",
  toggleRepeat: () => {},
  shuffleActive: false,
  toggleShuffle: () => {},
  playAt: () => {},
  removeAt: () => {},
  moveItem: () => {},
  openNowPlaying: () => {},
  closeNowPlaying: () => {},
  setQueue: () => {},
  sleepTimerRemaining: null,
  setSleepTimer: () => {},
  addToPlayNext: () => {},
  addToQueue: () => {},
  seek: () => {},
  toggleFavorite: () => {},
  isFavorite: () => false,
  likedTracks: [],
  savedTracks: [],
  toggleSaveTrack: () => {},
  isTrackSaved: () => false,
  savedAlbums: [],
  toggleSaveAlbum: () => {},
  isAlbumSaved: () => false,
  recentlyPlayed: [],
  listeningTimeSeconds: 0,
  totalTracksPlayed: 0,
};

export function usePlayer() {
  const v = useContext(Ctx);
  return v || defaultPlayerState;
}
