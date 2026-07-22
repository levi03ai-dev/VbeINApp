import "./lib/error-capture";
import crypto from "crypto";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m: Record<string, unknown>) => (m.default ?? m) as ServerEntry,
    );
  }
  return serverEntryPromise;
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!isH3SwallowedErrorBody(body)) return response;

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

function isH3SwallowedErrorBody(body: string): boolean {
  try {
    const payload = JSON.parse(body) as { unhandled?: unknown; message?: unknown };
    return payload.unhandled === true && payload.message === "HTTPError";
  } catch {
    return false;
  }
}

function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function decryptSaavnMediaUrl(encryptedUrl: string): string {
  if (!encryptedUrl) return "";
  try {
    const key = Buffer.from("3858f622", "utf-8");
    const decipher = crypto.createDecipheriv("des-ecb", key, null);
    decipher.setAutoPadding(true);
    let decrypted = decipher.update(encryptedUrl, "base64", "utf-8");
    decrypted += decipher.final("utf-8");
    let mediaUrl = decrypted.trim();
    if (mediaUrl.startsWith("http://")) {
      mediaUrl = mediaUrl.replace("http://", "https://");
    }
    if (mediaUrl.includes("_96.mp3")) {
      mediaUrl = mediaUrl.replace("_96.mp3", "_160.mp3");
    } else if (mediaUrl.includes("_96.mp4")) {
      mediaUrl = mediaUrl.replace("_96.mp4", "_160.mp4");
    }
    return mediaUrl;
  } catch {
    return "";
  }
}

