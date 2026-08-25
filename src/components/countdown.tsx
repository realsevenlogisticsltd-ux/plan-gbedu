"use client";

import { eventInfo } from "@/lib/content";
import { useNow } from "@/hooks/use-now";

function getRemaining(target: number, now: number) {
  const diff = Math.max(target - now, 0);
  return {
    diff,
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff / 3_600_000) % 24),
    minutes: Math.floor((diff / 60_000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export function Countdown() {
  const target = new Date(eventInfo.dateTime).getTime();
  const now = useNow(1000);
  const remaining = getRemaining(target, now);
  const done = remaining.diff === 0;

  if (done) {
    return (
      <p className="font-display text-lg italic text-gold">
        The celebration has begun — the hall is aglow.
      </p>
    );
  }

  const units = [
    { label: "Days", value: remaining.days },
    { label: "Hours", value: remaining.hours },
    { label: "Minutes", value: remaining.minutes },
    { label: "Seconds", value: remaining.seconds },
  ];

  return (
    <div className="flex items-center justify-center gap-3 sm:gap-5">
      {units.map((u, i) => (
        <div key={u.label} className="flex items-center gap-3 sm:gap-5">
          <div className="flex flex-col items-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-2xl border border-gold/40 bg-card font-display text-3xl tabular-nums text-ruby shadow-sm sm:h-20 sm:w-20 sm:text-4xl">
              {String(u.value).padStart(2, "0")}
            </span>
            <span className="mt-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              {u.label}
            </span>
          </div>
          {i < units.length - 1 && (
            <span className="pb-5 font-display text-2xl text-gold/60">:</span>
          )}
        </div>
      ))}
    </div>
  );
}
