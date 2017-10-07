/*
Language: Expression 2
Author: Simen Wiik <simenwiik@hotmail.com>
Description: A language used in the Wiremod add-on for Garry's Mod
*/

function(hljs) {
  return {
    alias: ["e2", "wire_e2", "gmod_wire_e2", "expression2"],
    keywords: 'if|0 elseif|0 else|0 for|0 foreach|0 while|0 break|0 continue|0 local|0 switch|0 case|0 default|0 function|0 return|0',
    contains: [
      {
        className: 'string',
        begin: /"(\\[\s\S]|(?!")[^\\])*"/,
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
          {begin: /@name[^#\n]*/},
          {begin: /@model.*/},
          {begin: /@(inputs|outputs|persist|autoupdate)/},
          {begin: /@trigger( +(all|none))?/}
        ],
        relevance: 10
      },
      {
        className: 'constant',
        begin: /\b_[A-Z0-9_]+/,
        relevance: 0
      },
      {
        className: 'variable',
        begin: /\b[A-Z]\w*/,
        relevance: 0
      },
      {
        //
        className: 'operator',
        begin: /[\?%^~$]|[\?\s]+:|[-+]{2}|<<|>>|->|[-+*\/!<>=]=?|[&|][&|]?/,
        relevance: 0
      },
      {
        className: 'symbol',
        begin: /[[\](),:{}\\]+/,
        relevance: 0
      },
      //{
      //  className: 'function',
      //  begin: /[a-z]\w*(?=\()/
      //},
      {
        className: 'type',
        begin: /\b(angle|array|bone|complex|effect|entity|gtable|matrix[24]?|normal|number|quaternion|ranger|string|table|vector[24]?|void|wirelink)(?!\()\b/g,
        relevance: 0
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
