"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, Sparkles, Flame, Sun } from "lucide-react";
import { timeline } from "@/lib/content";
import { cn } from "@/lib/utils";

const icons = {
  book: BookOpen,
  sparkles: Sparkles,
  flame: Flame,
  sun: Sun,
} as const;

export function Tapestry() {
  const [active, setActive] = useState(0);

  return (
    <section id="tapestry" className="relative bg-background py-24">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mb-16 flex flex-col items-center gap-4 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-ruby">
            The Story So Far
          </p>
          <h2 className="font-display text-4xl sm:text-5xl">
            The Tapestry of Purpose
          </h2>
          <div className="hairline-gold h-px w-40" />
          <p className="max-w-xl text-sm text-muted-foreground sm:text-base">
            Four chapters woven in ruby and gold — the journey of a woman whose
            life has been a lesson in grace.
          </p>
        </div>

        <div className="relative">
          <div
            aria-hidden
            className="absolute left-5 top-0 h-full w-px bg-gradient-to-b from-gold/0 via-gold/60 to-gold/0 sm:left-1/2"
          />

          <div className="flex flex-col gap-10">
            {timeline.map((item, i) => {
              const Icon = icons[item.icon as keyof typeof icons];
              const isActive = active === i;
              const left = i % 2 === 0;
              return (
                <motion.button
                  key={item.title}
                  type="button"
                  onClick={() => setActive(i)}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, delay: i * 0.08 }}
                  className={cn(
                    "group relative flex w-full items-start gap-6 text-left sm:gap-0",
                    left ? "sm:flex-row" : "sm:flex-row-reverse",
                  )}
                >
                  <div className="relative z-10 ml-0 hidden shrink-0 sm:flex sm:w-1/2 sm:justify-center">
                    <div
                      className={cn(
                        "flex size-11 items-center justify-center rounded-full border-2 transition-colors",
                        isActive
                          ? "border-gold bg-ruby text-ivory shadow-lg shadow-ruby/40"
                          : "border-gold/50 bg-card text-ruby",
                      )}
                    >
                      <Icon className="size-5" />
                    </div>
                  </div>

                  <div className="flex w-full items-start gap-4 sm:w-1/2">
                    <div
                      className={cn(
                        "flex size-10 shrink-0 items-center justify-center rounded-full border-2 sm:hidden",
                        isActive
                          ? "border-gold bg-ruby text-ivory"
                          : "border-gold/50 bg-card text-ruby",
                      )}
                    >
                      <Icon className="size-4" />
                    </div>

                    <motion.div
                      animate={{ scale: isActive ? 1.02 : 1 }}
                      transition={{ type: "spring", stiffness: 260, damping: 22 }}
                      className={cn(
                        "w-full rounded-2xl border p-6 shadow-sm transition-colors",
                        isActive
                          ? "border-gold/50 bg-ruby-deep text-ivory"
                          : "border-border bg-card hover:border-gold/40",
                      )}
                    >
                      <div className="mb-2 flex items-center gap-3">
                        <span
                          className={cn(
                            "text-[11px] font-semibold uppercase tracking-[0.25em]",
                            isActive ? "text-gold" : "text-gold",
                          )}
                        >
                          {item.chapter}
                        </span>
                        <span
                          className={cn(
                            "text-xs tabular-nums",
                            isActive ? "text-ivory/60" : "text-muted-foreground",
                          )}
                        >
                          {item.period}
                        </span>
                      </div>
                      <h3 className="font-display text-2xl sm:text-3xl">
                        {item.title}
                      </h3>
                      <p
                        className={cn(
                          "mt-1 font-display text-sm italic",
                          isActive ? "text-gold/90" : "text-ruby",
                        )}
                      >
                        {item.subtitle}
                      </p>
                      <motion.p
                        initial={false}
                        animate={{
                          height: isActive ? "auto" : 0,
                          opacity: isActive ? 1 : 0,
                        }}
                        transition={{ duration: 0.35 }}
                        className={cn(
                          "overflow-hidden text-sm leading-relaxed",
                          isActive ? "mt-4 text-ivory/85" : "text-muted-foreground",
                        )}
                      >
                        {item.body}
                      </motion.p>
                    </motion.div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
