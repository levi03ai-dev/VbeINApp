/* eslint-disable @typescript-eslint/no-explicit-any */
import { TrackDto, AlbumDto, ArtistDto } from "../dto/MusicDto";
import { Track } from "../../domain/entities/Track";
import { Album } from "../../domain/entities/Album";
import { Artist } from "../../domain/entities/Artist";

export class MusicMapper {
  static mapTrack(dto: TrackDto, provider: string): Track {
    const downloadUrls = dto.download_url || [];
    const highestQuality = Array.isArray(downloadUrls)
      ? downloadUrls.find((q: any) => q.quality === "320kbps") || downloadUrls[0]
      : undefined;

    return {
      id: `${provider}_${dto.id}`,
      title: dto.title || dto.song || "Unknown Title",
      artist: dto.primary_artists || dto.singers || dto.subtitle || "Unknown Artist",
      album: dto.album || "Unknown Album",
      coverUrl: this.getHighResImage(dto.image),
      duration: dto.duration,
      audioUrl: highestQuality?.url || dto.url || null,
      provider,
    };
  }

  static mapAlbum(dto: AlbumDto, provider: string): Album {
    return {
      id: `${provider}_${dto.id}`,
      title: dto.title,
      artist: typeof dto.primary_artists === "string" ? dto.primary_artists : "Unknown Artist",
      coverUrl: this.getHighResImage(dto.image),
      year: dto.year,
      provider,
    };
  }

  static mapArtist(dto: ArtistDto, provider: string): Artist {
    return {
      id: `${provider}_${dto.id}`,
      name: dto.title || dto.name,
      imageUrl: this.getHighResImage(dto.image),
      provider,
    };
  }

  static getHighResImage(image?: string | any[]): string {
    if (!image) return "";
    if (typeof image === "string") {
      return image.replace("150x150", "500x500");
    }
    if (Array.isArray(image) && image.length > 0) {
      const res = image.find((i: any) => i.quality === "500x500") || image[image.length - 1];
      return res.url || "";
    }
    return "";
  }
}
