/*
Language: Ellie
Author: Ahmetcan Aksu <ahmetcanco@gmail.com>
Contributors: Ahmetcan Aksu <ahmetcanco@gmail.com>
Website: https://www.ellie-lang.org
Description: Ellie is a type-safe programing language that runs on embedded and sandboxed environments.
Category: common, embedded
*/

/** @type LanguageFn */
export default function (hljs) {
  const MAIN_KEYWORDS = [
    "fn",
    "v",
    "c",
    "co",
    "new",
    "class",
    "enum",
    "var",
    "const",
    "for",
    "loop",
    "brk",
    "go",
    "ret",
    "if",
    "else",
    "else if",
    "pri",
    "pub",
    "get",
    "set",
    "static",
    "import",
  ];

  const BUILT_INS = [
    "self",
  ];

  const LITERALS = [
    "true",
    "false",
    "null",
  ];

  const TYPES = [
    "int",
    "float",
    "double",
    "bool",
    "string",
    "char",
    "byte",
    "array",
  ];

  const KEYWORDS = {
    keyword: MAIN_KEYWORDS,
    literal: LITERALS,
    type: TYPES,
    built_in: BUILT_INS,
  };

  const STRINGS = {
    className: "string",
    variants: [
      { begin: /"/, end: /"/ },
      { begin: /'/, end: /'/ },
    ],
  };

  const FILE_KEY = {
    className: "meta",
    begin: /\@/g,
    end: /=/,
    relevance: 0,
  };

  const IMPORT = {
    className: "keyword",
    beginKeywords: "import",
    end: /;/,
    contains: [
      hljs.TITLE_MODE,
      {
        begin: /:/,
        contains: [hljs.TITLE_MODE],
      },
    ],
  };

  const CONST_VARIABLE = {
    className: "keyword",
    beginKeywords: "c",
    end: /\s/,
    excludeEnd: true,
    contains: [hljs.TITLE_MODE],
  };

  const VARIABLE = {
    className: "keyword",
    beginKeywords: "v",
    end: /\s/,
    excludeEnd: true,
    contains: [hljs.TITLE_MODE],
  };

  const CLASS = {
    className: "class",
    beginKeywords: "class",
    end: /\{/,
    excludeEnd: true,
    contains: [
      hljs.TITLE_MODE,
      {
        className: "params",
        begin: /\(/,
        end: /\)/,
        endsParent: true,
        contains: [
          {
            className: "age",
            beginKeywords: "age",
            endsParent: true,
            contains: [hljs.NUMBER_MODE],
          },
        ],
      },
    ],
  };

  const FUNCTION = {
    beginKeywords: "fn",
    end: /{/,
    contains: [
      hljs.TITLE_MODE,
      {
        begin: /\(/,
        end: /\)/,
        contains: [
          {
            begin: /(\b[a-zA-Z_]+\b)\s*:\s*/,
            end: /(?=,|\))/,
            contains: [
              hljs.TITLE_MODE,
              {
                beginKeywords: "int float double bool char byte string",
                endsWithParent: true,
                relevance: 0,
              },
            ],
          },
        ],
      },
    ],
  };

  const INTEGERS = {
    // Match decimal integers
    className: "number",
    begin: "\\b\\d+\\b",
    relevance: 0,
  };

  const BYTE = {
    // Match hexadecimal integers
    className: "number",
    begin: "\\b0x[0-9a-fA-F]+\\b",
    relevance: 0,
  };

  const DOUBLE = {
    // Match decimal floating point numbers with a "d" suffix
    className: "number",
    begin: "\\b\\d+\\.\\d+d\\b",
    relevance: 0,
  };
  const FLOAT = {
    // Match decimal floating point numbers with an "f" suffix
    className: "number",
    begin: "\\b\\d+\\.\\d+f\\b",
    relevance: 0,
  };

  const DECIMALS = {
    // Match decimal floating point numbers with no suffix
    className: "number",
    begin: "\\b\\d*\\.\\d+\\b",
    relevance: 0,
  };

  const NEG_INTEGERS = {
    // Match negative numbers
    className: "number",
    begin: "-\\b\\d+\\b",
    relevance: 0,
  };

  return {
    name: "Ellie",
    aliases: ["ei"],
    keywords: KEYWORDS,
    illegal: /<\/|#/,
    contains: [
      hljs.COMMENT(
        "/\\*\\*",
        "\\*/",
        {
          relevance: 0,
          contains: [],
        },
      ),
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      STRINGS,
      FILE_KEY,
      IMPORT,
      CONST_VARIABLE,
      VARIABLE,
      CLASS,
      FUNCTION,
      BYTE,
      DOUBLE,
      FLOAT,
      INTEGERS,
      DECIMALS,
      NEG_INTEGERS,
    ],
  };
}
