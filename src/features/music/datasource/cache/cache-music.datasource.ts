import { globalCache } from "../../../../core/cache/cache-manager";
import { AppConfig } from "../../../../core/config/app-config";
import type { Track } from "../../../../lib/music-data";

export class CacheMusicDataSource {
  getSearchCache(query: string): Track[] | null {
    return globalCache.get<Track[]>(`search_${query.toLowerCase().trim()}`);
  }

  setSearchCache(query: string, tracks: Track[]): void {
    globalCache.set(`search_${query.toLowerCase().trim()}`, tracks, AppConfig.cacheTtlMs);
  }

  getPopularCache(): Track[] | null {
    return globalCache.get<Track[]>("popular_tracks");
  }

  setPopularCache(tracks: Track[]): void {
    globalCache.set("popular_tracks", tracks, AppConfig.cacheTtlMs);
  }
}
