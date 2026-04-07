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
- **Cipher Pol** — scope drift logged to `scope-changes.md`, decisions to `vivre-cards.md`
- **Buster Call** — quality/security veto, 3 severities (CONCERN/WARNING/BUSTER CALL)

## Key Decisions

### 2026-04-07 — Dual file logging for Cipher Pol
Scope drift goes to `scope-changes.md` (primary audit trail), decisions go to `vivre-cards.md`. Separation of concerns — drift tracking and decision logging have different lifecycles.

### 2026-04-07 — Generic try-catch per CLI command
Error handling wraps entire command body, not individual file operations. Sufficient for a simple 3-command CLI.

### 2026-04-07 — Skills installed to both `skills/` (source) and `.claude/skills/` (installed copy)
Both must be kept in sync. No automated sync mechanism yet — manual during development.
