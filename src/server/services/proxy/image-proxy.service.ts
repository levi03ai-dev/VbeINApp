import { DEFAULT_USER_AGENT } from "../../constants/server.constants";
import { ServerLogger } from "../../logger/server.logger";

export class ImageProxyService {
  static async handleImageProxy(targetUrl: string): Promise<Response> {
    if (!targetUrl || !targetUrl.startsWith("http")) {
      return new Response("Invalid URL", { status: 400 });
    }

    try {
      const imgRes = await fetch(targetUrl, {
        headers: {
          "User-Agent": DEFAULT_USER_AGENT,
        },
      });

      if (!imgRes.ok) {
        return new Response("Image fetch failed", { status: imgRes.status });
      }

      const resHeaders = new Headers();
      resHeaders.set("Content-Type", imgRes.headers.get("content-type") || "image/jpeg");
      resHeaders.set("Cache-Control", "public, max-age=86400");
      resHeaders.set("Access-Control-Allow-Origin", "*");

      return new Response(imgRes.body, { status: 200, headers: resHeaders });
    } catch (err) {
      ServerLogger.error("Image proxy error:", err);
      return new Response("Image proxy error", { status: 500 });
    }
  }
}
