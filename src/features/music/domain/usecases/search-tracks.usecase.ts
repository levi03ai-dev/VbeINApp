import type { MusicRepositoryInterface } from "../repositories/music.repository.interface";
import type { Track } from "../../types/music.types";

export class SearchTracksUseCase {
  constructor(private repository: MusicRepositoryInterface) {}

  async execute(query: string, limit = 20): Promise<Track[]> {
    return this.repository.searchTracks(query, limit);
  }
}
