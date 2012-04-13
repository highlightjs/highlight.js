/*
Language: PHP
Author: Victor Karamzin <Victor.Karamzin@enterra-inc.com>
Contributors: Evgeny Stepanischev <imbolk@gmail.com>, Ivan Sagalaev <maniac@softwaremaniacs.org>
*/

hljs.LANGUAGES.php = function() {
  var VARIABLE = {
    className: 'variable', begin: '\\$+[a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff]*'
  };
  var STRINGS = [
    hljs.inherit(hljs.APOS_STRING_MODE, {illegal: null}),
    hljs.inherit(hljs.QUOTE_STRING_MODE, {illegal: null}),
    {
      className: 'string',
      begin: 'b"', end: '"',
      contains: [hljs.BACKSLASH_ESCAPE]
    },
    {
      className: 'string',
      begin: 'b\'', end: '\'',
      contains: [hljs.BACKSLASH_ESCAPE]
    }
  ];
  var NUMBERS = [
    hljs.C_NUMBER_MODE, // 0x..., 0..., decimal, float
    hljs.BINARY_NUMBER_MODE // 0b...
  ];
  var TITLE = {
    className: 'title', begin: hljs.UNDERSCORE_IDENT_RE
  };
  return {
    case_insensitive: true,
    defaultMode: {
      keywords: {
        'and': 1, 'include_once': 1, 'list': 1, 'abstract': 1, 'global': 1,
        'private': 1, 'echo': 1, 'interface': 1, 'as': 1, 'static': 1,
        'endswitch': 1, 'array': 1, 'null': 1, 'if': 1, 'endwhile': 1, 'or': 1,
        'const': 1, 'for': 1, 'endforeach': 1, 'self': 1, 'var': 1, 'while': 1,
        'isset': 1, 'public': 1, 'protected': 1, 'exit': 1, 'foreach': 1,
        'throw': 1, 'elseif': 1, 'include': 1, '__FILE__': 1,
        'empty': 1, 'require_once': 1, 'do': 1, 'xor': 1,
        'return': 1, 'implements': 1, 'parent': 1, 'clone': 1, 'use': 1,
        '__CLASS__': 1, '__LINE__': 1, 'else': 1, 'break': 1, 'print': 1,
        'eval': 1, 'new': 1, 'catch': 1, '__METHOD__': 1, 'case': 1,
        'exception': 1, 'php_user_filter': 1, 'default': 1, 'die': 1,
        'require': 1, '__FUNCTION__': 1, 'enddeclare': 1, 'final': 1, 'try': 1,
        'this': 1, 'switch': 1, 'continue': 1, 'endfor': 1, 'endif': 1,
        'declare': 1, 'unset': 1, 'true': 1, 'false': 1, 'namespace': 1, 'trait':1,
        'goto':1, 'instanceof':1, '__DIR__':1, '__NAMESPACE__':1, '__halt_compiler':1
      },
      contains: [
        hljs.C_LINE_COMMENT_MODE,
        hljs.HASH_COMMENT_MODE,
        {
          className: 'comment',
          begin: '/\\*', end: '\\*/',
          contains: [{
              className: 'phpdoc',
              begin: '\\s@[A-Za-z]+'
          }]
        },
        {
            className: 'comment',
            excludeBegin: true,
            begin: '__halt_compiler.+?;', end: '(?![\\s\\S])' // end of file
        },
        {
          className: 'string',
          begin: '<<<[\'"]?\\w+[\'"]?$', end: '^\\w+;',
          contains: [hljs.BACKSLASH_ESCAPE]
        },
        {
          className: 'preprocessor',
          begin: '<\\?php',
          relevance: 10
        },
        {
          className: 'preprocessor',
          begin: '\\?>'
        },
        VARIABLE,
        {
          className: 'function',
          begin: '\\bfunction\\b', end: '{',
          keywords: {'function': 1},
          illegal: '\\$',
          contains: [
            TITLE,
            {
              className: 'params',
              begin: '\\(', end: '\\)',
              contains: [
                VARIABLE,
                hljs.C_BLOCK_COMMENT_MODE
              ].concat(STRINGS).concat(NUMBERS)
            }
          ]
        },
        {
          className: 'class',
          begin: '\\bclass\\b', end: '{',
          keywords: {'class': 1},
          illegal: '[:\\(\\$]',
          contains: [
            {
              begin: '\\bextends\\b', endsWithParent: true,
              keywords: {'extends': 1},
              contains: [TITLE]
            },
            TITLE
          ]
        },
        {
          begin: '=>' // No markup, just a relevance booster
        }
      ].concat(STRINGS).concat(NUMBERS)
    }
  };
}();
