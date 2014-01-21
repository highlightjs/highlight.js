/*
Language: Cirru
Author: Jiyin Yiyong <jiyinyiyong@gmail.com>
Contributors: Ivan Sagalaev <maniac@softwaremaniacs.org>
Description: Cirru is an indentation-based grammar for programming languages. See http://cirru.org/
*/

function(hljs) {
  return {
    aliases: ['cirru'],
    contains: [
      hljs.QUOTE_STRING_MODE,
      hljs.NUMBER_MODE,
      {
        begin: /^\s+|\$\s*|\(\s*/,
        contains: [
          {
            className: 'keyword',
            begin: /[^\(\)\$\s"]+/
          }
        ]
      },
      {
        className: 'keyword',
        begin: /^[^\(\)\$\s"]+/
      },
    ]
  }
}