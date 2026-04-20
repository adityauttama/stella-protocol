# Launch Content — Stella Protocol

**Date:** 2026-04-07 | **Platform:** LinkedIn | **Satellite:** Morgans

---

## Main Post

I shipped a product in 2 days using AI. The interesting part isn't the speed — it's what almost went wrong.

I was building House of Riddle, a community riddle platform. Claude Code wrote most of the implementation. Fast, clean, impressive.

Then I ran a structured review before deploying.

3 critical security findings. Answers leaking to the client. Broken admin access. An open redirect in auth. All in code that looked fine on the surface.

That review wasn't luck. It was a protocol I'd been building — a framework that gives AI agents phases, scope rules, and quality gates while keeping the human in charge of every decision.

I called it Stella Protocol.

Here's the thing about building with Cursor, Claude Code, or any AI tool — they're great at "how." They're terrible at "should we?" Nobody tracks when the AI quietly adds features outside your spec. Nobody flags when a shortcut creates a security hole. You find out later, when it's expensive.

Stella Protocol fixes that. Every feature checks against an approved scope. Drift gets flagged automatically. Security issues trigger a veto. Every decision is logged so you can trace what happened and why.

Then I did something dumb and obvious: I used the protocol to develop itself.

It found a governance inconsistency in its own documentation — the protocol's internal docs contradicted its own implementation. A generic code review had missed it completely. The structured review caught it in minutes.

It's open source and free:

```
npx stella-protocol install
```

github.com/adityauttama/stella-protocol

First open source project. I know there are rough edges. That's why I'm sharing it — I need people to break it.

Install it on your next AI-built feature. See if the scope enforcement catches something you wouldn't have. Tell me what's broken.

One Piece fans — check the naming. You'll know. 🏴‍☠️

---

## Self-Comment 1 — One Piece Easter Eggs (post 5 min after)

For the nakama who noticed:

Every name in the framework comes from One Piece. AI agents are named after Vegapunk's satellites — Shaka handles logic, Edison builds, Lilith tests. Scope enforcement is Cipher Pol. The decision log is Vivre Cards. The project compass is Log Pose. The emergency stop is Buster Call. The project brain is called Punk Records.

If none of this makes sense — One Piece is only 1100+ chapters. Light reading.

---

## Self-Comment 2 — Learnings (post 10 min after)

Three things I didn't expect to learn from this:

Governance isn't bureaucracy — it's speed. Catching a wrong assumption during planning takes minutes. Catching it after deployment takes days. The protocol paid for itself on the first project.

Dogfooding is the only honest test. External reviews are useful. Using your own tool on itself is where you find the real gaps. If you're building a tool and you're not using it daily, you're guessing.

AI changes what you build, not whether you need to think. Every decision point in the protocol exists because I learned that skipping it costs more later. The AI doesn't know when to stop. That's still your job.

---

## Hashtag Comment (post 15 min after)

#OpenSource #ProductManagement #AI #BuildWithAI

---

## Posting Strategy

- **When:** Tuesday–Thursday, 8-10 AM EST
- **Don't edit** within first 10 minutes
- **Reply to every comment** in first hour
- **Self-comments** at 5, 10, 15 minutes — not simultaneously
- **Tag max 2-3 people** you know personally who build with AI
