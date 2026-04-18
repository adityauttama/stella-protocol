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

### Skill Files (layered — v0.6.0)

**Layer 1 — Phase Orchestrators (5, user-facing):**
| Skill | Phase | Satellites |
|-------|-------|------------|
| `stella-protocol` | IDEATE | IMU |
| `stella-define` | DEFINE | Shaka, Pythagoras, ODA |
| `stella-build` | BUILD | Edison, Atlas, ODA |
| `stella-review` | REVIEW | Lilith Red, Lilith Blue |
| `stella-close` | CLOSE | York, Morgans |

**Layer 2 — Edison Atomic (execution rigor, invoked during BUILD):**
| Skill | Fungsi |
|-------|--------|
| `edison-tdd` | RED-GREEN-REFACTOR cycle for testable logic |
| `edison-verify` | Automated build/lint/test gate; mandatory at BUILD EXIT GATE |
| `edison-debug` | 4-phase systematic root cause (Reproduce → Isolate → Hypothesize → Verify Fix); Iron Law reproduce-before-fix (v0.7.0+) |

**Layer 3 — Governance Atomic (cross-phase, shared):**
| Skill | Fungsi |
|-------|--------|
| `cipher-pol` | Scope drift classification + logging |
| `buster-call` | Quality/security veto format + logging |
| `punk-records` | Brain file update protocol (log-pose, vivre-cards, architecture, versioning) |

Phase orchestrators reference atomic skills via prose pointer — they do NOT duplicate governance prose. Claude Code's skill auto-trigger handles activation based on each atomic skill's `description` field.

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

### 2026-04-18 — Layered skill architecture (v0.6.0)
Phase skills reduced from monolithic (139-299 LOC, governance prose duplicated 3+ times) to orchestrators (84-167 LOC) that reference atomic skills. Three governance atomic skills (cipher-pol, buster-call, punk-records) hold the canonical format and logging rules, invoked via Claude Code's skill auto-trigger. Two Edison atomic skills (edison-tdd, edison-verify) introduce TDD enforcement and automated verification — edison-verify is mandatory at BUILD EXIT GATE. Inspiration: obra/superpowers (atomic skills + TDD Iron Law + verification-before-completion) and bmad-code-org/BMAD-METHOD (scale-adaptive agent layering, project-context-as-constitution).

Trade-offs: total LOC across all skill files is ~1,116 (vs 1,138 before) — similar footprint but better distribution. Per-session load improves significantly because atomic skills only materialize when their trigger conditions match. Governance prose deduplicated.

### 2026-04-18 — edison-verify mandatory at BUILD EXIT GATE
Previously the EXIT GATE was a checklist of brain file states ("log-pose current, vivre-cards has entries, preflight exists"). Now it additionally requires `edison-verify` to PASS (build + lint + test) or a documented waiver in vivre-cards.md. Claims without automated verification are not evidence.

### 2026-04-18 — edison-tdd opt-in, not enforced
TDD is available as a first-class skill in v0.6.0 but orchestrators suggest rather than require. Enforcement defers to future version after baseline usage proves the ergonomics. Mirrors the "discipline via skill, not via global config" pattern from obra/superpowers.

### 2026-04-18 — edison-debug added as Layer 2 atomic skill (v0.7.0)
Introduced `edison-debug` for systematic root cause analysis — 4-phase flow (Reproduce → Isolate → Hypothesize → Verify Fix) with Iron Law: no fix merged without reproducing the bug first. Previously bug work fell through a gap — `edison-tdd` covers new testable logic, `edison-verify` confirms a fix didn't regress, but there was no canonical protocol between symptom and fix. Inspiration: `obra/superpowers/skills/systematic-debugging`.

### 2026-04-18 — Subagent-per-feature dispatch pattern in stella-build (v0.7.0)
For long multi-feature BUILDs, `stella-build` now dispatches each significant feature (≥3 files OR ≥150 LOC expected, OR feature 3+ in a session with ≥5 remaining) to a fresh `Agent` subagent. Parent retains `log-pose.md`, `scope-changes.md`, PRD index, governance state. Subagent receives a self-contained brief (spec + acceptance criteria + file pointers, NOT full PRD) and returns a summary. Parent runs Feature Completion Protocol (Punk Records + review pause) on the returned summary. Prevents context bloat across features — quality of feature 5 no longer degraded by accumulated feature 1–4 implementation details. Inspiration: `obra/superpowers/skills/subagent-driven-development`.
