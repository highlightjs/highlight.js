/*
Language: Elixir
Author: Josh Adams <josh@isotope11.com>
Description: language definition for Elixir source code files (.ex and .exs).  Based on ruby language support.
Category: functional
Website: https://elixir-lang.org
*/

/** @type LanguageFn */
export default function(hljs) {
  const ELIXIR_IDENT_RE = '[a-zA-Z_][a-zA-Z0-9_.]*(!|\\?)?';
  const ELIXIR_METHOD_RE = '[a-zA-Z_]\\w*[!?=]?|[-+~]@|<<|>>|=~|===?|<=>|[<>]=?|\\*\\*|[-/+%^&*~`|]|\\[\\]=?';
  const KEYWORDS = [
    "alias",
    "alias",
    "and",
    "begin",
    "break",
    "case",
    "cond",
    "defined",
    "do",
    "end",
    "ensure",
    "false",
    "fn",
    "for",
    "import",
    "in",
    "include",
    "module",
    "next",
    "nil",
    "not",
    "or",
    "quote",
    "redo",
    "require",
    "retry",
    "return",
    "self",
    "then",
    "true",
    "unless",
    "until",
    "use",
    "when",
    "while",
    "with|0"
  ];
  const KWS = {
    $pattern: ELIXIR_IDENT_RE,
    keyword: KEYWORDS
  };
  const SUBST = {
    className: 'subst',
    begin: /#\{/,
    end: /\}/,
    keywords: KWS
  };
  const NUMBER = {
    className: 'number',
    begin: '(\\b0o[0-7_]+)|(\\b0b[01_]+)|(\\b0x[0-9a-fA-F_]+)|(-?\\b[1-9][0-9_]*(\\.[0-9_]+([eE][-+]?[0-9]+)?)?)',
    relevance: 0
  };
  // TODO: could be tightened
  // https://elixir-lang.readthedocs.io/en/latest/intro/18.html
  // but you also need to include closing delemeters in the escape list per
  // individual sigil mode from what I can tell,
  // ie: \} might or might not be an escape depending on the sigil used
  const ESCAPES_RE = /\\[\s\S]/;
  // const ESCAPES_RE = /\\["'\\abdefnrstv0]/;
  const BACKSLASH_ESCAPE = {
    match: ESCAPES_RE,
    scope: "char.escape",
    relevance: 0
  };
  const SIGIL_DELIMITERS = '[/|([{<"\']';
  const SIGIL_DELIMITER_MODES = [
    {
      begin: /"/,
      end: /"/
    },
    {
      begin: /'/,
      end: /'/
    },
    {
      begin: /\//,
      end: /\//
    },
    {
      begin: /\|/,
      end: /\|/
    },
    {
      begin: /\(/,
      end: /\)/
    },
    {
      begin: /\[/,
      end: /\]/
    },
    {
      begin: /\{/,
      end: /\}/
    },
    {
      begin: /</,
      end: />/
    }
  ];
  const LOWERCASE_SIGIL = {
    className: 'string',
    begin: '~[a-z]' + '(?=' + SIGIL_DELIMITERS + ')',
    contains: SIGIL_DELIMITER_MODES.map(x => hljs.inherit(x,
      {
        contains: [
          BACKSLASH_ESCAPE,
          SUBST
        ]
      }
    ))
  };

  const UPCASE_SIGIL = {
    className: 'string',
    begin: '~[A-Z]' + '(?=' + SIGIL_DELIMITERS + ')',
    contains: SIGIL_DELIMITER_MODES.map(x => hljs.inherit(x))
  };

  const REGEX_SIGIL = {
    className: 'regex',
    variants: [
      {
        begin: '~r' + '(?=' + SIGIL_DELIMITERS + ')',
        contains: SIGIL_DELIMITER_MODES.map(x => hljs.inherit(x,
          {
            contains: [
              BACKSLASH_ESCAPE,
              SUBST
            ]
          }
        ))
      },
      {
        begin: '~R' + '(?=' + SIGIL_DELIMITERS + ')',
        contains: SIGIL_DELIMITER_MODES.map(x => hljs.inherit(x))
      }
    ]
  };

  const STRING = {
    className: 'string',
    contains: [
      hljs.BACKSLASH_ESCAPE,
      SUBST
    ],
    variants: [
      {
        begin: /"""/,
        end: /"""/
      },
      {
        begin: /'''/,
        end: /'''/
      },
      {
        begin: /~S"""/,
        end: /"""/,
        contains: [] // override default
      },
      {
        begin: /~S"/,
        end: /"/,
        contains: [] // override default
      },
      {
        begin: /~S'''/,
        end: /'''/,
        contains: [] // override default
      },
      {
        begin: /~S'/,
        end: /'/,
        contains: [] // override default
      },
      {
        begin: /'/,
        end: /'/
      },
      {
        begin: /"/,
        end: /"/
      }
    ]
  };
  const FUNCTION = {
    className: 'function',
    beginKeywords: 'def defp defmacro',
    end: /\B\b/, // the mode is ended by the title
    contains: [
      hljs.inherit(hljs.TITLE_MODE, {
        begin: ELIXIR_IDENT_RE,
        endsParent: true
      })
    ]
  };
  const CLASS = hljs.inherit(FUNCTION, {
    className: 'class',
    beginKeywords: 'defimpl defmodule defprotocol defrecord',
    end: /\bdo\b|$|;/
  });
  const ELIXIR_DEFAULT_CONTAINS = [
    STRING,
    REGEX_SIGIL,
    UPCASE_SIGIL,
    LOWERCASE_SIGIL,
    hljs.HASH_COMMENT_MODE,
    CLASS,
    FUNCTION,
    {
      begin: '::'
    },
    {
      className: 'symbol',
      begin: ':(?![\\s:])',
      contains: [
        STRING,
        {
          begin: ELIXIR_METHOD_RE
        }
      ],
      relevance: 0
    },
    {
      className: 'symbol',
      begin: ELIXIR_IDENT_RE + ':(?!:)',
      relevance: 0
    },
    NUMBER,
    {
      className: 'variable',
      begin: '(\\$\\W)|((\\$|@@?)(\\w+))'
    },
    {
      begin: '->'
    }
  ];
  SUBST.contains = ELIXIR_DEFAULT_CONTAINS;

  return {
    name: 'Elixir',
    keywords: KWS,
    contains: ELIXIR_DEFAULT_CONTAINS
  };
}
