import { useState } from "react";
import { motion } from "framer-motion";
import { usePlayer, isSameSong } from "@/lib/player-context";
import { type Album, type Playlist, type Track, getCoverUrl } from "@/lib/music-data";
import { spring } from "@/lib/motion";
import { Bookmark, Heart, MoreVertical, Play, Plus } from "lucide-react";
import { CoverImage } from "./CoverImage";
import { AudioVisualizer } from "./AudioVisualizer";
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
  const safeCoverUrl = coverUrl ? getCoverUrl(coverUrl) : null;

  return (
    <motion.div
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.02 }}
      transition={spring.gentle}
      className={`relative aspect-square overflow-hidden rounded-xl album-shadow ${className}`}
      style={{
        background: gradient,
      }}
    >
      <CoverImage
        src={safeCoverUrl || undefined}
        className="absolute inset-0 h-full w-full object-cover z-0"
      />
      <div className="absolute inset-0 z-10 bg-[radial-gradient(120%_60%_at_10%_0%,rgba(255,255,255,0.25),transparent_50%)] pointer-events-none" />
      <div className="relative z-20 h-full w-full">{children}</div>
    </motion.div>
  );
}

export function TrackCard({ track, wide = false }: { track: Track; wide?: boolean }) {
  const { setTrack, openNowPlaying, setQueue } = usePlayer();
  return (
    <button
      onClick={() => {
        setTrack(track);
        openNowPlaying();
      }}
      className={`group flex flex-col text-left ${wide ? "w-[78vw] max-w-[320px]" : "w-full"}`}
    >
      <ArtworkTile gradient={track.gradient} coverUrl={track.coverUrl} />
      <p className="mt-2 line-clamp-1 text-[13px] font-medium text-foreground tracking-tight">
        {track.title}
      </p>
      <p className="line-clamp-1 text-[11px] text-muted-foreground/80">{track.artist}</p>
    </button>
  );
}

export function AlbumCard({ album, wide = false }: { album: Album; wide?: boolean }) {
  const { setTrack, openNowPlaying, setQueue } = usePlayer();
  return (
    <button
      onClick={async () => {
        try {
          const { searchTracks } = await import("@/lib/music-service");
          const tracks = await searchTracks(album.title + " " + album.artist, 10);
          if (tracks.length > 0) {
            setQueue(tracks);
            setTrack(tracks[0]);
            openNowPlaying();
          } else {
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
          }
        } catch {
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
        }
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
  const { setTrack, openNowPlaying, setQueue } = usePlayer();
  return (
    <button
      onClick={async () => {
        try {
          const { searchTracks } = await import("@/lib/music-service");
          const tracks = await searchTracks(playlist.title, 10);
          if (tracks.length > 0) {
            setQueue(tracks);
            setTrack(tracks[0]);
            openNowPlaying();
          } else {
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
          }
        } catch {
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
        }
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
  const {
    track: currentTrack,
    isPlaying,
    setTrack,
    openNowPlaying,
    addToPlayNext,
    addToQueue,
    toggleFavorite,
    isFavorite,
    toggleSaveTrack,
    isTrackSaved,
  } = usePlayer();

  const isActive = isSameSong(track, currentTrack);
  const favorited = isFavorite(track);
  const saved = isTrackSaved(track);
  const safeCoverUrl = track.coverUrl ? getCoverUrl(track.coverUrl) : null;

  return (
    <div
      className={`flex w-full items-center gap-3 rounded-xl py-1.5 px-2 hover:bg-foreground/5 transition-colors duration-200 group ${
        isActive ? "bg-foreground/5" : ""
      }`}
    >
      <button
        onClick={() => {
          onSelect?.();
          setTrack(track);
          openNowPlaying();
        }}
        className="flex flex-1 items-center gap-3 text-left min-w-0 cursor-pointer"
      >
        <div
          className="h-9 w-9 shrink-0 rounded-lg overflow-hidden relative shadow-sm"
          style={{ background: track.gradient }}
        >
          <CoverImage
            src={safeCoverUrl || undefined}
            title={track.title}
            artist={track.artist}
            iconSize={16}
            className="absolute inset-0 h-full w-full object-cover z-0"
          />
          <div className="absolute inset-0 z-10 bg-[radial-gradient(100%_50%_at_0%_0%,rgba(255,255,255,0.2),transparent_60%)] pointer-events-none" />
          {isActive && (
            <div className="absolute inset-0 z-20 bg-black/40 backdrop-blur-[1px] flex items-center justify-center">
              <AudioVisualizer isPlaying={isPlaying} colorClass="bg-rose-500" />
            </div>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <p
            className={`truncate text-[13px] font-semibold tracking-tight ${
              isActive ? "text-rose-500 font-bold" : "text-foreground"
            }`}
          >
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
            onClick={() => toggleSaveTrack(track)}
            className="flex items-center gap-2 text-[12px] cursor-pointer"
          >
            <Bookmark
              className={`h-3.5 w-3.5 ${saved ? "fill-indigo-500 text-indigo-500" : "text-indigo-500"}`}
            />
            <span>{saved ? "Remove from Saved" : "Save to Library"}</span>
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
