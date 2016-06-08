/*
Language: Pony
Author: Joe Eli McIlvain <joe.eli.mac@gmail.com>
Category: common
Description: Pony is an open-source, object-oriented, actor-model,
             capabilities-secure, high performance programming language.
*/

function(hljs) {
  var KEYWORDS = {
    keyword:
      'actor addressof and as be break class compile_error ' +
      'compile_intrinsic consume continue delegate digestof do else elseif ' +
      'embed end error for fun if ifdef in interface is isnt lambda let ' +
      'match new not object or primitive recover repeat return struct ' +
      'then trait try type until use var where while with xor',
    meta:
      'iso val trn tag ref box',
    literal:
      'this false true'
  };

  var TRIPLE_QUOTE_STRING_MODE = {
    className: 'string',
    begin: '"""', end: '"""'
  };

  var QUOTE_STRING_MODE = {
    className: 'string',
    begin: '"', end: '"',
    contains: [hljs.BACKSLASH_ESCAPE]
  };

  var SINGLE_QUOTE_CHAR_MODE = {
    className: 'literal',
    begin: '\'', end: '\'',
    contains: [hljs.BACKSLASH_ESCAPE]
  };

  var TYPE_NAME = {
    className: 'type',
    begin: '\\b_?[A-Z][\\w]*'
  };

  return {
    keywords: KEYWORDS,
    contains: [
      TYPE_NAME,
      TRIPLE_QUOTE_STRING_MODE,
      QUOTE_STRING_MODE,
      SINGLE_QUOTE_CHAR_MODE,
      hljs.C_NUMBER_MODE,
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE
    ]
  };
}
