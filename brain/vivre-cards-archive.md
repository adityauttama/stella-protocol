# Vivre Cards — Archive (v0.4.2 – v0.12.1)

> Archived from vivre-cards.md on 2026-04-20 as part of v0.8.1 token efficiency pass.
> v0.8.0 – v0.12.1 archived on 2026-11-09 at the v0.12.1 CLOSE (first per-CLOSE archive, rule from v0.12.0).
> For current entries, see [brain/vivre-cards.md](vivre-cards.md).

---

### 2026-04-07 Track Selection: Grand Line for Self-Healing
**Phase:** IDEATE → DEFINE
**Satellite:** IMU
**Decision:** Grand Line track selected for "Stella Protocol Self-Healing" sprint
**Rationale:** 10 findings dari Lilith Red/Blue review mencakup governance inconsistency (Cipher Pol logging split), CLI robustness, dan skill clarity. Scope cukup besar dan perlu PRD proper untuk avoid scope creep ke fitur baru.
**Alternatives:** East Blue (rejected — meskipun fix-only, governance fix perlu dipikirkan matang agar tidak introduce inconsistency baru)

### 2026-04-07 PRD Approved: Self-Healing
**Phase:** DEFINE
**Satellite:** Shaka (Express)
**Decision:** PRD v1.0 approved dengan 4 P0, 3 P1, 2 P2 items. Open questions resolved: scope-changes.md as primary drift log, generic try-catch per command, seragam phase transition format.
**Rationale:** Scope jelas dari Lilith Red/Blue review. Express mode sufficient karena findings sudah well-defined.
**Alternatives:** Guided Observation Haki (skipped — context sudah lengkap dari review)

### 2026-04-07 BUILD Complete: Self-Healing
**Phase:** BUILD
**Satellite:** Edison
**Decision:** All 9 PRD items implemented (4 P0, 3 P1, 2 P2). No scope drift — Cipher Pol clean.
**Rationale:** Fixes applied per PRD priority. No new dependencies added. Both source and installed skill copies updated.
**Alternatives:** None — straightforward execution.

### 2026-04-07 REVIEW Complete: Self-Healing
**Phase:** REVIEW
**Satellite:** Lilith Red + Lilith Blue
**Decision:** 1 High finding (missing Next Phase in .claude/stella-define copy) fixed immediately. 2 Medium findings (cosmetic) deferred. No BUSTER CALL findings.
**Rationale:** High finding was a build oversight — same fix applied to source but missed installed copy. Cosmetic findings don't affect functionality.
**Alternatives:** Could have fixed M1/M2 but PRD says fix-only, no refactor.

### 2026-04-07 CLOSE: Self-Healing v0.4.2
**Phase:** CLOSE
**Satellite:** York
**Decision:** Version closed as 0.4.2. Architecture synced, CHANGELOG created, observability plan written.
**Rationale:** All PRD items complete, review passed, documentation current.
**Alternatives:** None.

### 2026-04-09 Track Selection: East Blue for Governance Hardening
**Phase:** IDEATE → BUILD
**Satellite:** IMU
**Decision:** East Blue track selected for "Governance Hardening v0.5.0" sprint. Skip DEFINE — scope fully specified by real-world usage feedback (12 concrete changes across 9 files).
**Rationale:** All changes are markdown edits to existing skill files with clear specifications from user feedback. No architecture decisions, no code changes. Express IMU confirmed scope is clear enough for East Blue.
**Alternatives:** Grand Line (rejected — no ambiguity in requirements, formal PRD would add overhead without value)

### 2026-04-09 REVIEW: Governance Hardening
**Phase:** REVIEW
**Satellite:** Lilith Red + Lilith Blue
**Decision:** 2 High + 2 Medium findings, all fixed immediately. H1: EXIT GATE preflight conditional added. H2: EXIT GATES added to stella-review and stella-define. M1: Quality Track check-before-ask. M2: design-system.md added to README brain/ listing. No BUSTER CALL findings.
**Rationale:** All findings were enforcement consistency issues — same pattern (missing gates, unconditional checks) that the sprint was designed to fix. Low effort, high value to fix now.
**Alternatives:** Could have deferred M1/M2 but both were single-line fixes.

