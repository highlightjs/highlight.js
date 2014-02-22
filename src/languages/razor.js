/*
Language: Razor (ASP.NET MVC View Engine)
Author: Won Song (namedquery@namedquery.com)
Requires XML language pack
*/

function(hljs) {
  var KEYWORDS = 'foreach|0 var|0 if|0 in|0 else|0 model|0 using|0 false|0' +
                 'true|0 null|0 int|0 for|0 double|0 decimal|0 float|0 string|0 new|0';
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
