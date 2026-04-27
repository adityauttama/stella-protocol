# Vivre Cards — Decision Log

> Append-only. Never edit past entries. Each card points back to the moment a decision was made.
> _Previous versions archived to [`brain/vivre-cards-archive.md`](vivre-cards-archive.md)_

## Format

```markdown
### [YYYY-MM-DD] [Decision Title]
**Phase:** [current phase]
**Satellite:** [who raised/made this]
**Decision:** [what was decided]
**Rationale:** [why]
**Alternatives:** [what else was considered]
```

---

---
## === v0.8.0 — 2026-04-20 — Satellite Atomic Skills ===
### Summary: Extracted shaka-brief + shaka-prd + pythagoras-research + oda-design dari phase orchestrators. stella-protocol 106→36 LOC, stella-define 160→51 LOC. 16 skills total (5 phase + 4 DEFINE/IDEATE satellite + 3 Edison + 3 governance + 1 meta).
### Decision count: 4 entries (track selection, build complete, review complete, close)
---

### 2026-04-20 Track Selection: East Blue for v0.8.0 Satellite Atomic Skills
**Phase:** IDEATE → BUILD
**Satellite:** IMU
**Decision:** East Blue track selected for "v0.8.0 Satellite Atomic Skills" sprint. Deferred P1 from v0.6.0: extract shaka-brief, shaka-prd, pythagoras-research, oda-design from stella-protocol and stella-define. Objective: minimalisir token per session dengan lazy-load per satellite.
**Rationale:** Scope well-defined — pure extraction, no new functionality. All 4 satellite skills have verbatim content sources. No architectural shifts. Confirmed improvement 9 april items are already shipped (v0.5.0–v0.7.1). East Blue sufficient.
**Alternatives:** Grand Line (rejected — no ambiguity in requirements, extraction is mechanical); combining with v0.9.0 stella-review/build slim (rejected — would bloat sprint scope).

### 2026-04-20 REVIEW Complete: Satellite Atomic Skills v0.8.0
**Phase:** REVIEW
**Satellite:** Lilith Red + Lilith Blue (self-review)
**Decision:** All clear. No BUSTER CALL findings. Two Medium: M1 — stella-build ODA inline duplicates oda-design Visual Review Mode (deferred to v0.9.0, by design). M2 — pythagoras-research Research Brief adds "Open Questions" field not in original (kept as improvement). All non-negotiables verified verbatim: IMU 5-lensa, Shaka 7-lens Guided, Vivre Card Pulse, Crew Check, Track Selection Gate, phase gates.
**Rationale:** Mechanical extraction with no behavior changes — no security surface, no auth, no user input. Both Medium findings accepted without action. brain/test-plan.md created with 20+ manual QA checkpoints.
**Alternatives:** Deferred M1 fix (rejected — v0.9.0 is correct scope for stella-build slim).

### 2026-04-20 CLOSE: Satellite Atomic Skills v0.8.0
**Phase:** CLOSE
**Satellite:** York
**Decision:** Version closed as 0.8.0. package.json bumped 0.7.1 → 0.8.0. brain/log-pose.md → phase closed. vivre-cards.md version boundary inserted. All documentation already updated during BUILD (architecture.md Layer 2 expanded, README "16 Agent Skills", CLAUDE.md satellite layer, CHANGELOG v0.8.0 entry).
**Rationale:** All Mini-PRD items shipped, self-review clean (no BUSTER CALL), documentation aligned with reality. 16 skills total: 5 phase orchestrators + 4 DEFINE/IDEATE satellite atomic + 3 Edison atomic + 3 governance atomic + 1 meta.
**Alternatives:** None.

### 2026-04-20 BUILD Complete: Satellite Atomic Skills v0.8.0
**Phase:** BUILD
**Satellite:** Edison
**Decision:** All 4 satellite skills created. shaka-brief (103 LOC), shaka-prd (112 LOC), pythagoras-research (55 LOC), oda-design (75 LOC). stella-protocol slimmed 106→36 LOC, stella-define 160→51 LOC. Both source and .claude/skills/ mirrors in sync. Documentation updated: architecture.md Layer 2 expanded, README "16 Agent Skills", CLAUDE.md updated, CHANGELOG v0.8.0 entry. No scope drift — all items in Mini-PRD.
**Rationale:** Mechanical extraction — satellite content moved verbatim, orchestrators reduced to routing logic. All non-negotiables preserved (IMU 5-lensa, Shaka 7-lens Guided, Vivre Card Pulse, Crew Check, One Piece naming, phase gates).
**Alternatives:** Split into 2 PRs (rejected — all extractions are interdependent, rolling back one means rolling back all).

