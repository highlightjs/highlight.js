/*

Автоматическая javascript'овая подсветка синтаксиса на веб-страницах.

URL:   http://softwaremaniacs.org/soft/highlight/
Автор: Иван Сагалаев <Maniac@SoftwareManiacs.Org>

Внесли свой вклад:

- Леонов Петр <gojpeg@gmail.com> 
- Карамзин Виктор <Victor.Karamzin@enterra-inc.com>
- Всеволод Соловьёв <vsevolod.solovyov@gmail.com>

*/

var IDENT_RE = '[a-zA-Z][a-zA-Z0-9_]*';
var NUMBER_RE = '\\b\\d+(\\.\\d+)?';
var C_NUMBER_RE = '\\b(0x[A-Za-z0-9]+|\\d+(\\.\\d+)?)';

var LANGUAGES = {}

LANGUAGES.python = {
  defaultMode: {
    lexems: [
      IDENT_RE
    ],
    illegal: '(</|->)',
    contains: ['comment', 'string', 'function', 'class', 'number', 'decorator'],
    keywords: ['and', 'as', 'assert', 'break', 'class', 'continue', 'def', 'del', 'elif', 'else', 'except', 'exec', 'finally', 'for', 'from', 'global', 'if', 'import', 'in', 'is', 'lambda', 'None', 'not', 'or', 'pass', 'print', 'raise', 'return', 'try', 'while', 'with', 'yield']
  },
  modes: [
    {
      className: 'function',
      lexems: [
        IDENT_RE
      ],
      begin: 'def ', end: ':',
      illegal: '$',
      keywords: ['def '],
      contains: ['title', 'params'],
      relevance: 10
    },
    {
      className: 'class',
      lexems: [
        IDENT_RE
      ],
      begin: 'class ', end: ':$',
      illegal: '[${]',
      keywords: ['class '],
      contains: ['title', 'params'],
      relevance: 10
    },
    {
      className: 'title',
      begin: IDENT_RE, end: '^'
    },
    {
      className: 'params',
      begin: '\\(', end: '\\)',
      contains: ['string']
    },
    {
      className: 'comment',
      begin: '#', end: '$'
    },
    {
      className: 'number',
      begin: C_NUMBER_RE, end: '^',
      relevance: 0
    },
    {
      className: 'string',
      begin: '\'\'\'', end: '\'\'\'',
      relevance: 10
    },
    {
      className: 'string',
      begin: '"""', end: '"""',
      relevance: 10
    },
    {
      className: 'string',
      begin: '\'', end: '(^|[^\\\\])\'',
      relevance: 0
    },
    {
      className: 'string',
      begin: '"', end: '(^|[^\\\\])"',
      relevance: 0
    },
    {
      className: 'string',
      begin: 'r\'', end: '\''
    },
    {
      className: 'string',
      begin: 'r"', end: '"'
    },
    {
      className: 'string',
      begin: 'u\'', end: '(^|[^\\\\])\''
    },
    {
      className: 'string',
      begin: 'u"', end: '(^|[^\\\\])"'
    },
    {
      className: 'string',
      begin: 'ur\'', end: '\''
    },
    {
      className: 'string',
      begin: 'ur"', end: '"'
    },
    {
      className: 'decorator',
      begin: '@', end: '$'
    }
  ]
};//python

var HTML_TAGS = ['a', 'abbr', 'acronym', 'address', 'applet', 'area', 'b', 'base', 'basefont', 'bdo', 'big', 'blockquote', 'body', 'br', 'button', 'caption', 'center', 'cite', 'code', 'col', 'colgroup', 'dd', 'del', 'dfn', 'dir', 'div', 'dl', 'dt', 'em', 'fieldset', 'font', 'form', 'frame', 'frameset', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'hr', 'html', 'i', 'iframe', 'img', 'input', 'ins', 'isindex', 'kbd', 'label', 'legend', 'li', 'link', 'map', 'menu', 'meta', 'noframes', 'noscript', 'object', 'ol', 'optgroup', 'option', 'p', 'param', 'pre', 'q', 's', 'samp', 'script', 'select', 'small', 'span', 'strike', 'strong', 'style', 'sub', 'sup', 'table', 'tbody', 'td', 'textarea', 'tfoot', 'th', 'thead', 'title', 'tr', 'tt', 'u', 'ul', 'var', 'xml', 'xmlns']

