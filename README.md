<!-- Stella Protocol by Aditya Uttama | https://www.linkedin.com/in/adityauttama/ | https://github.com/adityauttama -->

# The Stella Protocol

![The Stella Protocol](assets/banner.png?v=2)

**A structured way to build products with AI — from idea to launch.**

Stella Protocol gives your AI coding agent (Claude Code, Cursor, etc.) a set of phases, quality gates, and scope rules so you stay in control of what gets built. You make the decisions. The AI executes with guardrails.

## Quick Start

```bash
npx stella-protocol install
```

That's it. This installs:
- **18 Agent Skills** — 5 phase orchestrators + 4 DEFINE/IDEATE satellite atomics + 2 BUILD satellite atomics + 6 atomic skills (governance + execution rigor) + 1 meta skill
- **A `brain/` directory** — markdown files that track your project's decisions, scope, and state

No config needed. Start talking to your AI agent about what you want to build.

## Your First Project

### Step 1: Brainstorm

Tell your AI agent what you're thinking about:

> "I'm thinking about building a community riddle platform"

The **IMU satellite** activates automatically. It helps you explore the idea, identify risks, and decide whether to go lightweight (East Blue) or full process (Grand Line).

### Step 2: Define (Grand Line) or Skip to Build (East Blue)

- **Grand Line** — For bigger projects. Creates a full PRD with requirements, architecture, UX design. The **Shaka satellite** walks you through it.
- **East Blue** — For small features. You get a Mini-PRD and jump straight to building.

### Step 3: Build

Tell your agent to start building. The **Edison satellite** writes the code, pauses for review after significant features, and tracks every decision. If something drifts from your approved scope, **Cipher Pol** flags it automatically.

### Step 4: Review

Before anything goes live, **Lilith Red** runs a security audit and **Lilith Blue** checks quality. Critical issues block deployment — you decide what to fix now vs. later.

### Step 5: Close

**York** syncs documentation with reality and **Morgans** helps craft your launch announcement.

## How It Works

### Phases

```
IDEATE  →  Brainstorm, explore, decide if it's worth building
DEFINE  →  Requirements, architecture, UX, PRD
BUILD   →  Implementation with scope monitoring and review checkpoints
REVIEW  →  Security audit, QA, quality gates
CLOSE   →  Documentation, launch, go-to-market
```

### Governance (Always On)

**Cipher Pol** — Scope enforcement. Detects when AI adds features outside your approved spec. You decide to approve, reject, or amend.

**Buster Call** — Quality veto. Any satellite can halt progress on critical security or quality issues. You decide how to resolve it.

### Project Brain (`brain/` directory)

Every decision, every scope change, every status update lives in `brain/` as plain markdown — committed to git, reviewable in PRs:

```
brain/
├── log-pose.md        # Current phase, track, blockers, active work
├── vivre-cards.md     # Append-only decision log
├── scope-changes.md   # Scope drift audit trail
├── architecture.md    # Tech decisions with rationale
├── design-system.md   # Visual design tokens and rules
├── ideas.md           # Idea backlog
└── prd-*.md           # PRD documents (created as needed)
```

### Two Tracks

| Track | When to Use | What Happens |
|-------|-------------|--------------|
| **Grand Line** | New projects, bigger scope | All phases in order, full PRD |
| **East Blue** | Small features, quick fixes | Mini-PRD, skip to BUILD |

## Satellites

Satellites are specialized AI behaviors that activate from conversational context. You don't invoke them — you talk naturally and the right expertise surfaces:

