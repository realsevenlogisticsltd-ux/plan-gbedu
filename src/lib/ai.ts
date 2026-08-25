import "server-only";

const CATEGORIES = ["The Educator", "The Mother", "The Visionary", "The Friend"] as const;

export type Category = (typeof CATEGORIES)[number];

const couplets: Record<Category, string[]> = {
  "The Educator": [
    "You taught the young to dream aloud — a classroom blessed, a crown endowed.",
    "Chalk dust gold, lessons true — every life she touched grew.",
    "Fifteen years of patient art, she wrote her name on every heart.",
    "Where minds once slept, she lit the flame; her harvest sings her name.",
  ],
  "The Mother": [
    "A mother's heart, a kingdom's grace — she loves her son in time and space.",
    "Lullabies and answered prayers — a mother's love beyond compare.",
    "Two hands held all: a school, a boy — her softest strength, her deepest joy.",
    "She prays by night, she builds by day — her son will rise where blessings stay.",
  ],
  "The Visionary": [
    "From dust she raised a dream so tall — her faith the mortar, hope the wall.",
    "Five years of legacy begun, a school that glows beneath the sun.",
    "She saw what none could yet behold — a future written out in gold.",
    "Her vision built a house of grace where every child has found their place.",
  ],
  "The Friend": [
    "A friend who stays when seasons turn, whose laughter makes our sorrows burn.",
    "Her friendship is a steady flame — first to call, last to blame.",
    "In joy she cheers, in grief she stays — a friend for all her living days.",
    "Twenty years of truth and cheer, she held our hands through every year.",
  ],
};

const MOTHER_RE =
  /\b(your son|her son|my son|as a mother|mummy|mommy|mother's heart|lullaby|maternal)\b|\bmom\b|\bmum\b/i;
const EDUCATOR_RE =
  /\b(school|teacher|teach|class|classroom|pupil|student|lesson|education|academy|learn|chalk|principal|headmistress|proprietress)\b/i;
const VISIONARY_STRONG_RE =
  /\b(founder|founded|from nothing|vision|gracefield)\b/i;
const VISIONARY_RE =
  /\b(dream|legacy|miracle|built|building|build)\b/i;
const FRIEND_RE =
  /\b(friend|friendship|kindness|kind|laughter|laugh|cheer|sister|steady)\b/i;

function detectCategory(message: string, relationship: string): Category {
  const scores: Record<Category, number> = {
    "The Educator": 0,
    "The Mother": 0,
    "The Visionary": 0,
    "The Friend": 0,
  };

  if (MOTHER_RE.test(message)) scores["The Mother"] += 3;
  if (/your son|her son|as a mother|mummy|mommy|lullaby/i.test(message))
    scores["The Mother"] += 2;
  if (EDUCATOR_RE.test(message)) scores["The Educator"] += 2;
  if (VISIONARY_STRONG_RE.test(message)) scores["The Visionary"] += 4;
  if (VISIONARY_RE.test(message)) scores["The Visionary"] += 2;
  if (FRIEND_RE.test(message)) scores["The Friend"] += 2;

  const hints: Record<string, Category> = {
    Student: "The Educator",
    Parent: "The Educator",
    Staff: "The Educator",
  };
  if (hints[relationship]) scores[hints[relationship]] += 2;

  return (Object.entries(scores) as [Category, number][]).sort(
    (a, b) => b[1] - a[1],
  )[0][0];
}

function cleanText(raw: string): string {
  let text = raw.replace(/[ \t]+/g, " ").trim();
  text = text.replace(/\n{3,}/g, "\n\n");
  if (text && !/[.!?…"']$/.test(text)) text += ".";
  return text;
}

export function isAiEnabled(): boolean {
  return Boolean(process.env.OPENAI_API_KEY);
}

function fallbackProcess(raw: string, relationship: string) {
  const message = cleanText(raw);
  const category = detectCategory(message, relationship);
  const hash = [...message].reduce((a, c) => a + c.charCodeAt(0), 0);
  const couplet = couplets[category][hash % couplets[category].length];
  return { polishedMessage: message, poeticSummary: couplet, category };
}

async function aiProcess(raw: string, relationship: string, authorName: string) {
  const { default: OpenAI } = await import("openai");
  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  const system = `You craft tributes for a 40th birthday Ruby Jubilee honoring a female school founder and mother.
Given a raw guest tribute, return JSON with exactly three fields:
- "polishedMessage": the same message cleaned and polished. Preserve the guest's authentic voice and emotion, fix grammar gently, do not add facts. Keep it under 90 words.
- "poeticSummary": a two-line rhyming poetic blessing (a couplet) summarizing the tribute, written in elegant English.
- "category": exactly one of "The Educator", "The Mother", "The Visionary", "The Friend".`;

  const completion = await client.chat.completions.create({
    model: "gpt-4o-mini",
    response_format: { type: "json_object" },
    temperature: 0.7,
    messages: [
      { role: "system", content: system },
      {
        role: "user",
        content: `Guest: ${authorName}\nRelationship: ${relationship}\nTribute: ${raw}`,
      },
    ],
  });

  const content = completion.choices[0]?.message?.content ?? "";
  const parsed = JSON.parse(content) as {
    polishedMessage?: string;
    poeticSummary?: string;
    category?: string;
  };

  return {
    polishedMessage: cleanText(parsed.polishedMessage ?? raw),
    poeticSummary:
      parsed.poeticSummary ??
      fallbackProcess(raw, relationship).poeticSummary,
    category: (CATEGORIES as readonly string[]).includes(parsed.category ?? "")
      ? (parsed.category as Category)
      : fallbackProcess(raw, relationship).category,
  };
}

export async function processTribute(input: {
  authorName: string;
  relationship: string;
  rawMessage: string;
}) {
  if (isAiEnabled()) {
    try {
      return await aiProcess(input.rawMessage, input.relationship, input.authorName);
    } catch {
      // Fall through to the graceful fallback on any AI failure.
    }
  }
  return fallbackProcess(input.rawMessage, input.relationship);
}
