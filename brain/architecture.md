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
| Skill | Phase | Routes to |
|-------|-------|-----------|
| `stella-protocol` | IDEATE | `shaka-brief` |
| `stella-define` | DEFINE | `shaka-prd`, `pythagoras-research`, `oda-design` |
| `stella-build` | BUILD | Edison, Atlas, ODA (inline) |
| `stella-review` | REVIEW | Lilith Red, Lilith Blue (inline) |
| `stella-close` | CLOSE | York, Morgans (inline) |

**Layer 2 — DEFINE/IDEATE Satellite Atomic (invoked on-demand from orchestrators):**
| Skill | Satellite | Fungsi |
|-------|-----------|--------|
| `shaka-brief` | IMU | 5-lensa ideation, Idea Brief, Track Selection Gate |
| `shaka-prd` | Shaka | Express/Guided PRD generation, 7 Observation Haki lenses, Vivre Card Pulse, Crew Check |
| `pythagoras-research` | Pythagoras | Architecture decisions, Research Brief, stack selection |
| `oda-design` | ODA | UX flows, screen maps, design system |

**Layer 2 — BUILD Satellite Atomic (invoked before/during BUILD, v0.9.0+):**
| Skill | Satellite | Fungsi |
|-------|-----------|--------|
| `atlas-taskplan` | Atlas | Bite-sized task decomposition before BUILD; writes `brain/taskplan-[name].md` |
| `stella-parallel` | — | Concurrent agent dispatch for ≥2 independent features |

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

**Layer 4 — Meta (skill authoring, v0.7.1+):**
| Skill | Fungsi |
|-------|--------|
| `writing-skills` | RED-GREEN-REFACTOR for writing/improving SKILL.md files. Iron Law: no skill change without a documented failing scenario. |

Phase orchestrators reference atomic skills via prose pointer — they do NOT duplicate governance prose. Claude Code's skill auto-trigger handles activation based on each atomic skill's `description` field.

### Brain Files (7 templates)
`log-pose.md`, `project-context.md`, `architecture.md`, `vivre-cards.md`, `ideas.md`, `scope-changes.md`, `design-system.md`

### Governance
- **Cipher Pol** — scope drift logged to `scope-changes.md`, decisions to `vivre-cards.md`. Scoped triggers: only user-facing routes/endpoints/integrations/features trigger, not implementation files.
- **Buster Call** — quality/security veto, 3 severities (CONCERN/WARNING/BUSTER CALL)
- **EXIT GATES** — REFUSE pattern at end of stella-define, stella-build, stella-review. Hard conditions (missing PRD file, failed verify, open buster call) trigger REFUSE; soft reminders do not block. Waiver path: log to vivre-cards.md + Stella confirms.
- **Quality Track** — demo/production quality bar set once in stella-review, governs all findings
- **Feature Completion Protocol** — mandatory Punk Records checkpoint + review pause after each significant feature in BUILD
- **Vivre Cards Version Boundary** — version markers + archiving when >50 entries

### Brain Files (7 templates + 1 generated)
`log-pose.md`, `project-context.md`, `architecture.md`, `vivre-cards.md`, `ideas.md`, `scope-changes.md`, `design-system.md`
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

### 2026-04-18 — writing-skills meta skill added as Layer 4 (v0.7.1)
Skills are prompts. Prompts have failure modes. Without a systematic improvement cycle, skill edits are guesswork — "it could be clearer" without a concrete failing scenario. `writing-skills` applies RED-GREEN-REFACTOR to SKILL.md authoring: document a concrete failure case first (trigger/output/over-trigger/gap), make the minimum fix, then refactor. Iron Law: no skill change without a documented failing scenario. Builds a regression log for skill evolution. Inspiration: `obra/superpowers/skills/writing-skills`.

### 2026-04-18 — Lilith Red Adversarial Mode added to stella-review (v0.7.1)
Spec Pass and Code Pass look for "what could break." Adversarial Mode looks for "what would I exploit." The posture shift — assume a malicious, informed attacker rather than an unlucky user — surfaces a different class of findings (intentional abuse vectors vs accidental bugs). Structured as: threat-model the surface → pick top 3 highest-value targets → write the concrete attack → predict system response → propose minimal fix. Opt-in (trigger: Stella requests "red team" or pre-release with money/PII/auth). Inspiration: BMAD adversarial review patterns + standard threat-modeling methodology.