LANGUAGES.html = {
  defaultMode: {
    contains: ['tag', 'comment']
  },
  case_insensitive: true,
  modes: [
    {
      className: 'comment',
      begin: '<!--', end: '-->'
    },
    {
      className: 'tag',
      lexems: [
        '[a-zA-Z][a-zA-Z0-9_]*'
      ],
      keywords: HTML_TAGS,
      begin: '<', end: '>',
      contains: ['attribute']
    },
    {
      className: 'attribute',
      begin: ' [a-zA-Z]+=', end: '^',
      contains: ['value']
    },
    {
      className: 'attribute',
      begin: ' [a-zA-Z]+', end: '^'
    },
    {
      className: 'value',
      begin: '"', end: '"'
    },
    {
      className: 'value',
      begin: '[a-zA-Z0-9]+', end: '^'
    }
  ]
};//html

LANGUAGES.css = {
  defaultMode: {
    contains: ['id', 'class', 'attr_selector', 'rules', 'comment'],
    keywords: HTML_TAGS,
    lexems: [
      IDENT_RE
    ],
    illegal: '='
  },
  case_insensitive: true,
  modes: [
    {
      className: 'id',
      begin: '\\#[A-Za-z0-9_-]+', end: '^'
    },
    {
      className: 'class',
      begin: '\\.[A-Za-z0-9_-]+', end: '^',
      relevance: 0
    },
    {
      className: 'attr_selector',
      begin: '\\[', end: '\\]',
      illegal: '$'
    },
    {
      className: 'rules',
      begin: '{', end: '}',
      lexems: [
        '[A-Za-z-]+'
      ],
      keywords: ['background', 'background-attachment', 'background-color', 'background-image', 'background-position', 'background-repeat', 'border', 'border-bottom', 'border-bottom-width', 'border-color', 'border-left', 'border-left-width', 'border-right', 'border-right-width', 'border-style', 'border-top', 'border-top-width', 'border-width', 'clear', 'color', 'display', 'float', 'font', 'font-family', 'font-size', 'font-style', 'font-variant', 'font-weight', 'height', 'letter-spacing', 'line-height', 'list-style', 'list-style-image', 'list-style-position', 'list-style-type', 'margin', 'margin-bottom', 'margin-left', 'margin-right', 'margin-top', 'padding', 'padding-bottom', 'padding-left', 'padding-right', 'padding-top', 'text-align', 'text-decoration', 'text-indent', 'text-transform', 'vertical-align', 'white-space', 'width', 'word-spacing'],
      contains: ['comment', 'value']
    },
    {
      className: 'comment',
      begin: '/\\*', end: '\\*/'
    },
    {
      className: 'value',
      begin: ':', end: ';', endsWithParent: true, 
      excludeBegin: true, excludeEnd: true
    }
  ]
};//css

