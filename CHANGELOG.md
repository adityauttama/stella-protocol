# Changelog

## [0.6.0] — 2026-04-18
### Added
- **Edison atomic skills** — `edison-tdd` (RED-GREEN-REFACTOR cycle for testable logic, Iron Law: no code without failing test first) and `edison-verify` (automated build/lint/test gate, mandatory at BUILD EXIT GATE). Inspired by `obra/superpowers`.
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

### Inspiration Credits
- `obra/superpowers` — TDD Iron Law, verification-before-completion, atomic skill composition
- `bmad-code-org/BMAD-METHOD` — scale-adaptive agent layering, project-context-as-constitution

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
