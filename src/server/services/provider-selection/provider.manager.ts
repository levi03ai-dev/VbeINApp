import type { MusicProvider } from "../../providers/interfaces/music-provider.interface";
import { JioSaavnProvider } from "../../providers/jiosaavn/jiosaavn.provider";
import { AudiusProvider } from "../../providers/audius/audius.provider";
import { ITunesProvider } from "../../providers/itunes/itunes.provider";
import { PipedProvider } from "../../providers/piped/piped.provider";
import { InvidiousProvider } from "../../providers/invidious/invidious.provider";
import type { ServerTrack, ProviderStatus } from "../../types/server.types";
import { ServerLogger } from "../../logger/server.logger";
import { FallbackAudioService } from "../fallback/fallback-audio.service";

export class ProviderManager {
  private providers: Map<string, MusicProvider> = new Map();
  private errorCounts: Map<string, number> = new Map();

  constructor() {
    this.registerProvider(new JioSaavnProvider());
    this.registerProvider(new ITunesProvider());
    this.registerProvider(new AudiusProvider());
    this.registerProvider(new PipedProvider());
    this.registerProvider(new InvidiousProvider());
  }

  registerProvider(provider: MusicProvider): void {
    this.providers.set(provider.name, provider);
    this.errorCounts.set(provider.name, 0);
  }

  getProvider(name: string): MusicProvider | undefined {
    return this.providers.get(name);
  }

  getAvailableProviders(): MusicProvider[] {
    return Array.from(this.providers.values()).sort((a, b) => {
      const errA = this.errorCounts.get(a.name) || 0;
      const errB = this.errorCounts.get(b.name) || 0;
      return errA - errB;
    });
  }

  recordError(providerName: string, err: unknown): void {
    const current = this.errorCounts.get(providerName) || 0;
    this.errorCounts.set(providerName, current + 1);
    ServerLogger.warn(`Provider ${providerName} error logged (count: ${current + 1}):`, err);
  }

  recordSuccess(providerName: string): void {
    this.errorCounts.set(providerName, 0);
  }

  private matchesQuery(query: string, title?: string, artist?: string): boolean {
    if (!title && !artist) return false;
    const qLower = query.toLowerCase();
    const words = qLower.split(/\s+/).filter((w) => w.length > 2);
    if (words.length === 0) return true;
    const combined = `${title || ""} ${artist || ""}`.toLowerCase();
    let matchCount = 0;
    for (const w of words) {
      if (combined.includes(w)) matchCount++;
    }
    return matchCount >= Math.ceil(words.length / 2);
  }

  private filterOriginalTracks(tracks: ServerTrack[], originalQuery: string): ServerTrack[] {
    const qLower = originalQuery.toLowerCase();

    // Check if the query itself is seeking an instrumental, karaoke, or special version
    const wantsSpecial = [
      "instrumental",
      "karaoke",
      "backing",
      "tribute",
      "cover",
      "slowed",
      "reverb",
      "boosted",
    ].some((term) => qLower.includes(term));

    if (wantsSpecial) {
      return tracks; // Keep all if the user specifically asked for one
    }

    const unwantedPatterns = [
      /\bkaraoke\b/i,
      /\binstrumental\b/i,
      /\bbacking\s*track\b/i,
      /\bbackingtrack\b/i,
      /\btribute\b/i,
      /\bpiano\s*cover\b/i,
      /\borchestral\s*cover\b/i,
      /\bacoustic\s*cover\b/i,
      /\bcover\s*version\b/i,
      /\b8d\s*audio\b/i,
      /\bslowed\b/i,
      /\breverb\b/i,
      /\bbass\s*boosted\b/i,
    ];

    const filtered = tracks.filter((track) => {
      const title = (track.title || "").toLowerCase();
      const artist = (track.artist || "").toLowerCase();

      // Check for patterns in title or artist name
      for (const pattern of unwantedPatterns) {
        if (pattern.test(title) || pattern.test(artist)) {
          return false;
        }
      }

      // Special check for standalone word "cover" in title (e.g. "(Cover)" or "Miley Cyrus Cover")
      if (/\bcover\b/i.test(title)) {
        if (
          !title.includes("official video") &&
          !title.includes("official audio") &&
          !title.includes("official lyric")
        ) {
          return false;
        }
      }

      return true;
    });

    // If we filtered out EVERYTHING, fallback to the original list so we don't return an empty array
    return filtered.length > 0 ? filtered : tracks;
  }

