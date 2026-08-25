"use client";

import { Clock, MapPin, Sparkles } from "lucide-react";
import { eventInfo } from "@/lib/content";
import { getCurrentPhase, type ProgramItem } from "@/lib/program";
import { Countdown } from "@/components/countdown";
import { useNow } from "@/hooks/use-now";
import { cn } from "@/lib/utils";

export function Itinerary({ program }: { program: ProgramItem[] }) {
  const now = new Date(useNow(30_000));
  const phase = getCurrentPhase(program, now);
  const liveIndex = phase.isLive ? phase.index : -1;

  return (
    <section id="itinerary" className="bg-background py-24">
      <div className="mx-auto max-w-4xl px-6">
        <div className="mb-14 flex flex-col items-center gap-5 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-ruby">
            The Evening&apos;s Order
          </p>
          <h2 className="font-display text-4xl sm:text-5xl">A Modest Three Hours</h2>
          <div className="hairline-gold h-px w-40" />
          <div className="flex flex-col items-center gap-2 text-sm text-muted-foreground">
            <p className="flex items-center gap-2">
              <MapPin className="size-4 text-gold" /> {eventInfo.venue}
            </p>
            <p className="flex items-center gap-2">
              <Sparkles className="size-4 text-gold" /> Dress: {eventInfo.dressCode}
            </p>
          </div>
          <Countdown />
        </div>

        <ol className="flex flex-col gap-3">
          {program.map((item, i) => {
            const isLive = liveIndex === i;
            return (
              <li
                key={item.id}
                className={cn(
                  "flex flex-col gap-3 rounded-2xl border p-5 transition-colors sm:flex-row sm:items-center sm:gap-6",
                  isLive
                    ? "border-gold bg-ruby-deep text-ivory shadow-lg shadow-ruby/30"
                    : "border-border bg-card",
                )}
              >
                <div className="flex items-center gap-4 sm:w-40 sm:shrink-0">
                  <span
                    className={cn(
                      "flex size-9 shrink-0 items-center justify-center rounded-full font-display text-sm",
                      isLive
                        ? "bg-gold text-[#1a0f04]"
                        : "border border-gold/50 bg-gold/10 text-gold",
                    )}
                  >
                    {i + 1}
                  </span>
                  <span
                    className={cn(
                      "font-display text-lg tabular-nums",
                      isLive ? "text-gold" : "text-ruby",
                    )}
                  >
                    {item.timeSlot}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="font-display text-lg">{item.title}</h3>
                  <p
                    className={cn(
                      "mt-1 text-sm leading-relaxed",
                      isLive ? "text-ivory/80" : "text-muted-foreground",
                    )}
                  >
                    {item.description}
                  </p>
                </div>
                {isLive && (
                  <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-gold px-3 py-1 text-xs font-semibold text-[#1a0f04]">
                    <Clock className="size-3.5" /> Happening now
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
