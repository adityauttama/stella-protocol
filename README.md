<!-- Stella Protocol by Aditya Uttama | https://www.linkedin.com/in/adityauttama/ | https://github.com/adityauttama -->

# The Stella Protocol

![The Stella Protocol](assets/banner.png?v=2)

**Ship products with AI — from idea to launch, with guardrails.**

Stella is a playbook for Product Managers who build with AI coding agents. It turns ad-hoc "vibe coding" into a structured flow: you explore an idea, approve what gets built, catch scope drift before it ships, gate on quality before you deploy, and close with real docs and a launch. Your AI executes. You stay in control of *what* gets built and *why*.

## Why Stella Exists

AI coding agents are fast but forgetful. They happily add features you didn't ask for, skip quality checks you assumed they'd run, and lose the thread of *why* you made a decision three weeks ago. You end up debugging your agent instead of shipping your product.

Stella solves this with three things:

- **Phases** — so progress is visible and sequential
- **Gates** — so the agent doesn't leap ahead without your sign-off
- **A paper trail** — so every decision, scope change, and quality call is logged in plain markdown you can read, review, and revisit later

## What You Get

- **A 5-phase process** from idea to launch, with approval checkpoints between each
- **Automatic scope enforcement** — when the AI wants to add something outside your approved plan, you're told first
- **Quality gates** — critical security or quality issues halt progress until you decide
- **An append-only decision log** — every scope change, every quality call, every choice, all in plain markdown committed to your repo
- **A fast path for small changes** — hotfixes and one-off features skip the full ceremony
- **No lock-in** — everything is plain markdown. Delete Stella tomorrow, your project state is still readable.

## Quick Start

```bash
npx stella-protocol install
```

Then just talk to your AI agent. Stella activates from context — there's nothing to memorize.

