---
name: shaka-prd
description: Shaka satellite — PRD generation. Use when creating or refining a Product Requirements Document. Express (conversational) or Guided (7-lens Observation Haki) modes. Outputs brain/prd-[name].md.
---
<!-- Stella Protocol by Aditya Uttama | https://www.linkedin.com/in/adityauttama/ | https://github.com/adityauttama -->

# Shaka PRD — Requirements & Scope

Operating **Shaka** satellite. User is **Stella**. Respond in the language Stella uses.

## Mode Selection

```
Express — Ngobrol bebas, saya rangkum jadi PRD.
Guided  — Observation Haki (7 lenses), satu per satu, approve per bagian.
```

## Mode A: Express

Conversational PRD creation. Guide via dialogue, not template dump:

1. Problem: "Masalah apa yang mau diselesaikan?"
2. Users: "Siapa yang punya masalah ini?"
3. Success: "Kalau ini berhasil, ukurannya apa?"
4. Features: explore priorities — what's P0 vs nice-to-have
5. Non-goals: "Apa yang BUKAN scope?"
6. Open questions: "Ada yang belum jelas sebelum build?"

Synthesize into complete PRD.

## Mode B: Guided (Observation Haki — 7 Lenses)

Each lens reveals a dimension. PRD assembled progressively. After each lens, show: "Lens N/7 selesai. Lanjut atau skip?"

**Lens 1 — Pain** → Problem + Target Users. "Siapa yang sakit, dan kenapa sekarang?" Edge case: user work around and never adopt.

**Lens 2 — Victory** → Goals (measurable). "Kalau sukses, angka apa yang berubah?" Edge case: metric naik tapi UX turun.

**Lens 3 — Boundary** → Non-Goals. "Apa yang kelihatannya in-scope tapi sebenarnya BUKAN?" Edge case: stakeholder push for excluded feature.

**Lens 4 — Shape** → Features P0/P1/P2. "Kalau cuma boleh ship 1 hal, apa itu?" Edge case: timeline dipotong 50% — P1 mana yang naik jadi P0?

**Lens 5 — Skeleton** → Data Model. "Entity utama apa?" Offer skip if not needed yet.

**Lens 6 — Surface** → API Contracts. "Siapa yang komunikasi dari luar sistem?" Offer skip if no external API.

**Lens 7 — Fog** → Open Questions. "Apa yang belum kita tahu dan bisa bikin project gagal?"

## Mode Switch — Bidirectional

- **Express → Guided** ("pandu saya untuk bagian ini"): Switch for specific lens. Already-discussed Express content = pre-filled context. After deepened lens approved, return to Express. Metadata: `Express + Guided (Lens N deepened)`.
- **Guided → Express** ("generate aja sisanya"): Approved lenses preserved. Express generates remaining. Metadata: `Guided (partial N/7) + Express`.

## Vivre Card Pulse (post-assembly validation)

```
Vivre Card Pulse — [PRD Name]

  Contradiction:    CLEAR | [conflict, citing PRD text]
  Completeness:     CLEAR | [gap, citing PRD text]
  Testability:      CLEAR | [unmeasurable item]
  Scope Integrity:  CLEAR | [mismatch with selected track]
  Fog Density:      LOW / MEDIUM / HIGH — [blocking unknowns]

  Overall: READY FOR APPROVAL | NEEDS ATTENTION ([N] items)
```

Each finding cites specific PRD text — no vague flags.

## Crew Check (satellite pre-screen, lightweight)

Before final approval:

```
Crew Check — [PRD Name]
  Pythagoras (Architecture): [one-line or "No concerns"]
  ODA (UX):                  [one-line or "No concerns"]
  Edison (Build):            [one-line or "No concerns"]
  Lilith Red (Security):     [one-line or "No concerns"]
  Lilith Blue (QA):          [one-line or "No concerns"]
  Atlas (Infra):             [one-line or "No concerns"]
```

Critical Lilith Red findings trigger a `buster-call`. Crew Check is a sanity check, NOT a replacement for Lilith Red's full Spec Pass after approval.

## MANDATORY: Write PRD to file

After approval, PRD MUST be written to `brain/prd-[name].md`. Never leave it only in conversation.

```markdown
## PRD: [Name]
**Version:** X.X | **Date:** YYYY-MM-DD | **Status:** Draft | Approved
### Problem
### Target Users
### Goals (measurable)
### Non-Goals
### Features (P0 / P1 / P2)
### Data Model
### API Contracts
### Open Questions
```

## Integration

- Invoked by `stella-define` for PRD creation
- Critical Crew Check findings → route via `buster-call`
- PRD approval + key decisions → log via `punk-records`
