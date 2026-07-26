import { SecurityMiddleware } from "../../middleware/security.middleware";

export class HealthRouter {
  static async handle(url: URL): Promise<Response | null> {
    if (url.pathname.startsWith("/api/health")) {
      return SecurityMiddleware.jsonResponse({ status: "ok", timestamp: new Date().toISOString() });
    }
    return null;
  }
}
