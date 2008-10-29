hljs.CPP_KEYWORDS = {
  'keyword': {'false': 1, 'int': 1, 'float': 1, 'while': 1, 'private': 1, 'char': 1, 'catch': 1, 'export': 1, 'virtual': 1, 'operator': 2, 'sizeof': 2, 'dynamic_cast': 2, 'typedef': 2, 'const_cast': 2, 'const': 1, 'struct': 1, 'for': 1, 'static_cast': 2, 'union': 1, 'namespace': 1, 'unsigned': 1, 'long': 1, 'throw': 1, 'volatile': 2, 'static': 1, 'protected': 1, 'bool': 1, 'template': 1, 'mutable': 1, 'if': 1, 'public': 1, 'friend': 2, 'do': 1, 'return': 1, 'goto': 1, 'auto': 1, 'void': 2, 'enum': 1, 'else': 1, 'break': 1, 'new': 1, 'extern': 1, 'using': 1, 'true': 1, 'class': 1, 'asm': 1, 'case': 1, 'typeid': 1, 'short': 1, 'reinterpret_cast': 2, 'default': 1, 'double': 1, 'register': 1, 'explicit': 1, 'signed': 1, 'typename': 1, 'try': 1, 'this': 1, 'switch': 1, 'continue': 1, 'wchar_t': 1, 'inline': 1, 'delete': 1},
  'built_in': {'std': 1, 'string': 1, 'cin': 1, 'cout': 1, 'cerr': 1, 'clog': 1, 'stringstream': 1, 'istringstream': 1, 'ostringstream': 1, 'auto_ptr': 1, 'deque': 1, 'list': 1, 'queue': 1, 'stack': 1, 'vector': 1, 'map': 1, 'set': 1, 'bitset': 1, 'multiset': 1, 'multimap': 1}
}
hljs.LANGUAGES.cpp = {
  defaultMode: {
    lexems: [hljs.UNDERSCORE_IDENT_RE],
    illegal: '</',
    contains: ['comment', 'string', 'number', 'preprocessor', 'stl_container'],
    keywords: hljs.CPP_KEYWORDS
  },
  modes: [
    hljs.C_LINE_COMMENT_MODE,
    hljs.C_BLOCK_COMMENT_MODE,
    hljs.C_NUMBER_MODE,
    hljs.QUOTE_STRING_MODE,
    hljs.BACKSLASH_ESCAPE,
    {
      className: 'string',
      begin: '\'', end: '[^\\\\]\'',
      illegal: '[^\\\\][^\']'
    },
    {
      className: 'preprocessor',
      begin: '#', end: '$'
    },
    {
      className: 'stl_container',
      begin: '\\b(deque|list|queue|stack|vector|map|set|bitset|multiset|multimap)\\s*<', end: '>',
      contains: ['stl_container'],
      lexems: [hljs.UNDERSCORE_IDENT_RE],
      keywords: hljs.CPP_KEYWORDS,
      relevance: 10
    }
  ]
};


