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
 * @type {CompilerExt}
 */
export function compileIllegal(mode, _parent) {
  if (!Array.isArray(mode.illegal)) return;

  mode.illegal = regex.either(...mode.illegal);
}

/**
 * `match` to match a single expression for readability
 * @type {CompilerExt}
 */
export function compileMatch(mode, _parent) {
  if (!mode.match) return;
  if (mode.begin || mode.end) throw new Error("begin & end are not supported with match");

  mode.begin = mode.match;
  delete mode.match;
}

/**
 * provides the default 1 relevance to all modes
 * @type {CompilerExt}
 */
export function compileRelevance(mode, _parent) {
  // eslint-disable-next-line no-undefined
  if (mode.relevance === undefined) mode.relevance = 1;
}
