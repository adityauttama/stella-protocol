# Example: Building House of Riddle with The Stella Protocol

This walkthrough demonstrates the full Stella Protocol cycle on a real project — **House of Riddle**, a community-driven brain-teasing platform shipped in ~2 days. It shows what each phase produces, how governance protocols fire, and what the `brain/` directory looks like at the end.

The completed `brain/` files are in [`riddle/brain/`](riddle/brain/).

**Live:** [riddle.thepunkrecords.com](https://riddle.thepunkrecords.com)

---

## Setup

```bash
mkdir riddle && cd riddle
npx stella-protocol install
```

This installs 5 Agent Skills and creates:
```
brain/
├── log-pose.md
├── architecture.md
├── vivre-cards.md
├── ideas.md
├── scope-changes.md
└── design-system.md
```

You're ready. Open your AI tool and start talking.

---

## Phase 0: IDEATE

**You say:** "I want to build a riddle platform — like a brain-teasing community where people can solve and create riddles."

**IMU activates** and runs the ideation protocol:

### 1. Reframe
- **User angle:** "I want a place to challenge my brain and compete with others on puzzles"
- **Creator angle:** "I want to publish my own riddles and see how many people can solve them"
- **Platform angle:** "What if riddles were a social game — with towers, leaderboards, and UGC?"

### 2. User Pain
- **Who:** Puzzle enthusiasts, casual gamers, riddle creators who want an audience
- **Why now:** Short-form brain content is trending (Wordle effect). No dedicated riddle platform exists.
- **Current workaround:** Reddit r/riddles (no progression), quiz apps (no UGC), Discord communities (no structure)

### 3. Adjacent Space
- Wordle/NYT puzzle games (daily challenge model)
- Trivia platforms (HQ Trivia, Kahoot)
- UGC game platforms (Roblox, Mario Maker)

### 4. Pre-Mortem
1. **Content:** Not enough riddles at launch — cold start problem
2. **Quality:** UGC riddles may be low effort or unfair
3. **Retention:** Users solve a few riddles and leave — no progression hook

### 5. Minimum Proof
Admin-curated "tower" (10 sequential riddles) + community riddle creation. Server-side answer verification. Rating system to surface quality. No monetization for V1.

### 6. Idea Brief

> **Problem:** Puzzle enthusiasts have no dedicated platform to solve, create, and compete on riddles.
>
> **Proposed Solution:** A brain-teasing platform with admin-curated towers (sequential riddle progression) and community-created riddles, with ratings, leaderboards, and profiles.
>
> **Who It's For:** Puzzle enthusiasts and casual gamers who enjoy brain teasers.
>
> **Core Assumption:** People will both solve AND create riddles if given the right tools and community.
>
> **Biggest Risk:** Cold start — not enough quality content at launch.
>
> **Adjacent Ideas Noted:** Daily challenge mode, 1v1 duels, cosmetic rewards, season pass.
>
> **Recommended Track:** Grand Line — new product with auth, database, and UGC architecture.
>
> **Recommended Next Step:** DEFINE

**You say:** "Approved. Grand Line."

Brain update: `ideas.md` moves House of Riddle from Inbox to In Progress.

---

## Phase 1: DEFINE

### Shaka creates the PRD

**You say:** "Let's define what we're building."

Shaka activates and produces a PRD through conversational discovery. Key decisions:

> See the complete PRD: [`riddle/brain/prd-house-of-riddle.md`](riddle/brain/prd-house-of-riddle.md)

- **P0:** Towers, community riddles, answer verification, ratings, leaderboards, profiles, auth
- **P1:** XP/leveling system, achievement badges, daily challenge
- **P2:** 1v1 challenges, cosmetic store, season pass
- **Non-goals:** Pay-to-win monetization, mobile native app, AI-generated riddles
- **Monetization philosophy:** NEVER pay-to-win. Cosmetics only, rewarded ads, subscription.

**You say:** "Approved."

### Pythagoras designs the architecture

**You say:** "Design the system."

Pythagoras activates and produces:

> **Stack:** Next.js 16 (App Router) + TypeScript + Tailwind v4 + shadcn/ui v4 + Supabase (PostgreSQL + Auth + Storage), deployed to Vercel
>
> **Data model:** 7 tables — profiles, towers, riddles, solves, ratings, tower_progress, reports. Server-side answer verification via RPC function.
>
> **Key decision:** UGC-first MVP. "The Original Tower" (10 seeded riddles) provides curated content while community grows.

See: [`riddle/brain/architecture.md`](riddle/brain/architecture.md)

### Governance in action: Monetization guardrail

During DEFINE, the team discusses monetization. Shaka flags a critical design principle:

**Decision logged to vivre-cards.md:**
> NEVER pay-to-win. No paid level skips, no answer reveals, no content gating. Puzzle audience leaves at first sign of P2W. Monetize prestige and aesthetics only.

This becomes a governance constraint that Cipher Pol enforces throughout BUILD.

### Lilith Red reviews the spec

After PRD + Architecture are complete, Lilith Red performs the spec pass:

> **Critical finding:** Answer verification MUST be server-side. Client-side comparison means answers visible in network tab.
>
> **High finding:** RLS policies needed on ALL tables. User-generated content requires row-level access control.
>
> **Medium finding:** Image uploads need size limits and type validation.

PRD cleared for BUILD with conditions.

---

## Phase 2: BUILD

### Edison implements

**You say:** "Build the MVP."

Edison reads the PRD and architecture, then implements across 2 days:
1. Supabase schema (7 tables, RLS policies, triggers for stats)
2. Auth system (email + Google OAuth + password reset)
3. Tower system (admin CRUD, sequential progression, completion screen)
4. Community riddles (create, solve, rate, report)
5. Server-side answer verification via `get_riddle_answer()` RPC
6. Leaderboards (top solvers + top creators)
7. Profile pages with stats and solve history
8. Image handling (dual input: file upload to Supabase Storage + URL)

### Governance in action: Buster Call during review

After P0 features are built, Lilith Red runs the code pass and finds multiple issues:

```
⚠️ CRITICAL — LILITH RED
Issue: Column-level security on riddles table broke admin queries.
       SELECT("*") fails when answer/alt_answers columns are revoked.
Impact: Admin tower management completely broken.
Recommendation: Revert column-level REVOKE. Application code already prevents
               answer leakage via API routes and RPC functions.
Status: Awaiting Stella's decision.
```

```
⚠️ HIGH — LILITH RED
Issue: Community riddle solve records never created.
       The solve API only handled tower riddles.
Impact: Community riddle solves don't count toward leaderboard or profile stats.
Recommendation: Add solve record creation for community riddles.
```

**3 CRITICAL + 5 HIGH findings total.** All fixed before deployment:
1. Column-level security reverted (application-level protection sufficient)
2. Admin role enforcement added
3. Open redirect prevention in auth callback
4. Community riddle solve records created
5. Double-counting removed from tower solve API
6. Race condition fixed with atomic increment RPC
7. next/image remote patterns configured
8. Quality score formula unified

Decisions logged to `vivre-cards.md`.

### Atlas deploys

**You say:** "Deploy."

Atlas configures: GitHub → Vercel → riddle.thepunkrecords.com

---

## Result: The brain/ directory

After the full cycle, the `brain/` directory tells the complete story:

```
riddle/brain/
├── log-pose.md               # Phase: closed, v1.0.0 shipped
├── architecture.md            # Stack decisions with rationale
├── vivre-cards.md             # 9 decisions logged (tech stack, UGC strategy,
│                              #   monetization philosophy, security fixes,
│                              #   rebrand, deployment)
├── ideas.md                   # House of Riddle shipped, P1/P2 ideas parked
└── prd-house-of-riddle.md     # The complete approved PRD
```

Every file is git-committed. A new team member can read `brain/` and understand what was built, what was decided, and why — without reading a single line of code.

Browse the completed files: [`riddle/brain/`](riddle/brain/)
