# East Blue — Lightweight Track

> The calm starting sea. For work that needs speed over ceremony.

## When to Use
- Small features or experiments
- Estimated at <1 week of execution
- Low architectural complexity
- Building on existing foundations

## Phase Flow

```
IDEATE → BUILD → (optional) CLOSE
```

Skips the full DEFINE phase. CLOSE is optional for small features.

## Phase Details

### Phase 0: IDEATE
- **Satellite:** IMU
- **Output:** Idea Brief with Mini-PRD section
- **Gate:** Stella approves Idea Brief

### Mini-PRD Format

Appended to the Idea Brief:

```markdown
### Mini-PRD (East Blue Track)
**Features:** [bulleted, prioritized]
**Data Model:** [if applicable — changes to existing model]
**Acceptance Criteria:** [what "done" looks like]
```

The Mini-PRD is the scope reference for Cipher Pol on this track.

### Phase 2: BUILD
- **Satellites:** Edison + Lilith Blue
- **No separate architecture or UX phase** — Edison makes pragmatic decisions within existing patterns
- **Governance still applies:** Cipher Pol monitors against Mini-PRD, Buster Call is still active
- **Output:** Working feature, tested

### Phase 3: CLOSE (Optional)
- For features that need documentation or announcement
- Skip for internal improvements or experiments

## Escalation

If during BUILD, Edison or any satellite determines the work is more complex than expected:
1. Issue a WARNING-level Buster Call
2. Recommend switching to Grand Line track
3. Stella decides whether to switch or continue

## What East Blue Does NOT Skip
- Governance (Buster Call, Cipher Pol)
- QA (Lilith Blue still tests)
- Punk Records updates (log-pose.md must be current)
