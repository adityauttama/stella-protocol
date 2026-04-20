---
name: stella-parallel
description: Parallel agent dispatch for independent PRD features. Use when ≥2 features have no shared files or sequential deps. Dispatches concurrent subagents, parent aggregates results.
---
<!-- Stella Protocol by Aditya Uttama | https://www.linkedin.com/in/adityauttama/ | https://github.com/adityauttama -->

# Stella Parallel — Concurrent Feature Dispatch

Operating **stella-parallel**. User is **Stella**. Respond in the language Stella uses.

## When to Use

Trigger when ALL of these are true:
- PRD has ≥2 features to implement
- Features have no shared files (check `brain/taskplan-[name].md` Shared-File Conflicts section, or assess manually)
- Features have no sequential dependency (Feature B does not need Feature A's output to exist)

**Default to sequential** (`stella-build` subagent-per-feature) when independence is unclear.

## Safety Rule — Shared Files

Before dispatching, identify all files each feature will touch. If two features touch the same file → **do not dispatch those features concurrently**. Put the shared-file feature first (sequential), then dispatch the rest in parallel after.

## Protocol

### Step 1 — Independence Check

Read `brain/taskplan-[prd-name].md` if it exists. Otherwise, read `brain/prd-[name].md` and assess manually.

For each feature pair, verify:
- [ ] No overlapping file paths
- [ ] No output-input dependency (B doesn't consume A's created types/schemas)

Output the independence assessment:
```
Independence Check — [PRD Name]
Feature A: [name] — files: [list]
Feature B: [name] — files: [list]
Shared files: none | [list conflicts]
Sequential deps: none | [describe]
Verdict: SAFE TO PARALLELIZE | SEQUENTIAL REQUIRED ([reason])
```

### Step 2 — Write Parallel Briefs

For each independent feature, write a self-contained brief:

```markdown
## Feature Brief: [Feature Name]

**Context:** [1-2 sentences — what this feature is and why it matters in the PRD]
**Acceptance Criteria:** [bulleted list from PRD, verbatim]
**Files to create/modify:** [exact paths from taskplan or your assessment]
**Existing patterns to reuse:** [helpers/utils/components with paths, from architecture.md]
**Out of scope:** [explicit exclusions — list features NOT in this brief]

**Execution requirements:**
- Invoke `edison-tdd` if logic is testable
- Invoke `edison-verify` before returning
- If unexpected behavior surfaces, invoke `edison-debug`
- Invoke `cipher-pol` if about to create anything NOT in Acceptance Criteria
- Return a summary: files changed, tests added, any waivers logged

**Do NOT:** update brain/ files (parent handles), suggest phase transitions, commit, touch files in other feature briefs.
```

### Step 3 — Dispatch Concurrently

Send **all independent feature briefs in a single message** with multiple `Agent` tool calls. This is what makes them concurrent — separate messages are sequential.

Parent retains during dispatch: `brain/log-pose.md`, `brain/scope-changes.md`, PRD index, Cipher Pol/Buster Call state, Punk Records writes.

### Step 4 — Aggregate Results

Wait for all subagents to return. For each returned summary, run the Feature Completion Protocol:

1. **Punk Records Checkpoint** — update `brain/log-pose.md` + `brain/vivre-cards.md` with what was completed
2. **Conflict check** — if two subagents independently modified the same file despite the independence check, flag for manual merge
3. **Review Pause** — after all features aggregated, output:

```
PARALLEL BUILD COMPLETE — [N] features
Features shipped: [list]
Files changed: [total count]
Verify: PASS | FAIL per feature (see per-feature reports)
Conflicts: none | [list files needing manual review]

Mau review sekarang atau ada feature lain yang mau dikerjain dulu?
```

## Relationship to Subagent-per-Feature

| | Subagent-per-Feature | stella-parallel |
|---|---|---|
| Dispatch | Sequential, one at a time | Concurrent, all at once |
| Use when | Any BUILD with significant features | ≥2 features with proven independence |
| Safety | N/A | Requires shared-file check first |

Both patterns: parent retains governance state, subagents execute, parent aggregates.

## Integration

- Invoked from `stella-build` when concurrent dispatch is appropriate
- Reads `brain/taskplan-[name].md` for independence data (falls back to manual assessment)
- Feature Completion Protocol same as stella-build subagent-per-feature

## Governance

Log parallel dispatch decision (why concurrent was chosen over sequential) via `punk-records`. Any mid-dispatch scope changes → `cipher-pol` before dispatching affected feature.
