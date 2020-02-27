import * as regex from './regex';
import { inherit } from './utils';

// keywords that should have no default relevance value
var COMMON_KEYWORDS = 'of and for in not or if then'.split(' ');

// compilation

export function compileLanguage(language) {

  function langRe(value, global) {
    return new RegExp(
      regex.source(value),
      'm' + (language.case_insensitive ? 'i' : '') + (global ? 'g' : '')
    );
  }

  class MultiMatcher {
    constructor() {
      this.matchIndexes = {};
      this.regexes = [];
      this.matchAt = 1;
    }

    addRule(re, opts) {
      this.matchIndexes[this.matchAt] = opts;
      this.regexes.push([opts, re]);
      this.matchAt += regex.countMatchGroups(re) + 1;
    }

    compile() {
      let terminators = this.regexes.map(el => el[1]);
      this.matcherRe = langRe(regex.join(terminators, '|'), true);
      this.lastIndex = 0;
    }

    exec(s) {
      var matchData;
      if (this.regexes.length === 0) return null;

      this.matcherRe.lastIndex = this.lastIndex;
      let match = this.matcherRe.exec(s);
      if (!match) { return null; }

      for(var i = 0; i<match.length; i++) {
        if (match[i] != undefined && this.matchIndexes[i]) {
          matchData = this.matchIndexes[i];
          break;
        }
      }

      return Object.assign(match, matchData);
    }
  }

  function buildModeRegex(mode) {

    let mm = new MultiMatcher();

    mode.contains.forEach(term => mm.addRule(term.begin, {rule: term, type: "begin" }))

    if (mode.terminator_end)
      mm.addRule(mode.terminator_end, {type: "end"} );
    if (mode.illegal)
      mm.addRule(mode.illegal, {type: "illegal"} );

    mm.compile();
    return mm;
  }

  // HACK: Abort vs ignore is technically broken. (See note below)
  // TODO: We need negative look-behind support to do this properly
  function hasPrecedingOrTrailingDot(match) {
    let before = match.input[match.index-1];
    let after = match.input[match.index + match[0].length];
    if (before === "." || after === ".") {
      return true;
    }
  }

  /** skip vs abort vs ignore
   *
   * @skip   - The mode is still entered and exited normally (and contains rules apply),
   *           but all content is held and added to the parent buffer rather than being
   *           output when the mode ends.  Mostly used with `sublanguage` to build up
   *           a single large buffer than can be parsed by sublanguage.
   *
   *             - The mode begin ands ends normally.
   *             - Content matched is added to the parent mode buffer.
   *             - The parser cursor is moved forward normally.
   *
   * @abort  - A hack placeholder until we have ignore.  Aborts the mode (as if it
   *           never matched) but DOES NOT continue to match subsequent `contains`
   *           modes.  Abort is bad/suboptimal because it can result in modes
   *           farther down not getting applied because an earlier rule eats the
   *           content but then aborts.
   *
   *             - The mode does not begin.
   *             - Content matched by `begin` is added to the mode buffer.
   *             - The parser cursor is moved forward accordingly.
   *
   * @ignore - Ignores the mode (as if it never matched) and continues to match any
   *           subsequent `contains` modes.  Ignore isn't technically possible with
   *           the current parser implementation.
   *
   *             - The mode does not begin.
   *             - Content matched by `begin` is ignored.
   *             - The parser cursor is not moved forward.
   */

  function compileMode(mode, parent) {
    if (mode.compiled)
      return;
    mode.compiled = true;

    // __abortIf is considered private API, internal use only
    mode.__abortIf = null;

    mode.keywords = mode.keywords || mode.beginKeywords;
    if (mode.keywords)
      mode.keywords = compileKeywords(mode.keywords, language.case_insensitive);

    mode.lexemesRe = langRe(mode.lexemes || /\w+/, true);

    if (parent) {
      if (mode.beginKeywords) {
        // for languages with keywords that include non-word characters checking for
        // a word boundary is not sufficient, so instead we check for a word boundary
        // or whitespace - this does no harm in any case since our keyword engine
        // doesn't allow spaces in keywords anyways and we still check for the boundary
        // first
        mode.begin = '\\b(' + mode.beginKeywords.split(' ').join('|') + ')(?=\\b|\\s)';
        mode.__abortIf = hasPrecedingOrTrailingDot;
      }
      if (!mode.begin)
        mode.begin = /\B|\b/;
      mode.beginRe = langRe(mode.begin);
      if (mode.endSameAsBegin)
        mode.end = mode.begin;
      if (!mode.end && !mode.endsWithParent)
        mode.end = /\B|\b/;
      if (mode.end)
        mode.endRe = langRe(mode.end);
      mode.terminator_end = regex.source(mode.end) || '';
      if (mode.endsWithParent && parent.terminator_end)
        mode.terminator_end += (mode.end ? '|' : '') + parent.terminator_end;
    }
    if (mode.illegal)
      mode.illegalRe = langRe(mode.illegal);
    if (mode.relevance == null)
      mode.relevance = 1;
    if (!mode.contains) {
      mode.contains = [];
    }
    mode.contains = [].concat(...mode.contains.map(function(c) {
      return expand_or_clone_mode(c === 'self' ? mode : c);
    }));
    mode.contains.forEach(function(c) {compileMode(c, mode);});

    if (mode.starts) {
      compileMode(mode.starts, parent);
    }

    mode.terminators = buildModeRegex(mode);
  }

  // self is not valid at the top-level
  if (language.contains && language.contains.includes('self')) {
    throw new Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.")
  }
  compileMode(language);
}

function dependencyOnParent(mode) {
  if (!mode) return false;

  return mode.endsWithParent || dependencyOnParent(mode.starts);
}

function expand_or_clone_mode(mode) {
  if (mode.variants && !mode.cached_variants) {
    mode.cached_variants = mode.variants.map(function(variant) {
      return inherit(mode, {variants: null}, variant);
    });
  }

  // EXPAND
  // if we have variants then essentially "replace" the mode with the variants
  // this happens in compileMode, where this function is called from
  if (mode.cached_variants)
    return mode.cached_variants;

  // CLONE
  // if we have dependencies on parents then we need a unique
  // instance of ourselves, so we can be reused with many
  // different parents without issue
  if (dependencyOnParent(mode))
    return inherit(mode, { starts: mode.starts ? inherit(mode.starts) : null });

  if (Object.isFrozen(mode))
    return inherit(mode);

  // no special dependency issues, just return ourselves
  return mode;
}


// keywords

function compileKeywords(rawKeywords, case_insensitive) {
  var compiled_keywords = {};

  if (typeof rawKeywords === 'string') { // string
    splitAndCompile('keyword', rawKeywords);
  } else {
    Object.keys(rawKeywords).forEach(function (className) {
      splitAndCompile(className, rawKeywords[className]);
    });
  }
return compiled_keywords;

// ---

function splitAndCompile(className, str) {
  if (case_insensitive) {
    str = str.toLowerCase();
  }
  str.split(' ').forEach(function(keyword) {
    var pair = keyword.split('|');
    compiled_keywords[pair[0]] = [className, scoreForKeyword(pair[0], pair[1])];
  });
}
}

function scoreForKeyword(keyword, providedScore) {
// manual scores always win over common keywords
// so you can force a score of 1 if you really insist
if (providedScore)
  return Number(providedScore);

return commonKeyword(keyword) ? 0 : 1;
}

function commonKeyword(word) {
return COMMON_KEYWORDS.includes(word.toLowerCase());
}
