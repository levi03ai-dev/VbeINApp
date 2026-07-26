import { globalProviderManager } from "../../services/provider-selection/provider.manager";
import { SecurityMiddleware } from "../../middleware/security.middleware";

export class ProviderRouter {
  static async handle(url: URL): Promise<Response | null> {
    if (url.pathname.startsWith("/api/provider/status")) {
      const statuses = await globalProviderManager.checkHealth();
      return SecurityMiddleware.jsonResponse({ providers: statuses });
    }
    return null;
  }
}
