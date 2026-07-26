export const ServerConfig = {
  requestTimeoutMs: 3500,
  proxyTimeoutMs: 15000,
  maxRetries: 2,
  cacheTtlMs: 5 * 60 * 1000, // 5 minutes
  isProduction: process.env.NODE_ENV === "production",
  jiosaavnApiUrl: "https://www.jiosaavn.com/api.php",
};
