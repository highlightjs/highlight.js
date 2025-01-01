/*
Language: Ceylon
Author: Lucas Werkmeister <mail@lucaswerkmeister.de>
Website: https://ceylon-lang.org
Category: system
*/

/** @type LanguageFn */
export default function(hljs) {
  // 2.3. Identifiers and keywords
  const KEYWORDS = [
    "assembly",
    "module",
    "package",
    "import",
    "alias",
    "class",
    "interface",
    "object",
    "given",
    "value",
    "assign",
    "void",
    "function",
    "new",
    "of",
    "extends",
    "satisfies",
    "abstracts",
    "in",
    "out",
    "return",
    "break",
    "continue",
    "throw",
    "assert",
    "dynamic",
    "if",
    "else",
    "switch",
    "case",
    "for",
    "while",
    "try",
    "catch",
    "finally",
    "then",
    "let",
    "this",
    "outer",
    "super",
    "is",
    "exists",
    "nonempty"
  ];
  // 7.4.1 Declaration Modifiers
  const DECLARATION_MODIFIERS = [
    "shared",
    "abstract",
    "formal",
    "default",
    "actual",
    "variable",
    "late",
    "native",
    "deprecated",
    "final",
    "sealed",
    "annotation",
    "suppressWarnings",
    "small"
  ];
  // 7.4.2 Documentation
  const DOCUMENTATION = [
    "doc",
    "by",
    "license",
    "see",
    "throws",
    "tagged"
  ];
  const SUBST = {
    className: 'subst',
    excludeBegin: true,
    excludeEnd: true,
    begin: /``/,
    end: /``/,
    keywords: KEYWORDS,
    // this has a bit of a signal given that it's scope to inside of a string
    relevance: 0.5
  };
  const EXPRESSIONS = [
    {
      // verbatim string
      className: 'string',
      begin: '"""',
      end: '"""'
    },
    {
      // string literal or template
      className: 'string',
      begin: '"',
      end: '"',
      contains: [ SUBST ]
    },
    {
      // character literal
      className: 'string',
      begin: "'",
      end: "'"
    },
    {
      // numeric literal
      className: 'number',
      variants: [
        { match: /#[0-9a-fA-F_]+/ },
        { match: /\$[01_]+/ },
        { match: /[0-9_]+(?:\.[0-9_](?:[eE][+-]?\d+)?)?[kMGTPmunpf]?/ }
      ]
    }
  ];
  SUBST.contains = EXPRESSIONS;

  return {
    name: 'Ceylon',
    keywords: {
      keyword: KEYWORDS.concat(DECLARATION_MODIFIERS),
      meta: DOCUMENTATION
    },
    illegal: [
      /\$[^01]/,
      /#[^0-9a-fA-F]/
    ],
    contains: [
      hljs.C_LINE_COMMENT_MODE,
      hljs.COMMENT('/\\*', '\\*/', { contains: [ 'self' ] }),
      {
        // compiler annotation
        className: 'meta',
        begin: '@[a-z]\\w*(?::"[^"]*")?'
      },
      ...EXPRESSIONS
    ]
  };
}
