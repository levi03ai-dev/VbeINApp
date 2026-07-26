import type { MusicProvider } from "../interfaces/music-provider.interface";
import type { ServerTrack, ProviderStatus } from "../../types/server.types";
import { INVIDIOUS_INSTANCES } from "../../constants/server.constants";
import { HttpClient } from "../../utils/http-client";
import { ProviderMapper } from "../../mapper/provider.mapper";
import type { InvidiousSearchItem, InvidiousVideoResponse } from "../../dto/provider.dto";
import { ServerLogger } from "../../logger/server.logger";

export class InvidiousProvider implements MusicProvider {
  name = "invidious";

  async search(query: string): Promise<ServerTrack[]> {
    if (!query || !query.trim()) return [];

    const promises = INVIDIOUS_INSTANCES.map(async (instance) => {
      const url = `${instance}/api/v1/search?q=${encodeURIComponent(query)}&type=video`;
      const data = await HttpClient.get<InvidiousSearchItem[]>(url, { timeoutMs: 1500 });
      if (!Array.isArray(data) || data.length === 0) {
        throw new Error("No items found");
      }
      const tracks = data
        .map((item) => ProviderMapper.fromInvidiousItem(item))
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

    const promises = INVIDIOUS_INSTANCES.map(async (instance) => {
      const url = `${instance}/api/v1/videos/${cleanVid}`;
      const data = await HttpClient.get<InvidiousVideoResponse>(url, { timeoutMs: 1500 });
      if (data.adaptiveFormats && Array.isArray(data.adaptiveFormats)) {
        const audioFormats = data.adaptiveFormats
          .filter((f) => f.type?.startsWith("audio/") && f.url)
          .sort((a, b) => (Number(b.bitrate) || 0) - (Number(a.bitrate) || 0));
        if (audioFormats.length > 0 && audioFormats[0].url) {
          let u = audioFormats[0].url;
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
