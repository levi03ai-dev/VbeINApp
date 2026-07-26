import { SecurityMiddleware } from "../../middleware/security.middleware";
import { searchService } from "../../../features/music";

export class MusicRouter {
  static async handle(url: URL): Promise<Response | null> {
    if (url.pathname.startsWith("/api/music/search")) {
      const q = SecurityMiddleware.sanitizeQuery(url.searchParams.get("q"));
      const tracks = await searchService.searchTracks(q);
      return SecurityMiddleware.jsonResponse(tracks);
    }

    if (url.pathname.startsWith("/api/saavn")) {
      const q = SecurityMiddleware.sanitizeQuery(url.searchParams.get("q"));
      const tracks = await searchService.searchTracks(q); // We don't have provider-specific search anymore in the same way, ProviderManager abstracts it, we'll just return standard search
      return SecurityMiddleware.jsonResponse(tracks);
    }

    if (url.pathname.startsWith("/api/audius")) {
      const q = SecurityMiddleware.sanitizeQuery(url.searchParams.get("q"));
      const tracks = await searchService.searchTracks(q);
      return SecurityMiddleware.jsonResponse(tracks);
    }

    if (url.pathname.startsWith("/api/itunes")) {
      const q = SecurityMiddleware.sanitizeQuery(url.searchParams.get("q"));
      const tracks = await searchService.searchTracks(q);
      return SecurityMiddleware.jsonResponse(tracks);
    }

    if (url.pathname.startsWith("/api/piped")) {
      const q = SecurityMiddleware.sanitizeQuery(url.searchParams.get("q"));
      const tracks = await searchService.searchTracks(q);
      return SecurityMiddleware.jsonResponse(tracks);
    }

    if (url.pathname.startsWith("/api/invidious")) {
      const q = SecurityMiddleware.sanitizeQuery(url.searchParams.get("q"));
      const tracks = await searchService.searchTracks(q);
      return SecurityMiddleware.jsonResponse(tracks);
    }

    return null;
  }
}
