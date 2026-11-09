#!/usr/bin/env node
// Stella Protocol by Aditya Uttama
// https://www.linkedin.com/in/adityauttama/ | https://github.com/adityauttama

// Non-interactive smoke test of what `stella install` writes into a project:
// skills, brain/ templates and the CLAUDE.md session hook. Runs in a temp folder.

const assert = require('assert/strict');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { SKILLS_DIR, BRAIN_TEMPLATES, listSkills, writeBrainTemplates } = require('../cli/manifest');
const { installSkills, addSessionHook } = require('../cli/install');

async function main() {
  const project = fs.mkdtempSync(path.join(os.tmpdir(), 'stella-smoke-'));
  try {
    // Skills: every folder in skills/ is installed, byte-for-byte.
    const skillsTarget = path.join(project, '.claude', 'skills');
    const installed = await installSkills(skillsTarget);
    const expected = listSkills();
    assert.ok(expected.length >= 12, `expected at least 12 skills in skills/, found ${expected.length}`);
    assert.deepEqual(installed, expected, 'installSkills must install every skill in skills/');
    for (const skill of expected) {
      assert.equal(
        fs.readFileSync(path.join(skillsTarget, skill, 'SKILL.md'), 'utf-8'),
        fs.readFileSync(path.join(SKILLS_DIR, skill, 'SKILL.md'), 'utf-8'),
        `${skill}/SKILL.md differs from source`,
      );
    }

    // Brain: all templates, placeholders filled, existing files never overwritten.
    const brain = path.join(project, 'brain');
    const written = writeBrainTemplates(brain, 'smoke-project', '2026-01-01');
    assert.deepEqual(written.sort(), [...BRAIN_TEMPLATES].sort(), 'all brain templates must be written');
    const logPose = fs.readFileSync(path.join(brain, 'log-pose.md'), 'utf-8');
    assert.ok(logPose.includes('smoke-project') && !logPose.includes('{project-name}'), 'log-pose placeholder not filled');
    const projectContext = fs.readFileSync(path.join(brain, 'project-context.md'), 'utf-8');
    assert.ok(projectContext.includes('smoke-project') && !projectContext.includes('{project-name}'), 'project-context placeholder not filled');
    fs.writeFileSync(path.join(brain, 'ideas.md'), 'user edit');
    assert.deepEqual(writeBrainTemplates(brain, 'smoke-project'), [], 'second run must write nothing');
    assert.equal(fs.readFileSync(path.join(brain, 'ideas.md'), 'utf-8'), 'user edit', 'existing brain file was overwritten');

    // Hook: created with the current session hook, then skipped on re-run.
    assert.equal(await addSessionHook(project), 'created');
    const claudeMd = fs.readFileSync(path.join(project, 'CLAUDE.md'), 'utf-8');
    assert.ok(claudeMd.startsWith('## Stella Protocol'), 'hook must start at the Stella Protocol heading');
    assert.ok(claudeMd.includes('brain/project-context.md'), 'hook must read brain/project-context.md');
    assert.equal(await addSessionHook(project), 'skipped');

    // Hook: appended to an existing CLAUDE.md without touching its content.
    const other = path.join(project, 'other');
    fs.mkdirSync(other);
    fs.writeFileSync(path.join(other, 'CLAUDE.md'), '# My project\n');
    assert.equal(await addSessionHook(other), 'appended');
    assert.ok(fs.readFileSync(path.join(other, 'CLAUDE.md'), 'utf-8').startsWith('# My project\n\n\n## Stella Protocol'));

    console.log(`smoke-install: OK — ${installed.length} skills, ${written.length} brain files, hook created/skipped/appended`);
  } finally {
    fs.rmSync(project, { recursive: true, force: true });
  }
}

main().catch((err) => {
  console.error('smoke-install: FAIL —', err.message);
  process.exit(1);
});
