import type { Track } from "@/lib/music-data";

export interface RecommendationRepository {
  getSimilarTracks(trackId: string, limit?: number): Promise<Track[]>;
  getTrendingTracks(region?: string, limit?: number): Promise<Track[]>;
  getNewReleases(limit?: number): Promise<Track[]>;
  getMoodTracks(mood: string, limit?: number): Promise<Track[]>;
}
