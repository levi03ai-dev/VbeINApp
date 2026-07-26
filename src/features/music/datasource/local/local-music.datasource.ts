import {
  topCharts,
  trendingTracks,
  featuredAlbums,
  madeForYou,
  type Track,
  type Album,
  type Playlist,
} from "../../../../lib/music-data";

export class LocalMusicDataSource {
  getTopCharts(limit = 20): Track[] {
    return [...topCharts, ...trendingTracks].slice(0, limit);
  }

  searchTracks(query: string, limit = 20): Track[] {
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

  getTracksByGenre(genre: string, limit = 15): Track[] {
    const q = genre.toLowerCase().trim();
    const allLocal = [...topCharts, ...trendingTracks];
    if (q.includes("pop")) {
      return allLocal
        .filter(
          (t) =>
            t.id === "global_1" || t.id === "global_2" || t.id === "global_3" || t.id === "tr2",
        )
        .slice(0, limit);
    }
    if (q.includes("electronic") || q.includes("dance")) {
      return allLocal
        .filter((t) => t.id === "global_4" || t.id === "tr1" || t.id === "tr4")
        .slice(0, limit);
    }
    if (q.includes("rock") || q.includes("metal")) {
      return allLocal
        .filter((t) => t.id === "global_5" || t.id === "tr3" || t.id === "global_9")
        .slice(0, limit);
    }
    if (q.includes("ambient") || q.includes("classical")) {
      return allLocal
        .filter(
          (t) =>
            t.id === "global_6" || t.id === "global_7" || t.id === "global_8" || t.id === "tr5",
        )
        .slice(0, limit);
    }
    return allLocal.slice(0, limit);
  }

  getFeaturedAlbums(limit = 10): Album[] {
    return featuredAlbums.slice(0, limit);
  }

  getCuratedPlaylists(limit = 10): Playlist[] {
    return madeForYou.slice(0, limit);
  }
}
