/*
Language: Lisp
Description: Generic lisp syntax
Author: Vasily Polovnyov <vast@whiteants.net>
*/

hljs.LANGUAGES.lisp = function(){
  var LISP_IDENT_RE = '[a-zA-Z_\\-\\+\\*\\/\\<\\=\\>\\&\\#][a-zA-Z0-9_\\-\\+\\*\\/\\<\\=\\>\\&\\#]*';
  var LISP_SIMPLE_NUMBER_RE = '(\\-|\\+)?\\d+(\\.\\d+|\\/\\d+)?((d|e|f|l|s)(\\+|\\-)?\\d+)?';
  var LITERAL = {
    className: 'literal',
    begin: '\\b(t{1}|nil)\\b'
  };
  var NUMBER1 = {
    className: 'number', begin: LISP_SIMPLE_NUMBER_RE
  };
  var NUMBER2 = {
    className: 'number', begin: '#b[0-1]+(/[0-1]+)?'
  };
  var NUMBER3 = {
    className: 'number', begin: '#o[0-7]+(/[0-7]+)?'
  };
  var NUMBER4 = {
    className: 'number', begin: '#x[0-9a-f]+(/[0-9a-f]+)?'
  };
  var NUMBER5 = {
    className: 'number', begin: '#c\\(' + LISP_SIMPLE_NUMBER_RE + ' +' + LISP_SIMPLE_NUMBER_RE, end: '\\)'
  };
  var STRING = {
    className: 'string',
    begin: '"', end: '"',
    contains: [hljs.BACKSLASH_ESCAPE],
    relevance: 0
  };
  var COMMENT = {
    className: 'comment',
    begin: ';', end: '$'
  };
  var VARIABLE = {
    className: 'variable',
    begin: '\\*', end: '\\*'
  };
  var KEYWORD = {
    className: 'keyword',
    begin: '[:&]' + LISP_IDENT_RE
  };
  var QUOTED_LIST = {
    begin: '\\(', end: '\\)'
  };
  QUOTED_LIST.contains = [QUOTED_LIST, LITERAL, NUMBER1, NUMBER2, NUMBER3, NUMBER4, NUMBER5, STRING];
  var QUOTED1 = {
    className: 'quoted',
    begin: '[\'`]\\(', end: '\\)',
    contains: [NUMBER1, NUMBER2, NUMBER3, NUMBER4, NUMBER5, STRING, VARIABLE, KEYWORD, QUOTED_LIST]
  };
  var QUOTED2 = {
    className: 'quoted',
    begin: '\\(quote ', end: '\\)',
    lexems: LISP_IDENT_RE,
    keywords: {'title': {'quote': 1}},
    contains: [NUMBER1, NUMBER2, NUMBER3, NUMBER4, NUMBER5, STRING, VARIABLE, KEYWORD, QUOTED_LIST]
  };
  var LIST = {
    className: 'list',
    begin: '\\(', end: '\\)'
  };
  var BODY = {
    className: 'body',
    endsWithParent: true, excludeEnd: true
  };
  LIST.contains = [{className: 'title', begin: LISP_IDENT_RE}, BODY];
  BODY.contains = [QUOTED1, QUOTED2, LIST, LITERAL, NUMBER1, NUMBER2, NUMBER3, NUMBER4, NUMBER5, STRING, COMMENT, VARIABLE, KEYWORD];

  return {
    case_insensitive: true,
    defaultMode: {
      illegal: '[^\\s]',
      contains: [
        LITERAL,
        NUMBER1, NUMBER2, NUMBER3, NUMBER4, NUMBER5,
        STRING,
        COMMENT,
        QUOTED1, QUOTED2,
        LIST
      ]
    }
  };
}();
