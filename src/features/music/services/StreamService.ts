import { MusicRepository } from "../domain/repositories/MusicRepository";
import { Logger } from "../../../core/logger/logger";
import { StreamNotFoundError } from "../../../core/errors/app-error";

export class StreamService {
  constructor(private musicRepository: MusicRepository) {}

  async resolveStream(trackId: string, trackTitle?: string, trackArtist?: string): Promise<string> {
    try {
      const streamUrl = await this.musicRepository.resolveStream(trackId);
      if (streamUrl) return streamUrl;

      // Fallback query resolution if not found by ID
      if (trackTitle) {
        const query = `${trackTitle} ${trackArtist || ""}`.trim();
        const searchResults = await this.musicRepository.searchTracks(query, 1);
        for (const res of searchResults) {
          if (res.id !== trackId) {
            const fallbackStreamUrl = await this.musicRepository.resolveStream(res.id);
            if (fallbackStreamUrl) return fallbackStreamUrl;
          }
        }
      }

      throw new StreamNotFoundError(trackId);
    } catch (e) {
      Logger.error(`Stream resolution failed for track: ${trackId}`, e);
      throw e;
    }
  }
}
