/*
Language: Haskell
*/

hljs.LANGUAGES.haskell = {
  defaultMode: {
    lexems: hljs.UNDERSCORE_IDENT_RE,
    illegal: '',
    contains: ['comment', 'string', 'function', 'class', 'number', 'shebang'],
    keywords: {
      'keywords': {'\\': 1,'->': 1,'let': 1,'in': 1,'if': 1,'then': 1,'else': 1,'case': 1,'of': 1,'where': 1,'|': 1,'do': 1,'module': 1,'import': 1, 'hiding': 1,'qualified': 1,'type': 1,'data': 1,'deriving': 1,'::': 1,':': 1, 'class': 1,'instance':1,'null': 1,'++': 1,'+': 1,'-': 1,'/': 1,'\*': 1},
      'built_in': {'Bool': 1,'True': 1,'False': 1,'Int': 1,'Char': 1,'Maybe': 1,'Nothing': 1}
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
    }
  ]
};
