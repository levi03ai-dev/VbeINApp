import type { MusicProvider } from "../interfaces/music-provider.interface";
import type { ServerTrack, ProviderStatus } from "../../types/server.types";
import { HttpClient } from "../../utils/http-client";
import { ProviderMapper } from "../../mapper/provider.mapper";
import type {
  JioSaavnSearchResponse,
  JioSaavnDetailsResponse,
  JioSaavnSongItem,
} from "../../dto/provider.dto";
import { ServerConfig } from "../../config/server.config";
import { ServerLogger } from "../../logger/server.logger";

export class JioSaavnProvider implements MusicProvider {
  name = "jiosaavn";

  async search(query: string): Promise<ServerTrack[]> {
    if (!query || !query.trim()) return [];
    try {
      // Sanitize query to avoid breaking or timing out the JioSaavn backend
      let cleanQuery = query
        .replace(/\((official|video|lyrics?|audio|full|hd|mv|clip|remix|version|hq)[^)]*\)/gi, "")
        .replace(/\[(official|video|lyrics?|audio|full|hd|mv|clip|remix|version|hq)[^\]]*\]/gi, "")
        .replace(/[&,._|\-/\\()'"[\]:+]+/g, " ")
        .replace(/\s+/g, " ")
        .trim();

      if (!cleanQuery) {
        cleanQuery = query.trim();
      }

      // If the query is excessively long, slice it to be search-friendly
      const words = cleanQuery.split(" ");
      if (words.length > 6) {
        cleanQuery = words.slice(0, 5).join(" ");
      }

      // Endpoint 1: search.getResults
      let pids = "";
      const searchUrl = `${ServerConfig.jiosaavnApiUrl}?__call=search.getResults&q=${encodeURIComponent(
        cleanQuery,
      )}&p=1&n=25&_format=json&_marker=0&ctx=web6dot0`;

      try {
        const searchData = await HttpClient.get<JioSaavnSearchResponse>(searchUrl, {
          timeoutMs: 1200,
        });
        if (searchData.results && Array.isArray(searchData.results)) {
          pids = searchData.results
            .map((r) => r.id)
            .filter(Boolean)
            .join(",");
        }
      } catch (e) {
        ServerLogger.debug("JioSaavn search.getResults failed:", e);
      }

      // Endpoint 2: search.getMoreResults if pids is empty
      if (!pids) {
        try {
          const moreUrl = `${ServerConfig.jiosaavnApiUrl}?__call=search.getMoreResults&q=${encodeURIComponent(
            cleanQuery,
          )}&p=0&n=25&_format=json&_marker=0&ctx=web6dot0`;
          const moreData = await HttpClient.get<{ results?: { id: string }[] } | { id: string }[]>(
            moreUrl,
            { timeoutMs: 1200 },
          );
          let items: { id: string }[] = [];
          if (Array.isArray(moreData)) {
            items = moreData;
          } else if (moreData && Array.isArray(moreData.results)) {
            items = moreData.results;
          }
          pids = items
            .map((r) => r.id)
            .filter(Boolean)
            .join(",");
        } catch (e) {
          ServerLogger.debug("JioSaavn search.getMoreResults failed:", e);
        }
      }

      // Endpoint 3: Simplified search query if pids is still empty
      if (!pids && cleanQuery.includes(" ")) {
        try {
          if (words.length > 3) {
            const simplified = words.slice(0, 3).join(" ");
            const simUrl = `${ServerConfig.jiosaavnApiUrl}?__call=search.getResults&q=${encodeURIComponent(
              simplified,
            )}&p=1&n=20&_format=json&_marker=0&ctx=web6dot0`;
            const simData = await HttpClient.get<JioSaavnSearchResponse>(simUrl, {
              timeoutMs: 1200,
            });
            if (simData.results && Array.isArray(simData.results)) {
              pids = simData.results
                .map((r) => r.id)
                .filter(Boolean)
                .join(",");
            }
          }
        } catch (e) {
          ServerLogger.debug("JioSaavn simplified query search failed:", e);
        }
      }

      if (!pids) return [];

      const detailUrl = `${ServerConfig.jiosaavnApiUrl}?__call=song.getDetails&pids=${pids}&api_version=4&_format=json&ctx=web6dot0`;
      const detailData = await HttpClient.get<JioSaavnDetailsResponse>(detailUrl, {
        timeoutMs: 1200,
      });

      let songs: JioSaavnSongItem[] = [];
      if (Array.isArray(detailData.songs)) {
        songs = detailData.songs;
      } else if (typeof detailData === "object" && detailData !== null) {
        songs = Object.values(detailData).filter(
          (x): x is JioSaavnSongItem =>
            typeof x === "object" &&
            x !== null &&
            Boolean((x as JioSaavnSongItem).id || (x as JioSaavnSongItem).song),
        );
      }

      if (!Array.isArray(songs) || songs.length === 0) return [];

      return songs
        .map((item) => ProviderMapper.fromJioSaavnItem(item))
        .filter((t): t is ServerTrack => t !== null && Boolean(t.title));
    } catch (err) {
      ServerLogger.error("JioSaavn fetch error:", err);
      return [];
    }
  }

  async resolveStream(): Promise<string | null> {
    return null;
  }

  async healthCheck(): Promise<ProviderStatus> {
    const start = Date.now();
    try {
      const res = await this.search("arijit singh");
      return {
        name: this.name,
        isAvailable: res.length > 0,
        latencyMs: Date.now() - start,
      };
    } catch {
      return {
        name: this.name,
        isAvailable: false,
        latencyMs: Date.now() - start,
      };
    }
  }
}
