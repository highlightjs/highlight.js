/*
Language: Razor (ASP.NET MVC View Engine)
Author: Won Song (namedquery@namedquery.com)
Requires XML language pack
*/

function(hljs) {
  var KEYWORDS = 'foreach var if in else model using false true|0 null int for double decimal float string';
  return {
    keywords: KEYWORDS,
    contains: [
      {
        className: 'built_in',
        begin: 'Html|Scripts|RenderBody|RenderSection|Styles'
      },
      {
        className: 'comment',
        begin: '@[*]', end: '[*]@'
      },
      {
        className: 'start',
        begin: /[@][?\\w]*/,
        illegal: /[@][{*]/
      },
      {
        className: 'string',
        begin: '"((?!@))', end: '"',
        illegal: '\\n'
      },
      {
	begin: '<', end: '>',
	illegal: '</?',
        subLanguage: 'xml',
        contains: [
          {
            begin: '"@', end: '"',
            subLanguage: 'razor'
          }
        ]
      }
    ]
  };
}