> **Also install [obra/superpowers](https://github.com/obra/superpowers).** This is Stella's execution engine (TDD, verification, debugging, planning). Stella handles the *product and governance* layer; superpowers handles the *engineering* layer.
>
> ```bash
> /plugin install superpowers@claude-plugins-official
> ```

## How It Works

Five phases. Each phase has an approval gate at the end. The AI can't skip ahead without your sign-off.

```
IDEATE   →  Explore an idea. Decide if it's worth building.
DEFINE   →  Write a PRD. Pick architecture. Design UX.
BUILD    →  Implementation with scope monitoring + review checkpoints.
REVIEW   →  Security audit. QA. Adversarial testing.
CLOSE    →  Documentation. Launch announcement. Go-to-market.
```

### Two speeds

| Track | When to use | What you skip |
|-------|-------------|----------------|
| **Grand Line** | New products, significant features, multi-week work | Nothing — full PRD, architecture, UX, review |
| **East Blue** | Small features, bug fixes, quick wins | Full DEFINE; jump to BUILD with a mini-PRD |

You pick once at the IDEATE stage. Stella adapts the rest of the flow.

### Governance runs in the background

Two guardrails are always on:

- **Scope enforcement** (codename: *Cipher Pol*) — if the AI wants to add a feature, route, endpoint, or table that isn't in your approved plan, it stops and flags you. You approve, reject, or amend.
- **Quality veto** (codename: *Buster Call*) — any critical security or quality issue (auth bypass, hardcoded secret, PII leak, untested payment flow) halts progress until resolved or explicitly waived.

Both get logged to `brain/` with timestamp, rationale, and your decision. Complete audit trail, zero effort.

### Your project's memory: the `brain/` directory

```
brain/
├── log-pose.md         — current phase, active work, blockers
├── vivre-cards.md      — append-only decision log
├── scope-changes.md    — audit trail of scope additions
├── project-context.md  — tech stack, constraints, non-negotiables
├── architecture.md     — tech decisions with rationale
├── design-system.md    — visual tokens and UI rules
├── ideas.md            — idea backlog
└── prd-*.md            — your PRDs, one per feature
```

Plain markdown. Human-readable. Committed to git. Reviewable in PRs. Six months from now, when someone asks "why did we ship X?" — the answer is in `vivre-cards.md`.

## What Makes Stella Different

Most AI coding workflows stop at "code written, tests pass, merge." Stella goes further:

1. **Product-first structure** — PRDs, architecture decisions, and UX are first-class outputs. Your PM work becomes the *input* to the build, not documentation written after the fact.
2. **Audit trail by default** — you don't have to remember to log decisions; the protocol does it.
3. **A Close phase** — docs and launch content are part of the workflow, not skipped with "we'll write it later."
4. **Graceful degradation** — small changes don't pay the full-process tax.

What Stella does NOT try to do: reinvent engineering discipline. TDD, verification, debugging, task planning — that's what [obra/superpowers](https://github.com/obra/superpowers) does, and it does it well. Stella delegates.

## Your First Project — End to End

### 1. Start with an idea

> "I'm thinking about building a community riddle platform."

Stella walks you through five lenses (problem, audience, differentiation, risks, why-now), then asks: go full process (**Grand Line**), lightweight (**East Blue**), park it, or kill it?

### 2. Define what you're building (Grand Line only)

Stella helps you produce:

- A **PRD** — features, acceptance criteria, constraints, what's out of scope
- **Architecture decisions** — stack, data model, API shape — each with its rationale
- **UX design** — user flows, screen maps, visual system

Everything lands in `brain/`. You can stop at any point and come back later — Stella reads state from `brain/` on the next session and picks up where you left off.

### 3. Build it

You say "start building." Stella orchestrates execution via superpowers (TDD, verification, debugging) and monitors scope + quality in the background.

After each significant feature, you get a pause:

```
FEATURE COMPLETE — User Authentication
Files changed: 8 | Verify: PASS

Review now (recommended) or continue?
```

If the AI hits a scope decision ("should I also add a password reset flow?"), you're asked — not told after it ships.

### 4. Review

Before launch, two review passes:

- **Adversarial / security** — what would an attacker actually try? Concrete exploits, not checklists.
- **Quality / QA** — are critical paths tested? Coverage gaps? Design-system violations?

Critical findings block deployment until resolved or explicitly waived.

### 5. Close

Stella helps you:

- Sync docs and `CHANGELOG.md` with the reality of what was shipped
- Draft a launch announcement, a tweet thread, a blog post, a changelog entry

Then you deploy. Stella doesn't touch deployment itself — that's your call, your infrastructure.

## Skills Reference

For the curious. You never invoke these directly — Stella routes automatically from conversation context.

**5 phase conversations:** `stella-protocol` · `stella-define` · `stella-build` · `stella-review` · `stella-close`

**4 specialist behaviors:**
- `shaka-brief` — idea exploration (5-lens + track selection)
- `shaka-prd` — PRD generation
- `pythagoras-research` — architecture and tech decisions
- `oda-design` — UX flows and design system

**3 governance behaviors:**
- `cipher-pol` — scope-drift monitor
- `buster-call` — quality/security veto
- `punk-records` — decision-log updater

**6 execution behaviors (via [obra/superpowers](https://github.com/obra/superpowers)):**
`test-driven-development` · `verification-before-completion` · `systematic-debugging` · `writing-plans` · `dispatching-parallel-agents` · `writing-skills`

> **A note on the names.** Cipher Pol, Buster Call, Shaka, Pythagoras, Vivre Card, Log Pose, Grand Line, East Blue — all One Piece references. It's flavor, not a learning curve. You never need to know the lore. The skill descriptions trigger the right behavior from plain-English conversation.

## Example Project

See the [full walkthrough](examples/README.md) — building [House of Riddle](https://riddle.thepunkrecords.com), a community riddle platform, through the entire Stella cycle with all `brain/` files populated.

## Common Questions

**Do I need to be a developer to use Stella?**
No. Stella is built for PMs. You describe what you want; the AI writes the code. Stella keeps both in sync and keeps the audit trail.

**Does Stella write code?**
No. Stella is a process and governance layer. Your AI agent (Claude Code, Cursor, etc.) writes the code. Stella directs the flow: which phase, what's in scope, when to pause for your approval.

**What if I want to ignore Stella's suggestions?**
You can. Stella flags scope drift and quality issues — you decide what to do about them. Nothing is forced. Governance is for your benefit, not a cage.

**Why the One Piece naming?**
Author's taste, kept because it's memorable. You never have to decode it — the skill descriptions work in plain English. Think of the codenames as flavor labels.

**How much setup is there?**
`npx stella-protocol install` + install superpowers. Then start talking. No config files, no YAML schemas, no learning curve.

**What happens when superpowers changes?**
Stella pins to a minimum superpowers version via the BUILD phase skill references. Execution-layer improvements come to you for free via superpowers releases. Stella focuses only on the PM/governance layer, so most superpowers updates don't affect Stella workflows.

## Tested On

- **Claude Code** — primary target, actively used.
- Works in theory on any tool that supports the Agent Skills open standard (Cursor, Copilot CLI, etc.). Multi-harness coverage is a work in progress; PRs welcome if you try it elsewhere and hit bumps.

## Philosophy

> You are not "talking to an AI agent." You are thinking, and specialized parts of your process activate to help you execute.

The protocols aren't tools you invoke — they're rules the AI follows so you can focus on product decisions, not AI management. Everything is plain markdown in `protocol/`: you can apply Stella's principles manually, without any tooling.

## License

MIT.

## Author

[Aditya Uttama](https://github.com/adityauttama) — Product Manager who builds 100% with AI.

- [LinkedIn](https://www.linkedin.com/in/adityauttama/)
- [GitHub](https://github.com/adityauttama)
