/*
Language: Expression 2
Author: Simen Wiik <simenwiik@hotmail.com>
Contributors: Coming Soon™?
Description: A language used in the Wiremod extension for Garry's Mod
*/

function(hljs) {
  return {
    alias: ["e2", "wire_e2", "gmod_wire_e2", "expression2", "exp2", "expr2"],
    keywords: 'if|10 elseif|10 else|10 for|10 foreach|10 while|10 break|10 continue|10 local|10 switch|10 case|10 default|10 function|10 return|10',
    contains: [
      {
        className: 'string',
        begin: /"(\\[\s\S]|(?!")[^\\])*"/,
        relevance: 10
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
        begin: /\b_[A-Z0-9_]+/,
        relevance: 10
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
        relevance: 10
      },
      {
        className: 'symbol',
        begin: /[[\](),:{}\\]+/,
        relevance: 10
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
        relevance: 10
      }
    ]
  }
}
