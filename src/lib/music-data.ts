export type Track = {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: string;
  gradient: string;
  coverUrl?: string;
  audioUrl?: string;
  language?: string;
  tempo?: string;
};

export function getCoverUrl(url?: string): string {
  if (!url) return "";
  if (url.startsWith("/api/proxy/image") || url.startsWith("data:") || url.startsWith("/")) {
    return url;
  }
  let secureUrl = url;
  if (url.startsWith("http://")) {
    secureUrl = url.replace("http://", "https://");
  }
  if (secureUrl.startsWith("http")) {
    return `/api/proxy/image?url=${encodeURIComponent(secureUrl)}`;
  }
  return secureUrl;
}

export function normalizeSongInfo(
  title?: string,
  artist?: string,
): { cleanTitle: string; cleanArtist: string; key: string } {
  const rawTitle = (title || "").trim();
  let rawArtist = (artist || "").trim();

  // Strip common YouTube uploader / topic / VEVO suffixes
  rawArtist = rawArtist
    .replace(/\s*-\s*topic$/i, "")
    .replace(/vevo$/i, "")
    .trim();

  // Extract primary artist if album name is appended via '—' or ' - '
  let primaryArtist = rawArtist;
  if (primaryArtist.includes("—") || primaryArtist.includes(" - ")) {
    primaryArtist = primaryArtist.split(/—|\s-\s/)[0].trim();
  }
  // Extract primary artist if comma or ampersand or ft/feat separated
  primaryArtist = primaryArtist.split(/[,&/]|feat\.|ft\./i)[0].trim();

  // Clean title: If title starts with Artist Name e.g. "Miley Cyrus - Flowers"
  let cleanTitle = rawTitle;
  if (
    (cleanTitle.includes("-") || cleanTitle.includes("—") || cleanTitle.includes(":")) &&
    primaryArtist
  ) {
    const parts = cleanTitle.split(/[-—:]/);
    if (parts.length >= 2) {
      const p0 = parts[0]
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "");
      const artNorm = primaryArtist.toLowerCase().replace(/[^a-z0-9]/g, "");
      if (p0 && artNorm && (p0.includes(artNorm) || artNorm.includes(p0))) {
        cleanTitle = parts.slice(1).join("-").trim();
      }
    }
  }

  // Strip audio/video/lyrics clutter
  cleanTitle = cleanTitle
    .replace(/\(official\s*(music\s*)?(video|audio|lyric|lyrics)?\)/gi, "")
    .replace(/\[official\s*(music\s*)?(video|audio|lyric|lyrics)?\]/gi, "")
    .replace(/\((hd|4k|audio|lyric|lyrics|remastered|video|single|version)\)/gi, "")
    .replace(/\[(hd|4k|audio|lyric|lyrics|remastered|video|single|version)\]/gi, "")
    .replace(/\(feat\..*?\)/gi, "")
    .replace(/\[feat\..*?\]/gi, "")
    .replace(/\(ft\..*?\)/gi, "")
    .replace(/\[ft\..*?\]/gi, "")
    .replace(/feat\..*/gi, "")
    .replace(/ft\..*/gi, "")
    .trim();

  const normTitle = cleanTitle
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\s+/g, " ")
    .trim();

  const normArtist = primaryArtist
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\s+/g, " ")
    .trim();

  const key = `${normTitle}::${normArtist}`;

  return {
    cleanTitle: cleanTitle || rawTitle,
    cleanArtist: primaryArtist || rawArtist,
    key,
  };
}

export type Album = {
  id: string;
  title: string;
  artist: string;
  year: string;
  gradient: string;
  tag?: string;
  coverUrl?: string;
};

export type Playlist = {
  id: string;
  title: string;
  subtitle: string;
  gradient: string;
  tracks?: number;
  coverUrl?: string;
};

const g = (a: string, b: string, c?: string) =>
  c
    ? `linear-gradient(135deg, ${a} 0%, ${b} 50%, ${c} 100%)`
    : `linear-gradient(135deg, ${a} 0%, ${b} 100%)`;

