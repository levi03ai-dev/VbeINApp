import type { Track } from "@/lib/music-data";
import type { RecommendationContext } from "../domain/models/RecommendationContext";

export interface AudioFeatures {
  tempo: number; // BPM: 60 - 180
  energy: number; // 0.0 - 1.0
  danceability: number; // 0.0 - 1.0
  acousticness: number; // 0.0 - 1.0
  instrumentalness: number; // 0.0 - 1.0
  valence: number; // 0.0 - 1.0
  popularity: number; // 0.0 - 1.0
  releaseEra: number; // 1970 - 2020s
}

export class SimilarityService {
  /**
   * Generates deterministic audio features for any track based on its title and artist.
   * This provides a consistent, robust, provider-agnostic representation of music features.
   */
  public getAudioFeatures(track: Track): AudioFeatures {
    const key = `${track.title.toLowerCase()}||${track.artist.toLowerCase()}`;
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash = key.charCodeAt(i) + ((hash << 5) - hash);
    }

    const getVal = (offset: number, min = 0, max = 1) => {
      const v = Math.abs(Math.sin(hash + offset));
      return min + v * (max - min);
    };

    // Extract tempo if present, otherwise calculate deterministically
    let tempo = 110;
    if (track.tempo && !isNaN(parseInt(track.tempo))) {
      tempo = parseInt(track.tempo);
    } else {
      tempo = Math.round(getVal(10, 70, 165));
    }

    // Classify mood terms and override energy/valence appropriately
    const titleLower = track.title.toLowerCase();
    const artistLower = track.artist.toLowerCase();
    const fullText = `${titleLower} ${artistLower}`;

    let energyBias = 0;
    let valenceBias = 0;
    let acousticBias = 0;

    if (
      fullText.includes("sad") ||
      fullText.includes("cry") ||
      fullText.includes("broken") ||
      fullText.includes("emotional") ||
      fullText.includes("slow")
    ) {
      energyBias = -0.3;
      valenceBias = -0.4;
      acousticBias = 0.3;
    } else if (
      fullText.includes("remix") ||
      fullText.includes("party") ||
      fullText.includes("dance") ||
      fullText.includes("club") ||
      fullText.includes("dj") ||
      fullText.includes("lofi") === false && tempo > 125
    ) {
      energyBias = 0.3;
      valenceBias = 0.2;
      acousticBias = -0.4;
    } else if (
      fullText.includes("lofi") ||
      fullText.includes("chill") ||
      fullText.includes("relax") ||
      fullText.includes("calm") ||
      fullText.includes("peaceful") ||
      fullText.includes("meditation") ||
      fullText.includes("sleep")
    ) {
      energyBias = -0.4;
      acousticBias = 0.4;
      valenceBias = -0.1;
    }

    const energy = Math.max(0.1, Math.min(0.99, getVal(20, 0.2, 0.9) + energyBias));
    const danceability = Math.max(0.1, Math.min(0.99, getVal(30, 0.2, 0.9) + (energyBias * 0.5)));
    const acousticness = Math.max(0.01, Math.min(0.99, getVal(40, 0.05, 0.8) + acousticBias));
    const instrumentalness = Math.max(0.0, Math.min(0.95, getVal(50, 0.0, 0.5) + (acousticBias * 0.4)));
    const valence = Math.max(0.1, Math.min(0.99, getVal(60, 0.15, 0.85) + valenceBias));
    const popularity = getVal(70, 0.3, 0.98);

    // Determine release era based on hash or title clues
    let releaseEra = 2020;
    if (fullText.includes("80s") || fullText.includes("198") || fullText.includes("retro")) {
      releaseEra = 1980;
    } else if (fullText.includes("90s") || fullText.includes("199")) {
      releaseEra = 1990;
    } else if (fullText.includes("classic") || fullText.includes("oldies")) {
      releaseEra = 1970;
    } else {
      const dec = Math.floor(getVal(80, 0, 5));
      releaseEra = 1970 + dec * 10;
    }

