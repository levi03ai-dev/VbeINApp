import { MemoryCache } from "./MemoryCache";
import { DiskCache } from "./DiskCache";
import { CachePolicy } from "./CachePolicy";

export class CacheManager {
  private memoryCache = new MemoryCache();
  private diskCache = new DiskCache();

  async get<T>(key: string, policy: CachePolicy = CachePolicy.MEMORY_FIRST): Promise<T | null> {
    if (policy === CachePolicy.MEMORY_ONLY || policy === CachePolicy.MEMORY_FIRST) {
      const memData = this.memoryCache.get<T>(key);
      if (memData) return memData;
    }

    if (policy === CachePolicy.DISK_ONLY || policy === CachePolicy.MEMORY_FIRST) {
      const diskData = this.diskCache.get<T>(key);
      if (diskData && policy === CachePolicy.MEMORY_FIRST) {
        // Optionally backfill memory cache if it was found in disk
        // this.memoryCache.set(key, diskData, defaultTtl);
      }
      return diskData;
    }

    return null;
  }

  async set<T>(
    key: string,
    data: T,
    ttlMs: number,
    policy: CachePolicy = CachePolicy.MEMORY_FIRST,
  ): Promise<void> {
    if (policy === CachePolicy.MEMORY_ONLY || policy === CachePolicy.MEMORY_FIRST) {
      this.memoryCache.set(key, data, ttlMs);
    }

    if (policy === CachePolicy.DISK_ONLY || policy === CachePolicy.MEMORY_FIRST) {
      this.diskCache.set(key, data, ttlMs);
    }
  }

  invalidate(key: string): void {
    this.memoryCache.delete(key);
    this.diskCache.delete(key);
  }

  clear(): void {
    this.memoryCache.clear();
    this.diskCache.clear();
  }
}

export const globalCache = new CacheManager();
