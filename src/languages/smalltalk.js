/*
Language: Smalltalk
Description: Smalltalk is an object-oriented, dynamically typed reflective programming language.
Author: Vladimir Gubarkov <xonixx@gmail.com>
Website: https://en.wikipedia.org/wiki/Smalltalk
Category: system
*/

export default function(hljs) {
  const VAR_IDENT_RE = '[a-z][a-zA-Z0-9_]*';
  const CHAR = {
    className: 'string',
    begin: '\\$.{1}'
  };
  const SYMBOL = {
    className: 'symbol',
    begin: '#' + hljs.UNDERSCORE_IDENT_RE
  };
  return {
    name: 'Smalltalk',
    aliases: [ 'st' ],
    keywords: [
      "self",
      "super",
      "nil",
      "true",
      "false",
      "thisContext"
    ],
    contains: [
      // relevance must be lowered so this doesn't compete with strings
      hljs.COMMENT('"', '"'),
      hljs.APOS_STRING_MODE,
      {
        className: 'type',
        begin: '\\b[A-Z][A-Za-z0-9_]*'
      },
      {
        begin: VAR_IDENT_RE + ':'
      },
      hljs.C_NUMBER_MODE,
      SYMBOL,
      CHAR,
      {
        // This looks more complicated than needed to avoid combinatorial
        // explosion under V8. It effectively means `| var1 var2 ... |` with
        // whitespace adjacent to `|` being optional.
        begin: '\\|[ ]*' + VAR_IDENT_RE + '([ ]+' + VAR_IDENT_RE + ')*[ ]*\\|',
        returnBegin: true,
        end: /\|/,
        illegal: /\S/,
        contains: [ { begin: '(\\|[ ]*)?' + VAR_IDENT_RE } ]
      },
      {
        begin: '#\\(',
        end: '\\)',
        contains: [
          hljs.APOS_STRING_MODE,
          CHAR,
          hljs.C_NUMBER_MODE,
          SYMBOL
        ]
      }
    ]
  };
}
