/*
Language: Java
Author: Vsevolod Solovyov <vsevolod.solovyov@gmail.com>
*/

function(hljs) {
  var KEYWORDS =
    'false synchronized int abstract float private char boolean static null if const ' +
    'for true while long throw strictfp finally protected import native final return void ' +
    'enum else break transient new catch instanceof byte super volatile case assert short ' +
    'package default double public try this switch continue throws';
  return {
    keywords: KEYWORDS,
    illegal: /<\//,
    contains: [
      {
        className: 'javadoc',
        begin: '/\\*\\*', end: '\\*/',
        contains: [{
          className: 'javadoctag', begin: '(^|\\s)@[A-Za-z]+'
        }],
        relevance: 10
      },
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      hljs.APOS_STRING_MODE,
      hljs.QUOTE_STRING_MODE,
      {
        beginKeywords: 'protected public private', end: /[{;=]/,
        keywords: KEYWORDS,
        contains: [
          {
            className: 'class',
            beginKeywords: 'class interface', endsWithParent: true, excludeEnd: true,
            illegal: /[:"<>]/,
            contains: [
              {
                beginKeywords: 'extends implements',
                relevance: 10
              },
              hljs.UNDERSCORE_TITLE_MODE
            ]
          },
          {
            begin: hljs.UNDERSCORE_IDENT_RE + '\\s*\\(', returnBegin: true,
            contains: [
              hljs.UNDERSCORE_TITLE_MODE
            ]
          }
        ]
      },
      hljs.C_NUMBER_MODE,
      {
        className: 'annotation', begin: '@[A-Za-z]+'
      }
    ]
  };
}
