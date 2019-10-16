/*
Language: Omnis
Author: Jason Gissing <jasongiss1@gmail.com>
Description: Language support for the Omnis language used in Omnis Studio.
*/
function(hljs) {

  return {
    case_insensitive: false,
    keywords: {
        keyword:
          'Calculate|10 Do as For End While If Else Switch Case flag true false inherited default ' +
          ' Set reference from to step Returns Quit method'
    },
    contains: [
      hljs.APOS_STRING_MODE,
      hljs.QUOTE_STRING_MODE,
      { /* Hash variables */
      	className: 'built-in',
      	begin: '[ ,\(,\,)]#[A-Z0-9]+'
      },
      hljs.COMMENT('#', '$', {relevance: 0}),
      {
        className: 'number',
        begin: hljs.C_NUMBER_RE,
        relevance: 0
      },
      { /* A word starting '$' */
        className: 'symbol',
        begin: '\\$[a-zA-Z0-9_]+',
        relevance: 1
      },
      { /* Constants */
      	className: 'built-in',
      	begin: '\\b(k[A-Z][a-zA-z0-9]+)',
      	relevance: 1
      }
    ]
  };
}
