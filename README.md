# 40 & Flourishing — Ruby Jubilee Celebration App

A full-stack event platform for a 40th birthday (Ruby Jubilee) honouring a
female school proprietress. Guests leave written or spoken tributes from
their tables (QR code), watch them glow on a live projector wall, and the
curator moderates them and exports a printable **Ruby Keepsake Book**.

## Tech Stack

- **Next.js 16** (App Router, React 19, TypeScript, Turbopack)
- **Tailwind CSS v4** + hand-rolled shadcn-style UI primitives
- **Prisma 7** with SQLite — local dev via `better-sqlite3`, production via
  **Turso** (hosted SQLite) so it deploys to Vercel
- **Framer Motion**, **lucide-react**, **canvas-confetti**, **qrcode.react**
- **OpenAI** (optional): `gpt-4o-mini` tribute polishing + `whisper-1`
  voice-note transcription. Without a key the app runs on a graceful
  fallback (heuristic categorization + elegant template couplets).
- **react-to-print** for the Keepsake Book PDF

## Routes

| Route | Purpose |
|---|---|
| `/` | Celebration hub — hero, milestone counters, Tapestry of Purpose timeline, music widget, itinerary with countdown, tribute wall preview |
| `/tribute` | Guest submission (QR target) — text or voice note, instant polished preview + confetti |
| `/projector` | Fullscreen live hall display — auto-scrolling tribute wall (polls every 4s), current program phase, live QR |
| `/admin` | Curator dashboard — approve, highlight to projector, delete (password-gated) |
| `/keepsake` | Printable A4 booklet of every approved blessing, sectioned by the four pillars |
| `/api/tributes` | GET approved tributes (JSON) for the projector |
| `/api/transcribe` | POST audio → Whisper transcription (501 when no OpenAI key) |

## Local Development

```bash
npm install          # installs deps + runs prisma generate
npm run db:push      # creates prisma/dev.db from the schema
npm run db:seed      # loads the placeholder celebrant, program & sample tributes
npm run dev          # http://localhost:3000
```

### Environment (`.env`)

```env
# Local SQLite file
DATABASE_URL="file:./prisma/dev.db"

# Production (Turso) — see deploy section
# DATABASE_URL="libsql://<db>.turso.io"
# TURSO_AUTH_TOKEN="..."

# Optional — enables gpt-4o-mini polish + whisper-1 voice notes
OPENAI_API_KEY=""

# Gate for /admin
ADMIN_PASSWORD="ruby40"

# Public URL used by the projector QR code
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

Copy `.env.example` to `.env` first. `ADMIN_PASSWORD` defaults to `ruby40`
when unset — change it before the event.

## Deploying (Vercel + Turso)

1. Create a free database at [Turso](https://turso.tech):
   ```bash
   turso db create ruby-jubilee
   turso db show ruby-jubilee --url          # -> libsql://ruby-jubilee-<org>.turso.io
   turso db tokens create ruby-jubilee       # -> TURSO_AUTH_TOKEN
   ```
2. Push the schema and seed to Turso:
   ```bash
   DATABASE_URL="libsql://..." TURSO_AUTH_TOKEN="..." npm run db:push
   DATABASE_URL="libsql://..." TURSO_AUTH_TOKEN="..." npm run db:seed
   ```
3. Deploy to Vercel (`vercel` CLI or GitHub import). Set environment
   variables in the Vercel dashboard:
   - `DATABASE_URL` (the libsql URL), `TURSO_AUTH_TOKEN`
   - `ADMIN_PASSWORD`, `OPENAI_API_KEY` (optional), `NEXT_PUBLIC_SITE_URL`
4. Point the table QR codes at `https://<your-app>.vercel.app/tribute`.
   Print `/projector` fullscreen on the hall projector and keep `/admin`
   open for curation.

## Customising the Content

All celebrant copy lives in `src/lib/content.ts` — name, bio, milestones,
event date/venue, timeline chapters, pillars, and playlists. Real
photographs replace the placeholder `public/portrait.svg`. Seed tributes
live in `prisma/seed.ts`; wipe them anytime with `npm run db:seed` after
editing.

## Notes & Trade-offs

- The projector wall updates via 4-second polling (no websockets) — plenty
  for a 50-guest hall.
- Voice notes require `OPENAI_API_KEY`; the recording is transcribed and
  submitted as text. Persisting raw audio files would need Vercel Blob or
  similar — see `audioUrl` in the schema.
- The admin gate is a shared-password cookie, appropriate for a private
  event; swap in real auth for a public deployment.