    return {
      tempo,
      energy,
      danceability,
      acousticness,
      instrumentalness,
      valence,
      popularity,
      releaseEra,
    };
  }

  /**
   * Calculates artist similarity based on token/substring overlap.
   */
  public calculateArtistSimilarity(track: Track, context: RecommendationContext): number {
    if (!context.currentArtistId) return 0.0;
    
    const contextArtist = context.currentArtistId.toLowerCase().trim();
    const trackArtist = track.artist.toLowerCase().trim();

    if (contextArtist === trackArtist) return 1.0;
    if (trackArtist.includes(contextArtist) || contextArtist.includes(trackArtist)) return 0.7;

    // Word token overlap coefficient
    const contextWords = new Set(contextArtist.split(/[\s,&]+/));
    const trackWords = trackArtist.split(/[\s,&]+/);
    let intersection = 0;
    for (const word of trackWords) {
      if (contextWords.has(word) && word.length > 2) intersection++;
    }

    if (intersection > 0) {
      return Math.min(0.5, intersection / Math.max(contextWords.size, trackWords.length));
    }

    return 0.0;
  }

  /**
   * Calculates genre similarity.
   */
  public calculateGenreSimilarity(track: Track, context: RecommendationContext): number {
    if (!context.currentGenre) return 0.0;

    const contextGenre = context.currentGenre.toLowerCase().trim();
    const trackTitle = track.title.toLowerCase();
    const trackArtist = track.artist.toLowerCase();
    const trackAlbum = (track.album || "").toLowerCase();

    // Check if the genre appears in the track metadata
    if (
      trackTitle.includes(contextGenre) ||
      trackArtist.includes(contextGenre) ||
      trackAlbum.includes(contextGenre)
    ) {
      return 1.0;
    }

    // Map common broad genres to title keywords
    const genreKeywords: Record<string, string[]> = {
      pop: ["pop", "dance", "chart", "hits"],
      rock: ["rock", "metal", "punk", "band", "alternative"],
      lofi: ["lofi", "lo-fi", "chill", "study", "relax", "ambient"],
      bollywood: ["bollywood", "arijit", "filmi", "soundtrack", "t-series"],
      punjabi: ["punjabi", "diljit", "sidhu", "ap dhillon"],
      classical: ["classical", "instrumental", "symphony", "piano", "violin"],
    };

    const keywords = genreKeywords[contextGenre] || [contextGenre];
    const textToSearch = `${trackTitle} ${trackArtist} ${trackAlbum}`;
    const matches = keywords.some((kw) => textToSearch.includes(kw));

    return matches ? 0.75 : 0.0;
  }

  /**
   * Calculates album similarity.
   */
  public calculateAlbumSimilarity(track: Track, context: RecommendationContext): number {
    if (!context.currentTrackId || !track.album) return 0.0;
    
    // Exact same track shouldn't get album similarity bonus unless it's a different track on same album
    if (track.id.toLowerCase() === context.currentTrackId.toLowerCase()) return 0.0;

    const trackAlbum = track.album.toLowerCase().trim();
    const textToSearch = `${context.currentTrackTitle || ""}`.toLowerCase();

    if (trackAlbum.length > 2 && textToSearch.includes(trackAlbum)) {
      return 1.0;
    }

    return 0.0;
  }

  /**
   * Calculates mood similarity based on track tags and title/artist keywords.
   */
  public calculateMoodSimilarity(track: Track, context: RecommendationContext): number {
    const mood = context.currentMood || this.getInferredMood(context);
    const text = `${track.title} ${track.artist} ${track.album || ""}`.toLowerCase();

    // Map of moods and keywords
    const moodKeywords: Record<string, string[]> = {
      happy: ["happy", "cheerful", "party", "sunshine", "upbeat", "celebrate"],
      sad: ["sad", "emotional", "cry", "broken", "tears", "pain", "lonely", "alone"],
      romantic: ["love", "romantic", "dil", "pyar", "ishq", "heart", "valentine", "romantic"],
      energetic: ["workout", "gym", "energetic", "heavy", "bass", "trap", "electronic", "power"],
      calm: ["calm", "relax", "chill", "sleep", "meditation", "soothing", "peaceful", "lofi"],
      study: ["study", "focus", "work", "concentration", "smart", "reading"],
    };

    const targetMood = mood.toLowerCase();
    const keywords = moodKeywords[targetMood];
    if (!keywords) return 0.2; // Default baseline overlap

    const matches = keywords.some((kw) => text.includes(kw));
    return matches ? 0.9 : 0.15;
  }

  /**
   * Calculates language alignment.
   */
  public calculateLanguageSimilarity(track: Track, context: RecommendationContext): number {
    if (!context.currentLanguage || !track.language) return 0.5; // Neutral default

    if (track.language.toLowerCase().trim() === context.currentLanguage.toLowerCase().trim()) {
      return 1.0;
    }
    return 0.0;
  }

  /**
   * Calculates era similarity based on decade release.
   */
  public calculateReleaseEraSimilarity(track: Track, context: RecommendationContext): number {
    const trackFeatures = this.getAudioFeatures(track);
    
    // We assume current context era is 2020s unless we infer otherwise
    let contextEra = 2020;
    const currentText = `${context.currentTrackTitle || ""} ${context.currentGenre || ""}`.toLowerCase();
    if (currentText.includes("80s") || currentText.includes("retro")) contextEra = 1980;
    else if (currentText.includes("90s") || currentText.includes("classic")) contextEra = 1990;
    else if (currentText.includes("70s") || currentText.includes("oldies")) contextEra = 1970;

    const diff = Math.abs(trackFeatures.releaseEra - contextEra);
    if (diff === 0) return 1.0;
    if (diff <= 10) return 0.8;
    if (diff <= 20) return 0.5;
    return 0.1;
  }

  /**
   * Calculates popularity similarity.
   */
  public calculatePopularitySimilarity(track: Track, context: RecommendationContext): number {
    const features = this.getAudioFeatures(track);
    // Prefer popular content generally
    return features.popularity;
  }

  /**
   * Calculates similarity across multi-dimensional audio descriptors.
   */
  public calculateAudioFeatureSimilarity(track: Track, context: RecommendationContext): number {
    const features = this.getAudioFeatures(track);

    // Infer target audio features from context
    let targetEnergy = 0.6;
    let targetValence = 0.5;
    let targetDanceability = 0.6;

    const mood = (context.currentMood || this.getInferredMood(context)).toLowerCase();
    if (mood === "energetic" || mood === "workout") {
      targetEnergy = 0.85;
      targetDanceability = 0.8;
      targetValence = 0.7;
    } else if (mood === "calm" || mood === "relax" || mood === "sleep") {
      targetEnergy = 0.25;
      targetDanceability = 0.3;
      targetValence = 0.4;
    } else if (mood === "sad") {
      targetEnergy = 0.3;
      targetValence = 0.2;
      targetDanceability = 0.4;
    }

    // Calculate Euclidean distance across three primary components
    const dEnergy = Math.pow(features.energy - targetEnergy, 2);
    const dValence = Math.pow(features.valence - targetValence, 2);
    const dDance = Math.pow(features.danceability - targetDanceability, 2);

    const distance = Math.sqrt(dEnergy + dValence + dDance);
    // Convert distance to similarity score in range [0, 1]
    return Math.max(0.0, 1.0 - (distance / Math.sqrt(3)));
  }

  /**
   * Calculates session similarity.
   */
  public calculateSessionSimilarity(track: Track, context: RecommendationContext): number {
    // If the track is liked/favorited, or in recently played lists
    const recentSet = new Set(context.recentTrackIds || []);
    const playedSet = new Set(context.playedTrackIds || []);

    if (recentSet.has(track.id)) return 0.8;
    if (playedSet.has(track.id)) return 0.5;
    return 0.0;
  }

  private getInferredMood(context: RecommendationContext): string {
    if (context.timeOfDay === "morning") return "energetic";
    if (context.timeOfDay === "night") return "calm";
    return "happy";
  }
}
