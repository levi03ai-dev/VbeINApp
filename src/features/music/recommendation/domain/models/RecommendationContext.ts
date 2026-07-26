export interface RecommendationContext {
  userId?: string;
  currentTrackId?: string;
  currentTrackTitle?: string;
  currentArtistId?: string;
  currentGenre?: string;
  currentMood?: string;
  currentLanguage?: string;
  recentTrackIds?: string[];
  playedTrackIds?: string[];
  skippedTrackIds?: string[];
  timeOfDay?: "morning" | "afternoon" | "evening" | "night";
  dayOfWeek?: number;
}

export interface RecommendationScore {
  itemId: string;
  score: number;
  factors: {
    artistSimilarity: number;
    genreSimilarity: number;
    moodSimilarity: number;
    popularity: number;
    freshness: number;
    diversity: number;
  };
}
