import type { RecommendationRepository } from "../domain/repositories/RecommendationRepository";

export class SearchRecommendationModule {
  constructor(private repo: RecommendationRepository) {}

  async getTrendingSearches() {
    return ["Arijit Singh", "Taylor Swift", "Workout", "Lofi Relax"];
  }
}
