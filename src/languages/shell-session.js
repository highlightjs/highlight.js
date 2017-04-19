/*
Language: Shell Session
Requires: bash.js
Author: TSUYUSATO Kitsune <make.just.on@gmail.com>
Description: shell session
Category: common
*/

function(hljs) {
  return {
    aliases: ['console', 'sh-session'],
    contains: [
      {
        className: 'meta',
        begin: '^\\s{0,3}[\\w\\d\\[\\]()@-]*[>%$#]',
        starts: {
          end: '$', subLanguage: 'bash',
          relevance: 1,
        }
      },
    ]
  }
}
