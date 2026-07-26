import type { ServerTrack } from "../types/server.types";
import type {
  JioSaavnSongItem,
  PipedSearchItem,
  InvidiousSearchItem,
  AudiusTrackItem,
  ITunesTrackItem,
} from "../dto/provider.dto";
import { decryptSaavnMediaUrl, formatDuration } from "../utils/crypto.utils";

const cleanStr = (str?: string): string =>
  (str || "")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/&#039;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");

export class ProviderMapper {
  static fromJioSaavnItem(item: JioSaavnSongItem): ServerTrack | null {
    const more = item.more_info || {};
    const rawTitle = cleanStr(item.title || item.song || "");
    const rawArtist = cleanStr(
      item.subtitle || item.primary_artists || more.music || more.singers || "Indian Artist",
    );

    if (!rawTitle) return null;

    let directCdn = "";
    if (item.download_url) {
      if (Array.isArray(item.download_url)) {
        const item320 = item.download_url.find(
          (d) => d.quality === "320kbps" || d.quality === "320",
        );
        const item160 = item.download_url.find(
          (d) => d.quality === "160kbps" || d.quality === "160",
        );
        const link =
          item320?.link ||
          item320?.url ||
          item160?.link ||
          item160?.url ||
          item.download_url[0]?.link ||
          item.download_url[0]?.url;
        if (link) directCdn = link;
      } else if (typeof item.download_url === "string") {
        directCdn = item.download_url;
      }
    }
    if (!directCdn && more.encrypted_media_url) {
      directCdn = decryptSaavnMediaUrl(more.encrypted_media_url);
    }
    if (!directCdn && item.media_url) {
      directCdn = item.media_url.replace("http://", "https://");
    }

    if (directCdn) {
      directCdn = directCdn
        .replace("http://", "https://")
        .replace(/_96\.mp4/g, "_320.mp4")
        .replace(/_160\.mp4/g, "_320.mp4")
        .replace(/_96\.m4a/g, "_320.m4a")
        .replace(/_160\.m4a/g, "_320.m4a")
        .replace(/_96\.mp3/g, "_320.mp3")
        .replace(/_160\.mp3/g, "_320.mp3");
    }

    let audioUrl = "";
    if (directCdn && directCdn.startsWith("http")) {
      const ext =
        directCdn.includes(".mp4") || directCdn.includes(".m4a") || directCdn.includes(".aac")
          ? "mp4"
          : "mp3";
      audioUrl = `/api/proxy/audio.${ext}?url=${encodeURIComponent(directCdn)}`;
    } else {
      audioUrl = `/api/stream/resolve?q=${encodeURIComponent(rawTitle + " " + rawArtist)}`;
    }

    let coverUrl = (item.image || "").replace("150x150", "500x500").replace("50x50", "500x500");
    if (coverUrl.startsWith("http://")) {
      coverUrl = coverUrl.replace("http://", "https://");
    }
    if (coverUrl.startsWith("http") && !coverUrl.includes("/api/proxy/image")) {
      coverUrl = `/api/proxy/image?url=${encodeURIComponent(coverUrl)}`;
    }

    return {
      id: String(item.id || Math.random()),
      title: rawTitle,
      artist: rawArtist,
      album: cleanStr(more.album || item.album || "Single"),
      coverUrl,
      audioUrl,
      duration: more.duration ? formatDuration(Number(more.duration)) : "3:30",
      provider: "jiosaavn",
    };
  }

  static fromPipedItem(item: PipedSearchItem): ServerTrack | null {
    const videoId = (item.url || "").replace("/watch?v=", "");
    if (!videoId) return null;

    let coverUrl = item.thumbnail || `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
    if (coverUrl.startsWith("http://")) {
      coverUrl = coverUrl.replace("http://", "https://");
    }
    if (coverUrl.startsWith("http") && !coverUrl.includes("/api/proxy/image")) {
      coverUrl = `/api/proxy/image?url=${encodeURIComponent(coverUrl)}`;
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
  }

  static fromInvidiousItem(item: InvidiousSearchItem): ServerTrack | null {
    if (!item.videoId) return null;

    let coverUrl =
      item.videoThumbnails?.[0]?.url || `https://i.ytimg.com/vi/${item.videoId}/hqdefault.jpg`;
    if (coverUrl.startsWith("http://")) {
      coverUrl = coverUrl.replace("http://", "https://");
    }
    if (coverUrl.startsWith("http") && !coverUrl.includes("/api/proxy/image")) {
      coverUrl = `/api/proxy/image?url=${encodeURIComponent(coverUrl)}`;
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
  }

  static fromAudiusItem(item: AudiusTrackItem): ServerTrack | null {
    if (!item.id || !item.title) return null;

    const coverRaw =
      item.artwork?.["1000x1000"] || item.artwork?.["480x480"] || item.artwork?.["150x150"] || "";
    let coverUrl = coverRaw;
    if (coverUrl.startsWith("http://")) {
      coverUrl = coverUrl.replace("http://", "https://");
    }
    if (coverUrl.startsWith("http") && !coverUrl.includes("/api/proxy/image")) {
      coverUrl = `/api/proxy/image?url=${encodeURIComponent(coverUrl)}`;
    }

    const streamUrl = `https://discoveryprovider.audius.co/v1/tracks/${item.id}/stream?app_name=ApexMusic`;
    const audioUrl = `/api/proxy/audio.mp3?url=${encodeURIComponent(streamUrl)}`;

    return {
      id: `audius_${item.id}`,
      title: item.title,
      artist: item.user?.name || "Audius Artist",
      album: "Audius Music",
      coverUrl: coverUrl || "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600",
      audioUrl,
      duration: formatDuration(item.duration || 180),
      provider: "audius",
    };
  }

  static fromITunesItem(item: ITunesTrackItem): ServerTrack | null {
    if (!item.trackId || !item.trackName) return null;

    let coverUrl = (item.artworkUrl100 || "").replace("100x100bb", "600x600bb");
    if (coverUrl.startsWith("http://")) {
      coverUrl = coverUrl.replace("http://", "https://");
    }
    if (coverUrl.startsWith("http") && !coverUrl.includes("/api/proxy/image")) {
      coverUrl = `/api/proxy/image?url=${encodeURIComponent(coverUrl)}`;
    }

    const query = `${item.trackName} ${item.artistName || ""}`.trim();
    // Default to stream resolve endpoint for full original song playback
    const audioUrl = `/api/stream/resolve?q=${encodeURIComponent(query)}&id=itunes_${item.trackId}`;

    return {
      id: `itunes_${item.trackId}`,
      title: item.trackName,
      artist: item.artistName || "Artist",
      album: item.collectionName || "Single",
      coverUrl,
      audioUrl,
      duration: formatDuration(Math.round((item.trackTimeMillis || 210000) / 1000)),
      provider: "itunes",
    };
  }
}
