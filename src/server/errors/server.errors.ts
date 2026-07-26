export enum ServerErrorCode {
  PROVIDER_UNAVAILABLE = "PROVIDER_UNAVAILABLE",
  STREAM_NOT_FOUND = "STREAM_NOT_FOUND",
  PROXY_ERROR = "PROXY_ERROR",
  NETWORK_ERROR = "NETWORK_ERROR",
  TIMEOUT_ERROR = "TIMEOUT_ERROR",
  VALIDATION_ERROR = "VALIDATION_ERROR",
  INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR",
}

export class ServerError extends Error {
  constructor(
    public code: ServerErrorCode,
    message: string,
    public statusCode: number = 500,
    public originalError?: unknown,
  ) {
    super(message);
    this.name = "ServerError";
  }
}
