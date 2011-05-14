/*
Language: Go
Author: Stephan Kountso aka StepLg <steplg@gmail.com>
Description: Google go language (golang). For info about language see http://golang.org/
*/

hljs.LANGUAGES.go = function(){
  var GO_KEYWORDS = {
    'keyword': {
       'break' : 1, 'default' : 1, 'func' : 1, 'interface' : 1, 'select' : 1,
       'case' : 1, 'map' : 1, 'struct' : 1, 'chan' : 1,
       'else' : 1, 'goto' : 1, 'package' : 1, 'switch' : 1, 'const' : 1,
       'fallthrough' : 1, 'if' : 1, 'range' : 1, 'type' : 1, 'continue' : 1,
       'for' : 1, 'import' : 1, 'return' : 1, 'var' : 1, 'go': 1, 'defer' : 1
    },
    'constant': {
       'true': 1, 'false': 1, 'iota': 1, 'nil': 1
    },
    'typename': {
       'bool': 1, 'byte': 1, 'complex64': 1, 'complex128': 1, 'float32': 1,
       'float64': 1, 'int8': 1, 'int16': 1, 'int32': 1, 'int64': 1, 'string': 1,
       'uint8': 1, 'uint16': 1, 'uint32': 1, 'uint64': 1, 'int': 1, 'uint': 1,
       'uintptr': 1
   },
    'built_in': {
       'append': 1, 'cap': 1, 'close': 1, 'complex': 1, 'copy': 1, 'imag': 1,
       'len': 1, 'make': 1, 'new': 1, 'panic': 1, 'print': 1, 'println': 1,
       'real': 1, 'recover': 1
    }
  };
  return {
    defaultMode: {
      keywords: GO_KEYWORDS,
      illegal: '</',
      contains: [
        hljs.C_LINE_COMMENT_MODE,
        hljs.C_BLOCK_COMMENT_MODE,
        hljs.QUOTE_STRING_MODE,
        {
          className: 'string',
          begin: '\'', end: '[^\\\\]\''
        },
        {
          className: 'string',
          begin: '`', end: '[^\\\\]`'
        },
        {
          className: 'number',
          begin: '[^a-zA-Z_0-9](\\-|\\+)?\\d+(\\.\\d+|\\/\\d+)?((d|e|f|l|s)(\\+|\\-)?\\d+)?'
        },
        hljs.C_NUMBER_MODE
      ]
    }
  };
}();

