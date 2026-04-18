<!-- Stella Protocol by Aditya Uttama | https://www.linkedin.com/in/adityauttama/ | https://github.com/adityauttama -->
---
name: buster-call
description: >
  Stella Protocol quality and security veto. Activates when a satellite
  encounters a vulnerability, data integrity risk, or critical quality issue —
  unvalidated input, missing auth check, hardcoded secret, race condition, PII
  leak, requirements contradiction, untested critical path. Emits formatted
  block and logs to brain/vivre-cards.md. BUSTER CALL severity blocks phase
  transitions.
---

# Buster Call — Quality & Security Veto

Buster Call is Stella Protocol's formal mechanism for raising quality or security concerns. It forces visibility: a concern is never "just mentioned" — it is formatted, logged, and tracked.

## Severity Levels

| Severity | Action | Blocks? |
|---|---|---|
| **CONCERN** | Advisory. Inform Stella, log if critical-adjacent. | No |
| **WARNING** | Strong advisory. Log to vivre-cards.md. Stella decides. | No |
| **BUSTER CALL** | Veto. Log to vivre-cards.md. **Refuse to proceed** until Stella resolves or overrides. | Yes |

Only **BUSTER CALL** severity blocks phase transitions. CONCERN and WARNING inform Stella but don't stop work.

## Automatic Triggers

Satellites MUST issue at minimum **CONCERN** when encountering:

**Security / Data Integrity:**
- Unvalidated user input at system boundaries
- Missing error handling on async operations
- Hardcoded values that should be environment variables
- SQL or query injection risks
- Auth/authorization bypass possibilities
- PII exposure in API responses or logs
- Race conditions in critical flows

**Spec Quality (during DEFINE):**
- Requirements contradict each other
- Scope exceeds the selected track
- Critical open questions unresolved
- Architecture has fundamental flaws

**Test Coverage (during REVIEW):**
- Untested auth or payment flows → **BUSTER CALL**
- Insufficient test coverage on critical paths → **WARNING**

Escalate to **WARNING** or **BUSTER CALL** for critical issues.

## Mandatory Format

Every Buster Call at any severity MUST use this block:

```
⚠️ [SEVERITY] [DEMO-OK | MUST-FIX] — [SATELLITE NAME]
Issue: [specific problem]
Impact: [what breaks if we proceed]
Recommendation: [what to do instead]
Status: Awaiting Stella's decision.
```

The `[DEMO-OK | MUST-FIX]` tag applies when `quality-bar: demo` is set in `brain/log-pose.md`. In demo/prototype mode, only MUST-FIX items block — cosmetic, performance, hardening findings are logged but don't block.

## Mandatory Logging

Every Buster Call (any severity) MUST be logged to `brain/vivre-cards.md` immediately — not at session end, not "later." Use the standard vivre card format and include:

- Satellite who raised it
- Severity
- Resolution status (OPEN | RESOLVED | OVERRIDDEN)

When resolved, append a NEW vivre card with Status: RESOLVED. Never edit the original (append-only).

## Integration with Other Skills

- Every satellite (Edison, Lilith Red, Lilith Blue, Pythagoras, Shaka, etc.) can issue a Buster Call
- `cipher-pol` — scope drift + security risk → Buster Call layers on top of Cipher Pol report
- `punk-records` — logs Buster Call entries to vivre-cards.md
- Orchestrator phase skills reference this skill for format + triggers — they don't redefine it
