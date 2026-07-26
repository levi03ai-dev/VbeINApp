import { AnimatePresence, motion, LayoutGroup, animate } from "framer-motion";
import {
  GripVertical,
  Repeat,
  Repeat1,
  Shuffle,
  SkipBack,
  SkipForward,
  Trash2,
  X,
  Moon,
  MoreVertical,
  Star,
  Heart,
  Bookmark,
  Download,
  Plus,
  ListPlus,
  Share2,
  Quote,
  Info,
  Radio,
  ThumbsDown,
  ChevronLeft,
  ChevronRight,
  Music,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { usePlayer, usePlaybackProgress } from "@/lib/player-context";
import { activeLyricIndex, demoLyrics, getLyricsForTrack, useLyrics } from "@/lib/lyrics";
import { duration as motionDuration, ease, spring } from "@/lib/motion";
import { parseDurationToSeconds, formatSeconds } from "@/lib/utils";
import { PlayPauseIcon } from "./PlayPauseIcon";
import { AudioVisualizer } from "./AudioVisualizer";
import { CoverImage } from "./CoverImage";
import { downloadTrackFile } from "@/lib/music-service";
import { type Track, getCoverUrl } from "@/lib/music-data";
import { globalAudioPlaybackManager } from "@/features/music/services/audio-playback-manager";
import { Slider } from "@/components/ui/slider";
import { Haptics } from "@/lib/haptics";
import { toast } from "sonner";

type Panel = "player" | "lyrics" | "next";

export function NowPlayingSheet() {
  const {
    nowPlayingOpen,
    closeNowPlaying,
    track,
    isPlaying,
    toggle,
    next,
    prev,
    seek,
    isFavorite,
    toggleFavorite,
  } = usePlayer();
  const { duration: playerDuration, progress } = usePlaybackProgress();
  const [panel, setPanel] = useState<Panel>("player");
  const [showOptions, setShowOptions] = useState(false);

  useEffect(() => {
    if (!nowPlayingOpen) {
      setPanel("player");
      setShowOptions(false);
    }
  }, [nowPlayingOpen]);

  return (
    <AnimatePresence>
      {nowPlayingOpen && track && (
        <motion.div
          key="np"
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", stiffness: 140, damping: 28, mass: 1.2 }}
          drag="y"
          dragConstraints={{ top: 0, bottom: 0 }}
          dragElastic={{ top: 0, bottom: 0.6 }}
          onDragEnd={(_, info) => {
            if (info.offset.y > 140 || info.velocity.y > 700) closeNowPlaying();
          }}
          className="fixed inset-0 z-50 overflow-hidden"
        >
          {/* Ambient background with smooth fade transition */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            <AnimatePresence initial={false}>
              <motion.div
                key={track.id + "-ambient"}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="absolute inset-0 bg-cover bg-center"
                style={
                  track.coverUrl
                    ? {
                        backgroundImage: `url(${getCoverUrl(track.coverUrl)})`,
                        filter: "blur(60px) brightness(0.4) saturate(1.5)",
                        transform: "scale(1.2)",
                      }
                    : {
                        background: `radial-gradient(120% 80% at 50% 0%, ${extractStart(
                          track.gradient,
                        )} 0%, oklch(0.14 0.005 20) 62%)`,
                      }
                }
              />
            </AnimatePresence>
          </div>

          <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            <motion.div
              aria-hidden
              className="absolute -top-24 left-1/2 h-[560px] w-[560px] -translate-x-1/2 rounded-full blur-3xl opacity-60"
              animate={{ scale: [1, 1.12, 1], rotate: [0, 10, -6, 0] }}
              transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
            >
              <AnimatePresence initial={false}>
                <motion.div
                  key={track.id + "-orb"}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  className="absolute inset-0 rounded-full bg-cover bg-center"
                  style={
                    track.coverUrl
                      ? { backgroundImage: `url(${getCoverUrl(track.coverUrl)})` }
                      : { background: track.gradient }
                  }
                />
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Glass layer */}
          <div className="absolute inset-0 glass z-0" />

          <div className="relative z-10 flex h-full flex-col px-6 pt-3 pb-[max(env(safe-area-inset-bottom),1rem)]">
            {/* Header Row */}
            <div className="flex items-center justify-center mb-4 h-8 px-1">
              <span className="h-1.5 w-12 rounded-full bg-white/15" />
            </div>

            <LayoutGroup>
              <AnimatePresence mode="wait" initial={false}>
                {panel === "player" && (
                  <PlayerPanel
                    key="player"
                    onLyrics={() => setPanel("lyrics")}
                    onNext={() => setPanel("next")}
                    isPlaying={isPlaying}
                    toggle={toggle}
                    next={next}
                    prev={prev}
                    progress={progress}
                    duration={playerDuration}
                    seek={seek}
                    trackTitle={track.title}
                    trackArtist={track.artist}
                    trackAlbum={track.album}
                    trackDuration={track.duration}
                    trackGradient={track.gradient}
                    track={track}
                    onOpenOptions={() => setShowOptions(true)}
                  />
                )}
                {panel === "lyrics" && (
                  <LyricsPanel
                    key="lyrics"
                    progress={progress}
                    trackGradient={track.gradient}
                    trackTitle={track.title}
                    track={track}
                    onBack={() => setPanel("player")}
                  />
                )}
                {panel === "next" && <NextPanel key="next" onBack={() => setPanel("player")} />}
              </AnimatePresence>
            </LayoutGroup>
          </div>

          {/* Options Sheet overlay with smooth spring transition */}
          <AnimatePresence>
            {showOptions && track && (
              <OptionsSheet
                track={track}
                isFavorited={track ? isFavorite(track) : false}
                onToggleFavorite={() => {
                  if (!track) return;
                  Haptics.medium();
                  toggleFavorite(track);
                }}
                onClose={() => setShowOptions(false)}
              />
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function PlayerPanel({
  onLyrics,
  onNext,
  isPlaying,
  toggle,
  next,
  prev,
  progress,
  duration,
  seek,
  trackTitle,
  trackArtist,
  trackAlbum,
  trackDuration,
  trackGradient,
  track,
  onOpenOptions,
}: {
  onLyrics: () => void;
  onNext: () => void;
  isPlaying: boolean;
  toggle: () => void;
  next: () => void;
  prev: () => void;
  progress: number;
  duration: number;
  seek: (p: number) => void;
  trackTitle: string;
  trackArtist: string;
  trackAlbum: string;
  trackDuration: string;
  trackGradient: string;
  track: Track;
  onOpenOptions: () => void;
}) {
  const { isFavorite, toggleFavorite, repeatMode, toggleRepeat, shuffleActive, toggleShuffle } = usePlayer();
  const [isDownloading, setIsDownloading] = useState(false);
  const [imgError, setImgError] = useState(false);

  const safeCoverUrl = track.coverUrl && !imgError ? getCoverUrl(track.coverUrl) : null;

  // Use real audio duration if available, else fallback to track duration string
  const total = duration || parseDurationToSeconds(trackDuration);
  const [dragProgress, setDragProgress] = useState<number | null>(null);

  const displayProgress = dragProgress !== null ? dragProgress : progress;
  const elapsed = Math.round(displayProgress * total);

  const handleDownload = async () => {
    if (!track.audioUrl) {
      alert("This demo track does not have an audio file available for download.");
      return;
    }
    setIsDownloading(true);
    Haptics.light();
    try {
      const filename = `${track.title} - ${track.artist}`;
      await downloadTrackFile(track.audioUrl, filename);
      Haptics.success();
    } catch (e) {
      console.error("Download failed:", e);
      Haptics.error();
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: -18, filter: "blur(8px)" }}
      transition={{ duration: motionDuration.slow, ease: ease.soft }}
      className="flex flex-1 flex-col items-center justify-center"
    >
      <motion.div
        layoutId="player-artwork"
        animate={{ scale: isPlaying ? 1 : 0.82, rotate: isPlaying ? 0 : -1.5 }}
        transition={spring.lazy}
        className="aspect-square w-[76vw] max-w-[340px] rounded-xl album-shadow relative overflow-hidden"
        style={{ borderRadius: "12px" }}
      >
        <AnimatePresence initial={false}>
          <motion.div
            key={track.id + (imgError ? "-fallback" : "")}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 flex items-center justify-center overflow-hidden"
            style={{ background: trackGradient }}
          >
            <CoverImage
              src={safeCoverUrl || undefined}
              title={trackTitle}
              artist={trackArtist}
              iconSize={48}
              className="h-full w-full object-cover z-0"
            />
          </motion.div>
        </AnimatePresence>
      </motion.div>

      <div className="mt-8 w-full flex items-center justify-between gap-4">
        <div className="min-w-0 flex-1 text-left min-h-[58px]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={trackTitle}
              initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -12, filter: "blur(4px)" }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2 className="truncate text-xl font-semibold tracking-tight text-white">
                {trackTitle}
              </h2>
              <p className="mt-0.5 truncate text-[13px] text-white/60">
                {trackArtist} — {trackAlbum}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={() => {
              Haptics.medium();
              toggleFavorite(track);
            }}
            className={`grid h-10 w-10 place-items-center rounded-full active:scale-90 transition-all ${
              isFavorite(track)
                ? "bg-white/10 text-rose-500"
                : "bg-white/5 hover:bg-white/10 text-white/80"
            }`}
            aria-label="Favorite"
          >
            <Heart className="h-5 w-5" fill={isFavorite(track) ? "currentColor" : "none"} />
          </button>
          <button
            onClick={() => {
              Haptics.medium();
              onOpenOptions();
            }}
            className="grid h-10 w-10 place-items-center rounded-full bg-white/5 hover:bg-white/10 text-white/80 active:scale-90 transition-all"
            aria-label="More options"
          >
            <MoreVertical className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="mt-8 w-full">
        <div
          className="relative h-2 w-full overflow-hidden rounded-full bg-white/10 cursor-pointer touch-none"
          onPointerDown={(e) => {
            const el = e.currentTarget;
            let lastP = 0;
            const updateProgress = (clientX: number) => {
              const rect = el.getBoundingClientRect();
              const p = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
              lastP = p;
              setDragProgress(p);
            };

            updateProgress(e.clientX);

            const handleMove = (me: PointerEvent) => {
              updateProgress(me.clientX);
            };

            const handleUp = () => {
              window.removeEventListener("pointermove", handleMove);
              window.removeEventListener("pointerup", handleUp);
              seek(lastP);
              setDragProgress(null);
            };

            window.addEventListener("pointermove", handleMove);
            window.addEventListener("pointerup", handleUp);
          }}
        >
          <motion.div
            animate={{ width: `${displayProgress * 100}%` }}
            transition={{ duration: dragProgress !== null ? 0 : 0.25, ease: "linear" }}
            className="absolute inset-y-0 left-0 rounded-full bg-white pointer-events-none"
          />
        </div>
        <div className="mt-1.5 flex justify-between text-[10px] tabular-nums text-white/50">
          <span>{formatSeconds(elapsed)}</span>
          <span>{duration ? formatSeconds(Math.round(total)) : trackDuration}</span>
          <span>-{formatSeconds(Math.max(0, total - elapsed))}</span>
        </div>
      </div>

      <div className="mt-6 flex w-full items-center justify-between px-1">
        <IconBtn
          onClick={toggleShuffle}
        >
          <Shuffle
            className={`h-4 w-4 transition-colors duration-300 ${
              shuffleActive
                ? "text-accent stroke-[2.5px] opacity-100 drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]"
                : "opacity-80"
            }`}
          />
        </IconBtn>
        <IconBtn size="lg" onClick={prev}>
          <SkipBack className="h-6 w-6 fill-current" />
        </IconBtn>
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.94 }}
          transition={spring.soft}
          onClick={() => {
            Haptics.medium();
            toggle();
          }}
          className="grid h-14 w-14 place-items-center rounded-full bg-white/10 hover:bg-white/15 text-white shadow active:bg-white/20 transition-colors"
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          <PlayPauseIcon isPlaying={isPlaying} size="lg" />
        </motion.button>
        <IconBtn size="lg" onClick={next}>
          <SkipForward className="h-6 w-6 fill-current" />
        </IconBtn>
        <IconBtn
          onClick={toggleRepeat}
        >
          {repeatMode === "one" ? (
            <Repeat1
              className="h-4 w-4 transition-colors duration-300 text-accent stroke-[2.5px] opacity-100 drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]"
            />
          ) : (
            <Repeat
              className={`h-4 w-4 transition-colors duration-300 ${
                repeatMode === "queue"
                  ? "text-accent stroke-[2.5px] opacity-100 drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]"
                  : "opacity-80"
              }`}
            />
          )}
        </IconBtn>
      </div>

      <div className="mt-8 flex w-full items-center justify-center gap-3">
        <button
          onClick={() => {
            Haptics.light();
            onLyrics();
          }}
          className="flex-1 rounded-xl border border-white/5 bg-white/5 py-3 text-[13px] font-semibold text-white/90 backdrop-blur-md transition-all active:scale-[0.98] hover:bg-white/10"
        >
          Lyrics
        </button>
        <button
          onClick={() => {
            Haptics.light();
            onNext();
          }}
          className="flex-1 rounded-xl border border-white/5 bg-white/5 py-3 text-[13px] font-semibold text-white/90 backdrop-blur-md transition-all active:scale-[0.98] hover:bg-white/10"
        >
          Up Next
        </button>
      </div>
    </motion.div>
  );
}

function LyricsPanel({
  trackTitle,
  trackGradient,
  track,
  onBack,
}: {
  progress?: number;
  trackTitle: string;
  trackGradient: string;
  track: Track;
  onBack: () => void;
}) {
  const { duration: progressDuration } = usePlaybackProgress();
  const stableDuration = parseDurationToSeconds(track.duration) || progressDuration || 215;
  const trackLyrics = useLyrics(track, stableDuration);
  const { seek } = usePlayer();

  const [currentTime, setCurrentTime] = useState(0);
  const [isManualScroll, setIsManualScroll] = useState(false);

  useEffect(() => {
    let animationFrameId: number;
    let fallbackIntervalId: ReturnType<typeof setInterval> | null = null;

    const tick = () => {
      setCurrentTime(globalAudioPlaybackManager.getCurrentTime());
      if (typeof document !== "undefined" && !document.hidden) {
        animationFrameId = requestAnimationFrame(tick);
      }
    };

    const startAdaptiveLoop = () => {
      if (typeof document === "undefined") return;

      if (!document.hidden) {
        if (fallbackIntervalId) {
          clearInterval(fallbackIntervalId);
          fallbackIntervalId = null;
        }
        animationFrameId = requestAnimationFrame(tick);
      } else {
        if (animationFrameId) {
          cancelAnimationFrame(animationFrameId);
        }
        // Scaled-down adaptive polling interval when app is backgrounded / screen off
        if (!fallbackIntervalId) {
          fallbackIntervalId = setInterval(() => {
            setCurrentTime(globalAudioPlaybackManager.getCurrentTime());
          }, 2500);
        }
      }
    };

    const handleVisibilityChange = () => {
      startAdaptiveLoop();
    };

    if (typeof document !== "undefined") {
      document.addEventListener("visibilitychange", handleVisibilityChange);
    }

    startAdaptiveLoop();

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      if (fallbackIntervalId) clearInterval(fallbackIntervalId);
      if (typeof document !== "undefined") {
        document.removeEventListener("visibilitychange", handleVisibilityChange);
      }
    };
  }, []);

  const idx = activeLyricIndex(currentTime, trackLyrics);
  const containerRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<HTMLParagraphElement>(null);
  const touchStartRef = useRef<number | null>(null);
  const isAtTopRef = useRef<boolean>(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const scrollAnimationRef = useRef<any>(null);

  // Auto-center immediately when lyric index changes
  useEffect(() => {
    setIsManualScroll(false);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, [idx]);

  // Clean up timer and animations on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (scrollAnimationRef.current) {
        scrollAnimationRef.current.stop();
        scrollAnimationRef.current = null;
      }
    };
  }, []);

  const handleScroll = () => {
    if (!isManualScroll) setIsManualScroll(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setIsManualScroll(false);
    }, 3000);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      const wrapper = container.firstElementChild;
      const activeEl = wrapper?.children[idx] as HTMLElement;
      if (activeEl) {
        // Cancel any active animation first
        if (scrollAnimationRef.current) {
          scrollAnimationRef.current.stop();
          scrollAnimationRef.current = null;
        }

        // Small timeout to allow Framer Motion panel entry animations to settle so rect measurements are highly accurate
        const timer = setTimeout(() => {
          const containerRect = container.getBoundingClientRect();
          const activeRect = activeEl.getBoundingClientRect();
          if (containerRect.height === 0 || activeRect.height === 0) return;
          const relativeTop = activeRect.top - containerRect.top + container.scrollTop;
          const targetScrollTop = relativeTop - containerRect.height / 2 + activeRect.height / 2;

          if (isManualScroll) return;

          // Animate the container scrollTop smoothly using framer-motion's animate function
          scrollAnimationRef.current = animate(container.scrollTop, targetScrollTop, {
            type: "spring",
            stiffness: 70,
            damping: 22,
            mass: 0.6,
            onUpdate: (value) => {
              container.scrollTop = value;
            },
            onComplete: () => {
              scrollAnimationRef.current = null;
            },
          });
        }, 40);
        return () => {
          clearTimeout(timer);
          if (scrollAnimationRef.current) {
            scrollAnimationRef.current.stop();
            scrollAnimationRef.current = null;
          }
        };
      }
    }
  }, [idx, isManualScroll]);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (container) {
      touchStartRef.current = e.touches[0].clientY;
      isAtTopRef.current = container.scrollTop === 0;
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartRef.current !== null && isAtTopRef.current) {
      const deltaY = e.touches[0].clientY - touchStartRef.current;
      if (deltaY > 60) {
        // Trigger back action and clear refs
        touchStartRef.current = null;
        isAtTopRef.current = false;
        onBack();
      }
    }
  };

  const handleTouchEnd = () => {
    touchStartRef.current = null;
    isAtTopRef.current = false;
  };

  const handleLineClick = (time: number) => {
    if (stableDuration > 0) {
      seek(time / stableDuration);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 32, filter: "blur(10px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: -24, filter: "blur(10px)" }}
      transition={{ duration: motionDuration.slow, ease: ease.soft }}
      className="flex flex-1 flex-col overflow-hidden"
    >
      <PanelHeader title={trackTitle} subtitle="Lyrics" onClose={onBack} track={track} />

      {/* Optimized scroll stage with beautiful clean UI UX */}
      <div className="relative flex-1 overflow-hidden mt-2">
        <div
          ref={containerRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onWheel={handleScroll}
          onTouchMoveCapture={handleScroll}
          onMouseDownCapture={handleScroll}
          className="no-scrollbar h-full overflow-y-auto px-4 pb-8"
        >
          <div
            className={`flex flex-col gap-6 ${trackLyrics.length === 0 ? "h-full items-center justify-center py-0" : "py-[45vh]"}`}
          >
            {trackLyrics.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center text-white/50 py-12 px-6 flex flex-col items-center justify-center"
              >
                <Music className="w-12 h-12 mx-auto mb-4 opacity-30" />
                <p className="text-lg font-medium">No lyrics available</p>
                <p className="text-sm mt-1">We couldn't find lyrics for this track.</p>
              </motion.div>
            )}
            {trackLyrics.map((l, i) => {
              const active = i === idx;
              const passed = i < idx;
              return (
                <motion.p
                  key={i}
                  ref={active ? activeRef : undefined}
                  onClick={() => handleLineClick(l.t)}
                  animate={{
                    scale: active ? 1.05 : 0.95,
                    opacity: active ? 1.0 : passed ? 0.55 : 0.35,
                    y: active ? 0 : passed ? -4 : 4,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 120,
                    damping: 24,
                    mass: 0.5,
                  }}
                  className={`cursor-pointer text-center text-2xl md:text-3xl font-extrabold leading-snug tracking-tight min-h-[1.5em] select-none ${
                    active
                      ? "text-white drop-shadow-[0_2px_8px_rgba(255,255,255,0.15)]"
                      : "text-white/40 hover:text-white/70"
                  }`}
                >
                  {l.text || "\u00A0"}
                </motion.p>
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function SheetCapsulePlayer({ track }: { track: Track }) {
  const { isPlaying, toggle, next, prev } = usePlayer();
  const { progress } = usePlaybackProgress();

  if (!track) return null;

  return (
    <div className="mx-4 mb-4 mt-2 shrink-0">
      <div className="relative flex items-center justify-between gap-3 overflow-hidden rounded-full border border-white/10 bg-white/5 py-2 px-4 shadow-lg backdrop-blur-xl">
        <div className="min-w-0 flex-1 flex items-center gap-2">
          <div 
            className="h-8 w-8 shrink-0 rounded-full overflow-hidden shadow"
            style={{ background: track.gradient }}
          >
            <CoverImage
              src={track.coverUrl ? getCoverUrl(track.coverUrl) : undefined}
              title={track.title}
              artist={track.artist}
              iconSize={14}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[11px] font-bold tracking-tight text-white/90">
              {track.title}
            </p>
            <p className="truncate text-[9px] text-white/60">
              {track.artist}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => {
              Haptics.light();
              prev();
            }}
            className="grid h-7 w-7 place-items-center rounded-full text-white/80 hover:bg-white/5 active:scale-90 transition-colors"
          >
            <SkipBack className="h-3.5 w-3.5 fill-current" />
          </button>
          <button
            onClick={() => {
              Haptics.light();
              toggle();
            }}
            className="grid h-8 w-8 place-items-center rounded-full bg-white/10 text-white hover:bg-white/15 active:scale-95 transition-colors"
          >
            <PlayPauseIcon isPlaying={isPlaying} size="sm" />
          </button>
          <button
            onClick={() => {
              Haptics.light();
              next();
            }}
            className="grid h-7 w-7 place-items-center rounded-full text-white/80 hover:bg-white/5 active:scale-90 transition-colors"
          >
            <SkipForward className="h-3.5 w-3.5 fill-current" />
          </button>
        </div>

        {/* Custom Progress Bar overlay */}
        <div className="absolute inset-x-0 bottom-0 h-[2px] bg-white/5">
          <div
            className="h-full bg-white/30"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}

function NextPanel({ onBack }: { onBack: () => void }) {
  const {
    duration: playerDuration,
    queue,
    currentIndex,
    playAt,
    removeAt,
    moveItem,
    isPlaying,
  } = usePlayer();
  const upcoming = queue.map((t, i) => ({ t, i })).filter(({ i }) => i !== currentIndex);
  const current = queue[currentIndex];

  return (
    <motion.div
      initial={{ opacity: 0, y: 32, filter: "blur(10px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: -24, filter: "blur(10px)" }}
      transition={{ duration: motionDuration.slow, ease: ease.soft }}
      className="flex flex-1 flex-col overflow-hidden"
    >
      <PanelHeader title="Next" subtitle="Queue" onClose={onBack} track={current} />

      <div className="no-scrollbar mt-4 flex-1 overflow-y-auto pb-8">
        <div className="mb-3 rounded-xl border border-white/5 bg-white/5 p-2.5 backdrop-blur-xl">
          <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-white/50 block">
            Now Playing
          </span>
          <div className="mt-2 flex items-center gap-3">
            <div
              className="h-10 w-10 shrink-0 rounded-lg relative overflow-hidden flex items-center justify-center shadow-inner"
              style={{ background: current.gradient }}
            >
              <CoverImage
                src={current.coverUrl ? getCoverUrl(current.coverUrl) : undefined}
                title={current.title}
                artist={current.artist}
                iconSize={18}
                className="absolute inset-0 h-full w-full object-cover z-0"
              />
              <div className="absolute inset-0 bg-black/25 z-10" />
              <div className="relative z-20">
                <AudioVisualizer isPlaying={isPlaying} colorClass="bg-white" />
              </div>
            </div>
            <div className="min-w-0 flex-1 text-left">
              <p className="truncate text-[13px] font-medium tracking-tight text-white">
                {current.title}
              </p>
              <p className="truncate text-[11px] text-white/60">{current.artist}</p>
            </div>
          </div>
        </div>

        <AnimatePresence initial={false}>
          {upcoming.map(({ t, i }, listIdx) => (
            <motion.div
              key={t.id}
              layout
              initial={{ opacity: 0, x: 24, filter: "blur(6px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: -40, height: 0, marginTop: 0, filter: "blur(6px)" }}
              transition={{ type: "spring", stiffness: 160, damping: 26, mass: 1.1 }}
              className="mb-2 flex items-center gap-2 rounded-xl border border-white/5 bg-white/5 p-2 pr-1 backdrop-blur-xl"
            >
              <button
                onClick={() => moveItem(i, Math.max(currentIndex + 1, i - 1))}
                aria-label="Reorder up"
                className="grid h-10 w-6 place-items-center text-white/60 active:scale-90"
                disabled={listIdx === 0}
              >
                <GripVertical className="h-4 w-4" />
              </button>
              <button
                onClick={() => playAt(i)}
                className="flex min-w-0 flex-1 items-center gap-3 text-left"
              >
                <div
                  className="h-9 w-9 shrink-0 rounded-lg relative overflow-hidden shadow-sm"
                  style={{ background: t.gradient }}
                >
                  <CoverImage
                    src={t.coverUrl ? getCoverUrl(t.coverUrl) : undefined}
                    title={t.title}
                    artist={t.artist}
                    iconSize={16}
                    className="absolute inset-0 h-full w-full object-cover z-0"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13px] font-medium tracking-tight text-white">
                    {t.title}
                  </p>
                  <p className="truncate text-[11px] text-white/60">{t.artist}</p>
                </div>
              </button>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => moveItem(i, Math.min(queue.length - 1, i + 1))}
                  className="grid h-9 w-9 place-items-center rounded-full text-white/70 active:scale-90"
                  aria-label="Move down"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.4"
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>
                <button
                  onClick={() => removeAt(i)}
                  className="grid h-9 w-9 place-items-center rounded-full text-white/70 active:scale-90"
                  aria-label="Remove"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {upcoming.length === 0 && (
          <p className="mt-8 text-center text-sm text-white/60">Queue is empty.</p>
        )}
      </div>
    </motion.div>
  );
}

function PanelHeader({
  title,
  subtitle,
  onClose,
  track,
}: {
  title: string;
  subtitle: string;
  onClose: () => void;
  track: Track;
}) {
  return (
    <div
      onClick={onClose}
      className="flex items-center gap-3 cursor-pointer group hover:opacity-80 active:scale-[0.99] transition-all"
    >
      <div
        className="h-9 w-9 shrink-0 rounded-lg relative overflow-hidden shadow-sm"
        style={{ background: track.gradient }}
      >
        <CoverImage
          src={track.coverUrl ? getCoverUrl(track.coverUrl) : undefined}
          title={track.title}
          artist={track.artist}
          iconSize={16}
          className="absolute inset-0 h-full w-full object-cover z-0"
        />
      </div>
      <div className="min-w-0 flex-1 text-left">
        <span className="text-[9px] font-bold uppercase tracking-[0.16em] text-white/55 block group-hover:text-white/75 transition-colors">
          {subtitle}
        </span>
        <p className="truncate text-[15px] font-medium tracking-tight text-white group-hover:text-white/95 transition-colors">
          {title}
        </p>
      </div>
    </div>
  );
}

function IconBtn({
  children,
  size = "md",
  onClick,
}: {
  children: React.ReactNode;
  size?: "md" | "lg";
  onClick?: () => void;
}) {
  return (
    <motion.button
      whileTap={{ scale: 0.84 }}
      transition={spring.soft}
      onClick={(e) => {
        Haptics.light();
        onClick?.();
      }}
      className={`grid place-items-center rounded-full text-white/90 ${
        size === "lg" ? "h-14 w-14" : "h-10 w-10"
      }`}
    >
      {children}
    </motion.button>
  );
}

function extractStart(gradient: string): string {
  const m = gradient.match(/#([0-9a-fA-F]{6,8})/);
  return m ? `#${m[1]}` : "#3a1a2e";
}

interface OptionsSheetProps {
  track: Track;
  isFavorited: boolean;
  onToggleFavorite: () => void;
  onClose: () => void;
}

function OptionsSheet({ track, isFavorited, onToggleFavorite, onClose }: OptionsSheetProps) {
  const [subPanel, setSubPanel] = useState<"menu" | "playlists" | "credits">("menu");
  const [playlists, setPlaylists] = useState([
    "Chill Vibes",
    "On the Road",
    "Late Night Focus",
    "Summer Beats",
  ]);
  const { sleepTimerRemaining, setSleepTimer, toggleSaveTrack, isTrackSaved } = usePlayer();
  const isSaved = track ? isTrackSaved(track) : false;
  const { duration: playerDuration } = usePlaybackProgress();
  const [isDownloading, setIsDownloading] = useState(false);
  const [customSleepMins, setCustomSleepMins] = useState(30);

  // Handle Download Song
  const handleDownload = async () => {
    if (!track || !track.audioUrl) {
      toast.error("This demo track does not have an audio file available for download.");
      return;
    }
    setIsDownloading(true);
    Haptics.light();
    try {
      const filename = `${track.title} - ${track.artist}`;
      await downloadTrackFile(track.audioUrl, filename);
      Haptics.success();
      toast.success(`Downloaded "${track.title}" successfully`);
    } catch (e) {
      console.error("Download failed:", e);
      Haptics.error();
      toast.error("Download failed");
    } finally {
      setIsDownloading(false);
    }
  };

  // Handle Share Song
  const handleShareSong = async () => {
    if (!track) return;
    Haptics.light();
    const shareUrl = `https://vibein.music/track/${track.id}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: track.title,
          text: `Listen to "${track.title}" by ${track.artist} on VibeIN`,
          url: shareUrl,
        });
        toast.success("Shared successfully");
      } catch (err) {
        console.log("Error sharing", err);
      }
    } else {
      navigator.clipboard.writeText(shareUrl);
      toast.success("Share link copied to clipboard");
    }
    onClose();
  };

  // Handle Share Lyrics
  const handleShareLyrics = () => {
    if (!track) return;
    Haptics.light();
    const trackLyrics = getLyricsForTrack(track);
    const firstLine =
      trackLyrics.find((line) => line.text.trim() && !line.text.startsWith("["))?.text ||
      "The city hums a quiet blue";
    const lyricQuote = `"${firstLine}" — ${track.title} by ${track.artist}`;
    navigator.clipboard.writeText(lyricQuote);
    toast.success("Lyrics snippet copied to clipboard");
    onClose();
  };

  // Handle Suggest Less
  const { removeAt, currentIndex, pause, next } = usePlayer();

  const handleSuggestLess = () => {
    if (!track) return;
    Haptics.medium();
    toast.success(`We will suggest less songs like "${track.title}" in the future.`);
    pause();
    removeAt(currentIndex);
    onClose();
  };

  // Handle Create Station
  const handleCreateStation = () => {
    if (!track) return;
    Haptics.medium();
    toast.success(`Started radio station based on "${track.title}"`);
    onClose();
  };

  // Handle direct sleep timer presets inside menu
  const handleSleepTimerSelect = (mins: number) => {
    Haptics.medium();
    setSleepTimer(mins);
    toast.success(`Sleep timer set for ${mins} minutes`);
    onClose();
  };

  // Handle adding custom playlist
  const handleCreatePlaylist = () => {
    const name = prompt("Enter playlist name:");
    if (name && name.trim()) {
      Haptics.success();
      setPlaylists((prev) => [...prev, name.trim()]);
      toast.success(`Playlist "${name}" created`);
    }
  };

  return (
    <>
      {/* Backdrop with fade-in/fade-out */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="absolute inset-0 z-40 bg-black/55 backdrop-blur-sm pointer-events-auto"
        onClick={onClose}
      />

      {/* Slide-up Container */}
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", stiffness: 280, damping: 28, mass: 0.9 }}
        className="absolute inset-x-0 bottom-0 z-50 rounded-t-[28px] bg-surface text-foreground p-6 pb-[max(env(safe-area-inset-bottom),1.5rem)] shadow-2xl flex flex-col max-h-[85vh] overflow-hidden pointer-events-auto"
      >
        {/* Drag indicator/grab handle at top */}
        <div className="mx-auto mb-4 h-1.5 w-12 shrink-0 rounded-full bg-foreground/10" />

        {/* Dynamic sub-panels with nice slide-over transitions */}
        <div className="relative flex-1 flex flex-col overflow-hidden min-h-0">
          <AnimatePresence mode="wait" initial={false}>
            {subPanel === "menu" && (
              <motion.div
                key="menu"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15, ease: "easeInOut" }}
                className="flex-1 flex flex-col overflow-hidden"
              >
                {/* Track Info Header (matching screenshot) */}
                <div className="flex items-center gap-4 border-b border-neutral-100 dark:border-neutral-800 pb-4 mb-2 shrink-0">
                  <div
                    className="h-14 w-14 shrink-0 rounded-xl shadow-md overflow-hidden relative"
                    style={{
                      background: track.gradient,
                    }}
                  >
                    <CoverImage
                      src={track.coverUrl ? getCoverUrl(track.coverUrl) : undefined}
                      title={track.title}
                      artist={track.artist}
                      iconSize={24}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1 text-left">
                    <h3 className="text-base font-bold tracking-tight text-foreground truncate">
                      {track.title}
                    </h3>
                    <p className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 truncate mt-0.5">
                      {track.artist}
                    </p>
                    <p className="text-[11px] font-medium text-neutral-400 dark:text-neutral-500 truncate mt-0.5 italic">
                      "you seem pretty sad for a girl s..."
                    </p>
                  </div>
                </div>

                {/* Option list scrollable */}
                <div className="flex-1 overflow-y-auto no-scrollbar py-1">
                  <div className="flex flex-col gap-0.5">
                    {/* Add / Save to Library */}
                    <OptionItem
                      icon={
                        <Bookmark
                          className={`h-4.5 w-4.5 ${isSaved ? "text-indigo-500 fill-indigo-500" : "text-indigo-500"}`}
                        />
                      }
                      label={isSaved ? "Remove from Saved Songs" : "Save to Library"}
                      onClick={() => {
                        Haptics.medium();
                        toggleSaveTrack(track);
                        onClose();
                      }}
                    />

                    {/* Add to a Playlist */}
                    <OptionItem
                      icon={<ListPlus className="h-4.5 w-4.5 text-rose-500" />}
                      label="Add to a Playlist..."
                      onClick={() => {
                        Haptics.light();
                        setSubPanel("playlists");
                      }}
                    />

                    {/* Share Song */}
                    <OptionItem
                      icon={<Share2 className="h-4.5 w-4.5 text-rose-500" />}
                      label="Share Song"
                      onClick={handleShareSong}
                    />

                    {/* Share Lyrics */}
                    <OptionItem
                      icon={<Quote className="h-4.5 w-4.5 text-rose-500" />}
                      label="Share Lyrics..."
                      onClick={handleShareLyrics}
                    />

                    {/* View Credits */}
                    <OptionItem
                      icon={<Info className="h-4.5 w-4.5 text-rose-500" />}
                      label="View Credits"
                      onClick={() => {
                        Haptics.light();
                        setSubPanel("credits");
                      }}
                    />

                    {/* Create Station */}
                    <OptionItem
                      icon={<Radio className="h-4.5 w-4.5 text-rose-500" />}
                      label="Create Station"
                      onClick={handleCreateStation}
                    />

                    {/* Download Song */}
                    <OptionItem
                      icon={
                        isDownloading ? (
                          <div className="h-4 w-4 animate-spin rounded-full border-2 border-rose-500 border-t-transparent" />
                        ) : (
                          <Download className="h-4.5 w-4.5 text-rose-500" />
                        )
                      }
                      label={isDownloading ? "Downloading Song..." : "Download Song"}
                      onClick={isDownloading ? undefined : handleDownload}
                    />

                    {/* Sleep Timer Options */}
                    <div className="border-t border-neutral-100 dark:border-neutral-800 my-1.5" />

                    <OptionItem
                      icon={<Moon className="h-4.5 w-4.5 text-rose-500" />}
                      label="Sleep Timer"
                      subText={
                        sleepTimerRemaining !== null
                          ? `Timer active: ${Math.floor(sleepTimerRemaining / 60)}:${(sleepTimerRemaining % 60).toString().padStart(2, "0")} remaining`
                          : "Choose time to stop playback"
                      }
                    >
                      <div className="flex flex-col gap-4 mt-4 ml-8 pr-4 shrink-0">
                        {sleepTimerRemaining === null ? (
                          <>
                            <div className="flex items-center justify-between text-sm font-medium">
                              <span className="text-muted-foreground">Custom</span>
                              <span className="text-foreground">{customSleepMins} min</span>
                            </div>
                            <Slider
                              defaultValue={[30]}
                              max={120}
                              min={1}
                              step={1}
                              value={[customSleepMins]}
                              onValueChange={(val) => {
                                setCustomSleepMins(val[0]);
                                Haptics.light();
                              }}
                            />
                            <div className="flex gap-2 justify-between mt-2 overflow-x-auto no-scrollbar">
                              {[15, 30, 45, 60].map((mins) => (
                                <button
                                  key={mins}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setCustomSleepMins(mins);
                                    handleSleepTimerSelect(mins);
                                  }}
                                  className="flex-1 rounded-full bg-foreground/5 hover:bg-rose-500 hover:text-white text-[11px] font-bold px-2 py-2 transition-colors shrink-0 text-foreground"
                                >
                                  {mins}m
                                </button>
                              ))}
                            </div>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleSleepTimerSelect(customSleepMins);
                              }}
                              className="w-full mt-2 rounded-xl bg-rose-500 text-white font-bold text-sm py-2.5 active:scale-[0.98] transition-transform"
                            >
                              START TIMER
                            </button>
                          </>
                        ) : (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              Haptics.medium();
                              setSleepTimer(null);
                              toast.success("Sleep timer turned off");
                            }}
                            className="rounded-xl bg-rose-100 hover:bg-rose-200 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 text-sm font-bold w-full py-2.5 transition-colors"
                          >
                            Turn Off Timer
                          </button>
                        )}
                      </div>
                    </OptionItem>

                    <div className="border-t border-neutral-100 dark:border-neutral-800 my-1.5" />

                    {/* Favorite */}
                    <OptionItem
                      icon={
                        <Heart
                          className={`h-4.5 w-4.5 ${isFavorited ? "text-rose-500 fill-rose-500" : "text-rose-500"}`}
                        />
                      }
                      label={isFavorited ? "Remove Favorite" : "Favorite"}
                      onClick={() => {
                        onToggleFavorite();
                        onClose();
                      }}
                    />

                    {/* Suggest Less */}
                    <OptionItem
                      icon={<ThumbsDown className="h-4.5 w-4.5 text-rose-500" />}
                      label="Suggest Less"
                      onClick={handleSuggestLess}
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {subPanel === "playlists" && (
              <motion.div
                key="playlists"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15, ease: "easeInOut" }}
                className="flex-1 flex flex-col overflow-hidden text-left"
              >
                <div className="flex items-center gap-3 mb-4 border-b border-neutral-100 dark:border-neutral-800 pb-3 shrink-0">
                  <button
                    onClick={() => setSubPanel("menu")}
                    className="grid h-8 w-8 place-items-center rounded-full bg-neutral-100 dark:bg-neutral-800 active:scale-90 transition-transform text-neutral-800 dark:text-neutral-200"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <h4 className="text-base font-bold text-neutral-900 dark:text-white">
                    Add to Playlist
                  </h4>
                </div>

                <div className="flex-1 overflow-y-auto no-scrollbar py-1">
                  <div className="flex flex-col gap-1">
                    <button
                      onClick={handleCreatePlaylist}
                      className="w-full text-left font-semibold text-rose-500 hover:bg-neutral-50 dark:hover:bg-neutral-800 p-3 rounded-xl transition-colors text-sm flex items-center gap-2"
                    >
                      <Plus className="h-4 w-4" /> Create New Playlist...
                    </button>

                    {playlists.map((playlist) => (
                      <button
                        key={playlist}
                        onClick={() => {
                          Haptics.success();
                          toast.success(`Added "${track.title}" to playlist "${playlist}"`);
                          onClose();
                        }}
                        className="w-full text-left font-medium text-neutral-800 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-800 p-3 rounded-xl transition-colors text-sm flex items-center gap-2.5"
                      >
                        <Music className="h-4 w-4 text-neutral-400" />
                        {playlist}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {subPanel === "credits" && (
              <motion.div
                key="credits"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15, ease: "easeInOut" }}
                className="flex-1 flex flex-col overflow-hidden text-left"
              >
                <div className="flex items-center gap-3 mb-4 border-b border-neutral-100 dark:border-neutral-800 pb-3 shrink-0">
                  <button
                    onClick={() => setSubPanel("menu")}
                    className="grid h-8 w-8 place-items-center rounded-full bg-neutral-100 dark:bg-neutral-800 active:scale-90 transition-transform text-neutral-800 dark:text-neutral-200"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <h4 className="text-base font-bold text-neutral-900 dark:text-white">
                    Song Credits
                  </h4>
                </div>

                <div className="flex-1 overflow-y-auto no-scrollbar py-2 text-sm space-y-4">
                  <div>
                    <span className="text-[10px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider block">
                      Title
                    </span>
                    <p className="font-semibold text-neutral-800 dark:text-neutral-200 mt-0.5">
                      {track.title}
                    </p>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider block">
                      Performing Artist
                    </span>
                    <p className="font-semibold text-neutral-800 dark:text-neutral-200 mt-0.5">
                      {track.artist}
                    </p>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider block">
                      Album
                    </span>
                    <p className="font-semibold text-neutral-800 dark:text-neutral-200 mt-0.5">
                      {track.album || "Single"}
                    </p>
                  </div>
                  <div className="border-t border-neutral-100 dark:border-neutral-800 pt-3">
                    <span className="text-[10px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider block">
                      Writers
                    </span>
                    <p className="font-medium text-neutral-700 dark:text-neutral-300 mt-0.5">
                      Alex Rivera, Maya Lin, Jordan Smith
                    </p>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider block">
                      Producers
                    </span>
                    <p className="font-medium text-neutral-700 dark:text-neutral-300 mt-0.5">
                      Leo Thorne, Sarah Chen
                    </p>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider block">
                      Record Label & Distr.
                    </span>
                    <p className="font-medium text-neutral-700 dark:text-neutral-300 mt-0.5">
                      VibeIN Global Records Ltd. © 2026
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </>
  );
}

function OptionItem({
  icon,
  label,
  subText,
  onClick,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  subText?: string;
  onClick?: () => void;
  children?: React.ReactNode;
}) {
  return (
    <div
      onClick={() => {
        if (onClick) onClick();
      }}
      className={`w-full text-left flex flex-col justify-center rounded-xl p-3 transition-colors ${
        onClick
          ? "cursor-pointer hover:hover:bg-foreground/5 active:bg-foreground/10 text-foreground"
          : ""
      }`}
    >
      <div className="flex items-center gap-3.5">
        <div className="grid h-5 w-5 shrink-0 place-items-center">{icon}</div>
        <div className="min-w-0 flex-1">
          <span className="text-[13.5px] font-semibold text-neutral-800 dark:text-neutral-200">
            {label}
          </span>
          {subText && (
            <p className="text-[10.5px] text-neutral-400 dark:text-neutral-500 mt-0.5 font-medium leading-none">
              {subText}
            </p>
          )}
        </div>
      </div>
      {children}
    </div>
  );
}
