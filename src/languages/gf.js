/*
Language: Grammatical Framework (GF)
Author: John J. Camilleri <john@johnjcamilleri.com>
Category: functional
Description: GF is a programming language for multilingual grammar applications
Website: https://www.grammaticalframework.org
*/

function(hljs) {
  var COMMENT = {
    variants: [
      hljs.COMMENT('--', '$'), // $ here means end of line
      hljs.COMMENT(
        '{-',
        '-}',
        {
          contains: ['self']
        }
      )
    ]
  };

  var PRAGMA = {
    className: 'meta',
    begin: '--#', end: '$',
    relevance: 0
  };

  var SYMBOL = {
    className: 'symbol',
    begin: '=>|->|:|=|\\.|\\+|\\*|\!|\\||\\\\',
    relevance: 0
  };

  return {
    aliases: ['gf'],
    keywords:
      'abstract concrete interface instance resource incomplete of with open in ' +
      'cat fun def data lincat|10 lin lindef|10 linref|10 printname printname param oper flags ' +
      'table|10 pre case variants let in where ',
    contains: [
      PRAGMA,
      COMMENT,
      SYMBOL,

      hljs.QUOTE_STRING_MODE,
      hljs.NUMBER_MODE,
      hljs.inherit(hljs.TITLE_MODE, {begin: '^[_a-zA-Z][\\w\']*'}),

      {begin: '{\s*s\s*:', relevance: 10} // No markup, relevance booster
    ]
  };
}
