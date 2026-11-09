# Mini-PRD: Distribution Hotfix v0.12.1

**Date:** 2026-11-09 | **Track:** East Blue | **Status:** Approved by Stella ("gas", 2026-11-09)
**Source:** BUSTER CALL + WARNING 2026-11-09 (`brain/vivre-cards.md`), P0 in `brain/research-rea-benchmark.md`

## Problem
Every `npx stella-protocol install` (published 0.12.0 included) installs only 5 of 12 skills, skips `project-context.md`, and writes an outdated CLAUDE.md hook. IDEATE/DEFINE are hollow for every new user. The root cause is facts copied by hand into several places, and this drift has already happened 3 times.

## Features
- **P0 — Single owner for distribution facts** (`cli/manifest.js`): the skill list comes from the `skills/` folder, and one constant holds the brain template list and the placeholder logic. `install.js` and `init.js` both use it.
- **P0 — Installer fix:** install all 12 skills and all 7 brain templates (placeholders replaced), and write the current hook into CLAUDE.md.
- **P0 — Current hook template:** `punk-records/stella-claude-md.md` is updated to the current hook (project-context step, Skill Layers, superpowers).
- **P0 — `scripts/sync.js` + `--check`:** writes the `.claude/skills/` mirror, `marketplace.json` (version + skill list), and `CLAUDE.md` from their sources. `--check` fails on drift and lints frontmatter, description length, and relative links that leave a skill folder.
- **P0 — `npm test`:** `sync --check` + a non-interactive install smoke test into a temp folder.
- **P1 — CI:** a GitHub Action that runs `npm test` on push/PR.
- **P1 — `brain/architecture.md` API Surface** updated to the current 12 skills.

## Data Model Changes
None.

## Acceptance Criteria
- Smoke install into an empty folder → 12 skills in `.claude/skills/`, 7 files in `brain/` (`{project-name}` replaced in log-pose + project-context), and a CLAUDE.md that contains the `project-context.md` step.
- `diff -r skills .claude/skills` is empty.
- `marketplace.json` version == `package.json` version, and its skill list = all 12 folders in `skills/`.
- `npm test` PASSES on a clean tree and FAILS when drift is introduced on purpose (mirror, manifest, hook).
- `stella init` still creates 7 files.

## Out of Scope
`stella doctor`, `--dry-run`, backups, multi-harness/`.agents/skills`, migrating old hooks already written in users' CLAUDE.md, and the version bump + CHANGELOG (those belong to CLOSE).