var DELPHI_KEYWORDS = ['and', 'array', 'asm', 'begin', 'case', 'cdecl', 'class', 'const', 'constructor', 'destructor', 'div', 'do', 'downto', 'else', 'end', 'end.', 'except', 'exit', 'exports', 'external', 'far', 'file', 'finalization', 'finally', 'for', 'function', 'goto', 'if', 'implementation', 'in', 'index', 'inherited', 'initialization', 'inline', 'interface', 'label', 'library', 'mod', 'near', 'nil', 'not', 'object', 'of', 'on', 'or', 'out', 'overload', 'override', 'packed', 'pascal', 'procedure', 'program', 'raise', 'record', 'register', 'repeat', 'resourcestring', 'safecall', 'set', 'shl', 'shr', 'stdcall', 'stored', 'string', 'then', 'threadvar', 'to', 'try', 'type', 'unit', 'until', 'uses', 'var', 'virtual', 'while', 'with', 'xorwrite'];
var DELPHI_CLASS_KEYWORDS = ['and', 'array', 'asm', 'begin', 'case', 'cdecl', 'class', 'const', 'constructor', 'default', 'destructor', 'div', 'do', 'downto', 'else', 'end', 'end.', 'except', 'exit', 'exports', 'external', 'far', 'file', 'finalization', 'finally', 'for', 'function', 'goto', 'if', 'implementation', 'in', 'index', 'inherited', 'initialization', 'inline', 'interface', 'label', 'library', 'message', 'mod', 'near', 'nil', 'not', 'object', 'of', 'on', 'or', 'out', 'overload', 'override', 'packed', 'pascal', 'private', 'procedure', 'program', 'property', 'protected', 'public', 'published', 'raise', 'read', 'record', 'register', 'repeat', 'resourcestring', 'safecall', 'set', 'shl', 'shr', 'stdcall', 'stored', 'string', 'then', 'threadvar', 'to', 'try', 'type', 'unit', 'until', 'uses', 'var', 'virtual', 'while', 'with', 'write', 'xorwrite'];

LANGUAGES.delphi = {
  defaultMode: {
    lexems: [
      IDENT_RE
    ],
    illegal: '("|\\$[G-Zg-z]|\\*)',
    contains: ['comment', 'string', 'number', 'function', 'class'],
    keywords: DELPHI_KEYWORDS
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
    {
      className: 'comment',
      begin: '//', end: '$',
      relevance: 0
    },
    {
      className: 'number',
      begin: NUMBER_RE, end: '^',
      relevance: 0
    },
    {
      className: 'string',
      begin: '\'', end: '[^\\\']\'',
      relevance: 0
    },
    {
      className: 'function',
      begin: 'function', end: '[:;]',
      keywords: ['function'],
      contains: ['title', 'params', 'comment'],
      relevance: 0
    },
    {
      className: 'function',
      begin: '(procedure|constructor|destructor)', end: ';',
      keywords: ['constructor', 'destructor', 'procedure'],
      contains: ['title', 'params', 'comment'],
      relevance: 10
    },
    {
      className: 'title',
      begin: IDENT_RE, end: '^'
    },
    {
      className: 'params',
      begin: '\\(', end: '\\)',
      lexems: [
        IDENT_RE
      ],
      keywords: DELPHI_KEYWORDS,
      contains: ['string']
    },
    {
      className: 'class',
      begin: '=\\s*class', end: 'end;',
      lexems: [
        IDENT_RE
      ],
      keywords: DELPHI_CLASS_KEYWORDS,
      contains: ['string', 'comment', 'function']
    }
  ]
};//delphi

/*

Определение для Perl (с) Леонов Петр <gojpeg@gmail.com>
Протестировать ваш perl-код можно тут: http://wiki.cmsbuilder.ru/Highlite_test

*/

var PERL_IDENT_RE = '\\S[a-zA-Z0-9_]*';

