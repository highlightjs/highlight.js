/*
Language: Ruby
Author: Anton Kovalyov <anton@kovalyov.net>
Contributors: Peter Leonov <gojpeg@yandex.ru>, Vasily Polovnyov <vast@whiteants.net>
*/

hljs.LANGUAGES.ruby = function(){
  var RUBY_IDENT_RE = '[a-zA-Z_][a-zA-Z0-9_]*(\\!|\\?)?';
  var RUBY_DEFAULT_CONTAINS = ['comment', 'string', 'char', 'class', 'function', 'constant', 'symbol', 'number', 'variable', 'regexp_container']
  var RUBY_KEYWORDS = {
    'keyword': {'and': 1, 'false': 1, 'then': 1, 'defined': 1, 'module': 1, 'in': 1, 'return': 1, 'redo': 1, 'if': 1, 'BEGIN': 1, 'retry': 1, 'end': 1, 'for': 1, 'true': 1, 'self': 1, 'when': 1, 'next': 1, 'until': 1, 'do': 1, 'begin': 1, 'unless': 1, 'END': 1, 'rescue': 1, 'nil': 1, 'else': 1, 'break': 1, 'undef': 1, 'not': 1, 'super': 1, 'class': 1, 'case': 1, 'require': 1, 'yield': 1, 'alias': 1, 'while': 1, 'ensure': 1, 'elsif': 1, 'or': 1, 'def': 1},
    'keymethods': {'__id__': 1, '__send__': 1, 'abort': 1, 'abs': 1, 'all?': 1, 'allocate': 1, 'ancestors': 1, 'any?': 1, 'arity': 1, 'assoc': 1, 'at': 1, 'at_exit': 1, 'autoload': 1, 'autoload?': 1, 'between?': 1, 'binding': 1, 'binmode': 1, 'block_given?': 1, 'call': 1, 'callcc': 1, 'caller': 1, 'capitalize': 1, 'capitalize!': 1, 'casecmp': 1, 'catch': 1, 'ceil': 1, 'center': 1, 'chomp': 1, 'chomp!': 1, 'chop': 1, 'chop!': 1, 'chr': 1, 'class': 1, 'class_eval': 1, 'class_variable_defined?': 1, 'class_variables': 1, 'clear': 1, 'clone': 1, 'close': 1, 'close_read': 1, 'close_write': 1, 'closed?': 1, 'coerce': 1, 'collect': 1, 'collect!': 1, 'compact': 1, 'compact!': 1, 'concat': 1, 'const_defined?': 1, 'const_get': 1, 'const_missing': 1, 'const_set': 1, 'constants': 1, 'count': 1, 'crypt': 1, 'default': 1, 'default_proc': 1, 'delete': 1, 'delete!': 1, 'delete_at': 1, 'delete_if': 1, 'detect': 1, 'display': 1, 'div': 1, 'divmod': 1, 'downcase': 1, 'downcase!': 1, 'downto': 1, 'dump': 1, 'dup': 1, 'each': 1, 'each_byte': 1, 'each_index': 1, 'each_key': 1, 'each_line': 1, 'each_pair': 1, 'each_value': 1, 'each_with_index': 1, 'empty?': 1, 'entries': 1, 'eof': 1, 'eof?': 1, 'eql?': 1, 'equal?': 1, 'eval': 1, 'exec': 1, 'exit': 1, 'exit!': 1, 'extend': 1, 'fail': 1, 'fcntl': 1, 'fetch': 1, 'fileno': 1, 'fill': 1, 'find': 1, 'find_all': 1, 'first': 1, 'flatten': 1, 'flatten!': 1, 'floor': 1, 'flush': 1, 'for_fd': 1, 'foreach': 1, 'fork': 1, 'format': 1, 'freeze': 1, 'frozen?': 1, 'fsync': 1, 'getc': 1, 'gets': 1, 'global_variables': 1, 'grep': 1, 'gsub': 1, 'gsub!': 1, 'has_key?': 1, 'has_value?': 1, 'hash': 1, 'hex': 1, 'id': 1, 'include?': 1, 'included_modules': 1, 'index': 1, 'indexes': 1, 'indices': 1, 'induced_from': 1, 'inject': 1, 'insert': 1, 'inspect': 1, 'instance_eval': 1, 'instance_method': 1, 'instance_methods': 1, 'instance_of?': 1, 'instance_variable_defined?': 1, 'instance_variable_get': 1, 'instance_variable_set': 1, 'instance_variables': 1, 'integer?': 1, 'intern': 1, 'invert': 1, 'ioctl': 1, 'is_a?': 1, 'isatty': 1, 'iterator?': 1, 'join': 1, 'key?': 1, 'keys': 1, 'kind_of?': 1, 'lambda': 1, 'last': 1, 'length': 1, 'lineno': 1, 'ljust': 1, 'load': 1, 'local_variables': 1, 'loop': 1, 'lstrip': 1, 'lstrip!': 1, 'map': 1, 'map!': 1, 'match': 1, 'max': 1, 'member?': 1, 'merge': 1, 'merge!': 1, 'method': 1, 'method_defined?': 1, 'method_missing': 1, 'methods': 1, 'min': 1, 'module_eval': 1, 'modulo': 1, 'name': 1, 'nesting': 1, 'new': 1, 'next': 1, 'next!': 1, 'nil?': 1, 'nitems': 1, 'nonzero?': 1, 'object_id': 1, 'oct': 1, 'open': 1, 'pack': 1, 'partition': 1, 'pid': 1, 'pipe': 1, 'pop': 1, 'popen': 1, 'pos': 1, 'prec': 1, 'prec_f': 1, 'prec_i': 1, 'print': 1, 'printf': 1, 'private_class_method': 1, 'private_instance_methods': 1, 'private_method_defined?': 1, 'private_methods': 1, 'proc': 1, 'protected_instance_methods': 1, 'protected_method_defined?': 1, 'protected_methods': 1, 'public_class_method': 1, 'public_instance_methods': 1, 'public_method_defined?': 1, 'public_methods': 1, 'push': 1, 'putc': 1, 'puts': 1, 'quo': 1, 'raise': 1, 'rand': 1, 'rassoc': 1, 'read': 1, 'read_nonblock': 1, 'readchar': 1, 'readline': 1, 'readlines': 1, 'readpartial': 1, 'rehash': 1, 'reject': 1, 'reject!': 1, 'remainder': 1, 'reopen': 1, 'replace': 1, 'require': 1, 'respond_to?': 1, 'reverse': 1, 'reverse!': 1, 'reverse_each': 1, 'rewind': 1, 'rindex': 1, 'rjust': 1, 'round': 1, 'rstrip': 1, 'rstrip!': 1, 'scan': 1, 'seek': 1, 'select': 1, 'send': 1, 'set_trace_func': 1, 'shift': 1, 'singleton_method_added': 1, 'singleton_methods': 1, 'size': 1, 'sleep': 1, 'slice': 1, 'slice!': 1, 'sort': 1, 'sort!': 1, 'sort_by': 1, 'split': 1, 'sprintf': 1, 'squeeze': 1, 'squeeze!': 1, 'srand': 1, 'stat': 1, 'step': 1, 'store': 1, 'strip': 1, 'strip!': 1, 'sub': 1, 'sub!': 1, 'succ': 1, 'succ!': 1, 'sum': 1, 'superclass': 1, 'swapcase': 1, 'swapcase!': 1, 'sync': 1, 'syscall': 1, 'sysopen': 1, 'sysread': 1, 'sysseek': 1, 'system': 1, 'syswrite': 1, 'taint': 1, 'tainted?': 1, 'tell': 1, 'test': 1, 'throw': 1, 'times': 1, 'to_a': 1, 'to_ary': 1, 'to_f': 1, 'to_hash': 1, 'to_i': 1, 'to_int': 1, 'to_io': 1, 'to_proc': 1, 'to_s': 1, 'to_str': 1, 'to_sym': 1, 'tr': 1, 'tr!': 1, 'tr_s': 1, 'tr_s!': 1, 'trace_var': 1, 'transpose': 1, 'trap': 1, 'truncate': 1, 'tty?': 1, 'type': 1, 'ungetc': 1, 'uniq': 1, 'uniq!': 1, 'unpack': 1, 'unshift': 1, 'untaint': 1, 'untrace_var': 1, 'upcase': 1, 'upcase!': 1, 'update': 1, 'upto': 1, 'value?': 1, 'values': 1, 'values_at': 1, 'warn': 1, 'write': 1, 'write_nonblock': 1, 'zero?': 1, 'zip': 1}
  }
  return {
    defaultMode: {
      lexems: [RUBY_IDENT_RE],
      contains: RUBY_DEFAULT_CONTAINS,
      keywords: RUBY_KEYWORDS
    },
    modes: [
      {
        className: 'comment',
        begin: '#', end: '$',
        contains: ['yardoctag']
      },
      {
        className: 'yardoctag',
        begin: '@[A-Za-z]+', end: '^'
      },
      {
        className: 'comment',
        begin: '^\\=begin', end: '^\\=end',
        contains: ['yardoctag'],
        relevance: 10
      },
      {
        className: 'comment',
        begin: '^__END__', end: '\\n$'
      },
      {
        className: 'params',
        begin: '\\(', end: '\\)',
        lexems: [RUBY_IDENT_RE],
        keywords: RUBY_KEYWORDS,
        contains: RUBY_DEFAULT_CONTAINS
      },
      {
        className: 'function',
        begin: '\\bdef\\b', end: '$|;',
        lexems: [RUBY_IDENT_RE],
        keywords: RUBY_KEYWORDS,
        contains: ['title', 'params', 'comment']
      },
      {
        className: 'class',
        begin: '\\b(class|module)\\b', end: '$|;',
        lexems: [hljs.UNDERSCORE_IDENT_RE],
        keywords: RUBY_KEYWORDS,
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
        className: 'constant',
        begin: '(::)?([A-Z]\\w*(::)?)+', end: '^',
      },
      {
        className: 'symbol',
        begin: ':' + RUBY_IDENT_RE, end: '^'
      },
      {
        className: 'symbol',
        begin: ':', end: '^',
        contains: ['string']
      },
      hljs.BACKSLASH_ESCAPE,
      {
        className: 'subst',
        begin: '#\\{', end: '}',
        lexems: [RUBY_IDENT_RE],
        keywords: RUBY_KEYWORDS,
        contains: RUBY_DEFAULT_CONTAINS
      },
      {
        className: 'regexp_container',
        begin: '(' + hljs.RE_STARTERS_RE + ')\\s*', end: '^', noMarkup: true,
        contains: ['comment', 'regexp'],
        relevance: 0
      },
      {
        className: 'regexp',
        begin: '/', end: '/[a-z]*',
        illegal: '\\n',
        contains: ['escape']
      },
      {
        className: 'variable',
        begin: '(\\$\\W)|((\\$|\\@\\@?)(\\w+))', end: '^'
      }
    ]
  };
}();
