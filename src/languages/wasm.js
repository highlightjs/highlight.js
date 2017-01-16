/*
Language: Web Assembly
Author: Rasmus Andersson <rsms.me>
Description: Web Assembly version MVP-13 (RC for v1)
Category: assembler
*/

function(hljs) {
  var KEYWORDS = {
    keyword:
      // special "unreachable" that is kind of like branching (trap & crash)
      'unreachable ' +
      // control-flow operators (branching)
      'block loop if else end br br_if br_table select call call_indirect return',
    title:
      // operations with no effect on the stack
      'nop '+
      // operators that affect the stack in some way
      'drop current_memory grow_memory '+
      'get_local set_local tee_local get_global set_global',
  };
  return {
  case_insensitive: true,
  aliases: ['webasm'],
  keywords: KEYWORDS,
  contains: [
    hljs.C_LINE_COMMENT_MODE,
    hljs.QUOTE_STRING_MODE,
    {
      className: 'function',
      begin: '\\b(i32|i64|f32|f64)\\.',
      end: '[^a-z0-9]',
      excludeEnd: true,
      contains: [
        hljs.TITLE_MODE,
      ]
    },
    {
      className: 'type',
      begin: '\\b(i32|i64|f32|f64)\\b',
      // end: '\\b',
      // excludeEnd: true,
    },
    {
      className: 'number',
      variants: [
        {begin: hljs.C_NUMBER_RE + '[dflsi]', relevance: 1},
        hljs.C_NUMBER_MODE
      ]
    },
  ]
  };
}