export const featuredAlbums: Album[] = [
  {
    id: "a1",
    title: "Saiyaara",
    artist: "Tanishk Bagchi, Faheem Abdullah",
    year: "2024",
    gradient: g("#f97316", "#dc2626"),
    tag: "Trending #1",
    coverUrl:
      "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/c6/6a/a3/c66aa366-4522-14b8-c629-7cfee5422fc0/Saiyaara_Album_Cover.jpg/600x600bb.jpg",
  },
  {
    id: "a2",
    title: "Brahmastra",
    artist: "Pritam & Arijit Singh",
    year: "2023",
    gradient: g("#ff6b35", "#f7931e"),
    tag: "Blockbuster",
    coverUrl:
      "https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/9f/13/ca/9f13ca3b-e533-03e0-f19a-f0aaa774581d/196589311191.jpg/600x600bb.jpg",
  },
  {
    id: "a3",
    title: "Jawan",
    artist: "Anirudh Ravichander",
    year: "2023",
    gradient: g("#e11d48", "#9333ea"),
    tag: "Chartbuster",
    coverUrl:
      "https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/1e/ff/32/1eff3216-190d-6fd9-8f68-acbba846e6ee/8903431956026_cover.jpg/600x600bb.jpg",
  },
  {
    id: "a4",
    title: "Animal",
    artist: "Vishal Mishra, Arijit Singh",
    year: "2023",
    gradient: g("#b91c1c", "#18181b"),
    tag: "Top Hit",
    coverUrl:
      "https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/db/ad/5e/dbad5e8b-0bee-d962-92d4-021c90e375ac/8902894362092_cover.jpg/600x600bb.jpg",
  },
  {
    id: "a5",
    title: "Making Memories",
    artist: "Karan Aujla",
    year: "2024",
    gradient: g("#eab308", "#ca8a04"),
    tag: "Punjabi Gold",
    coverUrl:
      "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/d3/08/bc/d308bc6a-20e1-6532-d933-35d1b429210e/5054197755538.jpg/600x600bb.jpg",
  },
  {
    id: "a6",
    title: "Starboy & After Hours",
    artist: "The Weeknd",
    year: "2024",
    gradient: g("#3a7bd5", "#3a6073"),
    tag: "Global Hit",
    coverUrl:
      "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/b5/92/bb/b592bb72-52e3-e756-9b26-9f56d08f47ab/16UMGIM67864.rgb.jpg/600x600bb.jpg",
  },
];

export const madeForYou: Playlist[] = [
  {
    id: "p1",
    title: "Bollywood Top 50",
    subtitle: "Arijit, Pritam, Shreya & more",
    gradient: g("#f97316", "#dc2626"),
    tracks: 50,
    coverUrl:
      "https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/9f/13/ca/9f13ca3b-e533-03e0-f19a-f0aaa774581d/196589311191.jpg/600x600bb.jpg",
  },
  {
    id: "p2",
    title: "Punjabi Heat",
    subtitle: "Karan Aujla, Diljit, Shubh",
    gradient: g("#eab308", "#ca8a04"),
    tracks: 45,
    coverUrl:
      "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/d3/08/bc/d308bc6a-20e1-6532-d933-35d1b429210e/5054197755538.jpg/600x600bb.jpg",
  },
  {
    id: "p3",
    title: "Monsoon Melodies",
    subtitle: "Soft romantic Hindi songs",
    gradient: g("#0c2340", "#5cbdb9"),
    tracks: 68,
    coverUrl:
      "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/c6/6a/a3/c66aa366-4522-14b8-c629-7cfee5422fc0/Saiyaara_Album_Cover.jpg/600x600bb.jpg",
  },
  {
    id: "p4",
    title: "Arijit Singh Essentials",
    subtitle: "All time hit romantic tracks",
    gradient: g("#0284c7", "#1e1b4b"),
    tracks: 40,
    coverUrl:
      "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/bb/23/ee/bb23eeed-0c35-4f1d-2b11-485622777ae4/8902894353007_cover.jpg/600x600bb.jpg",
  },
  {
    id: "p5",
    title: "Global Pop Hits",
    subtitle: "The Weeknd, Ed Sheeran, Dua Lipa",
    gradient: g("#ff6b6b", "#c44569"),
    tracks: 60,
    coverUrl:
      "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/a6/6e/bf/a66ebf79-5008-8948-b352-a790fc87446b/19UM1IM04638.rgb.jpg/600x600bb.jpg",
  },
];

