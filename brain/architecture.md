# Architecture

> Tech decisions with rationale. Locked once approved — reopen explicitly.

## Stack

| Layer | Choice | Rationale |
|-------|--------|-----------|
| Runtime | Node.js >=20.0.0 | CLI tool, CJS module system |
| CLI framework | Commander.js ^14.0.0 | Standard, lightweight CLI parsing |
| Interactive prompts | @clack/prompts ^1.0.0 | Beautiful terminal UIs |
| Terminal styling | Chalk ^4.1.2 | CJS-compatible color output |
| Filesystem | fs-extra ^11.3.0 | Safe copy, ensureDir, readFile |

## Data Model

N/A — stella-protocol is a CLI + skill files framework. No database or persistent data model. State is stored in `brain/` markdown files per-project.

## API Surface

### CLI Commands
| Command | Description |
|---------|-------------|
| `stella install` | Install 5 skills + init brain/ + add CLAUDE.md hook |
| `stella init` | Initialize brain/ only (6 templates) |
| `stella status` | Display project status from brain/log-pose.md |

### Skill Files (5)
| Skill | Phase | Satellites |
|-------|-------|------------|
| `stella-protocol` | IDEATE | IMU |
| `stella-define` | DEFINE | Shaka, Pythagoras, ODA |
| `stella-build` | BUILD | Edison, Atlas, ODA |
| `stella-review` | REVIEW | Lilith Red, Lilith Blue |
| `stella-close` | CLOSE | York, Morgans |

### Brain Files (6 templates)
`log-pose.md`, `architecture.md`, `vivre-cards.md`, `ideas.md`, `scope-changes.md`, `design-system.md`

### Governance
- **Cipher Pol** — scope drift logged to `scope-changes.md`, decisions to `vivre-cards.md`. Scoped triggers: only user-facing routes/endpoints/integrations/features trigger, not implementation files.
- **Buster Call** — quality/security veto, 3 severities (CONCERN/WARNING/BUSTER CALL)
- **EXIT GATES** — mandatory checklists at the end of stella-build, stella-define, stella-review that block phase transition until prerequisites are met
- **Quality Track** — demo/production quality bar set once in stella-review, governs all findings
- **Feature Completion Protocol** — mandatory Punk Records checkpoint + review pause after each significant feature in BUILD
- **Vivre Cards Version Boundary** — version markers + archiving when >50 entries

### Brain Files (6 templates + 1 generated)
`log-pose.md`, `architecture.md`, `vivre-cards.md`, `ideas.md`, `scope-changes.md`, `design-system.md`
Generated during BUILD: `preflight.md` (Atlas Pre-Flight checklist, mandatory before deploy)

## Key Decisions

### 2026-04-07 — Dual file logging for Cipher Pol
Scope drift goes to `scope-changes.md` (primary audit trail), decisions go to `vivre-cards.md`. Separation of concerns — drift tracking and decision logging have different lifecycles.

### 2026-04-07 — Generic try-catch per CLI command
Error handling wraps entire command body, not individual file operations. Sufficient for a simple 3-command CLI.

### 2026-04-07 — Skills installed to both `skills/` (source) and `.claude/skills/` (installed copy)
Both must be kept in sync. No automated sync mechanism yet — manual during development.

### 2026-04-09 — Enforcement via formatted output blocks, not prose
Agents comply with "output this format" instructions better than "remember to do X" prose. All enforcement gates (EXIT GATE, PUNK RECORDS CHECKPOINT, FEATURE COMPLETE) require visible formatted output that both agent and Stella can verify.

### 2026-04-09 — Cipher Pol scoped to surface area, not files
"Any new file" was too broad (15+ files per BUILD session = noise). Scoped to user-facing routes, API endpoints, DB tables, external integrations, and features NOT in PRD. Implementation files (components, utils, tests, configs) do not trigger.

### 2026-04-09 — Quality Track set once per project, not per finding
Demo vs production quality bar is set once when REVIEW first activates, recorded in log-pose.md frontmatter. Prevents per-finding "acceptable for demo" negotiation.
