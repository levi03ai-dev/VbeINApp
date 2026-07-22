import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function parseDurationToSeconds(durationStr: string): number {
  if (!durationStr) return 180;
  const parts = durationStr.split(":");
  if (parts.length === 2) {
    return parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10);
  }
  return parseInt(durationStr, 10) || 180;
}

export function formatSeconds(sec: number): string {
  if (isNaN(sec) || sec < 0) return "0:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export interface ThemePreset {
  id: string;
  name: string;
  background: string;
  surface: string;
  surfaceElev: string;
  accent: string;
  accentPink: string;
  isLight?: boolean;
}

export const themes: ThemePreset[] = [
  {
    id: "midnight",
    name: "Midnight Velvet",
    background: "oklch(0.14 0.005 20)",
    surface: "oklch(0.19 0.007 20)",
    surfaceElev: "oklch(0.235 0.008 20)",
    accent: "oklch(0.68 0.22 12)",
    accentPink: "oklch(0.72 0.22 6)",
    isLight: false,
  },
  {
    id: "minimal-light",
    name: "Minimalist Ivory",
    background: "oklch(0.97 0.005 60)",
    surface: "oklch(0.94 0.005 60)",
    surfaceElev: "oklch(0.90 0.005 60)",
    accent: "oklch(0.18 0.005 60)",
    accentPink: "oklch(0.35 0.005 60)",
    isLight: true,
  },
  {
    id: "minimal-dark",
    name: "Minimalist Charcoal",
    background: "oklch(0.18 0.002 60)",
    surface: "oklch(0.23 0.002 60)",
    surfaceElev: "oklch(0.27 0.002 60)",
    accent: "oklch(0.92 0.002 60)",
    accentPink: "oklch(0.75 0.002 60)",
    isLight: false,
  },
  {
    id: "mono-stark",
    name: "Stark Mono",
    background: "oklch(0.02 0 0)",
    surface: "oklch(0.08 0 0)",
    surfaceElev: "oklch(0.14 0 0)",
    accent: "oklch(1 0 0)",
    accentPink: "oklch(0.85 0 0)",
    isLight: false,
  },
  {
    id: "sandstone",
    name: "Warm Sandstone",
    background: "oklch(0.94 0.012 80)",
    surface: "oklch(0.89 0.015 80)",
    surfaceElev: "oklch(0.84 0.018 80)",
    accent: "oklch(0.25 0.02 80)",
    accentPink: "oklch(0.45 0.03 80)",
    isLight: true,
  },
  {
    id: "oled",
    name: "OLED Pitch Black",
    background: "oklch(0 0 0)",
    surface: "oklch(0.12 0 0)",
    surfaceElev: "oklch(0.16 0 0)",
    accent: "oklch(0.7 0.25 340)",
    accentPink: "oklch(0.75 0.22 355)",
    isLight: false,
  },
];

export function applyTheme(themeId: string) {
  const theme = themes.find((t) => t.id === themeId) ?? themes[0];
  const root = document.documentElement;

  if (theme.isLight) {
    root.classList.remove("dark");
  } else {
    root.classList.add("dark");
  }

  root.style.setProperty("--background", theme.background);
  root.style.setProperty("--surface", theme.surface);
  root.style.setProperty("--surface-elev", theme.surfaceElev);
  root.style.setProperty("--card", theme.surface);
  root.style.setProperty("--popover", theme.surface);
  root.style.setProperty("--accent", theme.accent);
  root.style.setProperty("--accent-pink", theme.accentPink);

  if (theme.isLight) {
    root.style.setProperty("--foreground", "oklch(0.18 0.005 60)");
    root.style.setProperty("--border", "oklch(0 0 0 / 8%)");
    root.style.setProperty("--input", "oklch(0 0 0 / 6%)");
    root.style.setProperty("--primary", "oklch(0.18 0.005 60)");
    root.style.setProperty("--primary-foreground", "oklch(0.97 0.005 60)");
  } else {
    root.style.setProperty("--foreground", "oklch(0.985 0.002 20)");
    root.style.setProperty("--border", "oklch(1 0 0 / 8%)");
    root.style.setProperty("--input", "oklch(1 0 0 / 12%)");
    root.style.setProperty("--primary", "oklch(0.985 0.002 20)");
    root.style.setProperty("--primary-foreground", "oklch(0.14 0.005 20)");
  }

  // Extract and update the glow ring color variable
  root.style.setProperty("--ring", theme.accent.replace(")", " / 60%)"));
}
