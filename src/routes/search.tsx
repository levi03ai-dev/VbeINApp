import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { Clock, Mic, Play, Search as SearchIcon, X, TrendingUp } from "lucide-react";
import { useMemo, useState, useEffect } from "react";
import { genres, topCharts, featuredAlbums, getCoverUrl } from "@/lib/music-data";
import { usePlayer } from "@/lib/player-context";
import { searchTracks, getTracksByGenre } from "@/lib/music-service";
import type { Track } from "@/lib/music-data";
import { TrackRow } from "@/components/music/cards";
import { CoverImage } from "@/components/music/CoverImage";
import { TrackRowSkeleton } from "@/components/music/CardSkeletons";

export const Route = createFileRoute("/search")({
  head: () => ({
    meta: [
      { title: "Search — VibeIN" },
      { name: "description", content: "Search artists, songs, albums, and playlists." },
    ],
  }),
  component: Search,
});

type Category = "top" | "songs" | "albums" | "artists";
const CATS: { id: Category; label: string }[] = [
  { id: "top", label: "Top" },
  { id: "songs", label: "Songs" },
  { id: "albums", label: "Albums" },
  { id: "artists", label: "Artists" },
];

function useArtists() {
  return useMemo(() => {
    const map = new Map<string, { name: string; gradient: string; count: number }>();
    for (const t of topCharts) {
      const cur = map.get(t.artist);
      if (cur) cur.count++;
      else map.set(t.artist, { name: t.artist, gradient: t.gradient, count: 1 });
    }
    for (const a of featuredAlbums) {
      const cur = map.get(a.artist);
      if (cur) cur.count++;
      else map.set(a.artist, { name: a.artist, gradient: a.gradient, count: 1 });
    }
    return Array.from(map.values());
  }, []);
}

