import { consumeLastCapturedError } from "../../lib/error-capture";
import { renderErrorPage } from "../../lib/error-page";
import { ProxyRouter } from "../routes/proxy/proxy.router";
import { StreamRouter } from "../routes/stream/stream.router";
import { MusicRouter } from "../routes/music/music.router";
import { ProviderRouter } from "../routes/provider/provider.router";
import { HealthRouter } from "../routes/health/health.router";
import { ServerLogger } from "../logger/server.logger";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m: Record<string, unknown>) => (m.default ?? m) as ServerEntry,
    );
  }
  return serverEntryPromise;
}

function isH3SwallowedErrorBody(body: string): boolean {
  try {
    const payload = JSON.parse(body) as { unhandled?: unknown; message?: unknown };
    return payload.unhandled === true && payload.message === "HTTPError";
  } catch {
    return false;
  }
}

async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!isH3SwallowedErrorBody(body)) return response;

  ServerLogger.error(
    (consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`)) as string,
  );
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

export class AppBootstrap {
  static async handleRequest(request: Request, env: unknown, ctx: unknown): Promise<Response> {
    try {
      const url = new URL(request.url);

      // Route 1: Proxy Router
      const proxyRes = await ProxyRouter.handle(url, request);
      if (proxyRes) return proxyRes;

      // Route 2: Stream Router
      const streamRes = await StreamRouter.handle(url);
      if (streamRes) return streamRes;

      // Route 3: Music Router
      const musicRes = await MusicRouter.handle(url);
      if (musicRes) return musicRes;

      // Route 4: Provider Router
      const providerRes = await ProviderRouter.handle(url);
      if (providerRes) return providerRes;

      // Route 5: Health Router
      const healthRes = await HealthRouter.handle(url);
      if (healthRes) return healthRes;

      // Fallback: SSR Handler
      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      return await normalizeCatastrophicSsrResponse(response);
    } catch (error) {
      ServerLogger.error("Uncaught server request error:", error);
      return new Response(renderErrorPage(), {
        status: 500,
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    }
  }
}
