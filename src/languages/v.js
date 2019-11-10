/*
Language: V
Author: Alex Medvednikov <alexander@medvednikov.com>
Description: The V Programming Language (vlang). For info about language
Website: http://vlang.org/
Category: common, system
*/

function(hljs) {
  var V_KEYWORDS = {
    keyword:
      'break assert const continue defer else enum fn for go goto if $if import in interface match module mut none or pub return struct type' +
      'bool string i8 i16 int i64 i128 byte u16 u32 u64 u128 rune f32 f64 byteptr voidptr',
    literal:
       'true false',
    built_in:
      'panic eprintln println'
  };
  return {
    aliases: ['vlang'],
    keywords: V_KEYWORDS,
    illegal: '</',
    contains: [
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      {
        className: 'string',
        variants: [
          hljs.QUOTE_STRING_MODE,
          hljs.APOS_STRING_MODE,
          {begin: '`', end: '`'},
        ]
      },
      {
        className: 'number',
        variants: [
          {begin: hljs.C_NUMBER_RE + '[i]', relevance: 1},
          hljs.C_NUMBER_MODE
        ]
      },
      {
        begin: /:=/ // relevance booster
      },
      {
        className: 'function',
        beginKeywords: 'fn', end: '\\s*(\\{|$)', excludeEnd: true,
        contains: [
          hljs.UNDERSCORE_TITLE_MODE,
          {
            className: 'params',
            begin: /\(/, end: /\)/,
            keywords: V_KEYWORDS,
            illegal: /["']/
          }
        ]
      }
    ]
  };
}