---
## === v0.8.1 — 2026-04-20 — Token Efficiency Pass ===
### Summary: Fixed HTML frontmatter bug across 32 files (16 source + 16 mirror). Trimmed all 16 skill descriptions to <250 chars. Archived vivre-cards v0.4.2–v0.7.1. Moved 3 shipped PRDs to brain/archive/. ~5K token reduction per session.
### Decision count: 3 entries (track selection, build complete, close)
---

### 2026-04-20 Track Selection: East Blue for v0.8.1 Token Efficiency
**Phase:** IDEATE → BUILD
**Satellite:** IMU
**Decision:** East Blue track selected for "v0.8.1 Token Efficiency" pass. P0 items from post-v0.8.0 review: fix HTML comment breaking frontmatter (CRITICAL — all 16 skills were showing `<!-- Stella Protocol...` as description instead of `description:` field), trim skill descriptions, archive vivre-cards, archive shipped PRDs.
**Rationale:** All changes are mechanical edits — no new functionality, no architectural shifts. Critical frontmatter bug means skills couldn't auto-trigger correctly via description matching. vivre-cards.md at 228 lines / ~5.4K tokens was dominant session-start token cost. East Blue scope appropriate.
**Alternatives:** Grand Line (rejected — no architectural decisions needed).

### 2026-04-20 BUILD Complete: Token Efficiency v0.8.1
**Phase:** BUILD
**Satellite:** Edison
**Decision:** All P0 items shipped. (1) HTML frontmatter bug fixed — moved `<!-- Stella Protocol... -->` comment to after closing `---` in all 32 SKILL.md files (16 source + 16 mirror). (2) All 16 skill descriptions trimmed to <250 chars, changed from multi-line `description: >` blocks to single-line. (3) vivre-cards-archive.md created with v0.4.2–v0.7.1 entries; vivre-cards.md trimmed to header + v0.8.0+ entries. (4) brain/archive/ created; 3 shipped PRDs moved (prd-self-healing.md, prd-atomic-skills.md, idea-atomic-skills-v0.6.0.md). No scope drift.
**Rationale:** Critical frontmatter fix ensures all 16 skills are now auto-triggerable with correct descriptions visible in Claude Code skill listing. Token savings: ~5K tokens/session from vivre-cards archiving.
**Alternatives:** None — straightforward execution.

### 2026-04-20 CLOSE: Token Efficiency v0.8.1
**Phase:** CLOSE
**Satellite:** York
**Decision:** Version closed as 0.8.1. package.json bumped 0.8.0 → 0.8.1. brain/log-pose.md → v0.8.1 heading. vivre-cards.md v0.8.1 version boundary appended. CHANGELOG.md v0.8.1 entry added.
**Rationale:** All P0 items shipped. Zero functional regressions — only frontmatter structure and file organization changed. All 16 skill descriptions now correctly parsed by Claude Code.
**Alternatives:** None.

---
## === v0.8.2 — 2026-04-20 — Cleanup Sprint ===
### Summary: Triaged improvement-2026-04-09.md (all 10 findings shipped v0.5.0–v0.8.1). Archived launch-content.md. Created brain/README.md. README rewrite idea parked.
### Decision count: 2 entries (build + close)
---

### 2026-04-20 BUILD Complete: Cleanup Sprint v0.8.2
**Phase:** BUILD
**Satellite:** Edison
**Decision:** P1.3 — All 10 findings in `improvement 9 april.md` confirmed shipped across v0.5.0–v0.8.1. File archived to `brain/archive/improvement-2026-04-09.md`. README clarity idea added to `brain/ideas.md` Parked section. P1.4 — `brain/launch-content.md` (Morgans artifact) archived; `brain/README.md` created with file lifecycle guide. P1.5 — No action: stella-close 78 LOC (<100 target), stella-define 45 LOC (<70 target), both within targets.
**Rationale:** Orphaned docs cleared; brain/ directory now self-documenting. All improvement-9-april findings addressed by prior sprints — no new skill changes needed.
**Alternatives:** None.

