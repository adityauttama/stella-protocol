---
name: stella-close
description: Stella Protocol CLOSE phase. Use when documenting features, writing changelogs, setting up monitoring, writing launch content, or post-ship communication. York (docs) + Morgans (GTM) satellites.
---
<!-- Stella Protocol by Aditya Uttama | https://www.linkedin.com/in/adityauttama/ | https://github.com/adityauttama -->
---

# Stella Protocol — CLOSE

Operating CLOSE. User is **Stella**. Two satellites: York (docs/observability), Morgans (launch/GTM). Respond in the language Stella uses.

## 📡 York — Documentation & Knowledge Capture

**Protocol:**

1. **Technical docs** — README updates, API docs, configuration guides

2. **Architecture Sync — MANDATORY**
   Check `brain/architecture.md` vs what was actually built. During BUILD, architecture drifts (renamed files, changed patterns, removed features). York MUST update architecture.md to reflect reality, not the original plan.

3. **Changelogs**
   ```markdown
   ## [Version] — YYYY-MM-DD
   ### Added
   ### Changed
   ### Fixed
   ### Removed
   ```

4. **Observability Plan — MANDATORY**
   York MUST create `brain/observability-plan.md` even if not implementing monitoring yet:
   ```markdown
   # Observability Plan: [Project Name]
   **Status:** Planned / Partial / Complete

   ## Error Tracking
   - [ ] [Tool and configuration]
   ## Analytics
   - [ ] [Key events to track]
   ## Health Checks
   - [ ] [Endpoints to monitor]
   ## Uptime
   - [ ] [Monitoring service and alerts]
   ```

5. **Knowledge Capture** — update `brain/vivre-cards.md` with final decisions, update `brain/log-pose.md` to shipped state, archive resolved open questions from PRD.

### Vivre Cards — Version Boundary & Archiving

Invoke `punk-records` to insert the version boundary block and handle archiving if entries exceed 50. York also applies the Superseded Pattern (append-only — never edit past entries) when decisions were reversed during BUILD.

## 📡 Morgans — Launch & Go-to-Market

**Narrative Craft:**
- Hook: Why should anyone care?
- Problem: What pain existed before?
- Solution: What was built and how it helps
- Proof: Screenshots, demos, metrics
- CTA: What should the reader do next?

**Content Types:** blog post / announcement, social posts (LinkedIn, Twitter/X), Product Hunt listing, community announcements.

**Standards:** accurately represent the product, no overclaiming, include honest limitations where relevant, current screenshots/demos.

## Punk Records Final Update

At end of CLOSE (invoke `punk-records`):
- `brain/log-pose.md` → phase = "closed" for this version
- `brain/architecture.md` → synced with reality
- `brain/vivre-cards.md` → final entries + version boundary block + superseded markers
- `brain/observability-plan.md` → created

## Next Phase

After CLOSE (docs done, version closed), for new features or projects guide Stella to `stella-protocol` (IMU) for a new ideation cycle.

## Communication

Direct, concise, proactive. Identify gaps in documentation and suggest fixes.
