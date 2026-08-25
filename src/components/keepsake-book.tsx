import { Quote } from "lucide-react";
import { celebrant, eventInfo, pillars } from "@/lib/content";
import { TributeCardData } from "@/components/tribute-card";

function KeepsakeTribute({ tribute }: { tribute: TributeCardData }) {
  const message = tribute.polishedMessage || tribute.rawMessage;
  return (
    <article className="keep-together rounded-lg border border-stone-200 p-5">
      <Quote className="size-4 text-amber-600/70" />
      <p className="mt-2 text-[15px] leading-relaxed text-stone-800">
        {message}
      </p>
      {tribute.poeticSummary && (
        <p className="mt-3 font-display text-sm italic leading-relaxed text-rose-800">
          {tribute.poeticSummary}
        </p>
      )}
      <footer className="mt-4 text-right">
        <p className="font-display text-sm font-semibold text-stone-900">
          {tribute.authorName}
        </p>
        <p className="text-xs uppercase tracking-wider text-stone-500">
          {tribute.relationship}
          {tribute.tableNumber ? ` · Table ${tribute.tableNumber}` : ""}
        </p>
      </footer>
    </article>
  );
}

export function KeepsakeBook({
  tributes,
}: {
  tributes: TributeCardData[];
}) {
  const sections = pillars.map((pillar) => ({
    pillar,
    tributes: tributes.filter((t) => t.category === pillar.name),
  }));
  const total = tributes.length;

  return (
    <div className="keepsake-sheet mx-auto w-full max-w-[210mm] bg-white text-stone-900 shadow-2xl">
      {/* Cover */}
      <section
        className="flex min-h-[260mm] flex-col items-center justify-center gap-6 px-12 py-16 text-center"
        style={{
          background:
            "linear-gradient(160deg, #9F1239 0%, #881337 45%, #5C0E26 100%)",
          color: "#FDFBF7",
        }}
      >
        <p className="text-xs uppercase tracking-[0.5em] text-amber-300">
          The Ruby Jubilee · {eventInfo.dateLabel}
        </p>
        <h1 className="font-display text-6xl leading-tight">
          40 <span className="italic">&amp;</span> Flourishing
        </h1>
        <p className="font-display text-2xl italic text-amber-200">
          The Ruby Keepsake Book
        </p>
        <div
          className="h-px w-56"
          style={{
            backgroundImage:
              "linear-gradient(90deg, transparent, #D4AF37, transparent)",
          }}
        />
        <p className="max-w-md text-sm leading-relaxed text-ivory/85">
          Blessings gathered from the hearts of {total} guests, woven into
          gold for the woman of purpose.
        </p>
        <p className="mt-4 font-display text-xl">{celebrant.name}</p>
      </section>

      {/* Her story */}
      <section className="break-before-page px-12 py-14">
        <p className="text-xs uppercase tracking-[0.4em] text-amber-700">
          Her Story
        </p>
        <h2 className="mt-2 font-display text-3xl">A Life Woven in Gold</h2>
        <div className="mt-8 grid gap-8 md:grid-cols-[160px_1fr]">
          <div className="mx-auto overflow-hidden rounded-t-full border-2 border-amber-600/60">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/portrait.svg"
              alt="Portrait of the celebrant"
              className="h-48 w-40 object-cover"
            />
          </div>
          <div className="flex flex-col gap-4">
            {celebrant.bio.map((p) => (
              <p key={p.slice(0, 24)} className="text-sm leading-relaxed text-stone-700">
                {p}
              </p>
            ))}
          </div>
        </div>
        <div className="mt-10 grid grid-cols-4 gap-4 text-center">
          {celebrant.milestones.map((m) => (
            <div key={m.label} className="keep-together rounded-xl border border-amber-200 bg-amber-50 p-4">
              <p className="font-display text-3xl text-rose-800">{m.years}</p>
              <p className="mt-1 text-[10px] uppercase tracking-wider text-stone-500">
                {m.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Pillar sections */}
      {sections.map(({ pillar, tributes: pillarTributes }, i) => {
        const Icon = pillar.icon;
        return (
          <section key={pillar.name} className="break-before-page px-12 py-14">
            <div className="flex items-center gap-4">
              <span className="flex size-12 items-center justify-center rounded-full bg-rose-800 text-amber-200">
                <Icon className="size-6" />
              </span>
              <div>
                <p className="text-[10px] uppercase tracking-[0.4em] text-amber-700">
                  Pillar {i + 1} of 4
                </p>
                <h2 className="font-display text-3xl">{pillar.name}</h2>
              </div>
            </div>
            <p className="mt-2 max-w-xl text-sm italic text-stone-500">
              {pillar.description}
            </p>
            <div className="mt-8 flex flex-col gap-5">
              {pillarTributes.length > 0 ? (
                pillarTributes.map((t) => (
                  <KeepsakeTribute key={t.id} tribute={t} />
                ))
              ) : (
                <p className="text-sm italic text-stone-400">
                  Blessings in this pillar are still being written…
                </p>
              )}
            </div>
          </section>
        );
      })}

      {/* Closing page */}
      <section
        className="break-before-page flex min-h-[200mm] flex-col items-center justify-center gap-6 px-12 py-16 text-center"
        style={{
          background: "#FDFBF7",
        }}
      >
        <p className="font-display text-2xl italic text-rose-900">
          “To whom much grace is given, much gratitude is owed.”
        </p>
        <p className="max-w-md text-sm leading-relaxed text-stone-600">
          Thank you for being part of this golden evening. May every blessing
          written here return to you, multiplied.
        </p>
        <p className="text-xs uppercase tracking-[0.4em] text-amber-700">
          {eventInfo.venue}
        </p>
        <p className="font-display text-lg text-stone-800">
          {celebrant.name}
        </p>
      </section>
    </div>
  );
}
