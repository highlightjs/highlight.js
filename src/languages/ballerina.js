/*
Language: Ballerina
Description: Open source, cloud-native programming language optimized for integration
Requires: xml.js
Author: Yasith Deelaka <yasitham@wso2.com>
Website: https://ballerina.io
*/

/** @type LanguageFn **/
export default function (hljs) {
  // variables
  const KEYWORD_CONTROL = [
    "fork",
    "join",
    "while",
    "returns",
    "transaction",
    "transactional",
    "retry",
    "commit",
    "rollback",
    "typeof",
    "enum",
    "wait",
    "match",
  ];

  const CONTROL_STATEMENTS = ["if", "else"];

  const ITERATION = ["for", "foreach"];

  const KEYWORD_CONTROL_FLOW = [
    "return",
    "break",
    "continue",
    "check",
    "checkpanic",
    "panic",
    "trap",
    "from",
    "where",
  ];

  const KEYWORD_OTHER = [
    "public",
    "private",
    "external",
    "return",
    "record",
    "object",
    "remote",
    "abstract",
    "client",
    "true",
    "false",
    "fail",
    "import",
    "version",
    "as",
    "on",
    "function",
    "resource",
    "listener",
    "const",
    "final",
    "is",
    "null",
    "lock",
    "annotation",
    "source",
    "worker",
    "parameter",
    "field",
    "isolated",
    "in",
    "xmlns",
    "table",
    "key",
    "let",
    "new",
    "select",
    "start",
    "flush",
    "default",
    "do",
    "base16",
    "base64",
    "conflict",
    "limit",
    "outer",
    "equals",
    "order",
    "by",
    "ascending",
    "descending",
    "class",
    "configurable",
    "variable",
    "module",
    "service",
    "group",
    "collect",
  ];

  const TYPES = [
    "handle",
    "any",
    "future",
    "typedesc",
    "boolean",
    "int",
    "string",
    "float",
    "decimal",
    "byte",
    "json",
    "xml",
    "anydata",
    "map",
    "error",
    "never",
    "readonly",
    "distinct",
    "stream",
    "type",
    "var",
  ];

  const BUILT_INS = ["self"];

  const LITERALS = ["true", "false"];

  const BAL_KEYWORDS = [
    ...KEYWORD_CONTROL,
    ...CONTROL_STATEMENTS,
    ...ITERATION,
    ...KEYWORD_CONTROL_FLOW,
    ...KEYWORD_OTHER,
  ];

  const KEYWORDS = {
    keyword: BAL_KEYWORDS,
    literals: LITERALS,
    type: TYPES,
    built_in: BUILT_INS,
  };

  // regexes
  const KEYWORD_RE = new RegExp("(?:" + BAL_KEYWORDS.join("|") + ")");
  const TYPE_RE = new RegExp("(?:" + TYPES.join("|") + ")");
  const C_NUMBER_RE =
    /(-?)(\b0[xX][a-fA-F0-9]+|(\b\d+((?<!\.)\.(?!\.)\d*)?|(?<!\.)\.(?!\.)\d+)([eE][-+]?\d+)?)/;

  // modes
  const TEMPLATE_STRING_MODE = {
    scope: "string",
    begin: /`/,
    end: /`/,
    contains: [
      hljs.BACKSLASH_ESCAPE,
      {
        scope: "variable",
        begin: /\$\{/,
        end: /\}/,
        excludeBegin: true,
        excludeEnd: true,
      },
    ],
  };

  const APOS_STRING_MODE = {
    scope: "string",
    begin: "'",
    end: "'",
    illegal: "\\n",
    contains: [
      hljs.BACKSLASH_ESCAPE,
      {
        match: KEYWORD_RE,
        relevance: 0,
      },
    ],
    relevance: 0,
  };

  const QUOTE_STRING_MODE = {
    scope: "string",
    begin: '"',
    end: '"',
    illegal: "\\n",
    contains: [
      hljs.BACKSLASH_ESCAPE,
      {
        match: KEYWORD_RE,
        relevance: 0,
      },
    ],
  };

  const STRING_MODE = {
    scope: "string",
    variants: [APOS_STRING_MODE, QUOTE_STRING_MODE, TEMPLATE_STRING_MODE],
  };

  const C_NUMBER_MODE = {
    scope: "number",
    begin: C_NUMBER_RE,
    relevance: 0,
  };

  const NUMBER_MODE = {
    scope: "number",
    variants: [C_NUMBER_MODE, hljs.BINARY_NUMBER_MODE],
  };

  const OPERATOR_MODE = {
    scope: "operator",
    match:
      /(!|%|\+|\-|\*|~=|===|==|=|!=|!==|<|>|&|\||\?:|\.\.\.|<=|>=|&&|\|\||~|>>|>>>)/,
    relevance: 0,
  };

  const VARIABLE_MODE = {
    variants: [
      {
        begin: [
          TYPE_RE.source,
          /(?:\[[\w\*]*\])*\s+/, // arrays
          /(?:\w|\\.\w)+\b(?!\))/,
          /\s*/,
          /=?/,
          /;?/,
        ],
        beginScope: {
          1: "keyword",
          3: "variable",
          5: "operator",
        },
      },
      {
        scope: "variable",
        match: /'/,
        contains: [
          {
            match: KEYWORD_RE,
          },
        ],
      },
    ],
    relevance: 0,
  };

  const TYPE_MODE = {
    variants: [
      {
        begin: [/type/, /\s+/, /\w+/, /\s+/, /(?:\w|\&)+/, /\{/],
        end: /\}/,
        beginScope: {
          1: "keyword",
          3: "title.class",
          5: "keyword",
        },
        contains: [
          {
            match: /\&/,
            relevance: 0,
          },
        ],
      },
      {
        begin: [/=/, /\s*\{/],
        beginScope: {
          1: "operator",
        },
        end: "\\}",
        contains: [
          {
            match: /:/,
            scope: "keyword",
          },
          hljs.C_LINE_COMMENT_MODE,
          STRING_MODE,
          NUMBER_MODE,
        ],
      },
    ],
    keywords: KEYWORDS,
    contains: [
      "self",
      hljs.C_LINE_COMMENT_MODE,
      VARIABLE_MODE,
      NUMBER_MODE,
      STRING_MODE,
    ],
  };

  const XML_MODE = {
    begin: /xml\s*`/,
    end: /`/,
    excludeBegin: true,
    excludeEnd: true,
    subLanguage: "xml",
    relevance: 2,
  };

  const PARAMS = {
    scope: "params",
    keywords: KEYWORDS,
    variants: [
      {
        match: /'/,
        contains: [
          {
            match: KEYWORD_RE,
          },
        ],
      },
      C_NUMBER_MODE,
      hljs.BINARY_NUMBER_MODE,
      APOS_STRING_MODE,
      QUOTE_STRING_MODE,
      TEMPLATE_STRING_MODE,
      OPERATOR_MODE,
      {
        begin: /\w+/,
      },
    ],
    relevance: 0,
  };

  const TAG_MODE = {
    variants: [
      {
        begin: [/@/, /\w+/, /:/, /\w+/, /\s*\{/],
        contains: [
          STRING_MODE,
          {
            match: ":",
            scope: "keyword",
          },
        ],
        end: /\}/,
      },
      {
        begin: [/@/, /test/, /:/, /\w+/],
      },
    ],
    beginScope: {
      2: "title.class",
      3: "keyword",
      4: "title.function",
    },
    relevance: 0,
  };

  return {
    name: "Ballerina",
    aliases: ["bal"],
    keywords: KEYWORDS,
    contains: [
      {
        // classes
        match: [/class/, /\s+/, /\w+/, /\s*{/],
        scope: {
          1: "keyword",
          3: "title.class",
        },
        relevance: 0,
      },
      {
        // functions
        begin: [/function/, /\s+/, /\w+/, /\s*/, /\(/],
        beginScope: {
          1: "keyword",
          3: "title.function",
        },
        end: /\)/,
        variants: [
          {
            // anonymous function
            begin: [/function/, /\s+/, /\(/],
            beginScope: {
              1: "keyword",
            },
            end: /\)/,
          },
          {
            begin: [/:?/, /\b(?!while\b)\w+\b/, /\s*/, /\(/],
            beginScope: {
              1: "keyword",
              2: "title.function",
            },
            end: /\)/,
          },
        ],
        contains: ["self", PARAMS],
        relevance: 0,
      },
      TYPE_MODE,
      VARIABLE_MODE,
      hljs.C_LINE_COMMENT_MODE,
      NUMBER_MODE,
      STRING_MODE,
      TAG_MODE,
      {
        scope: "meta.arrow.ballerina storage.type.function.arrow.ballerina",
        match: /(=>)/,
      },
      OPERATOR_MODE,
      XML_MODE,

      // relevance boost
      {
        begin: /import (?:ballerina|ballerinax)\/[a-z]+/,
        keywords: "import",
        relevance: 4,
      },
    ],
  };
}
