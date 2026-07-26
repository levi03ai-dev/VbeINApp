import { SecurityMiddleware } from "../../middleware/security.middleware";
import { globalStreamingService } from "../../services/streaming/streaming.service";

export class StreamRouter {
  static async handle(url: URL): Promise<Response | null> {
    if (url.pathname.startsWith("/api/stream/resolve")) {
      const q = SecurityMiddleware.sanitizeQuery(url.searchParams.get("q"));
      const id = SecurityMiddleware.sanitizeQuery(url.searchParams.get("id"));

      try {
        let streamUrl = await globalStreamingService.resolveStream(q, id);
        if (streamUrl && streamUrl.startsWith("http") && !streamUrl.includes("/api/proxy/audio")) {
          const ext =
            streamUrl.includes(".mp4") || streamUrl.includes(".m4a") || streamUrl.includes(".aac")
              ? "mp4"
              : "mp3";
          streamUrl = `/api/proxy/audio.${ext}?url=${encodeURIComponent(streamUrl)}`;
        }
        return SecurityMiddleware.jsonResponse({ audioUrl: streamUrl || "" });
      } catch (e) {
        return SecurityMiddleware.jsonResponse({ audioUrl: "" }, 500);
      }
    }

    if (url.pathname.startsWith("/api/piped/stream")) {
      const id = SecurityMiddleware.sanitizeQuery(url.searchParams.get("id"));
      try {
        const streamUrl = await globalStreamingService.resolvePipedStreamWithFallback(id);
        return SecurityMiddleware.jsonResponse({ audioUrl: streamUrl || "" });
      } catch (e) {
        return SecurityMiddleware.jsonResponse({ audioUrl: "" }, 500);
      }
    }

    if (url.pathname.startsWith("/api/invidious/stream")) {
      const id = SecurityMiddleware.sanitizeQuery(url.searchParams.get("id"));
      try {
        const streamUrl = await globalStreamingService.resolveInvidiousStreamWithFallback(id);
        return SecurityMiddleware.jsonResponse({ audioUrl: streamUrl || "" });
      } catch (e) {
        return SecurityMiddleware.jsonResponse({ audioUrl: "" }, 500);
      }
    }

    return null;
  }
}
