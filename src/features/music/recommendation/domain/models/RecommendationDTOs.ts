import type { Track } from "@/lib/music-data";
import type { Album } from "@/lib/music-data";

export interface TopPicksDTO {
  tracks: Track[];
  albums: Album[];
}

export interface BrowseCollectionsDTO {
  id: string;
  title: string;
  description: string;
  tracks: Track[];
}
