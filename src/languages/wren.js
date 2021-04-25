/*
Language: Wren
Description: Think Smalltalk in a Lua-sized package with a dash of Erlang and wrapped up in a familiar, modern syntax.
Category: scripting
Author: @joshgoebel
Maintainer: @joshgoebel
Website: https://wren.io/
*/

import * as regex from '../lib/regex.js';

/** @type LanguageFn */
export default function(hljs) {
  const IDENT_RE = /[a-zA-Z]\w*/;
  const KEYWORDS = [
    "as",
    "break",
    "class",
    "construct",
    "continue",
    "else",
    "for",
    "foreign",
    "if",
    "import",
    "in",
    "is",
    "return",
    "static",
    "var",
    "while"
  ];
  const LITERALS = [
    "true",
    "false",
    "null"
  ];
  const LANGUAGE_VARS = [
    "this",
    "super"
  ];
  const CORE_CLASSES = [
    "Bool",
    "Class",
    "Fiber",
    "Fn",
    "List",
    "Map",
    "Null",
    "Num",
    "Object",
    "Range",
    "Sequence",
    "String",
    "System"
  ];
  const FUNCTION = {
    relevance: 0,
    match: regex.concat(/\b(?!(if|while|for|else|super)\b)/, IDENT_RE, /(?=\s*[({])/),
    className: "title.function"
  };
  const FUNCTION_DEFINITION = {
    relevance: 0,
    match: regex.concat(
      /\b(?!(if|while|for|else|super)\b)/,
      IDENT_RE,
      /(?=\s*\([^)]+\)\s*\{)/),
    className: "title.function",
    starts: {
      contains: [
        {
          begin: /\(/,
          end: /\)/,
          contains: [
            {
              relevance: 0,
              scope: "params",
              match: IDENT_RE
            }
          ]
        }
      ]
    }
  };
  const CLASS_DEFINITION = {
    variants: [
      {
        match: [
          /class\s+/,
          IDENT_RE,
          /\s+is\s+/,
          IDENT_RE
        ]
      },
      {
        match: [
          /class\s+/,
          IDENT_RE
        ]
      }
    ],
    scope: {
      2: "title.class",
      4: "title.class.inherited"
    },
    keywords: KEYWORDS
  };

  const OPERATOR = {
    relevance: 0,
    match: regex.either(...[
      "-",
      "~",
      /\*/,
      "%",
      /\.\.\./,
      /\.\./,
      /\+/,
      "<<", ">>",
      ">=", "<=",
      "<", ">",
      /\^/,
      /!=/,
      /!/,
      /\bis\b/,
      "==",
      "&&",
      "&",
      /\|\|/,
      /\|/,
      /\?:/,
      "="
    ]),
    className: "operator"
  };

  const TRIPLE_STRING = {
    className: "string",
    begin: /"""/,
    end: /"""/
  };

  const PROPERTY = {
    begin: regex.concat(/\./, regex.lookahead(IDENT_RE)),
    end: IDENT_RE,
    excludeBegin: true,
    keywords: "prototype",
    className: "property",
    relevance: 0
  };

  const FIELD = {
    relevance: 0,
    match: regex.concat(/\b_/, IDENT_RE),
    scope: "variable"
  };

  // CamelCase
  const CLASS_REFERENCE = {
    relevance: 0,
    match: /[A-Z]+[a-z]+([A-Z]+[a-z]+)*/,
    scope: "title.class",
    keywords: {
      _: CORE_CLASSES
    }
  };

  // TODO: add custom number modes
  const NUMBER = hljs.C_NUMBER_MODE;

  const SETTER = {
    match: [
      IDENT_RE, /\s*/,
      /=/, /\s*/,
      /\(/, IDENT_RE, /\)/
    ],
    scope: {
      1: "title.function",
      3: "operator"
    }
  };

  const COMMENT_DOCS = hljs.COMMENT(
    /\/\*\*/,
    /\*\//,
    {
      contains: [
        {
          match: /@[a-z]+/,
          scope: "doctag"
        },
        "self"
      ]
    }
  );

  return {
    name: "Wren",
    keywords: {
      keyword: KEYWORDS,
      "variable.language": LANGUAGE_VARS,
      literal: LITERALS
    },
    contains: [
      NUMBER,
      hljs.QUOTE_STRING_MODE,
      TRIPLE_STRING,
      COMMENT_DOCS,
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      CLASS_REFERENCE,
      CLASS_DEFINITION,
      SETTER,
      FUNCTION_DEFINITION,
      FUNCTION,
      OPERATOR,
      FIELD,
      PROPERTY
    ]
  };
}
