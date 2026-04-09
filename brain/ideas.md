# Ideas

> Capture everything. Filter later.

## Inbox (raw, unvalidated)
_Add ideas here as they come. Format: `- [date] [idea] — [one-line description]`_

## In Progress (Idea Brief done, moving through phases)

### 2026-04-09 — Governance Hardening v0.5.0 ✅ SHIPPED v0.5.0
**Track:** East Blue | **Phase:** CLOSED
**Problem:** Agents skip protocol rules because enforcement is suggestion-based, not gate-based. Real-world usage revealed REVIEW phase skipped, Punk Records not incremental, Pre-Flight never generated, Cipher Pol too noisy.
**Proposed Solution:** Add structural gates (Exit Gates, mandatory formatted outputs, scoped triggers) to all 5 skill files + README clarity rewrite.
**Who It's For:** AI agents following the protocol + new users installing Stella.
**Core Assumption:** Agents comply with formatted output requirements and conditional checks better than prose instructions.
**Biggest Risk:** Complexity creep — adding too much content to skill files.
**Adjacent Ideas:** Automated skill linter, CI-based protocol compliance check
**Source:** Real-world feedback from Stella using protocol on House of Riddle project

### 2026-04-07 — Stella Protocol Self-Healing ✅ SHIPPED v0.4.2
**Track:** Grand Line (Full) | **Phase:** CLOSED
**Problem:** Stella-protocol punya governance doc yang kontradiksi dengan skill files sendiri (Cipher Pol logging), CLI tanpa error handling, dan version mismatch.
**Proposed Solution:** Fix semua 10 temuan dari Lilith Red/Blue review — governance consistency, CLI robustness, skill clarity.
**Who It's For:** Developer dan PM yang pakai stella-protocol.
**Core Assumption:** Framework yang enforce quality harus bebas dari quality issue sendiri.
**Biggest Risk:** Scope creep ke fitur baru padahal ini fix-only sprint.
**Adjacent Ideas:** Automated test suite, version sync script, skill linter
**Source:** Lilith Red/Blue self-review 2026-04-07

## Parked (good but not now)
_Ideas worth revisiting later. Include why parked and what would change that._

## Killed (and why)
_Ideas that were evaluated and rejected. Include specific reason._
