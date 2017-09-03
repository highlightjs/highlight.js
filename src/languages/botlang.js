/*
Language: botlang
Author: Mathias Schilling <m@matchilling>
Category: scripting
Description: A scripting language for conversational chat bots
Homepage: https://botlang.org/
*/

function(hljs) {
  const BUILT_IN = {
          multipleChoice : {
            className : 'literal',
            begin     : '\\(',
            end       : '\\)'
          },
          substitution : {
            className : 'literal',
            begin     : '(\\$)'
          },
          wildcard : {
            className : 'literal',
            begin     : '(\\*)'
          }
        };

  const REPLY = {
    className : 'keyword',
    begin     : '^(\\s*\\-\\s|\\s*\\?\\:*[a-zA-Z\\:]*|\\s*\\?\\s)',
    contains: [
      {
        className : 'string',
        contains  : [
          BUILT_IN.substitution,
          BUILT_IN.wildcard
        ],
        variants  : [
          { begin : /"/, end: /"/ }
        ]
      }
    ]
  }

  const TRIGGER = {
    className : 'keyword',
    begin     : '^(\\s*\\+\\s|\\s*\\?\\:*[a-zA-Z\\:]*|\\s*\\?\\s)',
    contains  : [
      {
        className : 'string',
        contains  : [
          BUILT_IN.multipleChoice,
          BUILT_IN.substitution,
          BUILT_IN.wildcard
        ],
        variants  : [
          { begin : /"/, end: /"/ }
        ]
      }
    ]
  };

  return {
    aliases: ['bot', 'botlang'],
    case_insensitive: true,
    contains: [
      REPLY,
      TRIGGER,
      hljs.HASH_COMMENT_MODE,
    ]
  }
}
