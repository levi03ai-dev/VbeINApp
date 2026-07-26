import { ServerConfig } from "../config/server.config";

export class ServerLogger {
  static debug(message: string, ...args: unknown[]): void {
    if (!ServerConfig.isProduction) {
      console.debug(`[SERVER DEBUG] ${message}`, ...args);
    }
  }

  static info(message: string, ...args: unknown[]): void {
    console.info(`[SERVER INFO] ${message}`, ...args);
  }

  static warn(message: string, ...args: unknown[]): void {
    console.warn(`[SERVER WARN] ${message}`, ...args);
  }

  static error(message: string, ...args: unknown[]): void {
    console.error(`[SERVER ERROR] ${message}`, ...args);
  }
}
