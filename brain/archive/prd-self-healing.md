## PRD: Stella Protocol Self-Healing

**Version:** 1.0 | **Date:** 2026-04-07 | **Status:** Shipped (v0.4.2)

### Problem
Stella-protocol v0.4.1 punya 10 quality issues yang ditemukan Lilith Red/Blue self-review, termasuk governance doc yang kontradiksi implementasi (Cipher Pol logging split), CLI tanpa error handling, dan version mismatch. Sebagai framework yang enforce quality pada project lain, ini merusak kredibilitas sendiri.

### Target Users
- Developer yang baru install stella-protocol via `npx stella-protocol install`
- PM/developer yang sudah pakai stella-protocol dan bergantung pada governance consistency
- Kontributor yang baca protocol docs untuk memahami framework

### Goals (measurable)
- **G1:** 0 inconsistency antara protocol governance docs dan skill files (saat ini: 1 critical split)
- **G2:** 100% CLI commands punya error handling dengan user-friendly messages (saat ini: 0%)
- **G3:** Version sync antara package.json dan marketplace.json (saat ini: 0.4.1 vs 0.3.0)
- **G4:** 100% skill files punya explicit phase transition guidance (saat ini: 1 of 5)

### Non-Goals (explicitly out of scope)
- **NG1:** Automated test suite — adjacent idea, beda sprint
- **NG2:** Version bump automation script — park for later
- **NG3:** Skill linter tool — valuable tapi premature, park
- **NG4:** CLI refactoring atau restructuring — fix only, no refactor
- **NG5:** New CLI commands atau features
- **NG6:** Migrating chalk 4→5 atau CJS→ESM

### Features

#### P0 — Must Ship
1. **Fix Cipher Pol logging inconsistency** — Update `protocol/governance/cipher-pol.md` to reference `brain/scope-changes.md` as primary scope drift log. `vivre-cards.md` tetap dipakai untuk decision records saja. Align dengan skill files dan CLAUDE.md.
2. **Sync marketplace.json version** — Update `.claude-plugin/marketplace.json` version dari 0.3.0 ke 0.4.1.
3. **Add error handling ke semua CLI commands** — Generic try-catch per command di `cli/install.js`, `cli/init.js`, `cli/status.js`, `cli/index.js` dengan chalk-formatted error messages.
4. **Add skill directory validation** — Check `fs.existsSync(src)` sebelum copy di `cli/install.js`, dengan warning message kalau missing.

#### P1 — Should Ship
5. **Clarify Buster Call terminology di stella-define** — Ubah "Issue warnings when:" ke "Issue Buster Calls (WARNING severity) when:" dan tambah note bahwa hanya BUSTER CALL severity yang blocks.
6. **Replace YYYY-MM-DD placeholder saat init** — Update `cli/init.js` untuk replace `YYYY-MM-DD` dengan actual date saat initialization.
7. **Add phase transition guidance ke 4 skill files** — Tambah "Next Phase" section dengan format seragam di akhir stella-define, stella-build, stella-review, stella-close.

#### P2 — Nice to Have
8. **Improve frontmatter parser** — Ganti regex di `cli/status.js` dengan stricter pattern atau `gray-matter` library.
9. **Add basic npm scripts** — Tambah `"test"` dan `"lint"` placeholder di package.json.

### Data Model
N/A — tidak ada data model changes. Murni file edits (governance docs, skill files, CLI code).

### API Contracts
N/A — tidak ada external API. CLI interface tetap sama: `stella install`, `stella init`, `stella status`. Error handling menambah graceful output, tapi tidak mengubah command structure.

### Open Questions (Resolved)
1. ~~Cipher Pol fix — scope-changes.md + vivre-cards.md?~~ **Resolved:** scope-changes.md sebagai primary drift log, vivre-cards.md untuk decision records saja. Separation of concerns.
2. ~~Error handling granularity?~~ **Resolved:** Per command (generic try-catch). Sufficient untuk simple CLI.
3. ~~Phase transition format?~~ **Resolved:** Seragam di semua skill. Standar block di akhir setiap skill.

---
_Mode: Express_
_Pulse: READY FOR APPROVAL (0 items flagged, all open questions resolved)_
