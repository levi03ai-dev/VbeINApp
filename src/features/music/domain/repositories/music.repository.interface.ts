import type { Track, Album, Playlist } from "../../types/music.types";

export interface MusicRepositoryInterface {
  searchTracks(query: string, limit?: number): Promise<Track[]>;
  getPopularTracks(limit?: number): Promise<Track[]>;
  getTracksByGenre(genre: string, limit?: number): Promise<Track[]>;
  getFeaturedAlbums(limit?: number): Promise<Album[]>;
  getCuratedPlaylists(limit?: number): Promise<Playlist[]>;
}
