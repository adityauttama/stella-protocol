# Changelog

## [0.10.0] — 2026-04-20
### Added
- **Hard-block EXIT GATES** — stella-define, stella-build, stella-review EXIT GATEs changed from soft checklist to `❌ REFUSE TO PROCEED` pattern. Hard conditions: stella-define refuses if PRD file missing or not approved; stella-build refuses if P0 features missing, `edison-verify` FAIL without waiver, or OPEN Buster Call at WARNING+; stella-review refuses if Critical finding unresolved or `brain/test-plan.md` missing. Waiver path preserved: log to `brain/vivre-cards.md` + Stella confirms "proceed with waiver." Soft conditions demoted to reminders only (no REFUSE).
- **`brain/project-context.md` template** — new 7th init template added to `stella init`. Single source of truth for tech stack, critical constraints, non-negotiables, key file locations. Filled during DEFINE; never changes mid-sprint. CLAUDE.md session hook reads it at step 2 before scope-changes. Eliminates re-discovering stack from `architecture.md` each session.
- **`punk-records/project-context.md`** — template with `{project-name}` placeholder, copied to `brain/` during `stella init`.

### Changed
- `cli/init.js` — copies 7 templates (was 6); replaces `{project-name}` placeholder in `project-context.md` after copy.
- `CLAUDE.md` session hook — step 2 now reads `brain/project-context.md` (if exists); steps 2–7 renumbered to 3–8.
- `brain/architecture.md` — EXIT GATE description updated to reflect REFUSE pattern; Brain Files count updated to 7; v0.10.0 decision entry added.
- `brain/README.md` — `project-context.md` added to Active files table.

### Deferred to v0.11.0+
- Slim `stella-review` (Lilith Red/Blue extraction)
- Slim `stella-build` (Edison dispatch extraction)
- Auto-archiving hook settings.json (P3.2)
- punk-records checkpoint timing (P3.3)

## [0.9.0] — 2026-04-20
### Added
- **`atlas-taskplan` BUILD satellite atomic skill** — bite-sized task decomposition before BUILD. Invoked after PRD approved, before `stella-build` starts. Input: PRD feature list + architecture decisions. Output: `brain/taskplan-[prd-name].md` with tasks broken into 2–5 minute units (exact file path, what to change, one-sentence acceptance criteria), grouped by feature, ordered by dependency. Flags shared-file conflicts for `stella-parallel` safety check. Recommended for ≥2 features, optional for hotfix/single-feature.
- **`stella-parallel` BUILD satellite atomic skill** — concurrent agent dispatch for independent PRD features. Trigger: ≥2 features with no shared files and no sequential dependencies. Safety rule: if two features touch the same file → sequential. Protocol: independence check (reads `brain/taskplan-[name].md` or assesses manually) → parallel briefs → concurrent dispatch in single message → aggregate results → Feature Completion Protocol. Extends subagent-per-feature (sequential one-at-a-time) with true concurrency.
- **Entry Gate in `stella-build`** — MANDATORY check before starting BUILD: (1) verify `brain/prd-[name].md` exists, redirect to stella-define if not; (2) check `brain/log-pose.md` phase is build-ready or in-progress; (3) suggest `atlas-taskplan` when ≥2 features detected.

### Changed
- `stella-build` — Entry Gate section added before First Action; stella-parallel pointer added in Subagent-per-Feature Dispatch section. Fixed stray `buster-call.` bug in mirror file.
- `CLAUDE.md` Skill Layers — added BUILD satellite atomic section for `atlas-taskplan` + `stella-parallel`.
- `README.md` — "18 Agent Skills"; BUILD satellite atomic table added.
- `brain/architecture.md` — Layer 2 BUILD satellite atomic table added; architecture decision entry for v0.9.0.
- `brain/README.md` — added `taskplan-[name].md` to active files table.

### Removed
- "Inspired by `obra/superpowers`" attribution lines from `edison-tdd`, `edison-debug`, `edison-verify`, `writing-skills` skill bodies (source + mirror).
- "Inspiration Credits" sections from CHANGELOG v0.6.0, v0.7.0, v0.7.1 entries.

### Deferred to v0.10.0+
- `stella-foundation` — CLAUDE.md session hook already handles this use case
- Slim `stella-review` (Lilith Red/Blue extraction)
- Slim `stella-build` (Edison dispatch extraction)

