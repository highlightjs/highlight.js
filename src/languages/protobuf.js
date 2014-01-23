/*
Language: Protocol Buffers
Author: Dan Tao <daniel.tao@gmail.com>
Description: Protocol buffer message definition format
*/

function(hljs) {
  return {
    keywords: {
      keyword: 'package import option optional required repeated group',
      built_in: 'double float int32 int64 uint32 uint64 sint32 sint64 ' +
        'fixed32 fixed64 sfixed32 sfixed64 bool string bytes'
    },
    contains: [
      hljs.QUOTE_STRING_MODE,
      hljs.NUMBER_MODE,
      hljs.C_LINE_COMMENT_MODE,
      {
        className: 'literal',
        begin: /\b(?:true|false)\b/
      },
      {
        className: 'class',
        begin: /^\s*(?:message|enum|service)\s+/, excludeBegin: true,
        end: /\{/, excludeEnd: true,
        illegal: '\\n',
      },
      {
        className: 'function',
        begin: /^\s*rpc\s+/, excludeBegin: true,
        end: /\(/, excludeEnd: true
      },
      {
        className: 'title',
        begin: /^\s*[A-Z_]+/,
        end: /\s*=/, excludeEnd: true
      }
    ]
  };
}
