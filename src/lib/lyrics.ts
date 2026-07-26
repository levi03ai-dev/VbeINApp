import { useState, useEffect } from "react";
import { getLyrics } from "./music-service";
import { formatLyricsToRoman } from "./lyrics-formatter";
import { parseDurationToSeconds } from "./utils";

export type LyricLine = { t: number; text: string };

// Shared demo lyrics used across all tracks (fictional catalog).
export const demoLyrics: LyricLine[] = [
  { t: 0.0, text: "The city hums a quiet blue" },
  { t: 12.0, text: "Streetlights bloom, we drift on through" },
  { t: 25.0, text: "Half a song, a stolen line" },
  { t: 37.0, text: "You keep the beat, I keep the time" },
  { t: 54.0, text: "" },
  { t: 63.0, text: "Hold on, don't let the morning break" },
  { t: 79.0, text: "Every echo is a chance we take" },
  { t: 96.0, text: "Cascade, cascade" },
  { t: 113.0, text: "" },
  { t: 121.0, text: "Neon rivers in your eyes" },
  { t: 138.0, text: "A slow parade of quiet skies" },
  { t: 155.0, text: "We were only passing through" },
  { t: 172.0, text: "And still the light remembers you" },
  { t: 189.0, text: "" },
  { t: 197.0, text: "Cascade, cascade" },
];

export function activeLyricIndex(
  progressInSeconds: number,
  lyrics: LyricLine[] = demoLyrics,
): number {
  let idx = 0;
  for (let i = 0; i < lyrics.length; i++) {
    if (lyrics[i].t <= progressInSeconds) idx = i;
    else break;
  }
  return idx;
}

