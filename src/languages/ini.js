/*
Language: Ini
Category: common, config
*/

function(hljs) {
  return {
    case_insensitive: true,
    illegal: /\S/,
    contains: [
      hljs.COMMENT(';', '$'),
      {
        className: 'section',
        begin: /^\[/, end: /\]/
      },
      {
        begin: /^[a-z0-9\[\]_-]+\s*=/, end: '$',
        contains: [
          {
            endsWithParent: true,
            contains: [
              {
                className: 'literal',
                begin: /\bon|off|true|false|yes|no\b/
              },
              hljs.NUMBER_MODE,
              hljs.QUOTE_STRING_MODE,
              {
                className: 'string',
                begin: /\S+/,
                relevance: 0
              }
            ],
            relevance: 0
          }
        ]
      }
    ]
  };
}
