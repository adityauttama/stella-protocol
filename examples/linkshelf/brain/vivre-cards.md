# Vivre Cards — Decision Log

> Append-only. Never edit past entries.

---

### [2026-04-06] Track Selection: Grand Line
**Phase:** IDEATE
**Satellite:** IMU
**Decision:** Use Grand Line (full track) for LinkShelf
**Rationale:** New product with architectural decisions to make. Needs proper PRD, architecture review, and spec pass before building.
**Alternatives:** East Blue (lightweight) — rejected because this is a new product, not a small feature.

---

### [2026-04-06] PRD Approved: LinkShelf v1.0
**Phase:** DEFINE
**Satellite:** Shaka
**Decision:** Approved PRD with P0 scope: save, search, tag, list, edit, delete. Web only, single user.
**Rationale:** Minimum viable product that validates the core assumption (people will use a dedicated tool if links become findable).
**Alternatives:** Broader V1 with browser extension and AI tagging — rejected to ship faster and validate core loop first.

---

### [2026-04-06] Scope Rejection: Public Sharing
**Phase:** DEFINE
**Satellite:** Cipher Pol (ALERT)
**Decision:** Rejected request to add public bookmark collection sharing. Parked for V2.
**Rationale:** Public sharing is explicitly listed as a non-goal in the PRD (social features). Adding it would require auth, permissions, and public URLs — a significant scope expansion.
**Alternatives:** Add as P2 feature — rejected because it contradicts a stated non-goal and would delay V1.

---

### [2026-04-06] SSRF Prevention: URL Validation
**Phase:** BUILD
**Satellite:** Edison (Buster Call WARNING)
**Decision:** Added URL validation to bookmark save endpoint. Allowlist http/https schemes, block private IP ranges before metadata extraction.
**Rationale:** Without validation, the metadata extraction service could be abused for server-side request forgery (SSRF) — probing internal network via crafted URLs.
**Alternatives:** None — this is a security requirement, not a tradeoff.

---

### [2026-04-06] Deployment: Vercel
**Phase:** BUILD
**Satellite:** Atlas
**Decision:** Deploy to Vercel free tier with automatic deploys from main branch.
**Rationale:** Zero-config Next.js deployment. Free tier is sufficient for single-user tool. Preview deploys on PRs.
**Alternatives:** Self-hosted (Nginx + PM2) — rejected, unnecessary complexity for a personal tool.
