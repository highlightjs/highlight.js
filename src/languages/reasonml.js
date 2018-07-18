/*
Language: ReasonML
Author: Gidi Meir Morris <oss@gidi.io>
Category: functional
*/
function(hljs) {
  var IDENT_RE = '~?[a-z$_][0-9a-z$_]*';
  
  var PARAM_TYPEPARAM_RE = '\'?[a-z$_][0-9a-z$_]*';
  var PARAM_TYPE_RE = '\s*:\s*[a-z$_][0-9a-z$_]*(\(\s*(' + PARAM_TYPEPARAM_RE + '\s*(,' + PARAM_TYPEPARAM_RE + ')*)?\s*\))?';
  var PARAM_RE = IDENT_RE + '(' + PARAM_TYPE_RE + ')?(' + PARAM_TYPE_RE + ')?';

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

  return {
    aliases: ['re'],
    keywords: KEYWORDS,
    contains: [
      hljs.QUOTE_STRING_MODE,
      {
        className: 'literal',
        begin: '\\[(\\|\\|)?\\]|\\(\\)',
        relevance: 0
      },
      {
        className: 'number',
        begin:
          '\\b(0[xX][a-fA-F0-9_]+[Lln]?|' +
          '0[oO][0-7_]+[Lln]?|' +
          '0[bB][01_]+[Lln]?|' +
          '[0-9][0-9_]*([Lln]|(\\.[0-9_]*)?([eE][-+]?[0-9_]+)?)?)',
        relevance: 0
      },
      hljs.C_LINE_COMMENT_MODE,
      {
        className: 'function',
        begin: '(\\(.*?\\)|' + IDENT_RE + ')\\s*=>', returnBegin: true,
        end: '\\s*=>',
        contains: [
          {
            className: 'params',
            variants: [
              {
                begin: IDENT_RE
              },
              {
                begin: PARAM_RE
              },
              {
                begin: /\(\s*\)/,
              }
            ]
          }
        ]
      }
    ]
  };
}
