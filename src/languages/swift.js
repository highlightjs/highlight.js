/*
Language: Swift
Description: Swift is a general-purpose programming language built using a modern approach to safety, performance, and software design patterns.
Author: Steven Van Impe <steven.vanimpe@icloud.com>
Contributors: Chris Eidhof <chris@eidhof.nl>, Nate Cook <natecook@gmail.com>, Alexander Lichter <manniL@gmx.net>, Richard Gibson <gibson042@github>
Website: https://swift.org
Category: common, system
*/

import * as Swift from './lib/kws_swift.js';
import {
  concat,
  either,
  lookahead
} from '../lib/regex.js';

/** @type LanguageFn */
export default function(hljs) {
  // https://docs.swift.org/swift-book/ReferenceManual/LexicalStructure.html#ID411
  const BLOCK_COMMENT = hljs.COMMENT(
    '/\\*',
    '\\*/',
    {
      contains: [ 'self' ]
    }
  );

  // https://docs.swift.org/swift-book/ReferenceManual/LexicalStructure.html#ID413
  // https://docs.swift.org/swift-book/ReferenceManual/zzSummaryOfTheGrammar.html
  const DOT_KEYWORD = {
    className: 'keyword',
    begin: concat(/\./, lookahead(either(...Swift.dotKeywords, ...Swift.optionalDotKeywords))),
    end: either(...Swift.dotKeywords, ...Swift.optionalDotKeywords),
    excludeBegin: true
  };
  const KEYWORD_GUARD = {
    // Consume .keyword to prevent highlighting properties and methods as keywords.
    begin: concat(/\./, either(...Swift.keywords)),
    relevance: 0
  };
  const PLAIN_KEYWORDS = Swift.keywords
    .filter(kw => typeof kw === 'string')
    .concat([ "_|0" ]); // seems common, so 0 relevance
  const REGEX_KEYWORDS = Swift.keywords
    .filter(kw => typeof kw !== 'string') // find regex
    .concat(Swift.keywordTypes)
    .map(Swift.keywordWrapper);
  const KEYWORD = {
    variants: [
      {
        className: 'keyword',
        begin: either(...REGEX_KEYWORDS, ...Swift.optionalDotKeywords)
      }
    ]
  };
  // find all the regular keywords
  const KEYWORDS = {
    $pattern: either(
      /\b\w+(\(\w+\))?/, // kw or kw(arg)
      /#\w+/ // number keywords
    ),
    keyword: PLAIN_KEYWORDS
      .concat(Swift.numberSignKeywords)
      .join(" "),
    literal: Swift.literals.join(" ")
  };
  const KEYWORD_MODES = [
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
  const OPERATOR_GUARD = {
    // Prevent -> from being highlighting as an operator.
    begin: /->/,
    relevance: 0
  };
  const OPERATOR = {
    className: 'operator',
    relevance: 0,
    variants: [
      {
        begin: Swift.operator
      },
      {
        // dot-operator: only operators that start with a dot are allowed to use dots as
        // characters (..., ...<, .*, etc). So there rule here is: a dot followed by one or more
        // characters that may also include dots.
        begin: `\\.(\\.|${Swift.operatorCharacter})+`
      }
    ]
  };
  const OPERATORS = [
    OPERATOR_GUARD,
    OPERATOR
  ];

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
  const AVAILABLE_ATTRIBUTE = {
    begin: /(@|#)available\(/,
    end: /\)/,
    keywords: {
      $pattern: /[@#]?\w+/,
      keyword: Swift.availabilityKeywords
        .concat([
          "@available",
          "#available"
        ])
        .join(' ')
    },
    contains: [
      ...OPERATORS,
      NUMBER,
      STRING
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
    AVAILABLE_ATTRIBUTE,
    KEYWORD_ATTRIBUTE,
    USER_DEFINED_ATTRIBUTE
  ];

  // https://docs.swift.org/swift-book/ReferenceManual/Types.html
  const TYPE = {
    begin: lookahead(/\b[A-Z]/),
    relevance: 0,
    contains: [
      { // Common Apple frameworks, for relevance boost
        className: 'type',
        begin: concat(/(AV|CA|CF|CG|CI|CL|CM|CN|CT|MK|MP|MTK|MTL|NS|SCN|SK|UI|WK|XC)/, Swift.identifierCharacter, '+')
      },
      { // Type identifier
        className: 'type',
        begin: Swift.typeIdentifier,
        relevance: 0
      },
      { // Optional type
        begin: /[?!]+/,
        relevance: 0
      },
      { // Variadic parameter
        begin: /\.\.\./,
        relevance: 0
      },
      { // Protocol composition
        begin: concat(/\s+&\s+/, lookahead(Swift.typeIdentifier)),
        relevance: 0
      }
    ]
  };
  const GENERIC_ARGUMENTS = {
    begin: /</,
    end: />/,
    keywords: KEYWORDS,
    contains: [
      ...KEYWORD_MODES,
      ...ATTRIBUTES,
      OPERATOR_GUARD,
      TYPE
    ]
  };
  TYPE.contains.push(GENERIC_ARGUMENTS);

  // Add supported submodes to string interpolation.
  for (const variant of STRING.variants) {
    const interpolation = variant.contains.find(mode => mode.label === "interpol");
    // TODO: Interpolation can contain any expression, so there's room for improvement here.
    interpolation.keywords = KEYWORDS;
    const submodes = [
      ...KEYWORD_MODES,
      ...BUILT_INS,
      ...OPERATORS,
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
    keywords: KEYWORDS,
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
            keywords: KEYWORDS,
            contains: [
              'self',
              ...KEYWORD_MODES,
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
        keywords: KEYWORDS,
        contains: [
          hljs.inherit(hljs.TITLE_MODE, {
            begin: /[A-Za-z$_][\u00C0-\u02B80-9A-Za-z$_]*/
          }),
          ...KEYWORD_MODES
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
      ...KEYWORD_MODES,
      ...BUILT_INS,
      ...OPERATORS,
      NUMBER,
      STRING,
      ...IDENTIFIERS,
      ...ATTRIBUTES,
      TYPE
    ]
  };
}
