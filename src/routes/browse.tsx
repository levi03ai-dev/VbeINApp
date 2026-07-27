import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
  featuredAlbums,
  genres,
  madeForYou,
  seeAllAlbums,
  seeAllPlaylists,
  stations,
  topCharts,
  trendingTracks,
  type Album,
  type Playlist,
  type Track,
  getCoverUrl,
} from "@/lib/music-data";
import { AlbumCard, PlaylistTile, SectionHeader, TrackCard } from "@/components/music/cards";
import { CoverImage } from "@/components/music/CoverImage";
import { AlbumCardSkeleton, PlaylistTileSkeleton } from "@/components/music/CardSkeletons";
import { Header, HScroll } from "./index";
import { ScrollCarousel } from "@/components/music/ScrollCarousel";
import { SeeAllSheet } from "@/components/music/SeeAllSheet";
import { usePlayer } from "@/lib/player-context";
import { getFeaturedAlbums, getCuratedPlaylists, getPopularTracks, searchTracks } from "@/lib/music-service";
import { getTracksByGenre } from "@/lib/music-service";
import { Play } from "lucide-react";
import { Haptics } from "@/lib/haptics";
import { globalCache } from "@/core/cache/cache-manager";

export const Route = createFileRoute("/browse")({
  head: () => ({
    meta: [
      { title: "Browse — VibeIN" },
      { name: "description", content: "Explore new music, editorial spotlights, and every genre." },
    ],
  }),
  component: Browse,
});

