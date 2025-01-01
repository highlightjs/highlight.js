/*
Language: C
Category: common, system
Website: https://en.wikipedia.org/wiki/C_(programming_language)
*/

/** @type LanguageFn */
export default function(hljs) {
  const regex = hljs.regex;
  // added for historic reasons because `hljs.C_LINE_COMMENT_MODE` does
  // not include such support nor can we be sure all the grammars depending
  // on it would desire this behavior
  const C_LINE_COMMENT_MODE = hljs.COMMENT('//', '$', { contains: [ { begin: /\\\n/ } ] });
  const DECLTYPE_AUTO_RE = 'decltype\\(auto\\)';
  const NAMESPACE_RE = '[a-zA-Z_]\\w*::';
  const TEMPLATE_ARGUMENT_RE = '<[^<>]+>';
  const FUNCTION_TYPE_RE = '('
    + DECLTYPE_AUTO_RE + '|'
    + regex.optional(NAMESPACE_RE)
    + '[a-zA-Z_]\\w*' + regex.optional(TEMPLATE_ARGUMENT_RE)
  + ')';


  // C11 <stdatomic.h> atomic type names. This is an explicit whitelist so that
  // C11 atomic *functions* (atomic_init, atomic_store, atomic_load,
  // atomic_fetch_add, ...) are not mistakenly highlighted as types. See #3837.
  const ATOMIC_TYPES = regex.concat(/\batomic_/, regex.either(
    'bool',
    'char',
    'schar',
    'uchar',
    'short',
    'ushort',
    'int',
    'uint',
    'long',
    'ulong',
    'llong',
    'ullong',
    'char16_t',
    'char32_t',
    'wchar_t',
    'int_least8_t',
    'uint_least8_t',
    'int_least16_t',
    'uint_least16_t',
    'int_least32_t',
    'uint_least32_t',
    'int_least64_t',
    'uint_least64_t',
    'int_fast8_t',
    'uint_fast8_t',
    'int_fast16_t',
    'uint_fast16_t',
    'int_fast32_t',
    'uint_fast32_t',
    'int_fast64_t',
    'uint_fast64_t',
    'intptr_t',
    'uintptr_t',
    'size_t',
    'ptrdiff_t',
    'intmax_t',
    'uintmax_t'
  ), /\b/);
  const TYPES = {
    className: 'type',
    variants: [
      { begin: '\\b[a-z\\d_]*_t\\b' },
      { match: ATOMIC_TYPES }
    ]

  };

  // https://en.cppreference.com/w/cpp/language/escape
  // \\ \x \xFF \u2837 \u00323747 \374
  const CHARACTER_ESCAPES = '\\\\(x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4,8}|[0-7]{3}|\\S)';
  const STRINGS = {
    className: 'string',
    variants: [
      {
        begin: '(u8?|U|L)?"',
        end: '"',
        illegal: '\\n',
        contains: [ hljs.BACKSLASH_ESCAPE ]
      },
      {
        begin: '(u8?|U|L)?\'(' + CHARACTER_ESCAPES + "|.)",
        end: '\'',
        illegal: '.'
      },
      // https://en.cppreference.com/w/cpp/language/string_literal
      // a d-char-sequence never contains parentheses, backslashes or whitespace;
      // quotes are excluded as well so the closing delimiter cannot swallow the
      // quote that actually terminates the literal
      hljs.END_SAME_AS_BEGIN({
        begin: /(?:u8?|U|L)?R"([^()\\\s"]{0,16})\(/,
        end: /\)([^()\\\s"]{0,16})"/
      })
    ]
  };

  const NUMBERS = {
    className: 'number',
    variants: [
      { match: /\b(0b[01']+)/ },
      { match: /(-?)\b([\d']+(\.[\d']*)?|\.[\d']+)((ll|LL|l|L)(u|U)?|(u|U)(ll|LL|l|L)?|f|F|b|B)/ },
      { match: /(-?)\b(0[xX][a-fA-F0-9]+(?:'[a-fA-F0-9]+)*(?:\.[a-fA-F0-9]*(?:'[a-fA-F0-9]*)*)?(?:[pP][-+]?[0-9]+)?(l|L)?(u|U)?)/ },
      { match: /(-?)\b\d+(?:'\d+)*(?:\.\d*(?:'\d*)*)?(?:[eE][-+]?\d+)?/ }
    ]
  };  
  
  // `#include` is the only preprocessor directive that takes an angle-bracket
  // quoted header (`#include <header>`). Scoping that rule to `#include` keeps
  // the greedy `<...>` match from eating a `>` that belongs to the body of
  // another directive (e.g. `#define what do { cout << ">"; } while (0)`),
  // which would otherwise leave an unbalanced `"` and break highlighting for
  // the rest of the file. See issue #3505.
  const PREPROCESSOR_INCLUDE = {
    scope: 'meta',
    begin: /#\s*include\b/,
    end: /$/,
    keywords: { keyword: 'include' },
    contains: [
      {
        // the `\` at the end of a line signaling continuation
        begin: /\\\n/,
      },
      STRINGS,
      {
        scope: 'string',
        begin: /<.*?>/
      },
      C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE
    ]
  };

  const PREPROCESSOR = {
    className: 'meta',
    begin: /#\s*[a-z]+\b/,
    end: /$/,
    keywords: { keyword:
        'if else elif endif define undef warning error line '
        + 'pragma _Pragma ifdef ifndef elifdef elifndef include' },
    contains: [
      {
        begin: /\\\n/
      },
      hljs.inherit(STRINGS, { className: 'string' }),
      C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE
    ]
  };

  const PREPROCESSORS = [
    PREPROCESSOR_INCLUDE,
    PREPROCESSOR
  ];

  const TITLE_MODE = {
    className: 'title',
    begin: regex.optional(NAMESPACE_RE) + hljs.IDENT_RE
  };

  const FUNCTION_TITLE = regex.optional(NAMESPACE_RE) + hljs.IDENT_RE + '\\s*\\(';
  // Bounded on purpose: an unbounded quantifier here consumes an arbitrarily
  // long run of words, and when no function title follows it the engine retries
  // the title at every token boundary of that run - quadratic in the size of
  // the document.  See #4362.
  const MAX_FUNCTION_TYPE_TOKENS = 12;

  const C_KEYWORDS = [
    "asm",
    "auto",
    "break",
    "case",
    "continue",
    "default",
    "do",
    "else",
    "enum",
    "extern",
    "for",
    "fortran",
    "goto",
    "if",
    "inline",
    "register",
    "restrict",
    "return",
    "sizeof",
    "typeof",
    "typeof_unqual",
    "struct",
    "switch",
    "typedef",
    "union",
    "volatile",
    "while",
    "_Alignas",
    "_Alignof",
    "_Atomic",
    "_Generic",
    "_Noreturn",
    "_Static_assert",
    "_Thread_local",
    // aliases
    "alignas",
    "alignof",
    "noreturn",
    "static_assert",
    "thread_local",
    // not a C keyword but is, for all intents and purposes, treated exactly like one.
    "_Pragma"
  ];

  const C_TYPES = [
    "float",
    "double",
    "signed",
    "unsigned",
    "int",
    "short",
    "long",
    "char",
    "void",
    "_Bool",
    "_BitInt",
    "_Complex",
    "_Imaginary",
    "_Decimal32",
    "_Decimal64",
    "_Decimal96",
    "_Decimal128",
    "_Decimal64x",
    "_Decimal128x",
    "_Float16",
    "_Float32",
    "_Float64",
    "_Float128",
    "_Float32x",
    "_Float64x",
    "_Float128x",
    // modifiers
    "const",
    "static",
    "constexpr",
    // aliases
    "complex",
    "bool",
    "imaginary"
  ];

  const KEYWORDS = {
    keyword: C_KEYWORDS,
    type: C_TYPES,
    literal: 'true false NULL',
    // TODO: apply hinting work similar to what was done in cpp.js
    built_in: 'std string wstring cin cout cerr clog stdin stdout stderr stringstream istringstream ostringstream '
      + 'auto_ptr deque list queue stack vector map set pair bitset multiset multimap unordered_set '
      + 'unordered_map unordered_multiset unordered_multimap priority_queue make_pair array shared_ptr abort terminate abs acos '
      + 'asin atan2 atan calloc ceil cosh cos exit exp fabs floor fmod fprintf fputs free frexp '
      + 'fscanf future isalnum isalpha iscntrl isdigit isgraph islower isprint ispunct isspace isupper '
      + 'isxdigit tolower toupper labs ldexp log10 log malloc realloc memchr memcmp memcpy memset modf pow '
      + 'printf putchar puts scanf sinh sin snprintf sprintf sqrt sscanf strcat strchr strcmp '
      + 'strcpy strcspn strlen strncat strncmp strncpy strpbrk strrchr strspn strstr tanh tan '
      + 'vfprintf vprintf vsprintf endl initializer_list unique_ptr',
  };

  const EXPRESSION_CONTAINS = [
    ...PREPROCESSORS,
    TYPES,
    C_LINE_COMMENT_MODE,
    hljs.C_BLOCK_COMMENT_MODE,
    NUMBERS,
    STRINGS
  ];

  const EXPRESSION_CONTEXT = {
    // This mode covers expression context where we can't expect a function
    // definition and shouldn't highlight anything that looks like one:
    // `return some()`, `else if()`, `(x*sum(1, 2))`
    variants: [
      {
        begin: /=/,
        end: /;/
      },
      {
        begin: /\(/,
        end: /\)/
      },
      {
        beginKeywords: 'new throw return else',
        end: /;/
      }
    ],
    keywords: KEYWORDS,
    contains: EXPRESSION_CONTAINS.concat([
      {
        begin: /\(/,
        end: /\)/,
        keywords: KEYWORDS,
        contains: EXPRESSION_CONTAINS.concat([ 'self' ])
      }
    ])
  };

  const FUNCTION_DECLARATION = {
    begin: '(' + FUNCTION_TYPE_RE + '[\\*&\\s]+){1,' + MAX_FUNCTION_TYPE_TOKENS + '}' + FUNCTION_TITLE,
    returnBegin: true,
    end: /[{;=]/,
    excludeEnd: true,
    keywords: KEYWORDS,
    illegal: /[^\w\s\*&:<>.]/,
    contains: [
      { // to prevent it from being confused as the function title
        begin: DECLTYPE_AUTO_RE,
        keywords: KEYWORDS
      },
      {
        begin: FUNCTION_TITLE,
        returnBegin: true,
        contains: [ hljs.inherit(TITLE_MODE, { className: "title.function" }) ]
      },
      // allow for multiple declarations, e.g.:
      // extern void f(int), g(char);
      {
        match: /,/
      },
      {
        className: 'params',
        begin: /\(/,
        end: /\)/,
        keywords: KEYWORDS,
        contains: [
          C_LINE_COMMENT_MODE,
          hljs.C_BLOCK_COMMENT_MODE,
          STRINGS,
          NUMBERS,
          TYPES,
          // Count matching parentheses.
          {
            begin: /\(/,
            end: /\)/,
            keywords: KEYWORDS,
            contains: [
              'self',
              C_LINE_COMMENT_MODE,
              hljs.C_BLOCK_COMMENT_MODE,
              STRINGS,
              NUMBERS,
              TYPES
            ]
          }
        ]
      },
      TYPES,
      C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      ...PREPROCESSORS
    ]
  };

  return {
    name: "C",
    aliases: [ 'h' ],
    keywords: KEYWORDS,
    illegal: '</',
    contains: [].concat(
      EXPRESSION_CONTEXT,
      FUNCTION_DECLARATION,
      EXPRESSION_CONTAINS,
      [
        ...PREPROCESSORS,
        {
          begin: hljs.IDENT_RE + '::',
          keywords: KEYWORDS
        },
        {
          beginKeywords: 'enum class struct union',
          end: /[{;:<>=]/,
          contains: [
            { beginKeywords: "final class struct" },
            hljs.inherit(hljs.TITLE_MODE, { scope: "title.class" })
          ]
        }
      ]),
    exports: {
      preprocessor: PREPROCESSOR,
      strings: STRINGS,
      keywords: KEYWORDS
    }
  };
}
