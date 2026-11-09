# Scope Changes — Cipher Pol Log

> Automatic log of all additions and changes made outside the original PRD scope.
> Entries are created by Cipher Pol during BUILD. Reviewed during REVIEW.

## Format

```markdown
### [YYYY-MM-DD] [Feature/File Name]
- **File:** [path to new file]
- **Classification:** INTEL | ALERT | INTERCEPT
- **Reason:** [why this was needed]
- **Requested by:** Stella | Agent
- **Reviewed:** no | yes
```

---

### 2026-11-09 stella-build description trimmed (266 → 235 chars)
- **File:** `skills/stella-build/SKILL.md` (+ mirror)
- **Classification:** INTEL
- **Reason:** The new `sync --check` lint enforces the ≤250-char description rule from v0.8.1. stella-build had grown to 266 in v0.11.0. Only the tail was shortened; the "Use when…" trigger phrases are unchanged. Not listed in mini-PRD `prd-hotfix-distribution.md`.
- **Requested by:** Agent
- **Reviewed:** yes — acknowledged by Stella in REVIEW 2026-11-09
