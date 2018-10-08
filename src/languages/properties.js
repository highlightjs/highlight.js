/*
Language: Properties
Contributors: Valentin Aitken <valentin@nalisbg.com>
Category: common, config
*/

function(hljs) {
  return {
    case_insensitive: true,
    illegal: /\S/,
    contains: [
      hljs.HASH_COMMENT_MODE,
      hljs.COMMENT('!', '$'),
      {
        begin: /^[a-z0-9\[\]\._-]+\s*(=|:)\s*/, end: '$',
        returnBegin: true,
        contains: [
          {
            className: 'attr',
            begin: /[a-z0-9\[\]\._-]+/
          },
          {
            begin: /=/,
            relevance: 0,
            contains: [
              {
                className: "string",
                begin: /./, end: /$/
              }
            ]
          }
        ]
      }
    ]
  };
}
