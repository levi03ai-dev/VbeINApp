import {
  type Track,
  type Album,
  type Playlist,
  topCharts,
  trendingTracks,
  featuredAlbums,
  madeForYou,
} from "./music-data";
import { createServerFn } from "@tanstack/react-start";

const APP_NAME = "VibeIN";

function generateGradient(str: string): string {
  let hash1 = 0;
  let hash2 = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash1 = (hash1 * 31 + char) | 0;
    hash2 = (hash2 * 17 + char) | 0;
  }
  const colors = [
    ["#ff3d7f", "#ff9e5e"],
    ["#0f2027", "#2c5364"],
    ["#c9a0dc", "#9b72cf"],
    ["#1a1a2e", "#a78bfa"],
    ["#5c2018", "#e8b84a"],
    ["#3a7bd5", "#3a6073"],
    ["#11998e", "#38ef7d"],
    ["#faf8f5", "#c9b99a"],
    ["#ff6b6b", "#574b90"],
    ["#0c2340", "#5cbdb9"],
    ["#f857a6", "#ff5858"],
    ["#0575e6", "#00f260"],
  ];
  const idx1 = Math.abs(hash1) % colors.length;
  const idx2 = Math.abs(hash2) % colors.length;
  const colorA = colors[idx1][0];
  const colorB = colors[idx2][1] || colors[idx1][1];
  return `linear-gradient(135deg, ${colorA} 0%, ${colorB} 100%)`;
}

function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

// Convert Audius API track structure into our Track interface
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapAudiusTrack(it: any): Track {
  const artwork = it.artwork?.["480x480"] || it.artwork?.["150x150"] || null;
  return {
    id: String(it.id || Math.random()),
    title: it.title || "Unknown Track",
    artist: it.user?.name || "Unknown Artist",
    album: "Single",
    duration: formatDuration(it.duration || 180),
    gradient: generateGradient(it.user?.name || it.title || String(it.id)),
    audioUrl: `https://discoveryprovider.audius.co/v1/tracks/${it.id}/stream?app_name=${APP_NAME}`,
    coverUrl: artwork || "",
  };
}

// Convert Audius API playlist structure into Album or Playlist
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapAudiusPlaylist(it: any): Playlist & Album {
  const artwork = it.artwork?.["480x480"] || it.artwork?.["150x150"] || null;
  return {
    id: String(it.id || Math.random()),
    title: it.playlist_name || "Unknown Playlist",
    artist: it.user?.name || "Unknown Artist",
    subtitle: it.user?.name || "Unknown Artist",
    year: new Date().getFullYear().toString(),
    gradient: generateGradient(it.user?.name || it.playlist_name || String(it.id)),
    coverUrl: artwork || "",
  };
}

// Helper to filter/search local fallback tracks
function getLocalSearchTracks(query: string, limit = 20): Track[] {
  const q = query.toLowerCase().trim();
  const allLocal = [...topCharts, ...trendingTracks];
  const matched = allLocal.filter(
    (t) =>
      t.title.toLowerCase().includes(q) ||
      t.artist.toLowerCase().includes(q) ||
      (t.album && t.album.toLowerCase().includes(q)),
  );
  return matched.slice(0, limit);
}

// Helper to get local fallback tracks by genre
function getLocalTracksByGenre(genre: string, limit = 15): Track[] {
  const q = genre.toLowerCase().trim();
  const allLocal = [...topCharts, ...trendingTracks];
  if (q.includes("pop")) {
    return allLocal
      .filter((t) => t.id === "t1" || t.id === "tr2" || t.id === "tr5" || t.id === "t6")
      .slice(0, limit);
  }
  if (q.includes("electronic") || q.includes("dance")) {
    return allLocal
      .filter((t) => t.id === "t2" || t.id === "tr1" || t.id === "tr4")
      .slice(0, limit);
  }
  if (q.includes("rock") || q.includes("metal")) {
    return allLocal.filter((t) => t.id === "t4" || t.id === "tr3" || t.id === "t8").slice(0, limit);
  }
  if (q.includes("ambient") || q.includes("classical")) {
    return allLocal
      .filter((t) => t.id === "t3" || t.id === "t5" || t.id === "t7" || t.id === "tr6")
      .slice(0, limit);
  }
  return allLocal.slice(0, limit);
}

async function fetchOnlineApi(query: string): Promise<Track[]> {
  if (!query || !query.trim()) return [];
  try {
    const res = await fetch(`/api/music/search?q=${encodeURIComponent(query)}`);
    if (!res.ok) return [];
    const data = await res.json();
    if (Array.isArray(data) && data.length > 0) {
      return data.map((t: Track) => ({
        ...t,
        gradient: generateGradient(t.title || String(t.id)),
      }));
    }
  } catch (e) {
    console.warn("Online API fetch error:", e);
  }
  return [];
}

export async function searchTracks(query: string, limit = 20): Promise<Track[]> {
  const q = query.trim();
  if (!q) return [];

  const localMatches = getLocalSearchTracks(q, limit);
  const onlineResults = await fetchOnlineApi(q);

  if (onlineResults.length > 0) {
    const combined = [...localMatches, ...onlineResults];
    const seen = new Set<string>();
    const unique = combined.filter((t) => {
      const key = (t.title + "|" + t.artist).toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
    return unique.slice(0, limit);
  }

  if (localMatches.length > 0) {
    return localMatches;
  }

  try {
    const url = `https://discoveryprovider.audius.co/v1/tracks/search?query=${encodeURIComponent(
      q,
    )}&app_name=${APP_NAME}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("Network response not ok");
    const data = await res.json();
    if (data.data && Array.isArray(data.data) && data.data.length > 0) {
      return data.data.slice(0, limit).map(mapAudiusTrack);
    }
  } catch (error) {
    console.warn("Audius search fallback error:", error);
  }

  return [...topCharts, ...trendingTracks].slice(0, limit);
}

export async function getPopularTracks(limit = 20): Promise<Track[]> {
  const online = await fetchOnlineApi("Saiyaara Kesariya Chaleya Tauba Tauba");
  if (online.length > 0) {
    const combined = [...topCharts, ...online];
    const seen = new Set<string>();
    const unique = combined.filter((t) => {
      const key = (t.title + "|" + t.artist).toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
    return unique.slice(0, limit);
  }
  return [...topCharts, ...trendingTracks].slice(0, limit);
}

export async function getTracksByGenre(genre: string, limit = 15): Promise<Track[]> {
  const online = await fetchOnlineApi(genre + " hit songs");
  if (online.length > 0) return online.slice(0, limit);
  return getLocalTracksByGenre(genre, limit);
}

export async function getFeaturedAlbums(limit = 10): Promise<Album[]> {
  return featuredAlbums.slice(0, limit);
}

export async function getCuratedPlaylists(limit = 10): Promise<Playlist[]> {
  return madeForYou.slice(0, limit);
}

export async function downloadTrackFile(audioUrl: string, filename: string): Promise<boolean> {
  if (!audioUrl) return false;
  try {
    const res = await fetch(audioUrl);
    if (!res.ok) throw new Error("Stream download fetch failed");
    const blob = await res.blob();
    const blobUrl = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = blobUrl;
    a.download = filename.endsWith(".mp3") ? filename : `${filename}.mp3`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(blobUrl);
    return true;
  } catch (error) {
    console.error("Direct Blob download failed, attempting fallback window.open:", error);
    try {
      window.open(audioUrl, "_blank");
      return true;
    } catch {
      return false;
    }
  }
}