export const stations = [
  {
    id: "s1",
    title: "Apex Radio",
    subtitle: "Hosted · Live now",
    gradient: g("#c4654a", "#e8a87c"),
    live: true,
  },
  {
    id: "s2",
    title: "Nightshift",
    subtitle: "House · Deep · Melodic",
    gradient: g("#0d1b2a", "#2dd4a8"),
    live: true,
  },
  {
    id: "s3",
    title: "Longform",
    subtitle: "Interviews & essays",
    gradient: g("#5c2018", "#e8b84a"),
    live: false,
  },
  {
    id: "s4",
    title: "Chamber Hour",
    subtitle: "Classical, curated",
    gradient: g("#f5f0e8", "#7d9b76"),
    live: false,
  },
];

export const genres = [
  {
    id: "g_ind",
    name: "Bollywood & Indian",
    gradient: g("#f97316", "#dc2626"),
    coverUrl:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "g_punj",
    name: "Punjabi Hits",
    gradient: g("#eab308", "#ca8a04"),
    coverUrl:
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "g9",
    name: "Pop",
    gradient: g("#ff758c", "#ff7eb3"),
    coverUrl:
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "g4",
    name: "Hip-Hop & Rap",
    gradient: g("#1a1a1a", "#e85d3a"),
    coverUrl:
      "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "g2",
    name: "Electronic & EDM",
    gradient: g("#0f1b3d", "#3b6fa0"),
    coverUrl:
      "https://images.unsplash.com/photo-1598387993441-a364f854c3e1?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "g6",
    name: "R&B & Soul",
    gradient: g("#c4654a", "#87a878"),
    coverUrl:
      "https://images.unsplash.com/photo-1525994886773-080587e161c2?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "g7",
    name: "Rock & Alternative",
    gradient: g("#2d3748", "#a0aec0"),
    coverUrl:
      "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "g3",
    name: "Jazz & Blues",
    gradient: g("#0d0d0d", "#c9a84c"),
    coverUrl:
      "https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "g5",
    name: "Classical & Acoustic",
    gradient: g("#f5f3ee", "#8b7355"),
    coverUrl:
      "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "g10",
    name: "Indie & Folk",
    gradient: g("#11998e", "#38ef7d"),
    coverUrl:
      "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "g8",
    name: "Ambient & Chill",
    gradient: g("#e8f0f8", "#6ba3c8"),
    coverUrl:
      "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "g11",
    name: "Latin & Reggaeton",
    gradient: g("#f857a6", "#ff5858"),
    coverUrl:
      "https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "g16",
    name: "Dance & Party",
    gradient: g("#f12711", "#f5af19"),
    coverUrl:
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "g13",
    name: "Metal & Hard Rock",
    gradient: g("#141e30", "#243b55"),
    coverUrl:
      "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=600&auto=format&fit=crop&q=80",
  },
];

