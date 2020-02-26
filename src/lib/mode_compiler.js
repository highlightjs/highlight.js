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

  function buildModeRegex(mode) {

    var matchIndexes = {};
    var matcherRe;
    var regexes = [];
    var matcher = {};
    var matchAt = 1;

    function addRule(rule, re) {
      matchIndexes[matchAt] = rule;
      regexes.push([rule, re]);
      matchAt += regex.countMatchGroups(re) + 1;
    }

    mode.contains.forEach(term => addRule(term, term.begin))

    if (mode.terminator_end)
      addRule("end", mode.terminator_end);
    if (mode.illegal)
      addRule("illegal", mode.illegal);

    var terminators = regexes.map(el => el[1]);
    matcherRe = langRe(regex.join(terminators, '|'), true);

    matcher.lastIndex = 0;
    matcher.exec = function(s) {
      var rule;

      if( regexes.length === 0) return null;

      matcherRe.lastIndex = matcher.lastIndex;
      var match = matcherRe.exec(s);
      if (!match) { return null; }

      for(var i = 0; i<match.length; i++) {
        if (match[i] != undefined && matchIndexes[i]) {
          rule = matchIndexes[i];
          break;
        }
      }

      // illegal or end match
      if (typeof rule === "string") {
        match.type = rule;
        match.extra = [mode.illegal, mode.terminator_end];
      } else {
        match.type = "begin";
        match.rule = rule;
      }
      return match;
    };

    return matcher;
  }

  function abortIf_preceedingOrTrailingDot(match) {
    let before = match.input[match.index-1];
    let after = match.input[match.index + match[0].length];
    if (before === "." || after === ".") {
      return true;
    }
  }

  function compileMode(mode, parent) {
    if (mode.compiled)
      return;
    mode.compiled = true;

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
        mode.__abortIf = abortIf_preceedingOrTrailingDot;
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
