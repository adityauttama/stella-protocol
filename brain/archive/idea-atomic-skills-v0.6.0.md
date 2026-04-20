# Stella Protocol v0.6.0 — Atomic Skills & Execution Rigor

> IDEATE output. Input referensi: `obra/superpowers` + `bmad-code-org/BMAD-METHOD`.
> Status: Draft plan, belum di-approve. Akan jadi base untuk DEFINE phase (PRD).

## Context

Stella Protocol saat ini (v0.5.0 closed) unggul di **brainstorming (IMU)** dan **PRD generation (Shaka)**, dengan governance kuat (Cipher Pol, Buster Call, Punk Records). Namun dari bandingkan terhadap `obra/superpowers` dan `bmad-code-org/BMAD-METHOD`, teridentifikasi dua gap utama:

1. **Token inefficiency** — 5 phase skill monolitik (139–299 baris, total ~5,000 token) di-load wholesale setiap invoke. Governance prose (Cipher Pol, Buster Call, EXIT GATE format) diulang di multiple file. Tidak ada progressive disclosure, tidak ada subagent delegation, tidak ada sharding.

2. **BUILD execution rigor lemah** — Edison menulis kode lalu Lilith Blue membuat test-plan *setelahnya* (checklist manual, bukan suite otomatis). EXIT GATE BUILD tidak memverifikasi `build/lint/test` secara otomatis. Tidak ada TDD enforcement, tidak ada systematic debugging methodology, tidak ada subagent-per-feature untuk mencegah context bloat di BUILD panjang.

**Outcome yang diharapkan:** Stella tetap jadi PM-first framework dengan identitas One Piece, tapi token footprint turun ~50% dan kualitas BUILD setara superpowers (TDD non-negotiable + automated verification).

---

## Recommendation: Evolve Track (Grand Line Sprint)

**Rationale** (mengapa bukan Surgical atau Reimagine):

- **Surgical** hanya trim prose — tidak solve root cause (monolitik skill, tidak ada delegasi). Token saving terbatas, build rigor tetap lemah.
- **Reimagine (story sharding BMAD)** mengorbankan conversational strength Shaka/IMU dan butuh multi-sprint. Risk kehilangan momentum.
- **Evolve** = pecah phase skill menjadi **atomic skills** + **subagent-per-feature** di BUILD. Ini unlock keduanya (token + build) dalam satu sprint, tanpa merombak identitas. Reversible.

**One Piece metaphor dipertahankan penuh** — atomic skills memakai nama satellite (`edison-tdd`, `lilith-verify`, `shaka-brief`, dsb.), phase names tetap, Cipher Pol/Buster Call/Punk Records tetap.

---

## Diagnostic (Apa yang Perlu Diperbaiki)

| Area | Kondisi Sekarang | Target v0.6.0 |
|---|---|---|
| Skill loading | 5 phase skill, 1,138 LOC, loaded wholesale | Phase skill = orchestrator (~80–120 LOC), delegate ke atomic skill on-demand |
| Governance duplication | Cipher Pol + Buster Call format diulang di 3+ file | Governance di-extract ke atomic skill `cipher-pol` + `buster-call`, phase skill hanya link |
| BUILD rigor | Test-plan manual, no build/lint enforcement | `edison-tdd` RED-GREEN-REFACTOR + `edison-verify` auto-run build/lint/test di EXIT GATE |
| Context bloat BUILD | Multi-feature build accumulate context | Subagent-per-feature dispatch (inspired superpowers/subagent-driven-development) |
| Debugging | No systematic method | `edison-debug` skill (4-phase, inspired superpowers/systematic-debugging) |
| Skill meta-quality | No test harness untuk skills sendiri | `writing-skills` style meta skill (RED-GREEN-REFACTOR untuk prompt) |

---

## Design: Atomic Skill Architecture

### Layer 1 — Phase Orchestrators (5 skills, slim)

Tetap ada karena = user-facing slash command. Di-trim jadi ~80–120 LOC:

