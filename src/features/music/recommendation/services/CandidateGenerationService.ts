import type { RecommendationRepository } from "../domain/repositories/RecommendationRepository";
import type { RecommendationContext } from "../domain/models/RecommendationContext";
import type { Track } from "@/lib/music-data";
import { normalizeSongInfo } from "@/lib/music-data";
import { Logger } from "@/core/logger/logger";

export class CandidateGenerationService {
  constructor(private repo: RecommendationRepository) {}

  /**
   * Generates a large pool of candidate tracks from multiple independent strategies.
   * Leverages parallel execution to maximize performance.
   */
  async generateCandidates(context: RecommendationContext, targetLimit: number = 200): Promise<Track[]> {
    const strategies: Promise<Track[]>[] = [];

    // 1. Same Track / Similar Tracks (if current track exists)
    if (context.currentTrackId) {
      strategies.push(
        this.repo.getSimilarTracks(context.currentTrackId, 40)
          .catch((err) => {
            Logger.warn("Candidate Gen: getSimilarTracks failed", err);
            return [];
          })
      );
    }

    // 2. Similar Artist / Same Artist Strategy
    if (context.currentArtistId || context.currentTrackTitle) {
      const artistQuery = context.currentArtistId || context.currentTrackTitle || "";
      strategies.push(
        this.repo.getSimilarTracks(artistQuery, 30)
          .catch((err) => {
            Logger.warn("Candidate Gen: Similar Artist failed", err);
            return [];
          })
      );
    }

    // 3. Same Genre / Similar Genres Strategy
    if (context.currentGenre) {
      strategies.push(
        this.repo.getMoodTracks(context.currentGenre, 30)
          .catch((err) => {
            Logger.warn("Candidate Gen: Genre fetch failed", err);
            return [];
          })
      );
    }

    // 4. Mood-Based Strategy
    if (context.currentMood) {
      strategies.push(
        this.repo.getMoodTracks(context.currentMood, 35)
          .catch((err) => {
            Logger.warn("Candidate Gen: Mood fetch failed", err);
            return [];
          })
      );
    } else {
      // Inferred/Default mood for time of day or general variety
      const defaultMood = this.getMoodForTimeOfDay(context.timeOfDay);
      strategies.push(
        this.repo.getMoodTracks(defaultMood, 20)
          .catch(() => [])
      );
    }

    // 5. Trending Tracks / Regional Charts
    strategies.push(
      this.repo.getTrendingTracks(undefined, 50)
        .catch((err) => {
          Logger.warn("Candidate Gen: Trending fetch failed", err);
          return [];
        })
    );

    // 6. New Releases
    strategies.push(
      this.repo.getNewReleases(30)
        .catch((err) => {
          Logger.warn("Candidate Gen: New releases fetch failed", err);
          return [];
        })
    );

    // Execute all candidate strategies in parallel
    const results = await Promise.allSettled(strategies);
    const candidatePool: Track[] = [];
    const seenSignatures = new Set<string>();

    for (const result of results) {
      if (result.status === "fulfilled") {
        for (const track of result.value) {
          if (!track || !track.id) continue;
          
          const info = normalizeSongInfo(track.title, track.artist);
          const signature = `${info.cleanTitle.toLowerCase()}||${info.cleanArtist.toLowerCase()}`;
          
          if (!seenSignatures.has(signature) && !seenSignatures.has(track.id.toLowerCase())) {
            seenSignatures.add(signature);
            seenSignatures.add(track.id.toLowerCase());
            candidatePool.push(track);
          }
        }
      }
    }

    // If candidate pool is too small, fetch additional popular fallback tracks
    if (candidatePool.length < 30) {
      try {
        const fallbacks = await this.repo.getTrendingTracks(undefined, 50);
        for (const track of fallbacks) {
          const info = normalizeSongInfo(track.title, track.artist);
          const signature = `${info.cleanTitle.toLowerCase()}||${info.cleanArtist.toLowerCase()}`;
          if (!seenSignatures.has(signature)) {
            seenSignatures.add(signature);
            candidatePool.push(track);
          }
        }
      } catch (err) {
        Logger.error("Candidate Gen: fallback failed", err);
      }
    }

    // Limit candidate pool size to avoid wasting downstream similarity/ranking resources
    return candidatePool.slice(0, targetLimit);
  }

  private getMoodForTimeOfDay(timeOfDay?: "morning" | "afternoon" | "evening" | "night"): string {
    switch (timeOfDay) {
      case "morning":
        return "Energetic";
      case "afternoon":
        return "Chill";
      case "evening":
        return "Romantic";
      case "night":
        return "Relax";
      default:
        return "Popular";
    }
  }
}