### 2026-04-20 CLOSE: Cleanup Sprint v0.8.2
**Phase:** CLOSE
**Satellite:** York
**Decision:** Version closed as 0.8.2. package.json bumped 0.8.1 → 0.8.2. brain/log-pose.md → v0.8.2 heading. CHANGELOG.md v0.8.2 entry added.
**Rationale:** All P1.3+P1.4+P1.5 items resolved. Zero risk — file moves and new README only. brain/ directory now has a clear lifecycle guide.
**Alternatives:** None.

---
## === v0.10.0 — 2026-04-20 — Structural Governance ===
### Summary: Hard-block EXIT GATES in stella-define + stella-build + stella-review (REFUSE pattern, waiver path preserved). brain/project-context.md added as 7th init template + CLAUDE.md session hook. 18 skills total (unchanged count — behavioral change only).
### Decision count: 4 entries (track selection + DEFINE, BUILD complete, REVIEW complete, close)
---

### 2026-04-20 Track Selection + DEFINE Complete: Structural Governance v0.10.0
**Phase:** IDEATE → DEFINE
**Satellite:** IMU + Shaka
**Decision:** Grand Line track for "Structural Governance v0.10.0". PRD approved. 2 P0 items: (1) hard-block EXIT GATES in stella-define + stella-build + stella-review (REFUSE pattern, waiver path preserved), (2) brain/project-context.md template added to stella init + CLAUDE.md session hook. P1: fill project-context.md for stella-protocol itself.
**Rationale:** EXIT GATES bisa di-skip tanpa consequence karena format checklist — agent tidak HARUS output REFUSE, hanya output checklist. project-context.md solves "re-discover stack every session" problem. Slim orchestrators (v0.11.0 candidate) deprioritized — behavioral change > LOC reduction.
**Alternatives:** Slim orchestrators first (East Blue, rejected — marginal token saving vs meaningful enforcement change).

### 2026-04-20 BUILD Complete: Structural Governance v0.10.0
**Phase:** BUILD
**Satellite:** Edison
**Decision:** All P0+P1 items shipped. (1) EXIT GATE REFUSE pattern applied to stella-define + stella-build + stella-review (source + mirror = 6 files). Hard conditions defined, waiver path preserved, soft conditions demoted to reminders. (2) `punk-records/project-context.md` template created. `cli/init.js` copies 7 templates (was 6), replaces `{project-name}` in project-context.md. CLAUDE.md session hook step 2 added (reads project-context.md); steps renumbered 3–8. (3) `brain/project-context.md` filled for stella-protocol dogfooding. Documentation updated: architecture.md EXIT GATE description + Brain Files 6→7 + v0.10.0 decision entry; brain/README.md project-context.md row; CHANGELOG.md v0.10.0 entry; package.json 0.9.0→0.10.0. No scope drift — all items in PRD.
**Rationale:** Mechanical edit across 3 skill files + CLI + CLAUDE.md. No new functionality — enforcement pattern change only. All non-negotiables preserved (waiver path intact, soft conditions still present as reminders).
**Alternatives:** None.

### 2026-04-20 CLOSE: Structural Governance v0.10.0
**Phase:** CLOSE
**Satellite:** York
**Decision:** Version closed as 0.10.0. package.json bumped 0.9.0 → 0.10.0. brain/log-pose.md → v0.10.0 CLOSED heading. vivre-cards.md v0.10.0 summary + all 4 entries complete. CHANGELOG.md v0.10.0 entry added during BUILD. brain/prd-structural-governance.md archived to brain/archive/. 18 skills total (unchanged — behavioral enforcement change only, no new skill files).
**Rationale:** All PRD items shipped, REVIEW clean (no BUSTER CALL), documentation aligned.
**Alternatives:** None.