- `stella-protocol` (IDEATE) — orchestrate IMU, route ke `shaka-brief`
- `stella-define` (DEFINE) — orchestrate Shaka/Pythagoras/ODA, route ke `shaka-prd`, `pythagoras-research`, `oda-design`
- `stella-build` (BUILD) — orchestrate Edison/Atlas, route ke `edison-tdd`, `edison-verify`, `edison-debug`, `atlas-preflight`
- `stella-review` (REVIEW) — route ke `lilith-red`, `lilith-blue`
- `stella-close` (CLOSE) — route ke `york-docs`, `morgans-gtm`

Isi orchestrator: "When X happens, invoke skill Y" — bukan full methodology.

### Layer 2 — Satellite Atomic Skills (new)

| Skill | Inspirasi | Fungsi |
|---|---|---|
| `edison-tdd` | superpowers/test-driven-development | RED-GREEN-REFACTOR enforcement. Iron Law: no code without failing test. |
| `edison-verify` | superpowers/verification-before-completion | Auto-run `npm run build && lint && test`. Mandatory di BUILD EXIT GATE. |
| `edison-debug` | superpowers/systematic-debugging | 4-phase root cause: reproduce → isolate → hypothesize → verify fix |
| `shaka-brief` | — (extracted dari stella-protocol) | 5-lensa ideation → Idea Brief |
| `shaka-prd` | BMAD/analysis-phase + stella-define | Express/Guided PRD generation. Advanced elicitation dari BMAD. |
| `pythagoras-research` | BMAD/research workflows | Market/Domain/Technical research modes |
| `oda-design` | — (extracted) | UX flows + design-system.md |
| `lilith-red` | BMAD/adversarial-review | Spec audit, security audit, adversarial mode |
| `lilith-blue` | superpowers/requesting-code-review | QA, test-plan gen, checkpoint-preview (reorder diff by concern) |
| `atlas-preflight` | — (extracted) | Deploy pre-flight checklist |
| `york-docs` | — (extracted) | Documentation sync + observability-plan |
| `morgans-gtm` | — (extracted) | GTM content |

### Layer 3 — Governance Atomic Skills (new, shared)

| Skill | Fungsi |
|---|---|
| `cipher-pol` | Scope drift monitoring, scope-changes.md logging (INTEL/ALERT/INTERCEPT) |
| `buster-call` | Quality/security veto, vivre-cards.md logging |
| `punk-records` | Brain files update orchestration (log-pose, vivre-cards, architecture) |

### Layer 4 — Meta Skill (new)

- `writing-skills` — TDD untuk skills Stella sendiri (RED: baseline fail → GREEN: minimal fix → REFACTOR). Inspirasi langsung dari `obra/superpowers/skills/writing-skills/SKILL.md`.

---

## Subagent-per-Feature Pattern (BUILD)

**Masalah yang di-solve:** BUILD panjang (5+ features) accumulate context dari feature sebelumnya — PRD di-read berulang, implementation details dari feature 1 ikut ke feature 5.

**Solution:**
- `stella-build` parent session: orchestrator, hold log-pose + scope-changes + PRD index
- Per feature: dispatch fresh subagent via `Agent` tool dengan **self-contained brief** (feature spec + acceptance criteria + pointer ke file relevan, BUKAN PRD lengkap)
- Subagent executes `edison-tdd` + `edison-verify` per feature
- Parent receives ringkasan, update Punk Records, proceed ke feature berikutnya

Inspirasi: `superpowers/subagent-driven-development` + BMAD story-sharding (meskipun tidak full sharding — PRD tetap single source, brief di-generate on-demand).

---

## Sprint Plan (Grand Line, v0.6.0)

**Phase:** IDEATE (done — ini output) → DEFINE → BUILD → REVIEW → CLOSE

**Scope (preliminary, final di PRD):**

### P0 (must ship)
1. Extract governance ke `cipher-pol`, `buster-call`, `punk-records` atomic skills
2. Create `edison-tdd` skill (RED-GREEN-REFACTOR enforcement)
3. Create `edison-verify` skill (auto-run build/lint/test)
4. Slim 5 phase skills jadi orchestrator (~80–120 LOC each)
5. Update BUILD EXIT GATE: wajib `edison-verify` pass sebelum transition ke REVIEW

