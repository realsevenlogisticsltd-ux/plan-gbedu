import Link from "next/link";
import { Gift, QrCode } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

export function CtaBand() {
  return (
    <section className="relative overflow-hidden bg-ruby-deep py-20 text-ivory">
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(50% 70% at 50% 110%, rgba(212,175,55,0.5) 0%, transparent 70%)",
        }}
      />
      <div className="relative mx-auto flex max-w-4xl flex-col items-center gap-6 px-6 text-center">
        <h2 className="font-display text-4xl sm:text-5xl">
          Your Words Will Glow Tonight
        </h2>
        <p className="max-w-xl text-sm leading-relaxed text-ivory/80 sm:text-base">
          Scan the QR code at your table, or use the link below — leave a
          tribute in words or voice, and it will appear on the projector wall
          within moments.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link href="/tribute" className={buttonVariants({ variant: "gold", size: "lg" })}>
            <Gift />
            Leave a Tribute
          </Link>
          <Link
            href="/projector"
            className={buttonVariants({ variant: "velvet", size: "lg" })}
          >
            <QrCode />
            View the Projector
          </Link>
        </div>
      </div>
    </section>
  );
}
