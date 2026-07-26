import type { RecommendationContext } from "../domain/models/RecommendationContext";
import { RecommendationEngine } from "../engines/RecommendationEngine";

export class HomeRecommendationModule {
  constructor(private engine: RecommendationEngine) {}

  async getTopPicks(context: RecommendationContext) {
    return this.engine.getHomePicks(context);
  }
}
