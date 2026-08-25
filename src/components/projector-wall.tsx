"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Sparkles, Wifi } from "lucide-react";
import { eventInfo, pillars } from "@/lib/content";
import {
  getCurrentPhase,
  type ProgramItem,
} from "@/lib/program";
import { useNow } from "@/hooks/use-now";
import { cn } from "@/lib/utils";

type Tribute = {
  id: string;
  authorName: string;
  relationship: string;
  polishedMessage: string | null;
  poeticSummary: string | null;
  category: string;
  isFeatured: boolean;
  createdAt: string;
};

function pillarBadge(name: string) {
  const pillar = pillars.find((p) => p.name === name);
  switch (pillar?.color) {
    case "emerald":
      return "bg-emerald/20 text-emerald-300 border-emerald-400/40";
    case "ruby":
      return "bg-ruby/25 text-rose-300 border-rose-400/40";
    case "gold":
      return "bg-gold/20 text-amber-300 border-amber-300/40";
    default:
      return "bg-ruby-deep/40 text-rose-200 border-rose-300/30";
  }
}

function WallCard({ tribute, fresh }: { tribute: Tribute; fresh: boolean }) {
  const message = tribute.polishedMessage;
  return (
    <figure
      className={cn(
        "mb-4 break-inside-avoid rounded-2xl border p-5 backdrop-blur-sm",
        tribute.isFeatured
          ? "border-gold/60 bg-gold/[0.08] shadow-lg shadow-gold/10"
          : "border-ivory/10 bg-white/[0.04]",
        fresh && "animate-pop-in ring-1 ring-gold/60",
      )}
    >
      {tribute.isFeatured && (
        <span className="mb-2 inline-flex items-center gap-1 rounded-full bg-gold/15 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-amber-300">
          <Sparkles className="size-3" /> Highlighted
        </span>
      )}
      <blockquote className="text-lg leading-relaxed text-ivory/95 [text-wrap:balance]">
        {message}
      </blockquote>
      {tribute.poeticSummary && (
        <p className="mt-3 font-display text-base italic leading-relaxed text-gold">
          {tribute.poeticSummary}
        </p>
      )}
      <figcaption className="mt-4 flex items-center justify-between gap-3 border-t border-ivory/10 pt-3">
        <span className="truncate text-sm font-semibold text-ivory/85">
          {tribute.authorName}
          <span className="ml-2 text-ivory/50">· {tribute.relationship}</span>
        </span>
        <span
          className={cn(
            "shrink-0 rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider",
            pillarBadge(tribute.category),
          )}
        >
          {tribute.category.replace("The ", "")}
        </span>
      </figcaption>
    </figure>
  );
}

