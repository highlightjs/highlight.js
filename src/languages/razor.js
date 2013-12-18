/*
Language: Razor (ASP.NET MVC View Engine)
Author: Won Song (namedquery@namedquery.com)
*/

function(hljs) {
  var KEYWORDS = 'foreach var if true false null in else model using';
  return {
    keywords: KEYWORDS,
    contains: [
      {
        className: 'comment',
        begin: '@[*]', end: '[*]@'
      },
	  {
	    begin: '</?', end: '/?>',
		subLanguage: 'xml',
	  },
      hljs.QUOTE_STRING_MODE,
	  {
	    className: 'start',
		begin: '@'
	  }
    ]
  };
}

