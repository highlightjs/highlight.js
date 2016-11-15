/*
Language: ion
Author: glendc <contact@glendc.com>
Category: scripting
*/

function(hljs) {
  var VAR = {
    className: 'variable',
    variants: [
      {begin: /\$[\w\d?][\w\d_?]*/},
      {begin: /\$\{[\w\d?][\w\d_?]*}/}
    ]
  };
  var QUOTE_STRING = {
    className: 'string',
    variants: [
        {begin: /"/, end: /"/},
        {begin: /'/, end: /'/}
    ],
    contains: [
      hljs.BACKSLASH_ESCAPE,
      VAR,
      {
        className: 'variable',
        begin: /\$\{/, end: /\}/,
        contains: [hljs.BACKSLASH_ESCAPE]
      },
      {
        className: 'variable',
        begin: /\$/,
        contains: [hljs.BACKSLASH_ESCAPE]
      }
    ]
  };

  return {
    keywords: {
      keyword:
        'if else end for in fn let drop',
      built_in:
        'help echo cd ls rm mkdir read grep cat cp mv'
    },
    contains: [
      {
        className: 'function',
        beginKeywords: 'fn', endKeywords: 'end',
        contains: [
          hljs.inherit(hljs.TITLE_MODE, {
            begin: /\ [\w_]+/,
            endsParent: true
          })
        ]
      },
      hljs.HASH_COMMENT_MODE,
      QUOTE_STRING,
      VAR
    ]
  };
}
