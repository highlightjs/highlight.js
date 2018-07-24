/*
Language: ReasonML
Author: Gidi Meir Morris <oss@gidi.io>
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

  var RE_IDENT = '~?[a-z$_][0-9a-zA-Z$_]*';
  var RE_MODULE_IDENT = '[A-Z$_][0-9a-zA-Z$_]*';
  
  var RE_PARAM_TYPEPARAM = '\'?[a-z$_][0-9a-z$_]*';
  var RE_PARAM_TYPE = '\s*:\s*[a-z$_][0-9a-z$_]*(\(\s*(' + RE_PARAM_TYPEPARAM + '\s*(,' + RE_PARAM_TYPEPARAM + ')*)?\s*\))?';
  var RE_PARAM = RE_IDENT + '(' + RE_PARAM_TYPE + ')?(' + RE_PARAM_TYPE + ')?';
  var RE_OPERATOR = "(" + orReValues(['||', '&&', '++', '**', '+.', '*', '/', '*.', '/.', '...', '|>']) + "|==|===)";
  var RE_OPERATOR_SPACED = "\\s+" + RE_OPERATOR + "\\s+";

  var KEYWORDS = {
    keyword:
      'and as asr assert begin class constraint do done downto else end exception external' +
      'for fun function functor if in include inherit initializer' +
      'land lazy let lor lsl lsr lxor match method mod module mutable new nonrec' +
      'object of open or private rec sig struct then to try type val virtual when while with',
    built_in:
      'array bool bytes char exn|5 float int int32 int64 list lazy_t|5 nativeint|5 ref string unit ',
    literal:
      'true false'
  };

  const NUMBER_MODE = {
    className: 'number',
    begin: '\\b(0[xX][a-fA-F0-9_]+[Lln]?|' +
      '0[oO][0-7_]+[Lln]?|' +
      '0[bB][01_]+[Lln]?|' +
      '[0-9][0-9_]*([Lln]|(\\.[0-9_]*)?([eE][-+]?[0-9_]+)?)?)',
    relevance: 0
  };

  const LIST_CONTENTS_MODES = [
    {
      className: 'identifier',
      relevance: 0,
      begin: RE_IDENT
    },
    {
      className: 'operator',
      relevance: 0,
      begin: RE_OPERATOR
    },
    NUMBER_MODE
  ];
  
  return {
    aliases: ['re'],
    keywords: KEYWORDS,
    contains: [
      hljs.COMMENT('/\\*', '\\*/', { illegal: '^\\#' }),
      {
        className: 'character',
        begin: '\'(\\\\[^\']+|[^\'])\'',
        illegal: '\\n',
        relevance: 0
      },
      hljs.QUOTE_STRING_MODE,
      {
        className: 'literal',
        begin: '\\(\\)',
        relevance: 0
      },
      {
        className: 'literal',
        begin: '\\[\\|',
        end: '\\|\\]',
        relevance:  0,
        contains: LIST_CONTENTS_MODES
      },
      {
        className: 'literal',
        begin: '\\[',
        end: '\\]',
        relevance: 0,
        contains: LIST_CONTENTS_MODES
      },
      {
        className: 'operator',
        begin: RE_OPERATOR_SPACED,
        illegal: '\\-\\->',
        relevance: 0
      },
      NUMBER_MODE,
      hljs.C_LINE_COMMENT_MODE,
      {
        className: 'function',
        begin: '(\\(.*?\\)|' + RE_IDENT + ')\\s*=>', returnBegin: true,
        end: '\\s*=>',
        relevance: 0,
        contains: [
          {
            className: 'params',
            variants: [
              {
                begin: RE_IDENT
              },
              {
                begin: RE_PARAM
              },
              {
                begin: /\(\s*\)/,
              }
            ]
          }
        ]
      },
      {
        className: 'module-def',
        begin: "\\bmodule\\b",
        end: RE_MODULE_IDENT + "\\s+=\\s+{",
        returnBegin: true,
        keywords: KEYWORDS,
        relevance: 0,
        contains: [
          {
            className: 'module',
            relevance: 0,
            begin: RE_MODULE_IDENT
          }
        ]
      },
      {
        className: 'module-access',
        begin: "\\b(" + RE_MODULE_IDENT + "\\.)+", returnBegin: true,
        end: "(" + RE_IDENT +"|\\(|{)",
        contains: [
          {
            className: 'module',
            begin: "\\b" + RE_MODULE_IDENT, returnBegin: true,
            end: "\.",
            contains: [
              {
                className: 'identifier',
                begin: RE_MODULE_IDENT,
                relevance: 0
              }
            ]
          }
        ]        
      }
    ]
  };
}
