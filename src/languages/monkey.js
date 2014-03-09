/*
Language: Monkey
Author: Arthur Bikmullin <devolonter@gmail.com>
*/

function(hljs) {
  var NUMBER = {
    variants: [
      {
        className: 'number',
        begin: '[$][a-fA-F0-9]+'
      },
      hljs.NUMBER_MODE
    ]
  }

  var IDENT_TYPE_MODE =  {
    className: 'built_in',
    begin: ':', end: '=|' + hljs.UNDERSCORE_IDENT_RE + '\\b',
    excludeBegin: true,
    relevance: 0
  }

  return {
    aliases: ['monkey'],
    case_insensitive: true,
    keywords: {
      keyword: 'public private property continue exit extern new try catch ' +
        'eachin not abstract final select case default const local global field ' +
        'end if then else elseif endif while wend repeat until forever for to step next return module inline throw',

      built_in: 'DebugLog DebugStop Error Print ACos ACosr ASin ASinr ATan ATan2 ATan2r ATanr Abs Abs Ceil ' +
        'Clamp Clamp Cos Cosr Exp Floor Log Max Max Min Min Pow Sgn Sgn Sin Sinr Sqrt Tan Tanr Seed PI HALFPI TWOPI',

      literal: 'true false null and or shl shr mod'
    },
    contains: [
      {
        className: 'comment',
        begin: '#rem', end: '#end'
      },
      {
        className: 'comment',
        begin: "'", end: '$',
        relevance: 0
      },
      {
        className: 'function',
        beginKeywords: 'function method', end: '[(=]|$',
        contains: [
          hljs.UNDERSCORE_TITLE_MODE,
          IDENT_TYPE_MODE
        ]
      },
      {
        className: 'function',
        beginKeywords: 'new', end: '[();]|$',
        excludeEnd: true,
        contains: [
          {
            className: 'built_in',
            begin: hljs.UNDERSCORE_IDENT_RE,
            relevance: 0
          }
        ]
      },
      {
        className: 'class',
        beginKeywords: 'class interface', end: '$',
        contains: [
          {
            beginKeywords: 'extends implements'
          },
          hljs.UNDERSCORE_TITLE_MODE
        ]
      },
      {
        className: 'variable',
        begin: '\\b(self|super)\\b'
      },
      {
        className: 'preprocessor',
        beginKeywords: 'import',
        end: '$'
      },
      {
        className: 'preprocessor',
        begin: '\\s*#', end: '$',
        keywords: 'if else elseif endif end then'
      },
      {
        className: 'pi',
        begin: '^\\s*strict\\b'
      },
      {
        beginKeywords: 'alias', end: '=',
        contains: [hljs.UNDERSCORE_TITLE_MODE]
      },
      IDENT_TYPE_MODE,
      hljs.QUOTE_STRING_MODE,
      NUMBER
    ]
  }
}
