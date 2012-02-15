/*
Language: ActionScript
Author: Alexander Myadzel <myadzel@gmail.com>
*/

hljs.LANGUAGES.actionscript = function() {
  var IDENT_RE = '[a-zA-Z_$][a-zA-Z0-9_$]*';
  var IDENT_FUNC_RETURN_TYPE_RE = '([*]|[a-zA-Z_$][a-zA-Z0-9_$]*)';
  
  var AS3_REST_ARG_MODE = {
    className: 'rest_arg',
    begin: '[.]{3}', end: IDENT_RE,
    relevance: 10
  };
  
  return {
    defaultMode: {
      keywords: {
        'keyword': {'as': 1, 'break': 1, 'case': 1, 'catch': 1, 'class': 1, 'const': 1, 'continue': 1, 'default': 1, 'delete': 1, 'do': 1, 'dynamic': 5, 'each': 1, 'else': 1, 'extends': 1, 'final': 1, 'finally': 1, 'for': 1, 'function': 1, 'get': 1, 'if': 1, 'implements': 1, 'import': 1, 'in': 1, 'include': 1, 'instanceof': 1, 'interface': 1, 'internal': 1, 'is': 1, 'namespace': 1, 'native': 1, 'native': 1, 'new': 1, 'override': 1, 'package': 1, 'private': 1, 'protected': 1, 'public': 1, 'return': 1, 'set': 1,  'static': 1, 'super': 5, 'switch': 1, 'this': 1, 'throw': 1, 'try': 1, 'typeof': 1, 'use': 1, 'var': 1, 'void': 1, 'while': 1, 'with': 1},
        'literal': {'true': 1, 'false': 1, 'null': 1, 'undefined': 1},
        'reserved': {'abstract': 0, 'boolean': 0, 'byte': 0, 'cast': 0, 'char': 0, 'debugger': 0, 'double': 0, 'enum': 0, 'export': 0, 'float': 0, 'goto': 0, 'intrinsic': 0, 'long': 0, 'prototype': 0, 'short': 0, 'synchronized': 0, 'throws': 0, 'to': 0, 'transient': 0, 'type': 0, 'virtual': 0, 'volatile': 0}
      },
      contains: [
        hljs.APOS_STRING_MODE,
        hljs.QUOTE_STRING_MODE,
        hljs.C_LINE_COMMENT_MODE,
        hljs.C_BLOCK_COMMENT_MODE,
        hljs.C_NUMBER_MODE,
        {
          className: 'package',
          begin: 'package ?', end: '{',
          keywords: {'package': 1},
          contains: [
            {
              className: 'title', 
              begin: IDENT_RE
            }
          ],
          relevance: 5
        },
        {
          className: 'class',
          begin: '(class|interface) ', end: '{',
          keywords: {'class': 1, 'interface': 1},
          contains: [
            {
              begin: '(implements|extends)',
              keywords: {'extends': 1, 'implements': 1},
              relevance: 5
            },
            {
              className: 'title',
              begin: IDENT_RE
            }
          ]
        },
        {
          className: 'function',
          begin: 'function ', end: '[{;]',
          keywords: {'function': 1},
          contains: [
            {
              className: 'title', 
              begin: IDENT_RE
            },
            {
              className: 'params',
              begin: '\\(', end: '\\)',
              contains: [
                hljs.APOS_STRING_MODE,
                hljs.QUOTE_STRING_MODE,
                hljs.C_LINE_COMMENT_MODE,
                hljs.C_BLOCK_COMMENT_MODE,
                AS3_REST_ARG_MODE
              ]
            },
            {
              className: 'type', 
              begin: ':',
              end: IDENT_FUNC_RETURN_TYPE_RE,
              relevance: 10
            }
          ]
        },
        {
          className: 'preprocessor',
          begin: 'import ', end: ';',
          keywords: {'import': 1},
          relevance: 5
        },
        {
          className: 'preprocessor',
          begin: 'include ', end: '\n',
          keywords: {'include': 1},
          relevance: 5
        }
      ]
    }
  }
}();