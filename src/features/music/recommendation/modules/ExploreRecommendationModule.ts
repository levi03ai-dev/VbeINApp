import type { RecommendationRepository } from "../domain/repositories/RecommendationRepository";

export class ExploreRecommendationModule {
  constructor(private repo: RecommendationRepository) {}

  async getMoodPlaylists(mood: string) {
    return this.repo.getMoodTracks(mood);
  }
}
