# Test Plan: v0.12.1 Distribution Hotfix
**Date:** 2026-11-09 | **Status:** Partial — automated (`npm test` + CI) + manual

## Critical Paths (MUST test before publish)
- [x] `npm test` PASS on a clean tree (sync --check + smoke-install) — automated, CI on every push/PR
- [x] Smoke install: 12 skills byte-identical to source, 7 brain files, placeholders filled, existing brain files kept — automated
- [x] Hook: created → skipped on re-run → appended to a foreign CLAUDE.md with its content kept — automated
- [x] Real interactive `stella install` (pseudo-TTY, defaults) → 12 skills, 7 brain files, hook contains the project-context step — manual, 2026-11-09
- [x] Real `stella init` → 7 files — manual, 2026-11-09
- [x] `npm pack --dry-run` includes `cli/manifest.js` — manual, 2026-11-09
- [ ] **Claude Code plugin path:** `/plugin marketplace add adityauttama/stella-protocol` → `/plugin install stella-protocol@stella-protocol` → all 12 skills are listed — manual, Stella (cannot run in a cloud session)
- [x] Version bumped without `npm run sync` → `npm publish` is blocked by `prepublishOnly` (verified with `npm publish --dry-run`, 2026-11-09)

## Drift Detection (each must make `npm run sync -- --check` exit 1)
- [x] Mirror file edited · [x] package.json version bumped without sync · [x] CLAUDE.md edited · [x] description > 250 chars · [x] link escaping the skill folder · [x] frontmatter name ≠ folder · [x] orphan file in `.claude/skills/` — all verified 2026-11-09

