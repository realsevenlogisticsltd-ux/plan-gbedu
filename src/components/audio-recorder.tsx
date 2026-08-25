"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Mic, Square, Loader2, Volume2, RotateCcw } from "lucide-react";

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export function AudioRecorder({
  onTranscribed,
  audioEnabled,
}: {
  onTranscribed: (text: string) => void;
  audioEnabled: boolean;
}) {
  const [recording, setRecording] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [transcribing, setTranscribing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasRecording, setHasRecording] = useState(false);

  const mediaRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const stopTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = null;
  }, []);

  const startRecording = useCallback(async () => {
    setError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      chunksRef.current = [];
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };
      recorder.onstop = async () => {
        stream.getTracks().forEach((t) => t.stop());
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        chunksRef.current = [];
        stopTimer();
        setElapsed(0);
        if (blob.size === 0) {
          setError("Nothing was recorded. Please try again.");
          setHasRecording(false);
          return;
        }
        setHasRecording(true);
        setTranscribing(true);
        try {
          const form = new FormData();
          form.append("file", blob, "voice-note.webm");
          const res = await fetch("/api/transcribe", { method: "POST", body: form });
          const data = await res.json();
          if (!res.ok) {
            setError(data.error ?? "Transcription failed. Please use text.");
            return;
          }
          onTranscribed(data.text);
        } catch {
          setError("Could not reach the transcription service. Please use text.");
        } finally {
          setTranscribing(false);
        }
      };
      mediaRef.current = recorder;
      recorder.start();
      setRecording(true);
      setElapsed(0);
      timerRef.current = setInterval(() => setElapsed((s) => s + 1), 1000);
    } catch {
      setError("Microphone access was denied. Please use text.");
    }
  }, [onTranscribed, stopTimer]);

  const stopRecording = useCallback(() => {
    if (mediaRef.current && mediaRef.current.state !== "inactive") {
      mediaRef.current.stop();
    }
    setRecording(false);
  }, []);

  useEffect(() => () => stopTimer(), [stopTimer]);

  if (!audioEnabled) {
    return (
      <div className="rounded-xl border border-dashed border-border bg-muted/40 p-5 text-center text-sm text-muted-foreground">
        <Volume2 className="mx-auto mb-2 size-6 text-gold" />
        Voice notes will be enabled for the celebration evening.
        <br />
        Please use <span className="font-semibold text-foreground">Write</span>{" "}
        for now.
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex items-center gap-3">
        {recording ? (
          <>
            <span className="flex items-center gap-2 rounded-full bg-ruby px-4 py-2 text-sm font-semibold text-ivory">
              <span className="relative flex size-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ivory opacity-75" />
                <span className="relative inline-flex size-2.5 rounded-full bg-ivory" />
              </span>
              Recording · {formatTime(elapsed)}
            </span>
            <button
              type="button"
              onClick={stopRecording}
              className="inline-flex size-11 items-center justify-center rounded-full bg-destructive text-destructive-foreground transition-transform hover:scale-105"
              aria-label="Stop recording"
            >
              <Square className="size-4 fill-current" />
            </button>
          </>
        ) : (
          <button
            type="button"
            onClick={startRecording}
            disabled={transcribing}
            className="inline-flex items-center gap-2 rounded-full border-2 border-ruby bg-ruby/5 px-6 py-3 text-sm font-semibold text-ruby transition-colors hover:bg-ruby/10 disabled:opacity-50"
          >
            {transcribing ? (
              <>
                <Loader2 className="size-4 animate-spin" /> Transcribing…
              </>
            ) : hasRecording ? (
              <>
                <RotateCcw className="size-4" /> Record Again
              </>
            ) : (
              <>
                <Mic className="size-4" /> Tap to Speak
              </>
            )}
          </button>
        )}
      </div>
      <p className="text-xs text-muted-foreground">
        Speak your blessing — it will be transcribed and polished.
      </p>
      {error && (
        <p className="text-center text-xs font-medium text-destructive">{error}</p>
      )}
    </div>
  );
}
