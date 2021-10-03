/*
Language: F#
Author: Jonas Follesø <jonas@follesoe.no>
Contributors: Troy Kershaw <hello@troykershaw.com>, Henrik Feldt <henrik@haf.se>, Melvyn Laïly <melvyn.laily@gmail.com>
Website: https://docs.microsoft.com/en-us/dotnet/fsharp/
Category: functional
*/

/** @type LanguageFn */
export default function(hljs) {

  const GENERICTYPESYMBOL = {
    begin: /('|\^)[a-zA-Z0-9_]+/,
    scope: 'symbol'
  };
  
  const TYPEPARAM = {
    begin: '<',
    end: '>',
    contains: [
      GENERICTYPESYMBOL
    ]
  };

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
    "false",
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
    "not",
    "null",
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
    "true",
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

  return {
    name: 'F#',
    aliases: [
      'fs',
      'f#'
    ],
    keywords: KEYWORDS,
    illegal: /\/\*/,
    contains: [
      {
        // monad builder keywords (matches before non-bang keywords)
        scope: 'keyword',
        match: /\b(yield|return|let|do|match|use)!/
      },
      {
        scope: 'string',
        // matches triple quote strings, verbatim strings (@""), character literals...
        match: /(?:"""[\s\S]*?"""|@"(?:""|[^"])*"|"(?:\\[\s\S]|[^\\"])*")|'(?:[^\\']|\\(?:.|\d{3}|x[a-fA-F\d]{2}|u[a-fA-F\d]{4}|U[a-fA-F\d]{8}))'/
      },
      hljs.COMMENT(/\(\*(?!\))/, /\*\)/, {
        contains: ["self"]
      }),
      {
        // type definitions:
        scope: 'title.class',
        beginKeywords: 'type',
        end: '\\(|=|$',
        excludeEnd: true,
        contains: [
          hljs.UNDERSCORE_TITLE_MODE,
          TYPEPARAM
        ]
      },
      {
        // computation expressions:
        beginScope: "emphasis",
        match: /\b[_a-z]\w*(?=\s*\{)/i
      },
      {
        // preprocessor directives and fsi commands:
        scope: 'meta',
        begin: '#',
        end: '$',
        keywords: {
          keyword: 'if else endif line nowarn light r i I load time help quit'
        }
      },
      {
        // [<Attributes("")>]
        scope: 'meta',
        begin: /^\s*\[<(?=[<\w])/,
        excludeBegin: true,
        end: />\]/,
        excludeEnd: true,
        relevance: 10,
        contains: [
          {
            scope: 'string',
            begin: /"/,
            end: /"/
          },
          hljs.C_NUMBER_MODE
        ]
      },
      {
        scope: 'operator',
        // only non arithmetic operators that we can confidently match:
        match: /\|{1,3}>|<\|{1,3}|->|<-|(?<!<)<<(?!<)|(?<!>)>>(?!>)|:>|:\?>?|\.\.|::|(?<!\|)\|(?!\|)/
      },
      GENERICTYPESYMBOL,
      hljs.C_LINE_COMMENT_MODE,
      hljs.inherit(hljs.QUOTE_STRING_MODE, {
        illegal: null
      }),
      hljs.BINARY_NUMBER_MODE,
      hljs.C_NUMBER_MODE
    ]
  };
}
