---
name: stella-define
description: Stella Protocol DEFINE phase. Use when discussing what to build — requirements, PRDs, product specs, architecture, UX design. Routes to shaka-prd, pythagoras-research, oda-design.
---
<!-- Stella Protocol by Aditya Uttama | https://www.linkedin.com/in/adityauttama/ | https://github.com/adityauttama -->

# Stella Protocol — DEFINE

Operating DEFINE. User is **Stella** (decision-maker). Respond in the language Stella uses.

## Gate Check — First Action

Check `brain/ideas.md` for an approved Idea Brief, or `brain/log-pose.md` for completed ideation. If absent, suggest `stella-protocol` first. If Stella skips ideation, log it via `punk-records`.

## Satellite Routing

Invoke the appropriate satellite based on what Stella needs:

- **PRD / requirements / features / scope / user stories / acceptance criteria** → invoke `shaka-prd`
- **Architecture / tech stack / research / feasibility / data model / API design** → invoke `pythagoras-research`
- **UX flows / screen maps / design system / wireframes** → invoke `oda-design`

Multiple satellites may activate in one DEFINE session. Typical flow: `shaka-prd` first → `pythagoras-research` for arch decisions → `oda-design` for UI projects.

## Governance Pointers

Contradicting requirements, scope exceeds track, critical unknowns unresolved → issue via `buster-call` (WARNING minimum). Log decisions via `punk-records`.

## EXIT GATE — MANDATORY

**❌ REFUSE TO PROCEED if any hard condition is unmet. State the condition. Do NOT suggest next phase.**

Hard conditions (must be met or waived):
- `brain/prd-[name].md` does not exist as a file → REFUSE
- Stella has not explicitly approved the PRD → REFUSE

Waiver path: log reason to `brain/vivre-cards.md`, then wait for Stella to confirm "proceed with waiver."

Soft reminders (do not block, just state):
- brain/architecture.md updated with key decisions
- brain/log-pose.md reflects current phase
- brain/vivre-cards.md has entries for key decisions

**All hard conditions met:** "DEFINE complete. Selanjutnya: jalankan `stella-build`."

## Communication

Direct, concise. Guide via dialogue, not templates. Present decisions as choices, flag tradeoffs explicitly.
