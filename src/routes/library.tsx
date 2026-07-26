import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bookmark,
  ChevronLeft,
  ChevronRight,
  Clock,
  Download,
  Heart,
  Music,
  Play,
  X,
} from "lucide-react";
import { Header } from "./index";
import { usePlayer } from "@/lib/player-context";
import type { Track } from "@/lib/music-data";
import { duration, ease } from "@/lib/motion";
import { TrackRow } from "@/components/music/cards";
import { CoverImage } from "@/components/music/CoverImage";
import { topCharts, featuredAlbums, getCoverUrl } from "@/lib/music-data";

export const Route = createFileRoute("/library")({
  head: () => ({
    meta: [
      { title: "Library — VibeIN" },
      { name: "description", content: "Your playlists, artists, albums, and downloads." },
    ],
  }),
  component: Library,
});

const categories = [
  { id: "songs", label: "Songs" },
  { id: "albums", label: "Albums" },
  { id: "artists", label: "Artists" },
  { id: "playlists", label: "Playlists" },
] as const;

type CategoryTab = (typeof categories)[number]["id"];

const libraryPlaylists = [
  {
    id: "lib-pl1",
    title: "Saved Songs",
    gradient: "linear-gradient(135deg, #6366f1 0%, #a855f7 100%)",
    iconType: "bookmark",
  },
  {
    id: "lib-pl2",
    title: "Liked Songs",
    gradient: "linear-gradient(135deg, #ec4899 0%, #f43f5e 100%)",
    iconType: "heart",
  },
  {
    id: "lib-pl3",
    title: "Recently Played",
    gradient: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
    iconType: "clock",
  },
  {
    id: "lib-pl4",
    title: "Downloaded",
    subtitle: "12 songs",
    gradient: "linear-gradient(135deg, #10b981 0%, #3b82f6 100%)",
    iconType: "download",
  },
  {
    id: "lib-pl5",
    title: "My Mix",
    subtitle: "18 songs",
    gradient: "linear-gradient(135deg, #f97316 0%, #ef4444 100%)",
    iconType: "music",
  },
];