## [0.8.2] — 2026-04-20
### Changed
- `brain/improvement 9 april.md` triaged — all 10 structural findings confirmed shipped (v0.5.0–v0.8.1). File moved to `brain/archive/improvement-2026-04-09.md`.
- `brain/launch-content.md` (Morgans artifact, published LinkedIn post) moved to `brain/archive/`.
- `brain/README.md` created — documents active files, archive files, and lifecycle rules for the brain/ directory.
- `brain/ideas.md` — README clarity rewrite added to Parked section.

## [0.8.1] — 2026-04-20
### Fixed
- **HTML frontmatter bug (CRITICAL)** — All 16 SKILL.md files had `<!-- Stella Protocol... -->` comment on line 1, before `---` frontmatter. Claude Code requires `---` on line 1 to parse YAML frontmatter. Bug caused Claude Code to display HTML comment as the skill's description instead of the `description:` field. Fixed across all 32 files (16 source in `skills/` + 16 mirror in `.claude/skills/`).

### Changed
- All 16 skill `description` fields trimmed from multi-line verbose blocks (323–464 chars) to single-line ≤250 chars. Feature lists moved to skill body; auto-trigger phrases preserved.
- `brain/vivre-cards.md` — archived v0.4.2–v0.7.1 entries to `brain/vivre-cards-archive.md`. Main file now contains only v0.8.0+ entries (~5K token reduction per session-start load).
- `brain/archive/` created — moved 3 shipped PRDs: `prd-self-healing.md`, `prd-atomic-skills.md`, `idea-atomic-skills-v0.6.0.md`.

## [0.8.0] — 2026-04-20
### Added
- **`shaka-brief` satellite atomic skill** — IMU 5-lensa ideation exercise, Express/Guided modes, Idea Brief output, mandatory Track Selection Gate. Extracted from `stella-protocol`; callable standalone or invoked by the IDEATE orchestrator.
- **`shaka-prd` satellite atomic skill** — Shaka PRD generation with Express mode (conversational 6-question flow) and Guided mode (7-lens Observation Haki), bidirectional mode switching, Vivre Card Pulse validation, Crew Check satellite pre-screen. Extracted from `stella-define`.
- **`pythagoras-research` satellite atomic skill** — Architecture decisions and technical research. Research Brief output, Architecture Decision template, write-to-brain/architecture.md protocol. Extracted from `stella-define`.
- **`oda-design` satellite atomic skill** — UX flows, screen maps, and design system. Design System template for UI projects; Visual Review mode during BUILD. Extracted from `stella-define`.

### Changed
- `stella-protocol` 106 → 36 LOC — slimmed to thin orchestrator; routes to `shaka-brief`. All IMU logic now lives in `shaka-brief`.
- `stella-define` 160 → 51 LOC — slimmed to thin orchestrator; satellite routing to `shaka-prd`, `pythagoras-research`, `oda-design`. All satellite logic extracted.
- `brain/architecture.md` — Layer 1 table updated to show satellite routing; new Layer 2 DEFINE/IDEATE Satellite Atomic table added; architecture decision entry for v0.8.0.
- `README.md` — "16 Agent Skills"; Phase orchestrators table shows routing; new DEFINE/IDEATE satellite atomic table.
- `CLAUDE.md` Skill Layers — added DEFINE/IDEATE satellite atomic section.

### Preserved (Non-Negotiable)
- IMU 5-lensa brainstorming — moved verbatim to `shaka-brief`.
- Shaka Express/Guided PRD with 7 Observation Haki lenses, Vivre Card Pulse, Crew Check — moved verbatim to `shaka-prd`.
- Bidirectional mode switch (Express↔Guided) — preserved in `shaka-prd`.
- One Piece metaphor, governance atomic, Edison atomic, append-only vivre-cards, phase gates — untouched.
- All existing skill behavior preserved; orchestrators route, satellites execute.

### Deferred to v0.9.0+
- Slim `stella-review` (210 LOC) — Lilith Red/Blue extraction
- Slim `stella-build` (207 LOC) — Edison/Atlas extraction
- `brain/project-context.md` BMAD-style

