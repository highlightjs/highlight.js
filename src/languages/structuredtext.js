/*
Language: Structured Text (IEC 61131-3 ST)
Version: 1.0.0
Author: Björn Sauer <bjo.sauer@live.de>
Contributors:
Description: Language definition for IEC 61131-3 ST (Structured Text). Textual PLC programming language.
*/

function(hljs) {
  var KEYWORDS = 'and or xor not exit return continue of case end_case|10 ' +
    'to by end_for for end_while while do loop end_repeat repeat until ' +
    'end_if|10 if then else elsif mod';

  var LITERAL = 'true false';

  return {
    case_insensitive: true,

    aliases: ['structuredtext', 'iec-st', 'iec-61131'],

    illegal: /[$|{|#]/,

    keywords: {
      keyword: KEYWORDS,
      literal: LITERAL
    },

    contains: [
      hljs.COMMENT(/\(\*/, /\*\)/, { relevance: 10 }),

      {
        // Match numeric constants (1000, 12.34, 1.2e5, 1.5, 1.2E2)
        className: 'number',
        begin: /\b([0-9]+[0-9eE\.]*)\b/
      },

      {
        // Match typed numeric constants (BYTE#16#A0, REAL#1.165)
        className: 'number',
        begin: /\b(byte|word|dword|lword|sint|int|dint|lint|usint|uint|udint|ulint|real|lreal)#/,
        end: /\s*;/,
        excludeEnd: true,
        relevance: 10
      },

      {
        // Match string constants ('Hello World', STRING#'Hello World')
        className: 'string',
        begin: /\b(string#'.*?')|('.*?')/
      },

      {
        // Match and consume operators and keywords to not be detected as funcion. e.g.: or (
        className: '',
        beginKeywords: KEYWORDS + LITERAL,
        relevance: 0
      },

      {
        // Match and consume structure element to not be detected as funcion. e.g.: udtData.xElement (* Comment *)
        className: '',
        begin: /\.[a-zA-Z]\w+/,
        relevance: 0
      },

      {
        // Match a function.
        className: 'function',
        begin: /\b[a-zA-Z][a-zA-Z_\d]+\s*\(/,
        end: /\b\B/,
        returnBegin: true,
        contains: [
          {
            // Match the function title.
            className: 'title',
            begin: /[a-zA-Z][a-zA-Z_\d]+\s*/,
            end: /\(/,
            excludeEnd: true,
            endsParent: true
          }
        ]
      }
    ]
  }
}
