import type { Track, Playlist, Album } from "../types/music.types";
import type { AudiusTrackDto, AudiusPlaylistDto } from "../dto/music.dto";

export class MusicMapper {
  static generateGradient(str: string): string {
    let hash1 = 0;
    let hash2 = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash1 = (hash1 * 31 + char) | 0;
      hash2 = (hash2 * 17 + char) | 0;
    }
    const colors = [
      ["#ff3d7f", "#ff9e5e"],
      ["#0f2027", "#2c5364"],
      ["#c9a0dc", "#9b72cf"],
      ["#1a1a2e", "#a78bfa"],
      ["#5c2018", "#e8b84a"],
      ["#3a7bd5", "#3a6073"],
      ["#11998e", "#38ef7d"],
      ["#faf8f5", "#c9b99a"],
      ["#ff6b6b", "#574b90"],
      ["#0c2340", "#5cbdb9"],
      ["#f857a6", "#ff5858"],
      ["#0575e6", "#00f260"],
    ];
    const idx1 = Math.abs(hash1) % colors.length;
    const idx2 = Math.abs(hash2) % colors.length;
    const colorA = colors[idx1][0];
    const colorB = colors[idx2][1] || colors[idx1][1];
    return `linear-gradient(135deg, ${colorA} 0%, ${colorB} 100%)`;
  }

  static formatDuration(seconds: number): string {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  }

  static toTrackFromAudius(dto: AudiusTrackDto, appName: string): Track {
    const artwork = dto.artwork?.["480x480"] || dto.artwork?.["150x150"] || "";
    const title = dto.title || "Unknown Track";
    const artist = dto.user?.name || "Unknown Artist";
    const id = String(dto.id || Math.random());
    return {
      id,
      title,
      artist,
      album: "Single",
      duration: MusicMapper.formatDuration(dto.duration || 180),
      gradient: MusicMapper.generateGradient(artist + title),
      audioUrl: `https://discoveryprovider.audius.co/v1/tracks/${dto.id}/stream?app_name=${appName}`,
      coverUrl: artwork,
    };
  }

  static toPlaylistAlbumFromAudius(dto: AudiusPlaylistDto): Playlist & Album {
    const artwork = dto.artwork?.["480x480"] || dto.artwork?.["150x150"] || "";
    const title = dto.playlist_name || "Unknown Playlist";
    const artist = dto.user?.name || "Unknown Artist";
    const id = String(dto.id || Math.random());
    return {
      id,
      title,
      artist,
      subtitle: artist,
      year: new Date().getFullYear().toString(),
      gradient: MusicMapper.generateGradient(artist + title),
      coverUrl: artwork,
    };
  }
}
