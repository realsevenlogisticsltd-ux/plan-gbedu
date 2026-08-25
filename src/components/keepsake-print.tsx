"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useReactToPrint } from "react-to-print";
import { Printer, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TributeCardData } from "@/components/tribute-card";

export function KeepsakePrint({
  tributes,
  children,
}: {
  tributes: TributeCardData[];
  children: React.ReactNode;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [printing, setPrinting] = useState(false);

  const handlePrint = useReactToPrint({
    contentRef,
    documentTitle: "40 & Flourishing — The Ruby Keepsake Book",
    onBeforePrint: async () => setPrinting(true),
    onAfterPrint: async () => setPrinting(false),
  });

  return (
    <>
      <div className="no-print sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-[210mm] items-center justify-between gap-4 px-4">
          <div>
            <p className="font-display text-lg leading-tight">
              The Ruby Keepsake Book
            </p>
            <p className="text-xs text-muted-foreground">
              {tributes.length} blessings · A4 booklet
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.push("/")}
            >
              Back
            </Button>
            <Button
              variant="gold"
              size="sm"
              onClick={() => handlePrint()}
              disabled={printing}
            >
              {printing ? (
                <>
                  <Loader2 className="animate-spin" /> Preparing…
                </>
              ) : (
                <>
                  <Printer /> Download / Print PDF
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
      <div ref={contentRef}>{children}</div>
    </>
  );
}
