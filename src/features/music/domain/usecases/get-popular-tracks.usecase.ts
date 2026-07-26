import type { MusicRepositoryInterface } from "../repositories/music.repository.interface";
import type { Track } from "../../types/music.types";

export class GetPopularTracksUseCase {
  constructor(private repository: MusicRepositoryInterface) {}

  async execute(limit = 20): Promise<Track[]> {
    return this.repository.getPopularTracks(limit);
  }
}
