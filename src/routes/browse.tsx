import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";
import { featuredAlbums, genres, madeForYou, type Album, type Playlist } from "@/lib/music-data";
import { AlbumCard, PlaylistTile, SectionHeader } from "@/components/music/cards";
import { AlbumCardSkeleton, PlaylistTileSkeleton } from "@/components/music/CardSkeletons";
import { Header, HScroll } from "./index";
import { ScrollCarousel } from "@/components/music/ScrollCarousel";
import { SeeAllSheet } from "@/components/music/SeeAllSheet";
import { usePlayer } from "@/lib/player-context";
import { getFeaturedAlbums, getCuratedPlaylists } from "@/lib/music-service";
import { getTracksByGenre } from "@/lib/music-service";
import { Play } from "lucide-react";
import { Haptics } from "@/lib/haptics";

export const Route = createFileRoute("/browse")({
  head: () => ({
    meta: [
      { title: "Browse — Sonora" },
      { name: "description", content: "Explore new music, editorial spotlights, and every genre." },
    ],
  }),
  component: Browse,
});

function Browse() {
  const [featured, setFeatured] = useState<Album[]>([]);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { setTrack, openNowPlaying, setQueue } = usePlayer();
  const [activeSeeAll, setActiveSeeAll] = useState<{
    id: "new_this_week" | "curated_collections";
    title: string;
  } | null>(null);

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      try {
        const [fAlbums, pLists] = await Promise.all([
          getFeaturedAlbums(10),
          getCuratedPlaylists(10),
        ]);
        if (fAlbums && fAlbums.length > 0) setFeatured(fAlbums);
        if (pLists && pLists.length > 0) setPlaylists(pLists);
      } catch (err) {
        console.error("Failed to load browse data:", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  return (
    <div className="pt-3">
      <Header title="Browse" />

      {/* New this week */}
      <section className="mt-4">
        <SectionHeader
          title="New This Week"
          action="See All"
          onActionClick={() => {
            Haptics.light();
            setActiveSeeAll({ id: "new_this_week", title: "New This Week" });
          }}
        />
        <HScroll>
          {isLoading
            ? [1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="w-[42vw] max-w-[170px] shrink-0">
                  <AlbumCardSkeleton />
                </div>
              ))
            : (featured.length > 0 ? featured : featuredAlbums).map((a) => (
                <div key={a.id} className="w-[42vw] max-w-[170px] shrink-0">
                  <AlbumCard album={a} />
                </div>
              ))}
        </HScroll>
      </section>

      {/* Moods & Genres */}
      <section className="mt-8 px-4">
        <SectionHeader title="Moods & Genres" />
        <div className="grid grid-cols-2 gap-3.5 mt-2 grid-flow-row-dense">
          {genres.map((g, i) => {
            const isWide = i % 5 === 0;
            return (
              <motion.button
                key={g.id}
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.02, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                whileTap={{ scale: 0.96 }}
                onClick={async () => {
                  try {
                    const tracks = await getTracksByGenre(g.name, 20);
                    if (tracks.length > 0) {
                      setQueue(tracks);
                      setTrack(tracks[0]);
                      openNowPlaying();
                    } else {
                      // Fallback
                      setTrack({
                        id: g.id + "-station",
                        title: `${g.name} Mix`,
                        artist: "Sonora Station",
                        album: `${g.name} Radio`,
                        duration: "3:45",
                        gradient: g.gradient,
                      });
                      openNowPlaying();
                    }
                  } catch {
                    setTrack({
                      id: g.id + "-station",
                      title: `${g.name} Mix`,
                      artist: "Sonora Station",
                      album: `${g.name} Radio`,
                      duration: "3:45",
                      gradient: g.gradient,
                    });
                    openNowPlaying();
                  }
                }}
                className={`relative overflow-hidden rounded-xl text-left album-shadow border border-white/10 cursor-pointer transition-all bg-cover bg-center ${
                  isWide ? "col-span-2 aspect-[21/9]" : "col-span-1 aspect-square"
                }`}
                style={
                  g.coverUrl
                    ? { backgroundImage: `url(${g.coverUrl})` }
                    : { background: g.gradient }
                }
              >
                <div className="absolute inset-0 bg-black/35 z-0" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
                <span className="absolute bottom-3.5 left-3.5 text-[14px] font-semibold tracking-tight text-white z-20 drop-shadow-sm">
                  {g.name}
                </span>
              </motion.button>
            );
          })}
        </div>
      </section>

      {/* Curated collections */}
      <section className="mt-8 pb-32">
        <SectionHeader
          title="Curated Collections"
          action="See All"
          onActionClick={() => {
            Haptics.light();
            setActiveSeeAll({ id: "curated_collections", title: "Curated Collections" });
          }}
        />
        <HScroll>
          {isLoading
            ? [1, 2, 3, 4].map((i) => (
                <div key={i} className="w-[62vw] max-w-[240px] shrink-0">
                  <PlaylistTileSkeleton />
                </div>
              ))
            : (playlists.length > 0 ? playlists : madeForYou).map((p) => (
                <div key={p.id} className="w-[62vw] max-w-[240px] shrink-0">
                  <PlaylistTile playlist={p} />
                </div>
              ))}
        </HScroll>
      </section>

      {/* See All Overlay */}
      <AnimatePresence>
        {activeSeeAll && (
          <SeeAllSheet
            category={activeSeeAll.id}
            title={activeSeeAll.title}
            onClose={() => setActiveSeeAll(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
