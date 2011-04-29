/*
Language: Haskell
Author: Jeremy Hull <sourdrums@gmail.com>
*/

hljs.LANGUAGES.haskell = function(){
  var LABEL = {
    className: 'label',
    begin: '\\b[A-Z][\\w\\\']*',
    relevance: 0
  };
  var CONTAINER = {
    className: 'container',
    begin: '\\(', end: '\\)',
    contains: [
      {className: 'label', begin: '\\b[A-Z][\\w\\(\\)\\.\\\']*'},
      {className: 'title', begin: '[_a-z][\\w\\\']*'}
    ]
  };

  return {
    defaultMode: {
      lexems: '[a-zA-Z-\\+\\*/\\\\><\\:=\\$\\|][a-zA-Z-\\+\\*/\\\\><\\:=\\$\\|]*',
      keywords: {
        'keyword': {'let': 1,'in': 1,'if': 1,'then': 1,'else': 1,'case': 1,'of': 1,'where': 1,'do': 1,'module': 1,'import': 1, 'hiding': 1,'qualified': 1,'type': 1,'data': 1,'newtype': 1,'deriving': 1,'class': 1,'instance': 1,'null': 1,'not': 1,'as': 1},
        'built_in': {'Bool': 1,'True': 1,'False': 1,'Int': 1,'Char': 1,'Maybe': 1,'Nothing': 1,'String': 1}
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
        hljs.APOS_STRING_MODE,
        hljs.QUOTE_STRING_MODE,
        {
          className: 'import',
          begin: '\\bimport', end: '$',
          lexems: hljs.UNDERSCORE_IDENT_RE,
          keywords: {'import': 1, 'qualified': 1, 'as': 1, 'hiding': 1},
          contains: [CONTAINER]
        },
        {
          className: 'module',
          begin: '\\bmodule', end: 'where',
          lexems: hljs.UNDERSCORE_IDENT_RE,
          keywords: {'module': 1, 'where': 1},
          contains: [CONTAINER]
        },
        {
          className: 'class',
          begin: '\\b(class|instance|data|(new)?type)', end: '(where|$)',
          lexems: hljs.UNDERSCORE_IDENT_RE,
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
          className: 'title', begin: '^[_a-z][\\w\\\']*'
        }
      ]
    }
  };
}();
