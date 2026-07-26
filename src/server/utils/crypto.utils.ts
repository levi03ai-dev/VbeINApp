import crypto from "crypto";
import { FALLBACK_AUDIO_POOL } from "../constants/server.constants";

export function decryptSaavnMediaUrl(encryptedUrl: string): string {
  if (!encryptedUrl) return "";
  try {
    const key = Buffer.from("3858f622", "utf-8");
    const decipher = crypto.createDecipheriv("des-ecb", key, null);
    decipher.setAutoPadding(true);
    let decrypted = decipher.update(encryptedUrl, "base64", "utf-8");
    decrypted += decipher.final("utf-8");
    let mediaUrl = decrypted.trim();
    if (mediaUrl.startsWith("http://")) {
      mediaUrl = mediaUrl.replace("http://", "https://");
    }
    return mediaUrl;
  } catch {
    return "";
  }
}

export function getFallbackAudioForQuery(q: string): string {
  let hash = 0;
  for (let i = 0; i < q.length; i++) {
    hash = (hash * 31 + q.charCodeAt(i)) % 1000000007;
  }
  const index = Math.abs(hash) % FALLBACK_AUDIO_POOL.length;
  return FALLBACK_AUDIO_POOL[index];
}

export function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}
