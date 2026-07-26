/* eslint-disable @typescript-eslint/no-explicit-any */
export interface TrackDto {
  id: string;
  title: string;
  subtitle?: string;
  header_desc?: string;
  type?: string;
  image?: string | any[];
  language?: string;
  year?: string;
  play_count?: string;
  explicit_content?: string;
  list?: string;
  list_type?: string;
  list_count?: string;
  song?: string;
  album?: string;
  url?: string;
  primary_artists?: string;
  singers?: string;
  duration?: string;
  download_url?: any[];
  has_lyrics?: string;
}

export interface AlbumDto {
  id: string;
  title: string;
  image?: string | any[];
  url?: string;
  type?: string;
  description?: string;
  year?: string;
  language?: string;
  play_count?: string;
  explicit_content?: string;
  song_pids?: string;
  primary_artists?: any[] | string;
}

export interface ArtistDto {
  id: string;
  name: string;
  title?: string;
  image?: string | any[];
  url?: string;
  type?: string;
  description?: string;
  role?: string;
  albums?: any[];
  songs?: any[];
}
