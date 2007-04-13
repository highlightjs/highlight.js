/*

Ruby definition (с) Anton Kovalyov <anton@kovalyov.net>

*/
LANGUAGES.ruby = {
  defaultMode: {
    lexems: [UNDERSCORE_IDENT_RE],
    contains: ['comment', 'string', 'class', 'function', 'symbol'],
    keywords: {'and': 1, 'false': 1, 'then': 1, 'defined': 1, 'module': 1, 'in': 1, 'return': 1, 'redo': 1, 'if': 1, 'BEGIN': 1, 'retry': 1, 'end': 1, 'for': 1, 'true': 1, 'self': 1, 'when': 1, 'next': 1, 'until': 1, 'do': 1, 'begin': 1, 'unless': 1, 'END': 1, 'rescue': 1, 'nil': 1, 'else': 1, 'break': 1, 'undef': 1, 'not': 1, 'super': 1, 'class': 1, 'case': 1, 'require': 1, 'yield': 1, 'alias': 1, 'while': 1, 'ensure': 1, 'elsif': 1, 'or': 1, 'def': 1}
  },
  modes: [
    HASH_COMMENT_MODE,
    {
      className: 'comment',
      begin: '^\\=begin', end: '^\\=end',
      relevance: 10
    },
    {
      className: 'string',
      begin: '\'', end: '(^|[^\\\\])\'',
      contains: ['subst'],
      relevance: 0
    },
    {
      className: 'string',
      begin: '"', end: '(^|[^\\\\])"',
      contains: ['subst'],
      relevance: 0
    },
    {
      className: 'subst',
      begin: '#\\{', end: '\}',
      contains: ['string'],
      relevance: 10
    },
    {
      className: 'function',
      lexems: [IDENT_RE],
      begin: 'def ', end: '$',
      illegal: '[{\\:]',
      keywords: {'def': 1},
      contains: ['title', 'comment'],
      relevance: 10
    },    
    { 
      className: 'class',
      lexems: [IDENT_RE],
      begin: 'class ', end: '$',
      illegal: '[{\\:]',
      contains: ['title', 'comment'],      
      keywords: {'class': 1}
    },
    {
      className: 'symbol',
      begin: ':' + UNDERSCORE_IDENT_RE, end: '^'
    },
    {
      className: 'title',
      begin: IDENT_RE + "\\s*<\\s*" + IDENT_RE, end: '^'
    },
    {
      className: 'title',
      begin: 'self.' + IDENT_RE, end: '^'
    },
    {
      className: 'title',
      begin: IDENT_RE, end: '^'
    }
  ]
};//ruby