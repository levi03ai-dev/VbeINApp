import { AudioProxyService } from "../../services/proxy/audio-proxy.service";
import { ImageProxyService } from "../../services/proxy/image-proxy.service";

export class ProxyRouter {
  static async handle(url: URL, request: Request): Promise<Response | null> {
    if (url.pathname.startsWith("/api/proxy/audio")) {
      if (request.method === "OPTIONS") {
        return new Response(null, {
          status: 204,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, HEAD, OPTIONS",
            "Access-Control-Allow-Headers": "*",
          },
        });
      }
      const targetUrl = url.searchParams.get("url") || "";
      return AudioProxyService.handleAudioProxy(targetUrl, request.headers);
    }

    if (url.pathname.startsWith("/api/proxy/image")) {
      if (request.method === "OPTIONS") {
        return new Response(null, {
          status: 204,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, HEAD, OPTIONS",
            "Access-Control-Allow-Headers": "*",
          },
        });
      }
      const targetUrl = url.searchParams.get("url") || "";
      return ImageProxyService.handleImageProxy(targetUrl);
    }

    return null;
  }
}
