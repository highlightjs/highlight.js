/*
Language: Ruby
Author: Anton Kovalyov <anton@kovalyov.net>
Contributors: Peter Leonov <gojpeg@yandex.ru>, Vasily Polovnyov <vast@whiteants.net>, Loren Segal <lsegal@soen.ca>
*/

hljs.LANGUAGES.ruby = function(){
  var RUBY_IDENT_RE = '[a-zA-Z_][a-zA-Z0-9_]*(\\!|\\?)?';
  var RUBY_METHOD_RE = '[a-zA-Z_]\\w*[!?=]?|[-+~]\\@|<<|>>|=~|===?|<=>|[<>]=?|\\*\\*|[-/+%^&*~`|]|\\[\\]=?';
  var RUBY_KEYWORDS = {
    keyword:
      'and false then defined module in return redo if BEGIN retry end for true self when ' +
      'next until do begin unless END rescue nil else break undef not super class case ' +
      'require yield alias while ensure elsif or def',
    keymethods:
      '__id__ __send__ abort abs all? allocate ancestors any? arity assoc at at_exit ' +
      'autoload autoload? between? binding binmode block_given? call callcc caller capitalize ' +
      'capitalize! casecmp catch ceil center chomp chomp! chop chop! chr class class_eval ' +
      'class_variable_defined? class_variables clear clone close close_read ' +
      'close_write closed? coerce collect collect! compact compact! concat const_defined? ' +
      'const_get const_missing const_set constants count crypt default default_proc delete ' +
      'delete! delete_at delete_if detect display div divmod downcase downcase! downto dump ' +
      'dup each each_byte each_index each_key each_line each_pair each_value each_with_index ' +
      'empty? entries eof eof? eql? equal? eval exec exit exit! extend fail fcntl fetch ' +
      'fileno fill find find_all first flatten flatten! floor flush for_fd foreach fork ' +
      'format freeze frozen? fsync getc gets global_variables grep gsub gsub! has_key? ' +
      'has_value? hash hex id include include? included_modules index indexes indices ' +
      'induced_from inject insert inspect instance_eval instance_method instance_methods ' +
      'instance_of? instance_variable_defined? instance_variable_get instance_variable_set ' +
      'instance_variables integer? intern invert ioctl is_a? isatty iterator? join key? keys ' +
      'kind_of? lambda last length lineno ljust load local_variables loop lstrip lstrip! map ' +
      'map! match max member? merge merge! method method_defined? method_missing methods min ' +
      'module_eval modulo name nesting new next next! nil? nitems nonzero? object_id oct open ' +
      'pack partition pid pipe pop popen pos prec prec_f prec_i print printf ' +
      'private_class_method private_instance_methods private_method_defined? private_methods ' +
      'proc protected_instance_methods protected_method_defined? protected_methods ' +
      'public_class_method public_instance_methods public_method_defined? public_methods push ' +
      'putc puts quo raise rand rassoc read read_nonblock readchar readline readlines ' +
      'readpartial rehash reject reject! remainder reopen replace require respond_to? reverse ' +
      'reverse! reverse_each rewind rindex rjust round rstrip rstrip! scan seek select send ' +
      'set_trace_func shift singleton_method_added singleton_methods size sleep slice slice! ' +
      'sort sort! sort_by split sprintf squeeze squeeze! srand stat step store strip strip! ' +
      'sub sub! succ succ! sum superclass swapcase swapcase! sync syscall sysopen sysread ' +
      'sysseek system syswrite taint tainted? tell test throw times to_a to_ary to_f to_hash ' +
      'to_i to_int to_io to_proc to_s to_str to_sym tr tr! tr_s tr_s! trace_var transpose ' +
      'trap truncate tty? type ungetc uniq uniq! unpack unshift untaint untrace_var upcase ' +
      'upcase! update upto value? values values_at warn write write_nonblock zero? zip'
  };
  var YARDOCTAG = {
    className: 'yardoctag',
    begin: '@[A-Za-z]+'
  };
  var COMMENTS = [
    {
      className: 'comment',
      begin: '#', end: '$',
      contains: [YARDOCTAG]
    },
    {
      className: 'comment',
      begin: '^\\=begin', end: '^\\=end',
      contains: [YARDOCTAG],
      relevance: 10
    },
    {
      className: 'comment',
      begin: '^__END__', end: '\\n$'
    }
  ];
  var SUBST = {
    className: 'subst',
    begin: '#\\{', end: '}',
    lexems: RUBY_IDENT_RE,
    keywords: RUBY_KEYWORDS
  };
  var STR_CONTAINS = [hljs.BACKSLASH_ESCAPE, SUBST];
  var STRINGS = [
    {
      className: 'string',
      begin: '\'', end: '\'',
      contains: STR_CONTAINS,
      relevance: 0
    },
    {
      className: 'string',
      begin: '"', end: '"',
      contains: STR_CONTAINS,
      relevance: 0
    },
    {
      className: 'string',
      begin: '%[qw]?\\(', end: '\\)',
      contains: STR_CONTAINS
    },
    {
      className: 'string',
      begin: '%[qw]?\\[', end: '\\]',
      contains: STR_CONTAINS
    },
    {
      className: 'string',
      begin: '%[qw]?{', end: '}',
      contains: STR_CONTAINS
    },
    {
      className: 'string',
      begin: '%[qw]?<', end: '>',
      contains: STR_CONTAINS,
      relevance: 10
    },
    {
      className: 'string',
      begin: '%[qw]?/', end: '/',
      contains: STR_CONTAINS,
      relevance: 10
    },
    {
      className: 'string',
      begin: '%[qw]?%', end: '%',
      contains: STR_CONTAINS,
      relevance: 10
    },
    {
      className: 'string',
      begin: '%[qw]?-', end: '-',
      contains: STR_CONTAINS,
      relevance: 10
    },
    {
      className: 'string',
      begin: '%[qw]?\\|', end: '\\|',
      contains: STR_CONTAINS,
      relevance: 10
    }
  ];
  var FUNCTION = {
    className: 'function',
    begin: '\\bdef\\s+', end: ' |$|;',
    lexems: RUBY_IDENT_RE,
    keywords: RUBY_KEYWORDS,
    contains: [
      {
        className: 'title',
        begin: RUBY_METHOD_RE,
        lexems: RUBY_IDENT_RE,
        keywords: RUBY_KEYWORDS
      },
      {
        className: 'params',
        begin: '\\(', end: '\\)',
        lexems: RUBY_IDENT_RE,
        keywords: RUBY_KEYWORDS
      }
    ].concat(COMMENTS)
  };
  var IDENTIFIER = {
    className: 'identifier',
    begin: RUBY_IDENT_RE,
    lexems: RUBY_IDENT_RE,
    keywords: RUBY_KEYWORDS,
    relevance: 0
  };

  var RUBY_DEFAULT_CONTAINS = COMMENTS.concat(STRINGS.concat([
    {
      className: 'class',
      beginWithKeyword: true, end: '$|;',
      keywords: 'class module',
      contains: [
        {
          className: 'title',
          begin: '[A-Za-z_]\\w*(::\\w+)*(\\?|\\!)?',
          relevance: 0
        },
        {
          className: 'inheritance',
          begin: '<\\s*',
          contains: [{
            className: 'parent',
            begin: '(' + hljs.IDENT_RE + '::)?' + hljs.IDENT_RE
          }]
        }
      ].concat(COMMENTS)
    },
    FUNCTION,
    {
      className: 'constant',
      begin: '(::)?([A-Z]\\w*(::)?)+',
      relevance: 0
    },
    {
      className: 'symbol',
      begin: ':',
      contains: STRINGS.concat([IDENTIFIER]),
      relevance: 0
    },
    {
      className: 'number',
      begin: '(\\b0[0-7_]+)|(\\b0x[0-9a-fA-F_]+)|(\\b[1-9][0-9_]*(\\.[0-9_]+)?)|[0_]\\b',
      relevance: 0
    },
    {
      className: 'number',
      begin: '\\?\\w'
    },
    {
      className: 'variable',
      begin: '(\\$\\W)|((\\$|\\@\\@?)(\\w+))'
    },
    IDENTIFIER,
    { // regexp container
      begin: '(' + hljs.RE_STARTERS_RE + ')\\s*',
      contains: COMMENTS.concat([
        {
          className: 'regexp',
          begin: '/', end: '/[a-z]*',
          illegal: '\\n',
          contains: [hljs.BACKSLASH_ESCAPE]
        }
      ]),
      relevance: 0
    }
  ]));
  SUBST.contains = RUBY_DEFAULT_CONTAINS;
  FUNCTION.contains[1].contains = RUBY_DEFAULT_CONTAINS;

  return {
    defaultMode: {
      lexems: RUBY_IDENT_RE,
      keywords: RUBY_KEYWORDS,
      contains: RUBY_DEFAULT_CONTAINS
    }
  };
}();
