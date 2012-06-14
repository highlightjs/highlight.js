/*
  Language: HTTP
  Description: HTTP request and response headers with automatic body highlighting
  Author: Ivan Sagalaev <maniac@softwaremaniacs.org>
*/

function(hljs) {
  return {
    defaultMode: {
      illegal: '\\S',
      contains: [
        {
          className: 'status',
          begin: '^HTTP/[0-9\\.]+', end: '$',
          contains: [{className: 'number', begin: '\\b\\d{3}\\b'}]
        },
        {
          className: 'request',
          begin: '^[A-Z]+ (.*?) HTTP/[0-9\\.]+$', returnBegin: true, end: '$',
          contains: [
            {
              className: 'string',
              begin: ' ', end: ' ',
              excludeBegin: true, excludeEnd: true
            }
          ]
        },
        {
          className: 'attribute',
          begin: '^\\w', end: ': ', excludeEnd: true,
          illegal: '\\n',
          starts: {className: 'string', end: '$'}
        },
        {
          begin: '\\n\\n',
          starts: {subLanguage: '', endsWithParent: true}
        }
      ]
    }
  };
}
