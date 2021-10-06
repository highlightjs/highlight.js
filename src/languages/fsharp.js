/*
Language: F#
Author: Jonas Follesø <jonas@follesoe.no>
Contributors: Troy Kershaw <hello@troykershaw.com>, Henrik Feldt <henrik@haf.se>, Melvyn Laïly <melvyn.laily@gmail.com>
Website: https://docs.microsoft.com/en-us/dotnet/fsharp/
Category: functional
*/

import * as regex from '../lib/regex.js';

/** @type LanguageFn */
export default function(hljs) {

  const KEYWORDS = [
    "abstract",
    "and",
    "as",
    "assert",
    "base",
    "begin",
    "class",
    "default",
    "delegate",
    "do",
    "done",
    "downcast",
    "downto",
    "elif",
    "else",
    "end",
    "exception",
    "extern",
    //"false", // literal
    "finally",
    "fixed",
    "for",
    "fun",
    "function",
    "global",
    "if",
    "in",
    "inherit",
    "inline",
    "interface",
    "internal",
    "lazy",
    "let",
    "match",
    "member",
    "module",
    "mutable",
    "namespace",
    "new",
    //"not", // built_in
    //"null", // literal
    "of",
    "open",
    "or",
    "override",
    "private",
    "public",
    "rec",
    "return",
    "static",
    "struct",
    "then",
    "to",
    //"true", // literal
    "try",
    "type",
    "upcast",
    "use",
    "val",
    "void",
    "when",
    "while",
    "with",
    "yield"
  ];

  const BANG_KEYWORD_MODE = {
    // monad builder keywords (matches before non-bang keywords)
    scope: 'keyword',
    match: /\b(yield|return|let|do|match|use)!/
  };

  const PREPROCESSOR_KEYWORDS = [
    "if",
    "else",
    "endif",
    "line",
    "nowarn",
    "light",
    "r",
    "i",
    "I",
    "load",
    "time",
    "help",
    "quit"
  ];

  const LITERALS = [
    "true",
    "false",
    "null",
    "Some",
    "None",
    "Ok",
    "Error",
    "infinity",
    "infinityf",
    "nan",
    "nanf"
  ];

  const SPECIAL_IDENTIFIERS = [
    "__LINE__",
    "__SOURCE_DIRECTORY__",
    "__SOURCE_FILE__"
  ];

  const TYPES = [
    // basic types
    "bool",
    "byte",
    "sbyte",
    "int8",
    "int16",
    "int32",
    "uint8",
    "uint16",
    "uint32",
    "int",
    "uint",
    "int64",
    "uint64",
    "nativeint",
    "unativeint",
    "decimal",
    "float",
    "double",
    "float32",
    "single",
    "char",
    "string",
    "unit",
    "bigint",
    // other native types or lowercase aliases
    "option",
    "voption",
    "list",
    "array",
    "seq",
    "byref",
    "exn",
    "inref",
    "nativeptr",
    "obj",
    "outref",
    "voidptr"
  ];

  const BUILTINS = [
    // Somewhat arbitrary list of builtin functions and values.
    // Most of them are declared in Microsoft.FSharp.Core
    // I tried to stay relevant by adding only the most idiomatic
    // and most used symbols that are not already declared as types.
    "not",
    "ref",
    "raise",
    "reraise",
    "dict",
    "readOnlyDict",
    "set",
    "enum",
    "sizeof",
    "typeof",
    "typedefof",
    "nameof",
    "nullArg",
    "invalidArg",
    "invalidOp",
    "id",
    "fst",
    "snd",
    "ignore",
    "lock",
    "using",
    "box",
    "unbox",
    "tryUnbox",
    "printf",
    "printfn",
    "sprintf",
    "eprintf",
    "eprintfn",
    "fprintf",
    "fprintfn",
    "failwith",
    "failwithf"
  ];

  const ALL_KEYWORDS = {
    type: TYPES,
    keyword: KEYWORDS,
    literal: LITERALS,
    built_in: BUILTINS,
    'variable.constant': SPECIAL_IDENTIFIERS
  };

  // (* potentially multi-line Meta Language style comment *)
  const ML_COMMENT =
    hljs.COMMENT(/\(\*(?!\))/, /\*\)/, {
      contains: ["self"]
    });
  // Either a multi-line (* Meta Language style comment *) or a single line // C style comment.
  const FSHARP_COMMENT = {
    variants: [
      ML_COMMENT,
      hljs.C_LINE_COMMENT_MODE,
    ]
  };

  // 'a or ^a
  const GENERIC_TYPE_SYMBOL = {
    match: regex.concat(/('|\^)/, hljs.UNDERSCORE_IDENT_RE),
    scope: 'symbol',
    relevance: 0
  };

  const COMPUTATION_EXPRESSION = {
    // computation expressions:
    scope: 'computation-expression',
    match: /\b[_a-z]\w*(?=\s*\{)/
  };

  const PREPROCESSOR = {
    // preprocessor directives and fsi commands:
    begin: [
      /^\s*/,
      regex.concat(/#/, regex.either(...PREPROCESSOR_KEYWORDS)),
      /\b/
    ],
    beginScope: { 2: 'meta' },
    end: regex.lookahead(/\s|$/)
  };

  // Note: this definition is missing support for type suffixes and octal notation.
  // Known bug: range operator without any space is wrongly interpreted as a single number (e.g. 1..10 )
  const FSHARP_NUMBER = {
    variants: [
      hljs.BINARY_NUMBER_MODE,
      hljs.C_NUMBER_MODE
    ]
  };

  // All the following string definitions are potentially multi-line.
  // Note: these definitions are missing support for byte strings (suffixed with B)

  // "..."
  const QUOTED_STRING = {
    scope: 'string',
    begin: /"/,
    end: /"/,
    contains: [
      hljs.BACKSLASH_ESCAPE
    ]
  };
  // @"..."
  const VERBATIM_STRING = {
    scope: 'string',
    begin: /@"/,
    end: /"/,
    contains: [
      {
        match: /""/ // escaped "
      },
      hljs.BACKSLASH_ESCAPE
    ]
  };
  //"""..."""
  const TRIPLE_QUOTED_STRING = {
    scope: 'string',
    begin: /"""/,
    end: /"""/,
    relevance: 2
  };
  const SUBST = {
    scope: 'subst',
    begin: /\{/,
    end: /\}/,
    keywords: ALL_KEYWORDS
  };
  // $"...{1+1}..."
  const INTERPOLATED_STRING = {
    scope: 'string',
    begin: /\$"/,
    end: /"/,
    contains: [
      {
        match: /\{\{/ // escaped {
      },
      {
        match: /\}\}/ // escaped }
      },
      hljs.BACKSLASH_ESCAPE,
      SUBST
    ]
  };
  // $@"...{1+1}..."
  const INTERPOLATED_VERBATIM_STRING = {
    scope: 'string',
    begin: /(\$@|@\$)"/,
    end: /"/,
    contains: [
      {
        match: /\{\{/ // escaped {
      },
      {
        match: /\}\}/ // escaped }
      },
      {
        match: /""/
      },
      hljs.BACKSLASH_ESCAPE,
      SUBST
    ]
  };
  // $"""...{1+1}..."""
  const INTERPOLATED_TRIPLE_QUOTED_STRING = {
    scope: 'string',
    begin: /\$"""/,
    end: /"""/,
    contains: [
      {
        match: /\{\{/ // escaped {
      },
      {
        match: /\}\}/ // escaped }
      },
      SUBST
    ],
    relevance: 2
  };
  // '.'
  const FSHARP_CHAR_LITERAL = {
    scope: 'string',
    match: regex.concat(
      /'/,
      regex.either(
          /[^\\']/, // either a single non escaped char...
          /\\(?:.|\d{3}|x[a-fA-F\d]{2}|u[a-fA-F\d]{4}|U[a-fA-F\d]{8})/ // ...or an escape sequence
        ),
      /'/
    )
  };
  // F# allows a lot of things inside string placeholders.
  // Things that don't currently seem allowed by the compiler: types definition, attributes usage.
  // (Strictly speaking, some of the followings are only allowed inside triple quoted interpolated strings...)
  SUBST.contains = [
    INTERPOLATED_VERBATIM_STRING,
    INTERPOLATED_STRING,
    VERBATIM_STRING,
    QUOTED_STRING,
    FSHARP_CHAR_LITERAL,
    BANG_KEYWORD_MODE,
    FSHARP_COMMENT,
    COMPUTATION_EXPRESSION,
    PREPROCESSOR,
    FSHARP_NUMBER,
    GENERIC_TYPE_SYMBOL
    
  ];
  const FSHARP_STRING = {
    variants: [
      INTERPOLATED_TRIPLE_QUOTED_STRING,
      INTERPOLATED_VERBATIM_STRING,
      INTERPOLATED_STRING,
      TRIPLE_QUOTED_STRING,
      VERBATIM_STRING,
      QUOTED_STRING,
      FSHARP_CHAR_LITERAL
    ]
  };

  return {
    name: 'F#',
    aliases: [
      'fs',
      'f#'
    ],
    keywords: ALL_KEYWORDS,
    illegal: /\/\*/,
    classNameAliases: {
      'computation-expression': 'keyword'
    },
    contains: [
      BANG_KEYWORD_MODE,
      FSHARP_STRING,
      FSHARP_COMMENT,
      {
        // type MyType<'a> = ...
        begin: [
          /type/,
          /\s+/,
          hljs.UNDERSCORE_IDENT_RE
        ],
        beginScope: {
          1: 'keyword',
          3: 'title.class'
        },
        end: regex.lookahead(/\(|=|$/),
        contains: [
          GENERIC_TYPE_SYMBOL
        ]
      },
      {
        // [<Attributes("")>]
        scope: 'meta',
        begin: /^\s*\[</,
        excludeBegin: true,
        end: regex.lookahead(/>\]/),
        relevance: 2,
        contains: [
          {
            scope: 'string',
            begin: /"/,
            end: /"/
          },
          FSHARP_NUMBER
        ]
      },
      COMPUTATION_EXPRESSION,
      PREPROCESSOR,
      FSHARP_NUMBER,
      GENERIC_TYPE_SYMBOL
    ]
  };
}
