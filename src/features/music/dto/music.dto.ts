export interface AudiusTrackDto {
  id: string | number;
  title: string;
  duration?: number;
  user?: {
    name?: string;
  };
  artwork?: {
    "480x480"?: string;
    "150x150"?: string;
  };
}

export interface AudiusPlaylistDto {
  id: string | number;
  playlist_name?: string;
  user?: {
    name?: string;
  };
  artwork?: {
    "480x480"?: string;
    "150x150"?: string;
  };
}

export interface AudiusSearchResponseDto {
  data?: AudiusTrackDto[];
}
