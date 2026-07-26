import { Track } from "../entities/Track";
import { Album } from "../entities/Album";
import { Artist } from "../entities/Artist";

export interface MusicRepository {
  searchTracks(query: string, page?: number): Promise<Track[]>;
  searchAlbums(query: string): Promise<Album[]>;
  searchArtists(query: string): Promise<Artist[]>;
  getTrack(trackId: string): Promise<Track | null>;
  getAlbum(albumId: string): Promise<Album | null>;
  getArtist(artistId: string): Promise<Artist | null>;
  getRecommendations(trackId: string): Promise<Track[]>;
  getTrending(region?: string): Promise<Track[]>;
  resolveStream(trackId: string): Promise<string | null>;
}
