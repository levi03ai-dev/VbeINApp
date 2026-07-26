export class SecurityMiddleware {
  static sanitizeQuery(query: string | null): string {
    if (!query) return "";
    return query.replace(/[<>]/g, "").trim();
  }

  static isValidUrl(urlStr: string | null): boolean {
    if (!urlStr) return false;
    try {
      const parsed = new URL(urlStr);
      return parsed.protocol === "http:" || parsed.protocol === "https:";
    } catch {
      return false;
    }
  }

  static jsonResponse(data: unknown, status = 200): Response {
    return new Response(JSON.stringify(data), {
      status,
      headers: {
        "content-type": "application/json; charset=utf-8",
        "access-control-allow-origin": "*",
      },
    });
  }
}
