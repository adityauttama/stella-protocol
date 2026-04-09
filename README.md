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
- **5 Agent Skills** — phase-based instructions your AI agent follows automatically
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

Skills package satellites into 5 phase-based files:

| Skill | Satellites | Phase |
|-------|-----------|-------|
| `stella-protocol` | IMU | IDEATE |
| `stella-define` | Shaka + Pythagoras + ODA | DEFINE |
| `stella-build` | Edison + Atlas | BUILD |
| `stella-review` | Lilith Red + Lilith Blue | REVIEW |
| `stella-close` | York + Morgans | CLOSE |

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
