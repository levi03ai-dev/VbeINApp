import type { RecommendationContext } from "../domain/models/RecommendationContext";
import { normalizeSongInfo, type Track } from "@/lib/music-data";

const DEVOTIONAL_TERMS = [
  "bhajan",
  "devotional", "mantra",
  "aarti",
  "kirtan",
  "sufi",
  "gurbani",
  "chalisa",
  "stotram",
  "shloka",
  "religious",
  "sloka",
  "bhakti",
  "puja",
  "pooja",
  "spiritual",
  "krishna",
  "ram",
  "shiva",
  "hanuman",
  "ganesh",
  "sai baba",
  "allah",
  "qawwali",
  "jesus",
  "gospel",
];

export class RankingEngine {
  private isDevotional(track: Track): boolean {
    const text = `${track.title} ${track.artist} ${track.album || ""}`.toLowerCase();
    return DEVOTIONAL_TERMS.some((term) => text.includes(term));
  }

  private isEnglishPopOrWestern(context: RecommendationContext, track?: Track): boolean {
    const text = `${context.currentTrackTitle || ""} ${context.currentArtistId || ""} ${context.currentGenre || ""} ${context.currentMood || ""} ${track ? `${track.title} ${track.artist}` : ""}`.toLowerCase();
    const westernKeys = [
      "pop",
      "english",
      "dance",
      "rock",
      "indie",
      "synthpop",
      "r&b",
      "hip hop",
      "hiphop",
      "taylor",
      "swift",
      "dua lipa",
      "ed sheeran",
      "billie",
      "the weeknd",
      "drake",
      "bieber",
      "harry styles",
      "sabrina",
      "chappell",
      "olivia",
      "bruno mars",
      "miley",
      "katy perry",
      "coldplay",
      "maroon 5",
      "rihanna",
      "beyonce",
      "ariana",
    ];
    return westernKeys.some((k) => text.includes(k));
  }

  rankTracks(tracks: Track[], context: RecommendationContext): Track[] {
    const historySet = new Set<string>();
    if (context.recentTrackIds) {
      context.recentTrackIds.forEach((id) => historySet.add(id.toLowerCase()));
    }
    if (context.playedTrackIds) {
      context.playedTrackIds.forEach((id) => historySet.add(id.toLowerCase()));
    }

    const currentIsDevotional =
      context.currentTrackTitle &&
      DEVOTIONAL_TERMS.some((term) => context.currentTrackTitle!.toLowerCase().includes(term));

    const isCurrentPop = !currentIsDevotional && this.isEnglishPopOrWestern(context);

    const scored = tracks.map((track) => {
      let score = 0.5;

      const trackDevotional = this.isDevotional(track);
      const trackSig = normalizeSongInfo(track.title, track.artist).key.toLowerCase();
      const trackId = (track.id || "").toLowerCase();

      // 1. User History Filter: Heavily penalize tracks already played by the user to ensure new unplayed songs
      if (historySet.has(trackId) || historySet.has(trackSig)) {
        score -= 100;
      }

      if (context.currentTrackId && (trackId === context.currentTrackId.toLowerCase() || trackSig === (context.currentTrackTitle || "").toLowerCase())) {
        score -= 200;
      }

      // 2. Devotional/Religious Filter: If current track is English Pop or secular, penalize religious tracks to avoid abrupt mood shifts
      if (isCurrentPop && trackDevotional) {
        score -= 150;
      }

      // 3. Artist & Genre Matching
      if (
        context.currentArtistId &&
        track.artist.toLowerCase().includes(context.currentArtistId.toLowerCase())
      ) {
        score += 0.4;
      }

      if (
        context.currentGenre &&
        (track.artist.toLowerCase().includes(context.currentGenre.toLowerCase()) ||
          track.title.toLowerCase().includes(context.currentGenre.toLowerCase()))
      ) {
        score += 0.25;
      }

      // 4. Language Alignment
      if (context.currentLanguage && track.language) {
        if (track.language.toLowerCase() === context.currentLanguage.toLowerCase()) {
          score += 0.3;
        } else {
          score -= 0.2;
        }
      }

      // 5. Small diversity jitter
      score += Math.random() * 0.05;

      return { track, score };
    });

    // Sort by highest score, filtering out invalid negative scores
    return scored
      .filter((s) => s.score > -50)
      .sort((a, b) => b.score - a.score)
      .map((s) => s.track);
  }
}