async function fetchJioSaavn(query: string) {
  if (!query || !query.trim()) return [];
  try {
    const jioRes = await fetch(
      `https://www.jiosaavn.com/api.php?__call=search.getResults&q=${encodeURIComponent(query)}&p=1&n=25&_format=json&_marker=0&ctx=web6dot0`,
    );
    const jioData = await jioRes.json();
    if (!jioData.results || !Array.isArray(jioData.results) || jioData.results.length === 0) {
      return [];
    }

    const pids = jioData.results
      .map((r: { id: string }) => r.id)
      .filter(Boolean)
      .join(",");

    if (!pids) return [];

    const detailRes = await fetch(
      `https://www.jiosaavn.com/api.php?__call=song.getDetails&pids=${pids}&api_version=4&_format=json&ctx=web6dot0`,
    );
    const detailData = await detailRes.json();

    let songs: Record<string, unknown>[] = [];
    if (Array.isArray(detailData.songs)) {
      songs = detailData.songs;
    } else if (typeof detailData === "object" && detailData !== null) {
      songs = Object.values(detailData).filter(
        (x): x is Record<string, unknown> =>
          typeof x === "object" &&
          x !== null &&
          Boolean((x as Record<string, unknown>).id || (x as Record<string, unknown>).song),
      );
    }

    if (!Array.isArray(songs) || songs.length === 0) return [];

    const clean = (str?: string) =>
      (str || "")
        .replace(/&quot;/g, '"')
        .replace(/&amp;/g, "&")
        .replace(/&#039;/g, "'")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">");

    return (
      songs
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .map((item: any) => {
          const more = item.more_info || {};
          const rawTitle = clean(item.title || item.song || "");
          const rawArtist = clean(
            item.subtitle || item.primary_artists || more.music || more.singers || "Indian Artist",
          );

          // Decrypt encrypted_media_url to get direct Saavn CDN stream URL
          let directCdn = "";
          if (more.encrypted_media_url) {
            directCdn = decryptSaavnMediaUrl(more.encrypted_media_url);
          }
          if (!directCdn && item.media_url) {
            directCdn = item.media_url.replace("http://", "https://");
          }

          let audioUrl = "";
          if (directCdn && directCdn.startsWith("http")) {
            audioUrl = `/api/proxy/audio?url=${encodeURIComponent(directCdn)}`;
          } else {
            audioUrl = `/api/stream/resolve?q=${encodeURIComponent(rawTitle + " " + rawArtist)}`;
          }

          let coverUrl = (item.image || "")
            .replace("150x150", "500x500")
            .replace("50x50", "500x500");
          if (coverUrl.startsWith("http://")) {
            coverUrl = coverUrl.replace("http://", "https://");
          }

          return {
            id: String(item.id || Math.random()),
            title: rawTitle,
            artist: rawArtist,
            album: clean(more.album || item.album || "Single"),
            coverUrl,
            audioUrl,
            duration: more.duration ? formatDuration(Number(more.duration)) : "3:30",
            provider: "jiosaavn",
          };
        })
        .filter((t: { title: string }) => t.title)
    );
  } catch (err) {
    console.error("JioSaavn server fetch error:", err);
    return [];
  }
}

const PIPED_INSTANCES = [
  "https://pipedapi.kavin.rocks",
  "https://pipedapi.palladium.sh",
  "https://pipedapi.adminforge.de",
  "https://pipedapi.mha.fi",
  "https://pipedapi.lunar.icu",
];

const INVIDIOUS_INSTANCES = [
  "https://invidious.nerdvpn.de",
  "https://yewtu.be",
  "https://invidious.no-key.app",
  "https://invidious.lunar.icu",
  "https://invidious.flokinet.to",
];

async function fetchPiped(query: string) {
  if (!query || !query.trim()) return [];
  for (const instance of PIPED_INSTANCES) {
    try {
      const res = await fetch(
        `${instance}/search?q=${encodeURIComponent(query)}&filter=music_songs`,
        { signal: AbortSignal.timeout(3500) },
      );
      if (!res.ok) continue;
      const data = await res.json();
      if (!data.items || !Array.isArray(data.items) || data.items.length === 0) continue;

      return (
        data.items
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .map((item: any) => {
            const videoId = (item.url || "").replace("/watch?v=", "");
            if (!videoId) return null;
            let coverUrl = item.thumbnail || `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
            if (coverUrl.startsWith("http://")) {
              coverUrl = coverUrl.replace("http://", "https://");
            }
            if (coverUrl.includes("hqdefault.jpg")) {
              coverUrl = coverUrl.replace("hqdefault.jpg", "hqdefault.jpg");
            }
            return {
              id: `piped_${videoId}`,
              title: item.title || "Unknown Track",
              artist: item.uploaderName || "Artist",
              album: "Piped Music",
              coverUrl,
              audioUrl: `/api/piped/stream?id=${videoId}`,
              duration: formatDuration(item.duration || 210),
              provider: "piped",
            };
          })
          .filter(Boolean)
      );
    } catch {
      // try next instance
    }
  }
  return [];
}

async function fetchPipedStream(videoId: string) {
  for (const instance of PIPED_INSTANCES) {
    try {
      const res = await fetch(`${instance}/streams/${videoId}`, {
        signal: AbortSignal.timeout(3500),
      });
      if (!res.ok) continue;
      const data = await res.json();
      if (data.audioStreams && Array.isArray(data.audioStreams) && data.audioStreams.length > 0) {
        const best =
          data.audioStreams.find(
            (s: { mimeType?: string; format?: string; url?: string }) =>
              s.url && (s.mimeType?.includes("mp4") || s.format === "M4A"),
          ) || data.audioStreams.find((s: { url?: string }) => s.url);
        if (best?.url) {
          let u = best.url;
          if (u.startsWith("http") && !u.includes("/api/proxy/audio")) {
            u = `/api/proxy/audio?url=${encodeURIComponent(u)}`;
          }
          return u;
        }
      }
    } catch {
      // try next instance
    }
  }
  return null;
}

async function fetchInvidious(query: string) {
  if (!query || !query.trim()) return [];
  for (const instance of INVIDIOUS_INSTANCES) {
    try {
      const res = await fetch(
        `${instance}/api/v1/search?q=${encodeURIComponent(query)}&type=video`,
        { signal: AbortSignal.timeout(3500) },
      );
      if (!res.ok) continue;
      const data = await res.json();
      if (!Array.isArray(data) || data.length === 0) continue;

      return (
        data
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .map((item: any) => {
            if (!item.videoId) return null;
            let coverUrl =
              item.videoThumbnails?.[0]?.url ||
              `https://i.ytimg.com/vi/${item.videoId}/hqdefault.jpg`;
            if (coverUrl.startsWith("http://")) {
              coverUrl = coverUrl.replace("http://", "https://");
            }
            return {
              id: `invidious_${item.videoId}`,
              title: item.title || "Unknown Track",
              artist: item.author || "Invidious Artist",
              album: "YouTube Music",
              coverUrl,
              audioUrl: `/api/invidious/stream?id=${item.videoId}`,
              duration: formatDuration(item.lengthSeconds || 210),
              provider: "invidious",
            };
          })
          .filter(Boolean)
      );
    } catch {
      // try next instance
    }
  }
  return [];
}

async function fetchInvidiousStream(videoId: string) {
  for (const instance of INVIDIOUS_INSTANCES) {
    try {
      const res = await fetch(`${instance}/api/v1/videos/${videoId}`, {
        signal: AbortSignal.timeout(3500),
      });
      if (!res.ok) continue;
      const data = await res.json();
      if (data.adaptiveFormats && Array.isArray(data.adaptiveFormats)) {
        const audio = data.adaptiveFormats.find(
          (f: { type?: string; url?: string }) => f.type?.startsWith("audio/") && f.url,
        );
        if (audio?.url) {
          let u = audio.url;
          if (u.startsWith("http") && !u.includes("/api/proxy/audio")) {
            u = `/api/proxy/audio?url=${encodeURIComponent(u)}`;
          }
          return u;
        }
      }
    } catch {
      // try next instance
    }
  }
  return null;
}

const FALLBACK_AUDIO_POOL = [
  "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3",
  "https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3?filename=ambient-piano-logo-16535.mp3",
  "https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c38c8e10.mp3?filename=energetic-hip-hop-8303.mp3",
  "https://cdn.pixabay.com/download/audio/2022/10/14/audio_993dafd92d.mp3?filename=chill-out-12290.mp3",
  "https://cdn.pixabay.com/download/audio/2022/05/16/audio_db60bd4a73.mp3?filename=good-night-160166.mp3",
  "https://cdn.pixabay.com/download/audio/2021/09/06/audio_2066d90ddc.mp3?filename=corporate-motivation-7994.mp3",
  "https://cdn.pixabay.com/download/audio/2022/04/27/audio_1fc75294bf.mp3?filename=jazz-comedy-1110.mp3",
];

function getFallbackAudioForQuery(q: string): string {
  let hash = 0;
  for (let i = 0; i < q.length; i++) {
    hash = (hash * 31 + q.charCodeAt(i)) % 1000000007;
  }
  const index = Math.abs(hash) % FALLBACK_AUDIO_POOL.length;
  return FALLBACK_AUDIO_POOL[index];
}

async function resolveFullSongStream(query: string, videoId?: string) {
  if (videoId) {
    const isLocalId = /^(ind_|tr|a|p|s|lib-|sea)/.test(videoId);
    if (!isLocalId) {
      const cleanVid = videoId.replace(/^(piped_|invidious_)/, "");
      // Provider 1: Piped
      const pipedStream = await fetchPipedStream(cleanVid);
      if (pipedStream) return pipedStream;
      // Provider 2: Invidious
      const invStream = await fetchInvidiousStream(cleanVid);
      if (invStream) return invStream;
    }
  }

  const cleanQuery = (query || "").replace(/['"-]/g, " ").trim();

  if (cleanQuery) {
    // Provider 3: JioSaavn direct high quality decrypted audio
    try {
      const saavnResults = await fetchJioSaavn(cleanQuery);
      if (saavnResults.length > 0 && saavnResults[0].audioUrl) {
        return saavnResults[0].audioUrl;
      }
    } catch (e) {
      console.warn("JioSaavn stream resolution error:", e);
    }

    // Provider 1 Fallback search: Piped
    try {
      const pipedTracks = await fetchPiped(`${cleanQuery} official audio`);
      if (pipedTracks.length > 0) {
        const vid = pipedTracks[0].id.replace("piped_", "");
        const stream = await fetchPipedStream(vid);
        if (stream) return stream;
      }
    } catch (e) {
      console.warn("Piped stream error:", e);
    }

    // Provider 2 Fallback search: Invidious
    try {
      const invTracks = await fetchInvidious(`${cleanQuery} official audio`);
      if (invTracks.length > 0) {
        const vid = invTracks[0].id.replace("invidious_", "");
        const stream = await fetchInvidiousStream(vid);
        if (stream) return stream;
      }
    } catch (e) {
      console.warn("Invidious stream error:", e);
    }
  }

  // Final fallback to distinct fallback audio stream based on query/ID hash
  return getFallbackAudioForQuery(cleanQuery || videoId || "track");
}

async function multiProviderSearch(query: string) {
  const saavnResults = await fetchJioSaavn(query);
  if (saavnResults.length > 0) return saavnResults;

  const pipedResults = await fetchPiped(query);
  if (pipedResults.length > 0) return pipedResults;

  return await fetchInvidious(query);
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    try {
      const url = new URL(request.url);
      const jsonResponse = (data: unknown, status = 200) =>
        new Response(JSON.stringify(data), {
          status,
          headers: {
            "content-type": "application/json; charset=utf-8",
            "access-control-allow-origin": "*",
          },
        });

      if (url.pathname.startsWith("/api/proxy/audio")) {
        const targetUrl = url.searchParams.get("url") || "";
        if (!targetUrl || !targetUrl.startsWith("http")) {
          return new Response("Invalid URL", { status: 400 });
        }
        try {
          const reqHeaders = new Headers();
          reqHeaders.set(
            "User-Agent",
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
          );
          reqHeaders.set("Referer", "https://www.jiosaavn.com/");

          const range = request.headers.get("range");
          if (range) {
            reqHeaders.set("Range", range);
          }

          const audioRes = await fetch(targetUrl, { headers: reqHeaders });
          if (!audioRes.ok && audioRes.status !== 206) {
            return new Response("Failed to fetch audio stream", { status: audioRes.status });
          }

          const resHeaders = new Headers();
          resHeaders.set("Content-Type", audioRes.headers.get("content-type") || "audio/mpeg");
          if (audioRes.headers.has("content-length")) {
            resHeaders.set("Content-Length", audioRes.headers.get("content-length")!);
          }
          if (audioRes.headers.has("content-range")) {
            resHeaders.set("Content-Range", audioRes.headers.get("content-range")!);
          }
          resHeaders.set("Accept-Ranges", "bytes");
          resHeaders.set("Access-Control-Allow-Origin", "*");

          return new Response(audioRes.body, {
            status: audioRes.status,
            headers: resHeaders,
          });
        } catch (err) {
          console.error("Audio proxy error:", err);
          return new Response("Audio proxy error", { status: 500 });
        }
      }

      if (url.pathname.startsWith("/api/proxy/image")) {
        const targetUrl = url.searchParams.get("url") || "";
        if (!targetUrl || !targetUrl.startsWith("http")) {
          return new Response("Invalid URL", { status: 400 });
        }
        try {
          const imgRes = await fetch(targetUrl, {
            headers: {
              "User-Agent":
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
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
        } catch {
          return new Response("Image proxy error", { status: 500 });
        }
      }

      if (url.pathname.startsWith("/api/stream/resolve")) {
        const q = url.searchParams.get("q") || "";
        const id = url.searchParams.get("id") || "";
        let streamUrl = await resolveFullSongStream(q, id);
        if (streamUrl && streamUrl.startsWith("http") && !streamUrl.includes("/api/proxy/audio")) {
          streamUrl = `/api/proxy/audio?url=${encodeURIComponent(streamUrl)}`;
        }
        return jsonResponse({ audioUrl: streamUrl || "" });
      }

      if (url.pathname.startsWith("/api/saavn")) {
        const q = url.searchParams.get("q") || "";
        const tracks = await fetchJioSaavn(q);
        return jsonResponse(tracks);
      }

      if (url.pathname.startsWith("/api/piped/stream")) {
        const id = url.searchParams.get("id") || "";
        const streamUrl = await fetchPipedStream(id);
        if (streamUrl) {
          return jsonResponse({ audioUrl: streamUrl });
        }
        // Fallback to invidious stream
        const invStreamUrl = await fetchInvidiousStream(id);
        return jsonResponse({ audioUrl: invStreamUrl || "" });
      }

      if (url.pathname.startsWith("/api/piped")) {
        const q = url.searchParams.get("q") || "";
        const tracks = await fetchPiped(q);
        return jsonResponse(tracks);
      }

      if (url.pathname.startsWith("/api/invidious/stream")) {
        const id = url.searchParams.get("id") || "";
        const streamUrl = await fetchInvidiousStream(id);
        if (streamUrl) {
          return jsonResponse({ audioUrl: streamUrl });
        }
        // Fallback to piped stream
        const pipedStreamUrl = await fetchPipedStream(id);
        return jsonResponse({ audioUrl: pipedStreamUrl || "" });
      }

      if (url.pathname.startsWith("/api/invidious")) {
        const q = url.searchParams.get("q") || "";
        const tracks = await fetchInvidious(q);
        return jsonResponse(tracks);
      }

      if (url.pathname.startsWith("/api/music/search")) {
        const q = url.searchParams.get("q") || "";
        const tracks = await multiProviderSearch(q);
        return jsonResponse(tracks);
      }

      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      return await normalizeCatastrophicSsrResponse(response);
    } catch (error) {
      console.error(error);
      return new Response(renderErrorPage(), {
        status: 500,
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    }
  },
};
