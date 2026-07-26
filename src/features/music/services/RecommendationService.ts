import { MusicRepository } from "../domain/repositories/MusicRepository";
import { Track } from "../domain/entities/Track";
import { Logger } from "../../../core/logger/logger";

export class RecommendationService {
  constructor(private musicRepository: MusicRepository) {}

  async getTrending(region?: string): Promise<Track[]> {
    try {
      return await this.musicRepository.getTrending(region);
    } catch (e) {
      Logger.warn("Trending fetch failed:", e);
      return [];
    }
  }

  async getRecommendations(trackId: string): Promise<Track[]> {
    try {
      return await this.musicRepository.getRecommendations(trackId);
    } catch (e) {
      Logger.warn("Recommendation fetch failed:", e);
      return [];
    }
  }
}
