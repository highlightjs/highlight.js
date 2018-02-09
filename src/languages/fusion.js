/*
Language: Fusion
TODO: add categories
 */

function (hljs) {
  var KEYWORDS = {
    keyword: 'prototype include namespace',
    literal: 'true false null'
  };
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
    className: 'variable',
    begin: '\\$\\{', end: '\\}',
    keywords: KEYWORDS,
    contains: [
      hljs.APOS_STRING_MODE,
      hljs.QUOTE_STRING_MODE,
    ]
  };

  var FUSION_NAMESPACE = {
    className: 'built_in',
    begin: '[a-zA-Z]*\\.[a-zA-Z]*\\:[a-zA-Z]*\\.?[a-zA-Z]*'
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