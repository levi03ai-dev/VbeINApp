export interface Track {
  id: string;
  title: string;
  artist: string;
  album?: string;
  coverUrl?: string;
  duration?: string;
  audioUrl?: string;
  provider?: string;
  language?: string;
  tempo?: string;
}
