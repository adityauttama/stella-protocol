# Ideas

> Capture everything. Filter later.

## Inbox (raw, unvalidated)
_Add ideas here as they come. Format: `- [date] [idea] — [one-line description]`_

## In Progress (Idea Brief done, moving through phases)

### 2026-04-20 — Structural Governance v0.10.0
**Track:** Grand Line | **Phase:** DEFINE
**Problem:** EXIT GATES bisa di-skip tanpa agent benar-benar berhenti — enforcement suggestion-based, bukan structural. Tidak ada single source of truth untuk project context per session.
**Proposed Solution:** (1) Hard-block EXIT GATES — REFUSE pattern di stella-define, stella-build, stella-review. (2) brain/project-context.md template — auto-loaded di CLAUDE.md session hook.
**Who It's For:** Stella + siapa saja yang install Stella Protocol — protocol yang benar-benar gates, bukan cuma suggest.
**Core Assumption:** "Output REFUSE jika X" > "[ ] verify X" — karena yang pertama requires visible output.
**Biggest Risk:** Terlalu rigid jika tidak ada waiver path. Mitigasi: Stella bisa override dengan explicit vivre-card entry.
**Source:** P3 dari structural governance roadmap

### 2026-04-20 — Superpowers Adoption v0.9.0 ✅ SHIPPED v0.9.0
**Track:** Grand Line | **Phase:** CLOSED
**Problem:** Stella Protocol masih punya 3 gap vs obra/superpowers: tidak ada task decomposition sebelum BUILD, tidak ada concurrent agent dispatch, dan BUILD bisa diinvoke tanpa PRD approved.
**Proposed Solution:** 3 skill baru + 1 gate: `atlas-taskplan` (bite-sized task decomposition sebelum BUILD), `stella-parallel` (concurrent dispatch ≥2 independent features), design-approval gate di stella-build entry, `stella-foundation` (session hook sebagai invocable skill).
**Who It's For:** Stella ketika mengerjakan multi-feature project yang butuh structured execution.
**Core Assumption:** Task decomposition + parallel dispatch reduce context bloat lebih efektif dari subagent-per-feature pattern yang ada.
**Biggest Risk:** Scope creep — 4 items, tiap skill butuh clean boundary agar tidak overlap dengan yang sudah ada.
**Source:** P2 dari token efficiency + superpowers adoption roadmap

### 2026-04-20 — Satellite Atomic Skills v0.8.0 ✅ SHIPPED v0.8.0
**Track:** East Blue | **Phase:** CLOSED
**Problem:** stella-define (160 LOC) dan stella-protocol (106 LOC) load seluruh satellite logic inline — setiap invoke membawa Shaka + Pythagoras + ODA + IMU sekaligus meski hanya satu yang dibutuhkan.
**Proposed Solution:** Extract 4 satellite atomic skills (shaka-brief, shaka-prd, pythagoras-research, oda-design); slim orchestrators ke thin routers. On-demand loading per satellite.
**Who It's For:** Stella dan any PM menggunakan Stella Protocol — per-session token footprint lebih rendah untuk focused sessions.
**Core Assumption:** Sessions focused on satu satellite (PRD only, atau architecture only) lebih umum dari sessions yang butuh semua tiga.
**Biggest Risk:** Total LOC meningkat jika semua satellites dibutuhkan dalam satu session.
**Adjacent Ideas:** Slim stella-review + stella-build (v0.9.0), brain/project-context.md BMAD-style
**Source:** Deferred P1 dari v0.6.0 idea brief

