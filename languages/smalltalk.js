/*

Smalltalk definition (c) Vladimir Gubarkov <xonixx@gmail.com>

*/

hljs.SMALLTALK_KEYWORDS = {'self': 1, 'super': 1, 'nil': 1, 'true': 1, 'false': 1, 'thisContext': 1}; // only 6
hljs.VAR_IDENT_RE = '[a-z][a-zA-Z0-9_]*';

hljs.LANGUAGES.smalltalk = {
  defaultMode: {
    lexems: [hljs.UNDERSCORE_IDENT_RE],
    contains: ['comment', 'string', 'class', 'method',
                'number', 'symbol', 'char', 'localvars', 'array'],
    keywords: hljs.SMALLTALK_KEYWORDS
  },
  modes: [
    {
      className: 'class',
      begin: '\\b[A-Z][A-Za-z0-9_]*', end: '^',
      relevance: 0
    },
    {
      className: 'symbol',
      begin: '#' + hljs.UNDERSCORE_IDENT_RE, end: '^'
    },
    hljs.C_NUMBER_MODE,
    hljs.APOS_STRING_MODE,
    {
      className: 'comment',
      begin: '"', end: '"',
      relevance: 0
    },
    {
      className: 'method',
      begin: hljs.VAR_IDENT_RE+':', end:'^'
    },
    {
      className: 'char',
      begin: '\\$.{1}', end: '^'
    },
    {
      className: 'localvars',
      begin: '\\|\\s*(('+hljs.VAR_IDENT_RE+')\\s*)+\\|', end: '^',
      relevance: 10
    },
    {
      className: 'array',
      begin: '\\#\\(', end: '\\)',
      contains: ['string', 'char', 'number', 'symbol']
    }
  ]
};//smalltalk