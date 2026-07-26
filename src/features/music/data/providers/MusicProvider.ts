import { Track } from "../../domain/entities/Track";
import { Album } from "../../domain/entities/Album";
import { Artist } from "../../domain/entities/Artist";

export interface MusicProvider {
  name: string;
  priority: number;

  healthCheck(): Promise<boolean>;

  searchTracks(query: string, page?: number): Promise<Track[]>;
  searchAlbums(query: string): Promise<Album[]>;
  searchArtists(query: string): Promise<Artist[]>;

  getTrack(trackId: string): Promise<Track | null>;
  getAlbum(albumId: string): Promise<Album | null>;
  getArtist(artistId: string): Promise<Artist | null>;

  getRecommendations(trackId: string): Promise<Track[]>;
  getTrending(region?: string): Promise<Track[]>;

  resolveStream(trackId: string): Promise<string | null>;
  getLyrics(trackId: string): Promise<string | null>;
}
