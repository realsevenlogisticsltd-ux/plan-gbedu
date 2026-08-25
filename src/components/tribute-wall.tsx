import Link from "next/link";
import { ArrowRight, Gift } from "lucide-react";
import { prisma } from "@/lib/db";
import { buttonVariants } from "@/components/ui/button";
import { TributeCard } from "@/components/tribute-card";

export async function TributeWall() {
  const tributes = await prisma.tribute.findMany({
    where: { isApproved: true },
    orderBy: [{ isFeatured: "desc" }, { createdAt: "desc" }],
    take: 6,
  });

  return (
    <section className="bg-muted/50 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 flex flex-col items-center gap-4 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-ruby">
            From the Hall
          </p>
          <h2 className="font-display text-4xl sm:text-5xl">
            Tributes Already Written
          </h2>
          <div className="hairline-gold h-px w-40" />
          <p className="max-w-xl text-sm text-muted-foreground sm:text-base">
            Blessings are already pouring in. Leave yours on the night — or
            right now — and watch it glow on the projector wall.
          </p>
        </div>

        {tributes.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {tributes.map((t) => (
              <TributeCard key={t.id} tribute={t} compact />
            ))}
          </div>
        ) : (
          <p className="text-center text-sm italic text-muted-foreground">
            The first blessings are yet to arrive — be the one who starts the
            wall.
          </p>
        )}

        <div className="mt-12 flex justify-center">
          <Link href="/tribute" className={buttonVariants({ variant: "gold", size: "lg" })}>
            <Gift />
            Leave Yours
            <ArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
}