export const topCharts: Track[] = [
  {
    id: "global_1",
    title: "Blinding Lights",
    artist: "The Weeknd",
    album: "After Hours",
    duration: "3:20",
    gradient: g("#00c6ff", "#0072ff"),
    coverUrl:
      "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/a6/6e/bf/a66ebf79-5008-8948-b352-a790fc87446b/19UM1IM04638.rgb.jpg/600x600bb.jpg",
    audioUrl: "/api/stream/resolve?q=Blinding%20Lights%20The%20Weeknd&id=global_1",
  },
  {
    id: "global_2",
    title: "As It Was",
    artist: "Harry Styles",
    album: "Harry's House",
    duration: "2:47",
    gradient: g("#f97316", "#db2777"),
    coverUrl:
      "https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/2a/19/fb/2a19fb85-2f70-9e44-f2a9-82abe679b88e/886449990061.jpg/600x600bb.jpg",
    audioUrl: "/api/stream/resolve?q=As%20It%20Was%20Harry%20Styles&id=global_2",
  },
  {
    id: "global_3",
    title: "Anti-Hero",
    artist: "Taylor Swift",
    album: "Midnights",
    duration: "3:20",
    gradient: g("#3b82f6", "#1e1b4b"),
    coverUrl:
      "https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/3d/01/f2/3d01f2e5-5a08-835f-3d30-d031720b2b80/22UM1IM07364.rgb.jpg/600x600bb.jpg",
    audioUrl: "/api/stream/resolve?q=Anti%20Hero%20Taylor%20Swift&id=global_3",
  },
  {
    id: "global_4",
    title: "Levitating",
    artist: "Dua Lipa",
    album: "Future Nostalgia",
    duration: "3:23",
    gradient: g("#ec4899", "#8b5cf6"),
    coverUrl:
      "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/6c/11/d6/6c11d681-aa3a-d59e-4c2e-f77e181026ab/190295092665.jpg/600x600bb.jpg",
    audioUrl: "/api/stream/resolve?q=Levitating%20Dua%20Lipa&id=global_4",
  },
  {
    id: "global_5",
    title: "Shape of You",
    artist: "Ed Sheeran",
    album: "÷ (Divide)",
    duration: "3:53",
    gradient: g("#10b981", "#047857"),
    coverUrl:
      "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/15/e6/e8/15e6e8a4-4190-6a8b-86c3-ab4a51b88288/190295851286.jpg/600x600bb.jpg",
    audioUrl: "/api/stream/resolve?q=Shape%20of%20You%20Ed%20Sheeran&id=global_5",
  },
  {
    id: "global_6",
    title: "Bad Guy",
    artist: "Billie Eilish",
    album: "When We All Fall Asleep, Where Do We Go?",
    duration: "3:14",
    gradient: g("#18181b", "#27272a"),
    coverUrl:
      "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/1a/37/d1/1a37d1b1-8508-54f2-f541-bf4e437dda76/19UMGIM05028.rgb.jpg/600x600bb.jpg",
    audioUrl: "/api/stream/resolve?q=Bad%20Guy%20Billie%20Eilish&id=global_6",
  },
  {
    id: "global_7",
    title: "Stay",
    artist: "The Kid LAROI, Justin Bieber",
    album: "F*CK LOVE 3",
    duration: "2:21",
    gradient: g("#06b6d4", "#3b82f6"),
    coverUrl:
      "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/89/59/6a/89596ab9-fa3c-8d08-4d95-a6450fa2013c/886449400515.jpg/600x600bb.jpg",
    audioUrl: "/api/stream/resolve?q=Stay%20The%20Kid%20LAROI%20Justin%20Bieber&id=global_7",
  },
  {
    id: "global_8",
    title: "Flowers",
    artist: "Miley Cyrus",
    album: "Endless Summer Vacation",
    duration: "3:20",
    gradient: g("#f59e0b", "#d97706"),
    coverUrl:
      "https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/8c/67/ff/8c67ff91-31c3-3fef-1884-ce3ec89f3af4/196589946874.jpg/600x600bb.jpg",
    audioUrl: "/api/stream/resolve?q=Flowers%20Miley%20Cyrus&id=global_8",
  },
  {
    id: "global_9",
    title: "Starboy",
    artist: "The Weeknd, Daft Punk",
    album: "Starboy",
    duration: "3:50",
    gradient: g("#0f172a", "#334155"),
    coverUrl:
      "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/b5/92/bb/b592bb72-52e3-e756-9b26-9f56d08f47ab/16UMGIM67864.rgb.jpg/600x600bb.jpg",
    audioUrl: "/api/stream/resolve?q=Starboy%20The%20Weeknd&id=global_9",
  },
];

export const libraryCategories = [
  { id: "l1", label: "Playlists", icon: "playlist" },
  { id: "l2", label: "Artists", icon: "artist" },
  { id: "l3", label: "Albums", icon: "album" },
  { id: "l4", label: "Songs", icon: "song" },
  { id: "l5", label: "Downloaded", icon: "download" },
  { id: "l6", label: "Made for You", icon: "spark" },
] as const;

export const recentlyAdded = madeForYou.concat([
  {
    id: "p9",
    title: "Golden Hour",
    subtitle: "Sun-soaked indie",
    gradient: g("#ff6b35", "#f7931e"),
  },
  { id: "p10", title: "Blue Room", subtitle: "Late-night jazz", gradient: g("#0c2340", "#1a4a6e") },
]);

