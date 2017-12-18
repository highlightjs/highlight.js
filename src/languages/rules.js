/*
Language: Rules
Category: common
*/

function(hljs) {
  var KEYWORDS = {
    keyword:
      'and = != > >= < <= in not in exists does not exist',
    literal: 'exists does not exist'
  };
  return {
    lexemes: '[a-zA-Z=!><][a-zA-Z0-9=!><_]*',
    keywords: KEYWORDS,
    contains: []
  };
}