  async searchAll(query: string): Promise<ServerTrack[]> {
    if (!query || !query.trim()) return [];

    const searchOrder = ["itunes", "jiosaavn", "piped", "invidious", "audius"];

    for (const providerName of searchOrder) {
      const provider = this.getProvider(providerName);
      if (!provider) continue;

      try {
        const results = await provider.search(query);
        if (results && results.length > 0) {
          this.recordSuccess(providerName);
          return this.filterOriginalTracks(results, query);
        }
      } catch (e) {
        this.recordError(providerName, e);
      }
    }

    return [];
  }

  private getFallbackSearchQueries(query: string): string[] {
    if (!query) return [];

    const clean = (q: string) => {
      return q
        .replace(/\((official|video|lyrics?|audio|full|hd|mv|clip|remix|version|hq)[^)]*\)/gi, "")
        .replace(/\[(official|video|lyrics?|audio|full|hd|mv|clip|remix|version|hq)[^\]]*\]/gi, "")
        .replace(/[&,._|\-/\\()'"[\]:+]+/g, " ")
        .replace(/\s+/g, " ")
        .trim();
    };

    const queries: string[] = [];

    // 1. Add the fully cleaned entire query
    const primaryClean = clean(query);
    if (primaryClean) {
      queries.push(primaryClean);
    }

    // 2. If there's a comma, split by comma to get the first part (often Title + Primary Artist)
    if (query.includes(",")) {
      const parts = query.split(",");
      const firstPartClean = clean(parts[0]);
      if (firstPartClean && firstPartClean !== primaryClean) {
        queries.push(firstPartClean);
      }
    }

    // 3. If there is a "feat." or "ft.", extract the part before it
    const featRegex = /\s(feat|ft)\.?\s/i;
    if (featRegex.test(query)) {
      const parts = query.split(featRegex);
      const beforeFeatClean = clean(parts[0]);
      if (beforeFeatClean && !queries.includes(beforeFeatClean)) {
        queries.push(beforeFeatClean);
      }
    }

    // 4. Create a word-limited version if the query is very long (more than 5 words)
    const words = primaryClean.split(" ");
    if (words.length > 5) {
      const shortQuery = words.slice(0, 4).join(" ");
      if (shortQuery && !queries.includes(shortQuery)) {
        queries.push(shortQuery);
      }
    }

    return Array.from(new Set(queries)).filter(Boolean);
  }

