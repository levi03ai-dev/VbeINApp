// Shared motion tokens for smooth, lazy transitions.
// Longer durations + gentle easing curves create a premium, unhurried feel.

export const ease = {
  // Smooth cubic-bezier — soft acceleration, long deceleration
  soft: [0.32, 0.72, 0, 1] as [number, number, number, number],
  // Apple-style out cubic
  out: [0.22, 1, 0.36, 1] as [number, number, number, number],
  // Very lazy — slow start, slow end
  lazy: [0.6, 0.05, 0.1, 1] as [number, number, number, number],
};

export const duration = {
  fast: 0.35,
  base: 0.55,
  slow: 0.75,
  lazy: 0.9,
};

// Springs tuned to feel weighty and smooth, not snappy.
export const spring = {
  soft: { type: "spring" as const, stiffness: 120, damping: 22, mass: 1 },
  gentle: { type: "spring" as const, stiffness: 90, damping: 20, mass: 1.1 },
  lazy: { type: "spring" as const, stiffness: 70, damping: 22, mass: 1.3 },
  bouncy: { type: "spring" as const, stiffness: 180, damping: 20, mass: 1 },
  sheet: { type: "spring" as const, stiffness: 140, damping: 26, mass: 1.1 },
};