export const trendingTracks: Track[] = [
  {
    id: "tr1",
    title: "Save Your Tears",
    artist: "The Weeknd",
    album: "After Hours",
    duration: "3:35",
    gradient: g("#dc2626", "#18181b"),
    coverUrl:
      "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/83/3a/f7/833af71b-2e0c-3303-24f5-8f5c546c073b/20UMGIM21167.rgb.jpg/600x600bb.jpg",
    audioUrl: "/api/stream/resolve?q=Save%20Your%20Tears%20The%20Weeknd&id=tr1",
  },
  {
    id: "tr2",
    title: "Cruel Summer",
    artist: "Taylor Swift",
    album: "Lover",
    duration: "2:58",
    gradient: g("#ec4899", "#f43f5e"),
    coverUrl:
      "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/49/3d/ab/493dab54-f920-9043-6181-80993b8116c9/19UMGIM53909.rgb.jpg/600x600bb.jpg",
    audioUrl: "/api/stream/resolve?q=Cruel%20Summer%20Taylor%20Swift&id=tr2",
  },
  {
    id: "tr3",
    title: "Watermelon Sugar",
    artist: "Harry Styles",
    album: "Fine Line",
    duration: "2:54",
    gradient: g("#f97316", "#eab308"),
    coverUrl:
      "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/2b/c4/c9/2bc4c9d4-3bc6-ab13-3f71-df0b89b173de/886448022213.jpg/600x600bb.jpg",
    audioUrl: "/api/stream/resolve?q=Watermelon%20Sugar%20Harry%20Styles&id=tr3",
  },
  {
    id: "tr4",
    title: "Peaches",
    artist: "Justin Bieber, Daniel Caesar, Giveon",
    album: "Justice",
    duration: "3:18",
    gradient: g("#f59e0b", "#ef4444"),
    coverUrl:
      "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/e0/92/da/e092da2d-9f6d-11dc-7843-2021e95a2b61/21UMGIM17518.rgb.jpg/600x600bb.jpg",
    audioUrl: "/api/stream/resolve?q=Peaches%20Justin%20Bieber&id=tr4",
  },
  {
    id: "tr5",
    title: "Vampire",
    artist: "Olivia Rodrigo",
    album: "GUTS",
    duration: "3:39",
    gradient: g("#881337", "#4c0519"),
    coverUrl:
      "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/08/9e/07/089e0799-b405-9e69-b648-e6a19df9879c/24UMGIM30485.rgb.jpg/600x600bb.jpg",
    audioUrl: "/api/stream/resolve?q=Vampire%20Olivia%20Rodrigo&id=tr5",
  },
  {
    id: "tr6",
    title: "Saiyaara",
    artist: "Tanishk Bagchi, Faheem Abdullah",
    album: "Saiyaara",
    duration: "4:12",
    gradient: g("#f97316", "#dc2626"),
    coverUrl:
      "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/c6/6a/a3/c66aa366-4522-14b8-c629-7cfee5422fc0/Saiyaara_Album_Cover.jpg/600x600bb.jpg",
    audioUrl: "/api/stream/resolve?q=Saiyaara%20Faheem%20Abdullah&id=tr6",
  },
  {
    id: "tr7",
    title: "Kesariya",
    artist: "Pritam, Arijit Singh",
    album: "Brahmastra",
    duration: "4:28",
    gradient: g("#ff6b35", "#f7931e"),
    coverUrl:
      "https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/9f/13/ca/9f13ca3b-e533-03e0-f19a-f0aaa774581d/196589311191.jpg/600x600bb.jpg",
    audioUrl: "/api/stream/resolve?q=Kesariya%20Arijit%20Singh&id=tr7",
  },
  {
    id: "tr8",
    title: "Softly",
    artist: "Karan Aujla, Ikky",
    album: "Making Memories",
    duration: "2:35",
    gradient: g("#eab308", "#ca8a04"),
    coverUrl:
      "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/d3/08/bc/d308bc6a-20e1-6532-d933-35d1b429210e/5054197755538.jpg/600x600bb.jpg",
    audioUrl: "/api/stream/resolve?q=Softly%20Karan%20Aujla&id=tr8",
  },
  {
    id: "tr9",
    title: "Starboy",
    artist: "The Weeknd, Daft Punk",
    album: "Starboy",
    duration: "3:50",
    gradient: g("#0f172a", "#334155"),
    coverUrl:
      "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/b5/92/bb/b592bb72-52e3-e756-9b26-9f56d08f47ab/16UMGIM67864.rgb.jpg/600x600bb.jpg",
    audioUrl: "/api/stream/resolve?q=Starboy%20The%20Weeknd&id=tr9",
  },
  {
    id: "tr10",
    title: "Apna Bana Le",
    artist: "Arijit Singh, Sachin-Jigar",
    album: "Bhediya",
    duration: "4:21",
    gradient: g("#0284c7", "#1e1b4b"),
    coverUrl:
      "https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/db/ad/5e/dbad5e8b-0bee-d962-92d4-021c90e375ac/8902894362092_cover.jpg/600x600bb.jpg",
    audioUrl: "/api/stream/resolve?q=Apna%20Bana%20Le%20Arijit%20Singh&id=tr10",
  },
];

