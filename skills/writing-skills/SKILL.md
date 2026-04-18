<!-- Stella Protocol by Aditya Uttama | https://www.linkedin.com/in/adityauttama/ | https://github.com/adityauttama -->
---
name: writing-skills
description: >
  Stella Protocol meta skill for authoring and improving AI skills. Activates
  when writing a new SKILL.md, editing an existing skill's description or body,
  debugging a skill that isn't triggering correctly, or improving how a skill
  handles edge cases. Applies RED-GREEN-REFACTOR to skill authoring: identify
  a concrete failure scenario first, make the minimal fix, then clean up.
  Iron Law: no skill change merged without a documented failure scenario it fixes.
---

# Writing Skills — TDD for Stella Skills

Inspired by `obra/superpowers/skills/writing-skills`. Adapted for Stella Protocol's skill layer.

## The Iron Law

**No skill change merged without a documented failure scenario it fixes.**

Skills are prompts. Prompts have failure modes. The same discipline that `edison-tdd` applies to code applies here: identify the failing case first, fix only that, then refactor.

## When This Skill Activates

**Yes — use Writing Skills for:**
- Authoring a new `SKILL.md` from scratch
- Fixing a skill that isn't triggering when it should (wrong `description` field)
- Fixing a skill that over-triggers (fires in contexts it shouldn't)
- Improving a skill's output format — it runs but the output is unclear or incomplete
- Reducing a skill's LOC without losing behavior

**No — Writing Skills doesn't fit for:**
- Phase orchestration decisions (use `stella-define` for PRD)
- Architecture decisions about which skills to create (use IDEATE phase)
- Bug fixes in CLI code (use `edison-debug`)

## The Cycle

### RED — Document the failing scenario

1. Describe the exact situation where the current skill fails:
   - **Trigger failure:** "When I say X, the skill doesn't activate"
   - **Output failure:** "The skill activates but produces output that misses Y"
   - **Over-trigger:** "The skill fires on Z when it shouldn't"
   - **Gap:** "The skill has no guidance for case W"

2. Capture the minimal example — the shortest prompt or context that reproduces the failure.

3. Confirm the failure is real, not imagined. Check the `description` field: does it cover the failing trigger? Check the skill body: does it have instructions for the failing case?

```
RED — [Skill Name]
Failure type: trigger / output / over-trigger / gap
Failing scenario: [exact prompt or context]
Expected behavior: [what should happen]
Actual behavior: [what happens instead]
Root cause: [which part of SKILL.md is wrong or missing]
```

### GREEN — Minimum fix

1. Change only what the RED scenario requires — `description` field, one instruction block, one format example.
2. Do NOT refactor unrelated sections. Do NOT add new features beyond the failing case.
3. Verify the fix conceptually: re-read the `description` and body with the RED scenario in mind. Does the fix clearly handle it?

```
GREEN — [Skill Name]
Changed: [description field / section name / line range]
Fix: [one-sentence description of what was changed]
RED scenario now handled: yes / no (if no, revise)
```

### REFACTOR — Improve without regressing

1. After GREEN is confirmed, look for: redundant prose, unclear instructions, inconsistent format blocks, LOC that can be trimmed without losing behavior.
2. For each change, re-run ALL prior RED scenarios mentally — nothing that was working should break.
3. If trimming a section introduces a gap, add it back. Clarity beats brevity.

```
REFACTOR — [Skill Name]
Changes: [bullet list of what was cleaned up]
Prior RED scenarios still covered: yes / no (if no, revert that change)
Final LOC: [N]
```

### COMMIT

One RED-GREEN-REFACTOR cycle = one vivre-card entry (document the failure scenario + fix). This builds a regression log for the skill. Future skill changes can check prior RED scenarios before merging.

## Testing Activation

To test whether a skill's `description` field correctly triggers:

1. Copy the description field content
2. Mentally place it in: "This skill activates when [description]"
3. Try your failing scenario: does the description cover it?
4. Try a non-target scenario: does the description correctly NOT cover it?

Claude Code uses the `description` field for auto-trigger — it must be specific enough to fire on real use cases and narrow enough to not over-trigger.

## Anti-Patterns

- ❌ Editing a skill because "it could be clearer" without a concrete failing scenario
- ❌ Adding guidance for every possible edge case (bloat) — only add what RED scenarios require
- ❌ Refactoring before GREEN — don't clean up a broken thing
- ❌ Removing format blocks because they look verbose — agents need the exact format, prose alternatives don't work
- ❌ "I'll test it later when I actually use it" — write the RED scenario first

## Integration with Stella

- Use `punk-records` to log skill changes in `brain/vivre-cards.md` — RED scenario + fix = one vivre card.
- If a skill change affects a Layer 1 phase orchestrator, run the change through `stella-review` (at least Lilith Blue checkpoint preview) before merging.
- `buster-call` (WARNING) if a skill change removes an EXIT GATE or governance pointer without documented rationale.

## Scope

Writing Skills is a **meta skill** — it applies to all skill layers:
- Layer 1 phase orchestrators (stella-build, stella-review, etc.)
- Layer 2 Edison atomic skills
- Layer 3 governance atomic skills
- Layer 4 this skill itself (yes, apply RED-GREEN-REFACTOR to writing-skills too)