function Search() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<Category>("top");
  const [apiResults, setApiResults] = useState<Track[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [trendingSearches, setTrendingSearches] = useState<string[]>([]);

  useEffect(() => {
    const allTrends = [
      "Animal",
      "Arijit Singh",
      "Vishal Mishra",
      "Bollywood Hits",
      "Punjabi",
      "Pritam",
      "Shreya Ghoshal",
      "Diljit Dosanjh",
      "Lofi",
      "Party",
      "90s Romance",
      "Karan Aujla",
      "The Weeknd",
      "Taylor Swift",
    ];
    // Pick 5 random
    const shuffled = [...allTrends].sort(() => 0.5 - Math.random());
    setTrendingSearches(shuffled.slice(0, 5));
  }, []);
  const [recentSearches, setRecentSearches] = useState<string[]>([
    "Arijit Singh",
    "Kesariya",
    "Bollywood",
    "Punjabi Hits",
  ]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("melody_stream_recent_searches");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setRecentSearches(parsed);
        }
      }
    } catch {
      // ignore
    }
  }, []);

  const artists = useArtists();
  const { setTrack, openNowPlaying, setQueue } = usePlayer();

  const saveRecentSearch = (term: string) => {
    const trimmed = term.trim();
    if (!trimmed || trimmed.length < 2) return;
    setRecentSearches((prev) => {
      const filtered = prev.filter((item) => item.toLowerCase() !== trimmed.toLowerCase());
      const next = [trimmed, ...filtered].slice(0, 10);
      try {
        localStorage.setItem("melody_stream_recent_searches", JSON.stringify(next));
      } catch (e) {
        console.error("Failed to save recent search", e);
      }
      return next;
    });
  };

  const removeRecentSearch = (term: string) => {
    setRecentSearches((prev) => {
      const next = prev.filter((item) => item.toLowerCase() !== term.toLowerCase());
      try {
        localStorage.setItem("melody_stream_recent_searches", JSON.stringify(next));
      } catch (e) {
        console.error("Failed to remove recent search", e);
      }
      return next;
    });
  };

  const clearAllRecent = () => {
    setRecentSearches([]);
    try {
      localStorage.removeItem("melody_stream_recent_searches");
    } catch (e) {
      console.error("Failed to clear recent searches", e);
    }
  };

  useEffect(() => {
    const trimmed = q.trim();
    if (!trimmed) {
      setApiResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    const timeoutId = setTimeout(async () => {
      try {
        const tracks = await searchTracks(trimmed, 30);
        setApiResults(tracks);
      } catch (err) {
        console.error("Failed to fetch search results:", err);
      } finally {
        setIsSearching(false);
      }
    }, 400);

    return () => clearTimeout(timeoutId);
  }, [q]);

  const needle = q.trim().toLowerCase();
  const results = useMemo(() => {
    if (!needle) return null;
    const rawSongs =
      apiResults.length > 0
        ? apiResults
        : topCharts.filter((t) => (t.title + t.artist + t.album).toLowerCase().includes(needle));

    const seenSongIds = new Set<string>();
    const songs = rawSongs.filter((t) => {
      if (!t || !t.id || seenSongIds.has(t.id)) return false;
      seenSongIds.add(t.id);
      return true;
    });

    return {
      songs,
      albums: featuredAlbums.filter((a) => (a.title + a.artist).toLowerCase().includes(needle)),
      artists: artists.filter((a) => a.name.toLowerCase().includes(needle)),
    };
  }, [needle, apiResults, artists]);

  return (
    <div className="pt-4">
      <div className="px-4">
        <h1 className="text-[24px] font-semibold tracking-tight text-foreground/90">Search</h1>
        <div className="mt-3 flex items-center gap-2.5 rounded-xl border border-border bg-surface/40 px-3 py-2">
          <SearchIcon className="h-4 w-4 text-muted-foreground/60" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && q.trim()) {
                saveRecentSearch(q.trim());
              }
            }}
            placeholder="Artists, songs, albums"
            className="w-full bg-transparent text-[14px] text-foreground placeholder:text-muted-foreground/50 focus:outline-none"
          />
          {q ? (
            <button
              onClick={() => setQ("")}
              className="text-muted-foreground/60 hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          ) : (
            <button
              onClick={() => {
                const win = window as unknown as {
                  SpeechRecognition?: new () => any;
                  webkitSpeechRecognition?: new () => any;
                };
                const SpeechRecognition = win.SpeechRecognition || win.webkitSpeechRecognition;
                if (SpeechRecognition) {
                  const recognition = new SpeechRecognition();
                  recognition.onresult = (event: { results: { transcript: string }[][] }) => {
                    const transcript = event.results[0][0].transcript;
                    setQ(transcript);
                    saveRecentSearch(transcript);
                  };
                  recognition.start();
                } else {
                  alert("Speech recognition is not supported in this browser.");
                }
              }}
            >
              <Mic className="h-4 w-4 text-muted-foreground/50 hover:text-foreground transition-colors" />
            </button>
          )}
        </div>

        {isSearching && (
          <div className="mt-2 h-0.5 w-full overflow-hidden rounded bg-foreground/10 relative">
            <motion.div
              initial={{ left: "-50%" }}
              animate={{ left: "100%" }}
              transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
              className="absolute h-full w-[50%] bg-foreground/30 rounded"
            />
          </div>
        )}

        {results && (
          <LayoutGroup>
            <div className="no-scrollbar mt-4 flex gap-2 overflow-x-auto pb-1">
              {CATS.map((c) => {
                const active = cat === c.id;
                return (
                  <button
                    key={c.id}
                    onClick={() => setCat(c.id)}
                    className={`relative rounded-full px-4 py-1 text-[12px] font-medium transition ${
                      active ? "text-background" : "text-foreground/80 hover:text-foreground"
                    }`}
                  >
                    {active && (
                      <motion.span
                        layoutId="cat-pill"
                        transition={{ type: "spring", stiffness: 180, damping: 26, mass: 1.1 }}
                        className="absolute inset-0 -z-10 rounded-full bg-foreground"
                      />
                    )}
                    {!active && (
                      <span className="absolute inset-0 -z-10 rounded-full border border-border bg-surface/30" />
                    )}
                    {c.label}
                  </button>
                );
              })}
            </div>
          </LayoutGroup>
        )}
      </div>

      <AnimatePresence mode="wait" initial={false}>
        {results ? (
          <motion.div
            key={"r-" + cat}
            initial={{ opacity: 0, y: 18, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -14, filter: "blur(10px)" }}
            transition={{ duration: 0.65, ease: [0.32, 0.72, 0, 1] }}
            className="mt-5 px-4"
          >
            {isSearching ? (
              <div className="space-y-2 mt-2">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <TrackRowSkeleton key={i} />
                ))}
              </div>
            ) : (
              <>
                {(cat === "top" || cat === "artists") && results.artists.length > 0 && (
                  <Section title="Artists">
                    <div className="no-scrollbar -mx-4 flex gap-3 overflow-x-auto px-4 pb-1">
                      {results.artists.map((a) => (
                        <ArtistCard
                          key={a.name}
                          name={a.name}
                          gradient={a.gradient}
                          onPlay={async () => {
                            saveRecentSearch(a.name);
                            setIsSearching(true);
                            try {
                              const { searchTracks } = await import("@/lib/music-service");
                              const tracks = await searchTracks(a.name, 20);
                              if (tracks.length > 0) {
                                setQueue(tracks);
                                setTrack(tracks[0]);
                                openNowPlaying();
                              }
                            } catch (e) {
                              console.error(e);
                            } finally {
                              setIsSearching(false);
                            }
                          }}
                        />
                      ))}
                    </div>
                  </Section>
                )}
                {(cat === "top" || cat === "albums") && results.albums.length > 0 && (
                  <Section title="Albums">
                    <div className="grid grid-cols-2 gap-3">
                      {results.albums.map((a) => (
                        <AlbumResultCard
                          key={a.id}
                          title={a.title}
                          artist={a.artist}
                          gradient={a.gradient}
                          onPlay={async () => {
                            saveRecentSearch(a.title);
                            setIsSearching(true);
                            try {
                              const { searchTracks } = await import("@/lib/music-service");
                              const tracks = await searchTracks(a.title, 20);
                              if (tracks.length > 0) {
                                setQueue(tracks);
                                setTrack(tracks[0]);
                                openNowPlaying();
                              } else {
                                setTrack({
                                  id: a.id,
                                  title: a.title,
                                  artist: a.artist,
                                  album: a.title,
                                  duration: "3:42",
                                  gradient: a.gradient,
                                });
                                openNowPlaying();
                              }
                            } catch (e) {
                              console.error(e);
                            } finally {
                              setIsSearching(false);
                            }
                          }}
                        />
                      ))}
                    </div>
                  </Section>
                )}
                {(cat === "top" || cat === "songs") && results.songs.length > 0 && (
                  <Section title="Songs">
                    <div className="space-y-0.5">
                      {results.songs.map((t, i) => (
                        <TrackRow
                          key={t.id}
                          track={t}
                          index={i}
                          onSelect={() => saveRecentSearch(t.title)}
                        />
                      ))}
                    </div>
                  </Section>
                )}
                {results.songs.length + results.albums.length + results.artists.length === 0 && (
                  <p className="mt-8 text-center text-sm text-muted-foreground/60">
                    No results for "{q}"
                  </p>
                )}
              </>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="discover"
            initial={{ opacity: 0, y: 18, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -14, filter: "blur(10px)" }}
            transition={{ duration: 0.65, ease: [0.32, 0.72, 0, 1] }}
          >
            {/* Recent Searches */}
            {/* Trending Searches */}
            {trendingSearches.length > 0 && (
              <section className="mt-5 px-4">
                <h2 className="text-[14px] font-semibold tracking-tight text-foreground/90 flex items-center gap-1.5 mb-2.5">
                  <TrendingUp className="h-3.5 w-3.5 text-accent-pink" />
                  Trending Searches
                </h2>
                <div className="flex flex-wrap gap-2">
                  {trendingSearches.map((term) => (
                    <div
                      key={term}
                      onClick={() => {
                        setQ(term);
                        saveRecentSearch(term);
                      }}
                      className="group flex items-center gap-1.5 rounded-full bg-surface/50 px-3 py-1 text-[13px] text-foreground/90 hover:bg-surface/80 transition-all cursor-pointer border border-accent-pink/10"
                    >
                      <span>{term}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Recent Searches */}
            {recentSearches.length > 0 && (
              <section className="mt-5 px-4">
                <div className="flex items-center justify-between mb-2.5">
                  <h2 className="text-[14px] font-semibold tracking-tight text-foreground/90 flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 text-muted-foreground/70" />
                    Recent Searches
                  </h2>
                  <button
                    onClick={clearAllRecent}
                    className="text-[12px] font-medium text-muted-foreground/70 hover:text-foreground transition-colors"
                  >
                    Clear All
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {recentSearches.map((term) => (
                    <div
                      key={term}
                      onClick={() => {
                        setQ(term);
                        saveRecentSearch(term);
                      }}
                      className="group flex items-center gap-1.5 rounded-full bg-surface/50 px-3 py-1 text-[13px] text-foreground/90 hover:bg-surface/80 transition-all cursor-pointer"
                    >
                      <Clock className="h-3 w-3 text-muted-foreground/60" />
                      <span>{term}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeRecentSearch(term);
                        }}
                        className="ml-0.5 rounded-full p-0.5 text-muted-foreground/50 hover:bg-foreground/10 hover:text-foreground transition-colors"
                        title="Remove"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-6">
      <span className="mb-2.5 block text-[9px] font-bold uppercase tracking-[0.16em] text-muted-foreground/50">
        {title}
      </span>
      {children}
    </section>
  );
}

function ArtistCard({
  name,
  gradient,
  onPlay,
}: {
  name: string;
  gradient: string;
  onPlay?: () => void;
}) {
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={onPlay}
      className="flex w-[84px] shrink-0 flex-col items-center gap-2 text-center"
    >
      <div
        className="h-20 w-20 rounded-full album-shadow relative overflow-hidden"
        style={{ background: gradient }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(100%_50%_at_0%_0%,rgba(255,255,255,0.15),transparent_60%)]" />
      </div>
      <p className="line-clamp-1 text-[11px] font-medium text-foreground/85 tracking-tight">
        {name}
      </p>
    </motion.button>
  );
}

function AlbumResultCard({
  title,
  artist,
  gradient,
  onPlay,
}: {
  title: string;
  artist: string;
  gradient: string;
  onPlay: () => void;
}) {
  return (
    <motion.button whileTap={{ scale: 0.98 }} onClick={onPlay} className="text-left w-full">
      <div
        className="relative aspect-square overflow-hidden rounded-xl album-shadow"
        style={{ background: gradient }}
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-black/25 via-transparent to-white/5" />
        <span className="absolute right-2.5 bottom-2.5 grid h-7 w-7 place-items-center rounded-full bg-white/95 text-black shadow-sm active:scale-90 transition-transform">
          <Play className="h-3 w-3 fill-current ml-0.5" />
        </span>
      </div>
      <p className="mt-1.5 line-clamp-1 text-[13px] font-medium text-foreground tracking-tight">
        {title}
      </p>
      <p className="line-clamp-1 text-[11px] text-muted-foreground/80">{artist}</p>
    </motion.button>
  );
}
