/*
Language: Fusion
TODO: add categories
 */

function (hljs) {
  var KEYWORDS = {
    keyword: 'prototype include namespace @process @position @ignoreProperties @context @allowEmpty @if',
    literal: 'true false null'
  };
  // Already added for future implementation, does not work atm

  var EEL_KEYWORDS = {
    keyword: 'Array Configuration Date Json Math Neos Caching Link Node Rendering Security String Translation Type',
    literal: 'true false null'
  }
  var NUMBER = {
    className: 'number',
    variants: [
      {begin: '\\b(0[bB][01]+)'},
      {begin: '\\b(0[oO][0-7]+)'},
      {begin: hljs.C_NUMBER_RE}
    ],
    relevance: 0
  };
  var STRING = {
    className: 'string',
    variants: [
      hljs.QUOTE_STRING_MODE,
      {begin: '\'', end: '[^\\\\]\''},
      {begin: '`', end: '`'},
    ]
  };

  var EEL = {
    begin: '\\$\\{', end: '\\}',
    subLanguage: 'javascript'
  };

  var FUSION_NAMESPACE = {
    className: 'built_in',
    begin: '\\w*\\.\\w*\\:(\\w*\\.?[a-zA-Z]*)*'
  };

  return {
    keywords: KEYWORDS,
    contains: [
      hljs.HASH_COMMENT_MODE,
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      NUMBER,
      STRING,
      FUSION_NAMESPACE,
      EEL
    ]
  };
}
