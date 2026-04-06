# Cipher Pol — Scope Enforcement Protocol

> Silent watchers that ensure no one drifts from the mission.

## Purpose

Cipher Pol is the Stella Protocol's scope enforcement mechanism. It continuously monitors all satellite work against the approved PRD (Road Poneglyph) to detect and flag scope drift.

Unlike a review you invoke, Cipher Pol is **always active**. Every satellite that produces or modifies artifacts checks its work against the approved scope.

---

## How It Works

1. Every satellite reads the active PRD before beginning work
2. As work progresses, the satellite continuously compares output against PRD scope
3. When drift is detected, it is classified by severity and flagged
4. Stella decides whether to approve the drift, reject it, or amend the PRD

---

## Severity Levels

### INTEL
- **Drift:** Minor. Within the spirit of the PRD but not explicitly specified.
- **Action:** Noted in `brain/log-pose.md` under Cipher Pol Report. Work continues.
- **Example:** Adding a loading spinner not mentioned in the PRD.

### ALERT
- **Drift:** Moderate. A meaningful addition or change to the approved scope.
- **Action:** Flagged to Stella. Work continues only if Stella approves.
- **Stella response:** Approve (continue), reject (revert), or amend PRD.
- **Example:** Adding an export feature not in the PRD but related to existing functionality.

### INTERCEPT
- **Drift:** Significant. A new feature, major UX change, or architectural shift.
- **Action:** Blocked. Cannot proceed without PRD amendment.
- **Stella response:** Must create a PRD amendment before work continues.
- **Example:** Adding a user roles system when the PRD specifies single-user only.

---

## Format

When flagging scope drift:

```
🔍 CIPHER POL [SEVERITY]
Drift: [what's being added/changed]
PRD says: [what the approved scope specifies]
Gap: [the delta between approved and proposed]
Recommendation: [approve / reject / amend PRD]
```

---

## PRD Amendments

When scope drift is approved, it must be formalized:

1. Append an amendment to the existing PRD with date, rationale, and change description
2. Log the amendment decision in `brain/vivre-cards.md`
3. Update `brain/log-pose.md` to reflect the expanded scope

---

## The 30% Rule

When accumulated amendments represent more than ~30% new surface area beyond the original PRD, Cipher Pol recommends returning to the DEFINE phase for a full PRD v2. This prevents scope from growing unbounded through incremental drift.

---

## When Cipher Pol Is Not Active

- **IDEATE phase** — No PRD exists yet. Scope enforcement doesn't apply.
- **East Blue track before PRD** — If working from a Mini-PRD, Cipher Pol monitors against that.
- **Explicit exploration** — If Stella says "explore freely," Cipher Pol logs but does not flag.
