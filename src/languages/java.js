/*
Language: Java
Author: Vsevolod Solovyov <vsevolod.solovyov@gmail.com>
Category: common, enterprise
Website: https://www.java.com/
*/

import * as regex from '../lib/regex.js';

export default function(hljs) {
  var JAVA_IDENT_RE = '[\u00C0-\u02B8a-zA-Z_$][\u00C0-\u02B8a-zA-Z_$0-9]*';
  var GENERIC_IDENT_RE = JAVA_IDENT_RE + '(<' + JAVA_IDENT_RE + '(\\s*,\\s*' + JAVA_IDENT_RE + ')*>)?';
  var KEYWORDS = 'false synchronized int abstract float private char boolean var static null if const ' +
    'for true while long strictfp finally protected import native final void ' +
    'enum else break transient catch instanceof byte super volatile case assert short ' +
    'package default double public try this switch continue throws protected public private ' +
    'module requires exports do';

  var ANNOTATION = {
    className: 'meta',
    begin: '@' + JAVA_IDENT_RE,
    contains: [
      {
        begin: /\(/,
        end: /\)/,
        contains: ["self"] // allow nested () inside our annotation
      },
    ]
  };
  /**
   * A given sequence, possibly with underscores
   * @type {(s: string | RegExp) => string}  */
  var SEQUENCE_ALLOWING_UNDERSCORES = (seq) => regex.concat('[', seq, ']+([', seq, '_]*[', seq, ']+)?');
  var JAVA_NUMBER_MODE = {
    className: 'number',
    variants: [
      { begin: `\\b(0[bB]${SEQUENCE_ALLOWING_UNDERSCORES('01')})[lL]?` }, // binary
      { begin: `\\b(0${SEQUENCE_ALLOWING_UNDERSCORES('0-7')})[dDfFlL]?` }, // octal
      {
        begin: regex.concat(
          /\b0[xX]/,
          regex.either(
            regex.concat(SEQUENCE_ALLOWING_UNDERSCORES('a-fA-F0-9'), /\./, SEQUENCE_ALLOWING_UNDERSCORES('a-fA-F0-9')),
            regex.concat(SEQUENCE_ALLOWING_UNDERSCORES('a-fA-F0-9'), /\.?/),
            regex.concat(/\./, SEQUENCE_ALLOWING_UNDERSCORES('a-fA-F0-9'))
          ),
          /([pP][+-]?(\d+))?/,
          /[fFdDlL]?/ // decimal & fp mixed for simplicity
        )
      },
      // scientific notation
      { begin: regex.concat(
        /\b/,
        regex.either(
          regex.concat(/\d*\./, SEQUENCE_ALLOWING_UNDERSCORES("\\d")), // .3, 3.3, 3.3_3
          SEQUENCE_ALLOWING_UNDERSCORES("\\d") // 3, 3_3
        ),
        /[eE][+-]?[\d]+[dDfF]?/)
      },
      // decimal & fp mixed for simplicity
      { begin: regex.concat(
        /\b/,
        SEQUENCE_ALLOWING_UNDERSCORES(/\d/),
        regex.optional(/\.?/),
        regex.optional(SEQUENCE_ALLOWING_UNDERSCORES(/\d/)),
        /[dDfFlL]?/)
      }
    ],
    relevance: 0
  };

  return {
    name: 'Java',
    aliases: ['jsp'],
    keywords: KEYWORDS,
    illegal: /<\/|#/,
    contains: [
      hljs.COMMENT(
        '/\\*\\*',
        '\\*/',
        {
          relevance: 0,
          contains: [
            {
              // eat up @'s in emails to prevent them to be recognized as doctags
              begin: /\w+@/, relevance: 0
            },
            {
              className: 'doctag',
              begin: '@[A-Za-z]+'
            }
          ]
        }
      ),
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      hljs.APOS_STRING_MODE,
      hljs.QUOTE_STRING_MODE,
      {
        className: 'class',
        beginKeywords: 'class interface enum', end: /[{;=]/, excludeEnd: true,
        keywords: 'class interface enum',
        illegal: /[:"\[\]]/,
        contains: [
          { beginKeywords: 'extends implements' },
          hljs.UNDERSCORE_TITLE_MODE
        ]
      },
      {
        // Expression keywords prevent 'keyword Name(...)' from being
        // recognized as a function definition
        beginKeywords: 'new throw return else',
        relevance: 0
      },
      {
        className: 'class',
        begin: 'record\\s+' + hljs.UNDERSCORE_IDENT_RE + '\\s*\\(',
        returnBegin: true,
        excludeEnd: true,
        end: /[{;=]/,
        keywords: KEYWORDS,
        contains: [
          { beginKeywords: "record" },
          {
            begin: hljs.UNDERSCORE_IDENT_RE + '\\s*\\(',
            returnBegin: true,
            relevance: 0,
            contains: [hljs.UNDERSCORE_TITLE_MODE]
          },
          {
            className: 'params',
            begin: /\(/, end: /\)/,
            keywords: KEYWORDS,
            relevance: 0,
            contains: [
              hljs.C_BLOCK_COMMENT_MODE
            ]
          },
          hljs.C_LINE_COMMENT_MODE,
          hljs.C_BLOCK_COMMENT_MODE
        ]
      },
      {
        className: 'function',
        begin: '(' + GENERIC_IDENT_RE + '\\s+)+' + hljs.UNDERSCORE_IDENT_RE + '\\s*\\(', returnBegin: true, end: /[{;=]/,
        excludeEnd: true,
        keywords: KEYWORDS,
        contains: [
          {
            begin: hljs.UNDERSCORE_IDENT_RE + '\\s*\\(', returnBegin: true,
            relevance: 0,
            contains: [hljs.UNDERSCORE_TITLE_MODE]
          },
          {
            className: 'params',
            begin: /\(/, end: /\)/,
            keywords: KEYWORDS,
            relevance: 0,
            contains: [
              ANNOTATION,
              hljs.APOS_STRING_MODE,
              hljs.QUOTE_STRING_MODE,
              hljs.C_NUMBER_MODE,
              hljs.C_BLOCK_COMMENT_MODE
            ]
          },
          hljs.C_LINE_COMMENT_MODE,
          hljs.C_BLOCK_COMMENT_MODE
        ]
      },
      JAVA_NUMBER_MODE,
      ANNOTATION
    ]
  };
}
