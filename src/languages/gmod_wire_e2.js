/*
Language: Expression 2
Author: Simen Wiik <simenwiik@hotmail.com>
Description: A language used in the Wiremod extension for Garry's Mod
*/

function(hljs) {
  return {
    alias: ["e2", "wire_e2", "gmod_wire_e2", "expression2", "exp2", "expr2"],
    illegal: /[;'\\]/,
    keywords: 'if elseif else for foreach while break continue local switch case default function return',
    contains: [
      {
        className: 'string',
        begin: /"(\\[\s\S]|(?!")[^\\])*"/g
      },
      {
        className: 'ppcommand',
        begin: /#(include|ifdef|ifndef|else|endif)/
      },
      hljs.COMMENT('#\\[', ']#'),
      hljs.HASH_COMMENT_MODE,
      {
        className: 'directive',
        variants:[{
          begin: '@name[^#]*'
        }
      ]
      },
      {
        className: 'constant',
        begin: /\b_[A-Z0-9_]+/
      },
      {
        className: 'variable',
        begin: /\b[A-Z]\w*/
      },
      {
        className: 'operator',
        begin: /[\?\s]+:|[\?%^~$]|[-+]{2}|<<|>>|->|[-+*/!<>=][=]?|[&|][&|]?/
      },
      {
        className: 'symbol',
        begin: /[[\](),:{}\\]+/
      },
      {
        // (angle|array|bone|complex|entity|matrix[24]?|number|quaternion|ranger|string|table|vector[24]?|void|wirelink)
        className: 'type',
        begin: /\b(angle|array|bone|complex|effect|entity|gtable|matrix[24]?|normal|number|quaternion|ranger|string|table|vector[24]?|void|wirelink)(?!\()\b/g
      },
      {
        className: 'number',
        begin: /(-?)(\b0x[A-F0-9]+|\b0b[01]+|(\b\d+(\.\d*)?|\.\d+)(e[-+]?\d+)?)/
      }
    ]
  }
}
