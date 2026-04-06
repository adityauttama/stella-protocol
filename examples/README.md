# Example: Building LinkShelf with The Stella Protocol

This walkthrough demonstrates the full Stella Protocol cycle on a fictional project — **LinkShelf**, a personal bookmark manager. It shows what each phase produces, how governance protocols fire, and what the `brain/` directory looks like at the end.

The completed `brain/` files are in [`linkshelf/brain/`](linkshelf/brain/).

---

## Setup

```bash
mkdir linkshelf && cd linkshelf
npx stella-protocol install
```

This installs 5 Agent Skills and creates:
```
brain/
├── log-pose.md
├── architecture.md
├── vivre-cards.md
└── ideas.md
```

You're ready. Open your AI tool and start talking.

---

## Phase 0: IDEATE

**You say:** "I'm thinking about building a personal bookmark manager. I save tons of links but can never find them later."

**IMU activates** and runs the ideation protocol:

### 1. Reframe
- **User angle:** "I need a way to organize and search my saved links"
- **Scope angle:** "A minimal read-later tool with smart tagging"
- **Problem angle:** "Browser bookmarks are a graveyard — what if saving a link was the start of a workflow, not the end?"

### 2. User Pain
- **Who:** Knowledge workers, researchers, developers who save 20+ links/week
- **Why now:** AI can auto-tag and summarize — the tech just caught up to the problem
- **Current workaround:** Browser bookmarks (unsearchable), Notion pages (manual), Pocket (abandoned by Mozilla)

### 3. Adjacent Space
- AI-powered note-taking (Mem, Reflect)
- Read-later services (Pocket, Instapaper)
- Knowledge graphs (Obsidian, Roam)

### 4. Pre-Mortem
1. **Market:** Pocket and Raindrop.io already exist — need clear differentiation
2. **Tech:** URL metadata extraction is fragile, sites block scrapers
3. **Execution:** Feature creep toward "build Notion" territory

### 5. Minimum Proof
A single-page app where you paste a URL, it auto-extracts title/description, you add tags, and you can search. No accounts, no sync — just local storage.

### 6. Idea Brief

> **Problem:** Knowledge workers save dozens of links weekly but can't find them later because browser bookmarks have no search, tags, or context.
>
> **Proposed Solution:** A minimal bookmark manager with auto-tagging and full-text search.
>
> **Who It's For:** Developers and researchers who save 20+ links/week.
>
> **Core Assumption:** People will adopt a separate tool if it makes links findable.
>
> **Biggest Risk:** Competing with browser built-ins and established tools like Raindrop.
>
> **Adjacent Ideas Noted:** AI summarization of saved pages, shared team collections, browser extension.
>
> **Recommended Track:** Grand Line — this is a new product with architecture decisions to make.
>
> **Recommended Next Step:** DEFINE

**You say:** "Approved. Grand Line."

Brain update: `ideas.md` moves LinkShelf from Inbox to In Progress.

---

## Phase 1: DEFINE

### Shaka creates the PRD

**You say:** "Let's define the requirements for LinkShelf."

Shaka activates and produces a PRD through conversational discovery. After a few rounds of questions about scope, priorities, and non-goals, the PRD is drafted:

> See the complete PRD: [`linkshelf/brain/prd-linkshelf.md`](linkshelf/brain/prd-linkshelf.md)

Key decisions:
- **P0:** Save link (auto-extract metadata), tag, search, list view
- **P1:** Browser extension, bulk import
- **P2:** AI auto-tagging, link health monitoring
- **Non-goals:** Social features, team collaboration, mobile app

**You say:** "Approved."

### Pythagoras designs the architecture

**You say:** "Design the system for LinkShelf."

Pythagoras activates and produces:

> **Stack:** Next.js 15 + TypeScript + Tailwind + shadcn/ui, SQLite via better-sqlite3
>
> **Data model:** `bookmarks` table (id, url, title, description, tags JSON, created_at, favicon_url) + `tags` table (id, name, bookmark_count)
>
> **Rationale:** Single-user tool, no auth needed for V1. SQLite is perfect — zero config, file-based, fast full-text search via FTS5.

See: [`linkshelf/brain/architecture.md`](linkshelf/brain/architecture.md)

### Governance in action: Cipher Pol ALERT

**You say:** "Actually, let's also add the ability to share bookmark collections publicly."

```
🔍 CIPHER POL ALERT
Drift: Adding public sharing of bookmark collections
PRD says: Non-goals include "Social features, team collaboration"
Gap: Public sharing is a social feature requiring auth, permissions, and public URLs
Recommendation: Reject — this contradicts an explicit non-goal. Log to ideas.md for V2.
```

**You say:** "Good catch. Park it for V2."

Decision logged to `vivre-cards.md`. The protocol prevented scope creep.

### Lilith Red reviews the spec

After PRD + Architecture are complete, Lilith Red performs the spec pass:

> **Medium finding:** URL metadata extraction should have a timeout and fallback. Sites that block scrapers will hang the save flow.
>
> **Medium finding:** SQLite FTS5 full-text search on description may return poor results for short descriptions. Consider indexing page content excerpts.

No Critical findings. PRD is cleared for BUILD.

---

## Phase 2: BUILD

### Edison implements

**You say:** "Build the core save and search flow."

Edison reads the PRD and architecture, then implements:
1. Database schema with FTS5 virtual table
2. `/api/bookmarks` CRUD endpoints
3. URL metadata extraction service (with timeout fallback, per Lilith Red's finding)
4. Search page with instant results
5. Add bookmark form with auto-fill

### Governance in action: Buster Call WARNING

During implementation, Edison flags:

```
⚠️ WARNING — EDISON
Issue: The bookmark save endpoint accepts raw URLs without validation.
       A malicious URL could trigger SSRF via the metadata extraction service.
Impact: Server-side request forgery — attacker could probe internal network.
Recommendation: Validate URLs against an allowlist of schemes (http/https only)
                and block private IP ranges before fetching metadata.
Status: Awaiting Stella's decision.
```

**You say:** "Fix it."

Edison adds URL validation. Decision logged to `vivre-cards.md`.

### Lilith Blue writes tests

After each feature, Lilith Blue produces:
- Unit tests for URL validation (blocks `file://`, `javascript:`, private IPs)
- Integration tests for save + search flow
- Edge case tests: duplicate URLs, empty tags, very long URLs, sites that return 403

### Atlas deploys

**You say:** "Deploy to Vercel."

Atlas configures the deployment. LinkShelf is live.

---

## Result: The brain/ directory

After the full cycle, the `brain/` directory tells the complete story:

```
linkshelf/brain/
├── log-pose.md          # Phase: BUILD, Track: Grand Line, all P0 features shipped
├── architecture.md      # Stack decisions with rationale
├── vivre-cards.md       # 5 decisions logged (track choice, PRD approval, scope rejection,
│                        #   SSRF fix, deployment config)
├── ideas.md             # LinkShelf in "In Progress", sharing parked for V2
└── prd-linkshelf.md     # The complete approved PRD
```

Every file is git-committed. A new team member can read `brain/` and understand what was built, what was decided, and why — without reading a single line of code.

Browse the completed files: [`linkshelf/brain/`](linkshelf/brain/)
