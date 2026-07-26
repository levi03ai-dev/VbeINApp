import { globalProviderManager, ProviderManager } from "../provider-selection/provider.manager";
import { globalServerCache, ServerCacheService } from "../cache/server-cache.service";
import type { ServerTrack } from "../../types/server.types";

export class SearchService {
  constructor(
    private providerManager: ProviderManager = globalProviderManager,
    private cacheService: ServerCacheService = globalServerCache,
  ) {}

  async searchMultiProvider(query: string): Promise<ServerTrack[]> {
    if (!query || !query.trim()) return [];
    const cacheKey = `search_multi_${query.trim().toLowerCase()}`;
    const cached = this.cacheService.get<ServerTrack[]>(cacheKey);
    if (cached) return cached;

    const results = await this.providerManager.searchAll(query);
    if (results.length > 0) {
      this.cacheService.set(cacheKey, results);
    }
    return results;
  }

  async searchProvider(providerName: string, query: string): Promise<ServerTrack[]> {
    if (!query || !query.trim()) return [];
    const provider = this.providerManager.getProvider(providerName);
    if (!provider) return [];
    return provider.search(query);
  }
}

export const globalSearchService = new SearchService();
