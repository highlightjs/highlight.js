/*
Language: NLF
Description: NSIS Language File
Author: Jan T. Sott <jan.sott@gmail.com>
Website: http://github.com/idleberg
*/

function(hljs) {
  var SYMBOLS = {
    className: 'symbol',
    begin: /\$_CLICK/
  };

  var STRINGS = {
    className: 'string',
    begin: /\w*?&\w+/
  };

  var CONSTANTS = {
    className: 'variable',
    begin: /\$\([\w\.:\^-]+\)/
  };

  var VARIABLES = {
    className: 'variable',
    begin: /(\$+|%)\w+/,
    illegal: /\(\){}/
  };

  var METACHARS = {
    className: 'meta',
    begin: /\\[nrt]/
  };

  return {
    case_insensitive: true,
    contains: [
      hljs.HASH_COMMENT_MODE,
      hljs.BACKSLASH_ESCAPE,
      hljs.NUMBER_MODE,
      CONSTANTS,
      METACHARS,
      STRINGS,
      SYMBOLS,
      VARIABLES
    ]
  };
}
