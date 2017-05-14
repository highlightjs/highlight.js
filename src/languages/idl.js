/*
Language: OMG IDL
Author: Brahim Djoudi <br.djoudi@gmail.com>
Category: protocols
*/

function(hljs) {

  var STRINGS = {
    className: 'string',
    variants: [
      {
        begin: '"', end: '"',
        illegal: '\\n',
        contains: [hljs.BACKSLASH_ESCAPE]
      }
    ]
  };

  var NUMBERS = {
    className: 'number',
    variants: [
      { begin: '(-?)(\\b0[xX][a-fA-F0-9\']+|(\\b[\\d\']+(\\.[\\d\']*)?|\\.[\\d\']+)([eE][-+]?[\\d\']+)?)' }
    ],
    relevance: 0
  };

  var PREPROCESSOR =       {
    className: 'meta',
    begin: /#\s*[a-z]+\b/, end: /$/,
    keywords: {
      'meta-keyword':
        'if else elif endif define undef warning error line pragma ifdef ifndef include'
    },
    contains: [
      {
        begin: /\\\n/, relevance: 0
      },
      hljs.inherit(STRINGS, {className: 'meta-string'}),
      {
        className: 'meta-string',
        begin: /<[^\n>]*>/, end: /$/,
        illegal: '\\n',
      },
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE
    ]
  };

  var IDL_KEYWORDS = {
    keyword: 'any attribute boolean case char const context ' +
      'default double enum exception float in ' +
      'inout interface long module octet oneway ' +
      'out raises readonly sequence short string struct ' +
      'switch typedef unsigned union void ',
    built_in: 'Object',
    literal: 'TRUE FALSE'
  };

  var EXPRESSION_CONTAINS = [
    hljs.C_LINE_COMMENT_MODE,
    hljs.C_BLOCK_COMMENT_MODE,
    NUMBERS,
    STRINGS
  ];

  return {
    aliases: ['idl'],
    keywords: IDL_KEYWORDS,
    contains: EXPRESSION_CONTAINS.concat([
      PREPROCESSOR,
      {
        className: 'module',
        beginKeywords: 'module', end: /[{;]/,
        contains: [ hljs.TITLE_MODE ]
    },
    {
        className: 'entity',
        beginKeywords: 'interface struct union exception enum', end: /[{;:]/,
        contains: [ hljs.TITLE_MODE ]
    }
    ]),
    exports: {
      preprocessor: PREPROCESSOR,
      strings: STRINGS,
      keywords: IDL_KEYWORDS
    }
  };
}
