/*
Language: Ruby Console
Requires: ruby.js
Author: Pascal Hurni <phi@ruby-reactive.org>
*/

function(hljs) {
  return {
    contains: [
      {
        relevance: 1,
        className: 'output',
        begin: '^\\s*=> ', end: "$",
        returnBegin: true,
        contains: [
          {
            className: 'status',
            begin: '^\\s*=>'
          },
          {
            begin: ' ', end: '$',
            subLanguage: 'ruby'
          }
        ]
      },
      {
        relevance: 1,
        className: 'input',
        begin: '^.*?>+ ', end: "$",
        returnBegin: true,
        contains: [
          {
            className: 'prompt',
            begin: '^.*?>+'
          },
          {
            begin: ' ', end: '$',
            subLanguage: 'ruby'
          }
        ]
      }
    ]
  };
}