### 2026-04-09 CLOSE: Governance Hardening v0.5.0
**Phase:** CLOSE
**Satellite:** York
**Decision:** Version closed as 0.5.0. Architecture synced with new enforcement mechanisms, CHANGELOG updated, version bumped.
**Rationale:** All feedback items addressed (10/10 + 2 bonus: npm security, README clarity). Review found 2H+2M, all fixed. Protocol now uses structural gates instead of agent discipline.
**Alternatives:** None.

---
## === v0.5.0 — 2026-04-09 — Governance Hardening ===
### Summary: Added EXIT GATES, scoped Cipher Pol, Quality Track, and structural enforcement across all skills
### Decision count: 3 entries (track selection, review findings, close)
---

### 2026-04-18 Track Selection: Grand Line for v0.6.0 Atomic Skills
**Phase:** IDEATE → DEFINE
**Satellite:** IMU
**Decision:** Grand Line track selected for "Atomic Skills & Execution Rigor" sprint. Scope: pecah monolithic phase skills jadi orchestrator + atomic skills, tambah TDD/verify enforcement, inspirasi dari obra/superpowers + bmad-code-org/BMAD-METHOD.
**Rationale:** Dua gap teridentifikasi via benchmark terhadap superpowers dan BMAD: (1) token inefficiency — 5 phase skill monolitik 1,138 LOC loaded wholesale, governance prose diulang di banyak file; (2) BUILD rigor lemah — no TDD enforcement, no automated verify gate. Scope besar dan lintas-skill → butuh PRD proper (Grand Line).
**Alternatives:** East Blue (rejected — scope multi-file, butuh arch decision untuk skill boundary); Reimagine/story-sharding BMAD (rejected — overkill, risk kehilangan Shaka/IMU strength).

### 2026-04-18 PRD Approved: Atomic Skills Refactor
**Phase:** DEFINE
**Satellite:** Shaka (Express)
**Decision:** PRD v1.0 approved. P0 scope locked: 3 governance atomic skills (cipher-pol, buster-call, punk-records), 2 edison atomic skills (edison-tdd, edison-verify), slim 5 phase skills ke orchestrator, update BUILD EXIT GATE. P1/P2 deferred ke subsprint berikutnya.
**Rationale:** IDEATE output (`brain/idea-atomic-skills-v0.6.0.md`) sudah detail — scope, diagnostic, design architecture, verification plan. Express mode sufficient. Focus P0 dulu untuk shipped-value, P1/P2 bisa iterasi setelah P0 proven.
**Alternatives:** Guided Observation Haki (skipped — scope well-defined); all-P012 in one sprint (rejected — risk scope creep).

