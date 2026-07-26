import { globalProviderManager, ProviderManager } from "../provider-selection/provider.manager";
import { ServerLogger } from "../../logger/server.logger";
import { FallbackAudioService } from "../fallback/fallback-audio.service";
import { globalServerCache } from "../cache/server-cache.service";

export class StreamingService {
  constructor(private providerManager: ProviderManager = globalProviderManager) {}

  async resolveStream(query: string, videoId?: string): Promise<string> {
    const cacheKey = `stream_resolve_${videoId || ""}_${query || ""}`;
    const cached = globalServerCache.get<string>(cacheKey);
    if (cached) {
      ServerLogger.debug(`StreamingService: Cache hit for key: ${cacheKey}`);
      return cached;
    }

    try {
      const stream = await this.providerManager.resolveStreamWithFallback(query, videoId);
      if (stream) {
        // Cache resolved streams for 2 hours (7200000 ms) to make subsequent loads instant
        globalServerCache.set(cacheKey, stream, 7200000);
        return stream;
      }
      return FallbackAudioService.getFallbackUrl(query || videoId || "fallback");
    } catch (err) {
      ServerLogger.warn("Multi-provider stream resolution fallback engaged:", err);
      return FallbackAudioService.getFallbackUrl(query || videoId || "fallback");
    }
  }

  async resolvePipedStreamWithFallback(videoId: string): Promise<string | null> {
    const cacheKey = `piped_stream_${videoId}`;
    const cached = globalServerCache.get<string>(cacheKey);
    if (cached) return cached;

    const piped = this.providerManager.getProvider("piped");
    const invidious = this.providerManager.getProvider("invidious");
    const audius = this.providerManager.getProvider("audius");

    if (piped) {
      try {
        const streamUrl = await piped.resolveStream(videoId);
        if (streamUrl) {
          globalServerCache.set(cacheKey, streamUrl, 7200000);
          return streamUrl;
        }
      } catch {
        /* ignore */
      }
    }

    if (invidious) {
      try {
        const streamUrl = await invidious.resolveStream(videoId);
        if (streamUrl) {
          globalServerCache.set(cacheKey, streamUrl, 7200000);
          return streamUrl;
        }
      } catch {
        /* ignore */
      }
    }

    if (audius) {
      try {
        const streamUrl = await audius.resolveStream(videoId);
        if (streamUrl) {
          globalServerCache.set(cacheKey, streamUrl, 7200000);
          return streamUrl;
        }
      } catch {
        /* ignore */
      }
    }

    return null;
  }

  async resolveInvidiousStreamWithFallback(videoId: string): Promise<string | null> {
    const cacheKey = `invidious_stream_${videoId}`;
    const cached = globalServerCache.get<string>(cacheKey);
    if (cached) return cached;

    const invidious = this.providerManager.getProvider("invidious");
    const piped = this.providerManager.getProvider("piped");
    const audius = this.providerManager.getProvider("audius");

    if (invidious) {
      try {
        const streamUrl = await invidious.resolveStream(videoId);
        if (streamUrl) {
          globalServerCache.set(cacheKey, streamUrl, 7200000);
          return streamUrl;
        }
      } catch {
        /* ignore */
      }
    }

    if (piped) {
      try {
        const streamUrl = await piped.resolveStream(videoId);
        if (streamUrl) {
          globalServerCache.set(cacheKey, streamUrl, 7200000);
          return streamUrl;
        }
      } catch {
        /* ignore */
      }
    }

    if (audius) {
      try {
        const streamUrl = await audius.resolveStream(videoId);
        if (streamUrl) {
          globalServerCache.set(cacheKey, streamUrl, 7200000);
          return streamUrl;
        }
      } catch {
        /* ignore */
      }
    }

    return null;
  }
}

export const globalStreamingService = new StreamingService();
