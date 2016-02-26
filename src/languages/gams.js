
/*
 Language: GAMS
 Author: Stefan Bechert <stefan.bechert@gmx.net>
 Contributors: Oleg Efimov <efimovov@gmail.com>, Mikko Kouhia <mikko.kouhia@iki.fi>
 Description: The General Algebraic Modeling System language
 Category: scientific
 */

function (hljs) {
  var KEYWORDS =
    'abort acronym acronyms alias all and assign binary card diag display else eps eq equation equations file files ' +
    'for free ge gt if inf integer le loop lt maximizing minimizing model models na ne negative no not option ' +
    'options or ord parameter parameters positive prod putpage puttl repeat sameas scalar scalars semicont semiint ' +
    'set sets smax smin solve sos1 sos2 sum system table then until using variable variables while xor yes';
  var PARAMS = {
    className: 'params',
    begin: /\(/, end: /\)/,
    excludeBegin: true,
    excludeEnd: true,
  };
  var SYMBOLS = {
    className: 'symbol',
    variants: [
      {begin: /\=[lgenxc]=/},
      {begin: /\$/},
    ]
  };
  var COMMSTR = {
    className: 'comment',
    variants: [
      {begin: '\'', end: '\''},
      {begin: '"', end: '"'},
    ],
    illegal: '\\n',
    contains: [hljs.BACKSLASH_ESCAPE]
  };
  var ASSIGNMENT = {
    className: 'number',
    begin: '/',
    end: '/',
    // contains: [COMMSTR],
  };
  var DESCTEXT = { // Parameter/set/variable description text
    begin: /[a-z][a-z0-9_]*(\([a-z0-9_, ]*\))?[ \t]+/,
    excludeBegin: true,
    end: '$',
    endsWithParent: true,
    contains: [
      COMMSTR,
      ASSIGNMENT,
      {
        className: 'comment',
        variants: [
          {begin: /([ ]*[a-z0-9&#*=?@>\\<:\-,()$\[\]_.{}!+%^]+)+/},
        ],
      },
    ],
  };

  return {
    aliases: ['gms'],
    case_insensitive: true,
    keywords: KEYWORDS,
    contains: [
      hljs.COMMENT(/^\$ontext/, /^\$offtext/),
      {
        className: 'meta',
        begin: '^\\$[a-z0-9]+',
        end: '$',
        returnBegin: true,
        contains: [
          {
            className: 'meta-keyword',
            begin: '^\\$[a-z0-9]+',
          }
        ]
      },
      hljs.COMMENT('^\\*', '$'),
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      hljs.QUOTE_STRING_MODE,
      hljs.APOS_STRING_MODE,
      // Declarations
      {
        beginKeywords:
          'set sets parameter parameters variable variables ' +
          'scalar scalars equation equations',
        end: ';',
        contains: [
          hljs.QUOTE_STRING_MODE,
          hljs.APOS_STRING_MODE,
          ASSIGNMENT,
          DESCTEXT,
        ]
      },
      { // table environment
        beginKeywords: 'table',
        end: ';',
        returnBegin: true,
        contains: [
          { // table header row
            beginKeywords: 'table',
            end: '$',
            contains: [
              hljs.QUOTE_STRING_MODE,
              hljs.APOS_STRING_MODE,
              DESCTEXT,
            ],
          },
          hljs.C_NUMBER_MODE,
        ]
      },
      // Function definitions
      {
        className: 'function',
        begin: /^[a-z][a-z0-9_, ()$]+\.{2}/,
        end: ';',
        keywords: KEYWORDS,
        returnBegin: true,
        contains: [
          { // Function headline
            begin: /^[a-z][a-z0-9_]*/,
            returnBegin: true,
            returnEnd: true,
            end: /\.{2}/,
            contains: [
              { // Function title
                className: 'title',
                begin: /[a-z][a-z0-9_]+(?![^(]*\))/,
              },
              PARAMS,
              SYMBOLS,
            ],
          },
          SYMBOLS,
          hljs.C_NUMBER_MODE,
        ],
      },
      {
        beginKeywords: 'model',
        end: ';',
        contains: [
          COMMSTR,
          {
            className: 'number',
            begin: '/',
            end: '/',
            keywords: 'all',
          },
        ],
      },
      hljs.C_NUMBER_MODE,
      // ASSIGNMENT,
      SYMBOLS,
      {
        className: 'meta',
        begin: /\.(lo|up|fx|l|m|scale|prior)/,
      },
    ]
  };
}

