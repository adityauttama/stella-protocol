# Vivre Cards — Decision Log

> Append-only. Never edit past entries. Each card points back to the moment a decision was made.
> _Previous versions archived to [`brain/vivre-cards-archive.md`](vivre-cards-archive.md)_

## Format

```markdown
### [YYYY-MM-DD] [Decision Title]
**Phase:** [current phase]
**Satellite:** [who raised/made this]
**Decision:** [what was decided]
**Rationale:** [why]
**Alternatives:** [what else was considered]
```

---

### 2026-11-09 OPEN (carried over from v0.12.1): Plugin install path unverified
**Phase:** CLOSED v0.12.1 → next version
**Satellite:** Lilith Blue
**Severity:** CONCERN (manual test, not a blocker)
**Decision:** M2 from the v0.12.1 REVIEW (archived in `vivre-cards-archive.md`): verify in Claude Code that `/plugin marketplace add adityauttama/stella-protocol` → `/plugin install stella-protocol@stella-protocol` lists all 12 skills. This cannot be run in a cloud session. Steps are in `brain/test-plan.md` (v0.12.1).
**Rationale:** The marketplace now uses a generated 12-entry `skills` array; how Claude Code auto-discovers skills for a `source: "./"` plugin is Unknown.
**Alternatives:** Switch to a `"skills": "./skills"` folder pointer (only if the manual test fails).
**Status:** OPEN
