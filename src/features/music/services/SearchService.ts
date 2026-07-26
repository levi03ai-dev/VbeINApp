import { MusicRepository } from "../domain/repositories/MusicRepository";
import { Track } from "../domain/entities/Track";
import { Album } from "../domain/entities/Album";
import { Artist } from "../domain/entities/Artist";
import { Logger } from "../../../core/logger/logger";

export class SearchService {
  constructor(private musicRepository: MusicRepository) {}

  async searchTracks(query: string, page: number = 1): Promise<Track[]> {
    if (!query || !query.trim()) return [];
    try {
      return await this.musicRepository.searchTracks(query.trim(), page);
    } catch (e) {
      Logger.warn("Search tracks failed:", e);
      return [];
    }
  }

  async searchAlbums(query: string): Promise<Album[]> {
    if (!query || !query.trim()) return [];
    try {
      return await this.musicRepository.searchAlbums(query.trim());
    } catch (e) {
      Logger.warn("Search albums failed:", e);
      return [];
    }
  }

  async searchArtists(query: string): Promise<Artist[]> {
    if (!query || !query.trim()) return [];
    try {
      return await this.musicRepository.searchArtists(query.trim());
    } catch (e) {
      Logger.warn("Search artists failed:", e);
      return [];
    }
  }
}
