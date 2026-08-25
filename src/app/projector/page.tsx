import type { Metadata } from "next";
import { ProjectorWall } from "@/components/projector-wall";
import { prisma } from "@/lib/db";

export const metadata: Metadata = {
  title: "Projector View",
  description: "Live tribute wall for the celebration hall display.",
};

export const dynamic = "force-dynamic";

export default async function ProjectorPage() {
  const program = await prisma.eventProgram.findMany({
    orderBy: { orderIndex: "asc" },
  });

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const qrBaseUrl = `${baseUrl}/tribute`;

  return (
    <main className="cursor-none">
      <ProjectorWall program={program} qrBaseUrl={qrBaseUrl} />
    </main>
  );
}
