# PRD: House of Riddle

**Version:** 1.0 | **Date:** 2026-04-06 | **Status:** Shipped (v1.0.0)

## Problem
Puzzle enthusiasts have no dedicated platform to solve, create, and compete on riddles. Existing options are fragmented: Reddit threads lack progression, quiz apps lack UGC, and Discord communities lack structure.

## Target Users
- Puzzle enthusiasts who enjoy brain teasers and lateral thinking
- Casual gamers looking for short-form mental challenges (Wordle-like engagement)
- Riddle creators who want an audience and feedback on their puzzles

## Goals (measurable)
- Ship MVP in under 3 days with all P0 features functional
- Support concurrent solvers without answer leakage (server-side verification)
- Quality signal: average rating score surfaces best community content
- Content seed: at least 10 curated riddles at launch ("The Original Tower")

## Non-Goals (explicitly out of scope)
- Mobile native app (responsive web is sufficient for V1)
- AI-generated riddles (human creativity is the differentiator)
- Real-time multiplayer (1v1 duels deferred to P2)
- Pay-to-win mechanics of any kind (see Monetization Philosophy in vivre-cards)
- Social features beyond leaderboards (chat, friends, teams)

## Features

### P0 — Must Ship
- **Tower system:** Admin-curated sequential riddle collections with difficulty levels and progression tracking
- **Community riddles:** Users create and publish riddles with images, hints, tags, and difficulty
- **Answer verification:** Server-side checking via RPC function. Answers never sent to client.
- **Rating system:** Post-solve fun (1-5) + fairness (1-5) ratings. Auto quality score calculation.
- **Leaderboards:** Top solvers (most riddles solved) + Top creators (highest quality scores)
- **User profiles:** Stats (solves, streaks, XP), created riddles, solve history
- **Auth:** Email signup, Google OAuth, forgot/reset password
- **Image handling:** Dual input (file upload to Supabase Storage + URL)
- **Reporting:** Flag broken or inappropriate riddles

### P1 — Should Ship
- XP and player leveling system (DB ready, logic deferred)
- Achievement badges
- Daily challenge mode
- Rate limiting on solve endpoints

### P2 — Nice to Have
- 1v1 challenge duels
- Cosmetic store (avatars, titles, themes)
- Season pass
- 100-level mega tower

## Data Model

### profiles
| Column | Type | Description |
|--------|------|-------------|
| id | UUID PK | References auth.users |
| username | TEXT UNIQUE | Display name |
| avatar_url | TEXT | Profile image |
| xp | INTEGER | Experience points |
| player_level | INTEGER | Derived from XP |
| riddles_solved | INTEGER | Auto-incremented via trigger |
| riddles_created | INTEGER | Auto-incremented via trigger |
| current_streak | INTEGER | Consecutive days solving |
| role | TEXT | 'user' or 'admin' |

### riddles
| Column | Type | Description |
|--------|------|-------------|
| id | UUID PK | Auto-generated |
| title | TEXT | Riddle title |
| description | TEXT | The riddle itself |
| image_url | TEXT | Optional image |
| answer | TEXT | Correct answer (never sent to client) |
| alt_answers | TEXT[] | Alternative accepted answers |
| hint1, hint2, hint3 | TEXT | Progressive hints |
| difficulty | TEXT | easy/medium/hard/expert |
| type | TEXT | 'tower' or 'community' |
| created_by | UUID FK | References profiles |
| avg_rating_fun | NUMERIC | Auto-calculated |
| avg_rating_fairness | NUMERIC | Auto-calculated |
| quality_score | NUMERIC | Combined quality metric |

### Additional tables
- **towers** — Curated collections (title, difficulty, cover image, ordering)
- **solves** — Attempt records (user, riddle, solved, attempts, time, hints used)
- **ratings** — Fun + fairness per riddle per user
- **tower_progress** — User progression through towers
- **reports** — Flagged riddles with reason and status

## API Contracts

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/riddles/[id]/solve | Verify answer (server-side via RPC) |
| POST | /api/towers/[id]/solve | Verify + track tower progression |
| POST | /api/riddles/[id]/rate | Submit fun + fairness rating |
| POST | /api/riddles/[id]/report | Flag riddle |
| — | Supabase Auth | Signup, login, OAuth, password reset |
| — | get_riddle_answer() RPC | Fetch answer server-side only |
| — | increment_riddle_attempts() RPC | Atomic attempt counter |

## Open Questions
_All resolved during DEFINE phase._

---
_Mode: Express_
_Pulse: READY — shipped as v1.0.0_
