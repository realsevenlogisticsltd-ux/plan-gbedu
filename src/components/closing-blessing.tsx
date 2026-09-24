"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { celebrant, closing, eventInfo } from "@/lib/content";

export function ClosingBlessing() {
  return (
    <section className="relative overflow-hidden bg-velvet py-24 text-ivory">
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(55% 60% at 50% 0%, rgba(109,40,217,0.35) 0%, transparent 70%), radial-gradient(45% 50% at 50% 120%, rgba(212,175,55,0.35) 0%, transparent 70%)",
        }}
      />
      <div className="hairline-purple mx-auto h-px w-full max-w-5xl" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="relative mx-auto flex max-w-3xl flex-col items-center gap-7 px-6 pt-16 text-center"
      >
        <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-velvet/70 px-4 py-1.5 text-[11px] uppercase tracking-[0.3em] text-gold">
          <Sparkles className="size-3.5" />
          {closing.eyebrow}
        </span>

        <h2 className="font-display text-4xl leading-tight sm:text-5xl">
          {closing.title}
        </h2>

        <p className="font-display text-xl italic text-gold sm:text-2xl">
          {closing.lead}
        </p>

        <span className="hairline-gold h-px w-48" />

        <div className="flex flex-col gap-4 text-sm leading-relaxed text-ivory/75 sm:text-base">
          {closing.blessing.map((line) => (
            <p key={line.slice(0, 24)}>{line}</p>
          ))}
        </div>

        <p className="mt-2 font-display text-2xl italic text-ivory">
          {closing.signoff}
        </p>

        <p className="text-xs uppercase tracking-[0.4em] text-gold">
          {celebrant.name} · {eventInfo.dateLabel}
        </p>
      </motion.div>
    </section>
  );
}
