// Lightweight synthesized track preview using Web Audio.
// Deterministic per-track "tone" derived from the id so each preview sounds different.

let ctx: AudioContext | null = null;
let active: { stop: () => void } | null = null;
let audioEl: HTMLAudioElement | null = null;
let analyser: AnalyserNode | null = null;
let mediaSource: MediaElementAudioSourceNode | null = null;

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const AC =
      (
        window as unknown as {
          AudioContext?: typeof AudioContext;
          webkitAudioContext?: typeof AudioContext;
        }
      ).AudioContext ??
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
  }
  return ctx;
}

export function getAnalyser(): AnalyserNode | null {
  const c = getCtx();
  if (!c) return null;
  if (!analyser) {
    analyser = c.createAnalyser();
    analyser.fftSize = 32; // Small fftSize is perfect for 5-8 bar minimalist visualizer
    analyser.connect(c.destination);
  }
  return analyser;
}

function seedFromId(id: string): number {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) | 0;
  return Math.abs(h);
}

const SCALE = [220, 246.94, 277.18, 293.66, 329.63, 369.99, 415.3, 440]; // A minor-ish

export function stopPreview() {
  if (audioEl) {
    audioEl.pause();
    audioEl.src = "";
    audioEl = null;
  }
  if (mediaSource) {
    mediaSource.disconnect();
    mediaSource = null;
  }
  if (active) {
    active.stop();
    active = null;
  }
}

export function playPreview(trackId: string, opts?: { seconds?: number; audioUrl?: string }) {
  const c = getCtx();
  if (!c) return;
  stopPreview();
  if (c.state === "suspended") c.resume().catch(() => {});

  if (opts?.audioUrl) {
    audioEl = new Audio(opts.audioUrl);
    audioEl.crossOrigin = "anonymous";
    audioEl.loop = false;
    audioEl.play().catch(console.error);
    return;
  }

  const seed = seedFromId(trackId);
  const rootIdx = seed % SCALE.length;
  const notes = [
    SCALE[rootIdx],
    SCALE[(rootIdx + 2) % SCALE.length],
    SCALE[(rootIdx + 4) % SCALE.length],
  ];

  const master = c.createGain();
  master.gain.value = 0;
  const filter = c.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.value = 1400;
  filter.Q.value = 0.7;
  filter.connect(master);

  // Route through the shared AnalyserNode if available
  const analyserNode = getAnalyser();
  if (analyserNode) {
    master.connect(analyserNode);
  } else {
    master.connect(c.destination);
  }

  const oscs: OscillatorNode[] = [];
  const gains: GainNode[] = [];
  notes.forEach((freq, i) => {
    const o = c.createOscillator();
    o.type = i === 0 ? "sawtooth" : "sine";
    o.frequency.value = freq / (i === 0 ? 2 : 1);
    const g = c.createGain();
    g.gain.value = i === 0 ? 0.18 : 0.12;
    o.connect(g).connect(filter);
    o.start();
    oscs.push(o);
    gains.push(g);
  });

  const now = c.currentTime;
  const dur = opts?.seconds ?? 12;
  master.gain.cancelScheduledValues(now);
  master.gain.setValueAtTime(0.0001, now);
  master.gain.exponentialRampToValueAtTime(0.18, now + 0.8);
  master.gain.setValueAtTime(0.18, now + dur - 1.2);
  master.gain.exponentialRampToValueAtTime(0.0001, now + dur);

  const stop = () => {
    try {
      const t = c.currentTime;
      master.gain.cancelScheduledValues(t);
      master.gain.setValueAtTime(master.gain.value, t);
      master.gain.exponentialRampToValueAtTime(0.0001, t + 0.15);
      oscs.forEach((o) => o.stop(t + 0.2));
    } catch {
      /* ignore */
    }
  };
  const timer = window.setTimeout(() => {
    if (active && active.stop === stop) active = null;
  }, dur * 1000);

  active = {
    stop: () => {
      window.clearTimeout(timer);
      stop();
    },
  };
}