LANGUAGES.perl = {
  defaultMode: {
    lexems: [
      IDENT_RE
    ],
    contains: ['comment', 'string', 'number', 'regexp', 'sub', 'variable'],
    keywords: ['abs', 'accept', 'alarm', 'and', 'atan2', 'bind', 'binmode', 'bless', 'caller', 'chdir', 'chmod', 'chomp', 'chop', 'chown', 'chr', 'chroot', 'close', 'closedir', 'connect', 'continue', 'cos', 'crypt', 'dbmclose', 'dbmopen', 'defined', 'delete', 'die', 'do', 'dump', 'each', 'else', 'elsif', 'endgrent', 'endhostent', 'endnetent', 'endprotoent', 'endpwent', 'endservent', 'eof', 'eval', 'exec', 'exists', 'exit', 'exp', 'fcntl', 'fileno', 'flock', 'for', 'foreach', 'fork', 'format', 'formline', 'getc', 'getgrent', 'getgrgid', 'getgrnam', 'gethostbyaddr', 'gethostbyname', 'gethostent', 'getlogin', 'getnetbyaddr', 'getnetbyname', 'getnetent', 'getpeername', 'getpgrp', 'getpriority', 'getprotobyname', 'getprotobynumber', 'getprotoent', 'getpwent', 'getpwnam', 'getpwuid', 'getservbyname', 'getservbyport', 'getservent', 'getsockname', 'getsockopt', 'glob', 'gmtime', 'goto', 'grep', 'hex', 'if', 'index', 'int', 'ioctl', 'join', 'keys', 'kill', 'last', 'last', 'lc', 'lcfirst', 'length', 'link', 'listen', 'local', 'localtime', 'log', 'lstat', 'ma', 'map', 'mkdir', 'msgctl', 'msgget', 'msgrcv', 'msgsnd', 'my', 'next', 'no', 'not', 'oct', 'open', 'opendir', 'ord', 'our', 'pack', 'package', 'pipe', 'pop', 'pos', 'print', 'printf', 'prototype', 'push', 'q', 'qq', 'quotemeta', 'qw', 'qx', 'rand', 'read', 'readdir', 'readline', 'readlink', 'readpipe', 'recv', 'redo', 'redo', 'ref', 'rename', 'require', 'reset', 'return', 'reverse', 'rewinddir', 'rindex', 'rmdir', 's', 'scalar', 'seek', 'seekdir', 'select', 'semctl', 'semget', 'semop', 'send', 'setgrent', 'sethostent', 'setnetent', 'setpgrp', 'setpriority', 'setprotoent', 'setpwent', 'setservent', 'setsockopt', 'shift', 'shmctl', 'shmget', 'shmread', 'shmwrite', 'shutdown', 'sin', 'sleep', 'socket', 'socketpair', 'sort', 'splice', 'split', 'sprintf', 'sqrt', 'srand', 'stat', 'study', 'sub', 'sub', 'substr', 'symlink', 'syscall', 'sysopen', 'sysread', 'sysseek', 'system', 'syswrite', 'tell', 'telldir', 'tie', 'tied', 'time', 'times', 'tr', 'truncate', 'uc', 'ucfirst', 'umask', 'undef', 'unless', 'unlink', 'unpack', 'unshift', 'untie', 'until', 'use', 'utime', 'values', 'vec', 'wait', 'waitpid', 'wantarray', 'warn', 'while', 'write', 'x', 'xor', 'y']
  },
  modes: [
      
    // подпрограммы
    {
      className: 'sub',
      begin: 'sub ', end: '{',
      lexems: [
        IDENT_RE
      ],
      keywords: ['sub '],
      relevance: 10
    },
    
    // переменные
    {
      className: 'variable',
      begin: '\\$\\d', end: '^'
    },
    {
      className: 'variable',
      begin: '[\\$\\%\\@]' + PERL_IDENT_RE, end: '^'
    },

    // числа и строки
    {
      className: 'number',
      begin: NUMBER_RE, end: '^',
      relevance: 0
    },
    {
      className: 'string',
      begin: 'q[qwxr]?\\(', end: '[^\\\\]\\)',
      relevance: 10
    },
    {
      className: 'string',
      begin: '\'', end: '(^|[^\\\\])\'',
      relevance: 0
    },
    {
      className: 'string',
      begin: '`', end: '(^|[^\\\\])`',
      relevance: 0
    },
    {
      className: 'string',
      begin: '"', end: '(^|[^\\\\])"',
      relevance: 0
    },
    { // конструкции типа {some_string}
      className: 'string',
      begin: '{\\w+}', end: '^',
      relevance: 0
    },
    { // конструкции типа some_string => ...
      className: 'string',
      begin: '\\w+\\s*\\=\\>', end: '^',
      relevance: 5
    },
    
    // регекспы
    {
      className: 'regexp',
      begin: '(s|tr|y)(\\/.*?[^\\\\]\\/|\\/\\/)(.*?[^\\\\]\\/|\\/)[a-z]*', end: '^',
      relevance: 10
    },
    {
      className: 'regexp',
      begin: '(m|qr)?\\/\\/[cgimosxe]*', end: '^',
      relevance: 0 // допускает пустой "//", который является комментарием в других языках
    },
    {
      className: 'regexp',
      begin: '(m|qr)?\\/.*?[^\\\\/]\\/[cgimosxe]*', end: '^',
      relevance: 10
    },

    // комментарии
    {
      className: 'comment',
      begin: '#', end: '$'
    },
    {
      className: 'comment',
      begin: '^=\\w', end: '^=cut'
    }
  ]
};//perl

