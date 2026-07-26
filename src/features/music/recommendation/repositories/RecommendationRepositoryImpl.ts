import type { RecommendationRepository } from "../domain/repositories/RecommendationRepository";
import type { Track } from "@/lib/music-data";
import { MusicServiceFacade } from "../../services/music.service";

export class RecommendationRepositoryImpl implements RecommendationRepository {
  async getSimilarTracks(trackId: string, limit: number = 10): Promise<Track[]> {
    const cleanId = (trackId || "")
      .replace(/^(itunes_|jiosaavn_|piped_|invidious_|audius_)/, "")
      .replace(/[^a-zA-Z0-9 ]/g, " ")
      .trim();

    if (cleanId.length > 0) {
      const results = await MusicServiceFacade.searchTracks(cleanId, limit * 2);
      if (results.length > 0) return results;
    }
    return MusicServiceFacade.getPopularTracks(limit * 2);
  }

  async getTrendingTracks(region?: string, limit: number = 20): Promise<Track[]> {
    return MusicServiceFacade.getPopularTracks(limit);
  }

  async getNewReleases(limit: number = 10): Promise<Track[]> {
    return MusicServiceFacade.getPopularTracks(limit);
  }

  async getMoodTracks(mood: string, limit: number = 20): Promise<Track[]> {
    return MusicServiceFacade.getTracksByGenre(mood, limit);
  }
}
