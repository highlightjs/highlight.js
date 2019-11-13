/*
Language: Sentinel
Author: Chris Marchesi <chrism@vancluevertech.com>
Description: Sentinel, HashiCorp's policy as code language
Website: https://docs.hashicorp.com/sentinel
*/

/**
 * Adapted from the Go language support (src/languages/go.js):
 *   Author: Stephan Kountso aka StepLg <steplg@gmail.com>
 *   Contributors: Evgeny Stepanischev <imbolk@gmail.com>
 */

function(hljs) {
  var SENTINEL_KEYWORDS = {
    keyword:
      'as default func rule return break continue when if case for any all import param',
    literal: 'true false null undefined',
    built_in:
      'append delete error keys length print range values int float string bool'
  };
  return {
    aliases: ['sentinel'],
    keywords: SENTINEL_KEYWORDS,
    illegal: '</',
    contains: [
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      hljs.COMMENT("#", "$"),
      {
        className: 'string',
        variants: [hljs.QUOTE_STRING_MODE, { begin: '`', end: '`' }]
      },
      {
        className: 'number',
        variants: [
          { begin: hljs.C_NUMBER_RE + '[i]', relevance: 1 },
          hljs.C_NUMBER_MODE
        ]
      },
      {
        className: 'function',
        beginKeywords: 'func',
        end: '\\w*(\\{|$)',
        excludeEnd: true,
        contains: [
          hljs.TITLE_MODE,
          {
            className: 'params',
            begin: /\(/,
            end: /\)/,
            keywords: SENTINEL_KEYWORDS,
            illegal: /["']/
          }
        ]
      },
      {
        // only highlight else when it's a label (not an operator)
        begin: /else\s*:/,
        keywords: 'else',
      },
      {
        // hack: prevents detection of keywords after dots - adapted
        // from old hljs JS support.
        begin: '\\.' + hljs.IDENT_RE,
        relevance: 0
      },
    ]
  };
}
