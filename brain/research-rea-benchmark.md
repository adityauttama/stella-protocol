# Research Brief: Benchmark morluto/rea → Stella Protocol

**Date:** 2026-11-09 | **Satellite:** Pythagoras (Research Mode) | **Status:** Draft — menunggu keputusan Stella
**Source:** [github.com/morluto/rea](https://github.com/morluto/rea) @ `c78c8ae` (2026-11-09), package `rea-agents` v6.8.0

**Question:** Apa dari REA yang bisa diadopsi untuk improve Stella Protocol, atau untuk mempercepat rencana yang sudah ada (CHANGELOG "Deferred to v0.12.0+")?

**Label bukti** (dipinjam dari REA, lihat A5): **Observed** = dicek langsung di file/command · **Inferred** = disimpulkan, belum diverifikasi · **Unknown** = belum diketahui.

---

## 1. REA secara singkat

- **Produk:** MCP server + CLI (`npx rea-agents setup`) untuk reverse engineering — native binary (via Hopper/Ghidra/IDA/Kuna), JS/Electron, .NET, APK, website, network capture, dll. (~30 jenis target). Tagline: *"See a feature you like. Understand how it works, down to the binary level."*
- **Distribusi:** satu npm package yang sekaligus Claude Code plugin (`.claude-plugin/`), Codex plugin (`.codex-plugin/`), dan skill di skills.sh. `rea setup` bisa mengonfigurasi 27 agent client.
- **Skill:** 1 skill produk `reverse-engineer-anything` (562 LOC) + 8 file `references/` yang dibaca on-demand; 4 skill maintainer internal (`rea-tool-design`, `rea-changelog-update`, `rea-ci-tests-audit`, `rea-analysis-optimization`).
- **Engineering:** 184 script, ~40 workflow CI, generated-file checks, agent evals, mutation testing (Stryker), Release Please.

**Relevansi untuk Stella:** REA bukan PM framework. Yang berguna adalah (a) cara REA mengemas & mendistribusikan skill ke banyak agent, (b) disiplin evidence di output agent, (c) cara REA mencegah drift antar salinan file, (d) satu use-case produk (feature teardown) yang nyambung ke IDEATE/DEFINE.

---

## 2. Temuan di Stella yang muncul dari perbandingan

Saat membandingkan mekanisme distribusi REA dengan Stella, ditemukan drift berikut. Semua **Observed** pada 2026-11-09.

| # | Temuan | Bukti | Severity |
|---|---|---|---|
| F1 | `stella install` hanya meng-copy **5 dari 12 skill**. 4 satellite (`shaka-brief`, `shaka-prd`, `pythagoras-research`, `oda-design`) + 3 governance (`cipher-pol`, `buster-call`, `punk-records`) tidak terinstall. `stella-protocol` & `stella-define` adalah router tipis yang hanya memanggil satellite → IDEATE & DEFINE kosong di project user. | `cli/install.js:9-15` (array `SKILLS`) | **BUSTER CALL** (MUST-FIX) |
| F2 | Plugin marketplace juga hanya mendaftar 5 skill, dan versinya `0.11.0` (package.json `0.12.0`). | `.claude-plugin/marketplace.json` | sama root cause F1 |
| F3 | `stella install` tidak meng-copy `project-context.md` (`stella init` meng-copy-nya). | `cli/install.js:125` vs `cli/init.js:30` | WARNING |
| F4 | Template hook CLAUDE.md yang diinstall ke project user versi lama: tidak membaca `project-context.md`, tidak ada Skill Layers / dependency superpowers. | `punk-records/stella-claude-md.md` vs `CLAUDE.md` | WARNING |
| F5 | Mirror drift: `.claude/skills/stella-close/SKILL.md` punya baris `---` ekstra setelah komentar HTML. Melanggar constraint "mirror identical". | `diff -r skills .claude/skills` | WARNING |
| F6 | Bagian API Surface di `brain/architecture.md` masih mendaftar `edison-*`, `atlas-taskplan`, `stella-parallel`, dan "Install 5 skills". | `brain/architecture.md:24-58` | CONCERN |
| F7 | `npm test` cuma `echo`; 0 git tag; tidak ada CI. | `package.json` scripts, `git tag` | CONCERN |

**Root cause (cara REA: kelompokkan per root cause, bukan per file):** fakta yang sama di-maintain manual di banyak tempat — daftar skill (×4: folder, `install.js`, marketplace, README/architecture), versi (×2), isi skill (×2: source + mirror), hook (×2), daftar template (×2). Ini **berulang**: mismatch versi sudah pernah di-flag 2026-04-07, stray line di mirror sudah di-fix di v0.9.0 dan v0.10.0. Fix per-file tidak cukup; perlu fix struktural (A1).

---

## 3. Yang bisa diadopsi, dipetakan ke rencana

### A1 — Single source of truth + salinan yang di-generate + mode `--check`
**REA:** skill ditulis sekali di `.agents/skills/`; salinan yang dikirim di-generate oleh `scripts/generate-skill-metadata.mjs`. Script yang sama jalan dengan `--check` di CI dan gagal kalau ada drift (*"run npm run docs:generate"*). Versi di `plugin.json`/`marketplace.json` di-bump otomatis oleh Release Please. `check-doc-facts.mjs` memastikan klaim di README cocok dengan catalog.
**Untuk Stella:**
- `scripts/sync.js` (Node tanpa dependency): turunkan daftar skill dari `skills/*/SKILL.md` → tulis mirror `.claude/skills/`, `marketplace.json` (versi + skills), dan biarkan `install.js` membaca folder (bukan array hardcode).
- `npm test` = `node scripts/sync.js --check` + lint ringan: frontmatter `name` == nama folder, description < 250 char, link relatif tidak keluar dari folder skill (setara `skillReferenceIssues` REA), hook template == bagian hook di `CLAUDE.md`.
- 1 GitHub Action: `npm test` di setiap PR.
**Rencana terkait:** menutup F1–F5 secara permanen; prasyarat CLOSE v0.12.0. **Effort:** S.

### A2 — Installer yang aman: dry-run, backup, doctor, update
**REA:** `rea setup` menampilkan plan (path, backup, skill yang diganti) dan butuh approval sebelum menulis; perubahan config additive + idempotent + backup (`.rea.backup`); `rea doctor --skill` memverifikasi salinan skill terinstall vs yang dibundel (state: current / stale / missing / unmanaged) dan menyebut perintah repair; `rea update`.
**Untuk Stella:**
- `stella install --dry-run` → daftar file yang akan ditulis/ditimpa.
- Backup skill yang akan ditimpa kalau isinya beda (user mungkin sudah kustomisasi). Saat ini `fs.copy(..., { overwrite: true })` tanpa backup.
- `stella doctor` → cek 12 skill ada & versinya cocok (tambah `metadata.version` di frontmatter, seperti REA `metadata: version: "61"`), 7 file `brain/`, hook CLAUDE.md current, superpowers terdeteksi (warning kalau tidak).
- Sekaligus menjawab M1 v0.10.0 (install npm-cache basi yang tidak punya template `project-context.md`).
**Effort:** M.

### A3 — Multi-harness lewat `.agents/skills` + AGENTS.md + Codex plugin
**Rencana terkait:** "Multi-harness testing (Cursor, Codex) — substantiate README compatibility claim" (Deferred v0.12.0+).
**REA:** dokumentasi client-configuration menyebut `~/.agents/skills` dan `.agents/skills` (project) sebagai lokasi skill bersama yang dibaca beberapa agent (Gemini CLI, Qwen Code, Kimi Code, Pi, FreeBuff); agent lain punya folder sendiri. REA juga mengirim `.codex-plugin/plugin.json` dan `agents/openai.yaml` per skill (metadata UI Codex).
**Untuk Stella:**
- Fallback installer saat ini `.ai-skills` — **tidak dibaca agent mana pun** (Observed: tidak ada referensi `.ai-skills` di docs REA untuk 27 client). Ganti ke `.agents/skills`; tambah flag `--client claude|cursor|codex|agents`.
- Tulis hook juga ke `AGENTS.md` (dibaca Codex/Cursor/Gemini); `CLAUDE.md` bisa import `@AGENTS.md` atau tetap disinkronkan oleh A1.
- Opsional: `.codex-plugin/plugin.json`.
- **Unknown:** path skill & format plugin terkini untuk Codex dan Cursor tidak tertulis di docs REA yang dibaca. Verifikasi ke docs resmi masing-masing sebelum BUILD.
**Effort:** M.

### A4 — Behavioral eval untuk skill
**REA:** `tests/evaluation/model-evals/` menjalankan agent (Codex) terhadap skenario dan memvalidasi output: schema jawaban, tool pertama yang dipanggil, factual correctness.
**Untuk Stella:** `brain/test-plan.md` sudah berisi kasus yang bisa langsung diotomasi, mis. *"stella-define tanpa PRD → output mengandung REFUSE"*.
- `evals/<scenario>/` = fixture `brain/` + `prompt.txt` + `expect.json` (`must_contain`, `must_not_contain`).
- Runner: `claude -p` (dan `codex exec` untuk multi-harness) di salinan sementara fixture, lalu cek marker.
- Jalan manual/nightly (butuh API key), bukan di setiap PR.
- Ini cara paling murah untuk membuktikan klaim kompatibilitas di README, dan untuk mengetes perubahan description (A8).
**Effort:** M.

### A5 — Disiplin evidence di REVIEW & Buster Call
**REA:** *"Every conclusion must distinguish observations, inferences, and unknowns. Cite Evidence IDs, preserve limitations and incomplete coverage."* dan *"Before finishing, revisit the original checklist. Mark each question as answered, partially answered, or unresolved."*
**Untuk Stella** (tetap markdown, tanpa evidence ID/JSON — sesuai non-negotiable "brain/ human-readable"):
- Format Buster Call + baris `Evidence: [file:line / output command] (Observed | Inferred)`.
- Finding Lilith Red/Blue wajib berlabel Observed / Inferred / Unknown. Unknown tidak boleh dilaporkan sebagai "aman".
- REVIEW EXIT GATE: revisit checklist — tiap AC di PRD ditandai answered / partial / unresolved beserta buktinya. Ini juga menjawab M2 v0.10.0 (*"Critical finding unresolved is agent-assessed, not file-checked"*): sekarang ada bukti yang bisa dicek.
**Effort:** S.

### A6 — Proporsionalitas & pengelompokan root cause
**REA AGENTS.md:**
- *"Before adding complexity for a speculative or vanishingly unlikely race or security edge case, explain the concrete failure mode, likelihood, and complexity cost to the user and get their buy-in."* → aturan kalibrasi Buster Call / Lilith Red: severity WARNING ke atas wajib menyebut failure mode konkret + likelihood. Mengurangi over-flagging (risiko ini pernah dicatat untuk Adversarial Mode: *"format too prescriptive"*).
- *"After confirming a bug, search sibling adapters, consumers and similar workflows for the same failure… group findings by root cause instead of filing duplicate reports."* → langkah wajib Lilith Blue. Contoh nyata: F1–F5 di atas.
**Effort:** S.

### A7 — Progressive disclosure lewat `references/`
**Rencana terkait:** "Slim `stella-review` (Lilith Red/Blue extraction)" dan "Thin CLAUDE.md session-hook".
**REA:** SKILL.md berisi routing + aturan inti; detail per domain ada di `references/*.md` dengan instruksi *"Read only the relevant guide"*. Prinsip *"Connect only when needed… Do not run diagnostics or setup before every investigation."* Urutan optimasi REA: **token/context agent dulu**, baru waktu analisis, baru CPU/memori.
**Untuk Stella:**
- `skills/stella-review/references/lilith-red-adversarial.md` + `lilith-blue-checkpoint.md`; SKILL.md tinggal routing + EXIT GATE. Hal yang sama bisa untuk `stella-build` (211 LOC). Tidak perlu skill baru, jadi daftar description saat session start tidak bertambah.
- Installer sudah meng-copy folder skill utuh (`fs.copy` direktori), jadi `references/` ikut terinstall. Check di A1 memastikan link tidak keluar dari folder.
- Thin hook: yang selalu dibaca hanya `log-pose.md`; `vivre-cards.md` dibaca hanya kalau "Buster Call Status" di log-pose ≠ all clear.
**Effort:** S–M.

### A8 — Negative trigger di description
**REA:** description diakhiri *"Skip REA for ordinary source-repository architecture analysis."*
**Untuk Stella:** description `stella-build` ("Use when writing code, implementing features, fixing bugs…") sangat luas dan bisa memicu ceremony BUILD untuk perubahan trivial. Tambah klausa "Skip when…" (mis. tidak ada `brain/`, atau perubahan satu baris). Karena memengaruhi triggering, tes dulu lewat A4.
**Effort:** S.

### A9 — "Inventory before prose" untuk CHANGELOG
**REA (`rea-changelog-update`):** kumpulkan inventaris dari git history (range tag → SHA) dulu, baru tulis prosa; identitas yang tidak jelas tetap ditulis unknown, tidak ditebak.
**Untuk Stella (York di `stella-close`):** `git log <release-terakhir>..HEAD --stat` sebagai inventaris sebelum menulis CHANGELOG. Prasyarat: mulai pakai git tag per release (saat ini 0 tag). Relevan langsung: CHANGELOG untuk v0.12.0 belum ada.
**Effort:** S.

### A10 — Feature teardown dengan REA (opsional)
**REA use-case:** *"Understand how search works in the Notes app, show me the evidence, and build a similar feature for my project."* Ini nyambung ke Pythagoras Research Mode (competitive analysis) dan lensa differentiation di `shaka-brief`.
**Untuk Stella:** kalau tool REA terdeteksi (seperti superpowers: dideteksi, bukan dependency), Pythagoras bisa membuat **Teardown Brief**: fitur kompetitor → cara kerja (Observed dari artifact) → Inferred → Unknown → implikasi untuk PRD. Untuk web/Electron cukup analisis JS statis (tanpa Ghidra/Hopper).
**Guardrail:** REA DISCLAIMER — hanya untuk software yang legal untuk dianalisis. Hasil teardown = pemahaman, bukan copy kode → trigger Buster Call baru "IP/license risk" kalau BUILD menyalin kode hasil decompile.
**Prioritas rendah** sampai ada use-case nyata (mis. di House of Riddle).
**Effort:** S (teks skill), nilai belum pasti.

---

## 4. Yang TIDAK diadopsi

- **MCP server / evidence ledger JSON** — bertentangan dengan non-negotiable "brain/ human-readable markdown, no machine formats". Ambil semantiknya saja (A5).
- **Skala CI REA** (~40 workflow, mutation testing, 184 script) — overkill untuk framework markdown 12 skill. Cukup 1 job `npm test` (A1).
- **22 terjemahan README** — cukup pertimbangkan `README_id.md` saat "README Clarity Rewrite" (parked) di-unpark.
- **Release Please** — butuh conventional commits + bot. Untuk sekarang `scripts/sync.js` sudah menutup drift versi. Revisit kalau release makin sering.

---

## 5. Rekomendasi urutan

| Prioritas | Item | Track | Kenapa |
|---|---|---|---|
| **P0** | Fix F1–F5 + A1 (sync script + `npm test` + CI) | East Blue — hotfix sebelum CLOSE v0.12.0 | BUSTER CALL OPEN; user npm saat ini mendapat IDEATE/DEFINE kosong |
| **P1** | A5 + A6 + A9 (hanya teks skill) | East Blue | Murah, langsung menaikkan kualitas REVIEW & CLOSE |
| **P1** | A7 slim `stella-review` + thin hook | East Blue | Sudah ada di daftar Deferred |
| **P2** | A2 doctor/dry-run + A3 multi-harness + A4 evals | Grand Line — v0.13.0 "Distribution & Proof" | Saling bergantung: evals membuktikan multi-harness, doctor memverifikasi install |
| **P3** | A8, A10 | — | A8 butuh evals dulu; A10 butuh use-case nyata |

## Open Questions

1. Apakah CLOSE v0.12.0 ditahan sampai P0 selesai, atau P0 dirilis sebagai v0.12.1?
2. Jalur distribusi utama: npm CLI atau Claude Code plugin marketplace? Ini menentukan apakah marketplace cukup menunjuk folder (`"skills": "./skills"` seperti REA) atau array yang di-generate. **Unknown:** perilaku auto-discovery Claude Code untuk entry marketplace dengan array `skills` eksplisit — verifikasi sebelum fix F2.
3. Codex/Cursor: path skill & format plugin terkini perlu diverifikasi dari docs resmi (A3).
