import type { MusicProvider } from "../interfaces/music-provider.interface";
import type { ServerTrack, ProviderStatus } from "../../types/server.types";
import { PIPED_INSTANCES } from "../../constants/server.constants";
import { HttpClient } from "../../utils/http-client";
import { ProviderMapper } from "../../mapper/provider.mapper";
import type { PipedSearchResponse, PipedStreamResponse } from "../../dto/provider.dto";
import { ServerLogger } from "../../logger/server.logger";

export class PipedProvider implements MusicProvider {
  name = "piped";

  async search(query: string): Promise<ServerTrack[]> {
    if (!query || !query.trim()) return [];

    const promises = PIPED_INSTANCES.map(async (instance) => {
      const url = `${instance}/search?q=${encodeURIComponent(query)}&filter=music_songs`;
      const data = await HttpClient.get<PipedSearchResponse>(url, { timeoutMs: 1500 });
      if (!data.items || !Array.isArray(data.items) || data.items.length === 0) {
        throw new Error("No items found");
      }
      const tracks = data.items
        .map((item) => ProviderMapper.fromPipedItem(item))
        .filter((t): t is ServerTrack => t !== null);
      if (tracks.length === 0) {
        throw new Error("No valid tracks mapped");
      }
      return tracks;
    });

    try {
      return await Promise.any(promises);
    } catch {
      return [];
    }
  }

  async resolveStream(videoId: string): Promise<string | null> {
    const cleanVid = videoId.replace(/^(piped_|invidious_)/, "");

    const promises = PIPED_INSTANCES.map(async (instance) => {
      const url = `${instance}/streams/${cleanVid}`;
      const data = await HttpClient.get<PipedStreamResponse>(url, { timeoutMs: 1500 });
      if (data.audioStreams && Array.isArray(data.audioStreams) && data.audioStreams.length > 0) {
        const sorted = [...data.audioStreams].sort((a, b) => (b.bitrate || 0) - (a.bitrate || 0));
        const best =
          sorted.find(
            (s) =>
              s.url &&
              (s.mimeType?.includes("audio/webm") ||
                s.mimeType?.includes("mp4") ||
                s.format === "M4A"),
          ) || sorted.find((s) => s.url);
        if (best?.url) {
          let u = best.url;
          if (u.startsWith("http") && !u.includes("/api/proxy/audio")) {
            u = `/api/proxy/audio?url=${encodeURIComponent(u)}`;
          }
          return u;
        }
      }
      throw new Error("No valid stream found");
    });

    try {
      return await Promise.any(promises);
    } catch {
      return null;
    }
  }

  async healthCheck(): Promise<ProviderStatus> {
    const start = Date.now();
    try {
      const res = await this.search("test");
      return {
        name: this.name,
        isAvailable: res.length > 0,
        latencyMs: Date.now() - start,
      };
    } catch {
      return {
        name: this.name,
        isAvailable: false,
        latencyMs: Date.now() - start,
      };
    }
  }
}
