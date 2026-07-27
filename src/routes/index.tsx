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
  seeAllAlbums,
  getCoverUrl,
} from "@/lib/music-data";
import type { Track, Album, Playlist } from "@/lib/music-data";
import { homeRecommendations } from "@/features/music/recommendation";
import { AlbumCard, PlaylistTile, SectionHeader, TrackRow } from "@/components/music/cards";
import { CoverImage } from "@/components/music/CoverImage";
import {
  HeroCardSkeleton,
  AlbumCardSkeleton,
  TrackRowSkeleton,
  PlaylistTileSkeleton,
} from "@/components/music/CardSkeletons";
import { ScrollCarousel } from "@/components/music/ScrollCarousel";
import { SeeAllSheet } from "@/components/music/SeeAllSheet";
import { usePlayer } from "@/lib/player-context";
import {
  getPopularTracks,
  getFeaturedAlbums,
  getCuratedPlaylists,
  searchTracks,
  getRecommendations,
} from "@/lib/music-service";
import { toast } from "sonner";
import { Play, ChevronLeft, Search, X } from "lucide-react";
import { Haptics } from "@/lib/haptics";
import { globalCache } from "@/core/cache/cache-manager";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Listen Now — VibeIN" },
      {
        name: "description",
        content: "Editor picks, new releases and stations tuned to your taste.",
      },
    ],
  }),
  component: ListenNow,
});

