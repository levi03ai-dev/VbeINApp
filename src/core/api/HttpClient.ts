/* eslint-disable @typescript-eslint/no-explicit-any */
import { AppError, NetworkError, TimeoutError, InvalidResponseError } from "../errors/app-error";
import { Logger } from "../logger/logger";

export interface HttpRequestOptions extends RequestInit {
  timeout?: number;
  retries?: number;
  retryDelay?: number;
}

export class HttpClient {
  static async get<T>(url: string, options: HttpRequestOptions = {}): Promise<T> {
    return this.request<T>(url, { ...options, method: "GET" });
  }

  static async post<T>(url: string, body: any, options: HttpRequestOptions = {}): Promise<T> {
    return this.request<T>(url, {
      ...options,
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });
  }

  static async request<T>(url: string, options: HttpRequestOptions): Promise<T> {
    const { timeout = 10000, retries = 3, retryDelay = 1000, ...fetchOptions } = options;

    let attempt = 0;

    while (attempt <= retries) {
      const controller = new AbortController();
      const id = setTimeout(() => controller.abort(), timeout);

      try {
        const response = await fetch(url, {
          ...fetchOptions,
          signal: controller.signal,
        });

        clearTimeout(id);

        if (!response.ok) {
          throw new NetworkError(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data as T;
      } catch (error: any) {
        clearTimeout(id);

        if (error.name === "AbortError") {
          if (attempt >= retries) throw new TimeoutError(`Request to ${url} timed out`);
        } else if (attempt >= retries) {
          if (error instanceof AppError) throw error;
          throw new NetworkError(`Failed to fetch ${url}`, error);
        }

        Logger.warn(`Request failed (attempt ${attempt + 1}/${retries + 1}): ${url}`);
        await new Promise((resolve) => setTimeout(resolve, retryDelay * Math.pow(2, attempt)));
        attempt++;
      }
    }

    throw new NetworkError("Unexpected end of request loop");
  }
}
