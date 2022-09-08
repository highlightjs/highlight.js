/*
Language: Epson S1C88 Assembly
Author: Sapphire Becker (logicplace.com)
Category: assembler
Website: https://global.epson.com/products_and_drivers/semicon/pdf/id000920.pdf
*/

/** @type LanguageFn */
export default function(hljs) {
  const WS = /[ \t]+/;
  const EOL = /(?<!\\)$/;
  const EOL_COMMENT = /(?<!\\)$|(?=;)/;
  const IDENT_RE = hljs.UNDERSCORE_IDENT_RE;
  const NUMBER_RE = /\b(?=\d)([\da-f]*h|[0-7]+[oq]|[01]*b|\d+d?)/;

  const KEYWORDS = {
    $pattern: "@?" + hljs.IDENT_RE,
    "variable.language": [
      // 8-bit registers
      // ...general purpose
      "a", "b", "h", "l",
      // ...special
      "br", "sc", "cc",
      // 16-bit registers
      // ...general purpose
      "ba", "hl", "ix", "iy",
      // ...special
      "pc", "sp",
      // Page registers
      // ...for general purpose registers
      "ep", "xp", "yp",
      // ...for PC
      "cb", "nb",
      // Specialty args for push and pop 
      "ip", "all", "ale",
      // Reserved but not used?
      "t", "nt",
    ],
    built_in: [
      // Mathematical functions
      "@abs", "@max", "@min", "@sgn",
      // String functions
      "@cat", "@len", "@pos", "@scp", "@sub",
      // Macro functions
      "@arg", "@cnt", "@mac", "@mxp",
      // Assembler mode functions
      "@as88", "@def", "@lst", "@model",
      // Address handling functions
      "@caddr", "@coff", "@cpag",
      "@daddr", "@doff", "@dpag",
      "@high", "@low",
    ],
  }

  const DIRECTIVES = [
    // Debugging directives
    "calls", "symb",
    // Assembly control
    "align", "comment", "define", "defsect",
    "end", "fail", "include", "msg",
    "radix", "sect", "undef", "warn",
    // Symbol definition
    "extern", "global", "local", "name",
    // Data definition / Storage allocation
    "ascii", "asciz", "db", "ds", "dw",
    // Macros and conditional assembly
    "dup", "dupa", "dupc", "dupf",
    "endif", "endm", "exitm", "if", "macro", "pmacro",
  ]

  const NUMBER = {
    // Non-immediate numbers
    scope: "number",
    match: NUMBER_RE,
    relevance: 0,
  };

  function STRING(q, contents) {
    return {
      scope: "string",
      begin: q,
      end: q,
      contains: [
        {
          scope: "char.escape",
          match: q + q,
        },
        ...(contents ?? [])
      ],
      illegal: /(?<!\\)\n/,
      relevance: 0,
    };
  }

  const EXPRESSIONS = [];
  EXPRESSIONS.push(
    {
      begin: /\(/,
      beginScope: "punctuation",
      end: /\)/,
      endScope: "punctuation",
      keywords: KEYWORDS,
      contains: EXPRESSIONS,
      relevance: 0,
    },
    { 
      // Location counter substitution, * used as a value
      // Avoid match when it's an operator
      scope: "built_in",
      match: /\*(?=[ \t]*[^\da-z_(])/i,
      relevance: 0,
    },
    {
      scope: "operator",
      match: /<<|>>|[=!]=|[<>]=?|&&|\|\||[-+~!*/%&^|]/,
      relevance: 0,
    },
    NUMBER,
    STRING("'"),
    STRING('"', [
      {
        // Stupid assembler can replace whatever in double-quoted strings
        // Since those symbols are usually all-caps, we're just highlighting those
        scope: "subst",
        match: /\b[A-Z]\b/,
        relevance: 0,
      },
    ]),
    {
      // Guaranteed variables
      scope: "variable",
      match: hljs.regex.concat(/(\\|\\?[?%])/, IDENT_RE),
      relevance: 1,
    },
    {
      // Guaranteed label reference
      scope: "symbol",
      match: hljs.regex.concat(/\^/, IDENT_RE),
      relevance: 0,
    }
  )

  return {
    name: "S1C88 Assembly",
    aliases: [ "s1c88" ],
    case_insensitive: true,
    keywords: {
      ...KEYWORDS,
      literal: [
        // Defsect arguments
        // ...type
        "code", "data",
        // ...group 1
        "short", "tiny",
        // ...group 2
        "fit",
        // ...group 3
        "clear", "noclear", "init", "overlay", "romdata", "max",
        // ...group 4
        "join",
      ],
      meta: DIRECTIVES
    },
    contains: [
      hljs.COMMENT(";", EOL, { relevance: 0 }),
      {
        // Label, ^ prefix for labels in macros
        scope: "symbol",
        match: hljs.regex.concat(/^\^?/, IDENT_RE, ":"),
        relevance: 0,
      },
      {
        // Macro definition
        begin: [/^/, IDENT_RE, WS, /macro\b/],
        beginScope: {
          2: "title.function",
          4: "meta",
        },
        end: EOL_COMMENT,
        contains: [
          {
            scope: "params",
            match: IDENT_RE,
            relevance: 0,
          },
        ]
      },
      {
        // Assignment
        begin: [/^/, IDENT_RE, WS, /equ\b|set\b/i],
        beginScope: {
          2: "variable",
          4: "meta",
        },
        end: EOL_COMMENT,
        contains: EXPRESSIONS
      },
      {
        // Commands
        begin: hljs.regex.concat(/^/, WS),
        contains: [
          // Mnemonics
          {
            scope: "keyword",
            match: [
              // Mnemonics
              "add", "adc", "sub", "sbc",
              "and", "or", "xor",
              "cp", "bit",
              "inc", "dec",
              "mlt", "div",
              "cpl", "neg",
              "ld",
              "ex", "swap",
              "rl", "rlc", "rr", "rrc",
              "sla", "sll", "sra", "srl",
              "pack", "upck", "sep",
              "push", "pop",
              "jp", "call",
              "ret", "rete", "rets",
              "int",
              "nop", "halt", "slp",
            ].join("|"),
          },
          // Special handling to get label/symbol refs highlighted
          {
            begin: /(jr[sl]?|djr|car[sl]?)/,
            beginScope: "keyword",
            end: EOL_COMMENT,
            contains: [
              {
                scope: "built_in",
                match: [
                  // Jump conditions
                  "c", "nc", "z", "nz",
                  "lt", "le", "gt", "ge",
                  "v", "nv", "p", "m",
                  "f0", "f1", "f2", "f3",
                  "nf0", "nf1", "nf2", "nf3",
                ].join("|"),
                relevance: 0
              },
              {
                // ^ prefix for labels in macros
                scope: "symbol",
                match: hljs.regex.concat(/\^?/, IDENT_RE),
                relevance: 0
              },
              ...EXPRESSIONS
            ],
            relevance: 0
          },
          {
            begin: /extern|global|local/,
            beginScope: "meta",
            end: EOL_COMMENT,
            contains: [ { scope: "symbol", match: IDENT_RE } ],
            relevance: 0
          },
          {
            begin: "pmacro",
            beginScope: "meta",
            end: EOL_COMMENT,
            contains: [ { scope: "title.function", match: IDENT_RE } ]
          },
          {
            begin: "undef",
            beginScope: "meta",
            end: EOL_COMMENT,
            contains: [ { scope: "variable", match: IDENT_RE } ],
            relevance: 0
          },
          // Duplication macros
          {
            scope: "meta",
            match: /^dup[acf]?\b/i,
            relevance: 0
          },
          // Catch-all to grab macro calls
          {
            scope: "title.function.invoke",
            match: hljs.regex.concat(
              "(?!" + DIRECTIVES.join("|") + ")",
              IDENT_RE
            ),
            relevance: 0
          },
        ],
        relevance: 0
      },
      // Top-level arguments
      {
        begin: /\[/,
        beginScope: "operator",
        end: /\]/,
        endScope: "operator",
        keywords: KEYWORDS,
        contains: [
          ...EXPRESSIONS,
          { "scope": "operator", match: ":" }
        ],
        relevance: 0,
      },
      {
        // Immediate
        scope: "number",
        match: hljs.regex.concat("#", NUMBER_RE),
      },
      ...EXPRESSIONS
    ]
  };
}
