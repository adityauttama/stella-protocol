## Stella Protocol — Auto Session Hook

At the start of every conversation in this project:

1. Read `brain/log-pose.md` (if exists)
2. Read `brain/scope-changes.md` (if exists)
3. Check `brain/vivre-cards.md` for unresolved BUSTER CALL findings (Status: OPEN)
4. Output a status block (max 5 lines):

```
**[Project Name]** | Phase: [phase] | Track: [track]
Status: [1-line summary of current state]
Blockers: [none / list OPEN buster calls]
Scope changes: [N unreviewed / all reviewed]
Suggested next: [concrete action based on current state]
```

5. If there are OPEN BUSTER CALL blockers with CRITICAL/HIGH severity, flag them BEFORE doing anything else
6. If the user's request conflicts with current phase, note it but don't block — Stella decides
7. Respond in the language the user writes in (English or Bahasa Indonesia)

## Governance Rules

### Cipher Pol (Scope Monitoring)
When creating any new file, route, page, endpoint, or component during BUILD:
- Check if it's listed in `brain/prd-*.md`
- If NOT in PRD: log to `brain/scope-changes.md` with classification (INTEL/ALERT/INTERCEPT)
- INTEL: log and continue
- ALERT: log, inform user, continue
- INTERCEPT: log, ask for explicit approval before proceeding
- Rejected INTERCEPT items go to `brain/ideas.md` as Parked entries

### Buster Call (Quality/Security Veto)
When encountering security vulnerabilities, data integrity risks, or critical quality issues:
- Use the formatted block (⚠️ SEVERITY — SATELLITE NAME)
- Log to `brain/vivre-cards.md` with Status: OPEN
- Only BUSTER CALL severity blocks work. CONCERN and WARNING are advisory.
- When fixed, add a new vivre card with Status: RESOLVED

### Punk Records
- Update `brain/log-pose.md` after each milestone (not every file change)
- Decisions go to `brain/vivre-cards.md` (append-only, never edit past entries)
- Keep brain/ files as human-readable markdown — no YAML schemas or machine formats
