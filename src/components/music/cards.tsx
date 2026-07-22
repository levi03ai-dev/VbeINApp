import { useState } from "react";
import { motion } from "framer-motion";
import { usePlayer } from "@/lib/player-context";
import type { Album, Playlist, Track } from "@/lib/music-data";
import { spring } from "@/lib/motion";
import { Heart, MoreVertical, Play, Plus } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ArtworkTile({
  gradient,
  coverUrl,
  className = "",
  children,
}: {
  gradient: string;
  coverUrl?: string;
  className?: string;
  children?: React.ReactNode;
}) {
  const [imgError, setImgError] = useState(false);
  const safeCoverUrl = coverUrl && !imgError ? coverUrl.trim().replace(/ /g, "%20") : null;

  return (
    <motion.div
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.02 }}
      transition={spring.gentle}
      className={`relative aspect-square overflow-hidden rounded-xl album-shadow bg-cover bg-center ${className}`}
      style={
        safeCoverUrl ? { backgroundImage: `url("${safeCoverUrl}")` } : { background: gradient }
      }
    >
      {coverUrl && !imgError && (
        <img src={safeCoverUrl} alt="" className="hidden" onError={() => setImgError(true)} />
      )}
      <div className="absolute inset-0 bg-[radial-gradient(120%_60%_at_10%_0%,rgba(255,255,255,0.35),transparent_50%)]" />
      {children}
    </motion.div>
  );
}

export function AlbumCard({ album, wide = false }: { album: Album; wide?: boolean }) {
  const { setTrack, openNowPlaying } = usePlayer();
  return (
    <button
      onClick={() => {
        setTrack({
          id: album.id,
          title: album.title,
          artist: album.artist,
          album: album.title,
          duration: "3:42",
          gradient: album.gradient,
          coverUrl: album.coverUrl,
        });
        openNowPlaying();
      }}
      className={`group flex flex-col text-left ${wide ? "w-[78vw] max-w-[320px]" : "w-full"}`}
    >
      <ArtworkTile gradient={album.gradient} coverUrl={album.coverUrl} />
      <p className="mt-2 line-clamp-1 text-[13px] font-medium text-foreground tracking-tight">
        {album.title}
      </p>
      <p className="line-clamp-1 text-[11px] text-muted-foreground/80">{album.artist}</p>
    </button>
  );
}

export function PlaylistTile({ playlist }: { playlist: Playlist }) {
  const { setTrack, openNowPlaying } = usePlayer();
  return (
    <button
      onClick={() => {
        setTrack({
          id: playlist.id,
          title: playlist.title,
          artist: playlist.subtitle,
          album: playlist.title,
          duration: "3:20",
          gradient: playlist.gradient,
          coverUrl: playlist.coverUrl,
        });
        openNowPlaying();
      }}
      className="w-full text-left"
    >
      <ArtworkTile gradient={playlist.gradient} coverUrl={playlist.coverUrl}>
        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/60 via-black/20 to-transparent">
          <p className="text-[13px] font-bold leading-tight text-white tracking-tight">
            {playlist.title}
          </p>
        </div>
      </ArtworkTile>
    </button>
  );
}

export function TrackRow({
  track,
  index,
  onSelect,
}: {
  track: Track;
  index: number;
  onSelect?: () => void;
}) {
  const { setTrack, openNowPlaying, addToPlayNext, addToQueue, toggleFavorite, isFavorite } =
    usePlayer();
  const favorited = isFavorite(track.id);
  const [imgError, setImgError] = useState(false);
  const safeCoverUrl =
    track.coverUrl && !imgError ? track.coverUrl.trim().replace(/ /g, "%20") : null;

  return (
    <div className="flex w-full items-center gap-3 rounded-xl py-1 px-2 hover:bg-foreground/5 transition-colors duration-200 group">
      <button
        onClick={() => {
          onSelect?.();
          setTrack(track);
          openNowPlaying();
        }}
        className="flex flex-1 items-center gap-3 text-left min-w-0 cursor-pointer"
      >
        <div
          className="h-9 w-9 shrink-0 rounded-lg overflow-hidden relative bg-cover bg-center animate-fade-in"
          style={
            safeCoverUrl
              ? { backgroundImage: `url("${safeCoverUrl}")` }
              : { background: track.gradient }
          }
        >
          {track.coverUrl && !imgError && (
            <img src={safeCoverUrl} alt="" className="hidden" onError={() => setImgError(true)} />
          )}
          <div className="absolute inset-0 bg-[radial-gradient(100%_50%_at_0%_0%,rgba(255,255,255,0.2),transparent_60%)]" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-[13px] font-semibold text-foreground tracking-tight">
            {track.title}
          </p>
          <p className="truncate text-[11px] text-muted-foreground mt-0.5">{track.artist}</p>
        </div>
        <span className="text-[11px] tabular-nums text-muted-foreground/60 mr-1 shrink-0">
          {track.duration}
        </span>
      </button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="h-8 w-8 rounded-full flex items-center justify-center hover:bg-foreground/10 text-muted-foreground hover:text-foreground transition-colors shrink-0 cursor-pointer">
            <MoreVertical className="h-4 w-4" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-48 bg-background/95 backdrop-blur-md border border-border"
        >
          <DropdownMenuItem
            onClick={() => toggleFavorite(track)}
            className="flex items-center gap-2 text-[12px] cursor-pointer"
          >
            <Heart
              className={`h-3.5 w-3.5 ${favorited ? "fill-rose-500 text-rose-500" : "text-rose-500"}`}
            />
            <span>{favorited ? "Unlike Song" : "Like Song"}</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => addToPlayNext(track)}
            className="flex items-center gap-2 text-[12px] cursor-pointer"
          >
            <Play className="h-3.5 w-3.5 text-rose-500" />
            <span>Play Next</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => addToQueue(track)}
            className="flex items-center gap-2 text-[12px] cursor-pointer"
          >
            <Plus className="h-3.5 w-3.5 text-rose-500" />
            <span>Add to Queue</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export function SectionHeader({
  title,
  subtitle,
  action = null,
  onActionClick,
}: {
  title: string;
  subtitle?: string;
  action?: string | null;
  onActionClick?: () => void;
}) {
  return (
    <div className="mb-2.5 flex items-end justify-between px-4 pt-1">
      <div>
        <h2 className="text-[16px] font-semibold tracking-tight text-foreground/90">{title}</h2>
        {subtitle && (
          <p className="text-[11px] text-muted-foreground mt-0.5 font-medium leading-none">
            {subtitle}
          </p>
        )}
      </div>
      {action && (
        <button
          onClick={onActionClick}
          className="text-[11px] font-semibold text-accent-pink transition active:scale-95 hover:text-accent-pink/80 cursor-pointer"
        >
          {action}
        </button>
      )}
    </div>
  );
}
