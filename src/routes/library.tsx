import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Download, Heart, Music, Play, X } from "lucide-react";
import { Header } from "./index";
import { usePlayer } from "@/lib/player-context";
import type { Track } from "@/lib/music-data";
import { duration, ease } from "@/lib/motion";
import { TrackRow } from "@/components/music/cards";
import { topCharts } from "@/lib/music-data";

export const Route = createFileRoute("/library")({
  head: () => ({
    meta: [
      { title: "Library — Sonora" },
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

// Exactly matching the 'Songs' screenshot
const librarySongs = [
  {
    id: "lib-s1",
    title: "Ultrawave",
    artist: "Luna Ray",
    album: "Ultrawave EP",
    duration: "3:34",
    gradient: "linear-gradient(135deg, #1e1b4b 0%, #31108f 50%, #701a75 100%)",
    image: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?w=150&h=150&fit=crop&q=80",
  },
  {
    id: "lib-s2",
    title: "Glass Mind",
    artist: "Cipher",
    album: "Glass Mind",
    duration: "3:28",
    gradient: "linear-gradient(135deg, #881337 0%, #be123c 40%, #0369a1 100%)",
    image: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=150&h=150&fit=crop&q=80",
  },
  {
    id: "lib-s3",
    title: "Breathe Again",
    artist: "Nyx",
    album: "Breathe Again",
    duration: "3:23",
    gradient: "linear-gradient(135deg, #0ea5e9 0%, #a855f7 50%, #f43f5e 100%)",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&q=80",
  },
  {
    id: "lib-s4",
    title: "Undertow",
    artist: "The Drift",
    album: "Undertow",
    duration: "4:11",
    gradient: "linear-gradient(135deg, #09090b 0%, #180828 60%, #4c1d95 100%)",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=150&h=150&fit=crop&q=80",
  },
  {
    id: "lib-s5",
    title: "Kesariya",
    artist: "Arijit Singh",
    album: "Brahmastra",
    duration: "4:28",
    gradient: "linear-gradient(135deg, #ff7e5f 0%, #feb47b 100%)",
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=150&h=150&fit=crop&q=80",
  },
  {
    id: "lib-s6",
    title: "Chaleya",
    artist: "Arijit Singh, Shilpa Rao",
    album: "Jawan",
    duration: "3:20",
    gradient: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=150&h=150&fit=crop&q=80",
  },
];

// Exactly matching the 'Albums' screenshot
const libraryAlbums = [
  {
    id: "lib-a1",
    title: "Neon Horizons",
    artist: "Luna Ray",
    year: "2024",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=350&h=350&fit=crop&q=80",
    gradient: "linear-gradient(135deg, #1e1b4b 0%, #31108f 50%, #701a75 100%)",
    track: {
      id: "lib-a1-t1",
      title: "Neon Horizons",
      artist: "Luna Ray",
      album: "Neon Horizons",
      duration: "3:45",
      gradient: "linear-gradient(135deg, #1e1b4b 0%, #31108f 50%, #701a75 100%)",
    },
  },
  {
    id: "lib-a2",
    title: "Fractured",
    artist: "Cipher",
    year: "2024",
    image: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=350&h=350&fit=crop&q=80",
    gradient: "linear-gradient(135deg, #881337 0%, #be123c 40%, #0369a1 100%)",
    track: {
      id: "lib-a2-t1",
      title: "Fractured",
      artist: "Cipher",
      album: "Fractured",
      duration: "4:12",
      gradient: "linear-gradient(135deg, #881337 0%, #be123c 40%, #0369a1 100%)",
    },
  },
  {
    id: "lib-a3",
    title: "Soft Collapse",
    artist: "Nyx",
    year: "2023",
    image: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=350&h=350&fit=crop&q=80",
    gradient: "linear-gradient(135deg, #0ea5e9 0%, #a855f7 50%, #f43f5e 100%)",
    track: {
      id: "lib-a3-t1",
      title: "Soft Collapse",
      artist: "Nyx",
      album: "Soft Collapse",
      duration: "3:18",
      gradient: "linear-gradient(135deg, #0ea5e9 0%, #a855f7 50%, #f43f5e 100%)",
    },
  },
  {
    id: "lib-a4",
    title: "Dead Signal",
    artist: "Echo Static",
    year: "2024",
    image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=350&h=350&fit=crop&q=80",
    gradient: "linear-gradient(135deg, #09090b 0%, #180828 60%, #4c1d95 100%)",
    track: {
      id: "lib-a4-t1",
      title: "Dead Signal",
      artist: "Echo Static",
      album: "Dead Signal",
      duration: "3:56",
      gradient: "linear-gradient(135deg, #09090b 0%, #180828 60%, #4c1d95 100%)",
    },
  },
  {
    id: "lib-a5",
    title: "Static Gardens",
    artist: "Yves Ferro",
    year: "2026",
    image: "https://images.unsplash.com/photo-1604871000636-074fa5117945?w=350&h=350&fit=crop&q=80",
    gradient: "linear-gradient(135deg, #111827 0%, #4b5563 100%)",
    track: {
      id: "lib-a5-t1",
      title: "Static Gardens",
      artist: "Yves Ferro",
      album: "Static Gardens",
      duration: "3:47",
      gradient: "linear-gradient(135deg, #111827 0%, #4b5563 100%)",
    },
  },
  {
    id: "lib-a6",
    title: "Argon Sky",
    artist: "The Halide",
    year: "2025",
    image: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=350&h=350&fit=crop&q=80",
    gradient: "linear-gradient(135deg, #060606 0%, #1f2937 100%)",
    track: {
      id: "lib-a6-t1",
      title: "Argon Sky",
      artist: "The Halide",
      album: "Under the Argon Sky",
      duration: "5:02",
      gradient: "linear-gradient(135deg, #060606 0%, #1f2937 100%)",
    },
  },
];

// Exactly matching the 'Artists' screenshot
const libraryArtists = [
  {
    id: "lib-art1",
    name: "Luna Ray",
    genre: "Electronic",
    listeners: "4.2M listeners",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=faces&q=80",
    track: {
      id: "lib-art1-t1",
      title: "Ultrawave",
      artist: "Luna Ray",
      album: "Ultrawave EP",
      duration: "3:34",
      gradient: "linear-gradient(135deg, #1e1b4b 0%, #31108f 50%, #701a75 100%)",
    },
  },
  {
    id: "lib-art2",
    name: "Cipher",
    genre: "Hip-Hop",
    listeners: "7.8M listeners",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces&q=80",
    track: {
      id: "lib-art2-t1",
      title: "Glass Mind",
      artist: "Cipher",
      album: "Glass Mind",
      duration: "3:28",
      gradient: "linear-gradient(135deg, #881337 0%, #be123c 40%, #0369a1 100%)",
    },
  },
  {
    id: "lib-art3",
    name: "Nyx",
    genre: "Indie Pop",
    listeners: "2.1M listeners",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=faces&q=80",
    track: {
      id: "lib-art3-t1",
      title: "Breathe Again",
      artist: "Nyx",
      album: "Breathe Again",
      duration: "3:23",
      gradient: "linear-gradient(135deg, #0ea5e9 0%, #a855f7 50%, #f43f5e 100%)",
    },
  },
  {
    id: "lib-art4",
    name: "Echo Static",
    genre: "Alternative",
    listeners: "3.5M listeners",
    image:
      "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&h=150&fit=crop&crop=faces&q=80",
    track: {
      id: "lib-art4-t1",
      title: "Dead Signal",
      artist: "Echo Static",
      album: "Dead Signal",
      duration: "3:56",
      gradient: "linear-gradient(135deg, #09090b 0%, #180828 60%, #4c1d95 100%)",
    },
  },
  {
    id: "lib-art5",
    name: "The Drift",
    genre: "Rock",
    listeners: "5.0M listeners",
    image: "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=150&h=150&fit=crop&q=80",
    track: {
      id: "lib-art5-t1",
      title: "Undertow",
      artist: "The Drift",
      album: "Undertow",
      duration: "4:11",
      gradient: "linear-gradient(135deg, #09090b 0%, #180828 60%, #4c1d95 100%)",
    },
  },
];

// Exactly matching the 'Playlists' screenshot
const libraryPlaylists = [
  {
    id: "lib-pl1",
    title: "Liked Songs",
    subtitle: "4 songs",
    gradient: "linear-gradient(135deg, #ec4899 0%, #a855f7 100%)",
    iconType: "heart",
    track: {
      id: "lib-s1",
      title: "Ultrawave",
      artist: "Luna Ray",
      album: "Ultrawave EP",
      duration: "3:34",
      gradient: "linear-gradient(135deg, #1e1b4b 0%, #31108f 50%, #701a75 100%)",
    },
  },
  {
    id: "lib-pl2",
    title: "Downloaded",
    subtitle: "12 songs",
    gradient: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    iconType: "download",
    track: {
      id: "lib-s2",
      title: "Glass Mind",
      artist: "Cipher",
      album: "Glass Mind",
      duration: "3:28",
      gradient: "linear-gradient(135deg, #881337 0%, #be123c 40%, #0369a1 100%)",
    },
  },
  {
    id: "lib-pl3",
    title: "Recently Played",
    subtitle: "24 songs",
    gradient: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
    iconType: "circle",
    track: {
      id: "lib-s3",
      title: "Breathe Again",
      artist: "Nyx",
      album: "Breathe Again",
      duration: "3:23",
      gradient: "linear-gradient(135deg, #0ea5e9 0%, #a855f7 50%, #f43f5e 100%)",
    },
  },
  {
    id: "lib-pl4",
    title: "My Mix",
    subtitle: "18 songs",
    gradient: "linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)",
    iconType: "music",
    track: {
      id: "lib-s4",
      title: "Undertow",
      artist: "The Drift",
      album: "Undertow",
      duration: "4:11",
      gradient: "linear-gradient(135deg, #09090b 0%, #180828 60%, #4c1d95 100%)",
    },
  },
];

function Library() {
  const [activeTab, setActiveTab] = useState<"songs" | "albums" | "artists" | "playlists">("songs");
  const [selectedPlaylist, setSelectedPlaylist] = useState<{
    title: string;
    subtitle?: string;
    tracks: Track[];
  } | null>(null);
  const { setTrack, openNowPlaying, likedTracks, recentlyPlayed } = usePlayer();

  const handlePlayTrack = (trackData: Track) => {
    setTrack(trackData);
    openNowPlaying();
  };

  const handleOpenPlaylist = (title: string, subtitle?: string) => {
    let modalTracks = topCharts;
    if (title === "Liked Songs") {
      modalTracks = likedTracks;
    } else if (title === "Recently Played") {
      modalTracks = recentlyPlayed;
    }
    setSelectedPlaylist({
      title,
      subtitle,
      tracks: modalTracks,
    });
  };

  return (
    <div className="pt-3 pb-24">
      <Header title="Library" avatar />

      {/* Tabs Row */}
      <div className="flex gap-2.5 px-4 mb-6 mt-2 overflow-x-auto no-scrollbar">
        {categories.map((cat) => {
          const isActive = activeTab === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`relative rounded-full px-4.5 py-1.5 text-[13px] font-semibold transition-all duration-300 select-none cursor-pointer ${
                isActive
                  ? "text-zinc-950 bg-white shadow-sm shadow-black/10"
                  : "text-white/60 bg-white/10 hover:text-white/80"
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
              <div className="flex flex-col space-y-0.5">
                {likedTracks.length > 0 ? (
                  likedTracks.map((song, i) => <TrackRow key={song.id} track={song} index={i} />)
                ) : (
                  <div className="py-12 text-center text-white/50">
                    <Music className="h-8 w-8 mx-auto mb-2 text-white/30" />
                    <p className="text-sm font-medium">No Liked Songs Yet</p>
                    <p className="text-xs text-white/40 mt-1">
                      Tap the heart on any track to save it here
                    </p>
                  </div>
                )}
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
                    {/* Square Cover Art */}
                    <div className="aspect-square relative rounded-2xl overflow-hidden border border-white/5 shadow-md">
                      <img
                        src={album.image}
                        alt={album.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {/* Play Button Overlay Bottom Right */}
                      <div className="absolute bottom-3 right-3 h-8 w-8 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all">
                        <Play className="h-3.5 w-3.5 fill-white text-white translate-x-[1px]" />
                      </div>
                    </div>

                    {/* Details */}
                    <p className="truncate text-[14px] font-semibold text-white mt-2.5 leading-tight tracking-tight">
                      {album.title}
                    </p>
                    <p className="truncate text-[11px] text-white/50 mt-0.5 font-medium">
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
                    className="flex w-full items-center gap-4 py-3 text-left hover:bg-white/[0.03] active:scale-[0.98] transition-all border-b border-white/[0.04] last:border-0"
                  >
                    {/* Circular Avatar */}
                    <img
                      src={artist.image}
                      alt={artist.name}
                      referrerPolicy="no-referrer"
                      className="h-12 w-12 shrink-0 rounded-full object-cover bg-surface border border-white/5"
                    />

                    {/* Artist Details */}
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[15px] font-semibold text-white tracking-tight">
                        {artist.name}
                      </p>
                      <p className="truncate text-[12px] text-white/50 mt-0.5">
                        {artist.genre} · {artist.listeners}
                      </p>
                    </div>

                    {/* Arrow Right */}
                    <ChevronRight className="h-4 w-4 text-white/20 mr-1" />
                  </button>
                ))}
              </div>
            )}

            {/* PLAYLISTS TAB */}
            {activeTab === "playlists" && (
              <div className="flex flex-col">
                {libraryPlaylists.map((pl) => {
                  let dynamicSubtitle = pl.subtitle;
                  if (pl.title === "Liked Songs") {
                    dynamicSubtitle = `${likedTracks.length} song${likedTracks.length === 1 ? "" : "s"}`;
                  } else if (pl.title === "Recently Played") {
                    dynamicSubtitle = `${recentlyPlayed.length} song${recentlyPlayed.length === 1 ? "" : "s"}`;
                  }

                  return (
                    <button
                      key={pl.id}
                      onClick={() => handleOpenPlaylist(pl.title, dynamicSubtitle)}
                      className="flex w-full items-center gap-4 py-3.5 text-left hover:bg-white/[0.03] active:scale-[0.98] transition-all border-b border-white/[0.04] last:border-0 cursor-pointer"
                    >
                      {/* Styled Square Container with Icon */}
                      <div
                        className="h-12 w-12 shrink-0 rounded-xl flex items-center justify-center relative overflow-hidden border border-white/5"
                        style={{ background: pl.gradient }}
                      >
                        {/* Subtle gloss overlay */}
                        <div className="absolute inset-0 bg-white/5" />
                        {pl.iconType === "heart" && (
                          <Heart className="h-5.5 w-5.5 fill-white text-white" />
                        )}
                        {pl.iconType === "download" && (
                          <Download className="h-5.5 w-5.5 text-white" strokeWidth={2.2} />
                        )}
                        {pl.iconType === "circle" && (
                          <div className="w-4 h-4 bg-white rounded-full" />
                        )}
                        {pl.iconType === "music" && <Music className="h-5.5 w-5.5 text-white" />}
                      </div>

                      {/* Playlist Details */}
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-[15px] font-semibold text-white tracking-tight">
                          {pl.title}
                        </p>
                        <p className="truncate text-[12px] text-white/50 mt-0.5">
                          {dynamicSubtitle}
                        </p>
                      </div>

                      {/* Arrow Right */}
                      <ChevronRight className="h-4 w-4 text-white/20 mr-1" />
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
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex flex-col pt-safe"
          >
            <div className="flex items-center justify-between px-4 py-3.5 border-b border-white/10">
              <button
                onClick={() => setSelectedPlaylist(null)}
                className="p-2 rounded-full hover:bg-white/10 text-white"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <div className="text-center">
                <h3 className="text-base font-bold text-white">{selectedPlaylist.title}</h3>
                {selectedPlaylist.subtitle && (
                  <p className="text-xs text-white/60">{selectedPlaylist.subtitle}</p>
                )}
              </div>
              <button
                onClick={() => setSelectedPlaylist(null)}
                className="p-2 rounded-full hover:bg-white/10 text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
              {(() => {
                const activeList =
                  selectedPlaylist.title === "Liked Songs"
                    ? likedTracks
                    : selectedPlaylist.title === "Recently Played"
                      ? recentlyPlayed
                      : selectedPlaylist.tracks;

                if (activeList.length === 0) {
                  return (
                    <div className="py-12 text-center text-white/50">
                      <Music className="h-8 w-8 mx-auto mb-2 text-white/30" />
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
