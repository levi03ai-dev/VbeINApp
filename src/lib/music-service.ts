import { MusicServiceFacade } from "../features/music/services/music.service";
import type { Track, Album, Playlist } from "./music-data";
import { globalProviderManager } from "../features/music/data/providers/ProviderManager";
import { Logger } from "../core/logger/logger";

export async function searchTracks(query: string, limit = 20): Promise<Track[]> {
  return MusicServiceFacade.searchTracks(query, limit);
}

export async function getPopularTracks(limit = 20): Promise<Track[]> {
  return MusicServiceFacade.getPopularTracks(limit);
}

export async function getTracksByGenre(genre: string, limit = 15): Promise<Track[]> {
  return MusicServiceFacade.getTracksByGenre(genre, limit);
}

export async function getFeaturedAlbums(limit = 10): Promise<Album[]> {
  return MusicServiceFacade.getFeaturedAlbums(limit);
}

export async function getCuratedPlaylists(limit = 10): Promise<Playlist[]> {
  return MusicServiceFacade.getCuratedPlaylists(limit);
}

export async function downloadTrackFile(audioUrl: string, filename: string): Promise<boolean> {
  return MusicServiceFacade.downloadTrackFile(audioUrl, filename);
}

export async function getRecommendations(trackId: string): Promise<Track[]> {
  try {
    const res = await globalProviderManager.getRecommendations(trackId);
    return res.map((t) => ({
      ...t,
      album: t.album || t.title || "Single",
      duration: t.duration || "3:30",
      gradient: (t as { gradient?: string }).gradient || "from-amber-500 to-red-600",
    }));
  } catch (error) {
    Logger.error("Failed to get recommendations:", error);
    return [];
  }
}

export async function getLyrics(trackId: string): Promise<string | null> {
  try {
    let providerName = "jamendo";
    let realId = trackId;
    if (trackId.includes("_")) {
      const parts = trackId.split("_");
      providerName = parts[0];
      realId = parts.slice(1).join("_");
    }

    const provider =
      globalProviderManager.getProvider(providerName) ||
      globalProviderManager.getAvailableProviders()[0];

    if (provider && provider.getLyrics) {
      return await provider.getLyrics(realId);
    }
    return null;
  } catch (error) {
    Logger.error("Failed to get lyrics:", error);
    return null;
  }
}