function ListenNow() {
  const {
    setTrack,
    openNowPlaying,
    setQueue,
    recentlyPlayed,
    likedTracks,
    savedAlbums,
    toggleSaveAlbum,
    isAlbumSaved,
  } = usePlayer();
  const [popularTracks, setPopularTracks] = useState<Track[]>([]);
  const [topChartTracks, setTopChartTracks] = useState<Track[]>([]);
  const [featured, setFeatured] = useState<Album[]>([]);
  const [topPicks, setTopPicks] = useState<(Track & { tag?: string })[]>([]);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [shuffledRecentlyAdded, setShuffledRecentlyAdded] = useState<Playlist[]>(recentlyAdded);
  const [isLoading, setIsLoading] = useState(true);
  const [activeSeeAll, setActiveSeeAll] = useState<{
    id: "featured_albums" | "jump_back_in" | "trending_now" | "new_releases" | "recently_added";
    title: string;
  } | null>(null);

  useEffect(() => {
    async function loadData(refresh = false) {
      if (refresh) {
        globalCache.clear();
      }
      if (!refresh) setIsLoading(true);
      try {
        const timeOfDay =
          new Date().getHours() < 12
            ? "morning"
            : new Date().getHours() < 18
              ? "afternoon"
              : "night";
        const [tracks, popTracks, fAlbums, pLists] = await Promise.all([
          homeRecommendations.getTopPicks({ timeOfDay }),
          getPopularTracks(50),
          getFeaturedAlbums(30),
          getCuratedPlaylists(30),
        ]);

        let personalTracks: Track[] = [];

        // 1. Gather favorite/recently-played artists
        const pastArtists = Array.from(
          new Set([
            ...(recentlyPlayed || []).map((t) => t.artist),
            ...(likedTracks || []).map((t) => t.artist),
          ]),
        ).filter(Boolean);

        // 2. Extract recently played tracks to get recommendations
        const pastTrackIds = (recentlyPlayed || []).map((t) => t.id).filter(Boolean);

        // Fetch recommendations from past tracks or fallback artists
        const recommendationsPromises: Promise<Track[]>[] = [];

        if (pastTrackIds.length > 0) {
          // Choose up to 2 random past tracks to get recommendations for
          const sampledTrackIds = [...pastTrackIds].sort(() => 0.5 - Math.random()).slice(0, 2);
          sampledTrackIds.forEach((id) => {
            recommendationsPromises.push(getRecommendations(id));
          });
        }

        if (pastArtists.length > 0) {
          // Choose up to 2 random past artists to search songs
          const sampledArtists = [...pastArtists].sort(() => 0.5 - Math.random()).slice(0, 2);
          sampledArtists.forEach((artist) => {
            recommendationsPromises.push(searchTracks(artist, 10));
          });
        } else {
          // First-time or empty history: pick 2 random popular artists to make search dynamic
          const defaultArtists = [
            "Arijit Singh",
            "The Weeknd",
            "Taylor Swift",
            "Pritam",
            "Anirudh Ravichander",
            "Diljit Dosanjh",
            "Shreya Ghoshal",
            "Coldplay",
            "Alan Walker",
            "Justin Bieber",
            "Sid Sriram",
            "Post Malone",
            "Dua Lipa",
          ];
          const sampledArtists = [...defaultArtists].sort(() => 0.5 - Math.random()).slice(0, 2);
          sampledArtists.forEach((artist) => {
            recommendationsPromises.push(searchTracks(artist, 10));
          });
        }

        const resolvedPersonal = await Promise.all(recommendationsPromises);
        resolvedPersonal.forEach((list) => {
          if (list && list.length > 0) {
            personalTracks.push(...list);
          }
        });

        // Dedup personalTracks
        const seenIds = new Set<string>();
        personalTracks = personalTracks.filter((t) => {
          if (!t || !t.id || seenIds.has(t.id)) return false;
          seenIds.add(t.id);
          return true;
        });

        // 3. Mix everything beautifully
        let finalPopular: Track[] = [];
        if (personalTracks.length > 0) {
          // Combine personal tracks with top/popular tracks
          const pool = [...personalTracks, ...(popTracks || []), ...(tracks || [])];
          // Completely randomize/shuffle the pool
          finalPopular = pool.sort(() => 0.5 - Math.random());
        } else {
          finalPopular = (popTracks && popTracks.length > 0 ? popTracks : tracks).sort(
            () => 0.5 - Math.random(),
          );
        }

        const seenFinalIds = new Set<string>();
        const allUniqueTracks = finalPopular.filter((t) => {
          if (!t || !t.id || seenFinalIds.has(t.id)) return false;
          seenFinalIds.add(t.id);
          return true;
        });

        // 4. Set final states
        const tags = ["For You", "Trending", "Top Pick", "New Release", "Hot Track"];
        const finalTopPicks = allUniqueTracks.slice(0, 10).map((t, idx) => ({
          ...t,
          tag: tags[idx % tags.length],
        }));

        const finalPopularTracks = allUniqueTracks.slice(10, 25);
        const finalTopChartTracks = allUniqueTracks.slice(25, 40);

        // Shuffle curated playlists and albums so they change on every single refresh!
        const finalPlaylists = (pLists && pLists.length > 0 ? pLists : playlists)
          .sort(() => 0.5 - Math.random())
          .slice(0, 10);

        // albums handled below

        setPopularTracks(finalPopularTracks);
        setTopChartTracks(finalTopChartTracks);
        setQueue([...finalTopPicks, ...finalPopularTracks, ...finalTopChartTracks]);
        setTopPicks(finalTopPicks);
        setPlaylists(finalPlaylists);

        const allAlbums = [...new Set([...seeAllAlbums, ...featuredAlbums])].sort(
          () => 0.5 - Math.random(),
        );
        setFeatured(allAlbums.slice(0, 10));
        setNewReleases(allAlbums.slice(10, 20));
        setShuffledRecentlyAdded([...recentlyAdded].sort(() => 0.5 - Math.random()));
      } catch (err) {
        console.error("Failed to load homepage data:", err);
      } finally {
        setIsLoading(false);
      }
    }

    // Attach to window so pull-to-refresh can call it
    (window as unknown as { refreshHomeData?: () => Promise<void> }).refreshHomeData = () =>
      loadData(true);

    loadData();
  }, [setQueue, recentlyPlayed, likedTracks]);

  const [pullProgress, setPullProgress] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [newReleases, setNewReleases] = useState<Album[]>(seeAllAlbums);

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
        if ((window as unknown as { refreshHomeData?: () => Promise<void> }).refreshHomeData) {
          (window as unknown as { refreshHomeData: () => Promise<void> })
            .refreshHomeData()
            .finally(() => {
              setTimeout(() => {
                setIsRefreshing(false);
                setPullProgress(0);
              }, 500);
            });
        }
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

  const displayRecentlyAdded = [
    ...savedAlbums.map((album) => ({
      id: album.id,
      title: album.title,
      subtitle: album.artist,
      gradient: album.gradient,
      coverUrl: album.coverUrl,
    })),
    ...shuffledRecentlyAdded,
  ];

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
          : (topPicks.length > 0 ? topPicks : []).map((a) => (
              <motion.div
                key={a.id}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setTrack({
                    id: a.id,
                    title: a.title,
                    artist: a.artist,
                    album: a.album || a.title,
                    duration: a.duration || "3:42",
                    gradient: a.gradient,
                    coverUrl: a.coverUrl,
                    audioUrl: a.audioUrl,
                  });
                  openNowPlaying();
                }}
                className="relative aspect-[16/10] w-[86vw] max-w-[450px] shrink-0 snap-center overflow-hidden rounded-2xl album-shadow cursor-pointer"
                style={{
                  background: a.gradient,
                }}
              >
                <CoverImage
                  src={a.coverUrl ? getCoverUrl(a.coverUrl) : undefined}
                  title={a.title}
                  artist={a.artist}
                  className="absolute inset-0 h-full w-full object-cover z-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10" />
                <div className="relative flex h-full flex-col justify-end p-5 text-white z-10">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-amber-400 mb-0.5">
                    {a.tag || "Trending"}
                  </span>
                  <h3 className="text-xl font-extrabold text-white leading-tight mb-0.5 drop-shadow-md">
                    {a.title}
                  </h3>
                  <p className="text-xs text-white/90 font-medium mb-3 truncate">{a.artist}</p>
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
                        toggleSaveAlbum({
                          id: a.id,
                          title: a.title,
                          artist: a.artist,
                          year: "2024",
                          gradient: a.gradient,
                          coverUrl: a.coverUrl,
                        });
                      }}
                      className={`rounded-full px-3.5 py-1.5 text-[11px] font-semibold tracking-tight active:scale-95 transition-all backdrop-blur-sm ${isAlbumSaved(a.id) ? "bg-white text-zinc-950" : "bg-white/20 text-white hover:bg-white/30 backdrop-blur-md"}`}
                    >
                      {isAlbumSaved(a.id) ? "Saved" : "Save"}
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
                  className="flex items-center gap-3 rounded-2xl bg-foreground/[0.02] p-3"
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
                  className="group relative flex items-center gap-3 rounded-2xl bg-foreground/[0.02] p-3 cursor-pointer hover:bg-foreground/[0.06] transition-all duration-300"
                >
                  {/* Thumbnail */}
                  <div
                    className="h-12 w-12 shrink-0 rounded-xl relative overflow-hidden shadow-md"
                    style={{ background: p.gradient }}
                  >
                    <CoverImage
                      src={p.coverUrl ? getCoverUrl(p.coverUrl) : undefined}
                      title={p.title}
                      artist={p.artist}
                      iconSize={20}
                      className="absolute inset-0 h-full w-full object-cover z-0"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-white/10 z-10 pointer-events-none" />
                  </div>

                  {/* Details - vertically centered title */}
                  <div className="min-w-0 flex-1 flex flex-col justify-center">
                    <p className="truncate text-[13.5px] font-semibold text-foreground tracking-tight group-hover:text-accent-pink transition-colors">
                      {p.title}
                    </p>
                    <p className="truncate text-[11px] text-muted-foreground mt-0.5 font-medium leading-none">
                      {p.artist}
                    </p>
                  </div>

                  {/* Translucent Play Button on Right */}
                  <div className="h-8 w-8 rounded-full bg-foreground/5 group-hover:bg-foreground/10 flex items-center justify-center shrink-0 transition-all duration-300">
                    <Play className="h-3 w-3 fill-foreground text-foreground translate-x-[0.5px]" />
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
            ? [1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="w-[44vw] max-w-[170px] shrink-0">
                  <AlbumCardSkeleton />
                </div>
              ))
            : (popularTracks.length > 0 ? popularTracks : topCharts).map((t, idx) => (
                <motion.div
                  key={t.id}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setTrack(t);
                    openNowPlaying();
                  }}
                  className="group flex flex-col w-[44vw] max-w-[170px] shrink-0 snap-center cursor-pointer"
                >
                  {/* Square Artwork with corner radius & Play Button Overlay */}
                  <div
                    className="relative aspect-square w-full rounded-[20px] overflow-hidden shadow-lg"
                    style={{ background: t.gradient }}
                  >
                    <CoverImage
                      src={t.coverUrl ? getCoverUrl(t.coverUrl) : undefined}
                      title={t.title}
                      artist={t.artist}
                      className="absolute inset-0 h-full w-full object-cover z-0"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-black/30 via-transparent to-white/5 z-10 pointer-events-none" />

                    {/* Ranking Badge Overlay at top-left of artwork */}
                    <div className="absolute top-3 left-3 flex h-6 w-6 items-center justify-center rounded-full bg-black/40 backdrop-blur-md text-[11px] font-black text-accent-pink shadow-md">
                      #{idx + 1}
                    </div>

                    {/* Translucent Play Button Overlay on Bottom Right of Artwork */}
                    <div className="absolute bottom-3 right-3 h-8 w-8 rounded-full bg-white/20 backdrop-blur-md group-hover:bg-accent-pink group-hover:border-accent-pink flex items-center justify-center transition-all duration-300 shadow-md">
                      <Play className="h-3 w-3 fill-foreground text-foreground translate-x-[0.5px]" />
                    </div>
                  </div>

                  {/* Text Details Below Artwork */}
                  <div className="mt-2.5 px-0.5">
                    <p className="truncate text-[13.5px] font-semibold text-foreground tracking-tight group-hover:text-accent-pink transition-colors">
                      {t.title}
                    </p>
                    <p className="truncate text-[11px] text-muted-foreground mt-0.5 font-medium">
                      {t.artist}
                    </p>
                  </div>
                </motion.div>
              ))}
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
          {isLoading
            ? [1, 2, 3, 4].map((i) => (
                <div key={i} className="w-[42vw] max-w-[170px] shrink-0">
                  <AlbumCardSkeleton />
                </div>
              ))
            : newReleases.map((a) => (
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
          {isLoading
            ? [1, 2, 3, 4, 5, 6].map((i) => <TrackRowSkeleton key={i} />)
            : (topChartTracks.length > 0 ? topChartTracks.slice(0, 6) : topCharts.slice(0, 6)).map(
                (t, i) => <TrackRow key={t.id} track={t} index={i} />,
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
          {isLoading
            ? [1, 2, 3, 4].map((i) => (
                <div key={i} className="w-[42vw] max-w-[170px] shrink-0">
                  <PlaylistTileSkeleton />
                </div>
              ))
            : displayRecentlyAdded.map((p, idx) => (
                <div key={p.id + "_recently_" + idx} className="w-[42vw] max-w-[170px] shrink-0">
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
          className={`grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br ${gradient} text-xs font-semibold text-foreground transition-transform active:scale-90 hover:scale-105`}
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
