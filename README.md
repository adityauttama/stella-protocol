<!-- Stella Protocol by Aditya Uttama | https://www.linkedin.com/in/adityauttama/ | https://github.com/adityauttama -->

# The Stella Protocol

![The Stella Protocol](assets/banner.png?v=2)

**PM-first AI development protocol. One mind, many satellites.**

Stella is a structured methodology for Product Managers who build 100% with AI. Instead of calling independent AI agents, **you are Stella** — the original mind — and AI operates as specialized extensions of your thinking called **Satellites**.

## Why Stella?

Most AI development frameworks are built for developers. Stella is built for **the PM who owns the product vision and uses AI to execute everything else** — architecture, code, tests, deployment, documentation.

- **No commands to memorize.** Satellites activate from natural conversation, not slash commands.
- **Built-in governance.** Scope enforcement and veto protocols are always on — not optional tools you remember to invoke.
- **Persistent project brain.** A structured `brain/` directory tracks decisions, state, and scope — committed to git, reviewable in PRs.

## Quick Start

```bash
npx stella-protocol install
```

This will:
1. Install 5 phase-based Agent Skills into your AI tool
2. Initialize a `brain/` directory (Punk Records) in your project
3. You're ready — start by telling your AI what you want to build

## The Protocol

### Phases

```
PHASE 0: IDEATE    →  Think about the problem space
PHASE 1: DEFINE    →  Requirements, architecture, UX, PRD
PHASE 2: BUILD     →  Implementation, deployment
PHASE 2.5: ITERATE →  Post-launch feedback loop
PHASE 3: CLOSE     →  Documentation, launch, go-to-market
```

### Two Tracks

| Track | When to Use | What Happens |
|-------|-------------|--------------|
| **Grand Line** (Full) | New projects, >1 week scope | All phases in order, full PRD |
| **East Blue** (Lightweight) | Small features, <1 week | Idea Brief with Mini-PRD, skip to BUILD |

### Satellites

Satellites are specialized facets of your extended cognition. They activate from conversational context:

| Say This... | Satellite Activates | What It Does |
|-------------|-------------------|--------------|
| "I'm thinking about..." | **IMU** | Strategic vision, idea mapping (Express or Guided mode), mandatory track selection |
| "Let's define the requirements" | **Shaka** | PRD creation (Express or Guided lens-by-lens), scope definition, acceptance criteria |
| "Design the architecture" | **Pythagoras** | System design, tech decisions, data model |
| "Map the UX" | **ODA** | User flows, wireframes, design specs |
| "Build this" | **Edison** | Implementation, coding, all production code |
| "Review for security issues" | **Lilith Red** | Adversarial review, security audit |
| "Write tests" | **Lilith Blue** | QA, test suites, edge case coverage |
| "Deploy this" | **Atlas** | Infrastructure, CI/CD, deployment |
| "Document this" | **York** | Knowledge capture, changelogs |
| "Announce this" | **Morgans** | Launch, blog posts, go-to-market |

### Governance (Always On)

**Buster Call** — Any satellite can halt progress when it identifies critical issues. Severity: CONCERN → WARNING → BUSTER CALL. At BUSTER CALL level, work stops until you resolve it.

**Cipher Pol** — Continuous scope monitoring against the approved PRD. Severity: INTEL → ALERT → INTERCEPT. Drift is detected and flagged automatically. You decide whether to approve or reject.

### Punk Records (Project Brain)

Every project gets a `brain/` directory — git-committed, PR-reviewable:

```
brain/
├── log-pose.md        # Where are we? Phase, track, blockers, active work
├── architecture.md    # Tech decisions with rationale
├── vivre-cards.md     # Append-only decision log
├── ideas.md           # Unprocessed idea backlog
└── prd-*.md           # PRD documents (created as needed)
```

## Agent Skills

Stella packages satellites into 5 phase-based skills:

| Skill | Contains | Activates When |
|-------|----------|----------------|
| `stella-protocol` | Orchestrator + IMU | Starting a project, "what's next," phase routing |
| `stella-define` | Shaka + Pythagoras + ODA | Requirements, architecture, UX, PRDs |
| `stella-build` | Edison + Atlas | Coding, deploying, implementation |
| `stella-review` | Lilith Red + Lilith Blue | Code review, security, QA |
| `stella-close` | York + Morgans | Documentation, launch, go-to-market |

Compatible with Claude Code, Cursor, and any tool supporting the Agent Skills open standard.

## Philosophy

> You are not "talking to an AI agent." You are thinking, and specialized facets of your extended cognition activate to help you execute.

Stella inverts the typical framework model. You don't call agents — you think out loud, and the right expertise surfaces. The governance protocols aren't tools you invoke — they're constitutional rules that every satellite enforces.

This is a protocol, not a product. The methodology in `protocol/` is human-readable markdown. You can apply it manually without any tooling. The `skills/` layer packages it for AI tools, but the protocol stands on its own.

## Project Structure

```
stella-protocol/
├── protocol/          # The methodology (human-readable markdown)
│   ├── stella.md      # Master protocol
│   ├── satellites/    # Satellite definitions
│   ├── governance/    # Buster Call + Cipher Pol
│   └── tracks/        # Grand Line + East Blue
├── punk-records/      # Brain directory templates
├── skills/            # Agent Skills (AI-consumable)
├── cli/               # CLI installer
└── docs/              # Documentation
```

## Example

See the [full walkthrough](examples/README.md) — a real example building "House of Riddle" (a community riddle platform, live at [riddle.thepunkrecords.com](https://riddle.thepunkrecords.com)) through the entire Stella cycle, with populated `brain/` files showing what each phase produces.

## License

MIT

## Author

[Aditya Uttama](https://github.com/adityauttama) — Product Manager who builds 100% with AI.

- [LinkedIn](https://www.linkedin.com/in/adityauttama/)
- [GitHub](https://github.com/adityauttama)
