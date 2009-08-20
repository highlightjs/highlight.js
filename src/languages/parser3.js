/*
Language: Parser3
Requires: html-xml.js
Author: Oleg Volchkov <oleg@volchkov.net>
*/

hljs.LANGUAGES.parser3 = {
  defaultMode: {
    contains: ['comment', 'preprocessor', 'title', 'variable', 'keyword', 'number'],
    subLanguage: 'html'
  },
  case_insensitive: false,

  modes: [
    {
      className: 'comment',
      begin: '^#', end: '$'
    },
    {
      className: 'comment',
      begin: '\\^rem{', end: '}',
      relevance: 10
    },
    {
      className: 'preprocessor',
      begin: '^@(?:BASE|USE|CLASS|OPTIONS)$', end: '^',
      relevance: 10
    },
    {
      className: 'title',
      begin: '@[\\w\\-]+\\[[\\w^;\\-]*\\](?:\\[[\\w^;\\-]*\\])?(?:.*)$', end: '^'
    },
    {
      className: 'variable',
      begin: '\\$\\{?[\\w\\-\\.\\:]+\\}?', end: '^'
    },
    {
      className: 'keyword',
      begin: '\\^[\\w\\-\\.\\:]+', end: '^'
    },
    {
      className: 'number',
      begin: '\\^#[0-9a-fA-F]+', end: '^'
    },
    hljs.C_NUMBER_MODE
  ]
};
