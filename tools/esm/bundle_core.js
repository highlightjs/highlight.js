'use strict';

const fs = require('fs');
const path = require('path');
const Terser = require('terser');
const { rollupCode } = require('../lib/bundling.js');
const buildConfig = require('../build_config.js');
const packageJSON = require('../../package.json');

/**
 * Bundle src/highlight.js + src/lib/** into a single ESM core file.
 * Does not embed languages.
 *
 * @param {{ minify?: boolean, filename?: string }} options
 * @returns {Promise<{ file: string, minFile?: string }>}
 */
async function bundleCore(options = {}) {
  if (!process.env.BUILD_DIR) {
    throw new Error('bundleCore requires process.env.BUILD_DIR');
  }

  const minify = options.minify !== false;
  const filename = options.filename || 'highlight.js';
  const outFile = path.join(process.env.BUILD_DIR, filename);

  const header =
    `/*! Highlight.js v${packageJSON.version} | BSD-3-Clause | highlightjs.org */\n`;

  const input = {
    ...buildConfig.rollup.core.input,
    input: path.join(path.dirname(path.dirname(__dirname)), 'src', 'highlight.js')
  };

  // Named export HighlightJS from source; add default instance for ergonomics.
  const rolled = await rollupCode(input, {
    format: 'es',
    exports: 'named',
    interop: 'compat',
    generatedCode: { constBindings: true }
  });

  if (!/\bHighlightJS\b/.test(rolled) || !/export\s*\{/.test(rolled)) {
    throw new Error('core bundle missing HighlightJS export');
  }

  const banner = `${header}// Core only — register languages from ./languages/*.js\n`;
  const footer = `
const hljs = new HighlightJS();
export default hljs;
export { hljs };
`.trimStart();

  const code = `${banner}${rolled.trim()}\n${footer}`;
  fs.writeFileSync(outFile, code);

  const result = { file: filename };

  if (minify) {
    const minName = filename.replace(/\.js$/, '.min.js');
    const mini = await Terser.minify(code, {
      ...buildConfig.terser,
      module: true
    });
    fs.writeFileSync(path.join(process.env.BUILD_DIR, minName), mini.code);
    result.minFile = minName;
  }

  return result;
}

module.exports = { bundleCore };
