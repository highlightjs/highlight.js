/*
Language: DOS .bat
Author: Alexander Makarov (http://rmcreative.ru/)
*/

hljs.LANGUAGES.dos = {
  case_insensitive: true,
  defaultMode: {
    lexems: hljs.IDENT_RE,
    keywords: {
      'flow': {'if':1, 'else':1, 'goto':1, 'for':1, 'in':1, 'do':1, 'call':1, 'exit':1, 'not':1, 'exist':1, 'errorlevel':1, 'defined':1, 'equ':1, 'neq':1, 'lss':1, 'leq':1, 'gtr':1, 'geq':1},
      'keyword':{'shift':1, 'cd':1, 'dir':1, 'echo':1, 'setlocal':1, 'endlocal':1, 'set':1, 'pause':1, 'copy':1},
      'stream':{'prn':1, 'nul':1, 'lpt3':1, 'lpt2':1, 'lpt1':1, 'con':1, 'com4':1, 'com3':1, 'com2':1, 'com1':1, 'aux':1},
      'winutils':{'ping':1, 'net':1, 'ipconfig':1, 'taskkill':1, 'xcopy':1, 'ren':1, 'del':1}
    },
    contains: [
      {
        className: 'envvar', begin: '%[^ ]+?%'
      },
      {
        className: 'number', begin: '\\b\\d+',
        relevance: 0
      },
      {
        className: 'comment',
        begin: '@?rem', end: '$'
      }
    ]
  }
};
