import { DEFAULT_USER_AGENT } from "../../constants/server.constants";
import { ServerLogger } from "../../logger/server.logger";

export class AudioProxyService {
  static async handleAudioProxy(targetUrl: string, clientHeaders: Headers): Promise<Response> {
    if (!targetUrl || !targetUrl.startsWith("http")) {
      return new Response("Invalid URL", { status: 400 });
    }

    const candidateUrls: string[] = [targetUrl];

    if (targetUrl.includes("saavncdn.com") || targetUrl.includes("jiosaavn")) {
      if (targetUrl.includes(".mp4")) {
        const bitrates = ["_320.mp4", "_160.mp4", "_96.mp4"];
        for (const b of bitrates) {
          const alt = targetUrl.replace(/_\d+\.mp4/, b);
          if (!candidateUrls.includes(alt)) candidateUrls.push(alt);
        }
      } else if (targetUrl.includes(".mp3")) {
        const bitrates = ["_320.mp3", "_160.mp3", "_96.mp3"];
        for (const b of bitrates) {
          const alt = targetUrl.replace(/_\d+\.mp3/, b);
          if (!candidateUrls.includes(alt)) candidateUrls.push(alt);
        }
      }
    }

    let audioRes: Response | null = null;
    let successfulUrl = targetUrl;

    const rangeHeader = clientHeaders.get("range") || clientHeaders.get("Range");

    for (const url of candidateUrls) {
      try {
        const reqHeaders = new Headers();
        reqHeaders.set("User-Agent", DEFAULT_USER_AGENT);

        if (url.includes("saavncdn") || url.includes("jiosaavn")) {
          reqHeaders.set("Referer", "https://www.jiosaavn.com/");
          reqHeaders.set("Origin", "https://www.jiosaavn.com");
          reqHeaders.set("Sec-Fetch-Dest", "audio");
          reqHeaders.set("Sec-Fetch-Mode", "cors");
          reqHeaders.set("Sec-Fetch-Site", "cross-site");
        } else if (url.includes("googlevideo.com") || url.includes("youtube.com")) {
          reqHeaders.set("Referer", "https://www.youtube.com/");
          reqHeaders.set("Origin", "https://www.youtube.com");
        }

        if (rangeHeader) {
          reqHeaders.set("Range", rangeHeader);
        }

        const res = await fetch(url, { headers: reqHeaders });
        const fetchedType = (res.headers.get("content-type") || "").toLowerCase();
        const isNonAudio =
          fetchedType.includes("html") ||
          fetchedType.includes("xml") ||
          fetchedType.includes("json") ||
          fetchedType.includes("text/plain");

        if ((res.ok || res.status === 206) && !isNonAudio) {
          audioRes = res;
          successfulUrl = url;
          break;
        }
      } catch (e) {
        ServerLogger.warn(`Audio proxy fetch attempt failed for ${url}:`, e);
      }
    }

    if (!audioRes) {
      return new Response("Audio stream unavailable", { status: 502 });
    }

    try {
      const resHeaders = new Headers();
      const rawType = (audioRes.headers.get("content-type") || "").toLowerCase();
      let contentType = "audio/mpeg";

      if (rawType.includes("webm") || successfulUrl.includes(".webm")) {
        contentType = "audio/webm";
      } else if (
        rawType.includes("mp4") ||
        rawType.includes("m4a") ||
        rawType.includes("aac") ||
        successfulUrl.includes(".mp4") ||
        successfulUrl.includes(".m4a")
      ) {
        contentType = "audio/mp4";
      } else if (rawType.includes("ogg") || successfulUrl.includes(".ogg")) {
        contentType = "audio/ogg";
      } else if (
        rawType.includes("mpeg") ||
        rawType.includes("mp3") ||
        successfulUrl.includes(".mp3")
      ) {
        contentType = "audio/mpeg";
      } else {
        contentType = "audio/mpeg";
      }

      resHeaders.set("Content-Type", contentType);
      resHeaders.set("Accept-Ranges", "bytes");
      resHeaders.set("Access-Control-Allow-Origin", "*");
      resHeaders.set("Access-Control-Allow-Methods", "GET, HEAD, OPTIONS");
      resHeaders.set("Access-Control-Allow-Headers", "*");

      if (audioRes.headers.has("content-length")) {
        resHeaders.set("Content-Length", audioRes.headers.get("content-length")!);
      }
      if (audioRes.headers.has("content-range")) {
        resHeaders.set("Content-Range", audioRes.headers.get("content-range")!);
      }

      return new Response(audioRes.body, {
        status: audioRes.status,
        headers: resHeaders,
      });
    } catch (err) {
      ServerLogger.error("Audio proxy response handling error:", err);
      return new Response("Audio proxy error", { status: 500 });
    }
  }
}
