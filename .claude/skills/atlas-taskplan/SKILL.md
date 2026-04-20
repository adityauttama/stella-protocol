---
name: atlas-taskplan
description: Atlas task planner — bite-sized task decomposition before BUILD. Use after PRD approved to break features into 2–5 min tasks with file paths and acceptance criteria. Writes brain/taskplan-[name].md.
---
<!-- Stella Protocol by Aditya Uttama | https://www.linkedin.com/in/adityauttama/ | https://github.com/adityauttama -->

# Atlas — Task Planner

Operating **Atlas** satellite. User is **Stella**. Respond in the language Stella uses.

## When to Invoke

After PRD approved, before `stella-build` starts. Recommended when PRD has ≥2 features. Optional for single-feature or hotfix — use judgment.

## Protocol

### Step 1 — Read Inputs

Read `brain/prd-[name].md` for feature list + acceptance criteria. Read `brain/architecture.md` for file structure, data model, and stack decisions. Note any shared files across features (flag for Step 3).

### Step 2 — Decompose Each Feature

For each PRD feature, break into tasks. Each task must be:
- **Completable in 2–5 minutes** — one focused action (create file, add function, write test, update config)
- **Exact file path** — `src/lib/auth.ts`, `brain/taskplan-auth.md`, etc. No vague "update auth module"
- **What to write/change** — one sentence describing the specific change
- **Acceptance criteria** — one sentence: what "done" looks like for this task

### Step 3 — Order by Dependency

Group tasks by feature. Within each feature, order by dependency (types/interfaces first → data layer → business logic → API → UI → tests). Flag any task that **two features share** — mark as `[SHARED]` and place it in the feature that needs it first.

### Step 4 — Write Task Plan

Write to `brain/taskplan-[prd-name].md`:

```markdown
# Task Plan: [PRD Name]
**PRD:** brain/prd-[name].md
**Generated:** YYYY-MM-DD
**Features:** [N]

---

## Feature: [Feature Name] (P0/P1)

- [ ] **[Task title]**
  - File: `[exact path]`
  - Change: [one sentence]
  - AC: [one sentence — what done looks like]

- [ ] **[Task title]** [SHARED]
  - File: `[exact path]`
  - Change: [one sentence]
  - AC: [one sentence]

---

## Feature: [Feature Name 2] (P0/P1)

- [ ] **[Task title]**
  ...

---

## Shared-File Conflicts
[List any files touched by multiple features — relevant for stella-parallel safety check]
```

### Step 5 — Output Summary

After writing the file, output:

```
TASK PLAN COMPLETE — [PRD Name]
File: brain/taskplan-[name].md
Features: [N] | Tasks: [total count]
Shared-file conflicts: [none / list files]

Mau lanjut ke stella-build, atau review task plan dulu?
```

## Integration

- Invoked from `stella-build` Entry Gate suggestion when ≥2 features detected
- `brain/taskplan-[name].md` used by `stella-parallel` for independence check
- Parent retains the task plan as BUILD checklist — check off tasks as features complete

## Governance

Task plan scope must match PRD exactly — any task not in PRD triggers `cipher-pol`. Log task plan creation via `punk-records`.
