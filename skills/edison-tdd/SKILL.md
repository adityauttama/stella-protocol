---
name: edison-tdd
description: Edison TDD protocol. Use before implementing business logic, API handlers, validators, or any testable feature. Enforces RED-GREEN-REFACTOR: failing test first, minimal code, then refactor.
---
<!-- Stella Protocol by Aditya Uttama | https://www.linkedin.com/in/adityauttama/ | https://github.com/adityauttama -->

# Edison TDD — Red-Green-Refactor

## The Iron Law

**No production code without a failing test first.**

This is not a suggestion. If you are about to write implementation code and no failing test exists that would validate it, **STOP and write the test first.**

## When Edison TDD Activates

**Yes — use TDD for:**
- Business logic functions (pricing, validation, scoring, transformation)
- API handlers with defined input/output contracts
- State machines and workflow orchestrators
- Data parsers, formatters, serializers
- Pure functions with testable return values
- Bug fixes (write the failing test that reproduces the bug first)

**No — TDD doesn't fit cleanly for:**
- Pure UI rendering where visual correctness is the spec
- Exploratory spikes meant to be thrown away
- One-off scripts and migrations
- Infrastructure config

For those, use `edison-verify` at the end instead.

## The Cycle

### RED — Write a failing test

1. State the behavior in plain language (what should the code do?)
2. Write the test — it will fail because the code doesn't exist yet
3. **Run the test and see it fail.** Do not skip this step. "I know it'll fail" is not sufficient.
4. Confirm the failure is for the right reason (not a syntax error, not a missing import — an actual assertion failure or missing function)

```
RED — [Feature Name]
Test file: [path]
Behavior under test: [one sentence]
Run: [command]
Result: FAILED — [specific assertion that failed, e.g. "expected calculateTax(100, 'CA') to return 8.75, got undefined"]
```

### GREEN — Minimum code to pass

1. Write the least code that makes the test pass
2. Do not add unrelated features, do not over-abstract, do not handle edge cases not in the test
3. Run the test, see it pass

```
GREEN — [Feature Name]
Implementation: [path]
Run: [command]
Result: PASSED
```

### REFACTOR — Improve structure, tests still green

1. Improve naming, extract helpers, remove duplication
2. Run the full test suite after each change — must stay green
3. If a refactor breaks something, revert and try smaller

```
REFACTOR — [Feature Name]
Changes: [what was cleaned up]
Run: [command]
Result: PASSED (N tests)
```

### COMMIT

One RED-GREEN-REFACTOR cycle = one commit. Commit message should reference the behavior tested. This keeps history readable and enables clean reverts.

## Anti-Patterns

- ❌ Writing the implementation first, then adding tests that happen to pass
- ❌ Writing tests that don't actually fail before implementation
- ❌ Skipping the RED run because "obviously it'll fail"
- ❌ Adding 5 features in GREEN and writing tests for 2 of them
- ❌ Deleting tests that fail during REFACTOR instead of fixing the regression
- ❌ "I'll add tests at the end" — at the end, the tests validate what was written, not what was needed

## Integration with Stella

- **Before** writing implementation in BUILD, invoke this skill's RED step
- **After** GREEN, invoke `edison-verify` to run the full project suite
- **Buster Call** (WARNING) if Edison proceeds past RED without seeing the test fail for the right reason
- **Punk Records** — TDD adoption is a decision worth logging in vivre-cards.md per feature (RED-GREEN-REFACTOR vs rationale for skipping)

## Opt-in Policy (v0.6.0)

TDD is **available** in Stella v0.6.0 — orchestrator suggests it but does not force. Stella decides per feature. Future version may enforce mandatory for business-logic features once baseline is established.
