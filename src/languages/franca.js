/*
Language: Franca IDL
Author: Klaus Birken <klaus.birken@gmail.com>
Category: common, idl
*/

function(hljs) {
  var GENERIC_IDENT_RE = hljs.UNDERSCORE_IDENT_RE + '(<' + hljs.UNDERSCORE_IDENT_RE + '(\\s*,\\s*' + hljs.UNDERSCORE_IDENT_RE + ')*>)?';
  var KEYWORDS =
    'package import model from typeCollection interface ' +
    'version major minor ' +
    'attribute method broadcast in out error ' +
    'readonly noSubscriptions fireAndForget selective manages ' +
    'array of struct union typedef is map to enumeration extends polymorphic ' +
    'Int8 UInt8 Int16 UInt16 Int32 UInt32 Int64 UInt64 Integer minInt maxInt ' +
    'Boolean String Float Double ByteBuffer const true false ' +
    'contract PSM vars state transition initial call respond signal set update';

  var FRANCA_NUMBER_RE = '\\b' +
    '(' +
      '0[bB]([01]+[01_]+[01]+|[01]+)' + // 0b...
      '|' +
      '0[xX]([a-fA-F0-9]+[a-fA-F0-9_]+[a-fA-F0-9]+|[a-fA-F0-9]+)' + // 0x...
      '|' +
      '(' +
        '([\\d]+[\\d_]+[\\d]+|[\\d]+)(\\.([\\d]+[\\d_]+[\\d]+|[\\d]+))?' +
        '|' +
        '\\.([\\d]+[\\d_]+[\\d]+|[\\d]+)' +
      ')' +
      '([eE][-+]?\\d+)?' + // octal, decimal, float
    ')' +
    '[lLfF]?';
  var FRANCA_NUMBER_MODE = {
    className: 'number',
    begin: FRANCA_NUMBER_RE,
    relevance: 0
  };

  var COMMENTS = [
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      hljs.COMMENT(
        '<\\*\\*',
        '\\*\\*>',
        {
          relevance : 0
        }
      ),
      hljs.COMMENT(
        '/\\*\\*',
        '\\*/',
        {
          relevance : 0
        }
      )
  ];
  
  return {
    keywords: KEYWORDS,
    illegal: /<\/|#/,
    contains: [
      hljs.APOS_STRING_MODE,
      hljs.QUOTE_STRING_MODE,
      {
        className: 'interface',
        beginKeywords: 'interface typeCollection', end: /[{;=]/, excludeEnd: true,
        keywords: 'interface typeCollection',
        illegal: /[:"\[\]]/,
        contains: [
          {beginKeywords: 'extends implements'},
          hljs.UNDERSCORE_TITLE_MODE
        ]
      },
      /*
      {
        className: 'function',
        begin: '(' + GENERIC_IDENT_RE + '\\s+)+' + hljs.UNDERSCORE_IDENT_RE + '\\s*\\(', returnBegin: true, end: /[{;=]/,
        excludeEnd: true,
        keywords: KEYWORDS,
        contains: [
          {
            begin: hljs.UNDERSCORE_IDENT_RE + '\\s*\\(', returnBegin: true,
            relevance: 0,
            contains: [hljs.UNDERSCORE_TITLE_MODE]
          },
          {
            className: 'params',
            begin: /\(/, end: /\)/,
            keywords: KEYWORDS,
            relevance: 0,
            contains: [
              hljs.APOS_STRING_MODE,
              hljs.QUOTE_STRING_MODE,
              hljs.C_NUMBER_MODE,
              hljs.C_BLOCK_COMMENT_MODE
            ]
          },
          hljs.C_LINE_COMMENT_MODE,
          hljs.C_BLOCK_COMMENT_MODE
        ]
      },
      */
      FRANCA_NUMBER_MODE,
      {
        className: 'meta', begin: '@[A-Za-z]+'
      }
    ].concat(COMMENTS)
  };
}
