LANGUAGES.python = {
  defaultMode: {
    lexems: [UNDERSCORE_IDENT_RE],
    illegal: '(</|->)',
    contains: ['comment', 'string', 'function', 'class', 'number', 'decorator'],
    keywords: {'and': 1, 'elif': 1, 'is': 1, 'global': 1, 'as': 1, 'in': 1, 'if': 1, 'from': 1, 'raise': 1, 'for': 1, 'except': 1, 'finally': 1, 'print': 1, 'import': 1, 'pass': 1, 'None': 1, 'return': 1, 'exec': 1, 'else': 1, 'break': 1, 'not': 1, 'with': 1, 'class': 1, 'assert': 1, 'yield': 1, 'try': 1, 'while': 1, 'continue': 1, 'del': 1, 'or': 1, 'def': 1, 'lambda': 1}
  },
  modes: [
    {
      className: 'function',
      lexems: [UNDERSCORE_IDENT_RE],
      begin: '\\bdef ', end: ':',
      illegal: '$',
      keywords: {'def': 1},
      contains: ['title', 'params'],
      relevance: 10
    },
    {
      className: 'class',
      lexems: [UNDERSCORE_IDENT_RE],
      begin: '\\bclass ', end: ':',
      illegal: '[${]',
      keywords: {'class': 1},
      contains: ['title', 'params',],
      relevance: 10
    },
    {
      className: 'title',
      begin: UNDERSCORE_IDENT_RE, end: '^'
    },
    {
      className: 'params',
      begin: '\\(', end: '\\)',
      contains: ['string']
    },
    HASH_COMMENT_MODE,
    C_NUMBER_MODE,
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
    APOS_STRING_MODE,
    QUOTE_STRING_MODE,
    BACKSLASH_ESCAPE,
    {
      className: 'string',
      begin: 'r\'', end: '\'',
      relevance: 10
    },
    {
      className: 'string',
      begin: 'r"', end: '"',
      relevance: 10
    },
    {
      className: 'string',
      begin: 'u\'', end: '(^|[^\\\\])\'',
      relevance: 10
    },
    {
      className: 'string',
      begin: 'u"', end: '(^|[^\\\\])"',
      relevance: 10
    },
    {
      className: 'string',
      begin: 'ur\'', end: '\'',
      relevance: 10
    },
    {
      className: 'string',
      begin: 'ur"', end: '"',
      relevance: 10
    },
    {
      className: 'decorator',
      begin: '@', end: '$'
    }
  ]
};//python


/*

Perl definition (с) Peter Leonov <gojpeg@gmail.com>
Test you perl code here: http://wiki.cmsbuilder.ru/Highlite_test

*/

