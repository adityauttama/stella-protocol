# Buster Call — Veto Protocol

> The power to stop everything when something is critically wrong.

## Purpose

Buster Call is the Stella Protocol's veto mechanism. Any satellite can issue a Buster Call when it identifies an issue that could compromise the project's integrity, security, or viability.

Unlike optional review tools, Buster Call is **always active**. Every satellite has the authority and responsibility to flag critical issues.

---

## Severity Levels

### CONCERN
- **Impact:** Low. Something worth noting but not blocking.
- **Action:** Log to `brain/vivre-cards.md`. Work continues.
- **Example:** A dependency has a newer major version available.

### WARNING
- **Impact:** Medium. A real issue that Stella should weigh in on.
- **Action:** Flag to Stella with recommendation. Work continues pending response.
- **Stella response:** Acknowledge, adjust, or dismiss with reasoning.
- **Example:** The proposed data model doesn't account for a likely future requirement.

### BUSTER CALL
- **Impact:** Critical. Proceeding would cause serious harm.
- **Action:** Work stops immediately. Satellite refuses to proceed.
- **Stella response required:** Must resolve, adjust approach, or explicitly override.
- **Example:** SQL injection vulnerability in production code. Auth bypass in API. PRD contradicts legal requirements.

---

## Format

When issuing a Buster Call at any severity:

```
⚠️ [SEVERITY] — [SATELLITE NAME]
Issue: [specific problem identified]
Impact: [what breaks or degrades if we proceed]
Recommendation: [what to do instead]
Status: Awaiting Stella's decision.
```

---

## Override

Stella can override any Buster Call, including BUSTER CALL severity:

```
Override — [reason for proceeding despite the finding]
```

Overrides are logged to `brain/vivre-cards.md` with timestamp and reasoning. Satellites respect the override and proceed.

---

## Who Can Issue

Every satellite has Buster Call authority. The most common issuers:

- **Lilith Red** — Security vulnerabilities, abuse vectors, privacy risks
- **Shaka** — Scope contradictions, requirement conflicts
- **Pythagoras** — Architecture problems, scaling bottlenecks
- **Lilith Blue** — Test coverage gaps, untestable code
- **Edison** — Implementation impossibilities, technical debt traps

---

## Automatic Trigger Rules

Satellites MUST issue Buster Call at minimum CONCERN severity when encountering:

| Trigger | Minimum Severity | Common Issuer |
|---------|-----------------|---------------|
| Unvalidated user input at system boundaries | CONCERN | Edison |
| Missing error handling on async operations | CONCERN | Edison |
| Hardcoded values that should be env vars | CONCERN | Edison |
| SQL/query injection risk | WARNING | Edison, Lilith Red |
| Auth/authorization bypass possibility | WARNING | Lilith Red |
| PII exposure in API responses | WARNING | Lilith Red |
| No tests on auth or payment flows | WARNING | Lilith Blue |
| Security vulnerability in production code | BUSTER CALL | Lilith Red |
| Data integrity risk | BUSTER CALL | Edison |

These triggers are not optional. Satellites must not ignore these patterns even under time pressure.

---

## Logging — MANDATORY

**Every Buster Call at any severity MUST be logged to `brain/vivre-cards.md` immediately.** Not at session end, not "later," not "when we get to it." The moment a Buster Call is issued, it gets a vivre card entry.

Format for the vivre card:
```markdown
### [YYYY-MM-DD] Buster Call: [Issue Title]
**Phase:** [current phase]
**Satellite:** [who issued]
**Severity:** [CONCERN / WARNING / BUSTER CALL]
**Issue:** [what was found]
**Resolution:** [pending / fixed / overridden — with detail]
```

---

## Phase Gates

Buster Call status is checked at every phase transition. The orchestrator will not approve a phase transition if any unresolved BUSTER CALL exists. WARNINGS and CONCERNS do not block transitions but are surfaced for awareness.
