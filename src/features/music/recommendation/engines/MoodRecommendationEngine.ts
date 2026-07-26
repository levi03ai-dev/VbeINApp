import type { RecommendationRepository } from "../domain/repositories/RecommendationRepository";

export class MoodRecommendationEngine {
  constructor(private repo: RecommendationRepository) {}

  async getByMood(mood: string) {
    return this.repo.getMoodTracks(mood);
  }
}
