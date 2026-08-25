"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

function useCountUp(target: number, start: boolean, duration = 1800) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    let frame: number;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - t0) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(target * eased));
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [start, target, duration]);
  return value;
}

function Milestone({
  years,
  label,
  start,
}: {
  years: number;
  label: string;
  start: boolean;
}) {
  const value = useCountUp(years, start);
  return (
    <div className="flex flex-col items-center gap-1 text-center">
      <span className="font-display text-4xl text-gold tabular-nums sm:text-5xl">
        {value}
      </span>
      <span className="text-[11px] uppercase tracking-[0.18em] text-ivory/70 sm:text-xs">
        {label}
      </span>
    </div>
  );
}

export function MilestoneRow() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <div
      ref={ref}
      className="mx-auto grid w-full max-w-3xl grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-4"
    >
      {[
        { years: 15, label: "Years of Teaching" },
        { years: 5, label: "Years of Legacy" },
        { years: 5, label: "Years of Motherhood" },
        { years: 40, label: "Years of Grace" },
      ].map((m) => (
        <Milestone key={m.label} {...m} start={inView} />
      ))}
    </div>
  );
}
