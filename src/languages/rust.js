/*
Language: Rust
Author: Andrey Vlasovskikh <andrey.vlasovskikh@gmail.com>
*/

function(hljs) {
  return {
    aliases: ['rs'],
    keywords:
      'assert bool break char check claim comm const cont copy dir do drop ' +
      'else enum extern export f32 f64 fail false float fn for i16 i32 i64 i8 ' +
      'if impl int let log loop match mod move mut priv pub pure ref return ' +
      'self static str struct task true trait type u16 u32 u64 u8 uint unsafe ' +
      'use vec while',
    illegal: '</',
    contains: [
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      hljs.inherit(hljs.QUOTE_STRING_MODE, {illegal: null}),
      hljs.APOS_STRING_MODE,
      {
        className: 'number',
        begin: '\\b(0[xb][A-Za-z0-9_]+|[0-9_]+(\\.[0-9_]+)?([uif](8|16|32|64)?)?)',
        relevance: 0
      },
      {
        className: 'function',
        beginKeywords: 'fn', end: '(\\(|<)', excludeEnd: true,
        contains: [hljs.UNDERSCORE_TITLE_MODE]
      },
      {
        className: 'preprocessor',
        begin: '#\\[', end: '\\]'
      },
      {
        beginKeywords: 'type', end: '(=|<)',
        contains: [hljs.UNDERSCORE_TITLE_MODE],
        illegal: '\\S'
      },
      {
        beginKeywords: 'trait enum', end: '({|<)',
        contains: [hljs.UNDERSCORE_TITLE_MODE],
        illegal: '\\S'
      },
      {
        begin: '->'
      }
    ]
  };
}
