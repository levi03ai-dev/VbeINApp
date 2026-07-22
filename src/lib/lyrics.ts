import { useState, useEffect } from "react";

export type LyricLine = { t: number; text: string };

// Shared demo lyrics used across all tracks (fictional catalog).
export const demoLyrics: LyricLine[] = [
  { t: 0.0, text: "The city hums a quiet blue" },
  { t: 0.06, text: "Streetlights bloom, we drift on through" },
  { t: 0.12, text: "Half a song, a stolen line" },
  { t: 0.18, text: "You keep the beat, I keep the time" },
  { t: 0.26, text: "" },
  { t: 0.3, text: "Hold on, don't let the morning break" },
  { t: 0.38, text: "Every echo is a chance we take" },
  { t: 0.46, text: "Cascade, cascade" },
  { t: 0.54, text: "" },
  { t: 0.58, text: "Neon rivers in your eyes" },
  { t: 0.66, text: "A slow parade of quiet skies" },
  { t: 0.74, text: "We were only passing through" },
  { t: 0.82, text: "And still the light remembers you" },
  { t: 0.9, text: "" },
  { t: 0.94, text: "Cascade, cascade" },
];

export function activeLyricIndex(progress: number, lyrics: LyricLine[] = demoLyrics): number {
  let idx = 0;
  for (let i = 0; i < lyrics.length; i++) {
    if (lyrics[i].t <= progress) idx = i;
    else break;
  }
  return idx;
}

function getSimpleHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 31 + str.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
}

function isIndianTrack(title: string, artist: string): boolean {
  const combined = (title + " " + artist).toLowerCase();
  const indianKeywords = [
    "arijit",
    "pritam",
    "tanishk",
    "sachin",
    "jigar",
    "badshah",
    "diljit",
    "karan",
    "aujla",
    "shreya",
    "jubin",
    "vishal",
    "mishra",
    "mithoon",
    "shubh",
    "anirudh",
    "shilpa",
    "siddhu",
    "b praak",
    "atif",
    "aslam",
    "tulsi",
    "neha",
    "kakkar",
    "armaan",
    "king",
    "raftaar",
    "saiyaara",
    "kesariya",
    "chaleya",
    "satranga",
    "pehle",
    "tum hi ho",
    "apna bana le",
    "raataan",
    "lutt",
    "dunki",
    "animal",
    "brahmastra",
    "jawan",
    "bhediya",
    "shershaah",
    "zara",
    "tere",
    "o maahi",
    "tauba",
    "softly",
    "one love",
    "bollywood",
    "hindi",
    "punjabi",
    "indian",
  ];
  return indianKeywords.some((kw) => combined.includes(kw));
}

