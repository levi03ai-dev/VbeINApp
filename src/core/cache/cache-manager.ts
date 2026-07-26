interface CacheItem<T> {
  data: T;
  expiry: number;
}

export class CacheManager {
  private memoryCache = new Map<string, CacheItem<unknown>>();

  set<T>(key: string, data: T, ttlMs: number): void {
    const expiry = Date.now() + ttlMs;
    this.memoryCache.set(key, { data, expiry });
  }

  get<T>(key: string): T | null {
    const item = this.memoryCache.get(key);
    if (!item) return null;
    if (Date.now() > item.expiry) {
      this.memoryCache.delete(key);
      return null;
    }
    return item.data as T;
  }

  invalidate(key: string): void {
    this.memoryCache.delete(key);
  }

  clear(): void {
    this.memoryCache.clear();
  }
}

export const globalCache = new CacheManager();
