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
      contains: ['commented_block'],
      begin: '\\^rem{', end: '}',
      relevance: 10
    },
    {
      className: 'commented_block',
      contains: ['commented_block'],
      begin: '{', end: '}',
      noMarkup: true
    },
    {
      className: 'preprocessor',
      begin: '^@(?:BASE|USE|CLASS|OPTIONS)$',
      relevance: 10
    },
    {
      className: 'title',
      begin: '@[\\w\\-]+\\[[\\w^;\\-]*\\](?:\\[[\\w^;\\-]*\\])?(?:.*)$'
    },
    {
      className: 'variable',
      begin: '\\$\\{?[\\w\\-\\.\\:]+\\}?'
    },
    {
      className: 'keyword',
      begin: '\\^[\\w\\-\\.\\:]+'
    },
    {
      className: 'number',
      begin: '\\^#[0-9a-fA-F]+'
    },
    hljs.C_NUMBER_MODE
  ]
};
