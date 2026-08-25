import { Sparkles, Quote } from "lucide-react";
import { pillars } from "@/lib/content";
import { cn } from "@/lib/utils";

export type TributeCardData = {
  id: string;
  authorName: string;
  relationship: string;
  polishedMessage: string | null;
  rawMessage: string;
  poeticSummary: string | null;
  category: string;
  isApproved?: boolean;
  isFeatured: boolean;
  tableNumber?: number | null;
  createdAt: Date | string;
};

export function pillarColor(name: string): string {
  const pillar = pillars.find((p) => p.name === name);
  switch (pillar?.color) {
    case "emerald":
      return "bg-emerald text-white";
    case "ruby":
      return "bg-ruby text-white";
    case "gold":
      return "bg-gold text-[#1a0f04]";
    default:
      return "bg-ruby-deep text-ivory";
  }
}

export function TributeCard({
  tribute,
  compact = false,
}: {
  tribute: TributeCardData;
  compact?: boolean;
}) {
  const message = tribute.polishedMessage || tribute.rawMessage;
  return (
    <figure
      className={cn(
        "relative flex flex-col gap-4 rounded-2xl border p-6 shadow-sm",
        tribute.isFeatured
          ? "border-gold/60 bg-gold-soft"
          : "border-border bg-card",
      )}
    >
      {tribute.isFeatured && (
        <span className="absolute -top-3 right-5 inline-flex items-center gap-1 rounded-full bg-gold px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-[#1a0f04]">
          <Sparkles className="size-3" /> Highlighted
        </span>
      )}
      <Quote className="size-5 text-gold/70" />
      <blockquote
        className={cn(
          "text-sm leading-relaxed",
          compact ? "line-clamp-4" : "text-[15px]",
        )}
      >
        {message}
      </blockquote>
      {tribute.poeticSummary && (
        <p className="font-display text-sm italic leading-relaxed text-ruby">
          {tribute.poeticSummary}
        </p>
      )}
      <figcaption className="mt-auto flex items-center gap-3 border-t border-border/70 pt-4">
        <span className="flex size-9 items-center justify-center rounded-full bg-ruby-deep font-display text-sm text-gold">
          {tribute.authorName
            .split(" ")
            .slice(0, 2)
            .map((n) => n[0])
            .join("")
            .toUpperCase()}
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold">{tribute.authorName}</p>
          <p className="text-xs text-muted-foreground">{tribute.relationship}</p>
        </div>
        <span
          className={cn(
            "ml-auto shrink-0 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider",
            pillarColor(tribute.category),
          )}
        >
          {tribute.category.replace("The ", "")}
        </span>
      </figcaption>
    </figure>
  );
}
