/*
Language: Fusion
Requires: javascript.js
Author: Marcel Tams <marcel.tams@networkteam.com>
Contributors: suffle
Description: Highlighting for Fusion which is part of Neos CMS (https://neos.io)
*/

function (hljs) {
  var KEYWORDS = {
    keyword: 'prototype include namespace @process @position @ignoreProperties @context @allowEmpty @if @cache ' +
        '@exceptionHandler ',
    literal: 'true false null'
  };

  // Already added for future implementation. The recognition of Eel keywords does not work right now.
  var EEL_KEYWORDS = {
    keyword: 'Array Configuration Date Json Math Neos Caching Link Node Rendering Security String Translation Type',
    literal: 'true false null'
  };
  var NUMBER = {
    className: 'number',
    variants: [
      {begin: '\\b(0[bB][01]+)'},
      {begin: '\\b(0[oO][0-7]+)'},
      {begin: hljs.C_NUMBER_RE}
    ]
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
    begin: '\\$\\{',
    end: '}(?!.)',
    subLanguage: 'javascript',
      keywords: EEL_KEYWORDS,
      relevance: 1
  };

  var FUSION_NAMESPACE = {
    className: 'built_in',
    begin: '\\w*\\.\\w*\\:(\\w*\\.?[a-zA-Z]*)*',
      relevance: 20
  };

  var NEOS_FUSION_NAMESPACE = {
    className: 'built_in',
    begin: 'Neos\\.(Fusion||Neos)\\:(\\w*\\.?[a-zA-Z]*)*',
      relevance: 100,
  };

  var PROTOTYPE_INHERITANCE = {
	  className: 'built_in',
	  begin: 'prototype\\((\\w*\\.\\w*\\:(\\w*\\.?[a-zA-Z]*)*)\\) \\< prototype\\((\\w*\\.\\w*\\:(\\w*\\.?[a-zA-Z]*)*)\\)',
      relevance: 20,
      keywords: EEL_KEYWORDS
  };

  var PROTOTYPE_DECLARATION = {
    className: 'built_in',
      begin: 'prototype\\(',
      end: '\\)\\s\\{',
      contains: [FUSION_NAMESPACE, NEOS_FUSION_NAMESPACE],
      relevance: 10
  };

  return {
    keywords: KEYWORDS,
    case_insensitive: false,
    contains: [
      hljs.HASH_COMMENT_MODE,
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      FUSION_NAMESPACE,
      NEOS_FUSION_NAMESPACE,
      PROTOTYPE_INHERITANCE,
      PROTOTYPE_DECLARATION,
      EEL,
      NUMBER,
      STRING,
    ]
  };
}
