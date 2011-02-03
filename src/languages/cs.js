/*
Language: C#
Author: Jason Diamond <jason@diamond.name>
*/

hljs.LANGUAGES.cs  = {
  defaultMode: {
    lexems: hljs.UNDERSCORE_IDENT_RE,
    contains: ['comment', 'string', 'number'],
    keywords: {
        // Normal keywords.
        'abstract': 1, 'as': 1, 'base': 1, 'bool': 1, 'break': 1, 'byte': 1, 'case': 1, 'catch': 1, 'char': 1, 'checked': 1, 'class': 1, 'const': 1, 'continue': 1, 'decimal': 1, 'default': 1, 'delegate': 1, 'do': 1, 'do': 1, 'double': 1, 'else': 1, 'enum': 1, 'event': 1, 'explicit': 1, 'extern': 1, 'false': 1, 'finally': 1, 'fixed': 1, 'float': 1, 'for': 1, 'foreach': 1, 'goto': 1, 'if': 1, 'implicit': 1, 'in': 1, 'int': 1, 'interface': 1, 'internal': 1, 'is': 1, 'lock': 1, 'long': 1, 'namespace': 1, 'new': 1, 'null': 1, 'object': 1, 'operator': 1, 'out': 1, 'override': 1, 'params': 1, 'private': 1, 'protected': 1, 'public': 1, 'readonly': 1, 'ref': 1, 'return': 1, 'sbyte': 1, 'sealed': 1, 'short': 1, 'sizeof': 1, 'stackalloc': 1, 'static': 1, 'string': 1, 'struct': 1, 'switch': 1, 'this': 1, 'throw': 1, 'true': 1, 'try': 1, 'typeof': 1, 'uint': 1, 'ulong': 1, 'unchecked': 1, 'unsafe': 1, 'ushort': 1, 'using': 1, 'virtual': 1, 'volatile': 1, 'void': 1, 'while': 1,
        // Contextual keywords.
        'ascending': 1, 'descending': 1, 'from': 1, 'get': 1, 'group': 1, 'into': 1, 'join': 1, 'let': 1, 'orderby': 1, 'partial': 1, 'select': 1, 'set': 1, 'value': 1, 'var': 1, 'where': 1, 'yield': 1
    }
  },
  modes: [
    {
      className: 'comment',
      begin: '///', end: '$', returnBegin: true,
      contains: ['xmlDocTag']
    },
    {
      className: 'xmlDocTag',
      begin: '///|<!--|-->'
    },
    {
      className: 'xmlDocTag',
      begin: '</?', end: '>'
    },
    {
      className: 'string',
      begin: '@"', end: '"',
      contains: [{begin: '""'}]
    },
    hljs.C_LINE_COMMENT_MODE,
    hljs.C_BLOCK_COMMENT_MODE,
    hljs.APOS_STRING_MODE,
    hljs.QUOTE_STRING_MODE,
    hljs.C_NUMBER_MODE
  ]
};