### P1 (should ship)
6. Create `edison-debug` skill (systematic debugging)
7. Subagent-per-feature pattern di `stella-build`
8. Extract satellite atomic skills (`shaka-brief`, `shaka-prd`, `pythagoras-research`, `oda-design`)
9. `writing-skills` meta skill untuk test Stella skills sendiri
10. Progressive disclosure index (`skills/README.md` — kapan invoke skill apa)

### P2 (nice-to-have, defer if scope creep)
11. `lilith-red` adversarial mode (BMAD-inspired)
12. `lilith-blue` checkpoint-preview (diff reorder by concern)
13. BMAD-style `brain/project-context.md` (tech stack + critical rules, terpisah dari governance CLAUDE.md)
14. Advanced elicitation techniques di `shaka-prd`

---

## Critical Files to Modify

**Slim (refactor):**
- `skills/stella-protocol/SKILL.md` (171 → ~80 LOC)
- `skills/stella-define/SKILL.md` (298 → ~120 LOC)
- `skills/stella-build/SKILL.md` (299 → ~120 LOC)
- `skills/stella-review/SKILL.md` (231 → ~100 LOC)
- `skills/stella-close/SKILL.md` (139 → ~80 LOC)
- `CLAUDE.md` — tambah pointer ke `cipher-pol`/`buster-call` (currently inline governance rules)

**Create (new atomic skills):**
- `skills/edison-tdd/SKILL.md`
- `skills/edison-verify/SKILL.md`
- `skills/edison-debug/SKILL.md`
- `skills/cipher-pol/SKILL.md`
- `skills/buster-call/SKILL.md`
- `skills/punk-records/SKILL.md`
- `skills/writing-skills/SKILL.md`
- (P1/P2) satellite atomic skills

**Mirror ke installed copies:** `.claude/skills/*` (check apakah folder ini exist di install target)

**Protocol docs:**
- `protocol/architecture.md` — update untuk reflect layered skill model
- `README.md` — update skills inventory

**Reuse (sudah ada, jangan recreate):**
- Brain files structure (`brain/log-pose.md`, `vivre-cards.md`, `scope-changes.md`) — tetap. Atomic skills write ke file yang sama.
- YAML frontmatter format (`name`, `description`) — sudah sesuai spec agentskills.io. Pertahankan.
- EXIT GATE concept dari v0.5.0 — pertahankan, tambah verification step.
- Phase transition gates — pertahankan, orchestrator tetap enforce.

---

## Verification (End-to-End Test Plan)

**Token efficiency test:**
- Baseline: invoke `/stella-build` pada project dummy, ukur token consumption session awal (expected ~1,200–1,500T untuk skill + brain reads)
- Post-refactor: ulang, target ≤ 600T untuk orchestrator + lazy-load `edison-tdd` hanya saat feature implementation
- Success criteria: ≥40% reduction

**BUILD rigor test:**
- Simulate feature implementation: trigger `edison-tdd`, verify RED phase blocks progress tanpa failing test
- Trigger `edison-verify` pada project dengan sengaja ada lint error → must block EXIT GATE
- Run `edison-debug` pada known bug → verify 4-phase flow terjalankan

**Subagent-per-feature test:**
- BUILD project dengan 3 features, monitor parent context — tidak boleh accumulate feature 1 implementation code di feature 3 session
- Verify Punk Records tetap updated oleh parent orchestrator

**Regression test:**
- IDEATE + DEFINE flow tetap berjalan identik (conversational, 5-lensa, PRD gen) — **ini strength yang tidak boleh terdegradasi**
- Cipher Pol + Buster Call masih trigger pada scope drift / security finding
- Vivre Cards append-only, version boundaries tetap

---

## What's Preserved (Non-Negotiable)

