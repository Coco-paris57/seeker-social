// Every script the browser loads must parse: one bad file leaves the whole app on "Starting…".
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';

test('every front-end script parses', () => {
  for (const dir of ['public/admin', 'public/guest', 'public/shared']) {
    let files = [];
    try { files = readdirSync(dir).filter((f) => f.endsWith('.js')); } catch { continue; }
    for (const f of files) assert.doesNotThrow(() => execFileSync(process.execPath, ['--check', `${dir}/${f}`], { stdio: 'pipe' }), `${dir}/${f} does not parse`);
  }
});
