/*
Language: Swift
Description: Swift is a general-purpose programming language built using a modern approach to safety, performance, and software design patterns.
Author: Steven Van Impe <steven.vanimpe@icloud.com>
Contributors: Chris Eidhof <chris@eidhof.nl>, Nate Cook <natecook@gmail.com>, Alexander Lichter <manniL@gmx.net>, Richard Gibson <gibson042@github>
Website: https://swift.org
Category: common, system
*/

import * as Swift from './lib/swift.js';
import {
  concat,
  either
} from '../lib/regex.js';

/** @type LanguageFn */
export default function(hljs) {
  // https://docs.swift.org/swift-book/ReferenceManual/LexicalStructure.html#ID413
  // https://docs.swift.org/swift-book/ReferenceManual/zzSummaryOfTheGrammar.html
  const DOT_KEYWORD = {
    begin: concat(/\./, either(...Swift.dotKeywords, ...Swift.optionalDotKeywords)),
    returnBegin: true,
    contains: [
      {
        begin: /\./
      },
      {
        className: 'keyword',
        begin: either(...Swift.dotKeywords, ...Swift.optionalDotKeywords)
      }
    ]
  };
  const KEYWORD_GUARD = {
    // Consume .keyword to prevent highlighting properties and methods as keywords.
    begin: concat(/\./, either(...Swift.keywords)),
    relevance: 0
  };
  const KEYWORD = {
    className: 'keyword',
    variants: [
      {
        begin: either(...Swift.keywords, ...Swift.optionalDotKeywords)
      },
      {
        begin: concat(/#/, either(...Swift.numberKeywords))
      }
    ]
  };
  const KEYWORDS = [
    DOT_KEYWORD,
    KEYWORD_GUARD,
    KEYWORD
  ];

  // https://github.com/apple/swift/tree/main/stdlib/public/core
  const BUILT_IN_GUARD = {
    // Consume .built_in to prevent highlighting properties and methods.
    begin: concat(/\./, either(...Swift.builtIns)),
    relevance: 0
  };
  const BUILT_IN = {
    className: 'built_in',
    begin: concat(/\b/, either(...Swift.builtIns), /(?=\()/)
  };
  const BUILT_INS = [
    BUILT_IN_GUARD,
    BUILT_IN
  ];

  // https://docs.swift.org/swift-book/ReferenceManual/LexicalStructure.html#ID418
  const OPERATOR = {
    className: 'operator',
    variants: [
      {
        begin: `${Swift.operatorHead}${Swift.operatorCharacter}*`
      },
      {
        begin: `\\.(\\.|${Swift.operatorCharacter})+`
      }
    ]
  };

  // https://docs.swift.org/swift-book/ReferenceManual/LexicalStructure.html#grammar_numeric-literal
  // TODO: Update for leading `-` after lookbehind is supported everywhere
  const decimalDigits = '([0-9]_*)+';
  const hexDigits = '([0-9a-fA-F]_*)+';
  const NUMBER = {
    className: 'number',
    relevance: 0,
    variants: [
      // decimal floating-point-literal (subsumes decimal-literal)
      {
        begin: `\\b(${decimalDigits})(\\.(${decimalDigits}))?` + `([eE][+-]?(${decimalDigits}))?\\b`
      },
      // hexadecimal floating-point-literal (subsumes hexadecimal-literal)
      {
        begin: `\\b0x(${hexDigits})(\\.(${hexDigits}))?` + `([pP][+-]?(${decimalDigits}))?\\b`
      },
      // octal-literal
      {
        begin: /\b0o([0-7]_*)+\b/
      },
      // binary-literal
      {
        begin: /\b0b([01]_*)+\b/
      }
    ]
  };

  // https://docs.swift.org/swift-book/ReferenceManual/LexicalStructure.html#grammar_string-literal
  const ESCAPED_CHARACTER = (rawDelimiter = "") => ({
    className: 'subst',
    variants: [
      {
        begin: concat(/\\/, rawDelimiter, /[0\\tnr"']/)
      },
      {
        begin: concat(/\\/, rawDelimiter, /u\{[0-9a-fA-F]{1,8}\}/)
      }
    ]
  });
  const ESCAPED_NEWLINE = (rawDelimiter = "") => ({
    className: 'subst',
    begin: concat(/\\/, rawDelimiter, /[\t ]*(?:[\r\n]|\r\n)/)
  });
  const INTERPOLATION = (rawDelimiter = "") => ({
    className: 'subst',
    label: "interpol",
    begin: concat(/\\/, rawDelimiter, /\(/),
    end: /\)/
  });
  const MULTILINE_STRING = (rawDelimiter = "") => ({
    begin: concat(rawDelimiter, /"""/),
    end: concat(/"""/, rawDelimiter),
    contains: [
      ESCAPED_CHARACTER(rawDelimiter),
      ESCAPED_NEWLINE(rawDelimiter),
      INTERPOLATION(rawDelimiter)
    ]
  });
  const SINGLE_LINE_STRING = (rawDelimiter = "") => ({
    begin: concat(rawDelimiter, /"/),
    end: concat(/"/, rawDelimiter),
    contains: [
      ESCAPED_CHARACTER(rawDelimiter),
      INTERPOLATION(rawDelimiter)
    ]
  });
  const STRING = {
    className: 'string',
    variants: [
      MULTILINE_STRING(),
      MULTILINE_STRING("#"),
      MULTILINE_STRING("##"),
      MULTILINE_STRING("###"),
      SINGLE_LINE_STRING(),
      SINGLE_LINE_STRING("#"),
      SINGLE_LINE_STRING("##"),
      SINGLE_LINE_STRING("###")
    ]
  };

  // https://docs.swift.org/swift-book/ReferenceManual/LexicalStructure.html#ID412
  const QUOTED_IDENTIFIER = {
    begin: concat(/`/, Swift.identifier, /`/)
  };
  const IMPLICIT_PARAMETER = {
    className: 'variable',
    begin: /\$\d+/
  };
  const PROPERTY_WRAPPER_PROJECTION = {
    className: 'variable',
    begin: `\\$${Swift.identifierCharacter}+`
  };
  const IDENTIFIERS = [
    QUOTED_IDENTIFIER,
    IMPLICIT_PARAMETER,
    PROPERTY_WRAPPER_PROJECTION
  ];

  // https://docs.swift.org/swift-book/ReferenceManual/Attributes.html
  const AVAILABLE = {
    begin: /(@|#)available/,
    returnBegin: true,
    contains: [
      {
        className: 'keyword',
        begin: /(@|#)available/
      },
      {
        begin: /\(/,
        end: /\)/,
        endsParent: true,
        keywords: Swift.availabilityKeywords.join(' '),
        contains: [
          OPERATOR,
          NUMBER,
          STRING
        ]
      }
    ]
  };
  const KEYWORD_ATTRIBUTE = {
    className: 'keyword',
    begin: concat(/@/, either(...Swift.keywordAttributes))
  };
  const USER_DEFINED_ATTRIBUTE = {
    className: 'meta',
    begin: concat(/@/, Swift.identifier)
  };
  const ATTRIBUTES = [
    AVAILABLE,
    KEYWORD_ATTRIBUTE,
    USER_DEFINED_ATTRIBUTE
  ];

  const TYPE = {
    className: 'type',
    begin: '\\b[A-Z][\\w\u00C0-\u02B8\']*',
    relevance: 0
  };
  // slightly more special to swift
  const OPTIONAL_USING_TYPE = {
    className: 'type',
    begin: '\\b[A-Z][\\w\u00C0-\u02B8\']*[!?]'
  };
  const BLOCK_COMMENT = hljs.COMMENT(
    '/\\*',
    '\\*/',
    {
      contains: [ 'self' ]
    }
  );

  // Add supported submodes to string interpolation.
  for (const variant of STRING.variants) {
    const interpolation = variant.contains.find(mode => mode.label === "interpol");
    // TODO: Interpolation can contain any expression, so there's room for improvement here.
    const submodes = [
      ...KEYWORDS,
      ...BUILT_INS,
      OPERATOR,
      NUMBER,
      STRING,
      ...IDENTIFIERS
    ];
    interpolation.contains = [
      ...submodes,
      {
        begin: /\(/,
        end: /\)/,
        contains: [
          'self',
          ...submodes
        ]
      }
    ];
  }

  return {
    name: 'Swift',
    contains: [
      hljs.C_LINE_COMMENT_MODE,
      BLOCK_COMMENT,
      {
        className: 'function',
        beginKeywords: 'func',
        end: /\{/,
        excludeEnd: true,
        contains: [
          hljs.inherit(hljs.TITLE_MODE, {
            begin: /[A-Za-z$_][0-9A-Za-z$_]*/
          }),
          {
            begin: /</,
            end: />/
          },
          {
            className: 'params',
            begin: /\(/,
            end: /\)/,
            endsParent: true,
            contains: [
              'self',
              ...KEYWORDS,
              NUMBER,
              STRING,
              hljs.C_BLOCK_COMMENT_MODE,
              { // relevance booster
                begin: ':'
              }
            ],
            illegal: /["']/
          }
        ],
        illegal: /\[|%/
      },
      {
        className: 'class',
        beginKeywords: 'struct protocol class extension enum',
        end: '\\{',
        excludeEnd: true,
        contains: [
          hljs.inherit(hljs.TITLE_MODE, {
            begin: /[A-Za-z$_][\u00C0-\u02B80-9A-Za-z$_]*/
          }),
          ...KEYWORDS
        ]
      },
      {
        beginKeywords: 'import',
        end: /$/,
        contains: [
          hljs.C_LINE_COMMENT_MODE,
          BLOCK_COMMENT
        ],
        relevance: 0
      },
      ...KEYWORDS,
      ...BUILT_INS,
      OPERATOR,
      NUMBER,
      STRING,
      ...IDENTIFIERS,
      ...ATTRIBUTES,
      OPTIONAL_USING_TYPE,
      TYPE
    ]
  };
}
