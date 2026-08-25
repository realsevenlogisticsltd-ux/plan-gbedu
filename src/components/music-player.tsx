"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Music2, Play, ExternalLink } from "lucide-react";
import { playlists } from "@/lib/content";
import { cn } from "@/lib/utils";

export function MusicPlayer() {
  const [activeGenre, setActiveGenre] = useState(0);
  const playlist = playlists[activeGenre];

  return (
    <section id="music" className="relative overflow-hidden bg-velvet py-24 text-ivory">
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(50% 60% at 85% 10%, rgba(212,175,55,0.35) 0%, transparent 70%)",
        }}
      />
      <div className="relative mx-auto max-w-3xl px-6">
        <div className="mb-12 flex flex-col items-center gap-4 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-gold">
            Curated Soundtrack
          </p>
          <h2 className="font-display text-4xl sm:text-5xl">The Music of Her Life</h2>
          <p className="max-w-xl text-sm text-ivory/70">
            The rhythms of her story — from the corridors of the 2000s to the
            soul of Afrobeat and the warmth of soft rock.
          </p>
        </div>

        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {playlists.map((p, i) => (
            <button
              key={p.genre}
              type="button"
              onClick={() => setActiveGenre(i)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                i === activeGenre
                  ? "border-gold bg-gold text-[#1a0f04]"
                  : "border-ivory/20 text-ivory/70 hover:border-gold/60 hover:text-ivory",
              )}
            >
              {p.genre}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={playlist.genre}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="rounded-2xl border border-ivory/10 bg-card/95 p-6 text-card-foreground shadow-xl"
          >
            <div className="mb-5 flex items-center gap-3 border-b border-border pb-4">
              <div className="flex size-10 items-center justify-center rounded-full bg-ruby text-ivory">
                <Music2 className="size-5" />
              </div>
              <div>
                <h3 className="font-display text-lg">{playlist.genre}</h3>
                <p className="text-xs uppercase tracking-[0.2em] text-gold">
                  {playlist.era}
                </p>
              </div>
            </div>
            <p className="mb-5 text-sm italic text-muted-foreground">
              {playlist.description}
            </p>

            <ol className="flex flex-col gap-1.5">
              {playlist.tracks.map((track, i) => (
                <li key={track.title}>
                  <a
                    href={track.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-4 rounded-lg px-3 py-2.5 transition-colors hover:bg-accent"
                  >
                    <span className="w-6 text-right font-display text-sm tabular-nums text-gold/80">
                      {i + 1}
                    </span>
                    <span className="flex-1">
                      <span className="block text-sm font-medium leading-tight">
                        {track.title}
                      </span>
                      <span className="block text-xs text-muted-foreground">
                        {track.artist}
                      </span>
                    </span>
                    <span className="flex size-8 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors group-hover:border-gold group-hover:bg-gold group-hover:text-[#1a0f04]">
                      <Play className="size-3.5 fill-current" />
                    </span>
                  </a>
                </li>
              ))}
            </ol>

            <p className="mt-5 flex items-center gap-2 text-xs text-muted-foreground">
              <ExternalLink className="size-3.5" />
              Tap a track to play it on YouTube.
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
