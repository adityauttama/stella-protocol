<!-- Stella Protocol by Aditya Uttama | https://www.linkedin.com/in/adityauttama/ | https://github.com/adityauttama -->
---
name: edison-verify
description: >
  Edison's automated verification gate. Activates before a feature is declared
  complete and at the BUILD EXIT GATE. Detects and runs the project's build,
  lint, and test commands, then emits a structured pass/fail report. Blocks
  EXIT GATE until all configured checks pass (or Stella logs a waiver). Use
  instead of claiming "it works" without evidence.
---

# Edison Verify — Automated Verification

Inspired by `obra/superpowers/skills/verification-before-completion`. Claims without verification are not evidence.

## When Edison Verify Activates

1. **Before marking a feature complete** — Edison runs verify to confirm no regressions
2. **At BUILD EXIT GATE** — mandatory pass before phase transition to REVIEW
3. **Before any pre-flight or deployment step** — verify precedes Atlas pre-flight

## Protocol

### Step 1 — Detect Commands

Read `package.json` `scripts` field (Node projects). Look for, in order of preference:

| Check | Commands to try (first match wins) |
|---|---|
| **Build** | `build`, `compile`, `tsc` |
| **Lint** | `lint`, `eslint`, `check` |
| **Typecheck** | `typecheck`, `type-check`, `tsc --noEmit` |
| **Test** | `test`, `test:unit`, `jest`, `vitest` |

For non-Node projects (Python, Go, Rust, etc.), ask Stella to configure or use project conventions (`pytest`, `go test ./...`, `cargo test`).

If no matching command is found, **ask Stella** — do not skip silently.

### Step 2 — Run Checks

Run each detected command. Capture:
- Exit code
- Time elapsed
- First 20 lines of stderr if fail

Do not run commands in the background for verify — the result must be deterministic before reporting.

### Step 3 — Emit Report

```
🔧 EDISON VERIFY — [Feature / EXIT GATE]
Build:      PASS | FAIL | SKIPPED (not configured)
Lint:       PASS | FAIL | SKIPPED
Typecheck:  PASS | FAIL | SKIPPED
Tests:      PASS | FAIL | SKIPPED  (N passed, M failed)

Overall: PASS | FAIL

[If FAIL, list first failure per check with file:line and 3-line excerpt]
```

## Behavior on Failure

- **PASS all** — report, continue.
- **Any FAIL** — output report. **Block** EXIT GATE. Propose fix:
  1. Show the failing output
  2. Suggest the likely fix
  3. Ask Stella: "Fix sekarang atau log waiver?"
- **Waiver** — if Stella chooses to proceed with a failing check (e.g., known flaky test), log to `brain/vivre-cards.md` with rationale and link the waiver to the EXIT GATE entry. A waiver is a decision, not a skip.

## What Verify Does NOT Do

- Does not replace Lilith Red / Lilith Blue code review (those are separate semantic audits)
- Does not run `npm audit` — that's Atlas pre-flight
- Does not deploy or push — verify is local-only
- Does not auto-fix lint errors — surface them, let Stella decide

## Integration with Stella

- `stella-build` — runs verify at EXIT GATE (mandatory for phase transition)
- `edison-tdd` — TDD cycles invoke verify after GREEN and after REFACTOR
- `buster-call` — a FAIL result can trigger a WARNING or BUSTER CALL depending on severity of the failure (e.g., security-related test failure = BUSTER CALL)
- `punk-records` — waivers logged as decisions in vivre-cards.md

## Example Waiver Entry

```markdown
### 2026-04-18 Waiver: flaky integration test
**Phase:** BUILD
**Satellite:** Edison
**Decision:** Ship with `tests/integration/external-api.spec.ts` skipped — known third-party rate-limit flakiness.
**Rationale:** Blocking deploy on third-party flake is worse UX than moving forward. Test re-enabled in v0.6.1 once mock harness ships.
**Alternatives:** Wait for mock harness (rejected — delays ship by 2 weeks).
```
