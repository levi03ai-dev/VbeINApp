export class RecommendationCache {
  private memoryCache = new Map<string, { data: unknown; expiry: number }>();

  set(key: string, data: unknown, ttlSeconds: number = 300) {
    this.memoryCache.set(key, {
      data,
      expiry: Date.now() + ttlSeconds * 1000,
    });
  }

  get(key: string): unknown | null {
    const cached = this.memoryCache.get(key);
    if (!cached) return null;
    if (Date.now() > cached.expiry) {
      this.memoryCache.delete(key);
      return null;
    }
    return cached.data;
  }
}