function generateProceduralLyrics(title: string, artist: string, seed: number): LyricLine[] {
  const isIndian = isIndianTrack(title, artist);

  const introsEng = [
    "In the silence of the night",
    "Underneath the golden sun",
    "Where the waves meet the shore",
    "Through the static and the smoke",
    "In a city built of glass",
    "Walking down an empty road",
  ];
  const midlinesEng = [
    "I can feel your heartbeat close",
    "We are chasing after ghosts",
    "Every word we never said",
    "Time is slipping through our hands",
    "Spinning in a wild design",
  ];
  const chorusesEng = [
    `This is our song, '${title}' tonight`,
    `We'll keep holding on, under the light`,
    `Can you hear the beat of '${title}'?`,
    `Sinking in the sound, we find our way`,
  ];

  const introsInd = [
    "Haaye, dil ki baaton mein, teri hi yaad aaye",
    "Sunn zara, is khamoshi mein tera hi naam hai",
    "Tere bina ye raatein, kitni adhoori lagti hain",
    "Khwaabon ki is nagri mein, bas tera hi zikr hai",
    "Hawaon mein ghuli hai teri hi khushbu, haaye",
    "Pal pal har pal, tera hi khayal aata hai",
  ];
  const midlinesInd = [
    "Teri aankhon mein basi hai meri duniya saari",
    "Har lamha tujhko pukaare mera ye dil",
    "Dheere dheere se tera hua main, tu meri hui",
    "Basa loon tujhe apni saanso mein sanam",
    "Kuch to hai tere mere darmiyaan, sunn le zara",
  ];
  const chorusesInd = [
    `Tera mera rishta purana, '${title}' ki sadaa`,
    `Dil ko teri hi aazmaish hai, '${title}'`,
    `Tu hi meri manzil, tu hi mera raasta hai`,
    `Saiyaara re, tere bina jeena lagta hai sazaa`,
    `Rang jaun main tere ishq mein, haath lagaun`,
  ];
  const outrosInd = [
    "Aur ye sangeet dheere se tham jata hai...",
    "Tu jahan bhi rahe, khush rahe tu hamesha...",
    "Tere hi geet gata rahe mera ye dil...",
    "Bas ek meethi yaad banke reh gaya ye pal...",
  ];

  const intros = isIndian ? introsInd : introsEng;
  const midlines = isIndian ? midlinesInd : midlinesEng;
  const choruses = isIndian ? chorusesInd : chorusesEng;
  const outros = isIndian
    ? outrosInd
    : [
        "And the music fades away...",
        "Until we meet again in the sound.",
        "Listen close, you can hear the echo.",
      ];

  const lines: LyricLine[] = [];
  const idx1 = seed % intros.length;
  const idx2 = (seed >> 1) % midlines.length;
  const idx3 = (seed >> 2) % intros.length;
  const idx4 = (seed >> 3) % midlines.length;
  const ch1 = (seed >> 4) % choruses.length;
  const ch2 = (seed >> 5) % choruses.length;
  const out = (seed >> 6) % outros.length;

  lines.push({ t: 0.0, text: `[Music]` });
  lines.push({ t: 0.05, text: intros[idx1] });
  lines.push({ t: 0.12, text: midlines[idx2] });
  lines.push({ t: 0.2, text: intros[idx3] });
  lines.push({ t: 0.28, text: midlines[idx4] });
  lines.push({ t: 0.35, text: "" });
  lines.push({ t: 0.38, text: `[Chorus: ${artist}]` });
  lines.push({ t: 0.42, text: choruses[ch1] });
  lines.push({ t: 0.5, text: choruses[ch2] || choruses[(ch1 + 1) % choruses.length] });
  lines.push({
    t: 0.58,
    text: isIndian ? `Mausam zara sa rootha hua hai...` : `Sinking in the melody...`,
  });
  lines.push({ t: 0.65, text: "" });
  lines.push({ t: 0.7, text: intros[(idx1 + 2) % intros.length] });
  lines.push({ t: 0.78, text: midlines[(idx2 + 2) % midlines.length] });
  lines.push({ t: 0.85, text: "" });
  lines.push({ t: 0.88, text: `[Outro: ${artist}]` });
  lines.push({ t: 0.92, text: outros[out] });

  return lines;
}

