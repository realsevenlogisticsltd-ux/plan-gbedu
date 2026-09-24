"use client";

import confetti from "canvas-confetti";

export function fireCelebrationConfetti() {
  const defaults = { zIndex: 9999, disableForReducedMotion: true };
  confetti({
    ...defaults,
    particleCount: 120,
    spread: 75,
    origin: { x: 0.5, y: 0.45 },
    colors: ["#800020", "#6D28D9", "#D4AF37", "#F59E0B", "#FDFBF7"],
  });
  confetti({
    ...defaults,
    particleCount: 60,
    angle: 60,
    spread: 60,
    origin: { x: 0, y: 0.7 },
    colors: ["#D4AF37", "#800020"],
  });
  confetti({
    ...defaults,
    particleCount: 60,
    angle: 120,
    spread: 60,
    origin: { x: 1, y: 0.7 },
    colors: ["#D4AF37", "#6D28D9"],
  });
}
