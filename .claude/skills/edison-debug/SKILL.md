---
name: edison-debug
description: Edison debug protocol. Use when hitting unexpected behavior, regressions, or bugs requiring root-cause analysis. Enforces 4-phase flow: Reproduce → Isolate → Hypothesize → Verify Fix.
---
<!-- Stella Protocol by Aditya Uttama | https://www.linkedin.com/in/adityauttama/ | https://github.com/adityauttama -->

# Edison Debug — Systematic Root Cause

## The Iron Law

**No fix merged without reproducing the bug first.**

If you cannot reproduce the failure deterministically, you do not yet understand it — and any "fix" is a guess. Stop and build a reproduction before changing code.

## When Edison Debug Activates

**Yes — use Debug for:**
- A test that was passing and is now failing
- A bug report from Stella or production
- Unexpected runtime behavior (wrong value, wrong state, silent failure)
- A regression after a refactor
- Flaky tests (intermittent failure is still a bug — never "just retry")
- Integration breakage (service A no longer talks to service B correctly)

**No — Debug doesn't fit for:**
- New feature work → use `edison-tdd` instead
- Known unsupported input → add validation, not a debug session
- Compile/syntax/import errors → fix the typo, no ceremony needed

## The 4 Phases

### 1. REPRODUCE — Build a deterministic failing case

1. Capture the exact conditions: input, environment, sequence of steps, data state.
2. Reduce to the smallest reproduction — strip everything that isn't required to trigger the bug.
3. Prefer an automated reproduction (a failing test) over a manual one. A failing test locks the bug and becomes the regression guard after the fix.
4. **Run it and see it fail.** "I believe this should fail" is not sufficient — observe the failure.

```
REPRODUCE — [Bug Name]
Reproduction: [path to failing test OR command + input]
Failure mode: [exact error/assertion/observed-vs-expected]
Run: [command]
Result: FAILED — [specific failure signal]
```

If you cannot reproduce, the bug investigation is **blocked**. Ask Stella for more context (logs, steps, data) rather than guessing.

### 2. ISOLATE — Narrow the search space

1. Bisect: halve the space between "known good" and "known bad" until you localize the fault.
2. Tools: `git bisect` for regressions, binary-search a config / input, comment-out / remove code paths, compare against a known-good baseline.
3. Stop when you have one function, one line, one config value, or one specific commit that owns the behavior.
4. Do not "fix while exploring" — isolation first, fix later.

```
ISOLATE — [Bug Name]
Method: [git bisect / input bisection / code bisection / ...]
Fault location: [file:line OR commit SHA OR config key]
Evidence: [what proved this is the source]
```

### 3. HYPOTHESIZE — Propose the root cause and predict

1. State the root cause in one sentence — the actual mechanism, not a symptom.
2. Predict: "If my hypothesis is correct, then X will be true." Pick a prediction the code/data can confirm (a log value, an intermediate state, the result of a probe).
3. Test the prediction **before** writing the fix. If the prediction fails, the hypothesis is wrong — go back to ISOLATE.
4. "Fix and see if it stops happening" is **not** a test of the hypothesis — it's a shotgun.

```
HYPOTHESIZE — [Bug Name]
Root cause: [one sentence — the mechanism]
Prediction: [what should be true if correct]
Probe: [how you checked — log, test, debugger, query]
Result: [CONFIRMED / REFUTED]
```

If refuted → return to ISOLATE with the new evidence.

### 4. VERIFY FIX — Apply, rerun, guard

1. Apply the minimum fix implied by the root cause.
2. Rerun the reproduction from phase 1 — must now pass.
3. Run the **full** test suite via `edison-verify` — no new failures anywhere.
4. Keep the reproduction as a regression test (add to the suite if it wasn't already there).
5. If the fix is in business logic, this step is also the GREEN of `edison-tdd` — the commit message should reference the bug and the test.

```
VERIFY FIX — [Bug Name]
Fix: [path + one-line summary of change]
Reproduction rerun: PASSED
edison-verify: PASSED (build + lint + test)
Regression guard: [path to the test that now locks this bug]
```

## Anti-Patterns

- ❌ Fixing before reproducing ("I think I know what's wrong")
- ❌ Multiple "fixes" in one commit — if one of three changes fixed it, you don't know which
- ❌ Treating flaky tests as "just retry" instead of a bug
- ❌ Skipping the prediction step and going straight from symptom to fix
- ❌ Removing a failing test instead of fixing the code under it
- ❌ Not adding the reproduction as a regression test after the fix

## Integration with Stella

- **Before** changing code to fix a bug, invoke this skill's REPRODUCE phase.
- **After** VERIFY FIX, `edison-verify` must PASS (build + lint + test) before commit.
- **Buster Call** (WARNING) if Edison applies a fix without a reproduction in place.
- **Punk Records** — significant bug fixes (production incidents, regressions that shipped to users) log a vivre-card entry: root cause + fix + regression guard.
- **Cipher Pol** — if the debug session reveals the bug stems from scope that shouldn't have shipped, log `brain/scope-changes.md` as INTERCEPT.

## Opt-in Policy (v0.7.0)

Debug is **available** as an atomic skill but not gate-enforced. Edison is expected to invoke it for any bug investigation; skipping for trivial fixes (typo, obvious null check) is fine. For anything non-trivial — reproduce first.
