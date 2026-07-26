export const RecommendationConfig = {
  WEIGHTS: {
    ARTIST_SIMILARITY: 0.35,
    GENRE_SIMILARITY: 0.25,
    MOOD_SIMILARITY: 0.15,
    TEMPO_SIMILARITY: 0.1,
    POPULARITY: 0.1,
    DIVERSITY: 0.05,
  },
  CACHE_TTL: {
    HOME: 600,
    EXPLORE: 3600,
    SEARCH: 300,
  },
};