/*

Java definition (с) Vsevolod Solovyov <vsevolod.solovyov@gmail.com>

*/
hljs.LANGUAGES.java  = {
  defaultMode: {
    lexems: [hljs.UNDERSCORE_IDENT_RE],
    contains: ['javadoc', 'comment', 'string', 'class', 'number', 'annotation'],
    keywords: {'false': 1, 'synchronized': 1, 'int': 1, 'abstract': 1, 'float': 1, 'private': 1, 'char': 1, 'interface': 1, 'boolean': 1, 'static': 1, 'null': 1, 'if': 1, 'const': 1, 'for': 1, 'true': 1, 'while': 1, 'long': 1, 'throw': 1, 'strictfp': 1, 'finally': 1, 'protected': 1, 'extends': 1, 'import': 1, 'native': 1, 'final': 1, 'implements': 1, 'return': 1, 'void': 1, 'enum': 1, 'else': 1, 'break': 1, 'transient': 1, 'new': 1, 'catch': 1, 'instanceof': 1, 'byte': 1, 'super': 1, 'class': 1, 'volatile': 1, 'case': 1, 'assert': 1, 'short': 1, 'package': 1, 'default': 1, 'double': 1, 'public': 1, 'try': 1, 'this': 1, 'switch': 1, 'continue': 1, 'throws': 1}
  },
  modes: [
    {
      className: 'class',
      lexems: [hljs.UNDERSCORE_IDENT_RE],
      begin: '(class |interface )', end: '{', 
      illegal: ':',
      keywords: {'class': 1, 'interface': 1},
      contains: ['inheritance', 'title']
    },
    {
      className: 'inheritance',
      begin: '(implements|extends)', end: '^',
      lexems: [hljs.IDENT_RE],
      keywords: {'extends': 1, 'implements': 1},
      relevance: 10
    },
    {
      className: 'title',
      begin: hljs.UNDERSCORE_IDENT_RE, end: '^'
    },
    {
      className: 'params',
      begin: '\\(', end: '\\)',
      contains: ['string', 'annotation']
    },
    hljs.C_NUMBER_MODE,
    hljs.APOS_STRING_MODE,
    hljs.QUOTE_STRING_MODE,
    hljs.BACKSLASH_ESCAPE,
    hljs.C_LINE_COMMENT_MODE,
    {
      className: 'javadoc',
      begin: '/\\*\\*', end: '\\*/',
      contains: ['javadoctag'],
      relevance: 10
    },
    {
      className: 'javadoctag',
      begin: '@[A-Za-z]+', end: '^'
    },
    hljs.C_BLOCK_COMMENT_MODE,
    {
      className: 'annotation',
      begin: '@[A-Za-z]+', end: '^'
    }
  ]
};


hljs.DELPHI_KEYWORDS = {'and': 1, 'safecall': 1, 'cdecl': 1, 'then': 1, 'string': 1, 'exports': 1, 'library': 1, 'not': 1, 'pascal': 1, 'set': 1, 'virtual': 1, 'file': 1, 'in': 1, 'array': 1, 'label': 1, 'packed': 1, 'end.': 1, 'index': 1, 'while': 1, 'const': 1, 'raise': 1, 'for': 1, 'to': 1, 'implementation': 1, 'with': 1, 'except': 1, 'overload': 1, 'destructor': 1, 'downto': 1, 'finally': 1, 'program': 1, 'exit': 1, 'unit': 1, 'inherited': 1, 'override': 1, 'if': 1, 'type': 1, 'until': 1, 'function': 1, 'do': 1, 'begin': 1, 'repeat': 1, 'goto': 1, 'nil': 1, 'far': 1, 'initialization': 1, 'object': 1, 'else': 1, 'var': 1, 'uses': 1, 'external': 1, 'resourcestring': 1, 'interface': 1, 'end': 1, 'finalization': 1, 'class': 1, 'asm': 1, 'mod': 1, 'case': 1, 'on': 1, 'shr': 1, 'shl': 1, 'of': 1, 'register': 1, 'xorwrite': 1, 'threadvar': 1, 'try': 1, 'record': 1, 'near': 1, 'stored': 1, 'constructor': 1, 'stdcall': 1, 'inline': 1, 'div': 1, 'out': 1, 'or': 1, 'procedure': 1};
hljs.DELPHI_CLASS_KEYWORDS = {'safecall': 1, 'stdcall': 1, 'pascal': 1, 'stored': 1, 'const': 1, 'implementation': 1, 'finalization': 1, 'except': 1, 'to': 1, 'finally': 1, 'program': 1, 'inherited': 1, 'override': 1, 'then': 1, 'exports': 1, 'string': 1, 'read': 1, 'not': 1, 'mod': 1, 'shr': 1, 'try': 1, 'div': 1, 'shl': 1, 'set': 1, 'library': 1, 'message': 1, 'packed': 1, 'index': 1, 'for': 1, 'near': 1, 'overload': 1, 'label': 1, 'downto': 1, 'exit': 1, 'public': 1, 'goto': 1, 'interface': 1, 'asm': 1, 'on': 1, 'of': 1, 'constructor': 1, 'or': 1, 'private': 1, 'array': 1, 'unit': 1, 'raise': 1, 'destructor': 1, 'var': 1, 'type': 1, 'until': 1, 'function': 1, 'else': 1, 'external': 1, 'with': 1, 'case': 1, 'default': 1, 'record': 1, 'while': 1, 'protected': 1, 'property': 1, 'procedure': 1, 'published': 1, 'and': 1, 'cdecl': 1, 'do': 1, 'threadvar': 1, 'file': 1, 'in': 1, 'if': 1, 'end': 1, 'virtual': 1, 'write': 1, 'far': 1, 'out': 1, 'begin': 1, 'repeat': 1, 'nil': 1, 'initialization': 1, 'object': 1, 'uses': 1, 'resourcestring': 1, 'class': 1, 'register': 1, 'xorwrite': 1, 'inline': 1, 'static': 1};