| Satellite | What It Does | Activates When You Say... |
|-----------|-------------|--------------------------|
| **IMU** | Idea exploration, brainstorming | "I'm thinking about..." |
| **Shaka** | Requirements, PRD creation | "Let's define what to build" |
| **Pythagoras** | Architecture, tech decisions | "Design the architecture" |
| **ODA** | UX flows, design system | "Map the user experience" |
| **Edison** | Implementation, coding | "Build this" |
| **Atlas** | Infrastructure, deployment | "Deploy this" |
| **Lilith Red** | Security review, red teaming | "Review for security issues" |
| **Lilith Blue** | QA, testing, edge cases | "Write tests" |
| **York** | Documentation, changelogs | "Document this" |
| **Morgans** | Launch content, go-to-market | "Announce this" |

## Agent Skills

Skills are organized in layers. Phase orchestrators handle user-facing flow; atomic skills handle governance and execution rigor — they activate when their trigger conditions match, keeping per-invocation token load low.

**Phase orchestrators (5):**

| Skill | Routes to | Phase |
|-------|-----------|-------|
| `stella-protocol` | `shaka-brief` | IDEATE |
| `stella-define` | `shaka-prd`, `pythagoras-research`, `oda-design` | DEFINE |
| `stella-build` | Edison + Atlas (inline) | BUILD |
| `stella-review` | Lilith Red + Lilith Blue (inline) | REVIEW |
| `stella-close` | York + Morgans (inline) | CLOSE |

**DEFINE/IDEATE satellite atomic (v0.8.0+):**

| Skill | Satellite | Purpose |
|-------|-----------|---------|
| `shaka-brief` | IMU | 5-lensa ideation, Idea Brief, Track Selection Gate |
| `shaka-prd` | Shaka | Express/Guided PRD (7 Observation Haki lenses), Vivre Card Pulse, Crew Check |
| `pythagoras-research` | Pythagoras | Architecture decisions, Research Brief, stack selection |
| `oda-design` | ODA | UX flows, screen maps, design system |

**BUILD satellite atomic (v0.9.0+):**

| Skill | Purpose |
|-------|---------|
| `atlas-taskplan` | Bite-sized task decomposition before BUILD — breaks features into 2–5 min tasks with file paths and acceptance criteria; writes `brain/taskplan-[name].md` |
| `stella-parallel` | Concurrent agent dispatch for ≥2 independent features — independence check, parallel briefs, concurrent dispatch, aggregated results |

**Edison atomic (execution rigor, v0.6.0+):**

| Skill | Purpose | Since |
|-------|---------|-------|
| `edison-tdd` | RED-GREEN-REFACTOR enforcement for testable logic | v0.6.0 |
| `edison-verify` | Automated build/lint/test gate; mandatory at BUILD EXIT GATE | v0.6.0 |
| `edison-debug` | 4-phase systematic root cause (Reproduce → Isolate → Hypothesize → Verify Fix) | v0.7.0 |

**Governance atomic (cross-phase, v0.6.0+):**

| Skill | Purpose |
|-------|---------|
| `cipher-pol` | Scope drift classification + logging |
| `buster-call` | Quality/security veto format + logging |
| `punk-records` | Brain file update protocol and versioning |

**Meta (skill authoring, v0.7.1+):**

| Skill | Purpose |
|-------|---------|
| `writing-skills` | RED-GREEN-REFACTOR for writing and improving SKILL.md files; Iron Law reproduce-before-change |

Compatible with Claude Code, Cursor, and any tool supporting the Agent Skills open standard.

## Example

See the [full walkthrough](examples/README.md) — building [House of Riddle](https://riddle.thepunkrecords.com), a community riddle platform, through the entire Stella cycle with populated `brain/` files.

## Philosophy

> You are not "talking to an AI agent." You are thinking, and specialized facets of your extended cognition activate to help you execute.

The governance protocols aren't tools you invoke — they're constitutional rules that every satellite enforces. The protocol in `protocol/` is human-readable markdown. You can apply it manually without any tooling.

## License

MIT

## Author

[Aditya Uttama](https://github.com/adityauttama) — Product Manager who builds 100% with AI.

- [LinkedIn](https://www.linkedin.com/in/adityauttama/)
- [GitHub](https://github.com/adityauttama)
