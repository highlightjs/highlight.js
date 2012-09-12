/*
Language: Brainfuck
Author: Evgeny Stepanischev <imbolk@gmail.com>
*/

hljs.LANGUAGES.brainfuck = {
  defaultMode: {
    contains: [
      {
        className: 'comment',
        begin: '[^\\[\\]\\.,\\+\\-<>]',
        excludeEnd: true,
        end: '[\\[\\]\\.,\\+\\-<>]',
        relevance: -1
      },
      {
        className: 'keyword',
        begin: '[\\[\\]]',
        end: '',
        relevance: -1
      },
      {
        className: 'string',
        begin: '[\\.,]',
        end: '',
        relevance: -1
      }
    ]
  }
};