'use strict';

const fs = require('fs');
const path = require('path');
const Terser = require('terser');
const { getLanguages } = require('../lib/language.js');
const { filter } = require('../lib/dependencies.js');
const { rollupCode } = require('../lib/bundling.js');
const { mkdir } = require('../lib/makestuff.js');
const buildConfig = require('../build_config.js');
const packageJSON = require('../../package.json');

/**
 * Emit one self-contained ESM module per grammar under languages/,
 * plus languages.json and languages/index.js manifests.
 *
 * Grammar-local imports (./lib/*, sibling ./foo.js) are rolled into each
 * file so a single deep import does not need extra chunks.
 *
 * @param {{ languages?: string[], minify?: boolean }} options
 * @returns {Promise<{ count: number, names: string[] }>}
 */
async function emitLanguages(options = {}) {
  if (!process.env.BUILD_DIR) {
    throw new Error('emitLanguages requires process.env.BUILD_DIR');
  }

  const minify = options.minify !== false;
  mkdir('languages');

  let languages = await getLanguages();
  // built-ins only for the esm package tree unless extras are present and filtered in
  languages = languages.filter((l) => !l.third_party);
  languages = filter(languages, options.languages || []);

  const names = [];
  const meta = [];

  for (const language of languages) {
    process.stdout.write('.');
    const code = await bundleLanguageESM(language);
    const header = `/*! \`${language.name}\` grammar for Highlight.js v${packageJSON.version} */\n`;
    const esm = `${header}${code}`;
    const outPath = path.join(process.env.BUILD_DIR, 'languages', `${language.name}.js`);
    fs.writeFileSync(outPath, esm);

    if (minify) {
      const mini = await Terser.minify(esm, {
        ...buildConfig.terser,
        module: true
      });
      fs.writeFileSync(
        path.join(process.env.BUILD_DIR, 'languages', `${language.name}.min.js`),
        mini.code
      );
    }

    names.push(language.name);
    meta.push({
      name: language.name,
      prettyName: language.prettyName,
      categories: language.categories,
      requires: language.requires
    });
  }
  process.stdout.write('\n');

  names.sort();
  meta.sort((a, b) => a.name.localeCompare(b.name));

  // Canonical registry for tooling + alias maps (no languages/index or all barrel).
  fs.writeFileSync(
    path.join(process.env.BUILD_DIR, 'languages.json'),
    `${JSON.stringify({ languages: meta }, null, 2)}\n`
  );

  return { count: names.length, names };
}

async function bundleLanguageESM(language) {
  // Same rollup path as legacy CDN language compile: IIFE binding, then default export.
  // Needed so ids like `1c` still produce a valid module (invalid JS identifiers).
  const input = {
    input: language.path,
    plugins: buildConfig.rollup.browser_iife.input.plugins
  };
  const output = {
    format: 'iife',
    name: 'hljsGrammar',
    footer: null,
    interop: false
  };
  const data = await rollupCode(input, output);
  if (!data || !data.includes('hljsGrammar')) {
    throw new Error(`Language ${language.name} rollup produced empty/invalid output`);
  }
  return `${data.trim()}\n\nexport default hljsGrammar;\n`;
}

module.exports = { emitLanguages };
