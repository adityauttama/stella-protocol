# Vivre Cards — Decision Log

> Append-only. Never edit past entries. Each card points back to the moment a decision was made.

## Format

```markdown
### [YYYY-MM-DD] [Decision Title]
**Phase:** [current phase]
**Satellite:** [who raised/made this]
**Decision:** [what was decided]
**Rationale:** [why]
**Alternatives:** [what else was considered]
```

## Version Boundaries

When closing a version (during CLOSE phase), insert a version boundary:

```markdown
---
## === v[X.Y.Z] — [YYYY-MM-DD] — [version name] ===
### Summary: [one-line summary of key decisions this version]
### Decision count: [N]
---
```

Entries below a version boundary belong to that version. When the file exceeds 50 entries, archive closed versions to `brain/vivre-cards-archive.md` and keep only the current version's entries here.

---

_No decisions recorded yet. Entries will be appended as the project progresses._
