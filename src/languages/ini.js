/*
Language: Ini
*/

hljs.LANGUAGES.ini = {
  case_insensitive: true,
  defaultMode: {
    illegal: '[^\\s]',
    contains: [
      {
        className: 'comment',
        begin: ';', end: '$'
      },
      {
        className: 'title',
        begin: '^\\[', end: '\\]',
      },
      {
        className: 'setting',
        begin: '^[a-z0-9_\\[\\]]+[ \\t]*=[ \\t]*', end: '$',
        contains: [
          {
            className: 'value',
            endsWithParent: true,
            keywords: {'on': 1, 'off': 1, 'true': 1, 'false': 1, 'yes': 1, 'no': 1},
            contains: [hljs.QUOTE_STRING_MODE, hljs.NUMBER_MODE]
          }
        ]
      }
    ]
  }
};
