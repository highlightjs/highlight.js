import * as regex from './regex.js';

// Grammar extensions / plugins
// See: https://github.com/highlightjs/highlight.js/issues/2833

// Grammar extensions allow "syntactic sugar" to be added to the grammar modes
// without requiring any underlying changes to the compiler internals.

// `compileMatch` being the perfect small example of now allowing a grammar
// author to write `match` when they desire to match a single expression rather
// than being forced to use `begin`.  The extension then just moves `match` into
// `begin` when it runs.  Ie, no features have been added, but we've just made
// the experience of writing (and reading grammars) a little bit nicer.

/**
 * Allow `illegal` to contain an array of illegal values
 *
 * @param {Mode} mode
 * @param {Language | Mode} _parent
 */
function compileIllegal(mode, _parent) {
  if (!Array.isArray(mode.illegal)) return;

  mode.illegal = regex.either(mode.illegal);
}

/**
 * `match` to match a single expression for readability
 *
 * @param {Mode} mode
 * @param {Language | Mode} _parent
 */
function compileMatch(mode, _parent) {
  if (!mode.match) return;
  if (mode.begin || mode.end) throw new Error("begin & end are not supported with match");

  mode.begin = mode.match;
  delete mode.match;
}

const EARLY = [
  // do this early so compiler extensions generally don't have to worry about
  // the distinction between match/begin
  compileMatch
];

const LAST = [
  // do this last so compiler extensions that come earlier have access to the
  // raw array if they wanted to perhaps manipulate it, etc.
  compileIllegal
];

export { EARLY, LAST };
