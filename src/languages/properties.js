/*
Language: .properties
Contributors: Valentin Aitken <valentin@nalisbg.com>, Egor Rogov <e.rogov@postgrespro.ru>
Website: https://en.wikipedia.org/wiki/.properties
Category: common, config
*/

export default function(hljs) {

  // whitespaces: space, tab, formfeed
  var WS0 = '[ \\t\\f]*';
  var WS1 = '[ \\t\\f]+';
  // delimiter
  var EQUAL_DELIM = WS0+'[:=]'+WS0;
  var WS_DELIM = WS1;
  var DELIM = '(' + EQUAL_DELIM + '|' + WS_DELIM + ')';
  var KEY = '([^\\\\:= \\t\\f\\n]|\\\\.)+';

  var DELIM_AND_VALUE = {
          // skip DELIM
          end: DELIM,
          relevance: 0,
          starts: {
            // value: everything until end of line (again, taking into account backslashes)
            className: 'string',
            end: /$/,
            relevance: 0,
            contains: [
              { begin: '\\\\\\\\'},
              { begin: '\\\\\\n' }
            ]
          }
        };

  return {
    name: '.properties',
    case_insensitive: true,
    illegal: /\S/,
    contains: [
      hljs.COMMENT('^\\s*[!#]', '$'),
      // key: everything until whitespace or = or : (taking into account backslashes)
      // case of a key-value pair
      {
        returnBegin: true,
        variants: [
          { begin: KEY + EQUAL_DELIM, relevance: 1 },
          { begin: KEY + WS_DELIM, relevance: 0 }
        ],
        contains: [
          {
            className: 'attr',
            begin: KEY,
            endsParent: true,
            relevance: 0
          }
        ],
        starts: DELIM_AND_VALUE
      },
      // case of an empty key
      {
        className: 'attr',
        relevance: 0,
        begin: KEY + WS0 + '$'
      }
    ]
  };
}
