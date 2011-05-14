/*
Language: vala
Author: Antono Vasiljev <antono.vasiljev@gmail.com>
Description: Vala is a new programming language that aims to bring modern programming language features to GNOME developers without imposing any additional runtime requirements and without using a different ABI compared to applications and libraries written in C.
*/

hljs.LANGUAGES.vala = {
  defaultMode: {
    keywords: {
      keyword: {
        // Value types
        'char': 1, 'uchar': 1, 'unichar': 1,
        'int': 1, 'uint': 1, 'long': 1, 'ulong': 1,
        'short': 1, 'ushort': 1,
        'int8': 1, 'int16': 1, 'int32': 1, 'int64': 1,
        'uint8': 1, 'uint16': 1, 'uint32': 1, 'uint64': 1,
        'float': 1, 'double': 1, 'bool': 1, 'struct': 1, 'enum': 1,
        'string': 1, 'void': 1,
        // Reference types
        'weak': 5, 'unowned': 5, 'owned': 5,
        // Modifiers
        'async': 5, 'signal': 5, 'static': 1, 'abstract': 1, 'interface': 1, 'override': 1,
        // Control Structures
        'while': 1, 'do': 1, 'for': 1, 'foreach': 1, 'else': 1, 'switch': 1,
        'case': 1, 'break': 1, 'default': 1, 'return': 1, 'try': 1, 'catch': 1,
        // Visibility
        'public': 1, 'private': 1, 'protected': 1, 'internal': 1,
        // Other
        'using': 1, 'new': 1, 'this': 1, 'get': 1, 'set': 1, 'const': 1,
        'stdout': 1, 'stdin': 1, 'stderr': 1, 'var': 1,
        // Builtins
        'DBus': 2, 'GLib': 2, 'CCode': 10, 'Gee': 10, 'Object': 1
      },
      literal: { 'false': 1, 'true': 1, 'null': 1 }
    },
    contains: [
      {
        className: 'class',
        begin: '(class |interface |delegate |namespace )', end: '{',
        keywords: {'class': 1, 'interface': 1},
        contains: [
          {
            begin: '(implements|extends)', end: hljs.IMMEDIATE_RE,
            keywords: {'extends': 1, 'implements': 1},
            relevance: 1
          },
          {
            className: 'title',
            begin: hljs.UNDERSCORE_IDENT_RE, end: hljs.IMMEDIATE_RE
          }
        ]
      },
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      {
        className: 'string',
        begin: '"""', end: '"""',
        relevance: 5
      },
      hljs.APOS_STRING_MODE,
      hljs.QUOTE_STRING_MODE,
      hljs.C_NUMBER_MODE,
      {
        className: 'preprocessor',
        begin: '^#', end: '$',
        relevance: 2
      },
      {
        className: 'constant',
        begin: ' [A-Z_]+ ', end: hljs.IMMEDIATE_RE,
        relevance: 0
      }
    ]
  }
};
