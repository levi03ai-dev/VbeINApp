import { AppConfig } from "../config/app-config";
import { AppError, ErrorCode } from "../errors/app-error";
import { Logger } from "../logger/logger";

export interface RequestOptions {
  timeout?: number;
  retries?: number;
  signal?: AbortSignal;
}

export class ApiClient {
  static async get<T>(url: string, options: RequestOptions = {}): Promise<T> {
    const timeout = options.timeout ?? AppConfig.apiTimeoutMs;
    const retries = options.retries ?? AppConfig.maxRetries;

    let lastError: unknown;

    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), timeout);

        if (options.signal) {
          options.signal.addEventListener("abort", () => controller.abort());
        }

        Logger.debug(`API GET: ${url} (Attempt ${attempt + 1})`);

        const response = await fetch(url, {
          signal: controller.signal,
        });

        clearTimeout(timer);

        if (!response.ok) {
          throw new AppError(
            ErrorCode.API_ERROR,
            `HTTP error! status: ${response.status}`,
            response.status,
          );
        }

        const data = (await response.json()) as T;
        return data;
      } catch (error: unknown) {
        lastError = error;
        Logger.warn(`API request failed for ${url} (Attempt ${attempt + 1}):`, error);
        if (attempt === retries) {
          break;
        }
        // Wait before retry
        await new Promise((resolve) => setTimeout(resolve, 1000 * (attempt + 1)));
      }
    }

    if (lastError instanceof AppError) {
      throw lastError;
    }

    throw new AppError(
      ErrorCode.NETWORK_ERROR,
      `Failed to fetch ${url} after ${retries} retries`,
      undefined,
      lastError,
    );
  }
}
