import type { ServerTrack, ProviderStatus } from "../../types/server.types";

export interface MusicProvider {
  name: string;
  search(query: string): Promise<ServerTrack[]>;
  resolveStream(videoId: string): Promise<string | null>;
  healthCheck(): Promise<ProviderStatus>;
}
