import { MusicProvider } from "./MusicProvider";
import { Logger } from "../../../../core/logger/logger";
import { ProviderUnavailableError } from "../../../../core/errors/app-error";
import { Track } from "../../domain/entities/Track";
import { Album } from "../../domain/entities/Album";
import { Artist } from "../../domain/entities/Artist";

export class ProviderManager {
  private providers: Map<string, MusicProvider> = new Map();
  private errorCounts: Map<string, number> = new Map();
  private maxErrorsBeforeDegrade = 3;

  registerProvider(provider: MusicProvider): void {
    this.providers.set(provider.name, provider);
    this.errorCounts.set(provider.name, 0);
  }

  getProvider(name: string): MusicProvider | undefined {
    return this.providers.get(name);
  }

  getAvailableProviders(): MusicProvider[] {
    return Array.from(this.providers.values())
      .filter((p) => (this.errorCounts.get(p.name) || 0) < this.maxErrorsBeforeDegrade)
      .sort((a, b) => a.priority - b.priority);
  }

  recordError(providerName: string, err: unknown): void {
    const current = this.errorCounts.get(providerName) || 0;
    this.errorCounts.set(providerName, current + 1);
    Logger.warn(`Provider ${providerName} error logged (count: ${current + 1}):`, err);
  }

  recordSuccess(providerName: string): void {
    this.errorCounts.set(providerName, 0);
  }

  async executeWithFallback<T>(
    operationName: string,
    operation: (provider: MusicProvider) => Promise<T>,
    fallbackCheck?: (result: T) => boolean,
  ): Promise<T> {
    const providers = this.getAvailableProviders();

    for (const provider of providers) {
      try {
        const result = await operation(provider);
        const isValid = fallbackCheck ? fallbackCheck(result) : Boolean(result);
        if (isValid) {
          this.recordSuccess(provider.name);
          return result;
        }
      } catch (err) {
        this.recordError(provider.name, err);
      }
    }

    throw new ProviderUnavailableError(
      "All",
      `All providers failed for operation: ${operationName}`,
    );
  }

  async searchTracks(query: string, page?: number): Promise<Track[]> {
    return this.executeWithFallback(
      "searchTracks",
      (p) => p.searchTracks(query, page),
      (res) => res && res.length > 0,
    ).catch(() => []);
  }

  async resolveStream(trackId: string, query?: string): Promise<string | null> {
    // Determine provider from trackId prefix if possible
    for (const provider of this.providers.values()) {
      if (trackId.startsWith(`${provider.name}_`)) {
        try {
          const stream = await provider.resolveStream(trackId.replace(`${provider.name}_`, ""));
          if (stream) {
            this.recordSuccess(provider.name);
            return stream;
          }
        } catch (e) {
          this.recordError(provider.name, e);
          console.log("Provider failed:", provider.name, e);
        }
      }
    }

    // Fallback based on query
    if (query) {
      return this.executeWithFallback(
        "resolveStreamFallback",
        async (p) => {
          const tracks = await p.searchTracks(query + " official audio", 1);
          if (tracks.length > 0) {
            const stream = await p.resolveStream(tracks[0].id.replace(`${p.name}_`, ""));
            if (stream) return stream;
          }
          return "";
        },
        (res) => Boolean(res),
      ).catch(() => null);
    }
    return null;
  }

  async getRecommendations(trackId: string): Promise<Track[]> {
    for (const provider of this.providers.values()) {
      if (trackId.startsWith(`${provider.name}_`)) {
        try {
          if (provider.getRecommendations) {
            const recos = await provider.getRecommendations(
              trackId.replace(`${provider.name}_`, ""),
            );
            if (recos && recos.length > 0) {
              this.recordSuccess(provider.name);
              return recos;
            }
          }
        } catch (e) {
          this.recordError(provider.name, e);
        }
      }
    }

    // Fallback: search across providers using the track id directly if no prefix matched
    return this.executeWithFallback(
      "getRecommendations",
      async (p) => {
        if (p.getRecommendations) {
          return p.getRecommendations(trackId);
        }
        return [];
      },
      (res) => res && res.length > 0,
    ).catch(() => []);
  }
}

export const globalProviderManager = new ProviderManager();
