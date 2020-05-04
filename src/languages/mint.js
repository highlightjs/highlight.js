export default function(hljs) {
  var MINT_CONTAINS = [];

  var MINT_KEYWORDS =
    [ 'const', 'global', 'component', 'store', 'module', 'fun', 'state',
      'property', 'next', 'if', 'else', 'sequence', 'parallel', 'style',
      'record', 'connect', 'enum', 'routes', 'try', 'catch', 'case',
      'where', 'when', 'use', 'for', 'of', 'true', 'false', 'then',
      'finally', 'get', 'exposing', 'as', 'decode', 'encode' ];

   var XML_IDENT_RE = '[A-Za-z0-9\\._:-]+';

   var TAG_INTERNALS = {
    endsWithParent: true,
    illegal: /</,
    relevance: 0,
    contains: [
      {
        begin: XML_IDENT_RE,
        className: 'attr',
        relevance: 0
      },
      {
        begin: /=\s*/,
        relevance: 0,
        contains: [
          {
            contains: MINT_CONTAINS,
            endsParent: true,
            className: 'tag',
            begin: '\\{',
            end: '\\}',
          },
          {
            className: 'string',
            endsParent: true,
            variants: [
              {begin: /"/, end: /"/},
              {begin: /'/, end: /'/}
            ]
          }
        ]
      }
    ]
  };

  MINT_CONTAINS.push(
    ...[
      hljs.COMMENT("/\\*", "\\*/"),
      {
        begin: "\\b\\d+(\\.\\d+)?",
        className: 'number',
        end: "\\B|\\b"
      },
      {
        className: 'string',
        begin: '"',
        end: '"'
      },
      {
        begin: "\\b[A-Z][A-Za-z0-9]+",
        ends: "[^A-Za-z0-9]",
        className: 'type'
      },
      {
        contains: MINT_CONTAINS,
        begin: '<{', end: '}>',
        className: 'tag'
      },
      {
        begin: '</?', end: '/?>',
        className: 'tag',
        contains: [
          {
            begin: /[^\/><\s]+/,
            className: 'name',
            relevance: 0
          },
          TAG_INTERNALS
        ]
      },
      {
        keywords: MINT_KEYWORDS,
        begin: 'style\\s+[a-zA-Z0-9-]+\\s*{',
        end: '}',
        contains: [
          {
            begin: '(?=[-a-zA-Z0-9]+\\s*:\\s*[^;]+)',
            end: ';',
            contains: [
              {
                begin: '[-a-zA-Z0-9]+\\s*',
                className: 'string',
                excludeEnd: true,
                end: ':',
              },
              {
                excludeEnd: true,
                endsParent: true,
                begin: '[^;]+',
                end: ';',
              }
            ]
          }
        ]
      }
   ])

  return {
    contains: MINT_CONTAINS,
    keywords: MINT_KEYWORDS,
    name: "Mint"
  }
}
