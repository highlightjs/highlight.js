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
 */

const { program } = require('commander');
const path = require('path');
const fs = require('fs');
const { clean } = require('./lib/makestuff.js');
const { emitThemes } = require('./esm/emit_themes.js');
const { emitLanguages } = require('./esm/emit_languages.js');
const { bundleCore } = require('./esm/bundle_core.js');
const { emitPackage } = require('./esm/package_json.js');
const { writeAliasMap } = require('./esm/build_alias_map.js');

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
  .argument('[languages...]', 'optional language id filter')
  .addHelpText('after', `
Examples:
  node tools/build_esm.js
  node tools/build_esm.js --mode cdn
  node tools/build_esm.js javascript python
  npm run build-esm -- --no-minify
`)
  .parse(process.argv);

const opts = program.opts();
const mode = String(opts.mode || 'npm').toLowerCase();
const languageFilter = program.args;
const doMinify = opts.minify !== false;

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
  process.env.BUILD_DIR = buildDir;

  console.log(`build_esm: mode=${m} out=${buildDir} minify=${doMinify}`);
  await clean(buildDir);

  console.log('build_esm: extracting grammar aliases.');
  const aliasStats = writeAliasMap();
  console.log(`build_esm: alias map keys=${aliasStats.count}`);

  console.log('build_esm: writing themes.');
  const themeStats = emitThemes();
  console.log(`build_esm: themes css=${themeStats.css} other=${themeStats.other}`);

  console.log('build_esm: writing languages.');
  const langStats = await emitLanguages({
    languages: languageFilter,
    minify: doMinify
  });
  console.log(`build_esm: languages count=${langStats.count}`);

  console.log('build_esm: bundling core.');
  const coreStats = await bundleCore({ minify: doMinify });
  console.log(`build_esm: core ${coreStats.file}${coreStats.minFile ? ` + ${coreStats.minFile}` : ''}`);

  console.log('build_esm: writing package.json.');
  const pkg = emitPackage({ mode: m });
  console.log(`build_esm: package ${pkg.name}@${pkg.version}`);

  const marker = {
    pipeline: 'build_esm',
    step: 'A5-package',
    mode: m,
    minify: doMinify,
    languages: languageFilter.length ? languageFilter : null,
    themes: themeStats,
    languageCount: langStats.count,
    core: coreStats,
    packageName: pkg.name,
    createdAt: new Date().toISOString()
  };
  fs.writeFileSync(
    path.join(buildDir, '.build_esm.json'),
    `${JSON.stringify(marker, null, 2)}\n`
  );

  console.log(`build_esm: wrote under ${buildDir}`);
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