hljs.LANGUAGES.delphi = {
  defaultMode: {
    lexems: [hljs.IDENT_RE],
    illegal: '("|\\$[G-Zg-z]|\\/\\*|</)',
    contains: ['comment', 'string', 'number', 'function', 'class'],
    keywords: hljs.DELPHI_KEYWORDS
  },
  case_insensitive: true,
  modes: [
    {
      className: 'comment',
      begin: '{', end: '}'
    },
    {
      className: 'comment',
      begin: '\\(\\*', end: '\\*\\)',
      relevance: 10
    },
    hljs.C_LINE_COMMENT_MODE,
    {
      className: 'number',
      begin: hljs.NUMBER_RE, end: '^',
      relevance: 0
    },
    {
      className: 'string',
      begin: '\'', end: '\'',
      contains: ['quote'],
      relevance: 0
    },
    {
      className: 'string',
      begin: '(#\\d+)+', end: '^'
    },
    {
      className: 'quote',
      begin: '\'\'', end: '^'
    },
    {
      className: 'function',
      begin: 'function\\b', end: '[:;]',
      lexems: [hljs.IDENT_RE],
      keywords: {'function': 1},
      contains: ['title', 'params', 'comment'],
      relevance: 0
    },
    {
      className: 'function',
      begin: '(procedure|constructor|destructor)\\b', end: ';',
      lexems: [hljs.IDENT_RE],
      keywords: {'constructor': 1, 'destructor': 1, 'procedure': 1},
      contains: ['title', 'params', 'comment'],
      relevance: 10
    },
    {
      className: 'title',
      begin: hljs.IDENT_RE, end: '^'
    },
    {
      className: 'params',
      begin: '\\(', end: '\\)',
      lexems: [hljs.IDENT_RE],
      keywords: hljs.DELPHI_KEYWORDS,
      contains: ['string']
    },
    {
      className: 'class',
      begin: '=\\bclass\\b', end: 'end;',
      lexems: [hljs.IDENT_RE],
      keywords: hljs.DELPHI_CLASS_KEYWORDS,
      contains: ['string', 'comment', 'function']
    }
  ]
};

/*

C# definition (с) Jason Diamond <jason@diamond.name>

*/
hljs.LANGUAGES.cs  = {
  defaultMode: {
    lexems: [hljs.UNDERSCORE_IDENT_RE],
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
      begin: '///|<!--|-->', end: '^'
    },
    {
      className: 'xmlDocTag',
      begin: '</?', end: '>'
    },
    {
      className: 'string',
      begin: '@"', end: '"',
      contains: ['quoteQuote']
    },
    {
      className: 'quoteQuote',
      begin: '""', end: '^'
    },
    hljs.C_LINE_COMMENT_MODE,
    hljs.C_BLOCK_COMMENT_MODE,
    hljs.APOS_STRING_MODE,
    hljs.QUOTE_STRING_MODE,
    hljs.BACKSLASH_ESCAPE,
    hljs.C_NUMBER_MODE
  ]
};