/*
Language: Python profile
Description: Python profiler results
Author: Brian Beck <exogen@gmail.com>
*/

hljs.LANGUAGES.profile = {
  defaultMode: {
    lexems: [hljs.UNDERSCORE_IDENT_RE],
    contains: ['number', 'builtin', 'filename', 'header', 'summary', 'string', 'function']
  },
  modes: [
    hljs.C_NUMBER_MODE,
    hljs.APOS_STRING_MODE,
    hljs.QUOTE_STRING_MODE,
    hljs.BACKSLASH_ESCAPE,
    {
      className: 'summary',
      begin: 'function calls', end: '$',
      contains: ['number'],
      relevance: 10
    },
    {
      className: 'header',
      begin: '(ncalls|tottime|cumtime)', end: '$',
      lexems: [hljs.IDENT_RE],
      keywords: {'ncalls': 1, 'tottime': 10, 'cumtime': 10, 'filename': 1},
      relevance: 10
    },
    {
      className: 'function',
      begin: '\\(', end: '\\)$',
      lexems: [hljs.UNDERSCORE_IDENT_RE],
      contains: [{
        className: 'title',
        begin: hljs.UNDERSCORE_IDENT_RE, end: hljs.IMMEDIATE_RE,
        relevance: 0
      }],
      relevance: 0
    },
    {
      className: 'builtin',
      begin: '{', end: '}$',
      contains: ['string'],
      excludeBegin: true, excludeEnd: true,
      relevance: 0
    },
    {
      className: 'filename',
      begin: '(/\w|[a-zA-Z_][\da-zA-Z_]+\\.[\da-zA-Z_]{1,3})', end: ':',
      excludeEnd: true
    }
  ]
};
