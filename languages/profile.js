/*

Python profiler results (c) Brian Beck <exogen@gmail.com>

*/
LANGUAGES.profile = {
  defaultMode: {
    lexems: [UNDERSCORE_IDENT_RE],
    contains: ['number', 'builtin', 'filename', 'header', 'summary', 'string', 'function']
  },
  modes: [
    C_NUMBER_MODE,
    APOS_STRING_MODE,
    QUOTE_STRING_MODE,
    {
      className: 'summary',
      begin: 'function calls', end: '$',
      contains: ['number'],
      relevance: 10
    },
    {
      className: 'header',
      begin: '(ncalls|tottime|cumtime)', end: '$',
      lexems: [IDENT_RE],
      keywords: {'ncalls': 1, 'tottime': 10, 'cumtime': 10, 'filename': 1},
      relevance: 10
    },
    {
      className: 'function',
      begin: '\\(', end: '\\)',
      lexems: [UNDERSCORE_IDENT_RE],
      contains: ['title']
    },
    {
      className: 'title',
      begin: UNDERSCORE_IDENT_RE, end: '^'
    },
    {
      className: 'builtin',
      begin: '{', end: '}',
      contains: ['string'],
      excludeBegin: true, excludeEnd: true
    },
    {
      className: 'filename',
      begin: '(/\w|[a-zA-Z_][\da-zA-Z_]+\\.[\da-zA-Z_]{1,3})', end: ':',
      excludeEnd: true
    }
  ]
};//profile