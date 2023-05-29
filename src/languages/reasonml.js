/*
Language: ReasonML
Description: Reason lets you write simple, fast and quality type safe code while leveraging both the JavaScript & OCaml ecosystems.
Website: https://reasonml.github.io
Author: Gidi Meir Morris <oss@gidi.io>
Category: functional
*/
export default function(hljs) {
  return {
    name: 'ReasonML',
    aliases: [ 're' ],
    keywords: {
      $pattern:  /[a-z_]\w*!?/,
      keyword: [
        "and",
        "as",
        "asr",
        "assert",
        "begin",
        "class",
        "constraint",
        "do",
        "done",
        "downto",
        "else",
        "end",
        "esfun",
        "exception",
        "external",
        "for",
        "fun",
        "function",
        "functor",
        "if",
        "in",
        "include",
        "inherit",
        "initializer",
        "land",
        "lazy",
        "let",
        "lor",
        "lsl",
        "lsr",
        "lxor",
        "mod",
        "module",
        "mutable",
        "new",
        "nonrec",
        "object",
        "of",
        "open",
        "or",
        "pri",
        "pub",
        "rec",
        "sig",
        "struct",
        "switch",
        "then",
        "to",
        "try",
        "type",
        "val",
        "virtual",
        "when",
        "while",
        "with",
      ],
      built_in: [
        "array",
        "bool",
        "bytes",
        "char",
        "exn|5",
        "float",
        "int",
        "int32",
        "int64",
        "list",
        "lazy_t|5",
        "nativeint|5",
        "ref",
        "string",
        "unit",
      ],
      literal: ["true", "false"],
    },
    illegal: /(:-|:=|\$\{|\+=)/,
    contains: [
      {
        className: 'literal',
        begin: /\[(\|\|)?\]|\(\)/,
        relevance: 0
      },
      hljs.C_LINE_COMMENT_MODE,
      hljs.COMMENT(/\/\*/, /\*\//, { illegal: /^(#,\/\/)/ }),
      { /* type variable */
        className: 'symbol',
        begin: /\'[A-Za-z_](?!\')[\w\']*/
        /* the grammar is ambiguous on how 'a'b should be interpreted but not the compiler */
      },
      { /* polymorphic variant */
        className: 'type',
        begin: /`[A-Z][\w\']*/
      },
      { /* module or constructor */
        className: 'type',
        begin: /\b[A-Z][\w\']*/,
        relevance: 0
      },
      { /* don't color identifiers, but safely catch all identifiers with ' */
        begin: /[a-z_]\w*\'[\w\']*/,
        relevance: 0
      },
      hljs.inherit(hljs.APOS_STRING_MODE, {
        className: 'string',
        relevance: 0
      }),
      hljs.inherit(hljs.QUOTE_STRING_MODE, { illegal: null }),
      {
        className: 'number',
        begin:
          '\\b(0[xX][a-fA-F0-9_]+[Lln]?|'
          + '0[oO][0-7_]+[Lln]?|'
          + '0[bB][01_]+[Lln]?|'
          + '[0-9][0-9_]*([Lln]|(\\.[0-9_]*)?([eE][-+]?[0-9_]+)?)?)',
        relevance: 0
      },
    ]
  };
}