## Edge Cases (from REVIEW 2026-11-09 — fixed + re-verified; L1 is also in smoke-install)
- [x] Project folder name containing `$'`, `$&` or `` $` `` → brain templates not corrupted (L1)
- [x] `npm run sync` with a non-Stella skill in `.claude/skills/` → reported, not deleted, unless `--prune` (M1)
- [x] SKILL.md checked out with CRLF line endings → lint passes (L2)

## Regression Check
- [x] `stella status` unchanged (file untouched)
- [ ] Upgrade from 0.12.0: re-run `stella install` in a project → 12 skills; the existing CLAUDE.md hook is kept (known gap: the stale hook is not migrated — `stella doctor`, P2)

---

# Test Plan: v0.10.0 Structural Governance
**Date:** 2026-04-20 | **Status:** Manual

## Critical Paths

### Hard-Block EXIT GATES

#### stella-define EXIT GATE
- [ ] Invoke stella-define with no `brain/prd-*.md` → output contains "REFUSE"
- [ ] Invoke stella-define with PRD not approved → output contains "REFUSE"
- [ ] Invoke stella-define with PRD file present + approved → "DEFINE complete" output
- [ ] Waiver path: agent logs to vivre-cards.md + waits for "proceed with waiver" confirmation

#### stella-build EXIT GATE
- [ ] Invoke stella-build exit gate with P0 feature not implemented → output contains "REFUSE"
- [ ] Invoke stella-build exit gate with `edison-verify` FAIL and no waiver → output contains "REFUSE"
- [ ] Invoke stella-build exit gate with OPEN Buster Call at WARNING → output contains "REFUSE"
- [ ] Invoke stella-build exit gate with all P0 done + verify PASS + no open buster calls → "BUILD phase complete" output

#### stella-review EXIT GATE
- [ ] Invoke stella-review exit gate with Critical finding unresolved → output contains "REFUSE"
- [ ] Invoke stella-review exit gate with no `brain/test-plan.md` → output contains "REFUSE"
- [ ] Invoke stella-review exit gate with all hard conditions met → "REVIEW complete" output

### Soft Reminders (must NOT block)
- [ ] stella-define: missing architecture.md update → reminder only, no REFUSE
- [ ] stella-build: log-pose.md stale → reminder only, no REFUSE

### brain/project-context.md
- [ ] Run `stella init` in clean dir → `brain/project-context.md` created with `{project-name}` replaced
- [ ] New init creates 7 files (was 6): log-pose + project-context + architecture + vivre-cards + ideas + scope-changes + design-system
- [ ] CLAUDE.md session hook reads project-context.md at step 2 (before scope-changes)

## Mirror Sync
- [ ] `diff skills/stella-define/SKILL.md .claude/skills/stella-define/SKILL.md` → 0
- [ ] `diff skills/stella-build/SKILL.md .claude/skills/stella-build/SKILL.md` → 0
- [ ] `diff skills/stella-review/SKILL.md .claude/skills/stella-review/SKILL.md` → 0

## Regression Check
- [ ] stella-define exit gate REFUSE pattern does not prevent normal DEFINE flow before exit gate
- [ ] stella-build Entry Gate still works (PRD check, atlas-taskplan suggestion)
- [ ] Non-negotiables intact: shaka-brief IMU 5-lensa, shaka-prd Guided 7 lenses, Vivre Card Pulse, Crew Check — all unchanged

---

# Test Plan: v0.9.0 Superpowers Adoption
**Date:** 2026-04-20 | **Status:** Manual

## Critical Paths

### stella-build Entry Gate
- [ ] Invoke `/stella-build` with no `brain/prd-*.md` → redirect message shown ("PRD tidak ditemukan. Jalankan `stella-define` dulu.")
- [ ] Invoke `/stella-build` with PRD present but `log-pose.md` phase ≠ build-ready or in-progress → confirmation prompt shown
- [ ] Invoke `/stella-build` with PRD present, phase = build-ready, 1 feature → no atlas-taskplan suggestion
- [ ] Invoke `/stella-build` with PRD present, phase = build-ready, ≥2 features → atlas-taskplan suggestion offered

### atlas-taskplan
- [ ] Invoke `/atlas-taskplan` with a 2-feature PRD → reads PRD + architecture.md
- [ ] Output has tasks with: exact file path, one-sentence change, one-sentence AC
- [ ] Tasks grouped by feature, ordered by dependency (not alphabetical or arbitrary)
- [ ] `brain/taskplan-[name].md` created after invocation
- [ ] Shared files across features flagged with `[SHARED]` marker
- [ ] "Shared-File Conflicts" section present in output

### stella-parallel
- [ ] Invoke `/stella-parallel` with 2 features that have no shared files → independence check output shown (SAFE TO PARALLELIZE)
- [ ] Invoke `/stella-parallel` with 2 features sharing a file → SEQUENTIAL REQUIRED verdict, sequential order suggested
- [ ] Dispatch step: parallel briefs are structured identically to subagent-per-feature briefs
- [ ] Brief includes: Context, AC, Files, Existing patterns, Out of scope, Execution requirements, Do NOT
- [ ] Parent retains governance state during dispatch (no brain/ file writes in subagent briefs)

## Superpowers Reference Cleanup
- [ ] `grep -r "superpowers" skills/ .claude/skills/ README.md CHANGELOG.md CLAUDE.md` → 0 results
- [ ] `grep -r "Inspired by" skills/ .claude/skills/` → 0 results

## Mirror Sync
- [ ] `diff skills/atlas-taskplan/SKILL.md .claude/skills/atlas-taskplan/SKILL.md` → identical
- [ ] `diff skills/stella-parallel/SKILL.md .claude/skills/stella-parallel/SKILL.md` → identical
- [ ] `diff skills/stella-build/SKILL.md .claude/skills/stella-build/SKILL.md` → identical
- [ ] `diff skills/edison-tdd/SKILL.md .claude/skills/edison-tdd/SKILL.md` → identical
- [ ] `diff skills/edison-debug/SKILL.md .claude/skills/edison-debug/SKILL.md` → identical
- [ ] `diff skills/edison-verify/SKILL.md .claude/skills/edison-verify/SKILL.md` → identical
- [ ] `diff skills/writing-skills/SKILL.md .claude/skills/writing-skills/SKILL.md` → identical

## Regression Check
- [ ] Full flow v0.9.0: `/stella-build` → Entry Gate → ≥2 features → atlas-taskplan suggested → taskplan written → stella-parallel invoked → independence check → concurrent dispatch
- [ ] Non-negotiables intact: shaka-brief IMU 5-lensa, shaka-prd Guided 7 lenses, Vivre Card Pulse, Crew Check, phase gates all unchanged

---

# Test Plan: v0.8.0 Satellite Atomic Skills
**Date:** 2026-04-20 | **Status:** Manual

## Critical Paths (MUST verify before merge)

### shaka-brief — standalone
- [ ] Invoke `/shaka-brief` → mode selection offered (Express/Guided)
- [ ] Express mode → 5 lensa (Reframe, Who hurts, Adjacent, Pre-mortem, Minimum proof) → Idea Brief
- [ ] Track Selection Gate muncul — tidak diasumsikan dari jawaban ambigu
- [ ] East Blue → Mini-PRD appended ke Idea Brief
- [ ] After Stella chooses → brain/ideas.md + brain/log-pose.md di-update via punk-records
- [ ] IMU Veto aktif jika tidak ada user pain yang jelas

### stella-protocol — slimmed orchestrator
- [ ] Invoke `/stella-protocol` → First Action: cek OPEN Buster Calls
- [ ] Tidak ada IMU prose inline — hanya routing ke shaka-brief
- [ ] After Track Selection: routing ke stella-build (East Blue) / stella-define (Grand Line)

### shaka-prd — standalone
- [ ] Express mode: 6 pertanyaan → PRD lengkap
- [ ] Guided mode: Lens 1–7 tampil satu per satu, "Lens N/7 selesai. Lanjut atau skip?"
- [ ] Semua 7 lensa present (Pain, Victory, Boundary, Shape, Skeleton, Surface, Fog)
- [ ] Mode switch Express→Guided dan Guided→Express keduanya work
- [ ] Vivre Card Pulse: 5 dimensi tampil post-assembly
- [ ] Crew Check: 6 satellites tampil pre-approval
- [ ] PRD di-write ke brain/prd-[name].md

### stella-define — slimmed orchestrator
- [ ] Gate Check aktif: cek brain/ideas.md / brain/log-pose.md
- [ ] Satellite routing block tampil (bukan Shaka prose langsung)
- [ ] "PRD / requirements" → routes ke shaka-prd
- [ ] "Architecture / tech stack" → routes ke pythagoras-research
- [ ] "UX flows / design system" → routes ke oda-design
- [ ] EXIT GATE hadir (5 checkboxes)

### pythagoras-research — standalone
- [ ] Research Brief format tersedia (Question + Findings + Recommendation + Open Questions)
- [ ] Architecture Decision template tersedia, ditulis ke brain/architecture.md

### oda-design — standalone
- [ ] Design System template lengkap (Colors, Typography, Spacing, Radius, Components, Layout, Animation)
- [ ] Visual Review Mode: screenshot → max 5 observations dengan file:line reference

## Regression Paths
- [ ] Full flow: stella-protocol → shaka-brief → Grand Line → stella-define → shaka-prd → PRD approved → stella-build
- [ ] Mirror sync: `diff skills/ .claude/skills/` semua 6 files = 0 ✅ (verified 2026-04-20)

---

# Test Plan: Stella Protocol Self-Healing
**Date:** 2026-04-07 | **Status:** Manual

## Critical Paths (MUST test before deploy)
- [x] `stella status` — displays frontmatter + body correctly
- [ ] `stella install` — full happy path in clean project directory
- [ ] `stella init` — creates brain/ with all 6 templates, replaces {project-name} and YYYY-MM-DD

## Feature Tests

### P0-1: Cipher Pol Logging Consistency
- [x] `protocol/governance/cipher-pol.md` references `scope-changes.md` as primary log
- [x] `cipher-pol.md` references `vivre-cards.md` for decisions only
- [x] No remaining references to `vivre-cards.md` as primary drift log in cipher-pol.md

### P0-2: Version Sync
- [x] `package.json` version = 0.4.1
- [x] `.claude-plugin/marketplace.json` version = 0.4.1

### P0-3: Error Handling
- [x] `cli/index.js` — all 3 commands wrapped in try-catch
- [x] `cli/install.js` — try-catch wraps entire function
- [x] `cli/init.js` — try-catch wraps entire function
- [x] `cli/status.js` — try-catch wraps entire function
- [ ] Edge: `stella status` in directory without brain/ — shows friendly message (not stack trace)
- [ ] Edge: `stella init` with no write permission — shows friendly error

### P0-4: Skill Directory Validation
- [x] `cli/install.js` checks `fs.existsSync(src)` before copy
- [x] Skipped skills show yellow warning message
- [ ] Edge: remove one skill dir from package, run install — verify warning shown

### P1-5: Buster Call Terminology
- [x] `skills/stella-define/SKILL.md` says "Issue Buster Calls (WARNING severity) when:"
- [x] `.claude/skills/stella-define/SKILL.md` says the same
- [x] Advisory note added about CONCERN/WARNING being non-blocking

### P1-6: YYYY-MM-DD Replacement
- [x] `cli/init.js` replaces YYYY-MM-DD with actual date
- [x] `cli/install.js` replaces YYYY-MM-DD with actual date
- [ ] Edge: run `stella init` in new dir, check log-pose.md has today's date

### P1-7: Phase Transition Guidance
- [x] `skills/stella-define/SKILL.md` has "Next Phase" section
- [x] `skills/stella-build/SKILL.md` has "Next Phase" section
- [x] `skills/stella-review/SKILL.md` has "Next Phase" section
- [x] `skills/stella-close/SKILL.md` has "Next Phase" section
- [x] `.claude/skills/stella-define/SKILL.md` has "Next Phase" section
- [x] `.claude/skills/stella-build/SKILL.md` has "Next Phase" section
- [x] `.claude/skills/stella-review/SKILL.md` has "Next Phase" section
- [x] `.claude/skills/stella-close/SKILL.md` has "Next Phase" section

### P2-8: Frontmatter Parser
- [x] Regex updated to `/^---\n([\s\S]*?)\n---(?:\n|$)/`
- [x] `stella status` parses and displays correctly

### P2-9: npm Scripts
- [x] `package.json` has "test" script
- [x] `package.json` has "status" script

## Review Findings (Post-Build)
- [x] H1: `.claude/skills/stella-define/SKILL.md` missing Next Phase — FIXED
- [ ] M1: install.js skills count message misleading when skipped — DEFERRED (cosmetic)
- [ ] M2: Indentation inconsistency in try-catch — DEFERRED (cosmetic)
