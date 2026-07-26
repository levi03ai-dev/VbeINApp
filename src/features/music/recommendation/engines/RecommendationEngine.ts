import type { RecommendationRepository } from "../domain/repositories/RecommendationRepository";
import type { RecommendationContext } from "../domain/models/RecommendationContext";
import { RankingEngine } from "./RankingEngine";
import type { Track } from "@/lib/music-data";
import { globalRecommendationValidator } from "../validation/RecommendationValidator";

export class RecommendationEngine {
  constructor(
    private repo: RecommendationRepository,
    private ranking: RankingEngine,
  ) {}

  async getHomePicks(context: RecommendationContext): Promise<Track[]> {
    const trending = await this.repo.getTrendingTracks();
    const ranked = this.ranking.rankTracks(trending, context);
    return globalRecommendationValidator.validateRecommendationSet(ranked);
  }
}
