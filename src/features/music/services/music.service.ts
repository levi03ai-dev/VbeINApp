import { MusicRepositoryImpl } from "../repository/music.repository.impl";
import { SearchTracksUseCase } from "../domain/usecases/search-tracks.usecase";
import { GetPopularTracksUseCase } from "../domain/usecases/get-popular-tracks.usecase";
import { GetGenreTracksUseCase } from "../domain/usecases/get-genre-tracks.usecase";
import { DownloadManager } from "../download/download.manager";
import type { Track, Album, Playlist } from "../types/music.types";

const repository = new MusicRepositoryImpl();
const searchTracksUseCase = new SearchTracksUseCase(repository);
const getPopularTracksUseCase = new GetPopularTracksUseCase(repository);
const getGenreTracksUseCase = new GetGenreTracksUseCase(repository);

export class MusicServiceFacade {
  static async searchTracks(query: string, limit = 20): Promise<Track[]> {
    return searchTracksUseCase.execute(query, limit);
  }

  static async getPopularTracks(limit = 20): Promise<Track[]> {
    return getPopularTracksUseCase.execute(limit);
  }

  static async getTracksByGenre(genre: string, limit = 15): Promise<Track[]> {
    return getGenreTracksUseCase.execute(genre, limit);
  }

  static async getFeaturedAlbums(limit = 10): Promise<Album[]> {
    return repository.getFeaturedAlbums(limit);
  }

  static async getCuratedPlaylists(limit = 10): Promise<Playlist[]> {
    return repository.getCuratedPlaylists(limit);
  }

  static async downloadTrackFile(audioUrl: string, filename: string): Promise<boolean> {
    return DownloadManager.downloadTrack(audioUrl, filename);
  }
}
