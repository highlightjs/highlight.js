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
    contains: [hljs.BACKSLASH_ESCAPE],
    variants: [
      {
        begin: "'''", end: "'''",
        relevance: 10
      }, {
        begin: '"""', end: '"""',
        relevance: 10
      }, {
        begin: '"', end: '"'
      }, {
        begin: "'", end: "'"
      }
    ]
    //begin: /("""|'''|"|')(?:[^"'\\]|\\.|\\\n)*("""|'''|"|')/
  };
  var TABLE = {
    className: "title",
    begin: /^([\s]+)?[\[]+(.*?)[\]]+/
  };
  var NUMBER = {
    className: "number",
    begin: /([\+\-]+)?[\d]+_[\d_]+/
  };
  return {
    keywords: "true false",
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
