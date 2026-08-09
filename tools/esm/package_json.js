'use strict';

const fs = require('fs');
const path = require('path');
const { install, mkdir } = require('../lib/makestuff.js');

const ROOT = path.dirname(path.dirname(__dirname));

const NPM_DOC_FILES = [
  'LICENSE',
  'README.md',
  'VERSION_11_UPGRADE.md',
  'VERSION_12_UPGRADE.md',
  'SUPPORTED_LANGUAGES.md',
  'SECURITY.md',
  'CHANGES.md'
];

/**
 * ESM package exports (core + languages + themes). No CJS conditions.
 */
function generateExports() {
  return {
    '.': {
      types: './types/index.d.ts',
      import: './highlight.js',
      default: './highlight.js'
    },
    './package.json': './package.json',
    './highlight.js': {
      types: './types/index.d.ts',
      import: './highlight.js',
      default: './highlight.js'
    },
    './languages/*': './languages/*.js',
    './languages/*.js': './languages/*.js',
    './languages.json': './languages.json',
    './themes/*': './themes/*',
    './types/*': './types/*'
  };
}

/**
 * @param {{ mode: 'npm' | 'cdn' }} options
 * @returns {object}
 */
function buildPackageJSON(options) {
  const src = JSON.parse(fs.readFileSync(path.join(ROOT, 'package.json'), 'utf8'));
  const mode = options.mode || 'npm';

  const pkg = {
    name: src.name,
    description: src.description,
    keywords: src.keywords,
    homepage: src.homepage,
    version: src.version,
    author: src.author,
    contributors: src.contributors,
    bugs: src.bugs,
    license: src.license,
    repository: src.repository,
    type: 'module',
    sideEffects: ['*.css']
  };

  if (mode === 'cdn') {
    pkg.name = '@highlightjs/cdn-assets';
    pkg.description = `${src.description} (pre-compiled CDN assets)`;
    // CDN consumers load files by URL; no Node export map required.
    return pkg;
  }

  pkg.exports = generateExports();
  pkg.types = './types/index.d.ts';
  // Prefer import; avoid CJS main
  pkg.module = './highlight.js';
  pkg.engines = src.engines;

  return pkg;
}

/**
 * Write package.json and supporting package files into BUILD_DIR.
 *
 * @param {{ mode: 'npm' | 'cdn' }} options
 */
function emitPackage(options = {}) {
  if (!process.env.BUILD_DIR) {
    throw new Error('emitPackage requires process.env.BUILD_DIR');
  }

  const mode = options.mode || 'npm';
  const pkg = buildPackageJSON({ mode });
  fs.writeFileSync(
    path.join(process.env.BUILD_DIR, 'package.json'),
    `${JSON.stringify(pkg, null, 2)}\n`
  );

  if (mode === 'cdn') {
    if (fs.existsSync(path.join(ROOT, 'README.CDN.md'))) {
      install(path.join(ROOT, 'README.CDN.md'), 'README.md');
    }
    if (fs.existsSync(path.join(ROOT, 'LICENSE'))) {
      install(path.join(ROOT, 'LICENSE'), 'LICENSE');
    }
    return pkg;
  }

  for (const file of NPM_DOC_FILES) {
    const full = path.join(ROOT, file);
    if (fs.existsSync(full)) {
      install(full, file);
    }
  }

  mkdir('types');
  const typesDir = path.join(ROOT, 'types');
  if (fs.existsSync(typesDir)) {
    for (const name of fs.readdirSync(typesDir)) {
      const full = path.join(typesDir, name);
      if (fs.statSync(full).isFile()) {
        install(full, `types/${name}`);
      }
    }
  }

  // Core-oriented d.ts used by some consumers / older paths
  const coreDts = path.join(ROOT, 'src', 'core.d.ts');
  if (fs.existsSync(coreDts)) {
    install(coreDts, 'highlight.d.ts');
  }

  return pkg;
}

module.exports = {
  buildPackageJSON,
  generateExports,
  emitPackage
};
