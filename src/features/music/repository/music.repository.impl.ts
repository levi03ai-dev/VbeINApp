import type { MusicRepositoryInterface } from "../domain/repositories/music.repository.interface";
import type { Track, Album, Playlist } from "../types/music.types";
import { LocalMusicDataSource } from "../datasource/local/local-music.datasource";
import { RemoteMusicDataSource } from "../datasource/remote/remote-music.datasource";
import { CacheMusicDataSource } from "../datasource/cache/cache-music.datasource";
import { normalizeSongInfo } from "@/lib/music-data";

export function normalizeSongKey(title?: string, artist?: string): string {
  return normalizeSongInfo(title, artist).key;
}

export class MusicRepositoryImpl implements MusicRepositoryInterface {
  constructor(
    private localDataSource = new LocalMusicDataSource(),
    private remoteDataSource = new RemoteMusicDataSource(),
    private cacheDataSource = new CacheMusicDataSource(),
  ) {}

  async searchTracks(query: string, limit = 20): Promise<Track[]> {
    const q = query.trim();
    if (!q) return [];

    // 1. Check Cache
    const cached = this.cacheDataSource.getSearchCache(q);
    if (cached) return cached.slice(0, limit);

    // 2. Local matches
    const localMatches = this.localDataSource.searchTracks(q, limit);

    // 3. Remote search
    const onlineResults = await this.remoteDataSource.searchOnline(q);

    let result: Track[] = [];

    if (onlineResults.length > 0) {
      const combined = [...localMatches, ...onlineResults];
      const seen = new Set<string>();
      result = combined
        .filter((t) => {
          if (!t.title || !t.artist) return false;
          const key = normalizeSongKey(t.title, t.artist);
          if (seen.has(key)) return false;
          seen.add(key);
          return true;
        })
        .slice(0, limit);
    } else if (localMatches.length > 0) {
      result = localMatches;
    } else {
      const audiusResults = await this.remoteDataSource.searchAudius(q, limit);
      if (audiusResults.length > 0) {
        result = audiusResults;
      } else {
        result = this.localDataSource.getTopCharts(limit);
      }
    }

    this.cacheDataSource.setSearchCache(q, result);
    return result;
  }

  async getPopularTracks(limit = 20): Promise<Track[]> {
    const cached = this.cacheDataSource.getPopularCache();
    if (cached && cached.length >= 10) return cached.slice(0, limit);

    const chartQueries = ["Top Hits", "Trending Songs", "Billboard Hot 100", "Global Hits"];
    const onlineResults = await Promise.allSettled(
      chartQueries.map((q) => this.remoteDataSource.searchOnline(q)),
    );

    const fetchedTracks: Track[] = [];
    onlineResults.forEach((res) => {
      if (res.status === "fulfilled" && Array.isArray(res.value)) {
        fetchedTracks.push(...res.value);
      }
    });

    const localCharts = this.localDataSource.getTopCharts(limit);
    const combined = [...fetchedTracks, ...localCharts];

    const seen = new Set<string>();
    const result = combined
      .filter((t) => {
        if (!t.title || !t.artist) return false;
        const key = normalizeSongKey(t.title, t.artist);
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      })
      .slice(0, limit);

    if (result.length > 0) {
      this.cacheDataSource.setPopularCache(result);
    }
    return result;
  }

  async getTracksByGenre(genre: string, limit = 15): Promise<Track[]> {
    const online = await this.remoteDataSource.searchOnline(genre + " hit songs");
    if (online.length > 0) return online.slice(0, limit);
    return this.localDataSource.getTracksByGenre(genre, limit);
  }

  async getFeaturedAlbums(limit = 10): Promise<Album[]> {
    return this.localDataSource.getFeaturedAlbums(limit);
  }

  async getCuratedPlaylists(limit = 10): Promise<Playlist[]> {
    return this.localDataSource.getCuratedPlaylists(limit);
  }
}
