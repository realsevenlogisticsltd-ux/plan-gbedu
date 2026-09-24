"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Gift, Clapperboard } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { eventInfo } from "@/lib/content";
import { MilestoneRow } from "@/components/milestone-counter";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-velvet text-ivory">
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          background:
            "radial-gradient(60% 50% at 70% 20%, rgba(128,0,32,0.9) 0%, transparent 70%), radial-gradient(45% 40% at 15% 85%, rgba(212,175,55,0.25) 0%, transparent 70%)",
        }}
      />
      <div className="hairline-gold absolute inset-x-0 top-0 h-px" />
      <span
        aria-hidden
        className="pointer-events-none absolute -right-10 top-8 select-none font-display text-[26rem] leading-none text-gold/10"
      >
        40
      </span>

      <div className="relative mx-auto flex max-w-6xl flex-col gap-14 px-6 pb-16 pt-20 sm:pt-24 lg:flex-row lg:items-center lg:gap-20 lg:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex max-w-2xl flex-col items-start gap-6"
        >
          <p className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-gold">
            <span className="h-px w-8 bg-gold/60" />
            The Ruby Jubilee · {eventInfo.dateLabel.split(",").slice(1).join(",").trim()}
          </p>

          <h1 className="font-display text-5xl leading-[1.05] tracking-tight sm:text-7xl">
            40 <span className="italic text-gold">&amp;</span> Flourishing
          </h1>
          <p className="font-display text-xl italic text-ivory/85 sm:text-2xl">
            Celebrating a Woman of Purpose
          </p>
          <p className="max-w-xl text-sm leading-relaxed text-ivory/70 sm:text-base">
            Fifteen years of teaching, five years of legacy, five years of
            motherhood — and forty years of grace. Tonight the hall glows
            burgundy for Mena, as fifty hearts gather to honour a teacher, a
            founder, a mother, and a friend.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/tribute"
              className={buttonVariants({ variant: "gold", size: "lg" })}
            >
              <Gift />
              Leave a Tribute
            </Link>
            <a
              href="#tapestry"
              className={buttonVariants({ variant: "velvet", size: "lg" })}
            >
              <Clapperboard />
              Watch Story Reel
            </a>
          </div>

          <div className="mt-6 w-full border-t border-ivory/10 pt-8">
            <MilestoneRow />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.15, ease: "easeOut" }}
          className="mx-auto shrink-0 lg:mx-0"
        >
          <div className="relative">
            <div className="absolute -inset-3 rounded-full bg-gold/20 blur-2xl" />
            <div className="relative overflow-hidden rounded-t-full rounded-b-2xl border-2 border-gold/60 bg-ruby-deep p-2 shadow-2xl shadow-ruby/50">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/portrait.svg"
                alt="Portrait of the celebrant"
                className="h-72 w-64 rounded-t-full rounded-b-lg object-cover sm:h-80 sm:w-72"
              />
            </div>
            <div className="absolute -left-6 bottom-8 rounded-full border border-gold/50 bg-velvet/90 px-4 py-2 text-xs uppercase tracking-[0.2em] text-gold backdrop-blur">
              Est. 2021 · Smity Hills School
            </div>
          </div>
        </motion.div>
      </div>
      <div className="hairline-purple h-px w-full" />
    </section>
  );
}
