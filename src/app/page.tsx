import { SiteHeader } from "@/components/site-header";
import { Hero } from "@/components/hero";
import { Tapestry } from "@/components/timeline";
import { TributeWall } from "@/components/tribute-wall";
import { MusicPlayer } from "@/components/music-player";
import { Itinerary } from "@/components/itinerary";
import { CtaBand } from "@/components/cta-band";
import { ClosingBlessing } from "@/components/closing-blessing";
import { Footer } from "@/components/footer";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const program = await prisma.eventProgram.findMany({
    orderBy: { orderIndex: "asc" },
  });

  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <Tapestry />
        <TributeWall />
        <MusicPlayer />
        <Itinerary program={program} />
        <CtaBand />
        <ClosingBlessing />
      </main>
      <Footer />
    </>
  );
}
