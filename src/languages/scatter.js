/*
Language: Scatter
Description: Scatter is a distributed-first programming language with cryptographic ownership, privacy annotations, and CRDT primitives.
Website: https://scatter-lang.org
Category: system
*/

export default function(hljs) {
  const TYPES = [
    "int",
    "int32",
    "int64",
    "float",
    "float32",
    "float64",
    "string",
    "bool",
    "byte",
    "Result",
    "Option",
    "Owned",
    "List",
    "Map",
    "Set",
    "PrivateKey",
    "PublicKey",
    "Identity",
    "DelegationToken",
    "UserRegistry"
  ];
  const KEYWORDS = [
    "async",
    "await",
    "break",
    "capabilities",
    "case",
    "catch",
    "const",
    "continue",
    "default",
    "distinct",
    "distribute",
    "else",
    "enum",
    "for",
    "func",
    "if",
    "import",
    "in",
    "interface",
    "match",
    "mut",
    "nil",
    "package",
    "pub",
    "return",
    "scopegroup",
    "struct",
    "try",
    "type",
    "while"
  ];
  const BUILT_INS = [
    "own",
    "delegate",
    "println",
    "print",
    "len",
    "append",
    "push",
    "pop",
    "contains",
    "keys",
    "values",
    "toStr",
    "toInt",
    "toFloat"
  ];
  const LITERALS = [
    "true",
    "false"
  ];
  return {
    name: 'Scatter',
    aliases: [ 'sct' ],
    keywords: {
      keyword: KEYWORDS,
      literal: LITERALS,
      type: TYPES,
      built_in: BUILT_INS
    },
    contains: [
      // Annotations (e.g. @bridge, @privacy:secret, @replicated:counter, @scopes:edge,cloud)
      {
        className: 'meta',
        begin: /@[a-zA-Z_]\w*(?::\w+(?:,\w+)*)?(?:\([^)]*\))?/,
        relevance: 10
      },
      // Triple-quoted strings
      {
        className: 'string',
        begin: /"""/,
        end: /"""/
      },
      // String interpolation
      {
        className: 'string',
        begin: /"/,
        end: /"/,
        contains: [
          hljs.BACKSLASH_ESCAPE,
          {
            className: 'subst',
            begin: /\$\{/,
            end: /\}/,
            keywords: {
              keyword: KEYWORDS,
              literal: LITERALS,
              type: TYPES,
              built_in: BUILT_INS
            }
          }
        ]
      },
      // Raw strings
      {
        className: 'string',
        begin: /r"/,
        end: /"/
      },
      // Types (capitalized identifiers)
      {
        className: 'type',
        begin: /\b[A-Z]\w+\b/,
        relevance: 0
      },
      // Function declarations
      {
        className: 'function',
        beginKeywords: 'func',
        end: /[{(]/,
        excludeEnd: true,
        contains: [
          hljs.UNDERSCORE_TITLE_MODE,
          {
            className: 'params',
            begin: /\(/,
            end: /\)/,
            keywords: {
              keyword: KEYWORDS,
              type: TYPES
            }
          }
        ]
      },
      // Numbers
      {
        className: 'number',
        relevance: 0,
        variants: [
          { begin: /\b0[xX][0-9a-fA-F][_0-9a-fA-F]*/ },
          { begin: /\b0o[0-7][_0-7]*/ },
          { begin: /\b0[bB][01][_01]*/ },
          { begin: /\b\d[_\d]*\.?\d*(?:[eE][+-]?\d+)?/ }
        ]
      },
      // Line comments (// and #)
      hljs.C_LINE_COMMENT_MODE,
      {
        className: 'comment',
        begin: /#(?!#)/,
        end: /$/
      },
      // Doc comments (///)
      {
        className: 'comment',
        begin: /\/\/\//,
        end: /$/,
        relevance: 0
      },
      // Block comments (nestable)
      hljs.C_BLOCK_COMMENT_MODE,
      // Walrus operator / short variable declaration
      {
        className: 'operator',
        begin: /:=/,
        relevance: 0
      }
    ]
  };
}