export const currentTrack: Track = topCharts[0];

export const seeAllAlbums: Album[] = [
  ...featuredAlbums,
  {
    id: "sea1",
    title: "Silent Horizon",
    artist: "Luna Ray",
    year: "2024",
    gradient: "linear-gradient(135deg, #1e1b4b 0%, #4c1d95 100%)",
    coverUrl:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&auto=format&fit=crop&q=80",
  },
  {
    id: "sea2",
    title: "Synapses",
    artist: "Cipher",
    year: "2024",
    gradient: "linear-gradient(135deg, #0f172a 0%, #3b82f6 100%)",
    coverUrl:
      "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=500&auto=format&fit=crop&q=80",
  },
  {
    id: "sea3",
    title: "Liquid Echoes",
    artist: "Nyx",
    year: "2024",
    gradient: "linear-gradient(135deg, #065f46 0%, #059669 100%)",
    coverUrl:
      "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=500&auto=format&fit=crop&q=80",
  },
  {
    id: "sea4",
    title: "Slow Burn",
    artist: "The Void",
    year: "2024",
    gradient: "linear-gradient(135deg, #451a03 0%, #9a3412 100%)",
    coverUrl:
      "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=500&auto=format&fit=crop&q=80",
  },
];

export const jumpBackInTracks: Track[] = [
  {
    id: "lib-a1-t1",
    title: "Neon Horizons",
    artist: "Luna Ray",
    album: "Neon Horizons",
    duration: "3:45",

    gradient: "linear-gradient(135deg, #1e1b4b 0%, #31108f 50%, #701a75 100%)",
    coverUrl:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&h=150&fit=crop&q=80",
  },
  {
    id: "lib-a3-t1",
    title: "Soft Collapse",
    artist: "Nyx",
    album: "Soft Collapse",
    duration: "3:18",

    gradient: "linear-gradient(135deg, #0ea5e9 0%, #a855f7 50%, #f43f5e 100%)",
    coverUrl:
      "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=150&h=150&fit=crop&q=80",
  },
  {
    id: "lib-a2-t1",
    title: "Fractured",
    artist: "Cipher",
    album: "Fractured",
    duration: "4:12",

    gradient: "linear-gradient(135deg, #881337 0%, #be123c 40%, #0369a1 100%)",
    coverUrl:
      "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=150&h=150&fit=crop&q=80",
  },
  {
    id: "lib-a4-t1",
    title: "Slow Decay",
    artist: "The Void",
    album: "Slow Decay",
    duration: "3:56",

    gradient: "linear-gradient(135deg, #09090b 0%, #180828 60%, #4c1d95 100%)",
    coverUrl:
      "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=150&h=150&fit=crop&q=80",
  },
];

export const seeAllPlaylists: Playlist[] = [
  ...recentlyAdded,
  {
    id: "sp1",
    title: "Retro Wave",
    subtitle: "80s synths and neon nights",
    gradient: "linear-gradient(135deg, #4c0519 0%, #be123c 100%)",
  },
  {
    id: "sp2",
    title: "Forest Echoes",
    subtitle: "Acoustic and indie folk",
    gradient: "linear-gradient(135deg, #14532d 0%, #15803d 100%)",
  },
  {
    id: "sp3",
    title: "Lo-Fi Cafe",
    subtitle: "Chilled beats for study and work",
    gradient: "linear-gradient(135deg, #1c1917 0%, #44403c 100%)",
  },
];
