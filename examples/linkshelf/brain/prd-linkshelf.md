# PRD: LinkShelf

**Version:** 1.0 | **Date:** 2026-04-06 | **Status:** Approved

## Problem
Knowledge workers save dozens of links weekly but can't find them later. Browser bookmarks have no search, no tags, and no context. Links go in but never come back out.

## Target Users
Developers and researchers who save 20+ links/week across work, learning, and personal interests.

## Goals (measurable)
- Save a link in under 5 seconds (paste URL → auto-fill → save)
- Find any saved link in under 10 seconds via search or tags
- Support 1,000+ bookmarks without performance degradation

## Non-Goals (explicitly out of scope)
- Social features, team collaboration, public sharing
- Mobile native app (responsive web is sufficient for V1)
- AI-powered features (auto-tagging, summarization) — deferred to V2
- User accounts or authentication (single-user, local-first for V1)
- Browser extension (V1 is web-only)

## Features

### P0 — Must Ship
- **Save bookmark:** Paste URL, auto-extract title + description + favicon. Add tags manually.
- **List view:** All bookmarks, sorted by date. Filter by tag.
- **Search:** Full-text search across title, description, URL, and tags. Instant results.
- **Tag management:** Create, rename, delete tags. See bookmark count per tag.
- **Edit/delete:** Modify any bookmark's metadata or remove it.

### P1 — Should Ship
- **Bulk import:** Import from browser bookmark export (HTML file)
- **Browser extension:** Quick-save from any page with one click
- **Keyboard shortcuts:** Power user navigation (/ to search, n to new)

### P2 — Nice to Have
- **AI auto-tagging:** Suggest tags based on page content
- **Link health:** Periodic check for dead links (404s)
- **Export:** Export all bookmarks as JSON/CSV

## Data Model

### bookmarks
| Column | Type | Description |
|--------|------|-------------|
| id | INTEGER PK | Auto-increment |
| url | TEXT NOT NULL | Unique, validated (http/https only) |
| title | TEXT | Auto-extracted, editable |
| description | TEXT | Auto-extracted, editable |
| favicon_url | TEXT | Auto-extracted |
| tags | JSON | Array of tag names |
| created_at | DATETIME | Default now |
| updated_at | DATETIME | Default now |

### tags
| Column | Type | Description |
|--------|------|-------------|
| id | INTEGER PK | Auto-increment |
| name | TEXT UNIQUE | Tag display name |
| bookmark_count | INTEGER | Denormalized count |

### bookmarks_fts (FTS5 virtual table)
Full-text index on: title, description, url, tags

## API Contracts

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/bookmarks | Create bookmark (accepts URL, extracts metadata) |
| GET | /api/bookmarks | List all (supports ?tag= and ?q= params) |
| GET | /api/bookmarks/:id | Get single bookmark |
| PUT | /api/bookmarks/:id | Update bookmark |
| DELETE | /api/bookmarks/:id | Delete bookmark |
| GET | /api/tags | List all tags with counts |
| GET | /api/extract?url= | Extract metadata from URL (internal) |

## Open Questions
_All resolved during DEFINE phase._
