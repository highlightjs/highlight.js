/*
  Language: HTTP
*/
hljs.LANGUAGES.http = {
  defaultMode: {
    illegal: '.',
    contains: [
      {
        className: 'title',
        begin: '^HTTP/[0-9\\.]+', end: '$',
        starts: {
          end: '\\n\\n',
          contains: [
            {
              className: 'key',
              begin: '^\\w', end: ': ', excludeEnd: true,
              starts: {
                className: 'value', end: '$'
              }
            }
          ],
          starts: {
            end: hljs.EOF_RE,
            subLanguage: ''
          }
        }
      }
    ]
  }
}