function Library() {
  const [activeTab, setActiveTab] = useState<CategoryTab>("songs");
  const [selectedPlaylist, setSelectedPlaylist] = useState<{
    title: string;
    subtitle?: string;
    tracks: Track[];
  } | null>(null);

  const { setTrack, openNowPlaying, likedTracks, savedTracks, recentlyPlayed, savedAlbums } =
    usePlayer();

  const libraryAlbums = savedAlbums.length > 0 ? savedAlbums : featuredAlbums;

  // Extract unique artists from topCharts
  const libraryArtists = Array.from(new Set(topCharts.map((t) => t.artist)))
    .map((name, i) => {
      const track = topCharts.find((t) => t.artist === name);
      // Generate a stable listener count based on a simple hash of the artist's name
      const stableListeners = (() => {
        let hash = 0;
        for (let j = 0; j < name.length; j++) {
          hash = name.charCodeAt(j) + ((hash << 5) - hash);
        }
        const numeric = Math.abs(hash % 45) + 12; // Between 12 and 56
        const decimal = Math.abs(hash % 10);
        return `${numeric}.${decimal}M listeners`;
      })();

      return {
        id: "art-" + i,
        name,
        genre: "Pop",
        listeners: stableListeners,
        image: track?.coverUrl ? getCoverUrl(track.coverUrl) : "",
      };
    })
    .slice(0, 8);

  const [isLoadingModal, setIsLoadingModal] = useState(false);

  const handleOpenPlaylist = async (title: string, subtitle?: string) => {
    let modalTracks = topCharts;

    if (title === "Saved Songs") {
      modalTracks = savedTracks;
    } else if (title === "Liked Songs") {
      modalTracks = likedTracks;
    } else if (title === "Recently Played") {
      modalTracks = recentlyPlayed;
    } else if (title === "Downloaded" || title === "My Mix") {
      // fallback for specific hardcoded playlists
      modalTracks = topCharts;
    } else {
      setIsLoadingModal(true);
      try {
        const { searchTracks } = await import("@/lib/music-service");
        const results = await searchTracks(title, 30);
        if (results && results.length > 0) {
          modalTracks = results;
        }
      } catch (e) {
        console.error("Failed to load artist/album tracks", e);
      } finally {
        setIsLoadingModal(false);
      }
    }

    setSelectedPlaylist({
      title,
      subtitle,
      tracks: modalTracks,
    });
  };

  // Combine songs for the "Songs" tab
  const songsTabTracks =
    recentlyPlayed.length > 0 ? recentlyPlayed : savedTracks.length > 0 ? savedTracks : topCharts;

  return (
    <div className="pt-3 pb-24">
      <Header title="Library" avatar />

      {/* 4 Category Tabs Row */}
      <div className="flex gap-2.5 px-4 mb-6 mt-2 overflow-x-auto no-scrollbar">
        {categories.map((cat) => {
          const isActive = activeTab === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`relative rounded-full px-4.5 py-1.5 text-[13px] font-semibold transition-all duration-300 select-none cursor-pointer shrink-0 ${
                isActive
                  ? "text-zinc-950 bg-white shadow-sm shadow-black/10"
                  : "text-muted-foreground bg-foreground/10 hover:text-foreground/80"
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Active Tab Content Panel */}
      <div className="px-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 18, filter: "blur(10px)", scale: 0.985 }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
            exit={{ opacity: 0, y: -14, filter: "blur(10px)", scale: 0.99 }}
            transition={{
              duration: duration.slow,
              ease: ease.soft,
              filter: { duration: duration.base, ease: ease.out },
            }}
          >
            {/* SONGS TAB */}
            {activeTab === "songs" && (
              <div className="flex flex-col space-y-4">
                <div className="relative overflow-hidden rounded-2xl p-4 bg-gradient-to-r from-blue-500/20 via-purple-500/15 to-indigo-500/10 border border-white/10 flex items-center justify-between shadow-sm">
                  <div className="flex items-center gap-3.5">
                    <div className="h-12 w-12 rounded-xl bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center shadow-md shrink-0">
                      <Music className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-base font-bold text-foreground">Songs</h2>
                      <p className="text-xs text-muted-foreground font-medium mt-0.5">
                        {songsTabTracks.length} track
                        {songsTabTracks.length === 1 ? "" : "s"} in library
                      </p>
                    </div>
                  </div>
                  {songsTabTracks.length > 0 && (
                    <button
                      onClick={() => {
                        setTrack(songsTabTracks[0]);
                        openNowPlaying();
                      }}
                      className="h-9 px-3.5 rounded-full bg-blue-500 hover:bg-blue-600 text-white text-xs font-bold flex items-center gap-1.5 shadow-md active:scale-95 transition-all cursor-pointer shrink-0"
                    >
                      <Play className="h-3.5 w-3.5 fill-white" />
                      <span>Play All</span>
                    </button>
                  )}
                </div>

                <div className="flex flex-col space-y-0.5">
                  {songsTabTracks.map((song, i) => (
                    <TrackRow key={song.id + "-" + i} track={song} index={i} />
                  ))}
                </div>
              </div>
            )}

            {/* ALBUMS TAB */}
            {activeTab === "albums" && (
              <div className="grid grid-cols-2 gap-x-4 gap-y-5 mt-1 px-1">
                {libraryAlbums.map((album) => (
                  <div
                    key={album.id}
                    className="flex flex-col group cursor-pointer"
                    onClick={() => handleOpenPlaylist(album.title, album.artist)}
                  >
                    <div className="aspect-square relative rounded-2xl overflow-hidden shadow-md bg-foreground/5">
                      <CoverImage
                        src={getCoverUrl(album.coverUrl)}
                        title={album.title}
                        artist={album.artist}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute bottom-3 right-3 h-8 w-8 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all">
                        <Play className="h-3.5 w-3.5 fill-foreground text-foreground translate-x-[1px]" />
                      </div>
                    </div>

                    <p className="truncate text-[14px] font-semibold text-foreground mt-2.5 leading-tight tracking-tight">
                      {album.title}
                    </p>
                    <p className="truncate text-[11px] text-muted-foreground mt-0.5 font-medium">
                      {album.artist} · {album.year}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* ARTISTS TAB */}
            {activeTab === "artists" && (
              <div className="flex flex-col">
                {libraryArtists.map((artist) => (
                  <button
                    key={artist.id}
                    onClick={() => handleOpenPlaylist(artist.name, artist.genre)}
                    className="flex w-full items-center gap-4 py-3 text-left hover:bg-foreground/5 active:scale-[0.98] transition-all border-b border-border/40 last:border-0 cursor-pointer"
                  >
                    <CoverImage
                      src={artist.image}
                      title={artist.name}
                      iconSize={20}
                      className="h-12 w-12 shrink-0 rounded-full object-cover bg-surface"
                    />

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[15px] font-semibold text-foreground tracking-tight">
                        {artist.name}
                      </p>
                      <p className="truncate text-[12px] text-muted-foreground mt-0.5">
                        {artist.genre} · {artist.listeners}
                      </p>
                    </div>

                    <ChevronRight className="h-4 w-4 text-muted-foreground/40 mr-1" />
                  </button>
                ))}
              </div>
            )}

            {/* PLAYLISTS TAB */}
            {activeTab === "playlists" && (
              <div className="flex flex-col">
                {libraryPlaylists.map((pl) => {
                  let dynamicSubtitle = pl.subtitle;
                  if (pl.title === "Saved Songs") {
                    dynamicSubtitle = `${savedTracks.length} song${
                      savedTracks.length === 1 ? "" : "s"
                    }`;
                  } else if (pl.title === "Liked Songs") {
                    dynamicSubtitle = `${likedTracks.length} song${
                      likedTracks.length === 1 ? "" : "s"
                    }`;
                  } else if (pl.title === "Recently Played") {
                    dynamicSubtitle = `${recentlyPlayed.length} song${
                      recentlyPlayed.length === 1 ? "" : "s"
                    }`;
                  }

                  return (
                    <button
                      key={pl.id}
                      onClick={() => handleOpenPlaylist(pl.title, dynamicSubtitle)}
                      className="flex w-full items-center gap-4 py-3.5 text-left hover:bg-foreground/5 active:scale-[0.98] transition-all border-b border-border/50 last:border-0 cursor-pointer"
                    >
                      <div
                        className="h-12 w-12 shrink-0 rounded-xl flex items-center justify-center relative overflow-hidden"
                        style={{ background: pl.gradient }}
                      >
                        <div className="absolute inset-0 bg-foreground/5" />
                        {pl.iconType === "bookmark" && (
                          <Bookmark className="h-5.5 w-5.5 text-white fill-white" />
                        )}
                        {pl.iconType === "heart" && (
                          <Heart className="h-5.5 w-5.5 text-white fill-white" />
                        )}
                        {pl.iconType === "clock" && <Clock className="h-5.5 w-5.5 text-white" />}
                        {pl.iconType === "download" && (
                          <Download className="h-5.5 w-5.5 text-white" strokeWidth={2.2} />
                        )}
                        {pl.iconType === "music" && <Music className="h-5.5 w-5.5 text-white" />}
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="truncate text-[15px] font-semibold text-foreground tracking-tight">
                          {pl.title}
                        </p>
                        <p className="truncate text-[12px] text-muted-foreground mt-0.5">
                          {dynamicSubtitle}
                        </p>
                      </div>

                      <ChevronRight className="h-4 w-4 text-muted-foreground/40 mr-1" />
                    </button>
                  );
                })}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Selected Playlist Modal Sheet */}
      <AnimatePresence>
        {selectedPlaylist && (
          <motion.div
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ type: "spring", stiffness: 220, damping: 28 }}
            className="fixed inset-0 z-50 bg-background text-foreground flex flex-col pt-safe overflow-hidden"
          >
            <div className="flex items-center justify-between px-4 py-3.5 border-b border-border">
              <button
                onClick={() => setSelectedPlaylist(null)}
                className="p-2 rounded-full hover:bg-foreground/10 text-foreground cursor-pointer"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <div className="text-center">
                <h3 className="text-base font-bold text-foreground">{selectedPlaylist.title}</h3>
                {selectedPlaylist.subtitle && (
                  <p className="text-xs text-muted-foreground">{selectedPlaylist.subtitle}</p>
                )}
              </div>
              <div className="w-10" />
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
              {(() => {
                const activeList =
                  selectedPlaylist.title === "Saved Songs"
                    ? savedTracks
                    : selectedPlaylist.title === "Liked Songs"
                      ? likedTracks
                      : selectedPlaylist.title === "Recently Played"
                        ? recentlyPlayed
                        : selectedPlaylist.tracks;

                if (activeList.length === 0) {
                  return (
                    <div className="py-12 text-center text-muted-foreground">
                      <Music className="h-8 w-8 mx-auto mb-2 text-muted-foreground/60" />
                      <p className="text-sm font-medium">No songs in {selectedPlaylist.title}</p>
                    </div>
                  );
                }

                return activeList.map((t, idx) => (
                  <div key={t.id + "-" + idx} onClick={() => setSelectedPlaylist(null)}>
                    <TrackRow track={t} index={idx} />
                  </div>
                ));
              })()}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
