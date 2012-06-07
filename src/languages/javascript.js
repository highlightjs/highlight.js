/*
Language: JavaScript
*/

function(hljs) {
  return {
    defaultMode: {
      keywords: {
        keyword:
          'in if for while finally var new function do return void else break catch ' +
          'instanceof with throw case default try this switch continue typeof delete ' +
          'let yield',
        literal:
          'true false null undefined NaN Infinity'
      },
      contains: [
        hljs.APOS_STRING_MODE,
        hljs.QUOTE_STRING_MODE,
        hljs.C_LINE_COMMENT_MODE,
        hljs.C_BLOCK_COMMENT_MODE,
        hljs.C_NUMBER_MODE,
        { // regexp container
          begin: '(' + hljs.RE_STARTERS_RE + '|\\b(case|return|throw)\\b)\\s*',
          keywords: 'return throw case',
          contains: [
            hljs.C_LINE_COMMENT_MODE,
            hljs.C_BLOCK_COMMENT_MODE,
            {
              className: 'regexp',
              begin: '/', end: '/[gim]*',
              contains: [{begin: '\\\\/'}]
            }
          ],
          relevance: 0
        },
        {
          className: 'function',
          beginWithKeyword: true, end: '{',
          keywords: 'function',
          contains: [
            {
              className: 'title', begin: '[A-Za-z$_][0-9A-Za-z$_]*'
            },
            {
              className: 'params',
              begin: '\\(', end: '\\)',
              contains: [
                hljs.C_LINE_COMMENT_MODE,
                hljs.C_BLOCK_COMMENT_MODE
              ],
              illegal: '["\'\\(]'
            }
          ],
          illegal: '\\[|%'
        }
      ]
    }
  };
}
