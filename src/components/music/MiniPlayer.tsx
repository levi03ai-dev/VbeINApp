import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SkipForward } from "lucide-react";
import { usePlayer } from "@/lib/player-context";
import { duration, ease, spring } from "@/lib/motion";
import { PlayPauseIcon } from "./PlayPauseIcon";
import { AudioVisualizer } from "./AudioVisualizer";

export function MiniPlayer() {
  const { track, isPlaying, toggle, next, openNowPlaying, progress, pause, setTrack } = usePlayer();
  const [imgError, setImgError] = useState(false);

  if (!track) return null;

  const safeCoverUrl =
    track.coverUrl && !imgError ? track.coverUrl.trim().replace(/ /g, "%20") : null;

  return (
    <motion.div
      layoutId="player-shell"
      drag="y"
      dragConstraints={{ top: 0, bottom: 0 }}
      dragElastic={{ top: 0.2, bottom: 0.2 }}
      onDragEnd={(e, info) => {
        if (info.offset.y < -30) {
          openNowPlaying();
        } else if (info.offset.y > 30) {
          pause();
          setTrack(null);
        }
      }}
      className="pointer-events-auto fixed inset-x-2 bottom-[calc(env(safe-area-inset-bottom)+64px)] z-30"
      transition={spring.sheet}
    >
      <div
        onClick={openNowPlaying}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            openNowPlaying();
          }
        }}
        className="glass-strong relative flex w-full items-center gap-3 overflow-hidden rounded-2xl border border-border/80 p-2 pr-3 text-left album-shadow cursor-pointer select-none"
      >
        <motion.div
          layoutId="player-artwork"
          animate={{ scale: isPlaying ? 1 : 0.9 }}
          transition={spring.gentle}
          className="h-11 w-11 shrink-0 rounded-lg relative overflow-hidden flex items-center justify-center shadow-inner bg-cover bg-center"
          style={
            safeCoverUrl
              ? { backgroundImage: `url("${safeCoverUrl}")`, borderRadius: "8px" }
              : { background: track.gradient, borderRadius: "8px" }
          }
        >
          {track.coverUrl && !imgError && (
            <img src={safeCoverUrl} alt="" className="hidden" onError={() => setImgError(true)} />
          )}
          <div className="absolute inset-0 bg-black/25" />
          <div className="relative z-10">
            <AudioVisualizer isPlaying={isPlaying} colorClass="bg-white" />
          </div>
        </motion.div>
        <div className="min-w-0 flex-1 text-left">
          <AnimatePresence mode="wait" initial={false}>
            <motion.p
              key={track.id}
              initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
              transition={{ duration: duration.base, ease: ease.soft }}
              className="truncate text-[13px] font-medium tracking-tight text-foreground"
            >
              {track.title}
            </motion.p>
          </AnimatePresence>
          <p className="truncate text-[11px] text-muted-foreground">{track.artist}</p>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggle();
          }}
          className="grid h-8.5 w-8.5 place-items-center rounded-full text-foreground hover:bg-foreground/5 active:scale-90 transition-colors"
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          <PlayPauseIcon isPlaying={isPlaying} size="sm" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            next();
          }}
          className="grid h-8.5 w-8.5 place-items-center rounded-full text-foreground hover:bg-foreground/5 active:scale-90 transition-colors"
          aria-label="Next"
        >
          <SkipForward className="h-4.5 w-4.5 fill-current" />
        </button>
        <div className="absolute inset-x-0 bottom-0 h-[2px] bg-foreground/5">
          <motion.div
            className="h-full bg-accent/80"
            animate={{ width: `${progress * 100}%` }}
            transition={{ duration: 0.25, ease: "linear" }}
          />
        </div>
      </div>
    </motion.div>
  );
}
