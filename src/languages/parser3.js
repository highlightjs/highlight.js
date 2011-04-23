/*
Language: Parser3
Requires: html-xml.js
Author: Oleg Volchkov <oleg@volchkov.net>
*/

hljs.LANGUAGES.parser3 = function() {
  var COMMENTED_BLOCK = {
    begin: '{', end: '}'
  };
  COMMENTED_BLOCK.contains = [COMMENTED_BLOCK];

  return {
    defaultMode: {
      subLanguage: 'html',
      contains: [
        {
          className: 'comment',
          begin: '^#', end: '$'
        },
        {
          className: 'comment',
          contains: [COMMENTED_BLOCK],
          begin: '\\^rem{', end: '}',
          relevance: 10
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
    }
  };
}();
