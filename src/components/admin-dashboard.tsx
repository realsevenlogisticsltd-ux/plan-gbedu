"use client";

import { useState, useTransition } from "react";
import {
  CheckCircle2,
  CircleX,
  Sparkles,
  Trash2,
  Loader2,
  Inbox,
} from "lucide-react";
import {
  setTributeApproved,
  setTributeFeatured,
  deleteTribute,
} from "@/app/admin/actions";
import { TributeCard, type TributeCardData } from "@/components/tribute-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function ActionButton({
  onClick,
  pending,
  children,
  variant = "outline",
  className,
}: {
  onClick: () => void;
  pending: boolean;
  children: React.ReactNode;
  variant?: "outline" | "gold" | "destructive" | "emerald";
  className?: string;
}) {
  return (
    <Button
      type="button"
      variant={variant}
      size="sm"
      onClick={onClick}
      disabled={pending}
      className={cn(
        variant === "emerald" &&
          "border-transparent bg-emerald text-white hover:bg-emerald/90",
        variant === "gold" &&
          "border-transparent bg-gold text-[#1a0f04] hover:bg-gold/90",
        className,
      )}
    >
      {pending ? <Loader2 className="size-3.5 animate-spin" /> : children}
    </Button>
  );
}

function TributeRow({ tribute }: { tribute: TributeCardData }) {
  const [approving, startApprove] = useTransition();
  const [featuring, startFeature] = useTransition();
  const [deleting, startDelete] = useTransition();
  const [removed, setRemoved] = useState(false);

  if (removed) return null;

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-4">
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant={tribute.isApproved ? "emerald" : "outline"}>
          {tribute.isApproved ? "Approved" : "Pending"}
        </Badge>
        {tribute.isFeatured && <Badge variant="gold">Highlighted</Badge>}
        {tribute.tableNumber && (
          <Badge variant="secondary">Table {tribute.tableNumber}</Badge>
        )}
        <span className="ml-auto text-xs tabular-nums text-muted-foreground">
          {new Date(tribute.createdAt).toLocaleString()}
        </span>
      </div>

      <TributeCard tribute={tribute} compact />

      <div className="flex flex-wrap items-center gap-2">
        <ActionButton
          variant={tribute.isApproved ? "outline" : "emerald"}
          onClick={() =>
            startApprove(() =>
              setTributeApproved(tribute.id, !tribute.isApproved),
            )
          }
          pending={approving}
        >
          {tribute.isApproved ? (
            <>
              <CircleX /> Unapprove
            </>
          ) : (
            <>
              <CheckCircle2 /> Approve for wall
            </>
          )}
        </ActionButton>
        <ActionButton
          variant={tribute.isFeatured ? "outline" : "gold"}
          onClick={() =>
            startFeature(() =>
              setTributeFeatured(tribute.id, !tribute.isFeatured),
            )
          }
          pending={featuring}
        >
          <Sparkles />
          {tribute.isFeatured ? "Unhighlight" : "Highlight to Projector"}
        </ActionButton>
        <ActionButton
          variant="destructive"
          className="ml-auto"
          onClick={() => {
            if (confirm("Delete this tribute permanently?")) {
              startDelete(() => {
                void deleteTribute(tribute.id);
                setRemoved(true);
              });
            }
          }}
          pending={deleting}
        >
          <Trash2 /> Delete
        </ActionButton>
      </div>
    </div>
  );
}

export function AdminDashboard({ tributes }: { tributes: TributeCardData[] }) {
  const [filter, setFilter] = useState<"all" | "pending" | "approved">("all");
  const pendingCount = tributes.filter((t) => !t.isApproved).length;

  const visible = tributes.filter((t) => {
    if (filter === "pending") return !t.isApproved;
    if (filter === "approved") return t.isApproved;
    return true;
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center gap-2">
        {(
          [
            ["all", `All (${tributes.length})`],
            ["pending", `Pending (${pendingCount})`],
            ["approved", `Approved (${tributes.length - pendingCount})`],
          ] as const
        ).map(([key, label]) => (
          <button
            key={key}
            type="button"
            onClick={() => setFilter(key)}
            className={cn(
              "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
              filter === key
                ? "border-ruby bg-ruby text-primary-foreground"
                : "border-border text-muted-foreground hover:text-foreground",
            )}
          >
            {label}
          </button>
        ))}
      </div>

      {pendingCount > 0 && (
        <p className="rounded-xl border border-gold/40 bg-gold-soft px-4 py-3 text-sm text-secondary-foreground">
          {pendingCount} tribute{pendingCount === 1 ? "" : "s"} awaiting your
          blessing — approve them to light up the projector wall.
        </p>
      )}

      {visible.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-border py-16 text-center text-muted-foreground">
          <Inbox className="size-8 text-gold/60" />
          <p className="text-sm italic">
            {filter === "pending"
              ? "Nothing awaiting review — the wall is clear."
              : "No tributes here yet."}
          </p>
        </div>
      ) : (
        <div className="grid gap-5 lg:grid-cols-2">
          {visible.map((t) => (
            <TributeRow key={t.id} tribute={t} />
          ))}
        </div>
      )}
    </div>
  );
}