### 2026-04-20 REVIEW Complete: Structural Governance v0.10.0
**Phase:** REVIEW
**Satellite:** Lilith Red + Lilith Blue (self-review)
**Decision:** All clear. No BUSTER CALL findings. Two Medium accepted without action: M1 — cli/init.js fails completely on stale npm-cached installs missing project-context.md template (deferred — only hypothetical stale installs affected; new installs unaffected). M2 — stella-review EXIT GATE "Critical finding unresolved" is agent-assessed, not file-checked (accepted by design — the PRD scoped hard blocks to observable conditions; LLM judgment required for finding detection). All non-negotiables verified intact. PRD spec compliance 100% — all 7 deliverables match spec. Mirror sync clean (diff = 0 all 3 pairs; bonus: fixed pre-existing stray lines in stella-define + stella-review mirrors). brain/test-plan.md exists with v0.10.0 QA checklist.
**Rationale:** Pure skill file + CLI sprint — no auth, no database, no user input. Attack surface is nil. Quality risk is behavioral (enforcement compliance) not security. Both Medium findings accepted.
**Alternatives:** Fix M2 via formal buster-call requirement in stella-review (rejected — would make the gate more rigid without fixing the root issue of agent-assessed findings).

---
## === v0.9.0 — 2026-04-20 — Superpowers Adoption ===
### Summary: atlas-taskplan + stella-parallel (2 new BUILD satellite skills). stella-build Entry Gate added. Superpowers attribution removed from 8 skill files + CHANGELOG. 18 skills total.
### Decision count: 4 entries (DEFINE complete, BUILD complete, REVIEW complete, close)
---

### 2026-04-20 DEFINE Complete: Superpowers Adoption v0.9.0
**Phase:** DEFINE
**Satellite:** Shaka
**Decision:** PRD approved. Scope: 3 items — `atlas-taskplan` (P0, ~80 LOC), design-approval gate in `stella-build` (P0, ~10 LOC), `stella-parallel` (P1, ~70 LOC). `stella-foundation` explicitly deferred — CLAUDE.md session hook already covers the use case. Track: Grand Line.
**Rationale:** atlas-taskplan fills gap of no task decomposition before BUILD. Design-approval gate closes the "BUILD without PRD" failure mode. stella-parallel enables concurrent dispatch for independent features (extends, not replaces, subagent-per-feature). stella-foundation deferred as marginal value over existing CLAUDE.md.
**Alternatives:** Including stella-foundation (rejected — redundant with CLAUDE.md auto-load; would add ~50 LOC for minimal gain).

### 2026-04-20 BUILD Complete: Superpowers Adoption v0.9.0
**Phase:** BUILD
**Satellite:** Edison
**Decision:** All 3 P0/P1 items shipped. (1) `atlas-taskplan` created — 68 LOC (source + mirror). (2) `stella-build` Entry Gate added — 10 LOC. (3) `stella-parallel` created — 75 LOC (source + mirror). Documentation updated: CLAUDE.md BUILD satellite layer, README 16→18 skills, brain/architecture.md Layer 2 BUILD table + decision entry, brain/README.md taskplan file entry. Superpowers references removed from 4 skill bodies (source + mirror = 8 files) + 3 CHANGELOG Inspiration Credits sections + 4 inline "Inspired by" references. Fixed stray `buster-call.` bug in stella-build mirror file. No scope drift — all items in PRD.
**Rationale:** All items in PRD executed. Superpowers references removed per explicit owner instruction before GitHub open-source push.
**Alternatives:** None.

### 2026-04-20 REVIEW Complete: Superpowers Adoption v0.9.0
**Phase:** REVIEW
**Satellite:** Lilith Red + Lilith Blue (self-review)
**Decision:** All clear. No BUSTER CALL findings. Two Medium accepted without action: M1 — stella-parallel aggregate step doesn't explicitly call out `edison-verify` at parent level (subagents each run it; deferred to v0.10.0+ writing-skills pass). M2 — atlas-taskplan Governance section light on log detail (cosmetic, deferred). All non-negotiables verified intact: IMU 5-lensa, Shaka 7-lens Guided, Vivre Card Pulse, Crew Check, phase gates, append-only vivre-cards. PRD spec compliance 100% — all 3 deliverables match spec exactly. Mirror sync clean. Superpowers refs removed (grep: 0 results). `brain/test-plan.md` updated with v0.9.0 manual QA checklist (7 critical path tests, 7 mirror sync checks, regression check).
**Rationale:** Framework skill sprint — no auth, no database, no user input. Attack surface is nil. Quality risk is behavioral (skill triggers, format compliance) not security. Both Medium findings accepted; neither affects correctness or trigger behavior.
**Alternatives:** Tighten M1 now (rejected — adds prose complexity without behavior change; writing-skills pass is the right venue).

