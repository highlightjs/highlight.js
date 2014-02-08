/*
Language: Thrift
Author: Oleg Efimov <efimovov@gmail.com>
Description: Thrift message definition format
*/

function(hljs) {
  return {
    keywords: {
      keyword:
        'namespace const typedef struct enum service exception void oneway|10 set list map required optional',
      built_in:
        'bool byte i16|5 i32|5 i64|5 double string binary',
      literal:
        'true false'
    },
    contains: [
      hljs.QUOTE_STRING_MODE,
      hljs.NUMBER_MODE,
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      {
        className: 'class',
        beginKeywords: 'struct enum service exception', end: /\{/,
        illegal: /\n/,
        contains: [
          hljs.inherit(hljs.TITLE_MODE, {
            starts: {endsWithParent: true, excludeEnd: true} // hack: eating everything after the first title
          })
        ]
      },
      {
        className: 'stl_container',
        begin: '\\b(set|list|map)\\s*<', end: '>',
        relevance: 5,
        contains: ['self']
      }
    ]
  };
}
