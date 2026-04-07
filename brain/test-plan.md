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
