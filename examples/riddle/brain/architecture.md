# Architecture — House of Riddle

> Tech decisions with rationale. Locked once approved — reopen explicitly.

## Stack

| Layer | Choice | Rationale |
|-------|--------|-----------|
| Frontend | Next.js 16.2.2 (App Router) | SSR + API routes, React ecosystem, Vercel deploy |
| Styling | Tailwind CSS v4 + shadcn/ui v4 | Fast dev, consistent design, accessible components |
| Backend | Supabase (PostgreSQL + Auth + Storage) | BaaS = fastest for small team |
| Auth | Supabase Auth (email + Google OAuth) | Zero custom auth code, session management built-in |
| Image Storage | Supabase Storage (`riddle-images` bucket) | Integrated with RLS, public read, authenticated write |
| Deployment | Vercel | Native Next.js hosting, auto-deploy on push |
| Domain | riddle.thepunkrecords.com | CNAME → cname.vercel-dns.com |

## Data Model

7 tables: profiles, towers, riddles, tower_progress, solves, ratings, reports.

- **profiles** — Extends Supabase auth.users with username, avatar, XP, level, stats
- **towers** — Admin-curated riddle collections with difficulty and ordering
- **riddles** — Both tower and community riddles with answers, hints, tags, quality scores
- **solves** — User solve attempts with timing and hint usage
- **ratings** — Fun + fairness ratings (1-5 each) per riddle
- **tower_progress** — Track user progression through towers
- **reports** — Flag broken/inappropriate riddles

## API Surface

- Auth: Supabase built-in (signup, login, Google OAuth, password reset)
- Answer verification: `POST /api/riddles/[id]/solve` and `POST /api/towers/[id]/solve` (server-side only)
- Ratings: `POST /api/riddles/[id]/rate`
- Reports: `POST /api/riddles/[id]/report`
- Answer lookup: `get_riddle_answer()` RPC function (security definer)
- Atomic increment: `increment_riddle_attempts()` RPC function

## Key Decisions

1. **Server-side answer verification** — Answers never leave the server. All checks in API routes via `get_riddle_answer()` RPC.
2. **Supabase RLS** — All tables protected. Users edit own data only. Admins manage towers.
3. **UGC-first MVP** — Community riddles + admin towers. "The Original Tower" (10 seeded riddles) provides curated content while UGC grows.
4. **No column-level security** — Removed after it broke admin queries. Application code prevents answer leakage.
5. **Image dual input** — Reusable `<ImageInput>` component supports both file upload and URL input.
6. **NEVER pay-to-win** — Monetization via cosmetics, rewarded ads, and subscription only.

## V1 Boundary

**In V1:** Towers, community riddles, auth, ratings, leaderboards, profiles. Web UI only.

**Deferred:** XP/levels, achievements, daily challenge, 1v1, cosmetic store, season pass, rate limiting.

## Alternatives Considered

| Option | Why Rejected |
|--------|-------------|
| Firebase | Less SQL-friendly, Supabase provides better PostgreSQL + RLS |
| Vanilla Express | Too much manual work for auth, storage, realtime |
| Mobile-first | Web MVP validates faster, responsive is sufficient |
| Tower-100-first | Content bottleneck — UGC-first validates demand faster |
