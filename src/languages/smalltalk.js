/*

Smalltalk definition (c) Vladimir Gubarkov <xonixx@gmail.com>

*/
hljs.LANGUAGES.smalltalk = function(){
  var VAR_IDENT_RE = '[a-z][a-zA-Z0-9_]*';
  return {
    defaultMode: {
      lexems: [hljs.UNDERSCORE_IDENT_RE],
      contains: ['comment', 'string', 'class', 'method',
                  'number', 'symbol', 'char', 'localvars', 'array'],
      keywords: {'self': 1, 'super': 1, 'nil': 1, 'true': 1, 'false': 1, 'thisContext': 1} // only 6
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
        begin: VAR_IDENT_RE + ':', end:'^'
      },
      {
        className: 'char',
        begin: '\\$.{1}', end: '^'
      },
      {
        className: 'localvars',
        begin: '\\|\\s*((' + VAR_IDENT_RE + ')\\s*)+\\|', end: '^',
        relevance: 10
      },
      {
        className: 'array',
        begin: '\\#\\(', end: '\\)',
        contains: ['string', 'char', 'number', 'symbol']
      }
    ]
  };
}();