'use strict';

const fs = require('fs');
const path = require('path');
const glob = require('glob');
const { install, installCleanCSS, mkdir } = require('../lib/makestuff.js');

const SRC_THEMES = path.join(path.dirname(path.dirname(__dirname)), 'src', 'themes');

/**
 * Emit themes into BUILD_DIR/themes/** (same shape as legacy node/cdn).
 * CSS: pretty + .min.css via CleanCSS (includes default .hljs chrome).
 * Non-CSS (images, etc.): copied as-is.
 *
 * @returns {{ css: number, other: number }}
 */
function emitThemes() {
  if (!process.env.BUILD_DIR) {
    throw new Error('emitThemes requires process.env.BUILD_DIR');
  }

  mkdir('themes');
  mkdir('themes/base16');

  let css = 0;
  let other = 0;

  glob.sync('**', { cwd: SRC_THEMES }).forEach((file) => {
    const srcPath = path.join(SRC_THEMES, file);
    if (fs.statSync(srcPath).isDirectory()) return;

    if (file.endsWith('.css')) {
      installCleanCSS(srcPath, `themes/${file}`, { minify: false });
      installCleanCSS(srcPath, `themes/${file.replace(/\.css$/, '.min.css')}`, { minify: true });
      css += 1;
    } else {
      install(srcPath, `themes/${file}`);
      other += 1;
    }
  });

  return { css, other };
}

module.exports = { emitThemes };
