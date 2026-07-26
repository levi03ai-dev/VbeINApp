import type { RecommendationRepository } from "../domain/repositories/RecommendationRepository";

export class SimilarArtistEngine {
  async getSimilarArtists(artistName: string): Promise<string[]> {
    return [artistName + " Radio"];
  }
}
