/*
Language: Razor (ASP.NET MVC View Engine)
Author: Won Song (namedquery@namedquery.com)
*/

function(hljs) {
  return {
    contains: [
      {
        className: 'comment',
        begin: '@*', end: '*@'
      },
      hljs.QUOTE_STRING_MODE,
      {
        beginKeywords: '@Html @{', end: ';@}'
      }
    ]
  };
}
