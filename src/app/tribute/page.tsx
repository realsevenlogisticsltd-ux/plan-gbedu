import type { Metadata } from "next";
import Link from "next/link";
import { Gift, Heart } from "lucide-react";
import { TributeForm } from "@/components/tribute-form";
import { eventInfo } from "@/lib/content";

export const metadata: Metadata = {
  title: "Leave a Tribute",
  description:
    "Write or speak a blessing for Adaeze on her 40th birthday — it will glow on the projector wall tonight.",
};

export const dynamic = "force-dynamic";

export default function TributePage() {
  const audioEnabled = Boolean(process.env.OPENAI_API_KEY);

  return (
    <main className="relative min-h-screen overflow-hidden bg-velvet text-ivory">
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(60% 50% at 50% -10%, rgba(159,18,57,0.9) 0%, transparent 70%), radial-gradient(40% 40% at 90% 100%, rgba(212,175,55,0.25) 0%, transparent 70%)",
        }}
      />
      <div className="relative mx-auto flex min-h-screen w-full max-w-2xl flex-col items-center px-5 py-12">
        <div className="mb-8 flex w-full items-center justify-between">
          <Link href="/" className="font-display text-lg">
            40 <span className="italic text-gold">&amp;</span> Flourishing
          </Link>
          <span className="text-[11px] uppercase tracking-[0.25em] text-gold">
            {eventInfo.dateLabel}
          </span>
        </div>

        <div className="mb-10 flex flex-col items-center gap-3 text-center">
          <span className="flex size-14 items-center justify-center rounded-full border border-gold/50 bg-gold/10">
            <Gift className="size-6 text-gold" />
          </span>
          <h1 className="font-display text-4xl sm:text-5xl">Leave a Tribute</h1>
          <p className="max-w-md text-sm leading-relaxed text-ivory/70">
            A word from your heart — written or spoken — becomes part of the
            wall of blessings glowing in the hall tonight, and a page in her
            Ruby Keepsake Book.
          </p>
        </div>

        <div className="w-full rounded-3xl border border-ivory/10 bg-card p-6 text-card-foreground shadow-2xl shadow-ruby/20 sm:p-8">
          <TributeForm audioEnabled={audioEnabled} />
        </div>

        <p className="mt-8 flex items-center gap-1.5 text-xs text-ivory/50">
          Made with <Heart className="size-3.5 fill-ruby text-ruby" /> for the
          Ruby Jubilee
        </p>
      </div>
    </main>
  );
}
