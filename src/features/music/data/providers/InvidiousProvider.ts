/* eslint-disable @typescript-eslint/no-explicit-any */
import { MusicProvider } from "./MusicProvider";
import { HttpClient } from "../../../../core/api/HttpClient";
import { Track } from "../../domain/entities/Track";
import { Album } from "../../domain/entities/Album";
import { Artist } from "../../domain/entities/Artist";

export class InvidiousProvider implements MusicProvider {
  name = "invidious";
  priority = 3;
  private apiList = [
    "https://yt.chocolatemoo53.com/api/v1",
    "https://inv.nadeko.net/api/v1",
    "https://invidious.nerdvpn.de/api/v1",
    "https://invidious.f5.si/api/v1",
  ];

  async healthCheck(): Promise<boolean> {
    for (const url of this.apiList) {
      try {
        await HttpClient.get(`${url}/stats`);
        return true;
      } catch {
        continue;
      }
    }
    return false;
  }

  async searchTracks(query: string, page = 1): Promise<Track[]> {
    for (const url of this.apiList) {
      try {
        const data = await HttpClient.get<any>(
          `${url}/search?q=${encodeURIComponent(query)}&type=video`,
          { retries: 0 },
        );
        return (data || []).map((i: any) => ({
          id: `invidious_${i.videoId}`,
          title: i.title,
          artist: i.author || "Unknown",
          coverUrl: i.videoThumbnails?.[0]?.url,
          duration: i.lengthSeconds?.toString(),
          provider: this.name,
        }));
      } catch {
        continue;
      }
    }
    return [];
  }

  async searchAlbums(query: string): Promise<Album[]> {
    return [];
  }
  async searchArtists(query: string): Promise<Artist[]> {
    return [];
  }
  async getTrack(trackId: string): Promise<Track | null> {
    return null;
  }
  async getAlbum(albumId: string): Promise<Album | null> {
    return null;
  }
  async getArtist(artistId: string): Promise<Artist | null> {
    return null;
  }
  async getRecommendations(trackId: string): Promise<Track[]> {
    return [];
  }
  async getTrending(region?: string): Promise<Track[]> {
    return [];
  }

  async resolveStream(trackId: string): Promise<string | null> {
    for (const url of this.apiList) {
      try {
        const data = await HttpClient.get<any>(`${url}/videos/${trackId}`, { retries: 0 });
        const formats = data?.adaptiveFormats || [];
        const audioOnly = formats.filter((f: any) => f.type?.includes("audio"));
        const best = audioOnly.sort((a: any, b: any) => (b.bitrate || 0) - (a.bitrate || 0))[0];
        if (best) return best.url;
      } catch {
        continue;
      }
    }
    return null;
  }

  async getLyrics(trackId: string): Promise<string | null> {
    return null;
  }
}
