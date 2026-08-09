'use strict';

const { emitThemes } = require('./emit_themes.js');
const { emitLanguages } = require('./emit_languages.js');
const { bundleCore } = require('./bundle_core.js');

module.exports = {
  emitThemes,
  emitLanguages,
  bundleCore
};
