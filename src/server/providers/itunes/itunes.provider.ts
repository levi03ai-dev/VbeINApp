import type { MusicProvider } from "../interfaces/music-provider.interface";
import type { ServerTrack, ProviderStatus } from "../../types/server.types";
import { HttpClient } from "../../utils/http-client";
import { ProviderMapper } from "../../mapper/provider.mapper";
import type { ITunesSearchResponse } from "../../dto/provider.dto";
import { ServerLogger } from "../../logger/server.logger";

export class ITunesProvider implements MusicProvider {
  name = "itunes";

  async search(query: string): Promise<ServerTrack[]> {
    if (!query || !query.trim()) return [];
    try {
      const url = `https://itunes.apple.com/search?term=${encodeURIComponent(
        query,
      )}&entity=song&limit=20`;
      const data = await HttpClient.get<ITunesSearchResponse>(url, { timeoutMs: 3500 });
      if (!data.results || !Array.isArray(data.results) || data.results.length === 0) return [];

      return data.results
        .map((item) => ProviderMapper.fromITunesItem(item))
        .filter((t): t is ServerTrack => t !== null);
    } catch (err) {
      ServerLogger.debug("iTunes search error:", err);
      return [];
    }
  }

  async resolveStream(idOrQuery: string): Promise<string | null> {
    if (!idOrQuery || !idOrQuery.trim()) return null;
    try {
      const clean = idOrQuery.replace(/^itunes_/, "");
      const url = `https://itunes.apple.com/search?term=${encodeURIComponent(
        clean,
      )}&entity=song&limit=5`;
      const data = await HttpClient.get<ITunesSearchResponse>(url, { timeoutMs: 3500 });
      if (data.results && Array.isArray(data.results) && data.results.length > 0) {
        const top = data.results[0];
        if (top.previewUrl) {
          let audioUrl = top.previewUrl;
          if (audioUrl.startsWith("http") && !audioUrl.includes("/api/proxy/audio")) {
            audioUrl = `/api/proxy/audio.m4a?url=${encodeURIComponent(audioUrl)}`;
          }
          return audioUrl;
        }
      }
    } catch (err) {
      ServerLogger.debug("iTunes resolveStream error:", err);
    }
    return null;
  }

  async healthCheck(): Promise<ProviderStatus> {
    const start = Date.now();
    try {
      const res = await this.search("taylor swift");
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
