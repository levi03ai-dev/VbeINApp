import { AppConfig } from "../config/app-config";

export class Logger {
  static debug(message: string, ...args: unknown[]): void {
    if (!AppConfig.isProduction) {
      console.debug(`[DEBUG] ${message}`, ...args);
    }
  }

  static info(message: string, ...args: unknown[]): void {
    console.info(`[INFO] ${message}`, ...args);
  }

  static warn(message: string, ...args: unknown[]): void {
    console.warn(`[WARN] ${message}`, ...args);
  }

  static error(message: string, ...args: unknown[]): void {
    console.error(`[ERROR] ${message}`, ...args);
  }
}
