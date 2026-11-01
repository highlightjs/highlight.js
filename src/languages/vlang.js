/*
Language: V
Author: diviocity
Description: The V programming language (vlang)
Website: https://vlang.io/
Category: common, system
*/

export default function(hljs) {
  const regex = hljs.regex;

  const LITERALS = [
    "true",
    "false",
    "nil",
    "none"
  ];

  const KEYWORDS = [
    "as", "asm", "assert", "atomic", "break", "const", "continue", "defer",
    "dump", "else", "enum", "fn", "for", "go", "goto", "if", "import", "in",
    "interface", "is", "isreftype", "lock", "match", "module", "mut", "or",
    "pub", "return", "rlock", "select", "shared", "sizeof", "spawn", "static",
    "struct", "type", "typeof", "union", "unsafe", "volatile", "__global",
    "__offsetof", "_likely_", "_unlikely_"
  ];

  const TYPES = [
    "bool", "string", "i8", "i16", "int", "i64", "i128", "u8", "u16",
    "u32", "u64", "u128", "rune", "f32", "f64", "isize", "usize", "voidptr"
  ];

  const KEYWORD_MODES = {
    keyword: KEYWORDS,
    type: TYPES,
    literal: LITERALS
  };

  const NUMBER = {
    scope: "number",
    variants: [
      { match: /-?\b0[xX](_?[0-9a-fA-F])+/ },
      { match: /-?\b0[oO](_?[0-7])+/ },
      { match: /-?\b0[bB](_?[01])+/ },
      { match: /-?\.\d(_?\d)*([eE][+-]?\d(_?\d)*)?/ },
      { match: /-?\b\d(_?\d)*(\.(\d(_?\d)*)?)?([eE][+-]?\d(_?\d)*)?/ }
    ]
  };

  const SUBST = {
    scope: "subst",
    begin: /\$\{/,
    end: /\}/,
    contains: []
  };

  const VARIABLE = {
    scope: "variable",
    match: /\$[A-Za-z_]\w*(?:\.[A-Za-z_]\w*)*/
  };

  const STRING = {
    scope: "string",
    variants: [
      { begin: /r"/, end: /"/ },
      { begin: /r'/, end: /'/ },
      {
        begin: /"/,
        end: /"/,
        illegal: /\n/,
        contains: [ hljs.BACKSLASH_ESCAPE, VARIABLE, SUBST ]
      },
      {
        begin: /'/,
        end: /'/,
        illegal: /\n/,
        contains: [ hljs.BACKSLASH_ESCAPE, VARIABLE, SUBST ]
      }
    ]
  };

  SUBST.contains.push(
    NUMBER,
    VARIABLE,
    STRING,
    hljs.C_LINE_COMMENT_MODE,
    hljs.C_BLOCK_COMMENT_MODE
  );

  const RUNE = {
    scope: "string",
    begin: /`/,
    end: /`/,
    contains: [ hljs.BACKSLASH_ESCAPE ]
  };

  const ATTRIBUTE = {
    scope: "meta",
    begin: /@\[/,
    end: /\]/
  };

  const PARAMS = {
    scope: "params",
    begin: /\(/,
    end: /\)/,
    keywords: KEYWORD_MODES,
    contains: [
      NUMBER, STRING, RUNE, ATTRIBUTE,
      hljs.C_LINE_COMMENT_MODE, hljs.C_BLOCK_COMMENT_MODE
    ]
  };

  const FUNCTION = {
    variants: [
      {
        begin: [/\bfn\b/, /\s+/, hljs.IDENT_RE, /\s*(?=\()/],
        beginScope: { 1: "keyword", 3: "title.function" },
        end: /\{/,
        excludeEnd: true,
        keywords: KEYWORD_MODES,
        contains: [
          PARAMS,
          hljs.C_LINE_COMMENT_MODE,
          hljs.C_BLOCK_COMMENT_MODE
        ]
      },
      {
        begin: [/\bfn\b/, /\s+/, /\(/, /[^)]*/, /\)/, /\s+/, hljs.IDENT_RE, /\s*(?=\()/],
        beginScope: { 1: "keyword", 7: "title.function" },
        end: /\{/,
        excludeEnd: true,
        keywords: KEYWORD_MODES,
        contains: [
          PARAMS,
          hljs.C_LINE_COMMENT_MODE,
          hljs.C_BLOCK_COMMENT_MODE
        ]
      },
      {
        begin: [/\bfn\b/, /\s*(?=\()/],
        beginScope: { 1: "keyword" },
        end: /\{/,
        excludeEnd: true,
        keywords: KEYWORD_MODES,
        contains: [
          PARAMS,
          hljs.C_LINE_COMMENT_MODE,
          hljs.C_BLOCK_COMMENT_MODE
        ]
      }
    ]
  };

  const DECLARATION = {
    variants: [
      {
        begin: [/\b(?:struct|enum|interface|union)\b/, /\s+/, hljs.IDENT_RE],
        beginScope: { 1: "keyword", 3: "title.class" },
        end: /\{/,
        excludeEnd: true,
        keywords: KEYWORD_MODES,
        contains: [
          hljs.C_LINE_COMMENT_MODE,
          hljs.C_BLOCK_COMMENT_MODE
        ]
      },
      {
        begin: [/\btype\b/, /\s+/, hljs.IDENT_RE],
        beginScope: { 1: "keyword", 3: "title.class" },
        end: /=/,
        excludeEnd: true,
        keywords: KEYWORD_MODES,
        contains: [
          hljs.C_LINE_COMMENT_MODE,
          hljs.C_BLOCK_COMMENT_MODE
        ]
      }
    ]
  };

  const DIRECTIVE = {
    scope: "meta",
    begin: /#(?:flag|include|pkgconfig)\b/,
    end: /$/
  };

  const STRUCT_LITERAL = {
    scope: "title.class",
    match: /\b[A-Z][A-Za-z0-9_]*(?=\s*\{)/
  };

  return {
    name: "V",
    aliases: ["vlang"],
    keywords: KEYWORD_MODES,
    illegal: "</",
    contains: [
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      ATTRIBUTE,
      STRING,
      RUNE,
      NUMBER,
      FUNCTION,
      DECLARATION,
      DIRECTIVE,
      STRUCT_LITERAL
    ]
  };
}