### 2026-04-20 CLOSE: Superpowers Adoption v0.9.0
**Phase:** CLOSE
**Satellite:** York
**Decision:** Version closed as 0.9.0. package.json bumped 0.8.2 → 0.9.0. brain/log-pose.md → v0.9.0 COMPLETE heading. vivre-cards.md v0.9.0 BUILD+CLOSE entries appended. CHANGELOG.md v0.9.0 entry added. 18 skills total: 5 phase + 4 DEFINE/IDEATE satellite + 2 BUILD satellite + 3 Edison + 3 governance + 1 meta.
**Rationale:** All PRD items shipped, documentation aligned, superpowers refs cleaned from public files. Zero functional regressions to existing 16 skills.
**Alternatives:** None.

---
## === v0.11.0 — 2026-04-20 — Delegate Execution + Dogfooding Sync ===
### Summary: Removed 6 execution skills (Edison trio + writing-skills + atlas-taskplan + stella-parallel), delegated to obra/superpowers. 12 skills total (5 phase + 4 DEFINE/IDEATE satellite + 3 governance). Local workspace synced from v0.7.1 → v0.11.0 on 2026-04-27.
### Decision count: 1 entry (dogfooding sync)
---

---
## === v0.12.0 — 2026-04-27 — Token Archive ===
### Summary: punk-records vivre-card archival formalized — triggered at every CLOSE, exception for Status: OPEN buster calls. Source + mirror synced.
### Decision count: 1 entry (build complete)
---

### 2026-04-27 BUILD Complete: Token Archive v0.12.0
**Phase:** BUILD
**Satellite:** Edison
**Decision:** `punk-records` Archiving section rewritten — from reactive (>50 entries threshold) to proactive (every CLOSE). Rule: cut closed version block → append to vivre-cards-archive.md. Exception: `**Status:** OPEN` entries stay in main file regardless of version. "At CLOSE" bullet updated to include archive step. Source (`skills/punk-records/SKILL.md`) and mirror (`.claude/skills/punk-records/SKILL.md`) identical. No scope drift — change is within punk-records boundary.
**Rationale:** Vivre-cards.md is the only session-start file that grows unbounded. Per-CLOSE archival keeps it to current sprint only, saving 600–2,400 tokens/session for mature projects. Previous rule was arbitrary (>50) and reactive; new rule is structural and automatic.
**Alternatives:** New dedicated archive skill (rejected — CLOSE concern belongs in punk-records, not a new skill); keep >50 threshold (rejected — reactive, inconsistent across projects).

### 2026-04-27 Dogfooding Sync: Local v0.7.1 → v0.11.0
**Phase:** CLOSED (operational sync)
**Satellite:** York
**Decision:** Pulled origin/main (932284c → 34650da) to sync local workspace with published v0.11.0. Accepts BREAKING changes: `edison-tdd`, `edison-verify`, `edison-debug`, `writing-skills`, `atlas-taskplan`, `stella-parallel` removed — delegated to `obra/superpowers`. New satellite skills adopted: `shaka-brief`, `shaka-prd`, `pythagoras-research`, `oda-design`. Hard-block EXIT GATES active. `brain/project-context.md` now required at session start (populated by pull). Old PRDs moved to `brain/archive/` by pull. Skill count: 12 (same number, different composition).
**Rationale:** Dogfooding session — using Stella Protocol to build Stella Protocol. Local workspace was behind 4 versions. v0.11.0 execution delegation is the right architectural call: superpowers skills are more mature (v5.x vs v0.x) and maintained independently. Note: v0.11.0 was shipped without completing punk-records CLOSE step for log-pose.md — corrected in this sync.
**Alternatives:** Stay at v0.7.1 (rejected — local fork would diverge from public protocol, defeating dogfooding purpose).
