/*
Language: Scala
Author: Jan Berkel <jan.berkel@gmail.com>
*/

hljs.LANGUAGES.scala  = {
  defaultMode: {
    lexems: [hljs.UNDERSCORE_IDENT_RE],
    contains: ['javadoc', 'comment', 'string', 'class', 'number', 'annotation'],
    keywords: { 'type': 1, 'yield': 1, 'lazy': 1, 'override': 1, 'def': 1, 'with': 1, 'val':1, 'var': 1, 'false': 1, 'true': 1, 'sealed': 1, 'abstract': 1, 'private': 1, 'trait': 1,  'object': 1, 'null': 1, 'if': 1, 'for': 1, 'while': 1, 'throw': 1, 'finally': 1, 'protected': 1, 'extends': 1, 'import': 1, 'final': 1, 'return': 1, 'else': 1, 'break': 1, 'new': 1, 'catch': 1, 'super': 1, 'class': 1, 'case': 1,'package': 1, 'default': 1, 'try': 1, 'this': 1, 'match': 1, 'continue': 1, 'throws': 1}
  },
  modes: [
    {
      className: 'class',
      lexems: [hljs.UNDERSCORE_IDENT_RE],
      begin: '((case )?class |object |trait )', end: '({|$)',
      illegal: ':',
      keywords: {'case' : 1, 'class': 1, 'trait': 1, 'object': 1},
      contains: [
        {
          begin: '(extends|with)', end: hljs.IMMEDIATE_RE,
          lexems: [hljs.IDENT_RE],
          keywords: {'extends': 1, 'with': 1},
          relevance: 10
        },
        {
          className: 'title',
          begin: hljs.UNDERSCORE_IDENT_RE, end: hljs.IMMEDIATE_RE
        },
        {
          className: 'params',
          begin: '\\(', end: '\\)',
          contains: ['string', 'annotation']
        }
      ]
    },
    hljs.C_NUMBER_MODE,
    hljs.APOS_STRING_MODE,
    hljs.QUOTE_STRING_MODE,
    hljs.C_LINE_COMMENT_MODE,
    {
      className: 'javadoc',
      begin: '/\\*\\*', end: '\\*/',
      contains: [{
        className: 'javadoctag',
        begin: '@[A-Za-z]+', end: hljs.IMMEDIATE_RE
      }],
      relevance: 10
    },
    hljs.C_BLOCK_COMMENT_MODE,
    {
      className: 'annotation',
      begin: '@[A-Za-z]+', end: hljs.IMMEDIATE_RE
    },
    {
      className: 'string',
      begin: 'u?r?"""', end: '"""',
      relevance: 10
    }
  ]
};
