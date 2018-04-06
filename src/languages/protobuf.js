/*
Language: Protocol Buffers
Author: Dan Tao <daniel.tao@gmail.com>
Description: Protocol buffer message definition format
Category: protocols
*/

function(hljs) {
  var KEYWORDS = {
    keyword:
      'syntax package import option optional required repeated group' +
      'oneof returns',
    built_in:
      'double float int32 int64 uint32 uint64 sint32 sint64 ' +
      'fixed32 fixed64 sfixed32 sfixed64 bool string bytes',
    literal:
      'true false'
  };

  return {
    keywords: KEYWORDS,
    contains: [
      // Quotes strings should be highlighted.
      hljs.QUOTE_STRING_MODE,

      // Raw numbers should be highlighted also.
      hljs.NUMBER_MODE,

      // Protobuf supports both // and /* */ style comments.
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,

      // Messages, Services, and Enums
      {
        className: 'class',
        beginKeywords: 'message service enum',
        end: /\{/,
        contains: [
          hljs.TITLE_MODE,
        ]
      },

      // RPCs
      {
        className: 'function',
        beginKeywords: 'rpc',
        end: /[;\{]/,
        returnBegin: true,
        excludeEnd: true,
        keywords: 'rpc returns',
        contains: [
          {
            beginKeywords: 'rpc returns',
            relevance: 0
          },
          {
            className: 'title',
            begin: hljs.IDENT_RE
          },
          {
            className: 'params',
            begin: /\(/, end: /\)/,
            contains: [hljs.TITLE_MODE]
          }
        ]
      },

      // Fields with types
      {
        beginKeywords: KEYWORDS.built_in + ' optional required repeated',
        excludeBegin: true,
        contains: [
          {
            className: 'type',
            begin: /\s*[A-Z_]+/,
            end: /\s/
          }
        ]
      },

      {
        className: 'type',
        begin: /^\s*[A-Z_]+/,
        end: /\s/,
        excludeEnd: true
      }
    ]
  };
}
