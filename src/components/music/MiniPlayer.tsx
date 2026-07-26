import { motion, AnimatePresence } from "framer-motion";
import { SkipForward, SkipBack } from "lucide-react";
import { usePlayer, usePlaybackProgress } from "@/lib/player-context";
import { getCoverUrl } from "@/lib/music-data";
import { duration, ease, spring } from "@/lib/motion";
import { PlayPauseIcon } from "./PlayPauseIcon";
import { AudioVisualizer } from "./AudioVisualizer";
import { CoverImage } from "./CoverImage";

export function MiniPlayer() {
  const { 
    track, 
    isPlaying, 
    toggle, 
    next, 
    prev, 
    openNowPlaying, 
    pause, 
    setTrack, 
    nowPlayingOpen 
  } = usePlayer();
  const { progress } = usePlaybackProgress();

  const safeCoverUrl = track?.coverUrl ? getCoverUrl(track.coverUrl) : null;

  return (
    <AnimatePresence>
      {track && !nowPlayingOpen && (
        <motion.div
          layoutId="player-shell"
          initial={{ opacity: 0, y: 50, scale: 0.92, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: 80, scale: 0.92, filter: "blur(4px)", transition: { duration: 0.22, ease: "easeIn" } }}
          drag="y"
          dragConstraints={{ top: 0, bottom: 0 }}
          dragElastic={{ top: 0.15, bottom: 0.65 }}
          onDragEnd={(e, info) => {
            if (info.offset.y < -35) {
              openNowPlaying();
            } else if (info.offset.y > 35) {
              pause();
              setTrack(null);
            }
          }}
          onClick={(e) => {
            // Avoid opening Now Playing if clicking control buttons
            if ((e.target as HTMLElement).closest("button")) {
              return;
            }
            openNowPlaying();
          }}
          className="pointer-events-auto fixed left-1/2 -translate-x-1/2 w-[94%] max-w-sm px-2 bottom-[calc(env(safe-area-inset-bottom)+76px)] z-40 cursor-pointer select-none"
          transition={spring.sheet}
        >
          <div
            className="bg-white/12 dark:bg-black/20 backdrop-blur-[40px] saturate-[210%] relative flex w-full items-center gap-3 overflow-hidden rounded-full border border-white/18 dark:border-white/5 pb-3 pt-1.5 pl-1.5 pr-4 text-left shadow-[0_12px_45px_rgba(0,0,0,0.15)] dark:shadow-[0_12px_45px_rgba(0,0,0,0.4)] cursor-pointer select-none"
          >
            {/* Circular vinyl disc rotating artwork (Only image rotates) */}
            <motion.div
              layoutId="player-artwork"
              animate={{ 
                scale: isPlaying ? 1 : 0.94,
              }}
              transition={{
                scale: spring.gentle,
              }}
              className="h-11 w-11 shrink-0 rounded-full relative overflow-hidden flex items-center justify-center shadow-md border border-white/10"
              style={{ background: track.gradient }}
            >
              {/* Spinning container for the artwork only */}
              <motion.div
                animate={{ 
                  rotate: isPlaying ? 360 : 0
                }}
                transition={{
                  rotate: isPlaying 
                    ? { repeat: Infinity, duration: 18, ease: "linear" } 
                    : { duration: 0.35, ease: "easeOut" }
                }}
                className="absolute inset-0 h-full w-full rounded-full overflow-hidden"
              >
                <CoverImage
                  src={safeCoverUrl || undefined}
                  title={track.title}
                  artist={track.artist}
                  iconSize={18}
                  className="h-full w-full object-cover rounded-full"
                  imgClassName="rounded-full"
                />
              </motion.div>

              {/* Static overlay and visualizer */}
              <div className="absolute inset-0 bg-black/30 rounded-full z-10 pointer-events-none" />
              <div className="relative z-20 pointer-events-none">
                <AudioVisualizer isPlaying={isPlaying} colorClass="bg-white" />
              </div>
            </motion.div>

            {/* Cohesive metadata transition */}
            <div className="min-w-0 flex-1 text-left select-none pr-1 pointer-events-none">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={track.id}
                  initial={{ opacity: 0, y: 6, filter: "blur(2px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -6, filter: "blur(2px)" }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  <p className="truncate text-[12.5px] font-semibold tracking-tight text-foreground leading-normal">
                    {track.title}
                  </p>
                  <p className="truncate text-[10.5px] font-medium text-muted-foreground leading-none mt-0.5">
                    {track.artist}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Optimized tactile buttons */}
            <div className="flex items-center gap-1 relative z-30">
              <motion.button
                whileHover={{ scale: 1.12 }}
                whileTap={{ scale: 0.88 }}
                onClick={(e) => {
                  e.stopPropagation();
                  prev();
                }}
                className="grid h-8.5 w-8.5 place-items-center rounded-full text-foreground/80 hover:text-foreground hover:bg-foreground/5 active:bg-foreground/10 transition-colors"
                aria-label="Previous"
              >
                <SkipBack className="h-4.5 w-4.5 fill-current" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.85 }}
                onClick={(e) => {
                  e.stopPropagation();
                  toggle();
                }}
                className="grid h-8.5 w-8.5 place-items-center rounded-full text-foreground hover:bg-foreground/5 active:bg-foreground/10 transition-colors"
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                <PlayPauseIcon isPlaying={isPlaying} size="sm" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.12 }}
                whileTap={{ scale: 0.88 }}
                onClick={(e) => {
                  e.stopPropagation();
                  next();
                }}
                className="grid h-8.5 w-8.5 place-items-center rounded-full text-foreground/80 hover:text-foreground hover:bg-foreground/5 active:bg-foreground/10 transition-colors"
                aria-label="Next"
              >
                <SkipForward className="h-4.5 w-4.5 fill-current" />
              </motion.button>
            </div>

            {/* Inset floating progress bar capsule */}
            <div className="absolute inset-x-5 bottom-[4px] h-[2.5px] rounded-full bg-foreground/5 overflow-hidden pointer-events-none">
              <motion.div
                className="h-full bg-accent rounded-full"
                animate={{ width: `${progress * 100}%` }}
                transition={{ duration: 0.25, ease: "linear" }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
