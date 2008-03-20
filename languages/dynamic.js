hljs.LANGUAGES.python = {
  defaultMode: {
    lexems: [hljs.UNDERSCORE_IDENT_RE],
    illegal: '(</|->)',
    contains: ['comment', 'string', 'function', 'class', 'number', 'decorator'],
    keywords: {'and': 1, 'elif': 1, 'is': 1, 'global': 1, 'as': 1, 'in': 1, 'if': 1, 'from': 1, 'raise': 1, 'for': 1, 'except': 1, 'finally': 1, 'print': 1, 'import': 1, 'pass': 1, 'None': 1, 'return': 1, 'exec': 1, 'else': 1, 'break': 1, 'not': 1, 'with': 1, 'class': 1, 'assert': 1, 'yield': 1, 'try': 1, 'while': 1, 'continue': 1, 'del': 1, 'or': 1, 'def': 1, 'lambda': 1}
  },
  modes: [
    {
      className: 'function',
      lexems: [hljs.UNDERSCORE_IDENT_RE],
      begin: '\\bdef ', end: ':',
      illegal: '$',
      keywords: {'def': 1},
      contains: ['title', 'params'],
      relevance: 10
    },
    {
      className: 'class',
      lexems: [hljs.UNDERSCORE_IDENT_RE],
      begin: '\\bclass ', end: ':',
      illegal: '[${]',
      keywords: {'class': 1},
      contains: ['title', 'params',],
      relevance: 10
    },
    {
      className: 'title',
      begin: hljs.UNDERSCORE_IDENT_RE, end: '^'
    },
    {
      className: 'params',
      begin: '\\(', end: '\\)',
      contains: ['string']
    },
    hljs.HASH_COMMENT_MODE,
    hljs.C_NUMBER_MODE,
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
    hljs.APOS_STRING_MODE,
    hljs.QUOTE_STRING_MODE,
    hljs.BACKSLASH_ESCAPE,
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

Perl definition (с) Peter Leonov <gojpeg@yandex.ru>

*/
hljs.PERL_DEFAULT_CONTAINS = ['comment', 'string', 'number', 'regexp', 'sub', 'variable', 'operator', 'pod'];
hljs.PERL_KEYWORDS = {'getpwent': 1, 'getservent': 1, 'quotemeta': 1, 'msgrcv': 1, 'scalar': 1, 'kill': 1, 'dbmclose': 1, 'undef': 1, 'lc': 1, 'ma': 1, 'syswrite': 1, 'tr': 1, 'send': 1, 'umask': 1, 'sysopen': 1, 'shmwrite': 1, 'vec': 1, 'qx': 1, 'utime': 1, 'local': 1, 'oct': 1, 'semctl': 1, 'localtime': 1, 'readpipe': 1, 'do': 1, 'return': 1, 'format': 1, 'read': 1, 'sprintf': 1, 'dbmopen': 1, 'pop': 1, 'getpgrp': 1, 'not': 1, 'getpwnam': 1, 'rewinddir': 1, 'qq': 1, 'fileno': 1, 'qw': 1, 'endprotoent': 1, 'wait': 1, 'sethostent': 1, 'bless': 1, 's': 1, 'opendir': 1, 'continue': 1, 'each': 1, 'sleep': 1, 'endgrent': 1, 'shutdown': 1, 'dump': 1, 'chomp': 1, 'connect': 1, 'getsockname': 1, 'die': 1, 'socketpair': 1, 'close': 1, 'flock': 1, 'exists': 1, 'index': 1, 'shmget': 1, 'sub': 1, 'for': 1, 'endpwent': 1, 'redo': 1, 'lstat': 1, 'msgctl': 1, 'setpgrp': 1, 'abs': 1, 'exit': 1, 'select': 1, 'print': 1, 'ref': 1, 'gethostbyaddr': 1, 'unshift': 1, 'fcntl': 1, 'syscall': 1, 'goto': 1, 'getnetbyaddr': 1, 'join': 1, 'gmtime': 1, 'symlink': 1, 'semget': 1, 'splice': 1, 'x': 1, 'getpeername': 1, 'recv': 1, 'log': 1, 'setsockopt': 1, 'cos': 1, 'last': 1, 'reverse': 1, 'gethostbyname': 1, 'getgrnam': 1, 'study': 1, 'formline': 1, 'endhostent': 1, 'times': 1, 'chop': 1, 'length': 1, 'gethostent': 1, 'getnetent': 1, 'pack': 1, 'getprotoent': 1, 'getservbyname': 1, 'rand': 1, 'mkdir': 1, 'pos': 1, 'chmod': 1, 'y': 1, 'substr': 1, 'endnetent': 1, 'printf': 1, 'next': 1, 'open': 1, 'msgsnd': 1, 'readdir': 1, 'use': 1, 'unlink': 1, 'getsockopt': 1, 'getpriority': 1, 'rindex': 1, 'wantarray': 1, 'hex': 1, 'system': 1, 'getservbyport': 1, 'endservent': 1, 'int': 1, 'chr': 1, 'untie': 1, 'rmdir': 1, 'prototype': 1, 'tell': 1, 'listen': 1, 'fork': 1, 'shmread': 1, 'ucfirst': 1, 'setprotoent': 1, 'else': 1, 'sysseek': 1, 'link': 1, 'getgrgid': 1, 'shmctl': 1, 'waitpid': 1, 'unpack': 1, 'getnetbyname': 1, 'reset': 1, 'chdir': 1, 'grep': 1, 'split': 1, 'require': 1, 'caller': 1, 'lcfirst': 1, 'until': 1, 'warn': 1, 'while': 1, 'values': 1, 'shift': 1, 'telldir': 1, 'getpwuid': 1, 'my': 1, 'getprotobynumber': 1, 'delete': 1, 'and': 1, 'sort': 1, 'uc': 1, 'defined': 1, 'srand': 1, 'accept': 1, 'package': 1, 'seekdir': 1, 'getprotobyname': 1, 'semop': 1, 'our': 1, 'rename': 1, 'seek': 1, 'if': 1, 'q': 1, 'chroot': 1, 'sysread': 1, 'setpwent': 1, 'no': 1, 'crypt': 1, 'getc': 1, 'chown': 1, 'sqrt': 1, 'write': 1, 'setnetent': 1, 'setpriority': 1, 'foreach': 1, 'tie': 1, 'sin': 1, 'msgget': 1, 'map': 1, 'stat': 1, 'getlogin': 1, 'unless': 1, 'elsif': 1, 'truncate': 1, 'exec': 1, 'keys': 1, 'glob': 1, 'tied': 1, 'closedir': 1, 'ioctl': 1, 'socket': 1, 'readlink': 1, 'eval': 1, 'xor': 1, 'readline': 1, 'binmode': 1, 'setservent': 1, 'eof': 1, 'ord': 1, 'bind': 1, 'alarm': 1, 'pipe': 1, 'atan2': 1, 'getgrent': 1, 'exp': 1, 'time': 1, 'push': 1, 'setgrent': 1, 'gt': 1, 'lt': 1, 'or': 1, 'ne': 1, 'm': 1};

hljs.LANGUAGES.perl = {
  defaultMode: {
    lexems: [hljs.IDENT_RE],
    contains: hljs.PERL_DEFAULT_CONTAINS,
    keywords: hljs.PERL_KEYWORDS
  },
  modes: [

    // variables
    {
      className: 'variable',
      begin: '\\$\\d', end: '^'
    },
    {
      className: 'variable',
      begin: '[\\$\\%\\@\\*](\\^\\w\\b|#\\w+(\\:\\:\\w+)*|[^\\s\\w{]|{\\w+}|\\w+(\\:\\:\\w*)*)', end: '^'
    },

    // numbers and strings
    {
      className: 'subst',
      begin: '[$@]\\{', end: '\}',
      lexems: [hljs.IDENT_RE],
      keywords: hljs.PERL_KEYWORDS,
      contains: hljs.PERL_DEFAULT_CONTAINS,
      relevance: 10
    },
    {
      className: 'number',
      begin: '(\\b0[0-7_]+)|(\\b0x[0-9a-fA-F_]+)|(\\b[1-9][0-9_]*(\\.[0-9_]+)?)|[0_]\\b', end: '^',
      relevance: 0
    },
    {
      className: 'string',
      begin: 'q[qwxr]?\\s*\\(', end: '\\)',
      contains: ['escape', 'subst', 'variable'],
      relevance: 5
    },
    {
      className: 'string',
      begin: 'q[qwxr]?\\s*\\[', end: '\\]',
      contains: ['escape', 'subst', 'variable'],
      relevance: 5
    },
    {
      className: 'string',
      begin: 'q[qwxr]?\\s*\\{', end: '\\}',
      contains: ['escape', 'subst', 'variable'],
      relevance: 5
    },
    {
      className: 'string',
      begin: 'q[qwxr]?\\s*\\|', end: '\\|',
      contains: ['escape', 'subst', 'variable'],
      relevance: 5
    },
    {
      className: 'string',
      begin: 'q[qwxr]?\\s*\\<', end: '\\>',
      contains: ['escape', 'subst', 'variable'],
      relevance: 5
    },
    {
      className: 'string',
      begin: 'qw\\s+q', end: 'q',
      contains: ['escape', 'subst', 'variable'],
      relevance: 5
    },
    {
      className: 'string',
      begin: '\'', end: '\'',
      contains: ['escape'],
      relevance: 0
    },
    {
      className: 'string',
      begin: '"', end: '"',
      contains: ['escape','subst','variable'],
      relevance: 0
    },
    hljs.BACKSLASH_ESCAPE,
    {
      className: 'string',
      begin: '`', end: '`',
      contains: ['escape']
    },
    
    // regexps
    {
      className: 'regexp',
      begin: '(s|tr|y)/(\\\\.|[^/])*/(\\\\.|[^/])*/[a-z]*', end: '^',
      relevance: 10
    },
    {
      className: 'regexp',
      begin: '(m|qr)?/', end: '/[a-z]*',
      contains: ['escape'],
      relevance: 0 // allows empty "//" which is a common comment delimiter in other languages
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
      relevance: 0
    },

    // subroutines
    {
      className: 'sub',
      begin: '\\bsub\\b', end: '(\\s*\\(.*?\\))?[;{]',
      lexems: [hljs.IDENT_RE],
      keywords: {'sub':1},
      relevance: 5
    },

    // operators
    {
      className: 'operator',
      begin: '-\\w\\b', end: '^',
      relevance: 0
    },

    // comments
    hljs.HASH_COMMENT_MODE,
    {
      className: 'comment',
      begin: '^(__END__|__DATA__)', end: '\\n$',
      relevance: 5
    },
    // pod
    {
      className: 'pod',
      begin: '\\=\\w', end: '\\=cut'
    }

  ]
};//perl

/*

PHP5 definition (с) Victor Karamzin <Victor.Karamzin@enterra-inc.com>

*/
hljs.PHP5_KEYWORDS = {'and': 1, 'include_once': 1, 'list': 1, 'abstract': 1, 'global': 1, 'private': 1, 'echo': 1, 'interface': 1, 'as': 1, 'static': 1, 'endswitch': 1, 'array': 1, 'null': 1, 'if': 1, 'endwhile': 1, 'or': 1, 'const': 1, 'for': 1, 'endforeach': 1, 'self': 1, 'var': 1, 'while': 1, 'isset': 1, 'public': 1, 'protected': 1, 'exit': 1, 'foreach': 1, 'throw': 1, 'elseif': 1, 'extends': 1, 'include': 1, '__FILE__': 1, 'empty': 1, 'require_once': 1, 'function': 1, 'do': 1, 'xor': 1, 'return': 1, 'implements': 1, 'parent': 1, 'clone': 1, 'use': 1, '__CLASS__': 1, '__LINE__': 1, 'else': 1, 'break': 1, 'print': 1, 'eval': 1, 'new': 1, 'catch': 1, '__METHOD__': 1, 'class': 1, 'case': 1, 'exception': 1, 'php_user_filter': 1, 'default': 1, 'die': 1, 'require': 1, '__FUNCTION__': 1, 'enddeclare': 1, 'final': 1, 'try': 1, 'this': 1, 'switch': 1, 'continue': 1, 'endfor': 1, 'endif': 1, 'declare': 1, 'unset': 1};

hljs.PHP_IDENTIFIER_RE = '[a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff]*';

hljs.LANGUAGES.php = {
  defaultMode: {
    lexems: [hljs.IDENT_RE],
    contains: ['comment', 'number', 'string', 'variable'],
    keywords: hljs.PHP5_KEYWORDS
  },
  case_insensitive: true,
  modes: [
    hljs.C_LINE_COMMENT_MODE,
    hljs.HASH_COMMENT_MODE,
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
    hljs.C_NUMBER_MODE,
    {
      className: 'string',
      begin: '\'', end: '\'',
      contains: ['escape'],
      relevance: 0
    },
    {
      className: 'string',
      begin: '"', end: '"',
      contains: ['escape'],
      relevance: 0
    },
    hljs.BACKSLASH_ESCAPE,
    {
      className: 'variable',
      begin: '\\$' + hljs.PHP_IDENTIFIER_RE, end: '^'
    },
    ]
};//php

/*

Ruby definition (с) Anton Kovalyov <anton@kovalyov.net>, Peter Leonov <gojpeg@yandex.ru>

*/
hljs.RUBY_IDENT_RE = '[a-zA-Z_][a-zA-Z0-9_]*(\\!|\\?)?';
hljs.RUBY_DEFAULT_CONTAINS = ['comment', 'string', 'char', 'class', 'function', 'symbol', 'number', 'variable', 'regexp']
hljs.RUBY_KEYWORDS = {
  'keyword': {'and': 1, 'false': 1, 'then': 1, 'defined': 1, 'module': 1, 'in': 1, 'return': 1, 'redo': 1, 'if': 1, 'BEGIN': 1, 'retry': 1, 'end': 1, 'for': 1, 'true': 1, 'self': 1, 'when': 1, 'next': 1, 'until': 1, 'do': 1, 'begin': 1, 'unless': 1, 'END': 1, 'rescue': 1, 'nil': 1, 'else': 1, 'break': 1, 'undef': 1, 'not': 1, 'super': 1, 'class': 1, 'case': 1, 'require': 1, 'yield': 1, 'alias': 1, 'while': 1, 'ensure': 1, 'elsif': 1, 'or': 1, 'def': 1},
  'keymethods': {'__id__': 1, '__send__': 1, 'abort': 1, 'abs': 1, 'all?': 1, 'allocate': 1, 'ancestors': 1, 'any?': 1, 'arity': 1, 'assoc': 1, 'at': 1, 'at_exit': 1, 'autoload': 1, 'autoload?': 1, 'between?': 1, 'binding': 1, 'binmode': 1, 'block_given?': 1, 'call': 1, 'callcc': 1, 'caller': 1, 'capitalize': 1, 'capitalize!': 1, 'casecmp': 1, 'catch': 1, 'ceil': 1, 'center': 1, 'chomp': 1, 'chomp!': 1, 'chop': 1, 'chop!': 1, 'chr': 1, 'class': 1, 'class_eval': 1, 'class_variable_defined?': 1, 'class_variables': 1, 'clear': 1, 'clone': 1, 'close': 1, 'close_read': 1, 'close_write': 1, 'closed?': 1, 'coerce': 1, 'collect': 1, 'collect!': 1, 'compact': 1, 'compact!': 1, 'concat': 1, 'const_defined?': 1, 'const_get': 1, 'const_missing': 1, 'const_set': 1, 'constants': 1, 'count': 1, 'crypt': 1, 'default': 1, 'default_proc': 1, 'delete': 1, 'delete!': 1, 'delete_at': 1, 'delete_if': 1, 'detect': 1, 'display': 1, 'div': 1, 'divmod': 1, 'downcase': 1, 'downcase!': 1, 'downto': 1, 'dump': 1, 'dup': 1, 'each': 1, 'each_byte': 1, 'each_index': 1, 'each_key': 1, 'each_line': 1, 'each_pair': 1, 'each_value': 1, 'each_with_index': 1, 'empty?': 1, 'entries': 1, 'eof': 1, 'eof?': 1, 'eql?': 1, 'equal?': 1, 'eval': 1, 'exec': 1, 'exit': 1, 'exit!': 1, 'extend': 1, 'fail': 1, 'fcntl': 1, 'fetch': 1, 'fileno': 1, 'fill': 1, 'find': 1, 'find_all': 1, 'first': 1, 'flatten': 1, 'flatten!': 1, 'floor': 1, 'flush': 1, 'for_fd': 1, 'foreach': 1, 'fork': 1, 'format': 1, 'freeze': 1, 'frozen?': 1, 'fsync': 1, 'getc': 1, 'gets': 1, 'global_variables': 1, 'grep': 1, 'gsub': 1, 'gsub!': 1, 'has_key?': 1, 'has_value?': 1, 'hash': 1, 'hex': 1, 'id': 1, 'include?': 1, 'included_modules': 1, 'index': 1, 'indexes': 1, 'indices': 1, 'induced_from': 1, 'inject': 1, 'insert': 1, 'inspect': 1, 'instance_eval': 1, 'instance_method': 1, 'instance_methods': 1, 'instance_of?': 1, 'instance_variable_defined?': 1, 'instance_variable_get': 1, 'instance_variable_set': 1, 'instance_variables': 1, 'integer?': 1, 'intern': 1, 'invert': 1, 'ioctl': 1, 'is_a?': 1, 'isatty': 1, 'iterator?': 1, 'join': 1, 'key?': 1, 'keys': 1, 'kind_of?': 1, 'lambda': 1, 'last': 1, 'length': 1, 'lineno': 1, 'ljust': 1, 'load': 1, 'local_variables': 1, 'loop': 1, 'lstrip': 1, 'lstrip!': 1, 'map': 1, 'map!': 1, 'match': 1, 'max': 1, 'member?': 1, 'merge': 1, 'merge!': 1, 'method': 1, 'method_defined?': 1, 'method_missing': 1, 'methods': 1, 'min': 1, 'module_eval': 1, 'modulo': 1, 'name': 1, 'nesting': 1, 'new': 1, 'next': 1, 'next!': 1, 'nil?': 1, 'nitems': 1, 'nonzero?': 1, 'object_id': 1, 'oct': 1, 'open': 1, 'pack': 1, 'partition': 1, 'pid': 1, 'pipe': 1, 'pop': 1, 'popen': 1, 'pos': 1, 'prec': 1, 'prec_f': 1, 'prec_i': 1, 'print': 1, 'printf': 1, 'private_class_method': 1, 'private_instance_methods': 1, 'private_method_defined?': 1, 'private_methods': 1, 'proc': 1, 'protected_instance_methods': 1, 'protected_method_defined?': 1, 'protected_methods': 1, 'public_class_method': 1, 'public_instance_methods': 1, 'public_method_defined?': 1, 'public_methods': 1, 'push': 1, 'putc': 1, 'puts': 1, 'quo': 1, 'raise': 1, 'rand': 1, 'rassoc': 1, 'read': 1, 'read_nonblock': 1, 'readchar': 1, 'readline': 1, 'readlines': 1, 'readpartial': 1, 'rehash': 1, 'reject': 1, 'reject!': 1, 'remainder': 1, 'reopen': 1, 'replace': 1, 'require': 1, 'respond_to?': 1, 'reverse': 1, 'reverse!': 1, 'reverse_each': 1, 'rewind': 1, 'rindex': 1, 'rjust': 1, 'round': 1, 'rstrip': 1, 'rstrip!': 1, 'scan': 1, 'seek': 1, 'select': 1, 'send': 1, 'set_trace_func': 1, 'shift': 1, 'singleton_method_added': 1, 'singleton_methods': 1, 'size': 1, 'sleep': 1, 'slice': 1, 'slice!': 1, 'sort': 1, 'sort!': 1, 'sort_by': 1, 'split': 1, 'sprintf': 1, 'squeeze': 1, 'squeeze!': 1, 'srand': 1, 'stat': 1, 'step': 1, 'store': 1, 'strip': 1, 'strip!': 1, 'sub': 1, 'sub!': 1, 'succ': 1, 'succ!': 1, 'sum': 1, 'superclass': 1, 'swapcase': 1, 'swapcase!': 1, 'sync': 1, 'syscall': 1, 'sysopen': 1, 'sysread': 1, 'sysseek': 1, 'system': 1, 'syswrite': 1, 'taint': 1, 'tainted?': 1, 'tell': 1, 'test': 1, 'throw': 1, 'times': 1, 'to_a': 1, 'to_ary': 1, 'to_f': 1, 'to_hash': 1, 'to_i': 1, 'to_int': 1, 'to_io': 1, 'to_proc': 1, 'to_s': 1, 'to_str': 1, 'to_sym': 1, 'tr': 1, 'tr!': 1, 'tr_s': 1, 'tr_s!': 1, 'trace_var': 1, 'transpose': 1, 'trap': 1, 'truncate': 1, 'tty?': 1, 'type': 1, 'ungetc': 1, 'uniq': 1, 'uniq!': 1, 'unpack': 1, 'unshift': 1, 'untaint': 1, 'untrace_var': 1, 'upcase': 1, 'upcase!': 1, 'update': 1, 'upto': 1, 'value?': 1, 'values': 1, 'values_at': 1, 'warn': 1, 'write': 1, 'write_nonblock': 1, 'zero?': 1, 'zip': 1}
}

hljs.LANGUAGES.ruby = {
  defaultMode: {
    lexems: [hljs.RUBY_IDENT_RE],
    contains: hljs.RUBY_DEFAULT_CONTAINS,
    keywords: hljs.RUBY_KEYWORDS
  },
  modes: [
    hljs.HASH_COMMENT_MODE,
    {
      className: 'comment',
      begin: '^\\=begin', end: '^\\=end',
      relevance: 10
    },
    {
      className: 'comment',
      begin: '^__END__', end: '\\n$'
    },
    {
      className: 'params',
      begin: '\\(', end: '\\)',
      lexems: [hljs.RUBY_IDENT_RE],
      keywords: hljs.RUBY_KEYWORDS,
      contains: hljs.RUBY_DEFAULT_CONTAINS
    },
    {
      className: 'function',
      begin: '\\bdef\\b', end: '$|;',
      lexems: [hljs.RUBY_IDENT_RE],
      keywords: hljs.RUBY_KEYWORDS,
      contains: ['title', 'params']
    },
    {
      className: 'class',
      begin: '\\b(class|module)\\b', end: '$',
      lexems: [hljs.UNDERSCORE_IDENT_RE],
      keywords: hljs.RUBY_KEYWORDS,
      contains: ['title', 'inheritance', 'comment'],
      keywords: {'class': 1, 'module': 1}
    },
    {
      className: 'title',
      begin: '[A-Za-z_]\\w*(::\\w+)*(\\?|\\!)?', end: '^',
      relevance: 0
    },
    {
      className: 'inheritance',
      begin: '<\\s*', end: '^',
      contains: ['parent']
    },
    {
      className: 'parent',
      begin: '(' + hljs.IDENT_RE + '::)?' + hljs.IDENT_RE, end: '^'
    },
    {
      className: 'number',
      begin: '(\\b0[0-7_]+)|(\\b0x[0-9a-fA-F_]+)|(\\b[1-9][0-9_]*(\\.[0-9_]+)?)|[0_]\\b', end: '^',
      relevance: 0
    },
    {
      className: 'number',
      begin: '\\?\\w', end: '^'
    },
    {
      className: 'string',
      begin: '\'', end: '\'',
      contains: ['escape', 'subst'],
      relevance: 0
    },
    {
      className: 'string',
      begin: '"', end: '"',
      contains: ['escape', 'subst'],
      relevance: 0
    },
    {
      className: 'string',
      begin: '%[qw]?\\(', end: '\\)',
      contains: ['escape', 'subst'],
      relevance: 10
    },
    {
      className: 'string',
      begin: '%[qw]?\\[', end: '\\]',
      contains: ['escape', 'subst'],
      relevance: 10
    },
    {
      className: 'string',
      begin: '%[qw]?{', end: '}',
      contains: ['escape', 'subst'],
      relevance: 10
    },
    {
      className: 'string',
      begin: '%[qw]?<', end: '>',
      contains: ['escape', 'subst'],
      relevance: 10
    },
    {
      className: 'string',
      begin: '%[qw]?/', end: '/',
      contains: ['escape', 'subst'],
      relevance: 10
    },
    {
      className: 'string',
      begin: '%[qw]?%', end: '%',
      contains: ['escape', 'subst'],
      relevance: 10
    },
    {
      className: 'string',
      begin: '%[qw]?-', end: '-',
      contains: ['escape', 'subst'],
      relevance: 10
    },
    {
      className: 'string',
      begin: '%[qw]?\\|', end: '\\|',
      contains: ['escape', 'subst'],
      relevance: 10
    },
    {
      className: 'symbol',
      begin: ':' + hljs.RUBY_IDENT_RE, end: '^'
    },
    hljs.BACKSLASH_ESCAPE,
    {
      className: 'subst',
      begin: '#{', end: '}',
      lexems: [hljs.RUBY_IDENT_RE],
      keywords: hljs.RUBY_KEYWORDS,
      contains: hljs.RUBY_DEFAULT_CONTAINS
    },
    {
      className: 'regexp',
      begin: '/', end: '/[a-z]*',
      contains: ['escape'],
      relevance: 0
    },
    {
      className: 'variable',
      begin: '(\\$\\W)|((\\$|\\@\\@?)(\\w+))', end: '^'
    }
  ]
};//ruby