var PERL_NUMBER_RE = '(\\b0[0-7]+)|(\\b0x[0-9a-fA-F]+)|(\\b[1-9]\\d*(\\.\\d+)?)|0\\b';
var PERL_KEYWORDS = {'getpwent': 1, 'getservent': 1, 'quotemeta': 1, 'msgrcv': 1, 'scalar': 1, 'kill': 1, 'dbmclose': 1, 'undef': 1, 'lc': 1, 'ma': 1, 'syswrite': 1, 'tr': 1, 'send': 1, 'umask': 1, 'sysopen': 1, 'shmwrite': 1, 'vec': 1, 'qx': 1, 'utime': 1, 'local': 1, 'oct': 1, 'semctl': 1, 'localtime': 1, 'readpipe': 1, 'do': 1, 'return': 1, 'format': 1, 'read': 1, 'sprintf': 1, 'dbmopen': 1, 'pop': 1, 'getpgrp': 1, 'not': 1, 'getpwnam': 1, 'rewinddir': 1, 'qq': 1, 'fileno': 1, 'qw': 1, 'endprotoent': 1, 'wait': 1, 'sethostent': 1, 'bless': 1, 's': 1, 'opendir': 1, 'continue': 1, 'each': 1, 'sleep': 1, 'endgrent': 1, 'shutdown': 1, 'dump': 1, 'chomp': 1, 'connect': 1, 'getsockname': 1, 'die': 1, 'socketpair': 1, 'close': 1, 'flock': 1, 'exists': 1, 'index': 1, 'shmget': 1, 'sub': 1, 'for': 1, 'endpwent': 1, 'redo': 1, 'lstat': 1, 'msgctl': 1, 'setpgrp': 1, 'abs': 1, 'exit': 1, 'select': 1, 'print': 1, 'ref': 1, 'gethostbyaddr': 1, 'unshift': 1, 'fcntl': 1, 'syscall': 1, 'goto': 1, 'getnetbyaddr': 1, 'join': 1, 'gmtime': 1, 'symlink': 1, 'semget': 1, 'splice': 1, 'x': 1, 'getpeername': 1, 'recv': 1, 'log': 1, 'setsockopt': 1, 'cos': 1, 'last': 1, 'reverse': 1, 'gethostbyname': 1, 'getgrnam': 1, 'study': 1, 'formline': 1, 'endhostent': 1, 'times': 1, 'chop': 1, 'length': 1, 'gethostent': 1, 'getnetent': 1, 'pack': 1, 'getprotoent': 1, 'getservbyname': 1, 'rand': 1, 'mkdir': 1, 'pos': 1, 'chmod': 1, 'y': 1, 'substr': 1, 'endnetent': 1, 'printf': 1, 'next': 1, 'open': 1, 'msgsnd': 1, 'readdir': 1, 'use': 1, 'unlink': 1, 'getsockopt': 1, 'getpriority': 1, 'rindex': 1, 'wantarray': 1, 'hex': 1, 'system': 1, 'getservbyport': 1, 'endservent': 1, 'int': 1, 'chr': 1, 'untie': 1, 'rmdir': 1, 'prototype': 1, 'tell': 1, 'listen': 1, 'fork': 1, 'shmread': 1, 'ucfirst': 1, 'setprotoent': 1, 'else': 1, 'sysseek': 1, 'link': 1, 'getgrgid': 1, 'shmctl': 1, 'waitpid': 1, 'unpack': 1, 'getnetbyname': 1, 'reset': 1, 'chdir': 1, 'grep': 1, 'split': 1, 'require': 1, 'caller': 1, 'lcfirst': 1, 'until': 1, 'warn': 1, 'while': 1, 'values': 1, 'shift': 1, 'telldir': 1, 'getpwuid': 1, 'my': 1, 'getprotobynumber': 1, 'delete': 1, 'and': 1, 'sort': 1, 'uc': 1, 'defined': 1, 'srand': 1, 'accept': 1, 'package': 1, 'seekdir': 1, 'getprotobyname': 1, 'semop': 1, 'our': 1, 'rename': 1, 'seek': 1, 'if': 1, 'q': 1, 'chroot': 1, 'sysread': 1, 'setpwent': 1, 'no': 1, 'crypt': 1, 'getc': 1, 'chown': 1, 'sqrt': 1, 'write': 1, 'setnetent': 1, 'setpriority': 1, 'foreach': 1, 'tie': 1, 'sin': 1, 'msgget': 1, 'map': 1, 'stat': 1, 'getlogin': 1, 'unless': 1, 'elsif': 1, 'truncate': 1, 'exec': 1, 'keys': 1, 'glob': 1, 'tied': 1, 'closedir': 1, 'ioctl': 1, 'socket': 1, 'readlink': 1, 'eval': 1, 'xor': 1, 'readline': 1, 'binmode': 1, 'setservent': 1, 'eof': 1, 'ord': 1, 'bind': 1, 'alarm': 1, 'pipe': 1, 'atan2': 1, 'getgrent': 1, 'exp': 1, 'time': 1, 'push': 1, 'setgrent': 1, 'gt': 1, 'lt': 1, 'or': 1, 'ne': 1, 'm': 1};