/*

Определение для PHP5 (с) Виктор Карамзин <Victor.Karamzin@enterra-inc.com>

*/
PHP5_KEYWORDS = [
  '__CLASS__', '__FILE__', '__FUNCTION__', '__LINE__', '__METHOD__',
  'abstract', 'and', 'array', 'as', 'break', 'case', 'catch', 'class',
  'clone', 'const', 'continue', 'declare', 'default', 'die', 'do', 'echo',
  'else', 'elseif', 'empty', 'enddeclare', 'endfor', 'endforeach', 'endif',
  'endswitch', 'endwhile', 'eval', 'exception', 'exit', 'extends', 'final',
  'for', 'foreach', 'function', 'global', 'if', 'implements', 'include',
  'include_once', 'interface', 'isset', 'list', 'new', 'null', 'or', 'parent',
  'php_user_filter', 'print', 'private', 'protected', 'public', 'require',
  'require_once', 'return', 'self', 'static', 'switch', 'this', 'throw',
  'try', 'unset', 'use', 'var', 'while', 'xor'
];

PHP_IDENTIFIER_RE = '[a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff]*';

LANGUAGES.php = {
  defaultMode: {
    lexems: [IDENT_RE],
    contains: ['comment', 'number', 'string', 'variable'],
    keywords: PHP5_KEYWORDS
  },
  case_insensitive: true,
  modes: [
    {
      className: 'comment',
      begin: '//', end: '$',
      relevance: 0
    },
    {
      className: 'comment',
      begin: '#', end: '$'
    },
    {
      className: 'comment',
      begin: '/\\*', end: '\\*/',
      contains: ['phpdoc']
    },
    {
      className: 'phpdoc',
      begin: '\\s@[A-Za-z]+', end: '^',
      relevance: 10
    },
    {
      className: 'number',
      begin: C_NUMBER_RE, end: '^',
      relevance: 0
    },
    {
      className: 'string',
      begin: '\\\'', end: '[^\\\\]?\\\'',
      relevance: 0
    },
    {
      className: 'string',
      begin: '"', end: '[^\\\\]?"',
      relevance: 0
    },
    {
      className: 'variable',
      begin: '\\$' + PHP_IDENTIFIER_RE, end: '^'
    },
    ]
};//php


