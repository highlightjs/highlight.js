/*
Language: Brainfuck
Author: Evgeny Stepanischev <imbolk@gmail.com>
*/

function(hljs){
  return {
    contains: [
      {
        className: 'comment',
        begin: '[^\\[\\]\\.,\\+\\-<>]',
        excludeEnd: true,
        end: '[\\[\\]\\.,\\+\\-<>]'
      },
      {
        className: 'keyword',
        begin: '[\\[\\]]'
      },
      {
        className: 'string',
        begin: '[\\.,]'
      }
    ]
  };
}
