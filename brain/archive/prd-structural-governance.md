## PRD: Structural Governance v0.10.0
**Version:** 1.0 | **Date:** 2026-04-20 | **Status:** Approved

### Problem
Stella Protocol's EXIT GATES adalah checklists yang bisa di-skip tanpa consequence — agent output "[ ] checked" tanpa benar-benar memverifikasi kondisinya. Protocol yang harusnya enforce quality malah cuma minta tolong. Selain itu, setiap BUILD session agent harus re-discover tech stack dari `architecture.md` (yang historical dan panjang) karena tidak ada single source of truth untuk project context.

### Target Users
Stella (dan agent siapa pun yang pakai Stella Protocol) pada saat phase transition — exit DEFINE, BUILD, REVIEW.

### Goals (measurable)
- EXIT GATE violations produce visible REFUSE output — agent tidak bisa proceed tanpa explicit override
- `brain/project-context.md` exists di projects yang pakai Stella Protocol — agent langsung tahu stack + constraints di session start
- Waiver path jelas dan logged — Stella tetap bisa override tapi decision tercatat

### Non-Goals
- Tidak hard-block SETIAP checklist item — hanya kondisi critical (missing PRD file, failed verify, open buster call)
- Tidak auto-block tanpa waiver path — Stella selalu punya jalan override
- P3.2 (auto-archiving hook settings.json) — deferred
- P3.3 (punk-records checkpoint timing) — deferred
- Slim stella-review/stella-build — deferred ke v0.11.0

### Features

#### P0 — Hard-Block EXIT GATES (edit stella-define, stella-build, stella-review)

Ubah format EXIT GATE dari checklist ke explicit REFUSE pattern.

**stella-define hard blocks:**
- REFUSE if `brain/prd-[name].md` tidak ada sebagai file
- REFUSE if Stella belum explicitly approve PRD

**stella-build hard blocks:**
- REFUSE if ada P0 feature dari PRD yang belum implemented
- REFUSE if `edison-verify` FAIL tanpa waiver di `brain/vivre-cards.md`
- REFUSE if ada OPEN Buster Call severity WARNING atau BUSTER CALL

**stella-review hard blocks:**
- REFUSE if ada Critical finding belum resolved
- REFUSE if `brain/test-plan.md` tidak ada

**Waiver mechanism (uniform di semua gate):**
1. Agent catat waiver ke `brain/vivre-cards.md` dengan alasan
2. Agent tunggu Stella konfirmasi "proceed with waiver"
3. Baru lanjut — tidak auto-proceed

Soft conditions (log-pose current, vivre-cards has entries) → tetap sebagai reminder, bukan REFUSE.

#### P0 — `brain/project-context.md` template

Template baru yang ditambahkan ke `stella init` dan `stella install`. Diisi selama DEFINE, auto-loaded di CLAUDE.md session hook.

```markdown
# Project Context: [Project Name]

## What We're Building
[1–2 sentences describing the project]

## Tech Stack
- Language: 
- Framework: 
- Database: 
- Auth: 
- Styling: 
- Deployment: 

## Critical Constraints
[Rules that must never be broken — e.g. "All DB access via RLS, never bypass"]

## Non-Negotiables
[Must-haves for every feature — e.g. "TypeScript strict mode", "Mobile responsive"]

## Key File Locations
- Entry point: 
- DB schema: 
- Auth config: 
- Design system: brain/design-system.md
```

CLAUDE.md session hook: add "Read `brain/project-context.md` (if exists) — note stack + constraints."

#### P1 — Fill project-context.md for Stella Protocol itself

Isi template untuk stella-protocol project sebagai dogfooding: CLI tool, Node.js ≥20, Commander.js, skill files framework.

### Data Model
- New file template: `brain/project-context.md` (added to `stella init` + `stella install`)

### API Contracts
N/A

### Open Questions
1. ~~Hard-block semua checklist atau hanya critical conditions?~~ — resolved: hanya critical
2. ~~Waiver path?~~ — resolved: explicit vivre-card + Stella confirms "proceed with waiver"
