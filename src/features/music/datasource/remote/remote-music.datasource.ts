import { ApiClient } from "../../../../core/network/api-client";
import type { Track } from "@/lib/music-data";
import { MusicMapper } from "../../mapper/music.mapper";
import type { AudiusSearchResponseDto } from "../../dto/music.dto";
import { AppConfig } from "../../../../core/config/app-config";

export class RemoteMusicDataSource {
  async searchOnline(query: string): Promise<Track[]> {
    if (!query || !query.trim()) return [];
    try {
      const data = await ApiClient.get<Track[]>(`/api/music/search?q=${encodeURIComponent(query)}`);
      if (Array.isArray(data) && data.length > 0) {
        return data.map((t) => ({
          ...t,
          gradient: MusicMapper.generateGradient(t.title || String(t.id)),
        }));
      }
    } catch {
      // Ignore online backend error and fall back
    }
    return [];
  }

  async searchAudius(query: string, limit = 20): Promise<Track[]> {
    try {
      const url = `https://discoveryprovider.audius.co/v1/tracks/search?query=${encodeURIComponent(
        query,
      )}&app_name=${AppConfig.appName}`;
      const data = await ApiClient.get<AudiusSearchResponseDto>(url);
      if (data.data && Array.isArray(data.data) && data.data.length > 0) {
        return data.data
          .slice(0, limit)
          .map((dto) => MusicMapper.toTrackFromAudius(dto, AppConfig.appName));
      }
    } catch {
      // Ignore audius fallback error
    }
    return [];
  }
}
