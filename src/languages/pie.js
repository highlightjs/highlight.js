/*
Language: PIE 
Author: <vladimir.alexiev@ontotext.com>
Category: common
Description: GraphDB Rules http://graphdb.ontotext.com/documentation/standard/reasoning.html
*/

function(hljs) {
  var KEYWORDS = {
    begin: /^(Prefices|Axioms|Rules)/, end: /\s*\{/,
    keywords: 'Prefices|20 Axioms|10 Rules|10'
  };
  
  var PREFIX = {
    begin: /^\s*\w+\s*:\s*\w+:\/\/\S+\s*$/,
    className: 'symbol',
  };
  
  var INFER_LINE = {
    begin: /---+/,
    className: 'keyword',
    relevance: 0
  };

  var RULE = {
    begin: /\b(Id|Consistency)\s*:/, end: '\n',
    keywords: 'Id|1 Consistency|10',
    contains: [{begin: hljs.IDENT_RE, className: 'title'}]
  };

  var ANNOTATION = {
    begin: /\[(Constraint|Context|Cut)/,
    keywords: {function: 'Constraint|10 Context|0 Cut|10'},
  };
  
  var SYMBOL = {
    begin: /</, end: />/,
    contains: [{begin: /[\w:]+/}],
    className: 'symbol',
    relevance: 1
  };
      
  var VAR = {
    begin: hljs.IDENT_RE,
    className: 'variable',
    relevance: 0,
  };

  var DATATYPE = {
    begin: /\^\^[\w:]+/,
    className: 'type',
    relevance: 1
  };
  
  return {
    // case_insensitive: true,
    aliases: ['rules'],
    contains: [
      KEYWORDS,
      PREFIX,
      hljs.QUOTE_STRING_MODE,
      hljs.APOS_STRING_MODE,
      DATATYPE,
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      RULE,
      ANNOTATION,
      SYMBOL,
      VAR,
      INFER_LINE,
    ]
  };
}
