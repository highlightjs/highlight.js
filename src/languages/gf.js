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
    begin: '--#', end: '$'
  };

  var SYMBOL = {
    className: 'symbol',
    begin: '=>|->|:|=|\\.|\\+|\\*|\!|\\||\\\\'
  };

  return {
    aliases: ['gf'],
    keywords:
      'abstract concrete interface instance resource incomplete of with open in ' +
      'cat fun def data lincat lin lindef linref printname printname param oper flags ' +
      'table pre case variants let in where ',
    contains: [
      PRAGMA,
      COMMENT,
      SYMBOL,

      hljs.QUOTE_STRING_MODE,
      hljs.NUMBER_MODE,
      hljs.inherit(hljs.TITLE_MODE, {begin: '^[_a-zA-Z][\\w\']*'}),

      {begin: '{\s*s\s*:'} // No markup, relevance booster
    ]
  };
}
