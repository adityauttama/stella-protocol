# Changelog

## [0.4.2] — 2026-04-07
### Fixed
- Cipher Pol governance doc (`protocol/governance/cipher-pol.md`) now correctly references `brain/scope-changes.md` as primary drift log, aligned with skill files and CLAUDE.md
- Version mismatch between `package.json` (0.4.1) and `.claude-plugin/marketplace.json` (0.3.0) — synced to 0.4.1
- All CLI commands (`install`, `init`, `status`) now have error handling with user-friendly messages
- Skill directory validation before copy in `stella install` — missing skills show warning instead of crashing
- `YYYY-MM-DD` placeholder in `brain/log-pose.md` now replaced with actual date during `stella init` and `stella install`
- Buster Call terminology in `stella-define` clarified — "Issue warnings" changed to "Issue Buster Calls (WARNING severity)" with note that only BUSTER CALL severity blocks
- Frontmatter parser in `stella status` uses stricter regex to avoid false matches

### Added
- "Next Phase" guidance section in all 4 phase skills (stella-define, stella-build, stella-review, stella-close)
- npm scripts: `test` (placeholder) and `status` in package.json

## [0.4.1] — 2025-XX-XX
### Fixed
- Added `stella-protocol` bin alias so `npx stella-protocol` works

## [0.4.0] — 2025-XX-XX
### Added
- IMU Express/Guided brainstorming modes with mandatory track selection gate

## [0.3.1] — 2025-XX-XX
### Changed
- Version bump

## [0.3.0] — 2025-XX-XX
### Added
- Observation Haki guided PRD mode in Shaka satellite
