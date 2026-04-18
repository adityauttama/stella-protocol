<!-- Stella Protocol by Aditya Uttama | https://www.linkedin.com/in/adityauttama/ | https://github.com/adityauttama -->
---
name: cipher-pol
description: >
  Stella Protocol scope drift monitoring. Activates when agents are about to
  create a new page, route, API endpoint, database table, external integration,
  or user-facing feature during BUILD — especially anything not listed in the
  approved PRD. Classifies drift (INTEL / ALERT / INTERCEPT) and logs to
  brain/scope-changes.md. Use before silently expanding scope.
---

# Cipher Pol — Scope Drift Monitoring

Cipher Pol is Stella Protocol's scope governance. It monitors for additions **not specified in the approved PRD** (`brain/prd-*.md`) and logs them before the scope silently expands.

## When Cipher Pol Activates

**Before creating any of these** during BUILD or BUILD-adjacent work:
- New page or route not in PRD screen map / feature list
- New API endpoint not in PRD API contracts
- New database table/column not in PRD data model
- New external service integration not mentioned in PRD
- New user-facing feature or workflow not in PRD

## When Cipher Pol Does NOT Activate

- Component files that implement PRD-listed features (UI components, utilities, helpers)
- Configuration and setup files
- Test files, type definitions
- Refactoring existing code
- Internal implementation details that don't expand user-facing surface

**Rule of thumb:** if the file implements a feature that IS in the PRD, it is not drift. If it introduces functionality or surface area NOT in the PRD, it is drift.

## Protocol

**Step 1 — Classify** the drift:

- **INTEL** — Minor addition within the spirit of the PRD (e.g., adding an obvious helper route implied by the PRD). Log and continue.
- **ALERT** — Meaningful scope addition (e.g., new settings page not listed). Log, inform Stella, continue if approved.
- **INTERCEPT** — Significant new feature or architectural change (e.g., a whole new module). Log, **ask for explicit approval before proceeding**. If rejected, move to `brain/ideas.md` under "Parked" with reason.

**Step 2 — Output the Cipher Pol report** (visible block):

```
🔍 CIPHER POL [INTEL | ALERT | INTERCEPT]
Drift: [what is being added — e.g. "New route /forgot-password"]
PRD says: [what the approved scope specifies]
Gap: [the delta between approved and proposed]
Recommendation: [approve / reject / amend PRD]
```

**Step 3 — Log to `brain/scope-changes.md`** (mandatory, every severity):

```markdown
### [YYYY-MM-DD] [Feature/File Name]
- **File:** [path to new file]
- **Classification:** INTEL | ALERT | INTERCEPT
- **Reason:** [why this is needed]
- **Requested by:** Stella | Agent
- **Reviewed:** no
```

**Never silently expand scope.** Even INTEL must be logged.

## Integration with Other Skills

- `stella-build` — invokes Cipher Pol before feature implementation
- `stella-review` — reviews `brain/scope-changes.md` entries, marks `Reviewed: yes`
- `buster-call` — if drift is combined with security/quality risk, Buster Call layers on top
