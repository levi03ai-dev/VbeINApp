export interface JioSaavnDownloadUrl {
  quality?: string;
  link?: string;
  url?: string;
}

export interface JioSaavnSongItem {
  id?: string | number;
  title?: string;
  song?: string;
  subtitle?: string;
  primary_artists?: string;
  image?: string;
  media_url?: string;
  album?: string;
  download_url?: JioSaavnDownloadUrl[] | string;
  more_info?: {
    music?: string;
    singers?: string;
    encrypted_media_url?: string;
    album?: string;
    duration?: string | number;
    "320kbps"?: string | boolean;
    has_320?: string | boolean;
  };
}

export interface JioSaavnSearchResponse {
  results?: { id: string }[];
}

export interface JioSaavnDetailsResponse {
  songs?: JioSaavnSongItem[];
  [key: string]: unknown;
}

export interface PipedSearchItem {
  url?: string;
  title?: string;
  uploaderName?: string;
  thumbnail?: string;
  duration?: number;
}

export interface PipedSearchResponse {
  items?: PipedSearchItem[];
}

export interface PipedStreamAudio {
  mimeType?: string;
  format?: string;
  url?: string;
  bitrate?: number;
  quality?: string;
}

export interface PipedStreamResponse {
  audioStreams?: PipedStreamAudio[];
}

export interface InvidiousSearchItem {
  videoId?: string;
  title?: string;
  author?: string;
  lengthSeconds?: number;
  videoThumbnails?: { url: string }[];
}

export interface InvidiousAdaptiveFormat {
  type?: string;
  url?: string;
  bitrate?: string | number;
  encoding?: string;
}

export interface InvidiousVideoResponse {
  adaptiveFormats?: InvidiousAdaptiveFormat[];
}

export interface AudiusTrackItem {
  id: string;
  title?: string;
  duration?: number;
  user?: {
    name?: string;
  };
  artwork?: {
    "1000x1000"?: string;
    "480x480"?: string;
    "150x150"?: string;
  };
}

export interface AudiusSearchResponse {
  data?: AudiusTrackItem[];
}

export interface ITunesTrackItem {
  trackId?: number;
  trackName?: string;
  artistName?: string;
  collectionName?: string;
  artworkUrl100?: string;
  previewUrl?: string;
  trackTimeMillis?: number;
}

export interface ITunesSearchResponse {
  results?: ITunesTrackItem[];
}