export function getLyricsForTrack(
  track?: {
    title: string;
    artist: string;
    id: string;
  } | null,
): LyricLine[] {
  if (!track) return [];
  const title = (track.title || "").toLowerCase().trim();

  if (title.includes("saiyaara")) {
    return [
      { t: 0.0, text: "[Music]" },
      { t: 0.05, text: "Haaye, main mar hee jaun jo tujhko na paaun" },
      { t: 0.12, text: "Baaton mein teri main raatein bitaun" },
      { t: 0.2, text: "Hothon pe lamha-lamha hai naam tera, haaye" },
      { t: 0.28, text: "Tujhko hee gaaun main, tujhko pukaarun.uuunun" },
      { t: 0.35, text: "" },
      { t: 0.38, text: "Saiyaara, tu to badla nahi hai" },
      { t: 0.45, text: "Mausam zara sa rootha hua hai" },
      { t: 0.52, text: "Saiyaara, tu to badla nahi hai" },
      { t: 0.59, text: "Mausam zara sa rootha hua hai" },
      { t: 0.66, text: "(Hainn..eee)" },
      { t: 0.7, text: "Beete lamhon se duniya basa loon" },
      { t: 0.78, text: "Main to tere aansuon ka bana hoon" },
      { t: 0.86, text: "Tu jahan bhi rahe, khush rahe tu" },
      { t: 0.94, text: "Saiyaara..." },
    ];
  }

  if (title.includes("kesariya")) {
    return [
      { t: 0.0, text: "[Music Intro]" },
      { t: 0.06, text: "Mujhko kitna pyaar hai tumse, kitne hain armaan" },
      { t: 0.13, text: "Jaan meri tumko manoon, tum hi meri jaan" },
      { t: 0.21, text: "Kismat se tum humko mile ho, dil ki hai ye duaa" },
      { t: 0.29, text: "" },
      { t: 0.34, text: "Kesariya tera ishq hai piya, rang jaun jo main haath lagaun" },
      { t: 0.42, text: "Din beete saara teri fikr mein, rain saari tere sapno mein" },
      { t: 0.5, text: "Kesariya tera ishq hai piya, rang jaun jo main haath lagaun" },
      { t: 0.58, text: "" },
      { t: 0.64, text: "O resham ke dhaage se baandhe hue hain ye do dil" },
      { t: 0.72, text: "Tere sang hi meri subah hai, tere sang hi manzil" },
      { t: 0.8, text: "Kesariya tera ishq hai piya..." },
      { t: 0.9, text: "Haaye..." },
    ];
  }

  if (title.includes("chaleya")) {
    return [
      { t: 0.0, text: "[Upbeat Groove]" },
      { t: 0.06, text: "Ishq mein dil bana hai tera chaleya" },
      { t: 0.14, text: "Teri raahon mein main chaleya" },
      { t: 0.22, text: "Tu hai mera main hoon tera, chaleya..." },
      { t: 0.3, text: "" },
      { t: 0.36, text: "Adaayein teri, le gayi jaan meri" },
      { t: 0.44, text: "Kiye maine kitne hi vaade sanam" },
      { t: 0.52, text: "Saiyaan ve, saiyaan ve, tera hua main chaleya" },
      { t: 0.62, text: "Tere bin ab jee na paayein ek pal" },
      { t: 0.72, text: "Chaleya... chaleya..." },
    ];
  }

  if (title.includes("apna bana le")) {
    return [
      { t: 0.0, text: "[Acoustic Guitar]" },
      { t: 0.06, text: "Tu mera koi na hoke bhi kuch lage" },
      { t: 0.14, text: "Kiya re jo bhi tune, mujhe toh sab lage" },
      { t: 0.22, text: "Apna bana le mujhe, apna bana le mujhe..." },
      { t: 0.3, text: "" },
      { t: 0.36, text: "Dil ke nagar mein shehar tu mera" },
      { t: 0.44, text: "Subah ki dhoop mein saaya tu mera" },
      { t: 0.52, text: "Apna bana le mujhe, apna bana le mujhe..." },
      { t: 0.62, text: "Bahaane se hi sahi, apna bana le mujhe..." },
    ];
  }

  if (title.includes("tum hi ho")) {
    return [
      { t: 0.0, text: "[Piano Intro]" },
      { t: 0.06, text: "Hum tere bin ab reh nahi sakte" },
      { t: 0.14, text: "Tere bina kya wajood mera" },
      { t: 0.22, text: "Tujhse juda agar ho jayenge" },
      { t: 0.3, text: "Toh khud se hi ho jayenge judaa" },
      { t: 0.38, text: "" },
      { t: 0.44, text: "Kyunki tum hi ho, ab tum hi ho" },
      { t: 0.52, text: "Zindagi ab tum hi ho" },
      { t: 0.6, text: "Chain bhi, mera dard bhi" },
      { t: 0.68, text: "Meri aashiqui ab tum hi ho..." },
    ];
  }

  if (title.includes("tauba tauba")) {
    return [
      { t: 0.0, text: "[Upbeat Punjabi Beat]" },
      { t: 0.06, text: "Husn tera tauba tauba, kardi ae nakhre ni" },
      { t: 0.14, text: "Tere agge saare munde, paide ne wakhre ni" },
      { t: 0.22, text: "Tauba tauba re, tauba tauba re..." },
      { t: 0.3, text: "" },
      { t: 0.36, text: "Karan Aujla naam sun le, challe mera daur ni" },
      { t: 0.44, text: "Vekh vekh sanu kyon hundi tu bore ni" },
      { t: 0.54, text: "Dil le gayi sadda tu, husn di rani..." },
      { t: 0.65, text: "Tauba tauba, tauba tauba..." },
      { t: 0.78, text: "Tere bin geet saare lagde adhoore ne" },
      { t: 0.88, text: "Aa ke mil le sanu, sapne hone poore ne" },
    ];
  }

  if (title.includes("pehle bhi main")) {
    return [
      { t: 0.0, text: "[Guitar Intro]" },
      { t: 0.06, text: "Pehle bhi main tumse mila hoon" },
      { t: 0.14, text: "Pehli dafa hi milke laga" },
      { t: 0.22, text: "Kyun aasaani se tumse dil ye juda" },
      { t: 0.3, text: "" },
      { t: 0.36, text: "Aankhon mein dekha jabse hai tumko" },
      { t: 0.44, text: "Subah se shaam hone lagi" },
      { t: 0.52, text: "Pehle bhi main tumse mila hoon..." },
      { t: 0.62, text: "Kuch toh hai aisi baat jo hai dil ke paas..." },
      { t: 0.75, text: "Tum hi ho sab kuch mera..." },
      { t: 0.88, text: "Pehle bhi main..." },
    ];
  }

  if (title.includes("raataan lambiyan")) {
    return [
      { t: 0.0, text: "[Acoustic Intro]" },
      { t: 0.06, text: "Teri meri baaton ko, koyi na jaane" },
      { t: 0.14, text: "Teri meri raaton ko, koyi na jaane" },
      { t: 0.22, text: "Kaate kate na katte ye din-raat" },
      { t: 0.3, text: "" },
      { t: 0.36, text: "Kitte lambiyan lambiyan re raataan lambiyan" },
      { t: 0.44, text: "Bhool jaave tu vi saari duniya, re raataan" },
      { t: 0.52, text: "Tere bin dil lagda nahi, mera sohneya" },
      { t: 0.62, text: "Kitte lambiyan lambiyan..." },
      { t: 0.75, text: "Mera chain, meri neend le gaya tu..." },
      { t: 0.88, text: "Raataan lambiyan..." },
    ];
  }

  if (title.includes("satranga")) {
    return [
      { t: 0.0, text: "[Melodious Intro]" },
      { t: 0.06, text: "Satranga ye ishq tera, rang doon main dil ka kona" },
      { t: 0.14, text: "Tu mera hai saara ka saara, tujhko hi hai paana" },
      { t: 0.24, text: "Tere ishq mein dooba hoon main, rehta hoon juda..." },
      { t: 0.34, text: "Satranga re, satranga re..." },
      { t: 0.44, text: "Yeh ishq tera mera, sadiyon se chala..." },
    ];
  }

  if (title.includes("cascade")) {
    return [
      { t: 0.0, text: "The city hums a quiet blue" },
      { t: 0.06, text: "Streetlights bloom, we drift on through" },
      { t: 0.12, text: "Half a song, a stolen line" },
      { t: 0.18, text: "You keep the beat, I keep the time" },
      { t: 0.26, text: "" },
      { t: 0.3, text: "Hold on, don't let the morning break" },
      { t: 0.38, text: "Every echo is a chance we take" },
      { t: 0.46, text: "Cascade, cascade, we fall again" },
      { t: 0.54, text: "" },
      { t: 0.58, text: "Neon rivers in your eyes" },
      { t: 0.66, text: "A slow parade of quiet skies" },
      { t: 0.74, text: "We were only passing through" },
      { t: 0.82, text: "And still the light remembers you" },
      { t: 0.9, text: "" },
      { t: 0.94, text: "Cascade, cascade, into the deep end" },
    ];
  }

  const hash = getSimpleHash(track.title + track.artist);
  return generateProceduralLyrics(track.title, track.artist, hash);
}

