import type { Track } from "@/lib/music-data";
import { normalizeSongInfo } from "@/lib/music-data";
import type { RecommendationContext } from "../domain/models/RecommendationContext";
import { SimilarityService } from "./SimilarityService";

export interface RankingWeights {
  artistSimilarity: number;
  genreSimilarity: number;
  moodSimilarity: number;
  userBehavior: number;
  audioSimilarity: number;
  popularity: number;
  trending: number;
  contextMatch: number;
  freshness: number;
  providerConfidence: number;
}

export const DEFAULT_RANKING_WEIGHTS: RankingWeights = {
  artistSimilarity: 0.20,
  genreSimilarity: 0.15,
  moodSimilarity: 0.15,
  userBehavior: 0.20,
  audioSimilarity: 0.10,
  popularity: 0.05,
  trending: 0.05,
  contextMatch: 0.05,
  freshness: 0.03,
  providerConfidence: 0.02,
};

export class RankingService {
  constructor(private similarityService: SimilarityService) {}

  /**
   * Ranks candidates using a customizable weighted algorithm, optimizing for relevance and diversity.
   */
  public rankCandidates(
    candidates: Track[],
    context: RecommendationContext,
    customWeights?: Partial<RankingWeights>
  ): Track[] {
    const weights = { ...DEFAULT_RANKING_WEIGHTS, ...customWeights };

    // 1. Setup filters and user history
    const historySet = new Set<string>();
    const playedSet = new Set<string>();
    const skippedSet = new Set<string>();

    if (context.recentTrackIds) {
      context.recentTrackIds.forEach((id) => historySet.add(id.toLowerCase()));
    }
    if (context.playedTrackIds) {
      context.playedTrackIds.forEach((id) => {
        historySet.add(id.toLowerCase());
        playedSet.add(id.toLowerCase());
      });
    }
    if (context.skippedTrackIds) {
      context.skippedTrackIds.forEach((id) => skippedSet.add(id.toLowerCase()));
    }

    const scoredTracks = candidates.map((track) => {
      const trackId = (track.id || "").toLowerCase();
      const info = normalizeSongInfo(track.title, track.artist);
      const signature = `${info.cleanTitle.toLowerCase()}||${info.cleanArtist.toLowerCase()}`;

      // Calculate separate similarity dimensions
      const artistSim = this.similarityService.calculateArtistSimilarity(track, context);
      const genreSim = this.similarityService.calculateGenreSimilarity(track, context);
      const moodSim = this.similarityService.calculateMoodSimilarity(track, context);
      const userBehaviorSim = this.similarityService.calculateSessionSimilarity(track, context);
      const audioSim = this.similarityService.calculateAudioFeatureSimilarity(track, context);
      const popularity = this.similarityService.getAudioFeatures(track).popularity;

      // Inferred/Calculated factors
      const isOffline = trackId.startsWith("lib-") || trackId.startsWith("local-");
      const isTrending = !isOffline ? 0.8 : 0.2; // Higher trending score for stream providers
      
      // Context Match: time of day alignment with tempo
      const features = this.similarityService.getAudioFeatures(track);
      let contextMatch = 0.5;
      if (context.timeOfDay === "morning" && features.tempo > 120) contextMatch = 0.9;
      if (context.timeOfDay === "night" && features.tempo < 100) contextMatch = 0.9;

      // Freshness: mock dynamic release freshness
      const freshness = features.releaseEra >= 2020 ? 0.9 : (features.releaseEra >= 2010 ? 0.6 : 0.3);
      
      // Provider Confidence
      const providerConfidence = track.audioUrl ? 0.95 : 0.6;

      // Calculate weighted score
      let score =
        artistSim * weights.artistSimilarity +
        genreSim * weights.genreSimilarity +
        moodSim * weights.moodSimilarity +
        userBehaviorSim * weights.userBehavior +
        audioSim * weights.audioSimilarity +
        popularity * weights.popularity +
        isTrending * weights.trending +
        contextMatch * weights.contextMatch +
        freshness * weights.freshness +
        providerConfidence * weights.providerConfidence;

      // Apply negative multipliers or penances for user history to avoid repetition
      if (context.currentTrackId && (trackId === context.currentTrackId.toLowerCase() || signature === `${(context.currentTrackTitle || "").toLowerCase()}||${(context.currentArtistId || "").toLowerCase()}`)) {
        score -= 5.0; // Avoid playing current song again immediately
      }

      if (skippedSet.has(trackId)) {
        score -= 2.0; // Heavy penalty for skipped songs
      }

      if (playedSet.has(trackId)) {
        score -= 0.5; // Moderate penalty for already played songs in this session
      } else if (historySet.has(trackId)) {
        score -= 0.25; // Gentle penalty for generally historical songs to promote discovery
      }

      // Small jitter to prevent absolute identical layouts, introducing controlled discovery
      const jitter = Math.random() * 0.04;
      score += jitter;

      return { track, score };
    });

    // 2. Sort by highest score first, removing tracks that are highly penalized
    const sorted = scoredTracks
      .filter((s) => s.score > -1.0)
      .sort((a, b) => b.score - a.score);

    // 3. Apply Diversity Optimizations
    const diverseResults: Track[] = [];
    const seenArtists = new Map<string, number>();
    const seenAlbums = new Map<string, number>();
    const seenSignatures = new Set<string>();

    for (const item of sorted) {
      const track = item.track;
      const info = normalizeSongInfo(track.title, track.artist);
      const signature = `${info.cleanTitle.toLowerCase()}||${info.cleanArtist.toLowerCase()}`;

      // Skip exact duplicates
      if (seenSignatures.has(signature) || seenSignatures.has(track.id.toLowerCase())) {
        continue;
      }

      const artistKey = track.artist.toLowerCase().trim();
      const albumKey = (track.album || "").toLowerCase().trim();

      const artistCount = seenArtists.get(artistKey) || 0;
      const albumCount = seenAlbums.get(albumKey) || 0;

      // Diversity controls:
      // - Max 3 songs from the same artist in recommendations to ensure discovery
      // - Max 2 songs from the same album
      if (artistCount < 3 && (albumKey === "" || albumCount < 2)) {
        diverseResults.push(track);
        seenSignatures.add(signature);
        seenSignatures.add(track.id.toLowerCase());
        seenArtists.set(artistKey, artistCount + 1);
        if (albumKey !== "") {
          seenAlbums.set(albumKey, albumCount + 1);
        }
      }
    }

    // Fallback: If diversity pass made it too short, append some original results back
    if (diverseResults.length < Math.min(10, sorted.length)) {
      for (const item of sorted) {
        const track = item.track;
        if (!diverseResults.some((t) => t.id === track.id)) {
          diverseResults.push(track);
        }
      }
    }

    return diverseResults;
  }
}
