import { useEffect, useRef } from "react";
import { getAnalyser } from "@/lib/preview-audio";

export function AudioVisualizer({
  isPlaying,
  colorClass = "bg-accent-pink",
}: {
  isPlaying: boolean;
  colorClass?: string;
}) {
  const barsRef = useRef<(HTMLDivElement | null)[]>([]);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const bars = barsRef.current;

    // We sample a small number of channels
    const numBars = 4;
    const dataArray = new Uint8Array(16);

    const tick = () => {
      const analyser = getAnalyser();
      let hasRealAudio = false;
      if (analyser && isPlaying) {
        analyser.getByteFrequencyData(dataArray);
        let sum = 0;
        for (let j = 0; j < dataArray.length; j++) sum += dataArray[j];
        if (sum > 10) {
          hasRealAudio = true;
        }
      }

      // Compute procedural beat triggers as well
      const bpm = 124; // Standard driving electronic/pop BPM
      const beatDuration = 60 / bpm; // duration of one beat in seconds (~0.48s)
      const timeSec = performance.now() / 1000;

      // Calculate beat phase (0 to 1)
      const beatPhase = (timeSec % beatDuration) / beatDuration;
      // Thump effect: exponential decay for a crisp strike and smooth fade
      const kickThump = Math.exp(-beatPhase * 5);

      // Snare on off-beat (half phase offset)
      const snarePhase = ((timeSec + beatDuration / 2) % beatDuration) / beatDuration;
      const snareThump = Math.exp(-snarePhase * 6) * 0.7;

      // Fast hi-hat double time bounce (8th notes)
      const hhPhase = (timeSec % (beatDuration / 2)) / (beatDuration / 2);
      const hhThump = Math.exp(-hhPhase * 4) * 0.4;

      for (let i = 0; i < numBars; i++) {
        const bar = bars[i];
        if (!bar) continue;

        let value = 0;
        if (isPlaying) {
          if (hasRealAudio) {
            // We have real frequency data! Map bar index to frequency range
            const binIndex = Math.min(i * 3 + 1, dataArray.length - 1);
            const freqVal = dataArray[binIndex] / 255;

            // Boost bass frequencies (i === 0 or i === 1)
            const bassBoost = (dataArray[1] / 255) * 0.5;

            if (i === 0) {
              value = freqVal * 0.6 + bassBoost * 0.7;
            } else if (i === 1) {
              value = freqVal * 0.7 + bassBoost * 0.4 + snareThump * 0.15;
            } else if (i === 2) {
              value = freqVal * 0.8 + hhThump * 0.3;
            } else {
              value = freqVal * 0.9 + hhThump * 0.2;
            }
          } else {
            // Procedural physical beat-sync fallback
            if (i === 0) {
              // Thumping kick
              value = 0.2 + kickThump * 0.8 + Math.random() * 0.1;
            } else if (i === 1) {
              // Snare sync
              value = 0.15 + snareThump * 0.65 + kickThump * 0.15 + Math.random() * 0.08;
            } else if (i === 2) {
              // Rapid hi-hats
              value = 0.1 + hhThump * 0.7 + Math.random() * 0.1;
            } else {
              // Ambient melody wave
              const melody = 0.3 + Math.sin(timeSec * 2.5 + i) * 0.25 + Math.random() * 0.1;
              value = melody;
            }
          }
        } else {
          // Resting state
          value = 0.12;
        }

        // Apply visual gains & clamp
        const targetHeight = Math.max(0.12, Math.min(1, value * 1.35));

        // Read current scale for smooth interpolation
        const currentScale = parseFloat(bar.dataset.scale || "0.12");

        // Fast attack (rising), slower decay (falling) for professional physical movement
        const isRising = targetHeight > currentScale;
        const lerpFactor = isPlaying ? (isRising ? 0.6 : 0.2) : 0.12;
        const nextScale = currentScale + (targetHeight - currentScale) * lerpFactor;

        bar.style.transform = `scaleY(${nextScale})`;
        bar.dataset.scale = nextScale.toString();
      }

      animationRef.current = requestAnimationFrame(tick);
    };

    animationRef.current = requestAnimationFrame(tick);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying]);

  return (
    <div className="flex items-end gap-[2px] h-[13px] px-1 shrink-0" aria-hidden="true">
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          ref={(el) => {
            barsRef.current[i] = el;
          }}
          className={`w-[2.5px] h-full rounded-full ${colorClass} origin-bottom`}
          style={{
            transform: "scaleY(0.12)",
          }}
        />
      ))}
    </div>
  );
}
