/*
Language: Toml
Author: GuillaumeGomez <guillaume1.gomez@gmail.com>
Category: config
*/

function(hljs) {
  var VARIABLE = {
    className: "variable",
    variants: [{
      begin: /\$[\w\d"][\w\d_]*/
    }, {
      begin: /\$\{(.*?)}/
    }]
  };
  var STRING = {
    className: "string",
    variants: [
      {
        begin: "'''", end: "'''",
        contains: [hljs.BACKSLASH_ESCAPE]
      }, {
        begin: '"""', end: '"""',
        contains: [hljs.BACKSLASH_ESCAPE]
      }, {
        begin: '"', end: '"',
        contains: [hljs.BACKSLASH_ESCAPE]
      }, {
        begin: "'", end: "'",
        contains: [hljs.BACKSLASH_ESCAPE]
      }
    ]
    //begin: /("""|'''|"|')(?:[^"'\\]|\\.|\\\n)*("""|'''|"|')/
  };
  var TABLE = {
    className: "table",
    begin: /^([\s]+)?[\[]+(.*?)[\]]+/
  };
  var NUMBER = {
    className: "number",
    begin: /([\+\-]+)?[\d]+_[\d_]+/
  };
  return {
    keywords: ["true", "false"],
    contains: [
      hljs.HASH_COMMENT_MODE,
      hljs.NUMBER_MODE,
      NUMBER,
      hljs.QUOTE_STRING_MODE,
      VARIABLE,
      STRING,
      TABLE
    ]
  };
}