## [0.7.1] — 2026-04-18
### Added
- **`writing-skills` meta skill (Layer 4)** — RED-GREEN-REFACTOR applied to SKILL.md authoring. Iron Law: no skill change merged without a documented failure scenario it fixes. Cycle: RED (concrete failing trigger/output/gap), GREEN (minimum fix), REFACTOR (cleanup without regressing prior RED scenarios). Builds a regression log for skill evolution.
- **Lilith Red — Adversarial Mode** in `stella-review` — explicit attacker-perspective audit beyond Spec Pass + Code Pass. Posture: malicious user with full implementation knowledge. Flow: threat-model the surface → top 3 highest-value targets → concrete attack steps → predict system response → minimal fix. Structured `## Adversarial Audit` output. Trigger: Stella requests "red team" or pre-release with money/PII/auth.
- **Lilith Blue — Checkpoint Preview** in `stella-review` — diff reorder by concern before presenting to reviewer. Groups hunks into 4 buckets (🔴 Security/Auth → 🟡 Correctness → 🟢 Quality → ⚪ Cosmetic), presents highest-risk first. Security bucket requires per-item acknowledgment; cosmetic can be bulk-approved. Reduces reviewer fatigue hiding critical changes at the bottom.

### Changed
- `stella-review` 154 → 210 LOC (+56) — two new mode sections added under Lilith Red (Adversarial Mode) and Lilith Blue (Checkpoint Preview). All existing gates (EXIT GATE, Quality Track, Buster Call routing) unchanged.
- `CLAUDE.md` Skill Layers — added Meta layer entry for `writing-skills`.
- `README.md` — "12 Agent Skills"; new Meta table after Governance atomic.
- `brain/architecture.md` — Layer 4 Meta table added; 3 new decision entries (writing-skills, adversarial mode, checkpoint preview rationale).

### Preserved (Non-Negotiable)
- All existing Lilith Red/Blue flows intact — Spec Pass, Code Pass, Test Plan, Coverage Assessment, Design System Compliance.
- All v0.7.0 additions (edison-debug, subagent-per-feature) unchanged.
- One Piece metaphor, governance atomic, append-only vivre-cards, phase gates — untouched.

### Deferred to v0.8.0+
- Satellite atomic skills (shaka-brief, shaka-prd, pythagoras-research, oda-design) — Grand Line refactor
- `brain/project-context.md` BMAD-style
- Subagent-driven testing of skills via writing-skills meta

## [0.7.0] — 2026-04-18
### Added
- **`edison-debug` atomic skill** — 4-phase systematic root cause flow (Reproduce → Isolate → Hypothesize → Verify Fix). Iron Law: no fix merged without reproducing the bug first. Fills the gap between symptom and fix that neither `edison-tdd` (new logic) nor `edison-verify` (regression detection) covered.
- **Subagent-per-feature dispatch pattern** in `stella-build` — for long multi-feature BUILDs, each significant feature (threshold: ≥3 files OR ≥150 LOC OR feature 3+ of a ≥5-feature session) dispatches a fresh `Agent` subagent with a self-contained brief. Parent retains `log-pose.md`, `scope-changes.md`, PRD index, governance state, and runs Feature Completion Protocol on the returned summary. Prevents context bloat across features.
- **Debug Invocation** section in `stella-build` — explicit pointer to `edison-debug` when test regressions, bug reports, or unexpected behavior surface.

### Changed
- `stella-build` 167 → 207 LOC (+40) — added Debug Invocation + Subagent-per-Feature Dispatch sections. Rest of the orchestrator unchanged.
- `CLAUDE.md` Skill Layers — added `edison-debug` to Edison atomic list.
- `README.md` — skills inventory now shows **11 Agent Skills** (5 phase + 3 Edison atomic + 3 governance atomic), Edison atomic table includes `Since` column.
- `brain/architecture.md` — Layer 2 table adds `edison-debug`; two new decision entries documenting the rationale for both v0.7.0 additions.

### Preserved (Non-Negotiable)
- All v0.6.0 strengths intact — IMU 5-lensa, Shaka Express/Guided (7 Observation Haki lenses), Vivre Card Pulse, Crew Check, Feature Completion Protocol.
- `edison-tdd` + `edison-verify` EXIT GATE — unchanged, still mandatory.
- One Piece metaphor, governance atomic skills, append-only vivre-cards, phase gates — untouched.

### Deferred to v0.7.1+
- Satellite atomic skills (`shaka-brief`, `shaka-prd`, `pythagoras-research`, `oda-design`)
- `writing-skills` meta skill (TDD for Stella skills themselves)
- `lilith-red` adversarial mode (BMAD-inspired)
- `lilith-blue` checkpoint-preview (diff reorder by concern)
- `brain/project-context.md` (BMAD-style tech stack + critical rules)