LANGUAGES.perl = {
  defaultMode: {
    lexems: [IDENT_RE],
    contains: ['comment', 'string', 'number', 'regexp', 'sub', 'variable', 'operator', 'pod', 'identifier'],
    keywords: PERL_KEYWORDS
  },
  modes: [

    // variables
    {
      className: 'variable',
      begin: '\\$\\d', end: '^',
      relevance: 5
    },
    {
      className: 'variable',
      begin: '[\\$\\%\\@\\*](\\^\\w\\b|#\\w+|[^\\s\\w{]|{\\w+}|\\w+)', end: '^'
    },

    // numbers and strings
    {
      className: 'number',
      begin: PERL_NUMBER_RE, end: '^',
      relevance: 0
    },
    {
      className: 'string',
      begin: 'q[qwxr]?\\(', end: '[^\\\\]\\)',
      relevance: 10
    },
    {
      className: 'string',
      begin: 'qw\\s+q', end: 'q',
      relevance: 10
    },
    APOS_STRING_MODE,
    QUOTE_STRING_MODE,
    BACKSLASH_ESCAPE,
    {
      className: 'string',
      begin: '`', end: '`',
      contains: ['escape']
    },
    
    // regexps
    {
      className: 'regexp',
      begin: '(s|tr|y)(/.*?[^\\\\]/|//)(.*?[^\\\\]/|/)[a-z]*', end: '^',
      relevance: 10
    },
    {
      className: 'regexp',
      begin: '(m|qr)?//[cgimosxe]*', end: '^',
      relevance: 0 // allows empty "//" which is a common comment delimiter in other languages
    },
    {
      className: 'regexp',
      begin: '(m|qr)?/.*?[^\\\\/]/[cgimosxe]*', end: '^'
    },

    // bareword context
    {
      className: 'string',
      begin: '{\\w+}', end: '^',
      relevance: 0
    },
    {
      className: 'string',
      begin: '\-?\\w+\\s*\\=\\>', end: '^',
      relevance: 5
    },

    // subroutines
    {
      className: 'sub',
      begin: '\\bsub\\b', end: '(\\s*\\(.*?\\))?[;{]',
      lexems: [IDENT_RE],
      keywords: {'sub':1},
      contains: ['identifier'],
      relevance: 10
    },

    // operators
    {
      className: 'operator',
      begin: '-\\w\\b', end: '^'
    },

    // comments
    HASH_COMMENT_MODE,
    
    // pod
    {
      className: 'pod',
      begin: '\\=\\w', end: '\\=cut'
    },

    // identifiers
    {
      className: 'identifier',
      begin: '\\b[a-zA-Z]\\w*\\b', end: '^',
      lexems: [IDENT_RE],
      keywords: PERL_KEYWORDS,
      relevance: 0
    }
  ]
};//perl


/*

PHP5 definition (с) Victor Karamzin <Victor.Karamzin@enterra-inc.com>

*/
PHP5_KEYWORDS = {'and': 1, 'include_once': 1, 'list': 1, 'abstract': 1, 'global': 1, 'private': 1, 'echo': 1, 'interface': 1, 'as': 1, 'static': 1, 'endswitch': 1, 'array': 1, 'null': 1, 'if': 1, 'endwhile': 1, 'or': 1, 'const': 1, 'for': 1, 'endforeach': 1, 'self': 1, 'var': 1, 'while': 1, 'isset': 1, 'public': 1, 'protected': 1, 'exit': 1, 'foreach': 1, 'throw': 1, 'elseif': 1, 'extends': 1, 'include': 1, '__FILE__': 1, 'empty': 1, 'require_once': 1, 'function': 1, 'do': 1, 'xor': 1, 'return': 1, 'implements': 1, 'parent': 1, 'clone': 1, 'use': 1, '__CLASS__': 1, '__LINE__': 1, 'else': 1, 'break': 1, 'print': 1, 'eval': 1, 'new': 1, 'catch': 1, '__METHOD__': 1, 'class': 1, 'case': 1, 'exception': 1, 'php_user_filter': 1, 'default': 1, 'die': 1, 'require': 1, '__FUNCTION__': 1, 'enddeclare': 1, 'final': 1, 'try': 1, 'this': 1, 'switch': 1, 'continue': 1, 'endfor': 1, 'endif': 1, 'declare': 1, 'unset': 1};

