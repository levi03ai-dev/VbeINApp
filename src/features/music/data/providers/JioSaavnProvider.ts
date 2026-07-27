/* eslint-disable @typescript-eslint/no-explicit-any */
import { MusicProvider } from "./MusicProvider";
import { HttpClient } from "../../../../core/api/HttpClient";
import { Track } from "../../domain/entities/Track";
import { Album } from "../../domain/entities/Album";
import { Artist } from "../../domain/entities/Artist";
import { Logger } from "../../../../core/logger/logger";
import CryptoJS from "crypto-js";

export class JioSaavnProvider implements MusicProvider {
  name = "jiosaavn";
  priority = 1;
  private baseUrl = "https://www.jiosaavn.com/api.php";

  private decryptSaavnMediaUrl(encryptedUrl: string): string {
    if (!encryptedUrl) return "";
    try {
      const key = CryptoJS.enc.Utf8.parse("38346591");
      const ciphertext = CryptoJS.enc.Base64.parse(encryptedUrl);
      const decrypted = CryptoJS.DES.decrypt({ ciphertext } as any, key, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7,
      });
      let mediaUrl = decrypted.toString(CryptoJS.enc.Utf8).trim();

      if (mediaUrl.startsWith("http://")) {
        mediaUrl = mediaUrl.replace("http://", "https://");
      }
      return mediaUrl;
    } catch (e) {
      Logger.warn("Failed to decrypt JioSaavn media URL:", e);
      return "";
    }
  }

  async healthCheck(): Promise<boolean> {
    try {
      await HttpClient.get(
        `${this.baseUrl}?__call=webapi.get&token=8O-6_B5gYgQ_&type=playlist&p=1&n=1&includeMetaTags=0&ctx=web6dot0&api_version=4&_format=json&_marker=0`,
      );
      return true;
    } catch {
      return false;
    }
  }

  async searchTracks(query: string, page = 1): Promise<Track[]> {
    try {
      const searchUrl = `${this.baseUrl}?__call=search.getResults&q=${encodeURIComponent(query)}&p=${page}&n=20&_format=json&_marker=0&ctx=web6dot0`;
      const searchData = await HttpClient.get<any>(searchUrl);

      let pids = "";
      if (searchData?.results && Array.isArray(searchData.results)) {
        pids = searchData.results
          .map((r: any) => r.id)
          .filter(Boolean)
          .join(",");
      }

      if (!pids) return [];

      const detailUrl = `${this.baseUrl}?__call=song.getDetails&pids=${pids}&api_version=4&_format=json&ctx=web6dot0`;
      const detailData = await HttpClient.get<any>(detailUrl);

      let songs: any[] = [];
      if (Array.isArray(detailData.songs)) {
        songs = detailData.songs;
      } else if (typeof detailData === "object" && detailData !== null) {
        songs = Object.values(detailData).filter(
          (x: any) => typeof x === "object" && x !== null && "id" in x,
        );
      }

      return songs.map((s) => this.mapTrack(s));
    } catch (e) {
      Logger.warn("JioSaavn searchTracks error:", e);
      return [];
    }
  }

  async searchAlbums(query: string): Promise<Album[]> {
    return [];
  }

  async searchArtists(query: string): Promise<Artist[]> {
    return [];
  }

  async getTrack(trackId: string): Promise<Track | null> {
    try {
      const detailUrl = `${this.baseUrl}?__call=song.getDetails&pids=${trackId}&api_version=4&_format=json&ctx=web6dot0`;
      const detailData = await HttpClient.get<any>(detailUrl);

      let songs: any[] = [];
      if (Array.isArray(detailData.songs)) {
        songs = detailData.songs;
      } else if (typeof detailData === "object" && detailData !== null) {
        songs = Object.values(detailData).filter(
          (x: any) => typeof x === "object" && x !== null && "id" in x,
        );
      }

      if (songs.length > 0) return this.mapTrack(songs[0]);
    } catch (e) {
      Logger.warn("JioSaavn getTrack error:", e);
    }
    return null;
  }

  async getAlbum(albumId: string): Promise<Album | null> {
    return null;
  }

  async getArtist(artistId: string): Promise<Artist | null> {
    return null;
  }

  async getRecommendations(trackId: string): Promise<Track[]> {
    try {
      // Try reco.getreco first
      const url = `${this.baseUrl}?__call=reco.getreco&pid=${trackId}&api_version=4&_format=json&ctx=web6dot0`;
      const data = await HttpClient.get<any>(url);
      if (Array.isArray(data) && data.length > 0) {
        return data.map((s) => this.mapTrack(s));
      }

      // Fallback: try getting track details to get the artist, then get artist's other songs
      const track = await this.getTrack(trackId);
      if (track && track.artist) {
        const searchUrl = `${this.baseUrl}?__call=search.getResults&q=${encodeURIComponent(track.artist)}&p=1&n=20&api_version=4&_format=json&ctx=web6dot0`;
        const searchData = await HttpClient.get<any>(searchUrl);
        if (searchData.results && Array.isArray(searchData.results)) {
          return searchData.results
            .filter((s: any) => s.id !== trackId)
            .map((s: any) => this.mapTrack(s));
        }
      }
    } catch (e) {
      Logger.warn("JioSaavn getRecommendations error:", e);
    }
    return [];
  }

  async getTrending(region?: string): Promise<Track[]> {
    return [];
  }

  async resolveStream(trackId: string): Promise<string | null> {
    const track = await this.getTrack(trackId);
    return track?.audioUrl || null;
  }

  async getLyrics(trackId: string): Promise<string | null> {
    try {
      const url = `${this.baseUrl}?__call=lyrics.getLyrics&lyrics_id=${trackId}&ctx=web6dot0&api_version=4&_format=json`;
      const data = await HttpClient.get<any>(url);
      return data?.lyrics || null;
    } catch {
      return null;
    }
  }

  private mapTrack(item: any): Track {
    const rawImage = item.image || "";
    let coverUrl = rawImage;
    if (typeof rawImage === "string") {
      coverUrl = rawImage.replace("150x150", "500x500");
      if (coverUrl.startsWith("http://")) {
        coverUrl = coverUrl.replace("http://", "https://");
      }
    }

    let audioUrl = "";
    if (item.more_info?.encrypted_media_url) {
      const url = this.decryptSaavnMediaUrl(item.more_info.encrypted_media_url);
      if (url) {
        audioUrl = url.replace("_96.mp4", "_320.mp4").replace("_160.mp4", "_320.mp4");
      }
    } else if (item.media_preview_url) {
      audioUrl = item.media_preview_url
        .replace("preview.saavncdn.com", "aac.saavncdn.com")
        .replace("_96_p", "_320");
    }

    const title = item.title || item.song || "Unknown Title";
    const artist =
      item.more_info?.music ||
      item.more_info?.singers ||
      item.primary_artists ||
      item.subtitle ||
      "Unknown Artist";
    const album = item.more_info?.album || item.album || "Unknown Album";

    // Clean strings (remove html entities)
    const cleanStr = (str: string) =>
      str
        .replace(/&quot;/g, '"')
        .replace(/&amp;/g, "&")
        .replace(/&#039;/g, "'")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">");

    return {
      id: `jiosaavn_${item.id}`,
      title: cleanStr(title),
      artist: cleanStr(artist),
      album: cleanStr(album),
      coverUrl,
      duration: item.more_info?.duration
        ? `${Math.floor(Number(item.more_info.duration) / 60)}:${Math.floor(
            Number(item.more_info.duration) % 60,
          )
            .toString()
            .padStart(2, "0")}`
        : "3:00",
      audioUrl,
      provider: this.name,
    };
  }
}