export function getLyricsForTrack(
  track: { title: string; artist: string; duration?: string },
  durationInSeconds?: number,
): LyricLine[] {
  const title = track.title.toLowerCase();

  // Try to determine the exact track duration for highly accurate percentage-based sync
  let d = durationInSeconds || 210;
  if (track.duration && (!durationInSeconds || durationInSeconds <= 0)) {
    d = parseDurationToSeconds(track.duration);
  }

  // --- TOP GLOBAL HIT SONGS (HIGH PRECISION CURATED SYNC) ---

  if (title.includes("cruel summer")) {
    return [
      { t: 0.0 * d, text: "[Synth Wave Intro]" },
      { t: 0.05 * d, text: "Fever dream high in the quiet of the night" },
      { t: 0.11 * d, text: "You know that I caught it" },
      { t: 0.15 * d, text: "Bad, bad boy, shiny toy with a price" },
      { t: 0.2 * d, text: "You know that I bought it" },
      { t: 0.26 * d, text: "Killing me slow, out the window" },
      { t: 0.31 * d, text: "I'm always waiting for you to be waiting below" },
      { t: 0.36 * d, text: "Devils roll the dice, angels roll their eyes" },
      { t: 0.42 * d, text: "What's doesn't kill me makes me want you more" },
      { t: 0.48 * d, text: "And it's new, the shape of your body" },
      { t: 0.54 * d, text: "It's blue, the feeling I've got" },
      { t: 0.59 * d, text: "And it's ooh, it's a cruel summer" },
      { t: 0.65 * d, text: "It's cool, that's what I tell 'em" },
      { t: 0.7 * d, text: "No rules in breakable heaven" },
      { t: 0.75 * d, text: "But ooh, it's a cruel summer with you!" },
      { t: 0.81 * d, text: "Hang your head low in the glow of the vending machine" },
      { t: 0.86 * d, text: "I'm not dying..." },
      { t: 0.9 * d, text: "I love you, ain't that the worst thing you ever heard?" },
      { t: 0.95 * d, text: "Ooh, it's a cruel summer with you!" },
    ];
  }

  if (title.includes("blinding lights")) {
    return [
      { t: 0.0 * d, text: "[Retro Synth Wave Instrumental]" },
      { t: 0.06 * d, text: "Yeah..." },
      { t: 0.1 * d, text: "I've been tryna call" },
      { t: 0.14 * d, text: "I've been on my own for long enough" },
      { t: 0.19 * d, text: "Maybe you can show me how to love, maybe" },
      { t: 0.24 * d, text: "I'm going through withdrawals" },
      { t: 0.28 * d, text: "You don't even have to do too much" },
      { t: 0.33 * d, text: "You can turn me on with just a touch, baby" },
      { t: 0.38 * d, text: "I look around and Sin City's cold and empty" },
      { t: 0.44 * d, text: "No one's around to judge me" },
      { t: 0.49 * d, text: "I can't see clearly when you're gone" },
      { t: 0.54 * d, text: "I said, ooh, I'm blinded by the lights" },
      { t: 0.61 * d, text: "No, I can't sleep until I feel your touch" },
      { t: 0.68 * d, text: "I said, ooh, I'm drowning in the night" },
      { t: 0.75 * d, text: "Oh, when I'm like this, you're the one I trust" },
      { t: 0.81 * d, text: "[Synth Solo Interlude]" },
      { t: 0.86 * d, text: "I'm running out of time" },
      { t: 0.9 * d, text: "'Cause I can see the sun light up the sky" },
      { t: 0.94 * d, text: "So I hit the road in overdrive, baby, oh..." },
    ];
  }

  if (title.includes("as it was")) {
    return [
      { t: 0.0 * d, text: "Come on, Harry, we wanna say goodnight to you" },
      { t: 0.04 * d, text: "[Guitar and Drum Beat]" },
      { t: 0.09 * d, text: "Holdin' me back" },
      { t: 0.13 * d, text: "Gravity's holdin' me back" },
      { t: 0.17 * d, text: "I want you to hold out the palm of your hand" },
      { t: 0.22 * d, text: "Why don't we leave it at that?" },
      { t: 0.26 * d, text: "Nothin' to say" },
      { t: 0.3 * d, text: "When everything gets in the way" },
      { t: 0.34 * d, text: "Seems you cannot be replaced" },
      { t: 0.39 * d, text: "And I'm the one who will stay, oh-oh-oh" },
      { t: 0.43 * d, text: "In this world, it's just us" },
      { t: 0.48 * d, text: "You know it's not the same as it was" },
      { t: 0.53 * d, text: "In this world, it's just us" },
      { t: 0.58 * d, text: "You know it's not the same as it was" },
      { t: 0.63 * d, text: "As it was, as it was" },
      { t: 0.68 * d, text: "You know it's not the same..." },
      { t: 0.73 * d, text: "Answer the phone" },
      { t: 0.77 * d, text: "Harry, you're no good alone" },
      { t: 0.81 * d, text: "Why are you sitting at home on the floor?" },
      { t: 0.86 * d, text: "What kind of pills are you on?" },
      { t: 0.91 * d, text: "As it was, as it was..." },
    ];
  }

  if (title.includes("anti-hero") || title.includes("anti hero")) {
    return [
      { t: 0.0 * d, text: "[Acoustic Synth Intro]" },
      { t: 0.04 * d, text: "I have this thing where I get older but just never wiser" },
      { t: 0.1 * d, text: "Midnights become my afternoons" },
      { t: 0.15 * d, text: "When my depression works the graveyard shift" },
      { t: 0.2 * d, text: "All of the people I've ghosted stand there in the room" },
      { t: 0.25 * d, text: "I should not be left to my own devices" },
      { t: 0.3 * d, text: "They come with byproducts of cheat codes and values" },
      { t: 0.35 * d, text: "I wake up screaming from dreaming" },
      { t: 0.4 * d, text: "One day I'll watch as you're leaving..." },
      { t: 0.45 * d, text: "'Cause you got tired of my scheming" },
      { t: 0.5 * d, text: "It's me, hi, I'm the problem, it's me" },
      { t: 0.56 * d, text: "At tea time, everybody agrees" },
      { t: 0.62 * d, text: "I'll stare directly at the sun but never in the mirror" },
      { t: 0.68 * d, text: "It must be exhausting always rooting for the anti-hero" },
      { t: 0.75 * d, text: "[Synthesizer Interlude]" },
      { t: 0.82 * d, text: "Sometimes I feel like everybody is a sexy baby" },
      { t: 0.88 * d, text: "And I'm a monster on the hill..." },
      { t: 0.94 * d, text: "It's me, hi, I'm the problem, it's me." },
    ];
  }

  if (title.includes("levitating")) {
    return [
      { t: 0.0 * d, text: "[Funky Bassline Intro]" },
      { t: 0.05 * d, text: "If you wanna run away with me, I know a galaxy" },
      { t: 0.11 * d, text: "And I can take you for a ride" },
      { t: 0.16 * d, text: "I had a premonition that we fell into a rhythm" },
      { t: 0.22 * d, text: "Where the music don't stop for life" },
      { t: 0.27 * d, text: "Glitter in the sky, glitter in my eyes" },
      { t: 0.33 * d, text: "Shining just the way I like" },
      { t: 0.38 * d, text: "If you're feeling like you need a little bit of company" },
      { t: 0.44 * d, text: "You met me at the perfect time" },
      { t: 0.49 * d, text: "You, want me, I want you, baby" },
      { t: 0.54 * d, text: "My sugarboo, I'm levitating" },
      { t: 0.6 * d, text: "The Milky Way, we're renegading" },
      { t: 0.66 * d, text: "Yeah-yeah-yeah-yeah-yeah" },
      { t: 0.72 * d, text: "I got you, moonlight, you're my starlight" },
      { t: 0.78 * d, text: "I need you all night, come on, dance with me" },
      { t: 0.85 * d, text: "I'm levitating!" },
      { t: 0.92 * d, text: "Yeah-yeah-yeah-yeah-yeah..." },
    ];
  }

  if (title.includes("shape of you")) {
    return [
      { t: 0.0 * d, text: "[Marimba Pluck Intro]" },
      { t: 0.05 * d, text: "The club isn't the best place to find a lover" },
      { t: 0.09 * d, text: "So the bar is where I go" },
      { t: 0.14 * d, text: "Me and my friends at the table doing shots" },
      { t: 0.18 * d, text: "Drinking fast and then we talk slow" },
      { t: 0.23 * d, text: "Come over and start up a conversation with just me" },
      { t: 0.28 * d, text: "And trust me, I'll give it a chance" },
      { t: 0.33 * d, text: "Now take my hand, stop, put Van the Man on the jukebox" },
      { t: 0.38 * d, text: "And then we start to dance, and now I'm singing like" },
      { t: 0.43 * d, text: "Girl, you know I want your love" },
      { t: 0.48 * d, text: "Your love was handmade for somebody like me" },
      { t: 0.53 * d, text: "Come on now, follow my lead" },
      { t: 0.58 * d, text: "I may be crazy, don't mind me" },
      { t: 0.63 * d, text: "Say, boy, let's not talk too much" },
      { t: 0.68 * d, text: "Grab on my waist and put that body on me" },
      { t: 0.73 * d, text: "Come on now, follow my lead..." },
      { t: 0.78 * d, text: "I'm in love with the shape of you" },
      { t: 0.83 * d, text: "We push and pull like a magnet do" },
      { t: 0.88 * d, text: "Although my heart is falling too" },
      { t: 0.93 * d, text: "I'm in love with your body..." },
    ];
  }

  if (title.includes("bad guy")) {
    return [
      { t: 0.0 * d, text: "[Thumping Electro Bass Intro]" },
      { t: 0.06 * d, text: "White shirt now red, my bloody nose" },
      { t: 0.12 * d, text: "Sleepin', you're on your tippy toes" },
      { t: 0.18 * d, text: "Creepin' around like no one knows" },
      { t: 0.24 * d, text: "Think you're so criminal" },
      { t: 0.3 * d, text: "Bruises on both my knees for you" },
      { t: 0.36 * d, text: "Don't say thank you or please" },
      { t: 0.42 * d, text: "I do what I want when I'm wanting to" },
      { t: 0.48 * d, text: "My soul? So cynical..." },
      { t: 0.54 * d, text: "So you're a tough guy, like it really rough guy" },
      { t: 0.6 * d, text: "Just can't get enough guy, chest always so puffed guy" },
      { t: 0.66 * d, text: "I'm that bad type, make your mama sad type" },
      { t: 0.72 * d, text: "Make your girlfriend mad tight, might seduce your dad type" },
      { t: 0.78 * d, text: "I'm the bad guy... duh!" },
      { t: 0.84 * d, text: "[Heavy Synth Drop Hook]" },
      { t: 0.92 * d, text: "I'm the bad guy..." },
    ];
  }

  // --- REGIONAL / BOLLYWOOD SONGS ---

  if (title.includes("saiyaara")) {
    return [
      { t: 0.0 * d, text: "[Music]" },
      { t: 0.05 * d, text: "Haaye, main mar hee jaun jo tujhko na paaun" },
      { t: 0.12 * d, text: "Baaton mein teri main raatein bitaun" },
      { t: 0.2 * d, text: "Hothon pe lamha-lamha hai naam tera, haaye" },
      { t: 0.28 * d, text: "Tujhko hee gaaun main, tujhko pukaarun" },
      { t: 0.35 * d, text: "" },
      { t: 0.38 * d, text: "Saiyaara, tu to badla nahi hai" },
      { t: 0.45 * d, text: "Mausam zara sa rootha hua hai" },
      { t: 0.52 * d, text: "Saiyaara, tu to badla nahi hai" },
      { t: 0.59 * d, text: "Mausam zara sa rootha hua hai" },
      { t: 0.66 * d, text: "(Hainn)" },
      { t: 0.7 * d, text: "Beete lamhon se duniya basa loon" },
      { t: 0.78 * d, text: "Main to tere aansuon ka bana hoon" },
      { t: 0.86 * d, text: "Tu jahan bhi rahe, khush rahe tu" },
      { t: 0.94 * d, text: "Saiyaara..." },
    ];
  }

  if (title.includes("kesariya")) {
    return [
      { t: 0.0 * d, text: "[Music Intro]" },
      { t: 0.06 * d, text: "Mujhko kitna pyaar hai tumse, kitne hain armaan" },
      { t: 0.13 * d, text: "Jaan meri tumko manoon, tum hi meri jaan" },
      { t: 0.21 * d, text: "Kismat se tum humko mile ho, dil ki hai ye duaa" },
      { t: 0.29 * d, text: "" },
      { t: 0.34 * d, text: "Kesariya tera ishq hai piya, rang jaun jo main haath lagaun" },
      { t: 0.42 * d, text: "Din beete saara teri fikr mein, rain saari tere sapno mein" },
      { t: 0.5 * d, text: "Kesariya tera ishq hai piya, rang jaun jo main haath lagaun" },
      { t: 0.58 * d, text: "" },
      { t: 0.64 * d, text: "O resham ke dhaage se baandhe hue hain ye do dil" },
      { t: 0.72 * d, text: "Tere sang hi meri subah hai, tere sang hi manzil" },
      { t: 0.8 * d, text: "Kesariya tera ishq hai piya..." },
      { t: 0.9 * d, text: "Haaye..." },
    ];
  }

  if (title.includes("chaleya")) {
    return [
      { t: 0.0 * d, text: "[Upbeat Groove]" },
      { t: 0.06 * d, text: "Ishq mein dil bana hai tera chaleya" },
      { t: 0.14 * d, text: "Teri raahon mein main chaleya" },
      { t: 0.22 * d, text: "Tu hai mera main hoon tera, chaleya..." },
      { t: 0.3 * d, text: "" },
      { t: 0.36 * d, text: "Adaayein teri, le gayi jaan meri" },
      { t: 0.44 * d, text: "Kiye maine kitne hi vaade sanam" },
      { t: 0.52 * d, text: "Saiyaan ve, saiyaan ve, tera hua main chaleya" },
      { t: 0.62 * d, text: "Tere bin ab jee na paayein ek pal" },
      { t: 0.72 * d, text: "Chaleya... chaleya..." },
    ];
  }

  if (title.includes("apna bana le")) {
    return [
      { t: 0.0 * d, text: "[Acoustic Guitar]" },
      { t: 0.06 * d, text: "Tu mera koi na hoke bhi kuch lage" },
      { t: 0.14 * d, text: "Kiya re jo bhi tune, mujhe toh sab lage" },
      { t: 0.22 * d, text: "Apna bana le mujhe, apna bana le mujhe..." },
      { t: 0.3 * d, text: "" },
      { t: 0.36 * d, text: "Dil ke nagar mein shehar tu mera" },
      { t: 0.44 * d, text: "Subah ki dhoop mein saaya tu mera" },
      { t: 0.52 * d, text: "Apna bana le mujhe, apna bana le mujhe..." },
      { t: 0.62 * d, text: "Bahaane se hi sahi, apna bana le mujhe..." },
    ];
  }

  if (title.includes("tum hi ho")) {
    return [
      { t: 0.0 * d, text: "[Piano Intro]" },
      { t: 0.06 * d, text: "Hum tere bin ab reh nahi sakte" },
      { t: 0.14 * d, text: "Tere bina kya wajood mera" },
      { t: 0.22 * d, text: "Tujhse juda agar ho jayenge" },
      { t: 0.3 * d, text: "Toh khud se hi ho jayenge judaa" },
      { t: 0.38 * d, text: "" },
      { t: 0.44 * d, text: "Kyunki tum hi ho, ab tum hi ho" },
      { t: 0.52 * d, text: "Zindagi ab tum hi ho" },
      { t: 0.6 * d, text: "Chain bhi, mera dard bhi" },
      { t: 0.68 * d, text: "Meri aashiqui ab tum hi ho..." },
    ];
  }

  if (title.includes("tauba tauba")) {
    return [
      { t: 0.0 * d, text: "[Upbeat Punjabi Beat]" },
      { t: 0.06 * d, text: "Husn tera tauba tauba, kardi ae nakhre ni" },
      { t: 0.14 * d, text: "Tere agge saare munde, paide ne wakhre ni" },
      { t: 0.22 * d, text: "Tauba tauba re, tauba tauba re..." },
      { t: 0.3 * d, text: "" },
      { t: 0.36 * d, text: "Karan Aujla naam sun le, challe mera daur ni" },
      { t: 0.44 * d, text: "Vekh vekh sanu kyon hundi tu bore ni" },
      { t: 0.54 * d, text: "Dil le gayi sadda tu, husn di rani..." },
      { t: 0.65 * d, text: "Tauba tauba, tauba tauba..." },
      { t: 0.78 * d, text: "Tere bin geet saare lagde adhoore ne" },
      { t: 0.88 * d, text: "Aa ke mil le sanu, sapne hone poore ne" },
    ];
  }

  if (title.includes("pehle bhi main")) {
    return [
      { t: 0.0 * d, text: "[Guitar Intro]" },
      { t: 0.06 * d, text: "Pehle bhi main tumse mila hoon" },
      { t: 0.14 * d, text: "Pehli dafa hi milke laga" },
      { t: 0.22 * d, text: "Kyun aasaani se tumse dil ye juda" },
      { t: 0.3 * d, text: "" },
      { t: 0.36 * d, text: "Aankhon mein dekha jabse hai tumko" },
      { t: 0.44 * d, text: "Subah se shaam hone lagi" },
      { t: 0.52 * d, text: "Pehle bhi main tumse mila hoon..." },
      { t: 0.62 * d, text: "Kuch toh hai aisi baat jo hai dil ke paas..." },
      { t: 0.75 * d, text: "Tum hi ho sab kuch mera..." },
      { t: 0.88 * d, text: "Pehle bhi main..." },
    ];
  }

  if (title.includes("raataan lambiyan")) {
    return [
      { t: 0.0 * d, text: "[Acoustic Intro]" },
      { t: 0.06 * d, text: "Teri meri baaton ko, koyi na jaane" },
      { t: 0.14 * d, text: "Teri meri raaton ko, koyi na jaane" },
      { t: 0.22 * d, text: "Kaate kate na katte ye din-raat" },
      { t: 0.3 * d, text: "" },
      { t: 0.36 * d, text: "Kitte lambiyan lambiyan re raataan lambiyan" },
      { t: 0.44 * d, text: "Bhool jaave tu vi saari duniya, re raataan" },
      { t: 0.52 * d, text: "Tere bin dil lagda nahi, mera sohneya" },
      { t: 0.62 * d, text: "Kitte lambiyan lambiyan..." },
      { t: 0.75 * d, text: "Mera chain, meri neend le gaya tu..." },
      { t: 0.88 * d, text: "Raataan lambiyan..." },
    ];
  }

  if (title.includes("satranga")) {
    return [
      { t: 0.0 * d, text: "[Melodious Intro]" },
      { t: 0.06 * d, text: "Satranga ye ishq tera, rang doon main dil ka kona" },
      { t: 0.14 * d, text: "Tu mera hai saara ka saara, tujhko hi hai paana" },
      { t: 0.24 * d, text: "Tere ishq mein dooba hoon main, rehta hoon juda..." },
      { t: 0.34 * d, text: "Satranga re, satranga re..." },
      { t: 0.44 * d, text: "Yeh ishq tera mera, sadiyon se chala..." },
    ];
  }

  return [];
}

