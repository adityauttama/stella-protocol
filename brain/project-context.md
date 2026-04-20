# Project Context: stella-protocol

## What We're Building
A PM-first AI development framework — CLI tool that installs structured skill files (phases, governance, execution rigor) into any project for use with Claude Code and compatible agents.

## Tech Stack
- Language: JavaScript (Node.js ≥20, CJS modules)
- CLI Framework: Commander.js ^14.0.0
- Interactive prompts: @clack/prompts ^1.0.0
- Terminal styling: Chalk ^4.1.2
- Filesystem: fs-extra ^11.3.0
- Deployment: npm package (npx stella-protocol)

## Critical Constraints
- skill files are the product — changes to skills affect all users who install
- brain/ files are append-only (vivre-cards.md) — never edit past entries
- Source skills/ and .claude/skills/ mirrors must always be identical
- No superpowers attribution in any public-facing file

## Non-Negotiables
- One Piece metaphor preserved across all skill files
- Phase gate sequence: IDEATE → DEFINE → BUILD → REVIEW → CLOSE — cannot be skipped
- All EXIT GATE changes must preserve waiver path

## Key File Locations
- CLI entry: cli/index.js
- Init templates: punk-records/
- Skill source: skills/
- Skill mirror: .claude/skills/
- Project brain: brain/
- Design system: N/A (framework, not UI project)
