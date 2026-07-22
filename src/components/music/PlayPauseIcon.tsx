import { motion } from "framer-motion";

interface PlayPauseIconProps {
  isPlaying: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function PlayPauseIcon({ isPlaying, size = "md", className = "" }: PlayPauseIconProps) {
  // Dimensions based on size
  const sizes = {
    sm: { container: "h-5 w-5", svgSize: 20 },
    md: { container: "h-8 w-8", svgSize: 32 },
    lg: { container: "h-14 w-14", svgSize: 56 },
  };

  const { container, svgSize } = sizes[size];

  // We can build a custom SVG play/pause morphing path or highly optimized animated elements.
  // Pause state: two separate vertical bars.
  // Play state: those bars rotate, scale and slide to form a play triangle.
  // To keep it perfectly reliable, crisp, and high-performance, we can animate two custom paths or bars.
  //
  // Let's draw:
  // Bar 1 (left bar of pause, or top-left half of play triangle)
  // Bar 2 (right bar of pause, or bottom-left half of play triangle)
  //
  // Alternatively, we can use a highly refined rotational crossfade with spring that runs simultaneously
  // (without waiting) which looks extremely elegant and Apple-like.

  return (
    <div className={`relative flex items-center justify-center ${container} ${className}`}>
      {/* Play Icon */}
      <motion.div
        animate={{
          opacity: isPlaying ? 0 : 1,
          scale: isPlaying ? 0.3 : 1,
          rotate: isPlaying ? -90 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 24,
          mass: 0.8,
        }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-full w-full">
          {/* Custom rounded triangle for premium play feel */}
          <path d="M7 4.512a1.5 1.5 0 0 1 2.259-1.299l10.155 5.863a1.5 1.5 0 0 1 0 2.598L9.26 17.537A1.5 1.5 0 0 1 7 16.237V4.512z" />
        </svg>
      </motion.div>

      {/* Pause Icon */}
      <motion.div
        animate={{
          opacity: isPlaying ? 1 : 0,
          scale: isPlaying ? 1 : 0.3,
          rotate: isPlaying ? 0 : 90,
        }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 24,
          mass: 0.8,
        }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-full w-full">
          {/* Custom elegant rounded pause bars */}
          <rect x="6" y="4" width="4" height="16" rx="1.5" />
          <rect x="14" y="4" width="4" height="16" rx="1.5" />
        </svg>
      </motion.div>
    </div>
  );
}