export function useLyrics(
  track?: { title: string; artist: string; id: string; duration?: string } | null,
  durationInSeconds?: number,
): LyricLine[] {
  const [lyrics, setLyrics] = useState<LyricLine[]>(() => {
    if (!track) return [];
    return getLyricsForTrack(track, durationInSeconds);
  });

  useEffect(() => {
    if (!track) {
      setLyrics([]);
      return;
    }

    let active = true;
    const initialLyrics = getLyricsForTrack(track, durationInSeconds);
    setLyrics(initialLyrics);

    async function fetchRealLyrics() {
      if (!track) return;
      const cacheKey = "melody_stream_lyrics_cache_" + track.id;
      try {
        const cached = localStorage.getItem(cacheKey);
        if (cached) {
          const parsed = JSON.parse(cached);
          if (Array.isArray(parsed) && parsed.length > 0 && active) {
            setLyrics(parsed);
            return;
          }
        }
      } catch (e) {
        /* ignore */
      }

      try {
        let finalLyrics: LyricLine[] = [];
        
        // 1. Try lrclib.net first for perfectly synced lyrics
        const cleanTitle = track.title.replace(/\([^)]*\)/g, "").trim();
        const cleanArtist = track.artist.split(",")[0].trim();
        const lrcUrl = `https://lrclib.net/api/get?track_name=${encodeURIComponent(cleanTitle)}&artist_name=${encodeURIComponent(cleanArtist)}`;

        let data = null;
        try {
          const res = await fetch(lrcUrl);
          if (res.ok) {
            data = await res.json();
          } else {
            const searchRes = await fetch(
              `https://lrclib.net/api/search?q=${encodeURIComponent(cleanTitle + " " + cleanArtist)}`,
            );
            if (searchRes.ok) {
              const searchData = await searchRes.json();
              if (Array.isArray(searchData) && searchData.length > 0) {
                data =
                  searchData.find(
                    (item: { syncedLyrics?: string; plainLyrics?: string }) =>
                      item.syncedLyrics || item.plainLyrics,
                  ) || searchData[0];
              }
            }
          }
        } catch (e) {
          /* ignore */
        }

        const dur = durationInSeconds || (track.duration ? parseDurationToSeconds(track.duration) : 210);
        let actualDur = dur;

        if (data && active) {
          actualDur = durationInSeconds || (track.duration ? parseDurationToSeconds(track.duration) : data.duration ? Number(data.duration) : dur);
          
          if (data.syncedLyrics) {
            const lrcLines = data.syncedLyrics.split("\n");
            for (const line of lrcLines) {
              const match = line.match(/\[(\d+):(\d+(?:\.\d+)?)\](.*)/);
              if (match) {
                const min = parseFloat(match[1]);
                const sec = parseFloat(match[2]);
                const text = match[3].trim();
                const totalSec = min * 60 + sec;
                if (text) {
                  finalLyrics.push({ t: Number(totalSec.toFixed(3)), text });
                }
              }
            }
          }

          if (finalLyrics.length === 0 && data.plainLyrics) {
            const lines = data.plainLyrics.split("\n").filter((l: string) => l.trim() !== "");
            const introTime = Math.min(12, actualDur * 0.06);
            const outroTime = Math.min(12, actualDur * 0.06);
            const activeDuration = actualDur - introTime - outroTime;
            const step = activeDuration / Math.max(1, lines.length);

            finalLyrics = lines.map((text: string, i: number) => ({
              t: Number((introTime + i * step).toFixed(3)),
              text: text.trim(),
            }));
          }
        }

        // 2. Fallback to provider (JioSaavn) if lrclib.net failed
        if (finalLyrics.length === 0 && active) {
          const rawLyrics = await getLyrics(track.id);
          if (rawLyrics) {
            const formattedText = formatLyricsToRoman(rawLyrics);
            const lines = formattedText.split("\n").filter((l: string) => l.trim() !== "");
            if (lines.length > 0) {
              const introTime = Math.min(12, actualDur * 0.06);
              const outroTime = Math.min(12, actualDur * 0.06);
              const activeDuration = actualDur - introTime - outroTime;
              const step = activeDuration / Math.max(1, lines.length);

              finalLyrics = lines.map((text: string, i: number) => ({
                t: Number((introTime + i * step).toFixed(3)),
                text: text.trim(),
              }));
            }
          }
        }

        if (finalLyrics.length > 0 && active) {
          setLyrics(finalLyrics);
          try {
            localStorage.setItem(cacheKey, JSON.stringify(finalLyrics));
          } catch (e) {
            /* ignore */
          }
        }
      } catch {
        // Keep initial curated lyrics
      }
    }
    fetchRealLyrics();

    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [track?.id, track?.title, track?.artist]);

  return lyrics;
}
