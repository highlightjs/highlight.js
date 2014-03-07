/*
Language: Monkey
Author: Arthur Bikmullin <devolonter@gmail.com>
*/

function(hljs) {
  var NUMBER = {
    variants: [
      {
        className: 'number',
        begin: '[$][a-fA-F0-9]+',
        relevance: 5
      },
      hljs.NUMBER_MODE
    ]
  }

  var IDENT_TYPE_MODE =  {
    className: 'built_in',
    begin: ':',
    end: hljs.UNDERSCORE_IDENT_RE + '\\b',
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
        begin: '#rem', end: '#end',
        relevance: 5
      },
      {
        className: 'comment',
        begin: "'", end: '$',
        relevance: 0
      },
      {
        className: 'function',
        beginKeywords: 'function method', end: '[(=]|$',
        relevance: 1,
        contains: [
          hljs.UNDERSCORE_TITLE_MODE,
          IDENT_TYPE_MODE
        ]
      },
      {
        className: 'function',
        beginKeywords: 'new', end: '[();]|$',
        excludeEnd: true,
        relevance: 1,
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
        beginKeywords: 'class interface', end: '$', excludeEnd: true,
        relevance: 1,
        contains: [
          {
            beginKeywords: 'extends implements',
            relevance: 2
          },
          hljs.UNDERSCORE_TITLE_MODE
        ]
      },
      {
        className: 'variable',
        begin: '\\b(self|super)\\b',
        relevance: 0
      },
      {
        className: 'preprocessor',
        beginKeywords: 'import',
        end: '$',
        relevance: 1
      },
      {
        className: 'preprocessor',
        begin: '\\s*#', end: '$',
        keywords: 'if else elseif endif end then',
        relevance: 0
      },
      {
        className: 'pi',
        begin: '^\\s*strict\\b',
        relevance: 5
      },
      {
        beginKeywords: 'alias', end: '=',
        relevance: 10,
        contains: [hljs.UNDERSCORE_TITLE_MODE]
      },
      {
        beginKeywords: 'local field method', // No markup, just a relevance booster
        relevance: 10
      },
      IDENT_TYPE_MODE,
      hljs.QUOTE_STRING_MODE,
      NUMBER
    ]
  }
}