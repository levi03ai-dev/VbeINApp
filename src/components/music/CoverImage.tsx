import React, { useState, useEffect } from "react";
import { Music2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface CoverImageProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string | null;
  alt?: string;
  title?: string;
  artist?: string;
  className?: string;
  imgClassName?: string;
  iconSize?: number;
}

/**
 * Generates a stable, warm dominant color gradient based on a text string (e.g. song title/artist).
 */
function getDominantColorStyle(seedText?: string): React.CSSProperties {
  if (!seedText) {
    return {
      background: "linear-gradient(135deg, oklch(0.28 0.04 45) 0%, oklch(0.18 0.02 35) 100%)",
    };
  }

  let hash = 0;
  for (let i = 0; i < seedText.length; i++) {
    hash = seedText.charCodeAt(i) + ((hash << 5) - hash);
  }

  const hue1 = Math.abs(hash % 360);
  const hue2 = (hue1 + 40) % 360;

  return {
    background: `linear-gradient(135deg, oklch(0.35 0.12 ${hue1}) 0%, oklch(0.20 0.08 ${hue2}) 100%)`,
  };
}

export const CoverImage: React.FC<CoverImageProps> = ({
  src,
  alt = "Cover thumbnail",
  title,
  artist,
  className,
  imgClassName,
  iconSize,
  ...props
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Reset error state if image src changes
  useEffect(() => {
    setHasError(false);
    setIsLoaded(false);
  }, [src]);

  const seed = title || artist || alt || "music";
  const dominantStyle = getDominantColorStyle(seed);

  const showFallback = hasError || !src || !src.trim();

  return (
    <div
      className={cn(
        "relative overflow-hidden flex items-center justify-center bg-surface select-none shrink-0",
        className,
      )}
      style={dominantStyle}
      {...props}
    >
      {/* Blurred background glow layer for rich texture */}
      <div className="absolute inset-0 backdrop-blur-md opacity-60 pointer-events-none" />

      {!showFallback && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          referrerPolicy="no-referrer"
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={cn(
            "w-full h-full object-cover transition-opacity duration-300 relative z-10",
            isLoaded ? "opacity-100" : "opacity-0",
            imgClassName,
          )}
        />
      )}

      {/* Fallback state when missing or failed loading */}
      {showFallback && (
        <div className="relative z-10 flex flex-col items-center justify-center text-foreground/80 p-1 text-center">
          <Music2
            className="text-foreground/70 drop-shadow-md animate-pulse"
            size={iconSize || 24}
            style={{
              width: iconSize ? `${iconSize}px` : undefined,
              height: iconSize ? `${iconSize}px` : undefined,
            }}
          />
          {title && (
            <span className="text-[10px] font-semibold mt-1 line-clamp-1 max-w-[90%] px-1 text-foreground/90 drop-shadow">
              {title}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
