# Vivre Cards — Decision Log

> Append-only. Never edit past entries. Each card points back to the moment a decision was made.

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
