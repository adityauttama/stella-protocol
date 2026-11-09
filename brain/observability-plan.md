# Observability Plan: Stella Protocol
**Status:** Partial (v0.12.1 — CI + publish guard live)

## Error Tracking
- [x] Distribution drift: `npm test` in GitHub Actions on every push/PR + `prepublishOnly` before `npm publish` (v0.12.1)
- [x] Installer regression: `scripts/smoke-install.js` asserts every skill in `skills/` is installed (v0.12.1)
- [ ] GitHub issues mentioning "skill not found" / missing `shaka-*` or `cipher-pol` after install → signal that a pre-0.12.1 install is still in use
- [ ] CLI error messages now surface to user (implemented in 0.4.2)
- [ ] Consider adding `--verbose` flag for full stack traces in debug mode

## Analytics
- [ ] Adoption of the fix: weekly npm downloads of 0.12.1 vs 0.12.0 (`npm view stella-protocol` / npmjs.com version tab)
- [ ] npm download stats (tracked via npmjs.com)
- [ ] GitHub stars/forks as adoption proxy
- [ ] Track which CLI commands are most used (opt-in telemetry — NOT implemented, requires user consent)

## Health Checks
- [ ] At every CLOSE: `npm view stella-protocol dist-tags` matches `package.json` after publish
- [ ] `stella status` serves as basic project health check
- [ ] No external endpoints to monitor (CLI tool, not a service)

## Uptime
- N/A — stella-protocol is a CLI tool, not a hosted service
- npm registry availability is the only external dependency
