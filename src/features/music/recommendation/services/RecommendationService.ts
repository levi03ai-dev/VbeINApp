import type { RecommendationContext } from "../domain/models/RecommendationContext";
import type { Track } from "@/lib/music-data";
import { RecommendationEngine } from "../engines/RecommendationEngine";
import { NextUpQueueGenerator } from "../engines/NextUpQueueGenerator";
import { CandidateGenerationService } from "./CandidateGenerationService";
import { RankingService } from "./RankingService";
import { globalRecommendationValidator } from "../validation/RecommendationValidator";
import { Logger } from "@/core/logger/logger";

export class RecommendationService {
  constructor(
    private engine: RecommendationEngine,
    private queueGenerator: NextUpQueueGenerator,
    private candidateGen?: CandidateGenerationService,
    private rankingService?: RankingService,
  ) {}

  async getHomeRecommendations(context: RecommendationContext): Promise<Track[]> {
    try {
      if (this.candidateGen && this.rankingService) {
        // Run the production-grade, multi-strategy candidate generator
        const candidates = await this.candidateGen.generateCandidates(context, 150);
        
        // Rank candidates using the customizable weighted algorithm
        const ranked = this.rankingService.rankCandidates(candidates, context);
        
        // Ensure recommendations meet safety, validation, and layout rules
        return globalRecommendationValidator.validateRecommendationSet(ranked);
      }
    } catch (err) {
      Logger.error("RecommendationService: getHomeRecommendations failed, falling back", err);
    }

    // Dynamic fallback to the primary RecommendationEngine
    return this.engine.getHomePicks(context);
  }

  async getNextQueue(context: RecommendationContext, limit: number = 20): Promise<Track[]> {
    try {
      if (this.candidateGen && this.rankingService) {
        const candidates = await this.candidateGen.generateCandidates(context, 100);
        const ranked = this.rankingService.rankCandidates(candidates, context);
        const validated = globalRecommendationValidator.validateRecommendationSet(ranked);
        return validated.slice(0, limit);
      }
    } catch (err) {
      Logger.error("RecommendationService: getNextQueue failed, falling back", err);
    }

    return this.queueGenerator.generate(context, limit);
  }

  async getAutoRadio(context: RecommendationContext, limit: number = 50): Promise<Track[]> {
    try {
      if (this.candidateGen && this.rankingService) {
        // For radio, we want broader candidates and a slightly different set of weights
        const candidates = await this.candidateGen.generateCandidates(context, 150);
        
        // Custom weights for endless radio: higher focus on genre, mood, and audio features for flow consistency
        const radioWeights = {
          artistSimilarity: 0.10,
          genreSimilarity: 0.25,
          moodSimilarity: 0.20,
          audioSimilarity: 0.20,
          userBehavior: 0.10,
          popularity: 0.05,
          trending: 0.05,
          contextMatch: 0.03,
          freshness: 0.015,
          providerConfidence: 0.005,
        };

        const ranked = this.rankingService.rankCandidates(candidates, context, radioWeights);
        const validated = globalRecommendationValidator.validateRecommendationSet(ranked);
        return validated.slice(0, limit);
      }
    } catch (err) {
      Logger.error("RecommendationService: getAutoRadio failed, falling back", err);
    }

    return this.queueGenerator.generateRadio(context, limit);
  }
}

