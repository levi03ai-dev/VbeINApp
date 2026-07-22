export type Track = {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: string;
  gradient: string;
  coverUrl?: string;
  audioUrl?: string;
};

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
    coverUrl: "https://c.saavncdn.com/264/Saiyaara-Hindi-2024-20240212130005-500x500.jpg",
  },
  {
    id: "a2",
    title: "Brahmastra",
    artist: "Pritam & Arijit Singh",
    year: "2023",
    gradient: g("#ff6b35", "#f7931e"),
    tag: "Blockbuster",
    coverUrl:
      "https://c.saavncdn.com/871/Brahmastra-Original-Motion-Picture-Soundtrack-Hindi-2022-20221006155213-500x500.jpg",
  },
  {
    id: "a3",
    title: "Jawan",
    artist: "Anirudh Ravichander",
    year: "2023",
    gradient: g("#e11d48", "#9333ea"),
    tag: "Chartbuster",
    coverUrl: "https://c.saavncdn.com/026/Chaleya-From-Jawan-Hindi-2023-20230814124317-500x500.jpg",
  },
  {
    id: "a4",
    title: "Animal",
    artist: "Vishal Mishra, Arijit Singh",
    year: "2023",
    gradient: g("#b91c1c", "#18181b"),
    tag: "Top Hit",
    coverUrl: "https://c.saavncdn.com/092/ANIMAL-Hindi-2023-20231124191136-500x500.jpg",
  },
  {
    id: "a5",
    title: "Making Memories",
    artist: "Karan Aujla",
    year: "2024",
    gradient: g("#eab308", "#ca8a04"),
    tag: "Punjabi Gold",
    coverUrl:
      "https://c.saavncdn.com/282/Tauba-Tauba-From-Bad%20Newz-Hindi-2024-20240702111812-500x500.jpg",
  },
  {
    id: "a6",
    title: "Starboy & After Hours",
    artist: "The Weeknd",
    year: "2024",
    gradient: g("#3a7bd5", "#3a6073"),
    tag: "Global Hit",
    coverUrl:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&auto=format&fit=crop&q=80",
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
      "https://c.saavncdn.com/871/Brahmastra-Original-Motion-Picture-Soundtrack-Hindi-2022-20221006155213-500x500.jpg",
  },
  {
    id: "p2",
    title: "Punjabi Heat",
    subtitle: "Karan Aujla, Diljit, Shubh",
    gradient: g("#eab308", "#ca8a04"),
    tracks: 45,
    coverUrl:
      "https://c.saavncdn.com/282/Tauba-Tauba-From-Bad%20Newz-Hindi-2024-20240702111812-500x500.jpg",
  },
  {
    id: "p3",
    title: "Monsoon Melodies",
    subtitle: "Soft romantic Hindi songs",
    gradient: g("#0c2340", "#5cbdb9"),
    tracks: 68,
    coverUrl: "https://c.saavncdn.com/264/Saiyaara-Hindi-2024-20240212130005-500x500.jpg",
  },
  {
    id: "p4",
    title: "Arijit Singh Essentials",
    subtitle: "All time hit romantic tracks",
    gradient: g("#0284c7", "#1e1b4b"),
    tracks: 40,
    coverUrl: "https://c.saavncdn.com/430/Aashiqui-2-Hindi-2013-500x500.jpg",
  },
  {
    id: "p5",
    title: "Global Pop Hits",
    subtitle: "The Weeknd, Ed Sheeran, Dua Lipa",
    gradient: g("#ff6b6b", "#c44569"),
    tracks: 60,
    coverUrl:
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80",
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
      "https://images.unsplash.com/photo-1571266028243-3716f02d2d2e?w=600&auto=format&fit=crop&q=80",
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
    id: "ind_0",
    title: "Saiyaara",
    artist: "Tanishk Bagchi, Faheem Abdullah, Arslan Nizami",
    album: "Saiyaara",
    duration: "4:12",
    gradient: g("#f97316", "#dc2626"),
    coverUrl: "https://c.saavncdn.com/264/Saiyaara-Hindi-2024-20240212130005-500x500.jpg",
    audioUrl: "/api/stream/resolve?q=Saiyaara%20Tanishk%20Bagchi",
  },
  {
    id: "ind_1",
    title: "Kesariya",
    artist: "Pritam, Arijit Singh, Amitabh Bhattacharya",
    album: "Brahmastra",
    duration: "4:28",
    gradient: g("#ff6b35", "#f7931e"),
    coverUrl:
      "https://c.saavncdn.com/871/Brahmastra-Original-Motion-Picture-Soundtrack-Hindi-2022-20221006155213-500x500.jpg",
    audioUrl: "/api/stream/resolve?q=Kesariya%20Arijit%20Singh",
  },
  {
    id: "ind_2",
    title: "Chaleya",
    artist: "Anirudh Ravichander, Arijit Singh, Shilpa Rao",
    album: "Jawan",
    duration: "3:20",
    gradient: g("#e11d48", "#9333ea"),
    coverUrl: "https://c.saavncdn.com/026/Chaleya-From-Jawan-Hindi-2023-20230814124317-500x500.jpg",
    audioUrl: "/api/stream/resolve?q=Chaleya%20Arijit%20Singh",
  },
  {
    id: "ind_3",
    title: "Tum Hi Ho",
    artist: "Mithoon, Arijit Singh",
    album: "Aashiqui 2",
    duration: "4:22",
    gradient: g("#0284c7", "#1e1b4b"),
    coverUrl: "https://c.saavncdn.com/430/Aashiqui-2-Hindi-2013-500x500.jpg",
    audioUrl: "/api/stream/resolve?q=Tum%20Hi%20Ho%20Arijit%20Singh",
  },
  {
    id: "ind_4",
    title: "Apna Bana Le",
    artist: "Sachin-Jigar, Arijit Singh",
    album: "Bhediya",
    duration: "4:21",
    gradient: g("#0d9488", "#111827"),
    coverUrl:
      "https://c.saavncdn.com/821/Apna-Bana-Le-From-Bhediya-Hindi-2022-20221107123301-500x500.jpg",
    audioUrl: "/api/stream/resolve?q=Apna%20Bana%20Le%20Arijit%20Singh",
  },
  {
    id: "ind_5",
    title: "Raataan Lambiyan",
    artist: "Tanishk Bagchi, Jubin Nautiyal, Asees Kaur",
    album: "Shershaah",
    duration: "3:50",
    gradient: g("#c026d3", "#4c1d95"),
    coverUrl: "https://c.saavncdn.com/238/Shershaah-Hindi-2021-20210816174950-500x500.jpg",
    audioUrl: "/api/stream/resolve?q=Raataan%20Lambiyan%20Jubin",
  },
  {
    id: "ind_6",
    title: "Satranga",
    artist: "Arijit Singh, Shreyas Puranik",
    album: "Animal",
    duration: "4:31",
    gradient: g("#b91c1c", "#18181b"),
    coverUrl: "https://c.saavncdn.com/092/ANIMAL-Hindi-2023-20231124191136-500x500.jpg",
    audioUrl: "/api/stream/resolve?q=Satranga%20Animal%20Arijit",
  },
  {
    id: "ind_7",
    title: "Pehle Bhi Main",
    artist: "Vishal Mishra, Raj Shekhar",
    album: "Animal",
    duration: "4:10",
    gradient: g("#3f3f46", "#09090b"),
    coverUrl: "https://c.saavncdn.com/092/ANIMAL-Hindi-2023-20231124191136-500x500.jpg",
    audioUrl: "/api/stream/resolve?q=Pehle%20Bhi%20Main%20Vishal%20Mishra",
  },
  {
    id: "ind_8",
    title: "Tauba Tauba",
    artist: "Karan Aujla",
    album: "Bad Newz",
    duration: "3:28",
    gradient: g("#eab308", "#ca8a04"),
    coverUrl:
      "https://c.saavncdn.com/282/Tauba-Tauba-From-Bad%20Newz-Hindi-2024-20240702111812-500x500.jpg",
    audioUrl: "/api/stream/resolve?q=Tauba%20Tauba%20Karan%20Aujla",
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
    title: "Saiyaara",
    artist: "Tanishk Bagchi, Faheem Abdullah",
    album: "Saiyaara",
    duration: "4:12",
    gradient: g("#f97316", "#dc2626"),
    coverUrl: "https://c.saavncdn.com/264/Saiyaara-Hindi-2024-20240212130005-500x500.jpg",
    audioUrl: "/api/stream/resolve?q=Saiyaara%20Tanishk%20Bagchi",
  },
  {
    id: "tr2",
    title: "Kesariya",
    artist: "Pritam, Arijit Singh",
    album: "Brahmastra",
    duration: "4:28",
    gradient: g("#ff3d7f", "#ff9e5e", "#ffd66b"),
    coverUrl:
      "https://c.saavncdn.com/871/Brahmastra-Original-Motion-Picture-Soundtrack-Hindi-2022-20221006155213-500x500.jpg",
    audioUrl: "/api/stream/resolve?q=Kesariya%20Arijit%20Singh",
  },
  {
    id: "tr3",
    title: "Softly",
    artist: "Karan Aujla, Ikky",
    album: "Making Memories",
    duration: "2:35",
    gradient: g("#09090b", "#180828", "#4c1d95"),
    coverUrl: "https://c.saavncdn.com/004/Softly-Punjabi-2023-20230801171802-500x500.jpg",
    audioUrl: "/api/stream/resolve?q=Softly%20Karan%20Aujla",
  },
  {
    id: "tr4",
    title: "O Maahi",
    artist: "Arijit Singh, Pritam",
    album: "Dunki",
    duration: "3:53",
    gradient: g("#1e1b4b", "#31108f", "#701a75"),
    coverUrl:
      "https://c.saavncdn.com/023/Dunki-Drop-2-O-Maahi-Hindi-2023-20231211171008-500x500.jpg",
    audioUrl: "/api/stream/resolve?q=O%20Maahi%20Arijit%20Singh",
  },
  {
    id: "tr5",
    title: "Blinding Lights",
    artist: "The Weeknd",
    album: "After Hours",
    duration: "3:20",
    gradient: g("#00c6ff", "#0072ff"),
    coverUrl:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&auto=format&fit=crop&q=80",
    audioUrl: "/api/stream/resolve?q=Blinding%20Lights%20The%20Weeknd",
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
