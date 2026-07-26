export const AppConfig = {
  appName: "VibeIN",
  apiTimeoutMs: 15000,
  maxRetries: 3,
  cacheTtlMs: 5 * 60 * 1000, // 5 minutes
  defaultPageLimit: 20,
  isProduction: process.env.NODE_ENV === "production",
};
