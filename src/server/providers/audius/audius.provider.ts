import type { MusicProvider } from "../interfaces/music-provider.interface";
import type { ServerTrack, ProviderStatus } from "../../types/server.types";
import { HttpClient } from "../../utils/http-client";
import { ProviderMapper } from "../../mapper/provider.mapper";
import type { AudiusSearchResponse } from "../../dto/provider.dto";
import { ServerLogger } from "../../logger/server.logger";

export class AudiusProvider implements MusicProvider {
  name = "audius";

  async search(query: string): Promise<ServerTrack[]> {
    if (!query || !query.trim()) return [];
    try {
      const url = `https://discoveryprovider.audius.co/v1/tracks/search?query=${encodeURIComponent(
        query,
      )}&app_name=ApexMusic`;
      const data = await HttpClient.get<AudiusSearchResponse>(url, { timeoutMs: 4000 });
      if (!data.data || !Array.isArray(data.data) || data.data.length === 0) return [];

      return data.data
        .map((item) => ProviderMapper.fromAudiusItem(item))
        .filter((t): t is ServerTrack => t !== null);
    } catch (err) {
      ServerLogger.debug("Audius search error:", err);
      return [];
    }
  }

  async resolveStream(id: string): Promise<string | null> {
    const cleanId = id.replace("audius_", "");
    if (!cleanId) return null;
    const streamUrl = `https://discoveryprovider.audius.co/v1/tracks/${cleanId}/stream?app_name=ApexMusic`;
    return `/api/proxy/audio?url=${encodeURIComponent(streamUrl)}`;
  }

  async healthCheck(): Promise<ProviderStatus> {
    const start = Date.now();
    try {
      const res = await this.search("electronic");
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
