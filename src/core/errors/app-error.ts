export enum ErrorCode {
  NETWORK_ERROR = "NETWORK_ERROR",
  TIMEOUT_ERROR = "TIMEOUT_ERROR",
  PROVIDER_UNAVAILABLE_ERROR = "PROVIDER_UNAVAILABLE_ERROR",
  STREAM_NOT_FOUND_ERROR = "STREAM_NOT_FOUND_ERROR",
  INVALID_RESPONSE_ERROR = "INVALID_RESPONSE_ERROR",
  AUDIO_PLAYBACK_ERROR = "AUDIO_PLAYBACK_ERROR",
  API_ERROR = "API_ERROR",
  UNKNOWN_ERROR = "UNKNOWN_ERROR",
}

export class AppError extends Error {
  constructor(
    public code: ErrorCode,
    message: string,
    public statusCode?: number,
    public originalError?: unknown,
  ) {
    super(message);
    this.name = "AppError";
    Object.setPrototypeOf(this, new.target.prototype);
  }

  getUserMessage(): string {
    switch (this.code) {
      case ErrorCode.NETWORK_ERROR:
        return "Network connection issue. Please check your internet connection.";
      case ErrorCode.TIMEOUT_ERROR:
        return "The request timed out while fetching music. Retrying...";
      case ErrorCode.PROVIDER_UNAVAILABLE_ERROR:
        return "Music provider is currently unavailable. Switching provider...";
      case ErrorCode.STREAM_NOT_FOUND_ERROR:
        return "Audio stream could not be found for this track.";
      case ErrorCode.INVALID_RESPONSE_ERROR:
        return "Received malformed data from music server.";
      case ErrorCode.AUDIO_PLAYBACK_ERROR:
        return "Failed to load audio stream. Attempting alternative source...";
      default:
        return this.message || "An unexpected error occurred.";
    }
  }
}

export class NetworkError extends AppError {
  constructor(message = "Network connection failed", originalError?: unknown) {
    super(ErrorCode.NETWORK_ERROR, message, 0, originalError);
    this.name = "NetworkError";
  }
}

export class TimeoutError extends AppError {
  constructor(message = "Request timed out", originalError?: unknown) {
    super(ErrorCode.TIMEOUT_ERROR, message, 408, originalError);
    this.name = "TimeoutError";
  }
}

export class ProviderUnavailableError extends AppError {
  constructor(
    public providerName: string,
    message = `Provider ${providerName} is currently unavailable`,
    originalError?: unknown,
  ) {
    super(ErrorCode.PROVIDER_UNAVAILABLE_ERROR, message, 503, originalError);
    this.name = "ProviderUnavailableError";
  }
}

export class StreamNotFoundError extends AppError {
  constructor(
    public trackIdOrTitle: string,
    message = `Audio stream not found for track: ${trackIdOrTitle}`,
    originalError?: unknown,
  ) {
    super(ErrorCode.STREAM_NOT_FOUND_ERROR, message, 404, originalError);
    this.name = "StreamNotFoundError";
  }
}

export class InvalidResponseError extends AppError {
  constructor(
    message = "Invalid or corrupted response from music service",
    originalError?: unknown,
  ) {
    super(ErrorCode.INVALID_RESPONSE_ERROR, message, 422, originalError);
    this.name = "InvalidResponseError";
  }
}

export class AudioPlaybackError extends AppError {
  constructor(
    public trackTitle: string,
    message = `Audio playback error for track: ${trackTitle}`,
    originalError?: unknown,
  ) {
    super(ErrorCode.AUDIO_PLAYBACK_ERROR, message, 500, originalError);
    this.name = "AudioPlaybackError";
  }
}

export class UnknownError extends AppError {
  constructor(message = "An unknown error occurred", originalError?: unknown) {
    super(ErrorCode.UNKNOWN_ERROR, message, 500, originalError);
    this.name = "UnknownError";
  }
}

export function normalizeError(err: unknown, defaultContext = "Operation failed"): AppError {
  if (err instanceof AppError) {
    return err;
  }
  if (err instanceof Error) {
    if (err.name === "AbortError") {
      return new TimeoutError("Request was aborted or timed out", err);
    }
    if (err.message.includes("Failed to fetch") || err.message.includes("NetworkError")) {
      return new NetworkError("Network error occurred while fetching data", err);
    }
    return new AppError(ErrorCode.UNKNOWN_ERROR, err.message, 500, err);
  }
  if (typeof err === "string") {
    return new AppError(ErrorCode.UNKNOWN_ERROR, err, 500);
  }
  return new UnknownError(`${defaultContext}: ${String(err)}`, err);
}
