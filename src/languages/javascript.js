hljs.LANGUAGES.javascript = {
  defaultMode: {
    lexems: [hljs.UNDERSCORE_IDENT_RE],
    contains: ['string', 'comment', 'number', 'regexp_container', 'function'],
    keywords: {
      'keyword': {'in': 1, 'if': 1, 'for': 1, 'while': 1, 'finally': 1, 'var': 1, 'new': 1, 'function': 1, 'do': 1, 'return': 1, 'void': 1, 'else': 1, 'break': 1, 'catch': 1, 'instanceof': 1, 'with': 1, 'throw': 1, 'case': 1, 'default': 1, 'try': 1, 'this': 1, 'switch': 1, 'continue': 1, 'typeof': 1, 'delete': 1},
      'literal': {'true': 1, 'false': 1, 'null': 1}
    }
  },
  modes: [
    hljs.C_LINE_COMMENT_MODE,
    hljs.C_BLOCK_COMMENT_MODE,
    hljs.C_NUMBER_MODE,
    hljs.APOS_STRING_MODE,
    hljs.QUOTE_STRING_MODE,
    hljs.BACKSLASH_ESCAPE,
    {
      className: 'regexp_container',
      begin: '(!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|\\.|-|-=|/|/=|:|;|<|<<|<<=|<=|=|==|===|>|>=|>>|>>=|>>>|>>>=|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~|case|return|throw)\\s*',
      end: '^', noMarkup: true,
      lexems: [hljs.IDENT_RE],
      keywords: {'return': 1, 'throw': 1, 'case': 1},
      contains: ['comment', 'regexp'],
      relevance: 0
    },
    {
      className: 'regexp',
      begin: '/.*?[^\\\\/]/[gim]*', end: '^'
    },
    {
      className: 'function',
      begin: 'function\\b', end: '{',
      lexems: [hljs.UNDERSCORE_IDENT_RE],
      keywords: {'function': 1},
      contains: ['title', 'params']
    },
    {
      className: 'title',
      begin: '[A-Za-z$_][0-9A-Za-z$_]*', end: '^'
    },
    {
      className: 'params',
      begin: '\\(', end: '\\)',
      contains: ['string', 'comment']
    }
  ]
};
