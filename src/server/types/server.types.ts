export interface ServerTrack {
  id: string;
  title: string;
  artist: string;
  album: string;
  coverUrl: string;
  audioUrl: string;
  duration: string;
  provider: "jiosaavn" | "piped" | "invidious" | "audius" | "itunes" | "fallback";
}

export interface StreamResolutionResult {
  audioUrl: string;
}

export interface ProviderStatus {
  name: string;
  isAvailable: boolean;
  status?: "healthy" | "degraded" | "down";
  latencyMs?: number;
}
