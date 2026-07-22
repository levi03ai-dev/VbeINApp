import { createFileRoute, Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  featuredAlbums,
  madeForYou,
  topCharts,
  recentlyAdded,
  trendingTracks,
  jumpBackInTracks,
} from "@/lib/music-data";
import type { Track, Album, Playlist } from "@/lib/music-data";
import { AlbumCard, PlaylistTile, SectionHeader, TrackRow } from "@/components/music/cards";
import {
  HeroCardSkeleton,
  AlbumCardSkeleton,
  TrackRowSkeleton,
} from "@/components/music/CardSkeletons";
import { ScrollCarousel } from "@/components/music/ScrollCarousel";
import { SeeAllSheet } from "@/components/music/SeeAllSheet";
import { usePlayer } from "@/lib/player-context";
import { getPopularTracks, getFeaturedAlbums, getCuratedPlaylists } from "@/lib/music-service";
import { toast } from "sonner";
import { Play, ChevronLeft, Search, X } from "lucide-react";
import { Haptics } from "@/lib/haptics";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Listen Now — Sonora" },
      {
        name: "description",
        content: "Editor picks, new releases and stations tuned to your taste.",
      },
    ],
  }),
  component: ListenNow,
});

function ListenNow() {
  const { setTrack, openNowPlaying, setQueue, recentlyPlayed } = usePlayer();
  const [popularTracks, setPopularTracks] = useState<Track[]>([]);
  const [featured, setFeatured] = useState<Album[]>([]);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeSeeAll, setActiveSeeAll] = useState<{
    id: "featured_albums" | "jump_back_in" | "trending_now" | "new_releases" | "recently_added";
    title: string;
  } | null>(null);

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      try {
        const [tracks, fAlbums, pLists] = await Promise.all([
          getPopularTracks(15),
          getFeaturedAlbums(10),
          getCuratedPlaylists(10),
        ]);
        if (tracks && tracks.length > 0) {
          setPopularTracks(tracks);
          setQueue(tracks);
        }
        if (fAlbums && fAlbums.length > 0) setFeatured(fAlbums);
        if (pLists && pLists.length > 0) setPlaylists(pLists);
      } catch (err) {
        console.error("Failed to load homepage data:", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, [setQueue]);

  return (
    <div className="pt-3">
      <Header title="Listen Now" />

      {/* Big hero */}
      <div className="px-4">
        <SectionHeader
          title="Top Picks For You"
          action="See All"
          onActionClick={() => {
            Haptics.light();
            setActiveSeeAll({ id: "featured_albums", title: "Featured Albums" });
          }}
        />
      </div>

      <ScrollCarousel className="px-[7vw]">
        {isLoading
          ? [1, 2, 3].map((i) => <HeroCardSkeleton key={i} />)
          : (featured.length > 0 ? featured : featuredAlbums).map((a) => (
              <motion.div
                key={a.id}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setTrack({
                    id: a.id,
                    title: a.title,
                    artist: a.artist,
                    album: a.title,
                    duration: "3:42",
                    gradient: a.gradient,
                    coverUrl: a.coverUrl,
                  });
                  openNowPlaying();
                }}
                className="relative aspect-[16/10] w-[86vw] max-w-[450px] shrink-0 snap-center overflow-hidden rounded-2xl album-shadow cursor-pointer border border-white/5 bg-cover bg-center"
                style={
                  a.coverUrl
                    ? { backgroundImage: `url(${a.coverUrl})` }
                    : { background: a.gradient }
                }
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                <div className="relative flex h-full flex-col justify-end p-5 text-white z-10">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-amber-400 mb-0.5">
                    {a.tag || "Trending"}
                  </span>
                  <h3 className="text-xl font-extrabold text-white leading-tight mb-0.5 drop-shadow-sm">
                    {a.title}
                  </h3>
                  <p className="text-xs text-white/80 font-medium mb-3 truncate">{a.artist}</p>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setTrack({
                          id: a.id,
                          title: a.title,
                          artist: a.artist,
                          album: a.title,
                          duration: "3:42",
                          gradient: a.gradient,
                          coverUrl: a.coverUrl,
                        });
                        openNowPlaying();
                      }}
                      className="rounded-full bg-white text-black px-4 py-1.5 text-[11px] font-bold tracking-tight hover:bg-white/90 active:scale-95 transition-all shadow-md"
                    >
                      Play Now
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toast.success(`"${a.title}" saved`);
                      }}
                      className="rounded-full bg-white/15 border border-white/20 text-white px-3.5 py-1.5 text-[11px] font-semibold tracking-tight hover:bg-white/25 active:scale-95 transition-all backdrop-blur-sm"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
      </ScrollCarousel>

      {/* Jump Back In */}
      <section className="mt-8 animate-in fade-in duration-300">
        <SectionHeader
          title="Jump Back In"
          action="See All"
          onActionClick={() => {
            Haptics.light();
            setActiveSeeAll({ id: "jump_back_in", title: "Jump Back In" });
          }}
        />
        <div className="grid grid-cols-2 gap-3 px-4 mt-2">
          {isLoading
            ? [1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 rounded-2xl bg-white/[0.02] border border-white/5 p-3"
                >
                  <div className="h-12 w-12 shrink-0 rounded-xl bg-muted/40 animate-pulse" />
                  <div className="flex-1 space-y-1.5">
                    <div className="h-3.5 w-3/4 bg-muted/40 rounded animate-pulse" />
                    <div className="h-3 w-1/2 bg-muted/40 rounded animate-pulse" />
                  </div>
                </div>
              ))
            : (recentlyPlayed.length > 0
                ? recentlyPlayed.slice(0, 4)
                : popularTracks.length > 0
                  ? popularTracks.slice(0, 4)
                  : jumpBackInTracks
              ).map((p) => (
                <motion.div
                  key={p.id}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    Haptics.light();
                    setTrack(p);
                    openNowPlaying();
                  }}
                  className="group relative flex items-center gap-3 rounded-2xl bg-white/[0.02] border border-white/5 p-3 cursor-pointer hover:bg-white/[0.06] hover:border-white/10 transition-all duration-300"
                >
                  {/* Thumbnail */}
                  <div
                    className="h-12 w-12 shrink-0 rounded-xl relative overflow-hidden shadow-md border border-white/10 bg-cover bg-center"
                    style={
                      p.coverUrl
                        ? { backgroundImage: `url(${p.coverUrl})` }
                        : { background: p.gradient }
                    }
                  >
                    <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-white/10" />
                  </div>

                  {/* Details - vertically centered title */}
                  <div className="min-w-0 flex-1 flex flex-col justify-center">
                    <p className="truncate text-[13.5px] font-semibold text-white tracking-tight group-hover:text-accent-pink transition-colors">
                      {p.title}
                    </p>
                    <p className="truncate text-[11px] text-white/50 mt-0.5 font-medium leading-none">
                      {p.artist}
                    </p>
                  </div>

                  {/* Translucent Play Button on Right */}
                  <div className="h-8 w-8 rounded-full bg-white/10 border border-white/5 group-hover:bg-white/20 flex items-center justify-center shrink-0 transition-all duration-300">
                    <Play className="h-3 w-3 fill-white text-white translate-x-[0.5px]" />
                  </div>
                </motion.div>
              ))}
        </div>
      </section>

      {/* Trending Now */}
      <section className="mt-8">
        <SectionHeader
          title="Trending Now"
          action="See All"
          onActionClick={() => {
            Haptics.light();
            setActiveSeeAll({ id: "trending_now", title: "Trending Now" });
          }}
        />
        <HScroll>
          {isLoading
            ? [1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="w-[44vw] max-w-[170px] shrink-0">
                  <AlbumCardSkeleton />
                </div>
              ))
            : (popularTracks.length > 6 ? popularTracks.slice(6, 14) : trendingTracks).map(
                (t, idx) => (
                  <motion.div
                    key={t.id}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setTrack(t);
                      openNowPlaying();
                    }}
                    className="group flex flex-col w-[44vw] max-w-[170px] shrink-0 snap-center cursor-pointer"
                  >
                    {/* Beautiful Square Artwork with large corner radius & Play Button Overlay */}
                    <div
                      className="relative aspect-square w-full rounded-[20px] overflow-hidden shadow-lg border border-white/5 bg-cover bg-center"
                      style={
                        t.coverUrl
                          ? { backgroundImage: `url(${t.coverUrl})` }
                          : { background: t.gradient }
                      }
                    >
                      <div className="absolute inset-0 bg-gradient-to-tr from-black/30 via-transparent to-white/5" />

                      {/* Ranking Badge Overlay at top-left of artwork */}
                      <div className="absolute top-3 left-3 flex h-6 w-6 items-center justify-center rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-[11px] font-black text-accent-pink shadow-md">
                        #{idx + 1}
                      </div>

                      {/* Translucent Play Button Overlay on Bottom Right of Artwork */}
                      <div className="absolute bottom-3 right-3 h-8 w-8 rounded-full bg-white/20 backdrop-blur-md border border-white/20 group-hover:bg-accent-pink group-hover:border-accent-pink flex items-center justify-center transition-all duration-300 shadow-md">
                        <Play className="h-3 w-3 fill-white text-white translate-x-[0.5px]" />
                      </div>
                    </div>

                    {/* Text Details Below Artwork */}
                    <div className="mt-2.5 px-0.5">
                      <p className="truncate text-[13.5px] font-semibold text-white tracking-tight group-hover:text-accent-pink transition-colors">
                        {t.title}
                      </p>
                      <p className="truncate text-[11px] text-white/50 mt-0.5 font-medium">
                        {t.artist}
                      </p>
                    </div>
                  </motion.div>
                ),
              )}
        </HScroll>
      </section>

      {/* New Releases */}
      <section className="mt-8">
        <SectionHeader
          title="New Releases"
          subtitle="This week"
          action="See All"
          onActionClick={() => {
            Haptics.light();
            setActiveSeeAll({ id: "new_releases", title: "New Releases" });
          }}
        />
        <HScroll>
          {(featured.length > 0 ? featured : featuredAlbums).map((a) => (
            <div key={a.id} className="w-[42vw] max-w-[170px] shrink-0">
              <AlbumCard album={a} />
            </div>
          ))}
        </HScroll>
      </section>

      {/* Top Charts */}
      <section className="mt-8 px-4">
        <SectionHeader title="Top Charts" subtitle="Global · Today" />
        <div className="space-y-0.5 mt-2">
          {(popularTracks.length > 0 ? popularTracks.slice(0, 6) : topCharts.slice(0, 6)).map(
            (t, i) => (
              <TrackRow key={t.id} track={t} index={i} />
            ),
          )}
        </div>
      </section>

      {/* Recently Added */}
      <section className="mt-8">
        <SectionHeader
          title="Recently Added"
          subtitle="Your library"
          action="See All"
          onActionClick={() => {
            Haptics.light();
            setActiveSeeAll({ id: "recently_added", title: "Recently Added" });
          }}
        />
        <HScroll>
          {(playlists.length > 0 ? playlists : recentlyAdded).map((p) => (
            <div key={p.id} className="w-[42vw] max-w-[170px] shrink-0">
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
            popularTracks={popularTracks}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export function Header({ title, avatar = false }: { title: string; avatar?: boolean }) {
  const [initial, setInitial] = useState("A");
  const [gradient, setGradient] = useState("from-pink-500 to-orange-400");

  useEffect(() => {
    if (!avatar) return;
    const updateHeaderProfile = () => {
      const saved = localStorage.getItem("melody-stream-profile");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (parsed.name) {
            setInitial(parsed.name.trim().charAt(0).toUpperCase() || "A");
          }
          if (parsed.avatarColor) {
            setGradient(parsed.avatarColor);
          }
        } catch (e) {
          console.error("Error parsing profile in Header:", e);
        }
      }
    };

    updateHeaderProfile();
    // Listen for storage events (if changed elsewhere) or standard custom events
    window.addEventListener("profile-updated", updateHeaderProfile);
    return () => window.removeEventListener("profile-updated", updateHeaderProfile);
  }, [avatar]);

  return (
    <div className="mb-4 flex items-center justify-between px-4 pt-4">
      <h1 className="text-[22px] font-bold tracking-tight text-foreground/95">{title}</h1>
      {avatar && (
        <Link
          to="/profile"
          className={`grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br ${gradient} text-xs font-semibold text-white transition-transform active:scale-90 hover:scale-105`}
        >
          {initial}
        </Link>
      )}
    </div>
  );
}

export function HScroll({ children }: { children: React.ReactNode }) {
  return <div className="no-scrollbar flex gap-3 overflow-x-auto px-4 pb-1">{children}</div>;
}

// See All Datasets
