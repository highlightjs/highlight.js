/*
Language: Franca Deployment Models (fdepl)
Author: Klaus Birken <klaus.birken@gmail.com>
Category: common, idl
*/

function(hljs) {
  var GENERIC_IDENT_RE = hljs.UNDERSCORE_IDENT_RE + '(<' + hljs.UNDERSCORE_IDENT_RE + '(\\s*,\\s*' + hljs.UNDERSCORE_IDENT_RE + ')*>)?';
  var KEYWORDS =
    'import specification extends for optional default ' +
    'providers instances interfaces type_collections ' +
    'attributes methods broadcasts arguments ' +
    'structs struct_fields unions union_fields ' +
    'arrays enumerations enumerators typedefs ' +
    'strings numbers integers floats ' + 
    'booleans byte_buffers ' +
    'Boolean Integer String Interface ' + 
    'define provider instance interface ' +
    'attribute method broadcast in out ' +
    'array struct enumeration ' +
    'false true';

  var FDEPL_NUMBER_RE = '\\b' +
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
  var FDEPL_NUMBER_MODE = {
    className: 'number',
    begin: FDEPL_NUMBER_RE,
    relevance: 0
  };

  return {
    keywords: KEYWORDS,
    illegal: /<\/|#/,
    contains: [
      hljs.COMMENT(
        '/\\*\\*',
        '\\*/',
        {
          relevance : 0
        }
      ),
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      hljs.APOS_STRING_MODE,
      hljs.QUOTE_STRING_MODE,
      /*
      {
        className: 'specification',
        beginKeywords: 'specification define', end: /[{;=]/, excludeEnd: true,
        keywords: 'specification define',
        illegal: /[:"\[\]]/,
        contains: [
          {beginKeywords: ''},
          hljs.UNDERSCORE_TITLE_MODE
        ]
      },
      */
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
      FDEPL_NUMBER_MODE,
      {
        className: 'meta', begin: '@[A-Za-z]+'
      }
    ]
  };
}