### 2026-04-18 — Meta + Adversarial Quality v0.7.1 ✅ SHIPPED v0.7.1
**Track:** East Blue | **Phase:** CLOSED
**Problem:** Two quality gaps: (1) skill authoring is undisciplined — changes made without concrete failure scenarios, no regression log; (2) stella-review has Spec/Code Pass but no attacker-perspective mode and no risk-ordered diff view.
**Proposed Solution:** `writing-skills` meta skill (RED-GREEN-REFACTOR for prompts) + Lilith Red Adversarial Mode (threat-model + concrete exploit steps) + Lilith Blue Checkpoint Preview (diff reorder: Security → Correctness → Quality → Cosmetic).
**Who It's For:** Stella when improving/extending Stella Protocol's own skills (writing-skills), and when doing pre-release security review or reviewing large diffs (adversarial + checkpoint).
**Core Assumption:** Applying TDD discipline to skill authoring will reduce skill regressions over time (no more "I made it better but now it doesn't trigger").
**Biggest Risk:** Adversarial Mode format too prescriptive for non-security contexts.
**Adjacent Ideas:** writing-skills applied to BMAD skills/prompts; brain/project-context.md BMAD-style (deferred)
**Source:** Deferred P1/P2 items from v0.7.0 sprint backlog

### 2026-04-18 — Execution Depth v0.7.0 ✅ SHIPPED v0.7.0
**Track:** East Blue | **Phase:** CLOSED
**Problem:** BUILD phase masih punya dua gap: (1) tidak ada systematic debugging methodology ketika Edison hits a bug — prone ke trial-and-error; (2) long BUILD sessions accumulate context dari semua feature sebelumnya → quality degradation di feature ke-5+.
**Proposed Solution:** `edison-debug` atomic skill (4-phase root cause: Reproduce → Isolate → Hypothesize → Verify Fix) + subagent-per-feature dispatch pattern di stella-build (threshold ≥3 files OR ≥150 LOC).
**Who It's For:** Stella ketika BUILD berlangsung lama atau complex — multi-feature sprint, debugging session, atau PRD dengan 5+ komponen.
**Core Assumption:** Context bloat di long BUILD adalah pain point nyata. Subagent-per-feature will reduce it enough that quality delta terukur.
**Biggest Risk:** Subagent dispatch pattern sulit dijelaskan dalam SKILL.md tanpa konkret example.
**Adjacent Ideas:** writing-skills meta, brain/project-context.md BMAD-style, lilith-red adversarial mode, lilith-blue checkpoint-preview (all deferred ke v0.7.1+)
**Source:** Deferred P1/P2 items dari v0.6.0 idea brief (`brain/idea-atomic-skills-v0.6.0.md`)

### 2026-04-18 — Atomic Skills & Execution Rigor v0.6.0 ✅ SHIPPED v0.6.0
**Track:** Grand Line | **Phase:** CLOSED
**Problem:** Token inefficiency (5 phase skills monolithic, governance prose duplicated) + BUILD execution rigor gap (no TDD, no automated verify gate).
**Proposed Solution:** Layered skill architecture — 5 phase orchestrators + 2 Edison atomic (edison-tdd, edison-verify) + 3 governance atomic (cipher-pol, buster-call, punk-records). edison-verify mandatory di BUILD EXIT GATE.
**Who It's For:** Stella + any PM using Stella Protocol on multi-feature projects.
**Core Assumption:** Progressive disclosure via Claude Code skill auto-trigger mechanism reduces per-session token load without losing governance coverage.
**Biggest Risk:** Breaking existing flow (mitigated by preserving all non-negotiable elements verbatim).
**Adjacent Ideas:** Full BMAD story-sharding, multi-platform abstraction, expansion packs (all out of scope)
**Source:** Benchmark vs obra/superpowers + bmad-code-org/BMAD-METHOD

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

### 2026-04-20 — README Clarity Rewrite
**Track:** East Blue (when prioritized)
**Problem:** README.md reportedly hard to understand — installation steps and usage flow unclear for new users.
**Proposed Solution:** Rewrite README with simpler language + clearer quick-start flow. Keep all One Piece naming intact. Show how to install and how to start a first project.
**Why Parked:** Low priority. Framework functionality not affected. Revisit when onboarding new users becomes a pain point.
**Source:** Feedback in `brain/archive/improvement-2026-04-09.md`

## Killed (and why)
_Ideas that were evaluated and rejected. Include specific reason._
