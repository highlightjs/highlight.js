/*
Language: Scala
Author: Jan Berkel <jan.berkel@gmail.com>
2014-05-09: modified by Erik Osheim <d_m@plastic-idolatry.com>
*/

function(hljs) {

  var ANNOTATION = {
    className: 'annotation', begin: '@[A-Za-z]+'
  };

  var STRING = {
    className: 'string',
    begin: 'u?r?"""', end: '"""',
    relevance: 10
  };

  var SYMBOL = {
    className: 'symbol',
    begin: '\'\\w[\\w\\d_]*(?!\')'
  };

  /* TODO: would be nice to use a better className that 'literal'
   * but 'type' etc don't seem to work
   */
  var TYPE = {
    className: 'literal',
    begin: '[A-Z][A-Za-z0-9_]*'
  };

  var TPARAMS = {
    className: 'params',
    begin: /\[/, end: /\]/,
    contains: [STRING, TYPE]
  };

  var PARAMS = {
    className: 'params',
    begin: /\(/, end: /\)/,
    contains: [STRING, TYPE]
  };

  var FUNC_CLASS_PROTO = {
    end: /[:={]|extends/,
    illegal: /[${=;\n]/,
    contains: [hljs.UNDERSCORE_TITLE_MODE, PARAMS, TPARAMS]
  };
  var KEYW = {
    className: 'keyword',
    begin: '(type|yield|lazy|override|def|with|val|var|false|true|sealed|abstract|private|trait|object|null|if|forSome|for|while|throw|finally|protected|extends|import|final|return|else|break|new|catch|super|class|case|package|default|try|this|match|continue|throws)(?![A-Za-z0-9_])'
  };
  var BAREWORD = {
    className: 'xyz',
    begin: '[a-z_][A-Za-z0-9_]*'
  };
  return {
    contains: [
      {
        className: 'javadoc',
        begin: '/\\*\\*', end: '\\*/',
        contains: [{
          className: 'javadoctag',
          begin: '@[A-Za-z]+'
        }],
        relevance: 10
      },
      hljs.C_LINE_COMMENT_MODE, hljs.C_BLOCK_COMMENT_MODE,
      STRING, hljs.QUOTE_STRING_MODE,
      SYMBOL,
      TYPE,
      hljs.inherit(FUNC_CLASS_PROTO, {className: 'function', beginKeywords: 'def', relevance: 10}),
      hljs.inherit(FUNC_CLASS_PROTO, {className: 'class', beginKeywords: 'class'}),
      KEYW,
      BAREWORD,
      {
        className: 'class',
        begin: '((case )?class |object |trait )', // beginKeywords won't work because a single "case" shouldn't start this mode
        end: '({|$)', excludeEnd: true,
        illegal: ':',
        keywords: 'case class trait object',
        contains: [
          {
            beginKeywords: 'extends with',
            relevance: 10
          },
          hljs.UNDERSCORE_TITLE_MODE,
          {
            className: 'params',
            begin: '\\(', end: '\\)',
            contains: [
              hljs.QUOTE_STRING_MODE, STRING,
              ANNOTATION
            ]
          }
        ]
      },
      hljs.C_NUMBER_MODE,
      ANNOTATION
    ]
  };
}
