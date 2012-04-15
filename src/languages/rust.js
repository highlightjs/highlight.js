/*
Language: Rust
Author: Andrey Vlasovskikh <andrey.vlasovskikh@gmail.com>
*/

hljs.LANGUAGES.rust = function() {
  var TITLE = {
    className: 'title',
    begin: hljs.UNDERSCORE_IDENT_RE
  };
  var QUOTE_STRING = {
    className: 'string',
    begin: '"', end: '"',
    contains: [hljs.BACKSLASH_ESCAPE],
    relevance: 0
  };
  var NUMBER = {
    className: 'number',
    begin: '\\b(0[xb][A-Za-z0-9_]+|[0-9_]+(\\.[0-9_]+)?([uif](8|16|32|64)?)?)',
    relevance: 0
  };
  var KEYWORDS = {
    'alt': 1, 'any': 1, 'as': 1, 'assert': 1,
    'be': 1, 'bind': 1, 'block': 1, 'bool': 1, 'break': 1,
    'char': 1, 'check': 1, 'claim': 1, 'const': 1, 'cont': 1,
    'dir': 1, 'do': 1,
    'else': 1, 'enum': 1, 'export': 1,
    'f32': 1, 'f64': 1, 'fail': 1, 'false': 1, 'float': 1, 'fn': 10, 'for': 1,
    'i16': 1, 'i32': 1, 'i64': 1, 'i8': 1, 'if': 1, 'iface': 10, 'impl': 10, 'import': 1, 'in': 1, 'int': 1,
    'let': 1, 'log': 1,
    'mod': 1, 'mutable': 1,
    'native': 1, 'note': 1,
    'of': 1,
    'prove': 1, 'pure': 10,
    'resource': 1, 'ret': 1,
    'self': 1, 'str': 1, 'syntax': 1,
    'true': 1, 'type': 1,
    'u16': 1, 'u32': 1, 'u64': 1, 'u8': 1, 'uint': 1, 'unchecked': 1, 'unsafe': 1, 'use': 1,
    'vec': 1,
    'while': 1
  };
  return {
    defaultMode: {
      keywords: KEYWORDS,
      illegal: '</',
      contains: [
        hljs.C_LINE_COMMENT_MODE,
        hljs.C_BLOCK_COMMENT_MODE,
        QUOTE_STRING,
        hljs.APOS_STRING_MODE,
        NUMBER,
        {
          className: 'function',
          beginWithKeyword: true, end: '(\\(|<)',
          keywords: {'fn': 1},
          contains: [TITLE]
        },
        {
          className: 'preprocessor',
          begin: '#\\[', end: '\\]'
        },
        {
          beginWithKeyword: true, end: '(=|<)',
          keywords: {'type': 1},
          contains: [TITLE],
          illegal: '\\S'
        },
        {
          beginWithKeyword: true, end: '({|<)',
          keywords: {'iface': 1, 'enum': 1},
          contains: [TITLE],
          illegal: '\\S'
        }
      ]
    }
  };
}();
