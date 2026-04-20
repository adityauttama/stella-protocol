---
name: punk-records
description: Punk Records — brain file update protocol. Use after completing a feature, making a key decision, or closing a version. Updates log-pose.md, vivre-cards.md (append-only), and architecture.md.
---
<!-- Stella Protocol by Aditya Uttama | https://www.linkedin.com/in/adityauttama/ | https://github.com/adityauttama -->

# Punk Records — Brain File Update Protocol

Punk Records is Stella Protocol's source of truth. Four markdown files in `brain/` track everything:

| File | Purpose | Update Rule |
|---|---|---|
| `log-pose.md` | Current phase, active work, status | Overwrite — keep current |
| `vivre-cards.md` | Decision history | **Append-only**, never edit past entries |
| `architecture.md` | Architecture decisions and stack | Update when arch changes |
| `scope-changes.md` | Cipher Pol drift log | Append during BUILD, mark reviewed during REVIEW |

## When to Update

**After each significant feature in BUILD** — not at session end. Output this block:

```
PUNK RECORDS CHECKPOINT — [Feature Name]
Updated: brain/log-pose.md — [one-line summary of what changed]
Updated: brain/vivre-cards.md — [yes/no, what decision if yes]
Updated: brain/architecture.md — [yes/no, what changed if yes]
```

**After a Buster Call or Cipher Pol event** — log immediately to `vivre-cards.md` or `scope-changes.md`.

**At phase transitions** — update `log-pose.md` `phase` field.

**At CLOSE** — insert version boundary in `vivre-cards.md`, sync `architecture.md` to reality.

## Vivre Card Format (append-only)

```markdown
### [YYYY-MM-DD] [Decision Title]
**Phase:** [current phase]
**Satellite:** [who raised/made this]
**Decision:** [what was decided]
**Rationale:** [why]
**Alternatives:** [what else was considered]
```

## Superseded Pattern

When a prior decision was reversed:
- Do NOT edit the original entry
- Append a NEW entry with `**Supersedes:** [date] [original title]`
- Explain what changed and why

## Version Boundary (at CLOSE)

```markdown
---
## === v[X.Y.Z] — [YYYY-MM-DD] — [version name] ===
### Summary: [one-line summary of key decisions this version]
### Decision count: [N entries in this version]
---
```

## Archiving

If `vivre-cards.md` has >50 total entries:
1. Move entries from closed versions (below older boundaries) to `brain/vivre-cards-archive.md`
2. Keep only current version entries in main file
3. Add at top of main file: `**Archive:** See vivre-cards-archive.md for previous versions.`

## log-pose.md Frontmatter Contract

```yaml
---
project: "[name]"
phase: ideate | define | build | review | close | closed
track: east-blue | grand-line
quality-bar: demo | production
last-updated: YYYY-MM-DD
---
```

All fields required. `quality-bar` governs how Lilith Red handles findings (see `buster-call` skill).

## Integration with Other Skills

- `stella-build` — invokes Punk Records Checkpoint after each significant feature
- `stella-close` — invokes version boundary + archiving logic
- `buster-call` — writes Buster Call entries to vivre-cards.md via this protocol
- `cipher-pol` — writes drift entries to scope-changes.md via this protocol