  /**
   * Resolves playable audio stream using intelligent multi-provider fallback order:
   * 1. iTunes (highest accuracy official audio from Apple Music)
   * 2. JioSaavn (320kbps audio with query matching validation)
   * 3. Piped (YouTube audio stream)
   * 4. Invidious (YouTube audio stream backup)
   * 5. Audius (uncompressed electronic/indie tracks)
   */
  async resolveStreamWithFallback(query: string, videoId?: string): Promise<string> {
    const cleanQuery = (query || "").replace(/['"-]/g, " ").trim();

    // 1. Direct ID resolution if provided
    if (videoId) {
      const cleanVid = videoId.replace(/^(piped_|invidious_|audius_|jiosaavn_|itunes_)/, "");

      // iTunes only returns 30s preview clips from its API, so for full audio playback
      // we bypass iTunes preview and let it resolve full 320kbps streams via JioSaavn, Piped, or Invidious below.

      if (videoId.startsWith("audius_")) {
        const audius = this.getProvider("audius");
        if (audius) {
          try {
            const stream = await audius.resolveStream(cleanVid);
            if (stream) {
              this.recordSuccess("audius");
              return stream;
            }
          } catch (e) {
            this.recordError("audius", e);
          }
        }
      }

      if (videoId.startsWith("piped_") || videoId.startsWith("invidious_")) {
        const piped = this.getProvider("piped");
        if (piped) {
          try {
            const stream = await piped.resolveStream(cleanVid);
            if (stream) {
              this.recordSuccess("piped");
              return stream;
            }
          } catch (e) {
            this.recordError("piped", e);
          }
        }

        const invidious = this.getProvider("invidious");
        if (invidious) {
          try {
            const stream = await invidious.resolveStream(cleanVid);
            if (stream) {
              this.recordSuccess("invidious");
              return stream;
            }
          } catch (e) {
            this.recordError("invidious", e);
          }
        }
      }
    }

    // 2. Query search across fallback hierarchy
    if (cleanQuery) {
      const queriesToTry = this.getFallbackSearchQueries(query);

      for (let i = 0; i < queriesToTry.length; i++) {
        const q = queriesToTry[i];

        // Step 1: JioSaavn (FULL 320kbps / 160kbps high-quality original songs)
        const jiosaavn = this.getProvider("jiosaavn");
        if (jiosaavn) {
          try {
            const saavnResults = await jiosaavn.search(q);
            const filteredSaavn = this.filterOriginalTracks(saavnResults, q);
            if (
              filteredSaavn.length > 0 &&
              filteredSaavn[0].audioUrl &&
              !filteredSaavn[0].audioUrl.includes("/api/stream/resolve") &&
              this.matchesQuery(q, filteredSaavn[0].title, filteredSaavn[0].artist)
            ) {
              this.recordSuccess("jiosaavn");
              return filteredSaavn[0].audioUrl;
            }
          } catch (e) {
            this.recordError("jiosaavn", e);
          }
        }

        // Only search Piped, Invidious, and Audius on the primary query (index 0)
        // to prevent compounding slow timeout delays on fallback sub-queries.
        if (i === 0 && q) {
          // Step 2: Piped (YouTube official full audio stream)
          const piped = this.getProvider("piped");
          if (piped) {
            try {
              const pipedTracks = await piped.search(`${q} audio`);
              const filteredPiped = this.filterOriginalTracks(pipedTracks, q);
              if (filteredPiped.length > 0) {
                const vid = filteredPiped[0].id.replace("piped_", "");
                const stream = await piped.resolveStream(vid);
                if (stream) {
                  this.recordSuccess("piped");
                  return stream;
                }
              }
            } catch (e) {
              this.recordError("piped", e);
            }
          }

          // Step 3: Invidious (YouTube official full audio stream)
          const invidious = this.getProvider("invidious");
          if (invidious) {
            try {
              const invTracks = await invidious.search(`${q} audio`);
              const filteredInv = this.filterOriginalTracks(invTracks, q);
              if (filteredInv.length > 0) {
                const vid = filteredInv[0].id.replace("invidious_", "");
                const stream = await invidious.resolveStream(vid);
                if (stream) {
                  this.recordSuccess("invidious");
                  return stream;
                }
              }
            } catch (e) {
              this.recordError("invidious", e);
            }
          }

          // Step 4: Audius (Full original track)
          const audius = this.getProvider("audius");
          if (audius) {
            try {
              const audiusResults = await audius.search(q);
              const filteredAudius = this.filterOriginalTracks(audiusResults, q);
              if (filteredAudius.length > 0 && filteredAudius[0].audioUrl) {
                this.recordSuccess("audius");
                return filteredAudius[0].audioUrl;
              }
            } catch (e) {
              this.recordError("audius", e);
            }
          }
        }
      }
    }

    // Always guarantee a valid playable fallback stream URL
    return FallbackAudioService.getFallbackUrl(cleanQuery || query || videoId || "track");
  }

  async checkHealth(): Promise<ProviderStatus[]> {
    const statuses: ProviderStatus[] = [];
    for (const provider of this.providers.values()) {
      const status = await provider.healthCheck();
      const errs = this.errorCounts.get(provider.name) || 0;
      if (errs > 3) {
        status.status = "degraded";
      }
      statuses.push(status);
    }
    return statuses;
  }
}

export const globalProviderManager = new ProviderManager();
