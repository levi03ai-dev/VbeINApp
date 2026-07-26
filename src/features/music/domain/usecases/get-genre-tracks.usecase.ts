import type { MusicRepositoryInterface } from "../repositories/music.repository.interface";
import type { Track } from "../../types/music.types";

export class GetGenreTracksUseCase {
  constructor(private repository: MusicRepositoryInterface) {}

  async execute(genre: string, limit = 15): Promise<Track[]> {
    return this.repository.getTracksByGenre(genre, limit);
  }
}
