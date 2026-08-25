"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  PenLine,
  Loader2,
  Send,
  Sparkles,
  PartyPopper,
  RotateCcw,
  CheckCircle2,
} from "lucide-react";
import { submitTribute, type SubmitResult } from "@/app/actions";
import { relationships } from "@/lib/content";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { AudioRecorder } from "@/components/audio-recorder";
import { fireCelebrationConfetti } from "@/components/confetti";
import { pillarColor } from "@/components/tribute-card";
import { cn } from "@/lib/utils";

type Mode = "write" | "speak";

export function TributeForm({ audioEnabled }: { audioEnabled: boolean }) {
  const [mode, setMode] = useState<Mode>("write");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<SubmitResult["tribute"] | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const formData = new FormData(e.currentTarget);
      const res = await submitTribute(formData);
      if (!res.ok || !res.tribute) {
        setError(res.error ?? "Something went wrong. Please try again.");
        return;
      }
      setResult(res.tribute);
      fireCelebrationConfetti();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (result) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center gap-6 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 14 }}
          className="flex size-16 items-center justify-center rounded-full bg-gold text-[#1a0f04]"
        >
          <CheckCircle2 className="size-9" />
        </motion.div>
        <div>
          <h2 className="font-display text-3xl">Your tribute is in!</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Thank you, {result.authorName} — it will glow on the projector wall
            tonight.
          </p>
        </div>

        <div className="w-full max-w-lg rounded-2xl border border-gold/60 bg-gold-soft p-6 text-left">
          <div className="mb-3 flex items-center justify-between gap-3">
            <span
              className={cn(
                "rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wider",
                pillarColor(result.category),
              )}
            >
              {result.category}
            </span>
            <Sparkles className="size-4 text-gold" />
          </div>
          <p className="text-[15px] leading-relaxed">
            {result.polishedMessage ?? ""}
          </p>
          {result.poeticSummary && (
            <p className="mt-4 font-display text-sm italic leading-relaxed text-ruby">
              {result.poeticSummary}
            </p>
          )}
          <p className="mt-5 text-xs uppercase tracking-[0.2em] text-muted-foreground">
            — {result.authorName} · {result.relationship}
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          <Button
            variant="outline"
            onClick={() => {
              setResult(null);
              setMode("write");
            }}
          >
            <RotateCcw />
            Send Another
          </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col gap-5"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor="authorName">Your name *</Label>
          <Input
            id="authorName"
            name="authorName"
            placeholder="e.g. Amara Osei"
            required
            minLength={2}
            maxLength={60}
            autoComplete="name"
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="relationship">Your relationship *</Label>
          <Select id="relationship" name="relationship" required defaultValue="">
            <option value="" disabled>
              Choose one…
            </option>
            {relationships.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </Select>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="tableNumber">Table number (optional)</Label>
        <Input
          id="tableNumber"
          name="tableNumber"
          type="number"
          min={1}
          max={50}
          placeholder="e.g. 7"
          className="max-w-40"
        />
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <Label className="sr-only">Mode</Label>
          <div className="inline-flex rounded-full border border-border bg-muted/50 p-1">
            <button
              type="button"
              onClick={() => setMode("write")}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
                mode === "write"
                  ? "bg-ruby text-ivory shadow-sm"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              <PenLine className="size-3.5" /> Write
            </button>
            <button
              type="button"
              onClick={() => setMode("speak")}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
                mode === "speak"
                  ? "bg-ruby text-ivory shadow-sm"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              <PartyPopper className="size-3.5" /> Speak
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {mode === "write" ? (
            <motion.div
              key="write"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Label htmlFor="message" className="mb-2 block">
                Your tribute *
              </Label>
              <Textarea
                id="message"
                name="message"
                required
                minLength={5}
                maxLength={2000}
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Share a memory, a blessing, or words from the heart…"
              />
            </motion.div>
          ) : (
            <motion.div
              key="speak"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="rounded-xl border border-border bg-muted/30 p-5"
            >
              <AudioRecorder
                audioEnabled={audioEnabled}
                onTranscribed={(text) => {
                  setMessage(text);
                  setMode("write");
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {error && (
        <p className="rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-2.5 text-sm text-destructive">
          {error}
        </p>
      )}

      <Button type="submit" variant="gold" size="lg" disabled={submitting}>
        {submitting ? (
          <>
            <Loader2 className="animate-spin" /> Sending with love…
          </>
        ) : (
          <>
            <Send /> Send with Love
          </>
        )}
      </Button>
      <p className="text-center text-xs text-muted-foreground">
        Your words may be gently polished and shared on the projector wall and
        in the Ruby Keepsake Book.
      </p>
    </motion.form>
  );
}
