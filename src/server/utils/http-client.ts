import { ServerConfig } from "../config/server.config";
import { DEFAULT_USER_AGENT } from "../constants/server.constants";
import { ServerError, ServerErrorCode } from "../errors/server.errors";

export interface HttpClientOptions {
  timeoutMs?: number;
  headers?: Record<string, string>;
  signal?: AbortSignal;
}

export class HttpClient {
  static async get<T>(url: string, options: HttpClientOptions = {}): Promise<T> {
    const timeout = options.timeoutMs ?? ServerConfig.requestTimeoutMs;
    const reqHeaders = new Headers(options.headers || {});
    if (!reqHeaders.has("User-Agent")) {
      reqHeaders.set("User-Agent", DEFAULT_USER_AGENT);
    }

    try {
      const response = await fetch(url, {
        headers: reqHeaders,
        signal: options.signal || AbortSignal.timeout(timeout),
      });

      if (!response.ok) {
        throw new ServerError(
          ServerErrorCode.NETWORK_ERROR,
          `HTTP Error ${response.status}`,
          response.status,
        );
      }

      return (await response.json()) as T;
    } catch (err) {
      if (err instanceof ServerError) throw err;
      throw new ServerError(ServerErrorCode.NETWORK_ERROR, `Request to ${url} failed`, 500, err);
    }
  }
}
