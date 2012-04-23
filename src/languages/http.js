/*
  Language: HTTP
  Description: HTTP request and response headers with automatic body highlighting
  Author: Ivan Sagalaev <maniac@softwaremaniacs.org>
*/

hljs.LANGUAGES.http = {
  defaultMode: {
    illegal: '\\S',
    contains: [
      {
        className: 'title',
        begin: '^HTTP/[0-9\\.]+', end: '$',
      },
      {
        className: 'title',
        begin: '^[A-Z]+ .*?HTTP/[0-9\\.]+$',
      },
      {
        className: 'header',
        begin: '^\\w', end: ': ', excludeEnd: true,
        illegal: '\\n',
        starts: {className: 'value', end: '$'}
      },
      {
        begin: '\\n\\n',
        starts: {subLanguage: '', end: hljs.EOF_RE}
      }
    ]
  }
}
