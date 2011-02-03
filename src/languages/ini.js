/*
Language: Ini
*/

hljs.LANGUAGES.ini =
{
  case_insensitive: true,
  defaultMode: {
    contains: ['comment', 'title', 'setting'],
    illegal: '[^\\s]'
  },
  modes: [
    {
      className: 'comment',
      begin: ';', end: '$'
    },
    {
      className: 'title',
      begin: '\\[', end: '\\]'
    },
    {
      className: 'setting',
      begin: '^[a-z0-9_\\[\\]]+[ \\t]*=[ \\t]*', end: '$',
      contains: [{
          className: 'value',
          endsWithParent: true,
          contains: ['string', 'number'],
          lexems: hljs.IDENT_RE,
          keywords: {'on': 1, 'off': 1, 'true': 1, 'false': 1, 'yes': 1, 'no': 1}
      }]
    },
    hljs.QUOTE_STRING_MODE,
    hljs.NUMBER_MODE
  ]
};
