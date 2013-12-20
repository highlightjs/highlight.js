/*
Language: Razor (ASP.NET MVC View Engine)
Author: Won Song (namedquery@namedquery.com)
Requires C# and XML language packs
*/

function(hljs) {
  var LEXEMES = '@[A-Za-z*{(]+'
  return {
    lexemes: LEXEMES,
    subLanguage: 'cs', subLanguageMode: 'continuous',
    contains: [
      {
        className: 'keyword',
 	begin: 'model|using',
      },
      {
        className: 'built_in',
 	begin: 'Scripts|Styles|Html'
      },
      {
        className: 'comment',
        begin: '@[*]', end: '[*]@'
      },
      {
        className: 'start',
        begin: /[@][?\\w]*/,
        illegal: /[@][{*]/,
      },
      {
        className: 'string',
        begin: '"((?!@))', end: '"',
        illegal: '\\n',
      },
      {
  	begin: '<', end: '>',
	illegal: '</?',
        subLanguage: 'xml',
        contains: [
          {
            begin: '"@', end: '"',
	    subLanguage: 'razor',
	  }
	]
      }
    ]
  };
}

