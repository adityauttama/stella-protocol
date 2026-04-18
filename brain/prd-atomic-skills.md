## PRD: Atomic Skills & Execution Rigor (v0.6.0)
**Version:** 1.0 | **Date:** 2026-04-18 | **Status:** Approved
**Track:** Grand Line | **Base:** `brain/idea-atomic-skills-v0.6.0.md`

### Problem
Stella Protocol v0.5.0 punya dua gap struktural:
1. **Token inefficiency** — 5 phase skill monolitik (1,138 LOC) di-load wholesale. Governance prose (Cipher Pol, Buster Call, EXIT GATE) duplicate di 3+ file.
2. **BUILD execution rigor lemah** — test-plan manual post-hoc, tidak ada TDD enforcement, tidak ada automated verify gate (build/lint/test).

Benchmark terhadap `obra/superpowers` dan `bmad-code-org/BMAD-METHOD` menunjukkan bahwa atomic skill pattern + TDD Iron Law bisa menutup kedua gap sekaligus.

### Target Users
- **Stella** (developer/PM) yang pakai Stella Protocol di Claude Code untuk project production-grade
- Framework maintainers (Aditya) — evolusi protokol tanpa break backwards-compat conceptual

### Goals (measurable)
- **G1:** Phase skill LOC turun ≥50% rata-rata (1,138 → ≤570). Tiap orchestrator ≤120 LOC.
- **G2:** BUILD EXIT GATE wajib `edison-verify` pass (build + lint + test) sebelum phase transition.
- **G3:** TDD available as enforceable skill (`edison-tdd`) dengan RED-GREEN-REFACTOR protocol.
- **G4:** Governance prose (Cipher Pol, Buster Call) di-extract ke atomic skill — ditulis sekali, di-reference dari orchestrator.
- **G5:** One Piece metaphor preserved 100% (semua satellite names, governance names, phase names tetap).

### Non-Goals (explicitly out of scope)
- Subagent-per-feature pattern (P1, defer ke subsprint berikutnya)
- edison-debug skill (P1)
- Satellite atomic skills ekstraksi (shaka-brief, shaka-prd, dll — P1)
- writing-skills meta skill (P1)
- Adversarial review mode, checkpoint-preview (P2)
- BMAD story-sharding, project-context.md (P2)
- Full Lilith/Shaka/Pythagoras/ODA skill extraction (defer)
- CLI changes (tidak ada)

### Features (P0)

**F1: Governance atomic skills (3 skills, new)**
- `skills/cipher-pol/SKILL.md` — scope drift monitoring, INTEL/ALERT/INTERCEPT classification, scope-changes.md logging
- `skills/buster-call/SKILL.md` — quality/security veto format, CONCERN/WARNING/BUSTER CALL severity, vivre-cards.md logging
- `skills/punk-records/SKILL.md` — brain files update protocol (log-pose, vivre-cards version boundary, architecture, scope-changes)

**F2: Edison execution atomic skills (2 skills, new)**
- `skills/edison-tdd/SKILL.md` — RED-GREEN-REFACTOR protocol, Iron Law (no code without failing test first), applies per feature during BUILD
- `skills/edison-verify/SKILL.md` — automated verification: detect + run build, lint, test commands. Outputs structured pass/fail report. Blocks EXIT GATE jika fail.

**F3: Slim 5 phase skills (refactor)**
- `stella-protocol` 171 → ≤100 LOC (keep IMU 5-lensa + Track Selection Gate; remove duplicated governance prose)
- `stella-define` 298 → ≤150 LOC (keep Express/Guided/7-lensa + Vivre Card Pulse + Crew Check; delegate governance)
- `stella-build` 299 → ≤150 LOC (keep Edison/Atlas + Feature Completion Protocol; delegate governance + add edison-tdd/verify references)
- `stella-review` 231 → ≤130 LOC (keep Lilith Red/Blue Spec/Code Pass + Quality Track; delegate governance)
- `stella-close` 139 → ≤100 LOC (keep York/Morgans; delegate Vivre Card Version Boundary to punk-records)

**F4: BUILD EXIT GATE enhancement**
Tambah baris di `stella-build` EXIT GATE:
- `[ ] edison-verify passed (build + lint + test clean, or documented waiver)`

### Data Model
N/A — semua markdown files. Brain file structure tidak berubah.

### API Contracts
N/A — tidak ada runtime API. Skill invocation via Claude Code's native skill system (YAML frontmatter `name`/`description` trigger).

### Skill Reference Convention (new)
Orchestrator skill reference atomic skill via prose pointer:
```
Governance: lihat skills/cipher-pol/ dan skills/buster-call/
TDD: invoke edison-tdd saat mulai implementasi feature
Verify: invoke edison-verify di EXIT GATE BUILD
```
Claude Code's skill auto-trigger (via `description` field) tetap primary mechanism.

### Acceptance Criteria
- [ ] 5 new atomic skills created di `skills/` dan mirrored ke `.claude/skills/`
- [ ] 5 phase skills slim sesuai target LOC (measured by `wc -l`)
- [ ] `stella-build` EXIT GATE ada baris edison-verify
- [ ] Governance prose TIDAK diulang di orchestrator — hanya pointer
- [ ] `CLAUDE.md` session hook tetap berfungsi (auto-read brain files)
- [ ] `README.md` skills inventory updated
- [ ] `protocol/architecture.md` updated (layered architecture)
- [ ] `package.json` version bump 0.5.0 → 0.6.0
- [ ] `CHANGELOG.md` v0.6.0 entry
- [ ] `brain/log-pose.md`, `brain/vivre-cards.md` updated with phase progress
- [ ] All changes committed to `claude/review-stella-protocol-ggPxe` branch

### Open Questions
- OQ1: edison-verify bagaimana detect build/lint/test commands di arbitrary project? → **Resolved:** read `package.json` scripts first, fallback ke common commands (`npm run build`, `npm run lint`, `npm test`). Jika tidak ada, minta Stella configure.
- OQ2: Apakah punk-records jadi skill yang di-invoke atau reference doc? → **Resolved:** atomic skill dengan frontmatter description yang aktif saat ada update brain/ files. Orchestrator point ke sini untuk update protocol.
- OQ3: edison-tdd opt-in atau mandatory? → **Resolved:** available-but-opt-in di v0.6.0 (orchestrator suggest, tidak enforce). Mandatory enforcement defer ke future version setelah teruji.

### Architecture Notes (delegated to `brain/architecture.md`)
New layered skill model:
- **Layer 1 — Phase Orchestrators** (5 skills): user-facing slash commands, route ke atomic skills
- **Layer 2 — Edison Atomic** (2 skills P0): execution rigor — TDD, verify
- **Layer 3 — Governance Atomic** (3 skills P0): cross-phase governance
- **Layer 4 — Future Satellite Atomic** (P1): shaka-brief, shaka-prd, lilith-*, dll. — defer.
