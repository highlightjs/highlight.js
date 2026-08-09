#!/usr/bin/env node
'use strict';

/**
 * ESM packaging build (v12) — parallel to legacy tools/build.js targets.
 *
 * Layout (npm and cdn share the same tree; mode only changes extras):
 *   build/esm/
 *     highlight.js
 *     languages/*.js
 *     themes/**
 *
 * A1: scaffold only — cleans output dir and writes a marker. Emit steps land later.
 */

const { program } = require('commander');
const path = require('path');
const fs = require('fs');
const { clean } = require('./lib/makestuff.js');

const MODES = ['npm', 'cdn', 'all'];
const ROOT = path.dirname(__dirname);
const ESM_BUILD_ROOT = path.join(ROOT, 'build', 'esm');

program
  .name('build_esm')
  .description('Build ESM package layout (v12). Does not replace legacy -t node|cdn|browser yet.')
  .option(
    '-m, --mode <mode>',
    `publish mode: ${MODES.join(' | ')}`,
    'npm'
  )
  .option('-n, --no-minify', 'Disable minification (cdn mode still may minify later)')
  .option(
    '--out <dir>',
    'output directory (default: build/esm, or build/esm/<mode> when --mode all)',
    ''
  )
  .allowUnknownOption(false)
  .argument('[languages...]', 'optional language id filter (reserved for later steps)')
  .addHelpText('after', `
Examples:
  node tools/build_esm.js
  node tools/build_esm.js --mode cdn
  node tools/build_esm.js --mode all
  npm run build-esm -- --mode npm
`)
  .parse(process.argv);

const opts = program.opts();
const mode = String(opts.mode || 'npm').toLowerCase();
const languages = program.args;

function modeBuildDir(m) {
  if (opts.out) {
    return path.resolve(opts.out);
  }
  if (mode === 'all') {
    return path.join(ESM_BUILD_ROOT, m);
  }
  return ESM_BUILD_ROOT;
}

async function buildMode(m) {
  if (!['npm', 'cdn'].includes(m)) {
    throw new Error(`Unknown mode '${m}' (use npm, cdn, or all)`);
  }

  const buildDir = modeBuildDir(m);
  // Keep BUILD_DIR local to this pipeline so we never clobber legacy build/ used by tests
  // unless the user deliberately points --out at build/.
  process.env.BUILD_DIR = buildDir;

  console.log(`build_esm: mode=${m} out=${buildDir}`);
  await clean(buildDir);

  const marker = {
    pipeline: 'build_esm',
    step: 'A1-scaffold',
    mode: m,
    minify: opts.minify !== false,
    languages: languages.length ? languages : null,
    createdAt: new Date().toISOString()
  };
  fs.writeFileSync(
    path.join(buildDir, '.build_esm.json'),
    `${JSON.stringify(marker, null, 2)}\n`
  );

  // Placeholders for the agreed layout (filled in A2–A4)
  fs.mkdirSync(path.join(buildDir, 'languages'), { recursive: true });
  fs.mkdirSync(path.join(buildDir, 'themes'), { recursive: true });

  console.log(`build_esm: wrote scaffold under ${buildDir}`);
}

async function main() {
  if (mode === 'all') {
    await clean(ESM_BUILD_ROOT);
    for (const m of ['npm', 'cdn']) {
      await buildMode(m);
    }
  } else if (mode === 'npm' || mode === 'cdn') {
    await buildMode(mode);
  } else {
    console.error(`ERROR: unknown --mode '${mode}' (expected ${MODES.join(', ')})`);
    process.exitCode = 1;
    return;
  }
  console.log('build_esm: done.');
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