- **IMU 5-lensa brainstorming** — strength utama, `shaka-brief`/`stella-protocol` tetap conversational
- **Shaka Express/Guided PRD** — strength utama, jangan sentuh flow
- **One Piece metaphor** — seluruh naming (satellites, Cipher Pol, Buster Call, Punk Records, EXIT GATE, Vivre Card, Log Pose) tetap
- **Brain files sebagai source of truth** — markdown, git-committable, human-readable
- **Append-only vivre-cards** — decision log integrity
- **Phase gates** — DEFINE → BUILD → REVIEW → CLOSE sequence tidak boleh di-skip

---

## Out of Scope (for v0.6.0)

- Full BMAD story-sharding (story file per-story dengan PRD+arch embedded) — future v1.0 jika PRD makin besar
- Multi-platform abstraction (Cursor, Copilot, Gemini) seperti superpowers — fokus Claude Code dulu
- Expansion packs ala BMAD (Game Dev, Creative Suite) — domain-specific modules nanti
- Web UI planning (BMAD Phase 1) — Claude Code-native only

---

## Next Steps (Untuk Sesi Berikutnya)

1. **Review & approve plan ini** — boleh edit/amend sebelum proceed
2. Jalankan **IDEATE phase** proper: Track Selection Gate → commit ke Grand Line → log vivre card
3. Jalankan **DEFINE phase**: create `brain/prd-atomic-skills.md` dari plan ini sebagai base, Shaka Express mode harusnya cukup (scope well-defined)
4. Pythagoras arch decision: subagent dispatch pattern, atomic skill boundary rules
5. Lilith Red Spec Pass: audit PRD sebelum BUILD
6. BUILD (Grand Line — subsprint): P0 dulu, feature checkpoint setelah setiap atomic skill shipped
7. REVIEW: Lilith Red/Blue post-BUILD
8. CLOSE: v0.6.0 release, CHANGELOG, architecture.md sync

---

## Appendix — Research Notes

### obra/superpowers key takeaways
- **15+ atomic skills** per-methodology (TDD, debugging, brainstorming, planning, reviewing, worktrees, finishing branch, dll.)
- **Subagent-driven-development**: dispatch fresh agent per 2–5 min task. Parent tidak accumulate child context.
- **"Iron Law"** di TDD: NO code without failing test first. Non-negotiable, enforced via skill prose.
- **Two-stage review**: (1) spec compliance, (2) code quality. Critical findings block progress.
- **Systematic debugging** 4-phase: reproduce → isolate → hypothesize → verify-fix.
- **writing-skills meta skill**: RED-GREEN-REFACTOR untuk skill authoring sendiri — run baseline tanpa skill, lihat agen gagal, tulis skill minimal yang fix, iterate close loopholes.
- YAML frontmatter minimal: `name`, `description`. Description harus state *kapan pakai* (trigger/symptom), bukan *apa yang dikerjakan*.

### bmad-code-org/BMAD-METHOD key takeaways
- **Scale-adaptive depth**: bug fix tidak memicu enterprise planning. Inspirasi untuk East Blue vs Grand Line track decision (sudah di Stella).
- **Story sharding**: PRD besar di-shard jadi story files self-contained (PRD excerpt + arch excerpt + AC), dev agent kerja per story di fresh session. Bagus untuk context efficiency tapi berat untuk scope kita sekarang (v0.6.0).
- **project-context.md**: tech stack + critical implementation rules, terpisah dari governance constitution. Bisa diadopsi sebagai `brain/project-context.md` — terpisah dari `CLAUDE.md` (yang = session hook governance).
- **Analysis phase tools**: Brainstorming, Research, Product Brief, PRFAQ (working backwards Amazon). PRFAQ dan working-backwards bisa jadi mode tambahan di `shaka-prd`.
- **Party mode**: invite multi-agent persona dalam satu session. Stella sudah punya Crew Check (lightweight), bisa diperluas.
- **Checkpoint-preview**: reorder diff by design concern, bukan file order. Great UX, bisa jadi `lilith-blue-checkpoint` mode.
- **Advanced elicitation**: teknik tanya-jawab dalam yang bisa tighten PRD quality di `shaka-prd`.
- **Adversarial review**: red-team mode. Sudah ada di Lilith Red, bisa diperdalam.
