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
      begin: '^@(?:BASE|USE|CLASS|OPTIONS)$', end: hljs.IMMEDIATE_RE,
      relevance: 10
    },
    {
      className: 'title',
      begin: '@[\\w\\-]+\\[[\\w^;\\-]*\\](?:\\[[\\w^;\\-]*\\])?(?:.*)$', end: hljs.IMMEDIATE_RE
    },
    {
      className: 'variable',
      begin: '\\$\\{?[\\w\\-\\.\\:]+\\}?', end: hljs.IMMEDIATE_RE
    },
    {
      className: 'keyword',
      begin: '\\^[\\w\\-\\.\\:]+', end: hljs.IMMEDIATE_RE
    },
    {
      className: 'number',
      begin: '\\^#[0-9a-fA-F]+', end: hljs.IMMEDIATE_RE
    },
    hljs.C_NUMBER_MODE
  ]
};
