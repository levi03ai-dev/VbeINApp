import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronLeft, Search, X } from "lucide-react";
import { Haptics } from "@/lib/haptics";
import type { Track, Album, Playlist } from "@/lib/music-data";
import { AlbumCard, PlaylistTile, TrackRow } from "./cards";
import { seeAllAlbums, seeAllPlaylists, jumpBackInTracks, trendingTracks } from "@/lib/music-data";

export function SeeAllSheet({
  category,
  title,
  onClose,
  popularTracks = [],
}: {
  category:
    | "featured_albums"
    | "jump_back_in"
    | "trending_now"
    | "new_releases"
    | "recently_added"
    | "new_this_week"
    | "curated_collections";
  title: string;
  onClose: () => void;
  popularTracks?: Track[];
}) {
  const [searchQuery, setSearchQuery] = useState("");

  const items = (() => {
    switch (category) {
      case "featured_albums":
      case "new_releases":
      case "new_this_week":
        return seeAllAlbums;
      case "jump_back_in":
        return jumpBackInTracks;
      case "trending_now":
        return popularTracks.length > 0 ? popularTracks : trendingTracks;
      case "recently_added":
      case "curated_collections":
        return seeAllPlaylists;
      default:
        return [];
    }
  })();

  const filteredItems = (items as (Track | Album | Playlist)[]).filter((item) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;

    const itemTitle = ("title" in item ? item.title : "").toLowerCase();
    const itemArtist = ("artist" in item ? item.artist : "").toLowerCase();
    const itemSubtitle = ("subtitle" in item ? (item as Playlist).subtitle : "").toLowerCase();
    return itemTitle.includes(q) || itemArtist.includes(q) || itemSubtitle.includes(q);
  });

  return (
    <motion.div
      initial={{ x: "100%", opacity: 0.9 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: "100%", opacity: 0.9 }}
      transition={{ type: "spring", stiffness: 300, damping: 28 }}
      className="fixed inset-0 z-40 bg-background flex flex-col pt-safe overflow-hidden"
    >
      {/* Header */}
      <div className="pt-12 px-4 pb-3 border-b border-white/5 bg-background/50 backdrop-blur-xl sticky top-0 z-10 flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              Haptics.light();
              onClose();
            }}
            className="h-9 w-9 rounded-full bg-white/5 border border-white/5 hover:bg-white/10 active:scale-95 flex items-center justify-center transition-all cursor-pointer"
          >
            <ChevronLeft className="h-5 w-5 text-foreground" />
          </button>
          <h1 className="text-[19px] font-bold text-foreground leading-none tracking-tight">
            {title}
          </h1>
        </div>

        {/* Sticky Search bar */}
        <div className="relative flex items-center">
          <Search className="absolute left-3 h-4 w-4 text-muted-foreground pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              Haptics.light();
            }}
            placeholder={`Search in ${title.toLowerCase()}...`}
            className="w-full bg-white/[0.04] border border-white/5 hover:bg-white/[0.07] focus:bg-white/[0.07] focus:border-white/10 rounded-xl py-2 pl-9 pr-9 text-[13px] text-foreground placeholder-muted-foreground outline-none transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => {
                setSearchQuery("");
                Haptics.light();
              }}
              className="absolute right-3 h-5 w-5 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 flex items-center justify-center transition-all cursor-pointer"
            >
              <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
            </button>
          )}
        </div>
      </div>

      {/* Content scroll box */}
      <div className="flex-1 overflow-y-auto no-scrollbar px-4 pb-24 pt-3">
        {filteredItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in duration-300">
            <div className="h-12 w-12 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-muted-foreground/60 mb-3">
              <Search className="h-5 w-5" />
            </div>
            <p className="text-[14px] font-medium text-foreground/80">No results found</p>
            <p className="text-[11px] text-muted-foreground mt-1 max-w-[200px]">
              We couldn't find anything matching "{searchQuery}"
            </p>
          </div>
        ) : (
          <div className="animate-in fade-in duration-300">
            {category === "featured_albums" ||
            category === "new_releases" ||
            category === "recently_added" ||
            category === "new_this_week" ||
            category === "curated_collections" ? (
              <div className="grid grid-cols-2 gap-x-4 gap-y-5">
                {(filteredItems as (Album | Playlist)[]).map((item, i: number) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: Math.min(0.2, i * 0.03), duration: 0.3 }}
                  >
                    {category === "recently_added" || category === "curated_collections" ? (
                      <PlaylistTile playlist={item as Playlist} />
                    ) : (
                      <AlbumCard album={item as Album} />
                    )}
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="space-y-1">
                {(filteredItems as Track[]).map((track, i: number) => (
                  <motion.div
                    key={track.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: Math.min(0.2, i * 0.02), duration: 0.25 }}
                  >
                    <TrackRow track={track} index={i} />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}