/*

Определение для Java (с) Всеволод Соловьёв <vsevolod.solovyov@gmail.com>

*/
LANGUAGES.java  = {
  defaultMode: {
    lexems: [
      IDENT_RE
    ],
    contains: ['comment', 'string', 'class', 'number', 'javadoc', 'annotation'],
    keywords: ['abstract', 'assert', 'boolean', 'break', 'byte', 'case', 'catch', 'char', 'class', 'const', 'continue', 'default', 'double', 'else', 'enum', 'extends', 'false', 'final', 'finally', 'float', 'for', 'if', 'implements', 'import', 'instanceof', 'interface', 'int', 'long', 'native', 'new', 'null', 'package', 'private', 'protected', 'public', 'return', 'short', 'static', 'strictfp', 'super', 'switch', 'synchronized', 'this', 'throw', 'throws', 'transient', 'true', 'try', 'void', 'volatile', 'while']
  },
  modes: [
    {
      className: 'class',
      lexems: [
        IDENT_RE
      ],
      begin: '(class |interface )', end: '{', 
      illegal: ':',
      keywords: ['class ', 'interface '],
      contains: ['inheritance', 'title']
    },
    {
      className: 'inheritance',
      begin: '(implements|extends)', end: '^',
      keywords: ['extends', 'implements'],
      relevance: 10
    },
    {
      className: 'title',
      begin: IDENT_RE, end: '^'
    },
    {
      className: 'params',
      begin: '\\(', end: '\\)',
      contains: ['string', 'annotation']
    },
    {
      className: 'number',
      begin: C_NUMBER_RE, end: '^',
      relevance: 0
    },
    {
      className: 'string',
      begin: '\'', end: '(^|[^\\\\])\'',
      relevance: 0
    },
    {
      className: 'string',
      begin: '"', end: '(^|[^\\\\])"',
      relevance: 0
    },
    {
      className: 'comment',
      begin: '//', end: '$',
      relevance: 0
    },
    {
      className: 'javadoc',
      begin: '/\\*\\*', end: '\\*/',
      relevance: 10
    },
    {
      className: 'comment',
      begin: '\\/\\*', end: '\\*/'
    },
    {
      className: 'annotation',
      begin: '@[A-Za-z]+', end: '^'
    }
  ]
};//java

LANGUAGES.cpp = {
  defaultMode: {
    lexems: [
      IDENT_RE
    ],
    contains: ['comment', 'string', 'number', 'preprocessor'],
    keywords: ['asm', 'auto', 'bool', 'break', 'case', 'catch', 'char', 'class', 'const', 'const_cast', 'continue', 'default', 'delete', 'do', 'double', 'dynamic_cast', 'else', 'enum', 'explicit', 'export', 'extern', 'false', 'float', 'for', 'friend', 'goto', 'if', 'inline', 'int', 'long', 'mutable', 'namespace', 'new', 'operator', 'private', 'protected', 'public', 'register', 'reinterpret_cast', 'return', 'short', 'signed', 'sizeof', 'static', 'static_cast', 'struct', 'switch', 'template', 'this', 'throw', 'true', 'try', 'typedef', 'typeid', 'typename', 'union', 'unsigned', 'using', 'virtual', 'void', 'volatile', 'wchar_t', 'while']
  },
  modes: [
    {
      className: 'comment',
      begin: '//', end: '$',
      relevance: 0
    },
    {
      className: 'comment',
      begin: '/\\*', end: '\\*/'
    },
    {
      className: 'number',
      begin: C_NUMBER_RE, end: '^',
      relevance: 0
    },
    {
      className: 'string',
      begin: '"', end: '(^|[^\\\\])"',
      relevance: 0
    },
    {
      className: 'string',
      begin: '\'', end: '[^\\\\]\'',
      illegal: '[^\\\\][^\']'
    },
    {
      className: 'preprocessor',
      begin: '#', end: '$'
    }
  ]
};//cpp

function langRe(language, value) {
  return new RegExp(value, language.case_insensitive ? 'mi' : 'm');
}//re

for (var i in LANGUAGES) {
  var language = LANGUAGES[i];
  for (var key in language.modes) {
    if (language.modes[key].begin)
      language.modes[key].beginRe = langRe(language, language.modes[key].begin);
    if (language.modes[key].end)
      language.modes[key].endRe = langRe(language, language.modes[key].end);
    if (language.modes[key].illegal)
      language.modes[key].illegalRe = langRe(language, '^(?:' + language.modes[key].illegal + ')');
    language.defaultMode.illegalRe = langRe(language, '^(?:' + language.defaultMode.illegal + ')');
  }//for
}//for

var selected_languages = {};