PHP_IDENTIFIER_RE = '[a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff]*';

LANGUAGES.php = {
  defaultMode: {
    lexems: [IDENT_RE],
    contains: ['comment', 'number', 'string', 'variable'],
    keywords: PHP5_KEYWORDS
  },
  case_insensitive: true,
  modes: [
    C_LINE_COMMENT_MODE,
    HASH_COMMENT_MODE,
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
    C_NUMBER_MODE,
    APOS_STRING_MODE,
    QUOTE_STRING_MODE,
    BACKSLASH_ESCAPE,
    {
      className: 'variable',
      begin: '\\$' + PHP_IDENTIFIER_RE, end: '^'
    },
    ]
};//php


/*

Ruby definition (с) Anton Kovalyov <anton@kovalyov.net>

*/
LANGUAGES.ruby = {
  defaultMode: {
    lexems: [UNDERSCORE_IDENT_RE],
    contains: ['comment', 'string', 'class', 'function', 'symbol', 'instancevar'],
    keywords: {'and': 1, 'false': 1, 'then': 1, 'defined': 1, 'module': 1, 'in': 1, 'return': 1, 'redo': 1, 'if': 1, 'BEGIN': 1, 'retry': 1, 'end': 1, 'for': 1, 'true': 1, 'self': 1, 'when': 1, 'next': 1, 'until': 1, 'do': 1, 'begin': 1, 'unless': 1, 'END': 1, 'rescue': 1, 'nil': 1, 'else': 1, 'break': 1, 'undef': 1, 'not': 1, 'super': 1, 'class': 1, 'case': 1, 'require': 1, 'yield': 1, 'alias': 1, 'while': 1, 'ensure': 1, 'elsif': 1, 'or': 1, 'def': 1}
  },
  modes: [
    HASH_COMMENT_MODE,
    {
      className: 'comment',
      begin: '^\\=begin', end: '^\\=end',
      relevance: 10
    },
    {
      className: 'string',
      begin: '\'', end: '(^|[^\\\\])\'',
      contains: ['subst'],
      relevance: 0
    },
    {
      className: 'string',
      begin: '"', end: '(^|[^\\\\])"',
      contains: ['subst'],
      relevance: 0
    },
    {
      className: 'subst',
      begin: '#\\{', end: '\}',
      contains: ['string', 'symbol', 'instancevar'],
      relevance: 10
    },
    {
      className: 'function',
      lexems: [IDENT_RE],
      begin: '\\bdef ', end: '$',
      illegal: '[{\\:]',
      keywords: {'def': 1},
      contains: ['title', 'comment'],
      relevance: 10
    },    
    { 
      className: 'class',
      lexems: [IDENT_RE],
      begin: '\\bclass ', end: '$',
      illegal: '[{\\:]',
      contains: ['title', 'inheritance', 'comment'],      
      keywords: {'class': 1}
    },
    {
      className: 'title',
      begin: 'self.' + IDENT_RE, end: '^'
    },
    {
      className: 'title',
      begin: IDENT_RE, end: '^'
    },
    {
      className: 'inheritance',
      begin: '<\\s*', end: '^',
      contains: ['parent']
    },
    {
      className: 'parent',
      begin: '(' + IDENT_RE + '::)?' + IDENT_RE, end: '^'
    },
    {
      className: 'symbol',
      begin: ':' + UNDERSCORE_IDENT_RE, end: '^'
    },
    {
      className: 'instancevar',
      begin: '\\@' + UNDERSCORE_IDENT_RE, end: '^'
    }
  ]
};//ruby