/* eslint-disable @typescript-eslint/no-explicit-any */
import { MusicProvider } from "./MusicProvider";
import { HttpClient } from "../../../../core/api/HttpClient";
import { Track } from "../../domain/entities/Track";
import { Album } from "../../domain/entities/Album";
import { Artist } from "../../domain/entities/Artist";

export class PipedProvider implements MusicProvider {
  name = "piped";
  priority = 2;
  private apiList = [
    "https://pipedapi-libre.kavin.rocks",
    "https://pipedapi.drgns.space",
    "https://piped-api.garudalinux.org",
  ];

  async healthCheck(): Promise<boolean> {
    for (const url of this.apiList) {
      try {
        await HttpClient.get(url);
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
          `${url}/search?q=${encodeURIComponent(query)}&filter=music_songs`,
          { retries: 0 },
        );
        return (data?.items || [])
          .filter((i: any) => i.type === "stream")
          .map((i: any) => ({
            id: `piped_${i.url.split("?v=")[1]}`,
            title: i.title,
            artist: i.uploaderName || "Unknown",
            coverUrl: i.thumbnail,
            duration: i.duration?.toString(),
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
        const data = await HttpClient.get<any>(`${url}/streams/${trackId}`, { retries: 0 });
        const audioStreams = data?.audioStreams || [];
        const best = audioStreams.sort((a: any, b: any) => (b.bitrate || 0) - (a.bitrate || 0))[0];
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