export function useLyrics(
  track?: { title: string; artist: string; id: string } | null,
  durationInSeconds?: number,
): LyricLine[] {
  const [lyrics, setLyrics] = useState<LyricLine[]>(() => (track ? getLyricsForTrack(track) : []));

  useEffect(() => {
    if (!track) {
      setLyrics([]);
      return;
    }

    let active = true;
    const initialLyrics = getLyricsForTrack(track);
    setLyrics(initialLyrics);

    async function fetchRealLyrics() {
      if (!track) return;
      try {
        const cleanTitle = track.title.replace(/\([^)]*\)/g, "").trim();
        const cleanArtist = track.artist.split(",")[0].trim();
        const lrcUrl = `https://lrclib.net/api/get?track_name=${encodeURIComponent(cleanTitle)}&artist_name=${encodeURIComponent(cleanArtist)}`;
        const res = await fetch(lrcUrl);
        if (res.ok) {
          const data = await res.json();
          const dur = durationInSeconds || (data.duration ? Number(data.duration) : 210);

          if (data.syncedLyrics && active) {
            const lrcLines = data.syncedLyrics.split("\n");
            const parsed: LyricLine[] = [];
            for (const line of lrcLines) {
              const match = line.match(/\[(\d+):(\d+(?:\.\d+)?)\](.*)/);
              if (match) {
                const min = parseFloat(match[1]);
                const sec = parseFloat(match[2]);
                const text = match[3].trim();
                const totalSec = min * 60 + sec;
                const normT = Math.min(1, Math.max(0, totalSec / dur));
                if (text) {
                  parsed.push({ t: Number(normT.toFixed(3)), text });
                }
              }
            }
            if (parsed.length > 0 && active) {
              setLyrics(parsed);
              return;
            }
          }

          if (data.plainLyrics && active) {
            const lines = data.plainLyrics.split("\n").filter((l: string) => l.trim() !== "");
            const step = 0.9 / Math.max(1, lines.length);
            const formatted: LyricLine[] = lines.map((text: string, i: number) => ({
              t: Number((i * step).toFixed(3)),
              text: text.trim(),
            }));
            if (formatted.length > 0 && active) {
              setLyrics(formatted);
              return;
            }
          }
        }
      } catch {
        // Keep initial curated / procedural lyrics
      }
    }

    fetchRealLyrics();

    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [track?.id, track?.title, track?.artist, durationInSeconds]);

  return lyrics;
}
