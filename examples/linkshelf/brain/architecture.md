# Architecture

## Stack

| Layer | Choice | Rationale |
|-------|--------|-----------|
| Frontend | Next.js 15 + TypeScript + Tailwind CSS + shadcn/ui | Fast to build, SSR for performance, component library saves UI time |
| Database | SQLite via better-sqlite3 | Single-user tool, zero config, file-based, FTS5 for full-text search |
| Metadata extraction | Server-side fetch + cheerio | Parse Open Graph and meta tags from HTML |
| Hosting | Vercel | Zero-config Next.js deployment, free tier sufficient |

## Data Model

Two tables + one FTS5 virtual table:
- `bookmarks` — Core entity with URL, title, description, favicon, tags (JSON), timestamps
- `tags` — Denormalized tag list with bookmark counts
- `bookmarks_fts` — FTS5 virtual table indexing title, description, url, tags for instant search

Tags are stored as JSON array on the bookmark AND as a separate table for fast filtering. This is intentional denormalization — the tag table is the source of truth for "all tags," while the JSON column enables single-query bookmark retrieval with tags.

## API Surface

REST API under `/api/bookmarks` with standard CRUD. Search via `?q=` query param triggers FTS5. Tag filtering via `?tag=` param.

Metadata extraction is an internal endpoint (`/api/extract?url=`) called during save. Includes:
- 5-second timeout (per Lilith Red spec review)
- Allowlist: http/https schemes only (per Buster Call SSRF finding)
- Private IP range blocking
- Fallback: if extraction fails, save with URL as title

## V1 Boundary

**In V1:** Save, search, tag, list, edit, delete. Web UI only. Single user, no auth.

**Deferred:** Browser extension, bulk import, AI tagging, link health monitoring, export, auth/accounts.

## Alternatives Considered

| Option | Why Rejected |
|--------|-------------|
| PostgreSQL | Overkill for single-user. SQLite is simpler, faster for this scale. |
| Prisma ORM | Adds complexity. better-sqlite3 is direct and sufficient. |
| tRPC | Nice but adds a layer. REST is simpler for this scope. |
| Electron desktop app | Web app is sufficient. Avoids packaging complexity. |
