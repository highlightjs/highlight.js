/*

Generic lisp definition (c) Vasily Polovnyov <vast@whiteants.net>

*/
hljs.LANGUAGES.lisp = function(){
  var LISP_IDENT_RE = '[a-zA-Z_\\-\\+\\*\\/\\<\\=\\>\\&\\#][a-zA-Z0-9_\\-\\+\\*\\/\\<\\=\\>\\&\\#]*'
  var LISP_SIMPLE_NUMBER_RE = '(\\-|\\+)?\\d+(\\.\\d+|\\/\\d+)?((d|e|f|l|s)(\\+|\\-)?\\d+)?'
  return {
    case_insensitive: true,
    defaultMode: {
      lexems: [LISP_IDENT_RE],
      contains: ['literal', 'number', 'string', 'comment', 'quoted', 'list'],
      illegal: '[^\\s]'
    },
    modes: [
      hljs.QUOTE_STRING_MODE,
      {
        className: 'number',
        begin: LISP_SIMPLE_NUMBER_RE, end: '^'
      },
      {
        className: 'number',
        begin: '#b[0-1]+(/[0-1]+)?', end: '^'
      },
      {
        className: 'number',
        begin: '#o[0-7]+(/[0-7]+)?', end: '^'
      },
      {
        className: 'number',
        begin: '#x[0-9a-f]+(/[0-9a-f]+)?', end: '^'
      },
      {
        className: 'number',
        begin: '#c\\(' + LISP_SIMPLE_NUMBER_RE + ' +' + LISP_SIMPLE_NUMBER_RE, end: '\\)'
      },
      {
        className: 'comment',
        begin: ';', end: '$'
      },
      {
        className: 'quoted',
        begin: '[\'`]\\(', end: '\\)',
        contains: ['number', 'string', 'variable', 'keyword', 'quoted_list']
      },
      {
        className: 'quoted',
        begin: '\\(quote ', end: '\\)',
        contains: ['number', 'string', 'variable', 'keyword', 'quoted_list'],
        lexems: [LISP_IDENT_RE],
        keywords: {'title': {'quote': 1}}
      },
      {
        className: 'quoted_list',
        begin: '\\(', end: '\\)',
        contains: ['quoted_list', 'literal', 'number', 'string']
      },
      {
        className: 'list',
        begin: '\\(', end: '\\)',
        contains: ['title','body']
      },
      {
        className: 'title',
        begin: LISP_IDENT_RE, end: '^',
        endsWithParent: true
      },
      {
        className: 'body',
        begin: '^', endsWithParent: true, excludeEnd: true,
        contains: ['quoted', 'list', 'literal', 'number', 'string', 'comment', 'variable', 'keyword']
      },
      {
        className: 'keyword',
        begin: '[:&]' + LISP_IDENT_RE, end: '^'
      },
      {
        className: 'variable',
        begin: '\\*', end: '\\*'
      },
      {
        className: 'literal',
        begin: '\\b(t{1}|nil)\\b', end: '^'
      }
    ]
  };
}();
