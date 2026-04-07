<!-- Stella Protocol by Aditya Uttama | https://www.linkedin.com/in/adityauttama/ | https://github.com/adityauttama -->

# Grand Line — Full Track

> The great route. For projects that deserve the full journey.

## When to Use
- New projects
- Features estimated at >1 week of execution
- Projects with significant architectural decisions
- Products that will face real users

## Phase Flow

```
IDEATE → DEFINE → BUILD → ITERATE → CLOSE
```

All phases run in order. No skipping.

## Phase Details

### Phase 0: IDEATE
- **Satellite:** IMU
- **Output:** Idea Brief
- **Gate:** Stella approves Idea Brief

### Phase 1: DEFINE
- **Satellites (in order):**
  1. Pythagoras (Research Mode) — Research Brief
  2. Shaka — PRD
  3. ODA — UX Flow
  4. Pythagoras (Architecture Mode) — Architecture Decision
  5. Lilith Red (Spec Pass) — Red Team Report
- **Output:** Approved PRD + Architecture + UX + Red Team clearance
- **Gate:** Stella approves PRD AND Lilith Red clears it (no unresolved Critical findings)

### Phase 2: BUILD
- **Satellites:**
  - Edison — Implementation
  - Lilith Blue — QA (after each feature)
  - Lilith Red (Code Pass) — Implementation audit (after all P0 features)
  - Atlas — Deployment
- **Output:** Working product with all P0 features shipped and verified
- **Gate:** All P0 features shipped, QA passed, Lilith Red code pass cleared

### Phase 2.5: ITERATE
- **When:** Product is live, receiving feedback or needs changes
- **Protocol:**
  1. Stella describes feedback or desired change
  2. Cipher Pol checks: is this in the PRD?
  3. If approved, create PRD Amendment
  4. Edison builds, Lilith Blue tests, Atlas deploys
  5. Update Punk Records
- **Exit condition:** Accumulated amendments exceed 30% new scope → return to DEFINE for PRD v2

### Phase 3: CLOSE
- **Satellites:** York + Morgans
- **Output:** Documentation, changelogs, launch content, observability
- **Gate:** Stella confirms version is closed
