/*
Language: Haskell
Author: Jeremy Hull <sourdrums@gmail.com>
*/

hljs.LANGUAGES.haskell = function(){
  var LABEL = {
    className: 'label',
    begin: '\\b[A-Z][\\w\']*',
    relevance: 0
  };
  var CONTAINER = {
    className: 'container',
    begin: '\\(', end: '\\)',
    contains: [
      {className: 'label', begin: '\\b[A-Z][\\w\\(\\)\\.\']*'},
      {className: 'title', begin: '[_a-z][\\w\']*'}
    ]
  };

  return {
    defaultMode: {
      keywords: {
        'keyword': {
          'let': 1, 'in': 1, 'if': 1, 'then': 1, 'else': 1, 'case': 1, 'of': 1,
          'where': 1, 'do': 1, 'module': 1, 'import': 1, 'hiding': 1,
          'qualified': 1, 'type': 1, 'data': 1, 'newtype': 1, 'deriving': 1,
          'class': 1, 'instance': 1, 'null': 1, 'not': 1, 'as': 1
        }
      },
      contains: [
        {
          className: 'comment',
          begin: '--', end: '$'
        },
        {
          className: 'comment',
          begin: '{-', end: '-}'
        },
        {
          className: 'string',
          begin: '\\s+\'', end: '\'',
          contains: [hljs.BACKSLASH_ESCAPE],
          relevance: 0
        },
        hljs.QUOTE_STRING_MODE,
        {
          className: 'import',
          begin: '\\bimport', end: '$',
          keywords: {'import': 1, 'qualified': 1, 'as': 1, 'hiding': 1},
          contains: [CONTAINER]
        },
        {
          className: 'module',
          begin: '\\bmodule', end: 'where',
          keywords: {'module': 1, 'where': 1},
          contains: [CONTAINER]
        },
        {
          className: 'class',
          begin: '\\b(class|instance|data|(new)?type)', end: '(where|$)',
          keywords: {'class': 1, 'where': 1, 'instance': 1,'data': 1,'type': 1,'newtype': 1, 'deriving': 1},
          contains: [LABEL]
        },
        hljs.C_NUMBER_MODE,
        {
          className: 'shebang',
          begin: '#!\\/usr\\/bin\\/env\ runhaskell', end: '$'
        },
        LABEL,
        {
          className: 'title', begin: '^[_a-z][\\w\']*'
        }
      ]
    }
  };
}();