function Browse() {
  const [featured, setFeatured] = useState<Album[]>([]);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [mixedForYou, setMixedForYou] = useState<Playlist[]>(madeForYou);
  const [albumsForYou, setAlbumsForYou] = useState<Track[]>([]);
  const [trendingPlaylists, setTrendingPlaylists] = useState<Playlist[]>([]);
  const [similarAlbums, setSimilarAlbums] = useState<Track[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { setTrack, openNowPlaying, setQueue } = usePlayer();
  const [activeSeeAll, setActiveSeeAll] = useState<{
    id: "new_this_week" | "curated_collections";
    title: string;
  } | null>(null);

  const [pullProgress, setPullProgress] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const loadData = async (refresh = false) => {
    if (!refresh) setIsLoading(true);
    try {
      const [fAlbums, pLists, popular, arijitTracks] = await Promise.all([
        getFeaturedAlbums(20),
        getCuratedPlaylists(20),
        getPopularTracks(40),
        searchTracks("Arijit Singh", 30),
      ]);
      if (fAlbums && fAlbums.length > 0) {
        setFeatured([...fAlbums].sort(() => 0.5 - Math.random()).slice(0, 10));
      } else {
        setFeatured([...featuredAlbums].sort(() => 0.5 - Math.random()).slice(0, 10));
      }

      if (pLists && pLists.length > 0) {
        setPlaylists([...pLists].sort(() => 0.5 - Math.random()).slice(0, 10));
      } else {
        setPlaylists([...madeForYou].sort(() => 0.5 - Math.random()).slice(0, 10));
      }
      
      // Guarantee fallback to separate local arrays if API fails or returns identical sets
      let finalPopular = popular || [];
      let finalArijit = arijitTracks || [];

      const isIdentical = finalPopular.length > 0 && 
                          finalArijit.length > 0 && 
                          finalPopular[0].id === finalArijit[0].id;

      if (finalPopular.length === 0 || isIdentical) {
        finalPopular = [...topCharts].sort(() => 0.5 - Math.random());
      }
      if (finalArijit.length === 0 || isIdentical) {
        finalArijit = [...trendingTracks].sort(() => 0.5 - Math.random());
      }

      setAlbumsForYou([...finalPopular].sort(() => 0.5 - Math.random()).slice(0, 12));
      setSimilarAlbums([...finalArijit].sort(() => 0.5 - Math.random()).slice(0, 12));

      setMixedForYou([...madeForYou].sort(() => 0.5 - Math.random()));
      setTrendingPlaylists([...seeAllPlaylists, ...madeForYou].sort(() => 0.5 - Math.random()));
    } catch (err) {
      console.error("Failed to load browse data:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    let startY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      if (window.scrollY === 0) {
        startY = e.touches[0].clientY;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (startY > 0 && window.scrollY === 0) {
        const currentY = e.touches[0].clientY;
        if (currentY > startY) {
          const progress = Math.min((currentY - startY) / 100, 1);
          setPullProgress(progress);
        }
      }
    };

    const handleTouchEnd = () => {
      if (pullProgress > 0.8 && !isRefreshing) {
        setIsRefreshing(true);
        Haptics.heavy();
        
        globalCache.clear();
        
        loadData(true).finally(() => {
          setTimeout(() => {
            setIsRefreshing(false);
            setPullProgress(0);
          }, 500);
        });
      } else {
        setPullProgress(0);
      }
      startY = 0;
    };

    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", handleTouchEnd);
    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [pullProgress, isRefreshing]);

  return (
    <div className="pt-3 relative">
      <AnimatePresence>
        {(pullProgress > 0 || isRefreshing) && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: pullProgress * 40 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-0 left-0 right-0 flex justify-center z-50 pointer-events-none"
          >
            <div className="bg-zinc-800 rounded-full p-2 shadow-lg flex items-center justify-center">
              <svg
                className={`w-5 h-5 text-zinc-400 ${isRefreshing ? "animate-spin" : ""}`}
                style={{ transform: `rotate(${pullProgress * 360}deg)` }}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
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
        <div className="grid grid-cols-2 gap-3 mt-2 grid-flow-row-dense">
          {genres.map((g, i) => {
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
                        artist: "VibeIN Station",
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
                      artist: "VibeIN Station",
                      album: `${g.name} Radio`,
                      duration: "3:45",
                      gradient: g.gradient,
                    });
                    openNowPlaying();
                  }
                }}
                className="relative overflow-hidden rounded-lg text-left shadow-sm cursor-pointer transition-all h-14 col-span-1"
                style={{
                  background: g.gradient,
                }}
              >
                <div className="absolute inset-0 bg-black/10 z-10" />
                <span className="absolute top-1/2 -translate-y-1/2 left-3 text-[13px] font-bold tracking-tight text-white z-20 drop-shadow-md">
                  {g.name}
                </span>
                {g.coverUrl && (
                  <CoverImage
                    src={getCoverUrl(g.coverUrl)}
                    title={g.name}
                    className="absolute right-[-15%] bottom-[-10%] h-12 w-12 object-cover rounded-md rotate-[25deg] shadow-md z-10"
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </section>

      {/* Curated collections */}
      <section className="mt-8">
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

      {/* Mixed for you */}
      <section className="mt-8">
        <SectionHeader title="Mixed for you" />
        <HScroll>
          {mixedForYou.map((p) => (
            <div key={p.id + "_mixed"} className="w-[42vw] max-w-[170px] shrink-0">
              <PlaylistTile playlist={p} />
            </div>
          ))}
        </HScroll>
      </section>

      {/* Albums for you */}
      <section className="mt-8">
        <SectionHeader title="Albums for you" />
        <HScroll>
          {albumsForYou.map((a) => (
            <div key={a.id + "_albums"} className="w-[42vw] max-w-[170px] shrink-0">
              <TrackCard track={a} />
            </div>
          ))}
        </HScroll>
      </section>

      {/* Trending community playlists */}
      <section className="mt-8">
        <SectionHeader title="Trending community playlists" />
        <HScroll>
          {trendingPlaylists.map((p, idx) => (
            <div key={p.id + "_trending_" + idx} className="w-[42vw] max-w-[170px] shrink-0">
              <PlaylistTile playlist={p} />
            </div>
          ))}
        </HScroll>
      </section>

      {/* Similar to Arijit Singh */}
      <section className="mt-8 pb-32">
        <SectionHeader title="Similar to Arijit Singh" />
        <HScroll>
          {similarAlbums.map((a, idx) => (
            <div key={a.id + "_similar_" + idx} className="w-[42vw] max-w-[170px] shrink-0">
              <TrackCard track={a} />
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
