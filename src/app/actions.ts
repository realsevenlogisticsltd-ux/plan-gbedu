"use server";

import { prisma } from "@/lib/db";
import { processTribute } from "@/lib/ai";
import { relationships } from "@/lib/content";

export type SubmitResult = {
  ok: boolean;
  error?: string;
  tribute?: {
    id: string;
    authorName: string;
    relationship: string;
    polishedMessage: string | null;
    poeticSummary: string | null;
    category: string;
  };
};

export async function submitTribute(formData: FormData): Promise<SubmitResult> {
  const authorName = String(formData.get("authorName") ?? "").trim();
  const relationship = String(formData.get("relationship") ?? "").trim();
  const rawMessage = String(formData.get("message") ?? "").trim();
  const tableNumberRaw = String(formData.get("tableNumber") ?? "").trim();

  if (authorName.length < 2 || authorName.length > 60) {
    return { ok: false, error: "Please share your name." };
  }
  if (!(relationships as readonly string[]).includes(relationship as never)) {
    return { ok: false, error: "Please choose a relationship." };
  }
  if (rawMessage.length < 5 || rawMessage.length > 2000) {
    return { ok: false, error: "Your message should be between 5 and 2000 characters." };
  }

  let tableNumber: number | null = null;
  if (tableNumberRaw) {
    const n = Number(tableNumberRaw);
    if (Number.isInteger(n) && n >= 1 && n <= 50) tableNumber = n;
  }

  const processed = await processTribute({
    authorName,
    relationship,
    rawMessage,
  });

  const tribute = await prisma.tribute.create({
    data: {
      authorName,
      relationship,
      rawMessage,
      polishedMessage: processed.polishedMessage,
      poeticSummary: processed.poeticSummary,
      category: processed.category,
      tableNumber,
    },
    select: {
      id: true,
      authorName: true,
      relationship: true,
      polishedMessage: true,
      poeticSummary: true,
      category: true,
    },
  });

  return { ok: true, tribute };
}
