import type { Track } from "@/lib/music-data";
import type { RecommendationRepository } from "../domain/repositories/RecommendationRepository";

export class SimilarSongEngine {
  constructor(private repo: RecommendationRepository) {}

  async getSimilar(track: Track): Promise<Track[]> {
    return this.repo.getSimilarTracks(track.id);
  }
}
