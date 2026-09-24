import Link from "next/link";
import { Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-auto bg-velvet py-12 text-ivory">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 text-center">
        <span className="hairline-gold h-px w-48" />
        <p className="font-display text-xl italic text-gold">
          “To whom much grace is given, much gratitude is owed.”
        </p>
        <p className="max-w-md text-sm leading-relaxed text-ivory/60">
          With grateful hearts we honour Mena — teacher, founder, mother,
          friend — on her Ruby Jubilee. Your tributes become a keepsake she
          will treasure for decades.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs uppercase tracking-[0.2em] text-ivory/50">
          <Link href="/tribute" className="transition-colors hover:text-gold">
            Leave a Tribute
          </Link>
          <Link href="/projector" className="transition-colors hover:text-gold">
            Projector View
          </Link>
          <Link href="/keepsake" className="transition-colors hover:text-gold">
            The Keepsake Book
          </Link>
          <Link href="/admin" className="transition-colors hover:text-gold">
            Admin
          </Link>
        </div>
        <p className="flex items-center gap-1.5 text-xs text-ivory/40">
          Made with <Heart className="size-3.5 fill-ruby text-ruby" /> for the
          Ruby Jubilee · 40 &amp; Flourishing · 2027
        </p>
      </div>
    </footer>
  );
}
