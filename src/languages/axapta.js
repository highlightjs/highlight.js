/*
Language: Axapta
Author: Dmitri Roudakov <dmitri@roudakov.ru>
*/

hljs.LANGUAGES.axapta  = {
  defaultMode: {
    lexems: hljs.UNDERSCORE_IDENT_RE,
    keywords: {'false': 1, 'int': 1, 'abstract': 1, 'private': 1, 'char': 1, 'interface': 1, 'boolean': 1, 'static': 1, 'null': 1, 'if': 1, 'for': 1, 'true': 1, 'while': 1, 'long': 1, 'throw': 1,  'finally': 1, 'protected': 1, 'extends': 1, 'final': 1, 'implements': 1, 'return': 1, 'void': 1, 'enum': 1, 'else': 1, 'break': 1, 'new': 1, 'catch': 1, 'byte': 1, 'super': 1, 'class': 1, 'case': 1, 'short': 1, 'default': 1, 'double': 1, 'public': 1, 'try': 1, 'this': 1, 'switch': 1, 'continue': 1,
    'reverse':1, 'firstfast':1,'firstonly':1,'forupdate':1,'nofetch':1, 'sum':1, 'avg':1, 'minof':1, 'maxof':1, 'count':1, 'order':1, 'group':1, 'by':1, 'asc':1, 'desc':1, 'index':1, 'hint':1, 'like':1,
    'dispaly':1, 'edit':1, 'client':1, 'server':1, 'ttsbegin':1, 'ttscommit':1,
    'str':1, 'real':1, 'date':1, 'container':1, 'anytype':1, 'common':1, 'div':1,'mod':1
    },
    contains: [
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      hljs.APOS_STRING_MODE,
      hljs.QUOTE_STRING_MODE,
      hljs.C_NUMBER_MODE,
      {
        className: 'preprocessor',
        begin: '#', end: '$'
      },
      {
        className: 'class',
        lexems: hljs.UNDERSCORE_IDENT_RE,
        begin: '(class |interface )', end: '{',
        illegal: ':',
        keywords: {'class': 1, 'interface': 1},
        contains: [
          {
            className: 'inheritance',
            begin: '(implements|extends)',
            lexems: hljs.IDENT_RE,
            keywords: {'extends': 1, 'implements': 1},
            relevance: 10
          },
          {
            className: 'title',
            begin: hljs.UNDERSCORE_IDENT_RE
          }
        ]
      },
      {
        className: 'params',
        begin: '\\(', end: '\\)',
        contains: [hljs.APOS_STRING_MODE, hljs.QUOTE_STRING_MODE,]
      }
    ]
  }
};
