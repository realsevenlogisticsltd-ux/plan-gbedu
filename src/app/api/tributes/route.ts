import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  const tributes = await prisma.tribute.findMany({
    where: { isApproved: true },
    orderBy: [{ isFeatured: "desc" }, { createdAt: "desc" }],
    select: {
      id: true,
      authorName: true,
      relationship: true,
      polishedMessage: true,
      poeticSummary: true,
      category: true,
      isFeatured: true,
      createdAt: true,
    },
  });

  return Response.json({
    updatedAt: new Date().toISOString(),
    tributes,
  });
}