### 2026-04-18 BUILD Complete: Atomic Skills
**Phase:** BUILD
**Satellite:** Edison
**Decision:** All P0 items shipped. 5 atomic skills created (cipher-pol, buster-call, punk-records, edison-tdd, edison-verify). 5 phase skills slimmed to orchestrators (~41% total LOC reduction across phase skills). stella-build EXIT GATE now requires edison-verify PASS or vivre-cards-logged waiver. All changes mirrored to `.claude/skills/`. No scope drift — Cipher Pol clean, all items listed in PRD.
**Rationale:** Structural refactor with clear deliverables. Governance prose deduplicated via atomic skills. Claude Code skill auto-trigger (via each skill's `description` field) handles activation.
**Alternatives:** Enforce TDD globally (rejected — kept edison-tdd opt-in per PRD P0, mirrors superpowers' "discipline via skill, not via global config" pattern).

### 2026-04-18 REVIEW Complete: Atomic Skills
**Phase:** REVIEW
**Satellite:** Lilith Red + Lilith Blue
**Decision:** Self-review pass. No BUSTER CALL findings. Core strengths preserved verbatim: IMU 5-lensa brainstorming, Shaka Express/Guided (7 lenses Observation Haki), Vivre Card Pulse, Crew Check, Feature Completion Protocol, Lilith Red/Blue audits. One Piece metaphor 100% intact (satellite names, Cipher Pol, Buster Call, Punk Records, EXIT GATE, Vivre Card, Log Pose, track names, phase names).
**Rationale:** Refactor scope was structural (skill boundary extraction + slim); user-facing flows untouched. Minor LOC overages on some phase skills (stella-protocol 106 vs ≤100 target, stella-build 167 vs ≤150) accepted — 41% overall reduction was substantial and core value preserved.
**Alternatives:** Aggressive further slimming (rejected — would strip preserved strengths like 7-lens Observation Haki and test-plan templates).

### 2026-04-18 CLOSE: Atomic Skills v0.6.0
**Phase:** CLOSE
**Satellite:** York
**Decision:** Version closed as 0.6.0. `package.json` bumped 0.5.0 → 0.6.0. CHANGELOG.md updated with v0.6.0 entry (Added/Changed/Preserved/Inspiration Credits). architecture.md synced with 3-layer skill model + 3 new decision entries. README.md updated to "10 Agent Skills" with 3-table skills inventory. CLAUDE.md rewritten to delegate governance to atomic skills with quick-reference retained inline.
**Rationale:** All P0 PRD items shipped, self-review clean, documentation aligned with reality. Inspiration credits documented: obra/superpowers (TDD Iron Law, verification-before-completion, atomic skill composition) and bmad-code-org/BMAD-METHOD (scale-adaptive agent layering, project-context-as-constitution).
**Alternatives:** None.

---
## === v0.6.0 — 2026-04-18 — Atomic Skills & Execution Rigor ===
### Summary: Pecah phase skills ke orchestrator + 5 atomic skills (3 governance + 2 Edison); edison-verify mandatory di BUILD EXIT GATE
### Decision count: 5 entries (track selection, PRD, build, review, close)
---

### 2026-04-18 Track Selection: East Blue for v0.7.0 Execution Depth
**Phase:** IDEATE → BUILD
**Satellite:** IMU
**Decision:** East Blue track selected for "v0.7.0 Execution Depth" sprint. Skip DEFINE — Mini-PRD sufficient karena scope tight (2 items: edison-debug atomic skill + subagent-per-feature dispatch pattern di stella-build).
**Rationale:** P1/P2 backlog dari v0.6.0 idea brief well-defined. Tight scope (2 items, defer satellite atomic skills + writing-skills meta + lilith adversarial + project-context.md ke v0.7.1+) menahan godaan scope creep. Formal PRD akan add overhead tanpa value di scope sekecil ini.
**Alternatives:** Grand Line (rejected — scope tidak justify formal PRD); all-P1-in-one-sprint (rejected — risk scope creep + burnout).

### 2026-04-18 Mini-PRD Approved: v0.7.0 Execution Depth
**Phase:** IDEATE (East Blue Mini-PRD)
**Satellite:** IMU
**Decision:** Mini-PRD locked. (1) `edison-debug` atomic skill — 4-phase methodology (Reproduce → Isolate → Hypothesize → Verify Fix), Iron Law reproduce-before-fix, auto-suggests edison-verify after fix. (2) Subagent-per-feature dispatch pattern di stella-build — threshold ≥3 files OR ≥150 LOC expected, self-contained brief template (feature spec + acceptance criteria + file pointers, NOT full PRD), parent retains log-pose + scope-changes state. Deferred ke v0.7.1+: satellite atomic skills (shaka-brief/shaka-prd/pythagoras-research/oda-design), writing-skills meta, lilith-red adversarial, lilith-blue checkpoint-preview, brain/project-context.md BMAD-style.
**Rationale:** Two-item scope balances shipped value (edison-debug immediately useful untuk ongoing BUILDs) dengan architectural foundation (subagent pattern sets groundwork untuk long multi-feature BUILDs).
**Alternatives:** Include satellite atomic skills (rejected — too broad for East Blue, would convert to Grand Line); only edison-debug (rejected — subagent pattern juga P0 per idea brief, small enough to ship together).

### 2026-04-18 BUILD Complete: Execution Depth v0.7.0
**Phase:** BUILD
**Satellite:** Edison
**Decision:** Both P0 items shipped. (1) `skills/edison-debug/SKILL.md` created with 4-phase format blocks (REPRODUCE / ISOLATE / HYPOTHESIZE / VERIFY FIX), Iron Law, anti-patterns, integration pointers to edison-verify + buster-call + punk-records + cipher-pol. (2) `skills/stella-build/SKILL.md` gained two new sections: "Debug Invocation (on unexpected behavior)" and "Subagent-per-Feature Dispatch (for long BUILDs)" with threshold criteria, parent retention list, and self-contained brief template. stella-build grew 167 → 207 LOC. Both source and `.claude/skills/` mirrors in sync. No scope drift — all items in Mini-PRD.
**Rationale:** Tight scope executed clean. Brief template made explicit to reduce interpretation ambiguity (identified as biggest risk in Idea Brief).
**Alternatives:** Enforce subagent dispatch as gate (rejected — opt-in matches Stella's "discipline via skill, not global config" pattern from v0.6.0).

### 2026-04-18 REVIEW Complete: Execution Depth v0.7.0
**Phase:** REVIEW
**Satellite:** Lilith Red + Lilith Blue (self-review)
**Decision:** All clear. No BUSTER CALL findings. stella-build LOC growth (167 → 207, +24%) accepted — two whole new protocol sections added, trimming would drop critical decision criteria (threshold rules, brief template). edison-debug format blocks follow same shape as edison-tdd (familiar to Stella). Mini-PRD deliverables 2/2 complete.
**Rationale:** v0.6.0 REVIEW already set precedent for accepting LOC overages when core value is preserved. Both additions are structural protocols, not prose — trimming would harm execution fidelity.
**Alternatives:** Split stella-build's new sections into separate atomic skills (rejected — subagent pattern belongs to BUILD orchestration, not a standalone atomic skill at this stage).

### 2026-04-18 CLOSE: Execution Depth v0.7.0
**Phase:** CLOSE
**Satellite:** York
**Decision:** Version closed as 0.7.0. `package.json` bumped 0.6.0 → 0.7.0. CHANGELOG.md updated with v0.7.0 entry (Added/Changed/Preserved/Deferred/Inspiration Credits). architecture.md — Layer 2 table adds edison-debug row; two new decision entries (edison-debug rationale + subagent-per-feature rationale). README.md — "11 Agent Skills" + Since column on Edison atomic table. CLAUDE.md — edison-debug appended to Edison atomic list. ideas.md — v0.7.0 moved to In Progress/BUILD, v0.6.0 marked SHIPPED.
**Rationale:** All Mini-PRD items shipped, self-review clean, documentation aligned with reality. Inspiration credits documented: obra/superpowers (systematic-debugging, subagent-driven-development).
**Alternatives:** None.

---
## === v0.7.0 — 2026-04-18 — Execution Depth ===
### Summary: Added edison-debug (4-phase root cause) + subagent-per-feature dispatch pattern in stella-build. 11 skills total. Inspired by obra/superpowers systematic-debugging & subagent-driven-development.
### Decision count: 5 entries (track selection, Mini-PRD, build complete, review complete, close)
---

### 2026-04-18 Track Selection: East Blue for v0.7.1 Meta + Adversarial Quality
**Phase:** IDEATE → BUILD
**Satellite:** IMU
**Decision:** East Blue track selected for "v0.7.1 Meta + Adversarial Quality" sprint. Three items from v0.7.0 deferred backlog: (1) `writing-skills` meta skill, (2) Lilith Red Adversarial Mode in stella-review, (3) Lilith Blue Checkpoint Preview in stella-review. All are well-defined extensions — no Grand Line PRD needed.
**Rationale:** Three small-medium items that share a theme (quality of output). All inline extensions or new isolated meta skill — no architectural shifts. East Blue scope prevents burnout; all three can ship in one BUILD pass.
**Alternatives:** Include satellite atomic skills (rejected — too large for East Blue, would require Grand Line); only writing-skills (rejected — all three are similar effort, coherent thematically).

### 2026-04-18 BUILD Complete: Meta + Adversarial Quality v0.7.1
**Phase:** BUILD
**Satellite:** Edison
**Decision:** All 3 items shipped. (1) `writing-skills/SKILL.md` created (121 LOC): RED-GREEN-REFACTOR cycle for skill authoring, Iron Law, anti-patterns, integration with punk-records + buster-call. (2) Lilith Red Adversarial Mode added to `stella-review` after Code Pass (36 LOC): threat model → top 3 targets → concrete attack → predict → minimal fix, structured output format. (3) Lilith Blue Checkpoint Preview added to `stella-review` after Test Suite (40 LOC): 4 concern buckets, per-bucket acknowledgment, security per-item. stella-review grew 154 → 210 LOC. Both source and `.claude/skills/` mirrors in sync. No scope drift.
**Rationale:** Items are structurally independent (new file + two additive sections) — minimal merge risk. Adversarial Mode and Checkpoint Preview placed after existing sections to avoid disrupting current flows.
**Alternatives:** Extract Adversarial Mode and Checkpoint Preview as separate atomic skills (rejected — they extend existing Lilith satellites, not standalone reusable patterns at this stage).

### 2026-04-18 REVIEW Complete: Meta + Adversarial Quality v0.7.1
**Phase:** REVIEW
**Satellite:** Lilith Red + Lilith Blue (self-review)
**Decision:** All clear. No BUSTER CALL findings. stella-review LOC growth (154 → 210, +36%) accepted — two full protocol modes added, each with format blocks that agents need verbatim. writing-skills at 121 LOC within target range (~80–100 LOC guideline slightly exceeded; extra 21 LOC is the meta-scope section explaining it applies to all 4 layers including itself — kept for self-reference value).
**Rationale:** LOC overages accepted when the content is structural protocol, not filler prose. All 3 deliverables are complete per Mini-PRD criteria.
**Alternatives:** None.

### 2026-04-18 CLOSE: Meta + Adversarial Quality v0.7.1
**Phase:** CLOSE
**Satellite:** York
**Decision:** Version closed as 0.7.1. `package.json` bumped 0.7.0 → 0.7.1. CHANGELOG.md updated with v0.7.1 entry (Added/Changed/Preserved/Deferred/Inspiration Credits). architecture.md — Layer 4 Meta table added, 3 new decision entries (writing-skills, adversarial mode, checkpoint preview). README.md — "12 Agent Skills" + Meta table. CLAUDE.md — Meta layer line added.
**Rationale:** All Mini-PRD items shipped, self-review clean, documentation aligned with reality. 12 skills across 4 layers fully documented.
**Alternatives:** None.

---
## === v0.7.1 — 2026-04-18 — Meta + Adversarial Quality ===
### Summary: Added writing-skills (Layer 4 meta) + Lilith Red Adversarial Mode + Lilith Blue Checkpoint Preview. 12 skills total (5 phase + 3 Edison + 3 governance + 1 meta). Inspired by obra/superpowers writing-skills & requesting-code-review.
### Decision count: 5 entries (track selection, build complete, review complete, close — Mini-PRD inline, no separate entry)
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

---
## === v0.12.1 — 2026-11-09 — Distribution Hotfix ===
### Summary: The installer shipped 5 of 12 skills plus a stale hook since v0.8.0 (found during the morluto/rea benchmark). Fixed with cli/manifest.js + scripts/sync.js --check + smoke test + CI + prepublishOnly. REVIEW: 0 Critical, H1/M1/L1–L3 fixed, M2 = manual plugin-install test.
### Decision count: 10 entries (buster call, warning, track selection, build complete, 2× resolved, review findings, review resolved, review complete, close)
---

### 2026-11-09 BUSTER CALL: Installer ships 5 of 12 skills
**Phase:** BUILD complete v0.12.0 (pre-CLOSE)
**Satellite:** Pythagoras (found during morluto/rea benchmark) → Lilith Blue
**Severity:** BUSTER CALL — MUST-FIX
**Decision:** `cli/install.js` hard-codes `SKILLS` to the 5 phase orchestrators (lines 9–15). The 4 DEFINE/IDEATE satellites (`shaka-brief`, `shaka-prd`, `pythagoras-research`, `oda-design`) and 3 governance skills (`cipher-pol`, `buster-call`, `punk-records`) are never copied to user projects. `stella-protocol` and `stella-define` are thin routers that only invoke those satellites, so IDEATE and DEFINE are hollow after `npx stella-protocol install`. `.claude-plugin/marketplace.json` has the same 5-skill list and is still at version 0.11.0 (package.json 0.12.0). Evidence: Observed (file read + `diff`), 2026-11-09.
**Rationale:** Failure mode is certain for every npm install since v0.8.0 (satellites) / v0.6.0 (governance) — not speculative. The product's core differentiation (5-lensa, PRD, governance skills) silently degrades. Must be fixed before v0.12.0 CLOSE/publish. Root cause is shared with the WARNING below: facts maintained by hand in several places. Full analysis: `brain/research-rea-benchmark.md` §2.
**Alternatives:** Patch the array only (rejected as sole fix — drift has recurred 3× since 2026-04-07; pair with a generated list + `--check`, see research brief A1).
**Status:** OPEN

### 2026-11-09 WARNING: Distribution drift (same root cause as installer BUSTER CALL)
**Phase:** BUILD complete v0.12.0 (pre-CLOSE)
**Satellite:** Lilith Blue
**Severity:** WARNING
**Decision:** Grouped by root cause (hand-maintained copies): (1) `cli/install.js:125` omits `project-context.md` while `cli/init.js:30` includes it; (2) `punk-records/stella-claude-md.md` — the hook installed into user CLAUDE.md — predates v0.10.0 (no `project-context.md` step, no Skill Layers/superpowers); (3) `.claude/skills/stella-close/SKILL.md` has an extra `---` line vs source (violates "mirror identical"); (4) `brain/architecture.md` API Surface still lists removed `edison-*`, `atlas-taskplan`, `stella-parallel`, and "Install 5 skills". Evidence: Observed, 2026-11-09.
**Rationale:** Each item is small, but together they mean user installs diverge from the dogfooded repo. Fix together with the BUSTER CALL and add a sync/check script so CI catches the next drift.
**Alternatives:** Fix individually by hand (rejected — that is how the drift happened).
**Status:** OPEN

### 2026-11-09 Track Selection: East Blue for v0.12.1 Distribution Hotfix
**Phase:** IDEATE → BUILD
**Satellite:** IMU
**Decision:** East Blue track, mini-PRD `brain/prd-hotfix-distribution.md` approved by Stella ("gas"). Ships as 0.12.1 because 0.12.0 is already `latest` on npm (Observed: `npm view stella-protocol dist-tags`; the published tarball's `cli/install.js` has the 5-skill array). The plan was revisited against the Obsidian vault (`projects/stella-protocol-recap.md`, `projects/poneglyph-exploration.md`, `projects/amal-najib/`) and stays the same: the planned Threads launch / productize path makes a working install more urgent, not less.
**Rationale:** The scope is mechanical and well-defined (installer + sync check). It resolves the OPEN BUSTER CALL and WARNING.
**Alternatives:** Fold into v0.12.0 (rejected — already published); Grand Line with doctor/multi-harness (rejected — those are P2 and would delay the fix).

### 2026-11-09 BUILD Complete: Distribution Hotfix v0.12.1
**Phase:** BUILD
**Satellite:** Edison + Atlas
**Decision:** All P0/P1 items in `brain/prd-hotfix-distribution.md` shipped. (1) `cli/manifest.js` is the single owner of the skill list (derived from `skills/`), the brain templates and the hook section. (2) `install.js` installs 12 skills + 7 brain templates and writes the current hook. `init.js` reuses the same code. (3) `punk-records/stella-claude-md.md` updated to the current hook. (4) `scripts/sync.js` (write + `--check`, zero deps). (5) `npm test` = sync check + `scripts/smoke-install.js`. (6) `.github/workflows/ci.yml`. (7) `brain/architecture.md` API Surface + decision entry. Also fixed: `.claude/skills/stella-close` mirror drift, marketplace 0.11.0 → 0.12.0 with all 12 skills.
**Rationale:** Verification (Observed, 2026-11-09): `npm test` PASS. Seven deliberate drift injections (mirror edit, version bump, hook edit, long description, escaping link, name mismatch, orphan mirror file) each make `--check` exit 1. Real `stella init` → 7 files. Real interactive `stella install` via pseudo-TTY → 12 skills, 7 brain files, hook containing the project-context step. `npm pack --dry-run` includes `cli/manifest.js`. `superpowers:verification-before-completion` is not installed in this cloud session, so the checks above were run directly instead (no waiver needed — nothing FAILED).
**Alternatives:** Generate `marketplace.json` with a `"skills": "./skills"` folder pointer like REA (rejected for now — Claude Code's auto-discovery behavior for this entry is Unknown; an explicit generated array is the safe choice).

### 2026-11-09 RESOLVED: Installer ships 5 of 12 skills
**Phase:** BUILD
**Satellite:** Edison
**Decision:** The BUSTER CALL from 2026-11-09 ("Installer ships 5 of 12 skills") is resolved in source on branch `claude/optimistic-ramanujan-7tjvod`. Users get the fix once 0.12.1 is published to npm (CLOSE + publish — a human step).
**Rationale:** The skill list is now derived from `skills/`, and the smoke test fails if any skill folder is not installed.
**Alternatives:** None.
**Status:** RESOLVED

### 2026-11-09 RESOLVED: Distribution drift (WARNING)
**Phase:** BUILD
**Satellite:** Edison
**Decision:** The WARNING from 2026-11-09 is resolved: install now copies `project-context.md`, the hook template is current, the stella-close mirror is identical, and the architecture.md API Surface is current. `npm test` + CI now catch future drift.
**Rationale:** Structural fix (generated copies + check), not per-file patches.
**Alternatives:** None.
**Status:** RESOLVED

### 2026-11-09 REVIEW Findings: Distribution Hotfix v0.12.1
**Phase:** REVIEW
**Satellite:** Lilith Red + Lilith Blue
**Decision:** Quality bar: production. 0 Critical, 1 High, 2 Medium, 3 Low. Every finding was reproduced with a probe (Observed) unless marked otherwise.
- ⚠️ WARNING — H1: no publish guard. `package.json` has no `prepublishOnly`, so `npm publish` right after the CLOSE version bump (without `npm run sync`) ships marketplace version drift again. 0.12.0 was published from a local machine with no CI. Fix: `"prepublishOnly": "npm test"`. **Status:** OPEN
- ⚠️ CONCERN — M1: `npm run sync` deletes non-Stella files in `.claude/skills/` (probe: `my-local-skill/SKILL.md` was removed without warning). Affects only contributors in this repo; untracked files cannot be recovered. Fix: report orphans and delete only with `--prune`. **Status:** OPEN
- ⚠️ CONCERN — M2: the Claude Code plugin install path (12-entry `skills` array in marketplace.json) is unverified (Unknown — cannot run `/plugin install` in a cloud session). Manual test added to `brain/test-plan.md`. **Status:** OPEN (manual test for Stella)
- ⚠️ CONCERN — L1: `String.replace` with the project folder name as the replacement string interprets `$'`/`$&`. Probe: folder `acme$'x` grows project-context.md from 545 to 1048 chars (tail duplicated). This bug existed before the hotfix (init.js). Fix: function replacer. **Status:** OPEN
- ⚠️ CONCERN — L2: the lint reports CRLF SKILL.md files as "missing YAML frontmatter" (probe), a false positive for Windows checkouts with autocrlf. Fix: normalize `\r\n` before linting. **Status:** OPEN
- ⚠️ CONCERN — L3: the CI workflow has no `permissions:` block, so it runs with the default GITHUB_TOKEN scope. Fix: `permissions: contents: read`. **Status:** OPEN
- INFO: installed users now load 7 more skill descriptions (~1,450 chars ≈ 360 tokens per session). This is the intended v0.8.0 design, not a defect. It is relevant to the thin-hook / token work (research brief A7).
- INFO: users who installed 0.12.0 keep their old CLAUDE.md hook (out of scope per mini-PRD; `stella doctor`, P2).
**Rationale:** No auth, money, PII or network surface, so Adversarial Mode was not triggered. The only input is the cwd folder name (L1). CI uses `pull_request` (not `pull_request_target`) and no secrets. H1 matters most because the next step (CLOSE + publish) is exactly where the drift returns.
**Alternatives:** Defer H1 to CLOSE as a checklist item (rejected — a structural guard beats a checklist, which is the lesson of this whole hotfix).

### 2026-11-09 RESOLVED: REVIEW Findings v0.12.1 (H1, M1, L1, L2, L3)
**Phase:** REVIEW
**Satellite:** Lilith Blue
**Decision:** Stella chose "fix all now". H1: `"prepublishOnly": "npm test"` added; `npm publish --dry-run` after a version bump without sync now exits 1 ("marketplace.json is out of date"). M1: `sync.js` reports source-less files in `.claude/skills/` and deletes them only with `--prune` (probe: local skill kept; removed only with `--prune`). L1: function replacers in `cli/manifest.js`; folder `acme$'x` gives a 538-char file (expected 538, was 1048); regression assertion added to `smoke-install.js`. L2: CRLF is normalized before lint (probe: 0 frontmatter errors). L3: `permissions: contents: read` added to CI. Re-ran the earlier drift probes: mirror drift still exits 1, unknown flag exits 2, `npm test` PASS. Cipher Pol INTEL (stella-build description trim) acknowledged by Stella. M2 stays OPEN as a manual test (`brain/test-plan.md`: Claude Code `/plugin install` lists 12 skills).
**Rationale:** All fixes are a few lines each and every one was re-verified with the probe that exposed it. No new issues found in the re-review of the changed lines.
**Alternatives:** Fix only H1 + M1 (not chosen by Stella).
**Status:** RESOLVED (H1, M1, L1, L2, L3) · OPEN (M2 — manual test)

### 2026-11-09 REVIEW Complete: Distribution Hotfix v0.12.1
**Phase:** REVIEW → CLOSE
**Satellite:** Lilith Red + Lilith Blue
**Decision:** EXIT GATE cleared: 0 unresolved Critical findings; `brain/test-plan.md` has a v0.12.1 section. Soft: the High finding is resolved, all findings are logged, and the INTEL was acknowledged. M2 (plugin install path) is a manual check for Stella before or after publish.
**Rationale:** Production quality bar met for the scope in `brain/prd-hotfix-distribution.md`.
**Alternatives:** None.

### 2026-11-09 CLOSE: Distribution Hotfix v0.12.1 (+ v0.12.0 paperwork)
**Phase:** CLOSE
**Satellite:** York
**Decision:** Version closed as 0.12.1. `npm version 0.12.1` (package.json + package-lock), `npm run sync` → marketplace 0.12.1, `npm test` PASS. Before the sync, `npm test` FAILED after the bump: the guard works. CHANGELOG: 0.12.1 entry (Fixed/Added/Changed/Upgrading/Deferred) + the 0.12.0 entry that was missing (its CLOSE was never done). The entries were inventoried from `git log 34650da..HEAD` before the prose was written. README: upgrade note under Quick Start. architecture.md: Distribution section synced (`--prune`, `prepublishOnly`, release step). observability-plan.md → Partial. ideas.md: hotfix SHIPPED, plus a new idea about the archive rule. First application of the v0.12.0 per-CLOSE archive rule: the v0.8.0–v0.12.1 blocks move to `vivre-cards-archive.md`.
**Rationale:** The literal archive exception ("any entry with `**Status:** OPEN` stays") would keep the already-resolved BUSTER CALL, WARNING and REVIEW findings (H1–L3) in the main file. The session hook would then report them as open blockers. Interpretation used: an entry stays only while its issue is unresolved. Resolved findings are archived together with their RESOLVED cards, and the only unresolved item (M2) gets a carry-over card in the main file. Rule clarification logged to `brain/ideas.md` Inbox.
**Alternatives:** Keep every card containing "Status: OPEN" in the main file (rejected — produces false blockers at session start); edit the old cards to RESOLVED (rejected — append-only).
