import type { RecommendationRepository } from "../domain/repositories/RecommendationRepository";
import type { RecommendationContext } from "../domain/models/RecommendationContext";
import { RankingEngine } from "./RankingEngine";
import type { Track } from "@/lib/music-data";
import { globalRecommendationValidator } from "../validation/RecommendationValidator";

export class NextUpQueueGenerator {
  constructor(
    private repo: RecommendationRepository,
    private ranking: RankingEngine,
  ) {}

  async generate(context: RecommendationContext, limit: number): Promise<Track[]> {
    const queryKey =
      context.currentTrackTitle || context.currentArtistId
        ? `${context.currentTrackTitle || ""} ${context.currentArtistId || ""}`.trim()
        : context.currentTrackId;

    if (queryKey) {
      const similar = await this.repo.getSimilarTracks(queryKey, limit * 2);
      const ranked = this.ranking.rankTracks(similar, context);
      const validated = globalRecommendationValidator.validateRecommendationSet(ranked);
      return validated.slice(0, limit);
    }
    return [];
  }

  async generateRadio(context: RecommendationContext, limit: number): Promise<Track[]> {
    return this.generate(context, limit);
  }
}