## [0.6.0] — 2026-04-18
### Added
- **Edison atomic skills** — `edison-tdd` (RED-GREEN-REFACTOR cycle for testable logic, Iron Law: no code without failing test first) and `edison-verify` (automated build/lint/test gate, mandatory at BUILD EXIT GATE).
- **Governance atomic skills** — `cipher-pol` (scope drift), `buster-call` (quality/security veto), `punk-records` (brain file update protocol). Extracted from duplicated prose across phase skills; now canonical source.
- `edison-verify` PASS requirement in BUILD EXIT GATE — claims without automated verification are not evidence. Waivers must be logged to `brain/vivre-cards.md`.
- Layered skill architecture documented in `brain/architecture.md`: Layer 1 phase orchestrators, Layer 2 Edison atomic, Layer 3 governance atomic.

### Changed
- **Phase skills slimmed to orchestrators** — ~41% LOC reduction across 5 phase skills:
  - `stella-protocol` 171 → 106 LOC
  - `stella-define` 298 → 160 LOC
  - `stella-build` 299 → 167 LOC
  - `stella-review` 231 → 154 LOC
  - `stella-close` 139 → 84 LOC
- Phase skills now reference atomic skills for governance rather than duplicating prose. Claude Code's skill auto-trigger (via each skill's `description` field) handles activation.
- `CLAUDE.md` session hook simplified — governance rules delegated to atomic skills (quick-reference kept inline).
- `README.md` skills inventory expanded to document 10 skills across 3 layers.

### Preserved (Non-Negotiable)
- IMU 5-lensa brainstorming, Shaka Express/Guided (7 lenses Observation Haki), Vivre Card Pulse, Crew Check — untouched.
- One Piece metaphor: all satellite names, Cipher Pol, Buster Call, Punk Records, EXIT GATE, Vivre Card, Log Pose, Track names, phase names retained.
- Append-only vivre-cards, version boundaries, archiving policy — still enforced via `punk-records`.
- Phase gates — DEFINE → BUILD → REVIEW → CLOSE sequence cannot be skipped.

## [0.5.0] — 2026-04-09
### Added
- EXIT GATE mandatory checklists in stella-build, stella-review, and stella-define — blocks phase transition until prerequisites are met
- Feature Completion Protocol in stella-build — mandatory Punk Records checkpoint + review pause after each significant feature
- Atlas Pre-Flight gate — refuses to proceed with deployment until brain/preflight.md exists
- Quality Track (demo/production) in stella-review — set once, governs all findings
- Bidirectional Mode Switch in stella-define — Express↔Guided switching in either direction
- Vivre Cards version boundaries and archiving protocol in stella-close
- Design System Compliance check in Lilith Blue (stella-review)
- npm audit check in Atlas Pre-Flight checklist
- Prohibited Actions section at top of stella-build

### Changed
- Cipher Pol trigger scope narrowed — only user-facing routes, API endpoints, DB tables, external integrations, and features NOT in PRD trigger assessment. Implementation files (components, utils, tests) no longer trigger.
- stella-define Gate Check now explicitly references `stella-protocol` for ideation
- README.md rewritten for clarity — leads with Quick Start, adds Your First Project walkthrough
- Quality Track check reads existing log-pose.md value before asking Stella

## [0.4.2] — 2026-04-07
### Fixed
- Cipher Pol governance doc (`protocol/governance/cipher-pol.md`) now correctly references `brain/scope-changes.md` as primary drift log, aligned with skill files and CLAUDE.md
- Version mismatch between `package.json` (0.4.1) and `.claude-plugin/marketplace.json` (0.3.0) — synced to 0.4.1
- All CLI commands (`install`, `init`, `status`) now have error handling with user-friendly messages
- Skill directory validation before copy in `stella install` — missing skills show warning instead of crashing
- `YYYY-MM-DD` placeholder in `brain/log-pose.md` now replaced with actual date during `stella init` and `stella install`
- Buster Call terminology in `stella-define` clarified — "Issue warnings" changed to "Issue Buster Calls (WARNING severity)" with note that only BUSTER CALL severity blocks
- Frontmatter parser in `stella status` uses stricter regex to avoid false matches

### Added
- "Next Phase" guidance section in all 4 phase skills (stella-define, stella-build, stella-review, stella-close)
- npm scripts: `test` (placeholder) and `status` in package.json

## [0.4.1] — 2025-XX-XX
### Fixed
- Added `stella-protocol` bin alias so `npx stella-protocol` works

## [0.4.0] — 2025-XX-XX
### Added
- IMU Express/Guided brainstorming modes with mandatory track selection gate

## [0.3.1] — 2025-XX-XX
### Changed
- Version bump

## [0.3.0] — 2025-XX-XX
### Added
- Observation Haki guided PRD mode in Shaka satellite
