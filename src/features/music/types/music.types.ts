import type { Track, Album, Playlist } from "@/lib/music-data";

export type { Track, Album, Playlist };

export interface MusicFilterParams {
  query?: string;
  genre?: string;
  limit?: number;
}
