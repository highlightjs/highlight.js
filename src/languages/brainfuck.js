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
        end: '[\\[\\]\\.,\\+\\-<>]',
        relevance: 0
      },
      {
        className: 'keyword',
        begin: '[\\[\\]]',
        relevance: 0
      },
      {
        className: 'string',
        begin: '[\\.,]'
      },
      {
        begin: '\\+\\+\\+\\+' // silly relevance booster
      }
    ]
  };
}
