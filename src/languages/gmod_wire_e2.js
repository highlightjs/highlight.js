/*
Language: Expression 2
Author: Simen Wiik <simenwiik@hotmail.com>
Contributors: Coming Soon™?
Description: A language used in the Wiremod extension for Garry's Mod
*/

function(hljs) {
  return {
    alias: ["e2", "wire_e2", "gmod_wire_e2", "expression2", "exp2", "expr2"],
    keywords: 'if elseif else for foreach while break continue local switch case default function return',
    contains: [
      {
        className: 'string',
        begin: /"(\\[\s\S]|(?!")[^\\])*"/
      },
      {
        className: 'ppcommand',
        begin: /#(include|ifdef|ifndef|else|endif)/,
        relevance: 10
      },
      hljs.COMMENT(/#\[/, /]#/),
      hljs.HASH_COMMENT_MODE,
      {
        className: 'directive',
        variants: [
          {begin: /@name[^#]*/},
          {begin: /@model.*/},
          {begin: /@(inputs|outputs)/},
          {begin: /@trigger/, end: /none|all|$/}
        ],
        relevance: 10
        //begin: /@(name[^#]*|model.*|inputs|outputs|persist|trigger( +(all|none))?|autoupdate.*)/
      },
      {
        className: 'constant',
        begin: /\b_[A-Z0-9_]+/
      },
      {
        className: 'variable',
        begin: /\b[A-Z]\w*/,
        relevance: 10
      },
      {
        //
        className: 'operator',
        begin: /[\?%^~$]|[\?\s]+:|[-+]{2}|<<|>>|->|[-+*/!<>=][=]?|[&|][&|]?/,
        relevance: 0
      },
      {
        className: 'symbol',
        begin: /[[\](),:{}\\]+/,
        relevance: 0
      },
      //{
      //  className: 'function',
      //  begin: /[a-z]\w*/,  end: /\(/,
      //  returnEnd: true
      //},
      {
        // (angle|array|bone|complex|entity|matrix[24]?|number|quaternion|ranger|string|table|vector[24]?|void|wirelink)
        className: 'type',
        begin: /\b(angle|array|bone|complex|effect|entity|gtable|matrix[24]?|normal|number|quaternion|ranger|string|table|vector[24]?|void|wirelink)(?!\()\b/g,
        relevance: 10
      },
      {
        className: 'number',
        variants: [
          {begin: /\b0x[A-F0-9]+/},                     //Hex
          {begin: /\b0b[01]+/},                         //Binary literal
          {begin: /(\b\d+(\.\d*)?|\.\d+)(e[-+]?\d+)?/}, //Regular number
        ],
        relevance: 0
      }
    ]
  }
}
