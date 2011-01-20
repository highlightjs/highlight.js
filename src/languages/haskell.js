/*
Language: Haskell
Author: Jeremy Hull <sourdrums@gmail.com>
*/

hljs.LANGUAGES.haskell = function(){
  //var HASK_IDENT_RE = 
  return {
    defaultMode: {
      lexems: hljs.UNDERSCORE_IDENT_RE,
      illegal: '',
      contains: ['comment', 'string', 'function', 'class', 'number', 'shebang', 'label'],
      keywords: {
        'keyword': {'let': 1,'in': 1,'if': 1,'then': 1,'else': 1,'case': 1,'of': 1,'where': 1,'do': 1,'module': 1,'import': 1, 'hiding': 1,'qualified': 1,'type': 1,'data': 1,'deriving': 1,'class': 1,'instance': 1,'null': 1,'not': 1}//,
        //'built_in': {'Bool': 1,'True': 1,'False': 1,'Int': 1,'Char': 1,'Maybe': 1,'Nothing': 1,'String': 1}
      }
    },
    modes: [
      {
        className: 'comment',
        begin: '--', end: '$'
      },
      {
        className: 'comment',
        begin: '{-', end: '-}'
      },
      {
        className: 'shebang',
        begin: '#!\\/usr\\/bin\\/env\ runhaskell',
        end: '$'
      },
      hljs.C_NUMBER_MODE,
      hljs.APOS_STRING_MODE,
      hljs.QUOTE_STRING_MODE,
      {
        className: 'class',
        lexems: hljs.UNDERSCORE_IDENT_RE,
        begin: '\\bclass', end: 'where|$',
        keywords: {'class': 1,'where': 1},
        contains: ['label']
      },
      {
        className: 'title',
        begin: '^[_a-z][\\w\\\']*', end: hljs.IMMEDIATE_RE
      },
      {
        className: 'label',
        begin: '[A-Z][\\w\\\']*', end: hljs.IMMEDIATE_RE
      }
    ]
  };
}();