### 2026-04-20 — Satellite atomic skills for IDEATE/DEFINE extracted (v0.8.0)
`stella-protocol` (106 → 36 LOC) and `stella-define` (160 → 51 LOC) reduced to thin orchestrators. Satellite logic extracted to 4 independent atomic skills: `shaka-brief` (103 LOC), `shaka-prd` (112 LOC), `pythagoras-research` (55 LOC), `oda-design` (75 LOC). Satellite skills activate on-demand via skill auto-trigger — `shaka-prd` only loads when PRD work is active, `pythagoras-research` only when architecture decisions are needed, etc. Per-session token footprint for focused sessions (PRD only, or architecture only) drops 30–60% vs monolithic approach.

Trade-offs: for sessions needing all three DEFINE satellites simultaneously, total LOC (51+112+55+75=293) exceeds old stella-define (160). Accepted — mixed sessions are uncommon; single-satellite sessions are the norm. Consistent with the Layer 2 extraction pattern established in v0.6.0 (Edison + governance atomics).

### 2026-04-20 — atlas-taskplan and stella-parallel added as Layer 2 BUILD satellite atomic (v0.9.0)

`atlas-taskplan` fills the gap where BUILD began without explicit task decomposition. Decomposes each PRD feature into 2–5 minute tasks with exact file paths, what to change, and a one-sentence acceptance criterion. Tasks grouped by feature, ordered by dependency. Output written to `brain/taskplan-[prd-name].md`. Invoked from stella-build Entry Gate suggestion when ≥2 features detected.

`stella-parallel` adds concurrent agent dispatch for PRD features that have no shared files and no sequential dependencies. Extends (not replaces) the existing subagent-per-feature pattern: subagent-per-feature dispatches features one-at-a-time sequentially; stella-parallel dispatches multiple feature briefs in a single message for true concurrency. Safety rule: if two features touch the same file, they must be sequential. Independence check reads `brain/taskplan-[name].md` Shared-File Conflicts section (or assesses manually when taskplan is absent).

`stella-build` Entry Gate added: checks `brain/prd-[name].md` exists before BUILD starts (redirect to stella-define if missing), checks `brain/log-pose.md` phase is build-ready or in-progress (prompt for confirmation otherwise), and suggests atlas-taskplan when ≥2 features detected.

Trade-offs: atlas-taskplan is recommended for ≥2 features, not mandatory for hotfix/single-feature — avoiding process overhead on simple BUILDs. stella-parallel requires proven independence; default is sequential to prevent merge conflicts.

**Layer 2 — BUILD Satellite Atomic (v0.9.0+):**
| Skill | Satellite | Fungsi |
|-------|-----------|--------|
| `atlas-taskplan` | Atlas | Bite-sized task decomposition before BUILD; writes `brain/taskplan-[name].md` |
| `stella-parallel` | — | Concurrent agent dispatch for ≥2 independent features |

### 2026-04-20 — Hard-block EXIT GATES and project-context.md (v0.10.0)

EXIT GATES in stella-define, stella-build, and stella-review changed from soft checklist (agent outputs "[ ] checked" without consequence) to REFUSE pattern. Hard conditions: stella-define refuses if PRD file missing or not approved; stella-build refuses if P0 features missing, edison-verify FAIL without waiver, or OPEN Buster Call at WARNING+; stella-review refuses if Critical finding unresolved or test-plan.md missing. Waiver path preserved: agent logs reason to vivre-cards.md, waits for Stella to confirm "proceed with waiver."

`brain/project-context.md` added as 7th init template — single source of truth for tech stack + critical constraints. Auto-loaded by CLAUDE.md session hook (step 2). Populated during DEFINE, read every session. Eliminates "re-discover stack from architecture.md" pattern for active projects.

Trade-offs: Hard REFUSE is stricter but waiver path ensures Stella retains override control. project-context.md is a new brain/ file responsibility — teams must fill it during DEFINE for it to be useful.

### 2026-04-18 — Lilith Blue Checkpoint Preview added to stella-review (v0.7.1)
Multi-file diffs presented alphabetically by file path hide risk distribution — a critical auth change in `auth/middleware.ts` is visually equal to a cosmetic rename in `utils/helpers.ts`. Checkpoint Preview groups diff hunks into 4 concern buckets (Security/Auth → Correctness → Quality → Cosmetic) and presents them in that order. Security findings must be acknowledged per item; cosmetic can be bulk-approved. Reduces reviewer fatigue masking high-risk changes at the bottom. Inspiration: `obra/superpowers/skills/requesting-code-review`.
