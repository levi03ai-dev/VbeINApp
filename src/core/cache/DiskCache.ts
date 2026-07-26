export class DiskCache {
  // Simple abstraction for LocalStorage/IndexedDB in the browser or FS in node.
  // Assuming browser context for this app frontend, but this is a backend service.
  // Since it's a backend service, we might simulate or use a library if it runs in node.
  // For the sake of architecture, let's keep it in memory for now or a dummy implementation.

  set<T>(key: string, data: T, ttlMs: number): void {
    // In a real node app, write to disk or Redis
  }

  get<T>(key: string): T | null {
    return null;
  }

  delete(key: string): void {}
  clear(): void {}
}
