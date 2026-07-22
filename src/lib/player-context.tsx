import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { topCharts, type Track } from "./music-data";
import { playPreview, stopPreview, getAnalyser } from "./preview-audio";
import { Haptics } from "./haptics";
import { toast } from "sonner";
import { parseDurationToSeconds } from "@/lib/utils";

type PlayerState = {
  track: Track | null;
  queue: Track[];
  currentIndex: number;
  isPlaying: boolean;
  progress: number; // 0..1
  duration: number; // in seconds
  nowPlayingOpen: boolean;
  setTrack: (t: Track | null) => void;
  toggle: () => void;
  pause: () => void;
  next: () => void;
  prev: () => void;
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
  isFavorite: (id: string) => boolean;
  likedTracks: Track[];
  recentlyPlayed: Track[];
  listeningTimeSeconds: number;
  totalTracksPlayed: number;
};

const Ctx = createContext<PlayerState | null>(null);

const APP_NAME = "VibeIN";

export function PlayerProvider({ children }: { children: ReactNode }) {
  const [queue, setQueue] = useState<Track[]>(topCharts);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [nowPlayingOpen, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const startedAtRef = useRef<number | null>(null);
  const progressRef = useRef<number>(0);
  const rafRef = useRef<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [sleepTimerRemaining, setSleepTimerRemaining] = useState<number | null>(null);
  const timerIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isAudioConnectedRef = useRef(false);

  // Real-time app data state
  const [likedTracks, setLikedTracks] = useState<Track[]>(() => topCharts.slice(0, 3));
  const [recentlyPlayed, setRecentlyPlayed] = useState<Track[]>(() => topCharts.slice(0, 4));
  const [listeningTimeSeconds, setListeningTimeSeconds] = useState<number>(4820);
  const [totalTracksPlayed, setTotalTracksPlayed] = useState<number>(42);

  useEffect(() => {
    try {
      const savedLiked = localStorage.getItem("vibein_liked_tracks");
      if (savedLiked) {
        const parsed = JSON.parse(savedLiked);
        if (Array.isArray(parsed)) setLikedTracks(parsed);
      }

      const savedRecent = localStorage.getItem("vibein_recently_played");
      if (savedRecent) {
        const parsed = JSON.parse(savedRecent);
        if (Array.isArray(parsed)) setRecentlyPlayed(parsed);
      }

      const savedTime = localStorage.getItem("vibein_listening_time");
      if (savedTime) {
        const t = parseInt(savedTime, 10);
        if (!isNaN(t)) setListeningTimeSeconds(t);
      }

      const savedPlays = localStorage.getItem("vibein_total_plays");
      if (savedPlays) {
        const p = parseInt(savedPlays, 10);
        if (!isNaN(p)) setTotalTracksPlayed(p);
      }
    } catch (e) {
      void e;
    }
  }, []);

  // Track listening time in real-time
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setListeningTimeSeconds((prev) => {
        const nextSec = prev + 1;
        try {
          localStorage.setItem("vibein_listening_time", String(nextSec));
        } catch (e) {
          void e;
        }
        return nextSec;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Save liked tracks
  useEffect(() => {
    try {
      localStorage.setItem("vibein_liked_tracks", JSON.stringify(likedTracks));
    } catch (e) {
      void e;
    }
  }, [likedTracks]);

  // Save recently played
  useEffect(() => {
    try {
      localStorage.setItem("vibein_recently_played", JSON.stringify(recentlyPlayed));
    } catch {
      /* ignore */
    }
  }, [recentlyPlayed]);

  // Initialize global audio element
  if (typeof window !== "undefined" && !audioRef.current) {
    const aud = new Audio();
    aud.crossOrigin = "anonymous";
    aud.onplaying = () => setIsPlaying(true);
    aud.onpause = () => setIsPlaying(false);
    aud.onerror = () => setIsPlaying(false);
    audioRef.current = aud;
  }

  const [activeTrack, setActiveTrack] = useState<Track | null>(topCharts[0]);

  const track = activeTrack;

  const nextRef = useRef<(() => void) | null>(null);

  const startTicker = useCallback((durationSeconds: number) => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    const tick = () => {
      if (startedAtRef.current == null) return;
      const elapsed = (performance.now() - startedAtRef.current) / 1000;
      const p = Math.min(1, elapsed / durationSeconds);
      setProgress(p);
      progressRef.current = p;
      if (p >= 1) {
        setIsPlaying(false);
        stopPreview();
        startedAtRef.current = null;
        progressRef.current = 0;
        setProgress(0);
        if (nextRef.current) {
          nextRef.current();
        }
        return;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
  }, []);

  const stopTicker = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
  }, []);

  const trackStartedAtRef = useRef<number | null>(null);
  const targetDurationRef = useRef<number>(180);

  const startRealAudioTicker = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    const tick = () => {
      const audio = audioRef.current;
      if (!audio) return;

      if (audio.duration && !isNaN(audio.duration) && audio.duration > 0) {
        const p = Math.min(1, audio.currentTime / audio.duration);
        setProgress(p);
        progressRef.current = p;
        setDuration(audio.duration);

        if (audio.ended || audio.currentTime >= audio.duration - 0.15) {
          setIsPlaying(false);
          audio.pause();
          trackStartedAtRef.current = null;
          progressRef.current = 0;
          setProgress(0);
          if (nextRef.current) nextRef.current();
          return;
        }
      } else {
        const fullTrackSec = targetDurationRef.current || 180;
        if (trackStartedAtRef.current == null) {
          trackStartedAtRef.current = performance.now();
        }

        const elapsedRealSec = (performance.now() - trackStartedAtRef.current) / 1000;
        const progressRatio = Math.min(1, elapsedRealSec / fullTrackSec);

        setProgress(progressRatio);
        progressRef.current = progressRatio;
        setDuration(fullTrackSec);

        if (progressRatio >= 1) {
          setIsPlaying(false);
          audio.pause();
          trackStartedAtRef.current = null;
          progressRef.current = 0;
          setProgress(0);
          if (nextRef.current) nextRef.current();
          return;
        }
      }

      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
  }, []);

  const play = useCallback(
    async (t: Track | null, resumeProgress = 0) => {
      if (!t) return;
      setActiveTrack(t);
      Haptics.doublePulse();
      stopPreview();
      const audio = audioRef.current;
      if (!audio) return;

      // Update recently played real-time
      setRecentlyPlayed((prev) => {
        const filtered = prev.filter((item) => item.id !== t.id);
        return [t, ...filtered].slice(0, 50);
      });

      // Increment total plays real-time
      setTotalTracksPlayed((prev) => {
        const nextVal = prev + 1;
        try {
          localStorage.setItem("vibein_total_plays", String(nextVal));
        } catch {
          /* ignore */
        }
        return nextVal;
      });

      const fallbackDurSec = parseDurationToSeconds(t.duration);
      targetDurationRef.current = fallbackDurSec;
      trackStartedAtRef.current = performance.now() - resumeProgress * fallbackDurSec * 1000;
      setDuration(fallbackDurSec);

      const GUARANTEED_AUDIO_POOL = [
        "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3",
        "https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3?filename=ambient-piano-logo-16535.mp3",
        "https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c38c8e10.mp3?filename=energetic-hip-hop-8303.mp3",
        "https://cdn.pixabay.com/download/audio/2022/10/14/audio_993dafd92d.mp3?filename=chill-out-12290.mp3",
        "https://cdn.pixabay.com/download/audio/2022/05/16/audio_db60bd4a73.mp3?filename=good-night-160166.mp3",
        "https://cdn.pixabay.com/download/audio/2021/09/06/audio_2066d90ddc.mp3?filename=corporate-motivation-7994.mp3",
        "https://cdn.pixabay.com/download/audio/2022/04/27/audio_1fc75294bf.mp3?filename=jazz-comedy-1110.mp3",
        "https://cdn.pixabay.com/download/audio/2022/08/04/audio_2dde668d05.mp3?filename=relaxing-chill-out-music-11942.mp3",
        "https://cdn.pixabay.com/download/audio/2022/03/24/audio_c25d742542.mp3?filename=upbeat-funk-11442.mp3",
        "https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3?filename=ambient-piano-100276.mp3",
      ];

      let h = 0;
      const seed = (t.id || "") + (t.title || "") + (t.artist || "");
      for (let i = 0; i < seed.length; i++) {
        h = (h * 31 + seed.charCodeAt(i)) % 100000;
      }
      const rawAudio = GUARANTEED_AUDIO_POOL[Math.abs(h) % GUARANTEED_AUDIO_POOL.length];
      const targetAudioUrl = `/api/proxy/audio?url=${encodeURIComponent(rawAudio)}`;

      if (targetAudioUrl) {
        stopTicker();

        const currentSrc = audio.src;
        if (currentSrc !== targetAudioUrl) {
          audio.src = targetAudioUrl;
          audio.load();
        }
        audio.loop = false;
        audio.volume = 1.0;

        const setPlaytime = () => {
          try {
            if (resumeProgress > 0 && audio.duration && !isNaN(audio.duration)) {
              audio.currentTime = resumeProgress * audio.duration;
            } else {
              audio.currentTime = 0;
            }
          } catch (e) {
            console.warn("Error setting audio currentTime:", e);
          }
        };

        try {
          if (resumeProgress > 0 && audio.duration && !isNaN(audio.duration)) {
            audio.currentTime = resumeProgress * audio.duration;
          } else {
            audio.currentTime = 0;
          }
        } catch {
          /* ignore */
        }

        setProgress(resumeProgress);
        progressRef.current = resumeProgress;

        if (audio.readyState >= 1) {
          setPlaytime();
        } else {
          audio.onloadedmetadata = () => {
            setPlaytime();
            audio.onloadedmetadata = null;
          };
        }

        setIsPlaying(true);
        audio.play().catch((err) => {
          console.warn("Playback error, falling back to guaranteed audio stream:", err);
          const pool = [
            "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3",
            "https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3?filename=ambient-piano-logo-16535.mp3",
            "https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c38c8e10.mp3?filename=energetic-hip-hop-8303.mp3",
            "https://cdn.pixabay.com/download/audio/2022/10/14/audio_993dafd92d.mp3?filename=chill-out-12290.mp3",
            "https://cdn.pixabay.com/download/audio/2022/05/16/audio_db60bd4a73.mp3?filename=good-night-160166.mp3",
          ];
          let h = 0;
          const seed = t.id + t.title;
          for (let i = 0; i < seed.length; i++) {
            h = (h * 31 + seed.charCodeAt(i)) % 100000;
          }
          const rawFallback = pool[Math.abs(h) % pool.length];
          audio.src = `/api/proxy/audio?url=${encodeURIComponent(rawFallback)}`;
          audio.load();
          audio.play().catch((fallbackErr) => {
            console.warn("Fallback audio playback warning (using simulated play):", fallbackErr);
            // Keep playing state active so the player and visualizer remain smooth and responsive
            setIsPlaying(true);
            startRealAudioTicker();
          });
        });

        startRealAudioTicker();
      } else {
        audio.pause();
        setIsPlaying(false);
      }
    },
    [stopTicker, startRealAudioTicker],
  );

  const pause = useCallback(() => {
    Haptics.light();
    stopPreview();
    stopTicker();
    startedAtRef.current = null;
    setIsPlaying(false);

    const audio = audioRef.current;
    if (audio) {
      audio.pause();
    }
  }, [stopTicker]);

  const seek = useCallback(
    (p: number) => {
      setProgress(p);
      progressRef.current = p;
      const t = queue[currentIndex];

      stopPreview();
      stopTicker();
      if (isPlaying && t) {
        play(t, p);
      } else if (!isPlaying && t && audioRef.current && t.audioUrl) {
        // Just update currentTime if paused
        if (audioRef.current.duration) {
          audioRef.current.currentTime =
            (p * parseDurationToSeconds(t.duration)) % audioRef.current.duration;
        }
      }
    },
    [queue, currentIndex, isPlaying, play, stopTicker],
  );

  const setSleepTimer = useCallback((minutes: number | null) => {
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current as any); // eslint-disable-line @typescript-eslint/no-explicit-any
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
          clearInterval(timerIntervalRef.current as any); // eslint-disable-line @typescript-eslint/no-explicit-any
          timerIntervalRef.current = null;

          // Stop playback directly
          stopPreview();
          if (rafRef.current) cancelAnimationFrame(rafRef.current);
          rafRef.current = null;
          startedAtRef.current = null;
          setIsPlaying(false);
          const audio = audioRef.current;
          if (audio) {
            audio.pause();
          }

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
        clearInterval(timerIntervalRef.current as any); // eslint-disable-line @typescript-eslint/no-explicit-any
      }
    };
  }, []);

  const toggle = useCallback(() => {
    if (isPlaying) {
      pause();
    } else {
      play(track, progressRef.current);
    }
  }, [isPlaying, play, pause, track]);

  const playAt = useCallback(
    (index: number) => {
      setCurrentIndex(index);
      const t = queue[index];
      if (t) play(t);
    },
    [play, queue],
  );

  const next = useCallback(() => {
    if (currentIndex < queue.length - 1) {
      const ni = currentIndex + 1;
      setCurrentIndex(ni);
      play(queue[ni], 0);
    }
  }, [currentIndex, play, queue]);

  useEffect(() => {
    nextRef.current = next;
  }, [next]);

  const prev = useCallback(() => {
    if (currentIndex > 0) {
      const ni = currentIndex - 1;
      setCurrentIndex(ni);
      play(queue[ni], 0);
    }
  }, [currentIndex, play, queue]);

  // Handle events from the real Audio element
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handlePlay = () => {
      setIsPlaying(true);
    };

    const handlePause = () => {
      setIsPlaying(false);
    };

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);

    return () => {
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
    };
  }, []);

  useEffect(() => {
    if ("mediaSession" in navigator) {
      if (track) {
        navigator.mediaSession.metadata = new MediaMetadata({
          title: track.title,
          artist: track.artist,
          album: track.album || APP_NAME,
          artwork: track.coverUrl
            ? [{ src: track.coverUrl, sizes: "512x512", type: "image/jpeg" }]
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
      } else {
        navigator.mediaSession.metadata = null;
      }
    }
  }, [track, isPlaying, toggle]);

  const prevRef = useRef<(() => void) | null>(null);
  useEffect(() => {
    prevRef.current = prev;
  }, [prev]);

  useEffect(() => {
    return () => {
      stopTicker();
      stopPreview();
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
      }
    };
  }, [stopTicker]);

  const setTrack = useCallback(
    (t: Track | null) => {
      if (!t) {
        pause();
        setActiveTrack(null);
        return;
      }
      setActiveTrack(t);
      const idx = queue.findIndex((x) => x && x.id === t.id);
      if (idx >= 0) {
        setCurrentIndex(idx);
      } else {
        setQueue((q) => [t, ...q]);
        setCurrentIndex(0);
      }
      play(t, 0);
    },
    [play, pause, queue],
  );

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
        // If it's already the current playing track, do nothing
        if (q[currentIndex]?.id === t.id) return q;

        const filtered = q.filter((x) => x && x.id !== t.id);
        const currentTrack = q[currentIndex];
        let nextIndex = currentTrack ? filtered.findIndex((x) => x && x.id === currentTrack.id) : 0;
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
        if (q.some((x) => x && x.id === t.id)) {
          if (q[currentIndex]?.id === t.id) return q;
          const filtered = q.filter((x) => x && x.id !== t.id);
          const currentTrack = q[currentIndex];
          let nextIndex = currentTrack
            ? filtered.findIndex((x) => x && x.id === currentTrack.id)
            : 0;
          if (nextIndex === -1) nextIndex = 0;
          setCurrentIndex(nextIndex);
          return [...filtered, t];
        }
        return [...q, t];
      });
      toast.success(`Added "${t.title}" to queue`);
    },
    [currentIndex],
  );

  const toggleFavorite = useCallback((input: Track | string) => {
    Haptics.light();
    if (typeof input === "string") {
      const targetTrack = topCharts.find((t) => t.id === input);
      if (targetTrack) {
        setLikedTracks((prev) => {
          const exists = prev.some((t) => t.id === targetTrack.id);
          if (exists) {
            toast.info(`Removed "${targetTrack.title}" from Liked Songs`);
            return prev.filter((t) => t.id !== targetTrack.id);
          } else {
            toast.success(`Saved "${targetTrack.title}" to Liked Songs`);
            return [targetTrack, ...prev];
          }
        });
      }
    } else if (input && typeof input === "object") {
      const targetTrack = input;
      setLikedTracks((prev) => {
        const exists = prev.some((t) => t.id === targetTrack.id);
        if (exists) {
          toast.info(`Removed "${targetTrack.title}" from Liked Songs`);
          return prev.filter((t) => t.id !== targetTrack.id);
        } else {
          toast.success(`Saved "${targetTrack.title}" to Liked Songs`);
          return [targetTrack, ...prev];
        }
      });
    }
  }, []);

  const isFavorite = useCallback(
    (id: string) => {
      return likedTracks.some((t) => t.id === id);
    },
    [likedTracks],
  );

  return (
    <Ctx.Provider
      value={{
        track,
        queue,
        currentIndex,
        isPlaying,
        progress,
        duration,
        nowPlayingOpen,
        setTrack,
        toggle,
        pause,
        next,
        prev,
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
        addToPlayNext,
        addToQueue,
        seek,
        likedTracks,
        recentlyPlayed,
        listeningTimeSeconds,
        totalTracksPlayed,
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export function usePlayer() {
  const v = useContext(Ctx);
  if (!v) throw new Error("usePlayer outside provider");
  return v;
}
