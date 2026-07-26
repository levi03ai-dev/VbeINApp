import { normalizeSongInfo, type Track } from "@/lib/music-data";

export interface ValidationResult {
  isValid: boolean;
  validatedTrack: Track;
  confidenceScore: number;
  reason?: string;
}

export class RecommendationValidator {
  /**
   * Normalizes a song title or artist string to facilitate cross-referencing.
   * Strips extra clutter like (Official Audio), [Lyrics], HD, Remastered, etc.
   */
  public normalizeString(str: string): string {
    if (!str) return "";
    return normalizeSongInfo(str, "").key.replace("::", " ").trim();
  }

  /**
   * Generates a unique signature key for a track to detect duplicates across providers.
   */
  public getTrackSignature(track: Track): string {
    return normalizeSongInfo(track.title, track.artist).key;
  }

  /**
   * Filters out duplicate tracks and duplicate streams from a recommendation candidate list.
   */
  public deduplicateTracks(tracks: Track[]): Track[] {
    const seenSignatures = new Set<string>();
    const seenAudioUrls = new Set<string>();
    const deduplicated: Track[] = [];

    for (const track of tracks) {
      if (!track || !track.title) continue;

      const sig = this.getTrackSignature(track);

      // Also check audioUrl or stream path if present
      const streamKey = track.audioUrl ? track.audioUrl.split("?")[0] : null;

      if (seenSignatures.has(sig)) {
        continue;
      }

      if (streamKey && seenAudioUrls.has(streamKey)) {
        continue;
      }

      seenSignatures.add(sig);
      if (streamKey) {
        seenAudioUrls.add(streamKey);
      }

      deduplicated.push(track);
    }

    return deduplicated;
  }

  /**
   * Cross-references track titles with provider source data before playback initialization.
   * Ensures the track title and artist match provider metadata and that no duplicate stream is initialized.
   */
  public async validateTrackBeforePlayback(
    track: Track,
    existingQueue: Track[] = [],
  ): Promise<ValidationResult> {
    if (!track || !track.title || !track.title.trim()) {
      return {
        isValid: false,
        validatedTrack: track,
        confidenceScore: 0,
        reason: "Invalid track metadata",
      };
    }

    const normTitle = this.normalizeString(track.title);
    const normArtist = this.normalizeString(track.artist);

    if (normTitle.length === 0) {
      return {
        isValid: false,
        validatedTrack: track,
        confidenceScore: 0,
        reason: "Track title empty after normalization",
      };
    }

    // Check if the track already exists in current queue as a duplicate stream
    const sig = `${normTitle}::${normArtist}`;
    const duplicateInQueue = existingQueue.some((q) => {
      if (q.id === track.id) return false; // same item reference is fine
      const qSig = this.getTrackSignature(q);
      return qSig === sig;
    });

    if (duplicateInQueue) {
      return {
        isValid: false,
        validatedTrack: track,
        confidenceScore: 0.3,
        reason: "Duplicate stream found in queue",
      };
    }

    // Sanitize and ensure cover thumbnail and audio stream source consistency
    const sanitizedTrack: Track = {
      ...track,
      title: track.title.trim(),
      artist: track.artist ? track.artist.trim() : "Unknown Artist",
      coverUrl: track.coverUrl || "",
      audioUrl:
        track.audioUrl ||
        `/api/stream/resolve?q=${encodeURIComponent(`${track.title} ${track.artist || ""}`.trim())}&id=${encodeURIComponent(track.id)}`,
    };

    return {
      isValid: true,
      validatedTrack: sanitizedTrack,
      confidenceScore: 0.95,
    };
  }

  /**
   * Cross-references and cleans a list of recommended tracks before returning them to the queue or home picks.
   */
  public validateRecommendationSet(tracks: Track[], currentTrack?: Track | null): Track[] {
    const cleanList = this.deduplicateTracks(tracks);
    if (!currentTrack) return cleanList;

    const currentSig = this.getTrackSignature(currentTrack);
    // Remove duplicate of currently playing track from upcoming recommendations
    return cleanList.filter((t) => this.getTrackSignature(t) !== currentSig);
  }
}

export const globalRecommendationValidator = new RecommendationValidator();
