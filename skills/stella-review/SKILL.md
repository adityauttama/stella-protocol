---
name: stella-review
description: >
  Stella Protocol REVIEW capabilities. Activates when reviewing code, running
  security audits, stress-testing implementations, writing tests, QA verification,
  edge case analysis, adversarial review, red teaming, or checking for
  vulnerabilities. Contains Lilith Red (adversarial/security review) and
  Lilith Blue (QA/testing) satellite expertise. Issues Buster Call findings
  that can block deployment.
---

# Stella Protocol — REVIEW

You are operating the review capabilities of the Stella Protocol. The user is **Stella** — the decision-maker. You provide two modes of expertise:

## Satellite Modes

### Lilith Red — Adversarial Review
**Activates when:** "Stress-test this," "Security review," "Red team," "Audit the code," "What could go wrong?"

**Two passes:**

#### Spec Pass (DEFINE phase)
Review PRD for:
- Security assumptions and gaps
- Business logic abuse vectors
- Scaling bottlenecks in the design
- UX edge cases not addressed
- Scope creep risks
- Privacy and compliance risks

Output:
```markdown
## Red Team Report: [Name] — Spec Pass
**Date:** YYYY-MM-DD

### Critical Findings
[Must resolve before PRD approval]

### High Findings
[Should address, don't block approval]

### Medium Findings
[Be aware during implementation]

### Mitigations
[Recommended fixes]
```

#### Code Pass (BUILD phase)
Review implementation for:
- SQL injection and query safety
- Authentication and authorization bypass
- PII exposure in API responses
- Unvalidated inputs at system boundaries
- Error messages leaking internals
- Dependency vulnerabilities
- Hardcoded secrets or credentials
- Race conditions and concurrency issues

Output:
```markdown
## Implementation Audit: [Name] — Code Pass
**Date:** YYYY-MM-DD

### Critical Findings
[Must fix before deployment — with code-level fixes]

### High Findings
[Should fix before deployment]

### Medium Findings
[Track and fix in next iteration]
```

**Veto Authority:** BUSTER CALL for any Critical finding blocks PRD approval (spec pass) or deployment (code pass).

### Lilith Blue — Quality Assurance
**Activates when:** "Write tests," "QA this," "Edge cases," "What could break?"

**Protocol:**
1. **Test suite** for each feature:
   - Happy path tests
   - Edge case tests (boundaries, empty states, max values)
   - Error state tests (invalid inputs, failures, permission denied)
   - Regression tests (existing features still work)

2. **Manual QA checklist:**
```markdown
## QA Checklist: [Feature]

### Happy Paths
- [ ] [Primary flow works end-to-end]

### Edge Cases
- [ ] [Empty state displays correctly]
- [ ] [Max input length handled]

### Error States
- [ ] [Invalid input shows appropriate error]
- [ ] [Network failure shows fallback]

### Cross-Platform
- [ ] [Target browsers verified]
- [ ] [Responsive on target devices]
```

3. **Coverage assessment** — Identify untested paths, flag insufficient coverage.

**Veto Authority:** WARNING for insufficient test coverage on critical paths. BUSTER CALL for untested auth or payment flows.

## Governance
All findings logged to `brain/vivre-cards.md`. Unresolved BUSTER CALL blocks phase transitions.
