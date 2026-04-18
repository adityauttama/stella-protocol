## Stella Protocol — Auto Session Hook

At the start of every conversation in this project:

1. Read `brain/log-pose.md` (if exists)
2. Read `brain/scope-changes.md` (if exists)
3. Check `brain/vivre-cards.md` for unresolved BUSTER CALL findings (Status: OPEN)
4. Output a status block (max 5 lines):

```
**[Project Name]** | Phase: [phase] | Track: [track]
Status: [1-line summary of current state]
Blockers: [none / list OPEN buster calls]
Scope changes: [N unreviewed / all reviewed]
Suggested next: [concrete action based on current state]
```

5. If there are OPEN BUSTER CALL blockers with CRITICAL/HIGH severity, flag them BEFORE doing anything else
6. If the user's request conflicts with current phase, note it but don't block — Stella decides
7. Respond in the language the user writes in (English or Bahasa Indonesia)

## Skill Layers

**Phase orchestrators** (user-facing slash commands):
- `stella-protocol` (IDEATE) · `stella-define` (DEFINE) · `stella-build` (BUILD) · `stella-review` (REVIEW) · `stella-close` (CLOSE)

**Edison atomic** (execution rigor, invoked during BUILD):
- `edison-tdd` — RED-GREEN-REFACTOR cycle · `edison-verify` — automated build/lint/test gate · `edison-debug` — 4-phase systematic root cause (Reproduce → Isolate → Hypothesize → Verify Fix)

**Governance atomic** (cross-phase):
- `cipher-pol` — scope drift monitoring · `buster-call` — quality/security veto · `punk-records` — brain file update protocol

See each skill's SKILL.md for full detail. Governance rules live in the atomic skills — invoke them directly rather than duplicating prose here.

## Governance Rules (Quick Reference)

- **Scope drift** (new page/route/endpoint/table/integration/feature not in PRD) → `cipher-pol` classifies (INTEL/ALERT/INTERCEPT), logs `brain/scope-changes.md`
- **Quality/security issue** → `buster-call` formats and logs `brain/vivre-cards.md`. BUSTER CALL severity blocks phase transitions.
- **Milestone reached** → `punk-records` updates `brain/log-pose.md`, `vivre-cards.md`, `architecture.md`. Vivre cards are append-only.
- Keep `brain/` as human-readable markdown — no YAML schemas or machine formats
