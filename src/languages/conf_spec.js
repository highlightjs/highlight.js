/*
Language: Splunk conf spec
Contributors: Steven C. Van Wasshenova <steve.vanwasshenova@gmail.com>
Category: common, conf
*/

function(hljs) {
  var STRING = {
    className: "string",
    contains: [hljs.BACKSLASH_ESCAPE],
    variants: [
      {
        begin: "'''", end: "'''",
        relevance: 10
      }, {
        begin: '"""', end: '"""',
        relevance: 10
      }, {
        begin: '"', end: '"'
      }, {
        begin: "'", end: "'"
      }
    ]
  };
  return {
    aliases: ['conf_spec'],
    case_insensitive: true,
    illegal: /\S/,
    contains: [
      hljs.COMMENT(';', '$'),
      hljs.HASH_COMMENT_MODE,
      {
        className: 'section',
        begin: /^\s*\[+/, 
        end: /\]+/
      },
      {
        begin: /^^[\<A-Za-z\_]{1}[A-Za-z0-9\<\>\-\_\.\s\:\|\*\/]+\s*\=\s*/, end: '$',
        returnBegin: true,
        contains: [
          {
            className: 'attr',
            begin: /[A-Za-z0-9\[\]_-]+/
          },
          {
            begin: /=/, endsWithParent: true,
            relevance: 0,
            contains: [
              {
                className: 'variable',
                variants: [
                  {begin: /[A-Za-z0-9\-]+.+/},
                  {begin: /\<.+/},
                  {begin: /\[.+/}
                ]
              },
              STRING,
              {
                className: 'number',
                begin: /([\+\-]+)?[\d]+_[\d_]+/
              },
              hljs.NUMBER_MODE
            ]
          }
        ]
      }
    ]
  };
}
