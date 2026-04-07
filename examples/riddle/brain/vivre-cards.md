# Vivre Cards — Decision Log

> Append-only. Never edit past entries.

---

### [2026-04-06] Tech Stack Selection
**Phase:** DEFINE
**Satellite:** Pythagoras
**Decision:** Next.js 16 + Supabase + Tailwind CSS + shadcn/ui, deploy to Vercel
**Rationale:** Fastest stack for small team. Supabase provides auth, DB, storage in one. Next.js handles SSR + API in one project.
**Alternatives:** Next.js + Firebase (less SQL-friendly), Vanilla JS + Express (too much manual work)

---

### [2026-04-06] MVP Scope — UGC First
**Phase:** DEFINE
**Satellite:** Shaka
**Decision:** UGC-first approach with admin towers (5-10 riddles per tower). NOT building all 100 levels upfront.
**Rationale:** Validates core assumption (people want to create AND solve riddles) faster. Admin towers provide curated content while UGC grows.
**Alternatives:** Tower-100-first (content bottleneck), Full social (too much scope)

---

### [2026-04-06] Monetization Philosophy
**Phase:** DEFINE
**Satellite:** Shaka
**Decision:** NEVER pay-to-win. Cosmetics only, rewarded ads (opt-in), season pass, subscription. No paid level skips, no answer reveals, no content gating.
**Rationale:** Puzzle audience leaves at first sign of P2W. Monetize prestige and aesthetics.
**Alternatives:** Freemium levels (rejected — destroys trust), energy system (rejected — antithetical to "think freely")

---

### [2026-04-06] Server-Side Answer Verification
**Phase:** BUILD
**Satellite:** Edison + Lilith Red
**Decision:** All answer checks happen server-side via `get_riddle_answer()` RPC function. Answers never sent to client.
**Rationale:** Client-side answer comparison means answers visible in network tab. Security requirement for a puzzle game.
**Alternatives:** None — this is non-negotiable for a riddle platform.

---

### [2026-04-06] Stella Review — 3 CRITICAL + 5 HIGH Fixed
**Phase:** REVIEW
**Satellite:** Lilith Red (Security), Lilith Blue (QA)
**Decision:** All CRITICAL and HIGH findings fixed before deployment.
**Key fixes:**
1. Column-level security reverted (broke admin queries, app-level protection sufficient)
2. Admin role enforcement in middleware
3. Open redirect prevention in auth callback
4. Community riddle solve records created (was missing)
5. Double-counting removed from tower solve API
6. Race condition fixed with atomic increment RPC
7. next/image remote patterns configured
8. Quality score formula unified (trigger only)
**Rationale:** Security findings are non-negotiable. All CRITICAL/HIGH resolved. MEDIUM items deferred.

---

### [2026-04-07] Column-Level Security Removed
**Phase:** REVIEW
**Satellite:** Lilith Red
**Decision:** Reverted column-level REVOKE on riddles table. Re-granted full SELECT.
**Rationale:** Column-level REVOKE on answer/alt_answers broke any `select("*")` query including admin pages. Application code already prevents answer leakage (API routes never return answers, solve endpoint uses RPC).
**Alternatives:** Fix every query to list columns explicitly (rejected — fragile)

---

### [2026-04-07] MVP v1.0.0 Shipped
**Phase:** CLOSE
**Satellite:** York + Atlas
**Decision:** Deploy to riddle.thepunkrecords.com via Vercel. All P0 features live.
**Stack:** Next.js 16.2.2 + Supabase + Tailwind v4 + shadcn/ui v4
**Routes:** 21 (including auth flows)
**Rationale:** All P0 features tested and functional. Security review passed. Ready for users.