export function ProjectorWall({ program, qrBaseUrl }: { program: ProgramItem[]; qrBaseUrl: string }) {
  const now = new Date(useNow(1000));
  const [tributes, setTributes] = useState<Tribute[]>([]);
  const [ready, setReady] = useState(false);
  const seenRef = useRef<Set<string>>(new Set());
  const [freshIds, setFreshIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    let cancelled = false;
    async function poll() {
      try {
        const res = await fetch("/api/tributes", { cache: "no-store" });
        if (!res.ok) return;
        const data = (await res.json()) as { tributes: Tribute[] };
        if (cancelled) return;
        const incoming = data.tributes;
        const fresh = new Set<string>();
        for (const t of incoming) {
          if (!seenRef.current.has(t.id)) {
            fresh.add(t.id);
            seenRef.current.add(t.id);
          }
        }
        setFreshIds(fresh);
        setTributes(incoming);
        setReady(true);
        if (fresh.size > 0) {
          setTimeout(() => setFreshIds(new Set()), 4000);
        }
      } catch {
        /* network hiccup — try again next tick */
      }
    }
    poll();
    const timer = setInterval(poll, 4000);
    return () => {
      cancelled = true;
      clearInterval(timer);
    };
  }, []);

  const phase = getCurrentPhase(program, now);
  const currentPhase =
    phase.inProgress && phase.index >= 0 ? program[phase.index] : null;
  const phaseLabel = currentPhase
    ? currentPhase.title
    : phase.index < 0
      ? "The hall awaits…"
      : "A beautiful evening";

  const wallCards = useMemo(() => {
    if (tributes.length === 0) return [];
    const copies = tributes.length < 6 ? 4 : 2;
    return Array.from({ length: copies }).flatMap(() => tributes);
  }, [tributes]);

  const qrValue = qrBaseUrl || "/tribute";

  return (
    <div className="fixed inset-0 flex flex-col overflow-hidden bg-velvet text-ivory">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(70% 60% at 50% 0%, rgba(159,18,57,0.25) 0%, transparent 65%), radial-gradient(50% 40% at 100% 100%, rgba(212,175,55,0.12) 0%, transparent 70%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          boxShadow: "inset 0 0 180px rgba(0,0,0,0.65)",
        }}
      />
      <div className="hairline-gold relative z-10 h-px w-full" />

      <div className="relative z-10 flex h-16 shrink-0 items-center justify-between px-8">
        <div className="flex items-center gap-4">
          <span className="font-display text-xl tracking-tight">
            40 <span className="italic text-gold">&amp;</span> Flourishing
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-ruby/25 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-rose-300">
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-400 opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-rose-400" />
            </span>
            Live
          </span>
        </div>
        <div className="text-right">
          <p className="font-display text-2xl tabular-nums leading-none">
            {now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </p>
          <p className="text-[11px] uppercase tracking-[0.2em] text-ivory/50">
            {eventInfo.dateLabel}
          </p>
        </div>
      </div>

      <div className="relative z-10 grid min-h-0 flex-1 grid-cols-1 gap-8 px-8 pb-8 lg:grid-cols-[320px_1fr]">
        <aside className="hidden flex-col gap-6 lg:flex">
          <div className="relative mx-auto">
            <div className="absolute -inset-2 rounded-full bg-gold/20 blur-2xl" />
            <div className="relative overflow-hidden rounded-t-full rounded-b-2xl border-2 border-gold/60 bg-ruby-deep p-1.5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/portrait.svg"
                alt=""
                className="h-64 w-52 rounded-t-full rounded-b-lg object-cover"
              />
            </div>
          </div>
          <div className="text-center">
            <h2 className="font-display text-2xl">Adaeze Ngozi Okafor</h2>
            <p className="text-xs uppercase tracking-[0.3em] text-gold">
              {eventInfo.subtitle}
            </p>
          </div>

          <div className="rounded-2xl border border-gold/40 bg-gold/[0.06] p-4 text-center">
            <p className="text-[10px] uppercase tracking-[0.3em] text-ivory/50">
              {phase.inProgress ? "Now on stage" : "The evening"}
            </p>
            <p className="mt-1 font-display text-lg leading-snug text-gold">
              {phaseLabel}
            </p>
            {currentPhase && (
              <p className="mt-1 text-xs tabular-nums text-ivory/60">
                {currentPhase.timeSlot}
              </p>
            )}
          </div>

          <ol className="flex flex-col gap-1.5">
            {program.map((item, i) => {
              const isCurrent = i === phase.index && phase.inProgress;
              return (
                <li
                  key={item.id}
                  className={cn(
                    "flex items-center gap-3 text-sm",
                    isCurrent
                      ? "font-semibold text-gold"
                      : "text-ivory/45",
                  )}
                >
                  <span className="w-16 shrink-0 text-xs tabular-nums">
                    {item.timeSlot}
                  </span>
                  <span
                    className={cn(
                      "h-px flex-1",
                      isCurrent ? "bg-gold/60" : "bg-ivory/10",
                    )}
                  />
                  <span className="truncate">{item.title}</span>
                </li>
              );
            })}
          </ol>
        </aside>

        <div className="relative min-h-0 overflow-hidden rounded-2xl">
          {!ready ? (
            <div className="flex h-full items-center justify-center">
              <p className="animate-pulse text-sm uppercase tracking-[0.3em] text-ivory/40">
                Tuning the wall…
              </p>
            </div>
          ) : wallCards.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
              <Sparkles className="size-8 text-gold/60" />
              <p className="font-display text-2xl italic text-ivory/60">
                The first blessing is yet to arrive
              </p>
              <p className="text-sm text-ivory/40">
                Scan the code at your table to begin the wall.
              </p>
            </div>
          ) : (
            <div className="absolute inset-0 [mask-image:linear-gradient(to_bottom,transparent,black_8%,black_92%,transparent)]">
              <div className="columns-1 gap-4 sm:columns-2 xl:columns-3">
                <div className="animate-wall-scroll">
                  {wallCards.map((t, i) => (
                    <WallCard
                      key={`${t.id}-${i}`}
                      tribute={t}
                      fresh={freshIds.has(t.id)}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="relative z-10 flex h-24 shrink-0 items-center justify-between px-8">
        <div className="flex items-center gap-3">
          <Wifi className="size-4 text-gold" />
          <p className="text-xs uppercase tracking-[0.25em] text-ivory/60">
            {tributes.length} blessing{tributes.length === 1 ? "" : "s"} on the
            wall
          </p>
        </div>
        <div className="flex items-center gap-4 rounded-2xl bg-white p-3 pr-5 text-velvet shadow-xl">
          <QRCodeSVG value={qrValue} size={64} bgColor="#ffffff" fgColor="#0f0a0a" />
          <div>
            <p className="font-display text-sm">Scan to leave a blessing</p>
            <p className="text-xs text-velvet/60">{qrValue.replace(/^https?:\/\//, "")}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
