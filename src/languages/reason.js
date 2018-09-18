/*
Language: ReasonML
Author: Gidi Meir Morris <oss@gidi.io>, Cheng Lou
Category: functional
*/
function(hljs) {
  function orReValues(ops){
    return ops
    .map(function(op) {
      return op
        .split('')
        .map(function(char) {
          return '\\' + char;
        })
        .join('');
    })
    .join('|');
  }

  // eh why is the $ here
  var RE_IDENT = '~?[a-z$_][0-9a-zA-Z$_]*';
  var RE_ATTRIBUTE = '[A-Za-z_][A-Za-z0-9_\\.]*';
  var RE_MODULE_IDENT = '[A-Z$_][0-9a-zA-Z$_]*';
  var RE_CONSTRUCTOR = '([A-Z][0-9a-zA-Z$_]*)|(`[a-zA-Z][0-9a-zA-Z$_]*)';

  var RE_PARAM_TYPEPARAM = '\'?[a-z$_][0-9a-z$_]*';
  var RE_PARAM_TYPE = '\s*:\s*[a-z$_][0-9a-z$_]*(\(\s*(' + RE_PARAM_TYPEPARAM + '\s*(,' + RE_PARAM_TYPEPARAM + ')*)?\s*\))?';
  var RE_PARAM = RE_IDENT + '(' + RE_PARAM_TYPE + ')?(' + RE_PARAM_TYPE + ')?';
  var RE_OPERATOR = "(" + orReValues(['->', '||', '&&', '++', '**', '+.', '+', '-.', '-', '*.', '*', '/.', '/', '...', '|>', '===', '==', '^', ':=', '!']) + ")";

  var KEYWORDS = {
    /* https://github.com/facebook/reason/blob/79e67d5334ef181fdb54bd57bd9e7729f9fe46e7/src/reason-parser/reason_lexer.mll#L94-L154 */
    keyword:
      'and as assert begin class constraint done downto exception external fun ' +
      'esfun function functor include inherit initializer lazy let pub mutable new nonrec ' +
      'object of open or pri rec then to type val virtual ' +
      'try catch finally do else for if switch while import library export ' +
      'module in raise',
    // not reliable
    // built_in:
    //   'array bool bytes char exn|5 float int int32 int64 list lazy_t|5 nativeint|5 ref string unit',
    literal:
      'true false'
  };

  const RE_NUMBER = '\\b(0[xX][a-fA-F0-9_]+[Lln]?|' +
    '0[oO][0-7_]+[Lln]?|' +
    '0[bB][01_]+[Lln]?|' +
    '[0-9][0-9_]*([Lln]|(\\.[0-9_]*)?([eE][-+]?[0-9_]+)?)?)';

  const STRING_MODE = {
    className: 'string',
    relevance: 0,
    variants: [
      {
        begin: '"',
        end: '"',
        contains: [hljs.BACKSLASH_ESCAPE],
      },
      // {foo|bla|foo}
      {
        begin: '\\{(' + RE_IDENT + ')?\\|',
        end: '\\|(' + RE_IDENT + ')?\\}',
      },
    ]
  };

  const CHARACTER_MODE = {
    className: 'character',
    begin: '\'(\\\\[^\']+|[^\'])\'',
    illegal: '\\n',
    relevance: 0
  };

  const NUMBER_MODE = {
    className: 'number',
    relevance: 0,
    variants: [
      {
        begin: RE_NUMBER
      },
      {
        begin: '\\(\\-' + RE_NUMBER + '\\)'
      }
    ]
  };

  const OPERATOR_MODE = {
    className: 'operator',
    relevance: 0,
    begin: RE_OPERATOR
  };

  // as in variant constructor
  const CONSTRUCTOR_MODE = {
    className: 'constructor',
    relevance: 0,
    begin: '\\b' + RE_CONSTRUCTOR,
    illegal: '\\n',
    keywords: KEYWORDS,
  };

  const ARRAY_MODES = {
    className: 'literal',
    variants: [
      {
        begin: '\\[\\|',
      },
      {
        begin: '\\|\\]',
      },
    ]
  };

  const LIST_MODES = {
    className: 'literal',
    relevance: 0,
    variants: [
      {
        begin: '\\[',
      },
      {
        begin: '\\]',
      },
    ]
  };

  const MODULE_ACCESS_MODE = {
    begin: "\\b" + RE_MODULE_IDENT + "\\.",
    relevance: 0,
    returnBegin: true,
    contains: [
      {
        begin: RE_MODULE_IDENT,
        className: 'module-identifier',
      },
    ]
  };

  const JSX_MODE = {
    relevance: 0,
    variants: [
      {
        begin: "<>",
      },
      {
        begin: "</>",
      },
      {
        begin: "/>",
      },
      {
        begin: "</",
        contains: [
          {
            begin: RE_MODULE_IDENT,
            className: 'module-identifier',
          },
        ]
      },
      {
        begin: "<",
        contains: [
          {
            begin: RE_MODULE_IDENT,
            className: 'module-identifier',
          },
        ]
      },
    ]
  };

  // Foo.Bar.Baz where Baz is actually a module, not a constructor
  const MODULE_ACCESS_ENDS_WITH_MODULE = {
    begin: RE_MODULE_IDENT,
    returnBegin: true,
    contains: [
      {
        begin: RE_MODULE_IDENT,
        className: "module-identifier",
      },
      {
        begin: "\\.",
        contains: [
          {
            begin: RE_MODULE_IDENT,
            className: "module-identifier",
          }
        ]
      },
    ]
  };
  const ATTRIBUTE_MODE = {
    className: 'attribute',
    variants: [
      {
        begin: "\\[@",
        end: "\\s*\\]",
        contains: [
          {
            begin: RE_ATTRIBUTE + "\\s*",
          },
        ],
      },
      {
        begin: "\\[%",
        end: "\\s*\\]",
        contains: [
          {
            begin: RE_ATTRIBUTE + "\\s*",
          },
        ],
      },
      {
        begin: "\\[%%",
        end: "\\s*\\]",
        contains: [
          {
            begin: RE_ATTRIBUTE + "\\s*",
          },
        ],
      },
      {
        begin: "\\[%%%",
        end: "\\s*\\]",
        contains: [
          {
            begin: RE_ATTRIBUTE + "\\s*",
          },
        ],
      },
    ]
  };

  // all the modes below are mutually recursive
  const OPEN_OR_INCLUDE_MODULE_MODE = {
    begin: "\\b(open|include)\\s*",
    keywords: KEYWORDS,
    contains: [
      MODULE_ACCESS_ENDS_WITH_MODULE,
    ]
  };
  const MODULE_MODE = {
    begin: "\\s*\\{\\s*",
    end: "\\s*\\}\\s*",
    keywords: KEYWORDS,
    // most of the order here is important
    contains: [
      hljs.COMMENT('/\\*', '\\*/', { illegal: '^(\\#,\\/\\/)' }),
      // there's also a block mode technically, but for our purpose, a module {}
      // and a block {} can be considered the same for highlighting
      'self',
      CHARACTER_MODE,
      STRING_MODE,
      ATTRIBUTE_MODE,
      ARRAY_MODES,
      LIST_MODES,
      JSX_MODE,
      OPERATOR_MODE,
      NUMBER_MODE,
      OPEN_OR_INCLUDE_MODULE_MODE,
      MODULE_ACCESS_MODE,
      CONSTRUCTOR_MODE,
    ]
  };
  const MODULE_DECLARATION_MODE = {
    begin: "\\bmodule\\s+(type\\s+)?(of\\s+)?",
    keywords: KEYWORDS,
    contains: [
      // this definitely gets matched, and first. always `module Foo`
      {
        begin: RE_MODULE_IDENT,
        className: "module-identifier",
      },
      // and then an optional type signature is matched. Hopefully this regex
      // doesn't accidentally match something else
      {
        begin: "\\s*:\\s*",
        contains: [
          {
            begin: RE_MODULE_IDENT,
            className: "module-identifier",
          },
          MODULE_MODE
        ],
      },
      // then the = part and the right hand side
      {
        begin: "\\s*=\\s*",
        contains: [
          MODULE_ACCESS_ENDS_WITH_MODULE,
          // alternatively, a functor declaration
          {
            begin: "\\s*\\(\\s*",
            end: "\\s*\\)\\s*",
            keywords: KEYWORDS,
            contains: [
              {
                begin: RE_MODULE_IDENT,
                className: "module-identifier",
              },
              // module Foo = (Bar: Baz) => ...
              {
                begin: "\\s*:\\s*",
                contains: [
                  {
                    begin: RE_MODULE_IDENT,
                    className: "module-identifier",
                  },
                  MODULE_MODE,
                  {
                    begin: "\\s*,\\s*",
                  }
                ]
              },
              MODULE_MODE,
            ]
          },
          MODULE_MODE,
          {
            begin: "\\s*=>\\s*"
          }
        ]
      },
    ]
  };
  MODULE_MODE.contains.unshift(MODULE_DECLARATION_MODE);
  OPEN_OR_INCLUDE_MODULE_MODE.contains.push(MODULE_MODE)

  return {
    aliases: ['re'],
    keywords: KEYWORDS,
    illegal: '(:\\-|:=|\\${|\\+=)',
    // lol beautiful
    contains: MODULE_MODE.contains,
  };
}
