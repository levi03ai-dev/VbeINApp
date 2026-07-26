import { devanagariToRoman } from "devanagari-to-roman";

export function isDevanagari(text: string): boolean {
  return /[\u0900-\u097F]/.test(text);
}

export function formatLyricsToRoman(text: string): string {
  if (!text) return text;

  // Clean HTML
  let cleaned = text.replace(/<br\s*\/?>/gi, "\n");
  cleaned = cleaned.replace(/<[^>]+>/g, "");

  // HTML entities
  cleaned = cleaned
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/&#039;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");

  if (isDevanagari(cleaned)) {
    try {
      cleaned = devanagariToRoman(cleaned);
      // Clean up transliteration artifacts if any
    } catch (e) {
      console.warn("Devanagari to Roman failed:", e);
    }
  }

  return cleaned;
}
