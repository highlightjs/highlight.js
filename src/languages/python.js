/*
Language: Python
*/

hljs.LANGUAGES.python = function() {
  var STR1 = {
    className: 'string',
    begin: 'u?r?\'\'\'', end: '\'\'\'',
    relevance: 10
  };
  var STR2 = {
    className: 'string',
    begin: 'u?r?"""', end: '"""',
    relevance: 10
  };
  var STR3 = {
    className: 'string',
    begin: '(u|r|ur)\'', end: '\'',
    contains: [hljs.BACKSLASH_ESCAPE],
    relevance: 10
  };
  var STR4 = {
    className: 'string',
    begin: '(u|r|ur)"', end: '"',
    contains: [hljs.BACKSLASH_ESCAPE],
    relevance: 10
  };
  var TITLE = {
    className: 'title', begin: hljs.UNDERSCORE_IDENT_RE
  };
  var PARAMS = {
    className: 'params',
    begin: '\\(', end: '\\)',
    contains: [STR1, STR2, STR3, STR4, hljs.APOS_STRING_MODE, hljs.QUOTE_STRING_MODE]
  };

  return {
    defaultMode: {
      lexems: hljs.UNDERSCORE_IDENT_RE,
      keywords: {
        'keyword': {'and': 1, 'elif': 1, 'is': 1, 'global': 1, 'as': 1, 'in': 1, 'if': 1, 'from': 1, 'raise': 1, 'for': 1, 'except': 1, 'finally': 1, 'print': 1, 'import': 1, 'pass': 1, 'return': 1, 'exec': 1, 'else': 1, 'break': 1, 'not': 1, 'with': 1, 'class': 1, 'assert': 1, 'yield': 1, 'try': 1, 'while': 1, 'continue': 1, 'del': 1, 'or': 1, 'def': 1, 'lambda': 1, 'nonlocal': 10},
        'built_in': {'None': 1, 'True': 1, 'False': 1, 'Ellipsis': 1, 'NotImplemented': 1}
      },
      illegal: '(</|->|\\?)',
      contains: [
        hljs.HASH_COMMENT_MODE,
        STR1, STR2, STR3, STR4, hljs.APOS_STRING_MODE, hljs.QUOTE_STRING_MODE,
        {
          className: 'function',
          lexems: hljs.UNDERSCORE_IDENT_RE,
          begin: '\\bdef ', end: ':',
          illegal: '$',
          keywords: {'def': 1},
          contains: [TITLE, PARAMS],
          relevance: 10
        },
        {
          className: 'class',
          lexems: hljs.UNDERSCORE_IDENT_RE,
          begin: '\\bclass ', end: ':',
          illegal: '[${]',
          keywords: {'class': 1},
          contains: [TITLE, PARAMS],
          relevance: 10
        },
        hljs.C_NUMBER_MODE,
        {
          className: 'decorator',
          begin: '@', end: '$'
        }
      ]
    }
  };
}();