function Highlighter(language_name, value) {
  this.currentMode = function(){
    return this.modes[this.modes.length - 1];
  }//currentMode
  
  this.highlight = function(value) {
    var index = 0;
    for (var lexem = this.getLexem(value, index); index < value.length; lexem = this.getLexem(value, index)) {
      this.processLexem(lexem);
      index += lexem.length;
    }//for
    if(this.modes.length > 1)
      throw 'Illegal';
  }//highlight
  
  this.processLexem = function(lexem) {
    if (this.isIllegal(lexem))
      throw 'Illegal';
    var new_mode = this.subMode(lexem)
    if (new_mode) {
      this.modes[this.modes.length] = new_mode;
      if (new_mode.excludeBegin)
        this.result += this.keyword(lexem) + '<span class="' + new_mode.className + '">';
      else
        this.result += '<span class="' + new_mode.className + '">' + this.keyword(lexem);
      this.relevance += this.currentMode().relevance != undefined ? this.currentMode().relevance : 1;
      return;
    }//if
    var end_level = this.endOfMode(this.modes.length - 1, lexem);
    if (end_level) {
      while (end_level > 1) {
        this.result += '</span>';
        end_level--;
        this.modes.length--;
      }//while
      if (this.currentMode().excludeEnd)
        this.result += '</span>' + this.keyword(lexem);
      else
        this.result += this.keyword(lexem) + '</span>';
      this.modes.length--;
      return;
    }//if
    this.result += this.keyword(lexem);
  }//processLexem

  this.keyword = function(lexem) {
    var html = lexem.replace(/&/gm, '&amp;').replace(/"/gm, '&quot;').replace(/</gm, '&lt;').replace(/>/gm, '&gt;');
    if (this.language.case_insensitive)
      lexem = lexem.toLowerCase();
    if (bcontains(this.currentMode().keywords, lexem)) {
      this.keyword_count++;
      return '<span class="keyword">' + html + '</span>';
    } else {
      return html;
    }//if
  }//keyword

  this.subMode = function(lexem) {
    if (!this.currentMode().contains)
      return null;
    for (var key in this.language.modes)
      if (contains(this.currentMode().contains, this.language.modes[key].className) && this.language.modes[key].beginRe.test(lexem))
        return this.language.modes[key];
    return null;
  }//subMode

  this.endOfMode = function(mode_index, lexem) {
    if (this.modes[mode_index].end && this.modes[mode_index].endRe.test(lexem))
      return 1;
    if (this.modes[mode_index].endsWithParent) {
      var level = this.endOfMode(mode_index - 1, lexem);
      return level ? level + 1 : 0;
    }//if
    return 0;
  }//endOfMode
  
  this.isIllegal = function(lexem) {
    if (!this.currentMode().illegalRe)
      return false;
    return this.currentMode().illegalRe.test(lexem);
  }//isIllegal

  this.getLexem = function(value, index) {
    if (!this.currentMode().terminators) {
      var terminators = [];
      
      if (this.currentMode().contains)
        for (var key in this.language.modes) {
          if (contains(this.currentMode().contains, this.language.modes[key].className) &&
              !contains(terminators, this.language.modes[key].begin))
            terminators[terminators.length] = this.language.modes[key].begin;
        }//for
      
      var mode_index = this.modes.length - 1;
      do {
        if (this.modes[mode_index].end && !contains(terminators, this.modes[mode_index].end))
          terminators[terminators.length] = this.modes[mode_index].end;
        mode_index--;
      } while (this.modes[mode_index + 1].endsWithParent);
      
      if (this.currentMode().illegal)
        if (!contains(terminators, this.currentMode().illegal))
          terminators[terminators.length] = this.currentMode().illegal;
      
      if (this.currentMode().lexems)
        for (var key in this.currentMode().lexems)
          if (!contains(terminators, this.currentMode().lexems[key]))
            terminators[terminators.length] = this.currentMode().lexems[key];
      var terminator_re = '(' + terminators[0];
      for (var i = 0; i < terminators.length; i++)
        terminator_re += '|' + terminators[i];
      terminator_re += ')';
      this.currentMode().terminators = langRe(this.language, terminator_re);
    }//if
    value = value.substr(index);
    var match = this.currentMode().terminators.exec(value);
    if (!match) 
      return value;
    if (match.index == 0)
      return match[0];
    else
      return value.substr(0, match.index);
  }//getLexem
  
  this.language_name = language_name;
  this.language = LANGUAGES[language_name];
  this.modes = [this.language.defaultMode];
  this.relevance = 0;
  this.keyword_count = 0;
  this.result = '';
  try {
    this.highlight(value);
  } catch (e) {
    if (e == 'Illegal') {
      this.relevance = 0;
      this.keyword_count = 0;
      this.result = value;
    } else {
      throw e;
    }//if
  }//try
}//Highlighter

function contains(array, item) {
  if (!array)
    return false;
  for (var key in array)
    if (array[key] == item)
      return true;
  return false;
}//contains

function bcontains(array, item) {
  if (!array || !array.length)
    return false;
  var left = -1;
  var right = array.length;
  var current = parseInt((right + left) / 2);
  while ((right - left > 1) && item != array[current]) {
    if (item < array[current])
      right = current;
    else
      left = current;
    current = parseInt((right + left) / 2);
  }//while
  return item == array[current];
}//bcontains

function initHighlighting() {
  if (arguments.length) {
    for (var i = 0; i < arguments.length; i++) {
      if (LANGUAGES[arguments[i]]) {
        selected_languages[arguments[i]] = LANGUAGES[arguments[i]];
      }//if
    }//for
  } else
    selected_languages = LANGUAGES;
  var pres = document.getElementsByTagName('pre');
  for (var i = 0; i < pres.length; i++) {
    if (pres[i].firstChild && pres[i].firstChild.nodeName == 'CODE')
      initHighlight(pres[i].firstChild);
  }//for
}//initHighlighting

function blockText(block) {
  var result = '';
  for (var i = 0; i < block.childNodes.length; i++)
    if (block.childNodes[i].nodeType == 3)
      result += block.childNodes[i].nodeValue;
    else if (block.childNodes[i].nodeName == 'BR')
      result += '\n';
    else
      throw 'Complex markup';
  return result;
}//blockText

function initHighlight(block) {
  if (block.className.search(/\bno\-highlight\b/) != -1)
    return;
  try {
    blockText(block);
  } catch (e) {
    if (e == 'Complex markup')
      return;
  }//try
  var classes = block.className.split(/\s+/);
  for (var i = 0; i < classes.length; i++) {
    if (LANGUAGES[classes[i]]) {
      highlightLanguage(block, classes[i]);
      return;
    }//if
  }//for
  highlightAuto(block);
}//initHighlight

function highlightLanguage(block, language) {
  var highlight = new Highlighter(language, blockText(block));
  // See these 4 lines? This is IE's notion of "block.innerHTML = result". Love this browser :-/
  var container = document.createElement('div');
  container.innerHTML = '<pre><code class="' + block.className + '">' + highlight.result + '</code></pre>';
  var environment = block.parentNode.parentNode;
  environment.replaceChild(container.firstChild, block.parentNode);
}//highlightLanguage
    
function highlightAuto(block) {
  var result = null;
  var language = '';
  var max_relevance = 2;
  var relevance = 0;
  var block_text = blockText(block);
  for (var key in selected_languages) {
    var highlight = new Highlighter(key, block_text);
    relevance = highlight.keyword_count + highlight.relevance;
    if (highlight.keyword_count && relevance > max_relevance) {
      max_relevance = relevance;
      result = highlight;
    }//if
  }//for
  
  if(result) {
    // See these 4 lines? This is IE's notion of "block.innerHTML = result". Love this browser :-/
    var container = document.createElement('div');
    container.innerHTML = '<pre><code class="' + result.language_name + '">' + result.result + '</code></pre>';
    var environment = block.parentNode.parentNode;
    environment.replaceChild(container.firstChild, block.parentNode);
  }//if
}//highlightAuto