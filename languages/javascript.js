LANGUAGES.javascript = {
  defaultMode: {
    lexems: [UNDERSCORE_IDENT_RE],
    contains: ['string', 'comment', 'number', 'regexp', 'function', 'literal'],
    keywords: {'in': 1, 'if': 1, 'for': 1, 'while': 1, 'finally': 1, 'var': 1, 'new': 1, 'function': 1, 'do': 1, 'return': 1, 'void': 1, 'else': 1, 'break': 1, 'catch': 1, 'instanceof': 1, 'with': 1, 'throw': 1, 'case': 1, 'default': 1, 'try': 1, 'this': 1, 'switch': 1, 'continue': 1, 'typeof': 1, 'delete': 1}
  },
  modes: [
    C_LINE_COMMENT_MODE,
    C_BLOCK_COMMENT_MODE,
    C_NUMBER_MODE,
    {
      className: 'literal',
      begin: '\\b(true|false|null)', end: '^'
    },
    APOS_STRING_MODE,
    QUOTE_STRING_MODE,
    BACKSLASH_ESCAPE,
    {
      className: 'regexp',
      begin: '\\/[^\\/]', end: '(^|[^\\\\])\\/[gim]*'
    },
    {
      className: 'function',
      begin: 'function ', end: '{',
      lexems: [UNDERSCORE_IDENT_RE],
      keywords: {'function': 1},
      contains: ['title', 'params']
    },
    {
      className: 'title',
      begin: UNDERSCORE_IDENT_RE, end: '^'
    },
    {
      className: 'params',
      begin: '\\(', end: '\\)',
      contains: ['string', 'comment']
    }
  ]
};//javascript