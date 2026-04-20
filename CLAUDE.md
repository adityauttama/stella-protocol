## Stella Protocol — Auto Session Hook

At the start of every conversation in this project:

1. Read `brain/log-pose.md` (if exists)
2. Read `brain/project-context.md` (if exists) — note tech stack + critical constraints
3. Read `brain/scope-changes.md` (if exists)
4. Check `brain/vivre-cards.md` for unresolved BUSTER CALL findings (Status: OPEN)
5. Output a status block (max 5 lines):

```
**[Project Name]** | Phase: [phase] | Track: [track]
Status: [1-line summary of current state]
Blockers: [none / list OPEN buster calls]
Scope changes: [N unreviewed / all reviewed]
Suggested next: [concrete action based on current state]
```

6. If there are OPEN BUSTER CALL blockers with CRITICAL/HIGH severity, flag them BEFORE doing anything else
7. If the user's request conflicts with current phase, note it but don't block — Stella decides
8. Respond in the language the user writes in (English or Bahasa Indonesia)

## Skill Layers

**Phase orchestrators** (user-facing slash commands):
- `stella-protocol` (IDEATE) · `stella-define` (DEFINE) · `stella-build` (BUILD) · `stella-review` (REVIEW) · `stella-close` (CLOSE)

**DEFINE/IDEATE satellite atomic** (invoked on-demand from orchestrators):
- `shaka-brief` — IMU 5-lensa ideation + Track Selection Gate · `shaka-prd` — Shaka PRD generation (Express/Guided) · `pythagoras-research` — architecture + research · `oda-design` — UX flows + design system

**Governance atomic** (cross-phase):
- `cipher-pol` — scope drift monitoring · `buster-call` — quality/security veto · `punk-records` — brain file update protocol

**Execution — delegated to [obra/superpowers](https://github.com/obra/superpowers)** (required dependency since v0.11.0):
- `superpowers:test-driven-development` — RED-GREEN-REFACTOR (replaces edison-tdd)
- `superpowers:verification-before-completion` — build/lint/test gate (replaces edison-verify)
- `superpowers:systematic-debugging` — 4-phase root-cause debugging (replaces edison-debug)
- `superpowers:writing-plans` — bite-sized task decomposition (replaces atlas-taskplan)
- `superpowers:dispatching-parallel-agents` — concurrent agent dispatch (replaces stella-parallel)
- `superpowers:writing-skills` — RED-GREEN-REFACTOR for SKILL.md authoring (replaces Stella's writing-skills)

Install superpowers: `/plugin install superpowers@claude-plugins-official`.

See each Stella skill's SKILL.md for full detail. Governance rules live in the atomic skills — invoke them directly rather than duplicating prose here.

## Governance Rules (Quick Reference)

- **Scope drift** (new page/route/endpoint/table/integration/feature not in PRD) → `cipher-pol` classifies (INTEL/ALERT/INTERCEPT), logs `brain/scope-changes.md`
- **Quality/security issue** → `buster-call` formats and logs `brain/vivre-cards.md`. BUSTER CALL severity blocks phase transitions.
- **Milestone reached** → `punk-records` updates `brain/log-pose.md`, `vivre-cards.md`, `architecture.md`. Vivre cards are append-only.
- Keep `brain/` as human-readable markdown — no YAML schemas or machine formats
