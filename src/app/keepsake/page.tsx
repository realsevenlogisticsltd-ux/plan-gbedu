import type { Metadata } from "next";
import { prisma } from "@/lib/db";
import { KeepsakePrint } from "@/components/keepsake-print";
import { KeepsakeBook } from "@/components/keepsake-book";

export const metadata: Metadata = {
  title: "The Ruby Keepsake Book",
  description:
    "A printable keepsake of every blessing gathered for the Ruby Jubilee.",
};

export const dynamic = "force-dynamic";

export default async function KeepsakePage() {
  const tributes = await prisma.tribute.findMany({
    where: { isApproved: true },
    orderBy: [{ category: "asc" }, { createdAt: "desc" }],
    select: {
      id: true,
      authorName: true,
      relationship: true,
      polishedMessage: true,
      rawMessage: true,
      poeticSummary: true,
      category: true,
      isFeatured: true,
      tableNumber: true,
      createdAt: true,
    },
  });

  return (
    <main className="min-h-screen bg-muted/60 py-8">
      <KeepsakePrint tributes={tributes}>
        <div className="px-4 py-6">
          <KeepsakeBook tributes={tributes} />
        </div>
      </KeepsakePrint>
    </main>
  );
}
