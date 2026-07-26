import { MusicRepository } from "../../domain/repositories/MusicRepository";
import { Track } from "../../domain/entities/Track";
import { Album } from "../../domain/entities/Album";
import { Artist } from "../../domain/entities/Artist";
import { ProviderManager } from "../providers/ProviderManager";

export class MusicRepositoryImpl implements MusicRepository {
  constructor(private providerManager: ProviderManager) {}

  async searchTracks(query: string, page?: number): Promise<Track[]> {
    return this.providerManager.searchTracks(query, page);
  }

  async searchAlbums(query: string): Promise<Album[]> {
    return this.providerManager
      .executeWithFallback(
        "searchAlbums",
        (p) => p.searchAlbums(query),
        (res) => res && res.length > 0,
      )
      .catch(() => []);
  }

  async searchArtists(query: string): Promise<Artist[]> {
    return this.providerManager
      .executeWithFallback(
        "searchArtists",
        (p) => p.searchArtists(query),
        (res) => res && res.length > 0,
      )
      .catch(() => []);
  }

  async getTrack(trackId: string): Promise<Track | null> {
    return this.providerManager
      .executeWithFallback("getTrack", (p) => p.getTrack(trackId))
      .catch(() => null);
  }

  async getAlbum(albumId: string): Promise<Album | null> {
    return this.providerManager
      .executeWithFallback("getAlbum", (p) => p.getAlbum(albumId))
      .catch(() => null);
  }

  async getArtist(artistId: string): Promise<Artist | null> {
    return this.providerManager
      .executeWithFallback("getArtist", (p) => p.getArtist(artistId))
      .catch(() => null);
  }

  async getRecommendations(trackId: string): Promise<Track[]> {
    return this.providerManager
      .executeWithFallback(
        "getRecommendations",
        (p) => p.getRecommendations(trackId),
        (res) => res && res.length > 0,
      )
      .catch(() => []);
  }

  async getTrending(region?: string): Promise<Track[]> {
    return this.providerManager
      .executeWithFallback(
        "getTrending",
        (p) => p.getTrending(region),
        (res) => res && res.length > 0,
      )
      .catch(() => []);
  }

  async resolveStream(trackId: string): Promise<string | null> {
    return this.providerManager.resolveStream(trackId);
  }
}
