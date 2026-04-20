## PRD: Superpowers Adoption v0.9.0
**Version:** 1.0 | **Date:** 2026-04-20 | **Status:** Approved

### Problem
Stella Protocol v0.8.x punya tiga gap eksekusi: (1) tidak ada task decomposition sebelum BUILD — agent langsung code tanpa checklist; (2) independent features selalu sequential padahal bisa concurrent; (3) `stella-build` bisa diinvoke bahkan tanpa PRD yang diapprove.

### Target Users
Stella ketika mengerjakan multi-feature sprint (≥2 features, PRD approved, Grand Line track).

### Goals (measurable)
- BUILD dimulai dengan task checklist yang eksplisit (atlas-taskplan invoked sebelum first file ditulis)
- Independent features bisa dispatch concurrent tanpa manual orchestration
- `stella-build` menolak proceed jika `brain/prd-[name].md` tidak ada

### Non-Goals
- Tidak replace subagent-per-feature yang sudah ada di stella-build (stella-parallel extends, bukan replace)
- Tidak require atlas-taskplan untuk setiap build — direkomendasikan untuk ≥2 features, bukan mandatory untuk hotfix
- Tidak mengubah phase flow IDEATE → DEFINE → BUILD → REVIEW → CLOSE
- `stella-foundation` di-defer ke sprint berikutnya

### Features

#### P0 — `atlas-taskplan` (new skill, ~80 LOC)
Bite-sized task decomposition. Invoked setelah PRD approved, sebelum `stella-build` starts.
- Input: PRD feature list + architecture decisions
- Output: task checklist ditulis ke `brain/taskplan-[prd-name].md`
  - Tiap task: 2–5 menit, exact file path, what to write/change, acceptance criteria satu kalimat
  - Tasks grouped by feature, ordered by dependency
- Integration: `stella-build` entry menambahkan pointer

#### P0 — Design-Approval Gate (edit `stella-build`, ~10 LOC)
Tambah Entry Gate section di `stella-build`:
- Cek `brain/prd-[name].md` ada — jika tidak, redirect ke stella-define
- Cek `brain/log-pose.md` phase — jika bukan build-ready/in-progress, tanya konfirmasi
- Jika ≥2 features: suggest atlas-taskplan

#### P1 — `stella-parallel` (new skill, ~70 LOC)
Concurrent agent dispatch untuk independent features.
- Trigger: ≥2 features tanpa shared files dan tanpa sequential dependency
- Safety rule: kalau dua features edit file yang sama → sequential
- Flow: identify independent groups → parallel briefs → concurrent dispatch → aggregate → Feature Completion Protocol
- Relationship: subagent-per-feature = sequential; stella-parallel = concurrent
- Integration: stella-build Subagent-per-Feature section menambahkan pointer

### Data Model
- New file: `brain/taskplan-[prd-name].md` — output dari atlas-taskplan

### API Contracts
N/A

### Open Questions
1. ~~Naming taskplan file~~ — resolved: `taskplan-[prd-name].md`
2. ~~Same-file parallel safety~~ — resolved: sequential by default jika edit file yang sama
