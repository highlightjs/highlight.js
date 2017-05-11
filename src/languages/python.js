/*
Language: Python
Category: common
*/

function(hljs) {
  var KEYWORDS = {
    keyword:
      'and elif is global as in if from raise for except finally print import pass return ' +
      'exec else break not with class assert yield try while continue del or def lambda ' +
      'async await nonlocal|10 None True False',
    built_in:
      'BaseException SystemExit KeyboardInterrupt GeneratorExit Exception StopIteration ' +
      'StopAsyncIteration ArithmeticError FloatingPointError OverflowError ZeroDivisionError ' +
      'AssertionError AttributeError BufferError EOFError ImportError ModuleNotFoundError ' +
      'LookupError IndexError KeyError MemoryError NameError UnboundLocalError OSError ' +
      'BlockingIOError ChildProcessError ConnectionError BrokenPipeError ConnectionAbortedError ' +
      'ConnectionRefusedError ConnectionResetError FileExistsError FileNotFoundError ' +
      'InterruptedError IsADirectoryError NotADirectoryError PermissionError ProcessLookupError ' +
      'TimeoutError ReferenceError RuntimeError NotImplementedError RecursionError SyntaxError ' +
      'IndentationError TabError SystemError TypeError ValueError UnicodeError UnicodeDecodeError ' +
      'UnicodeEncodeError UnicodeTranslateError Warning DeprecationWarning ' +
      'PendingDeprecationWarning RuntimeWarning SyntaxWarning UserWarning FutureWarning ' +
      'ImportWarning UnicodeWarning BytesWarning ResourceWarning' +
      'dir getattr setattr eval callable abs dict help ' + 
      'min setattr all dir hex next slice any divmod id object sorted ascii enumerate input ' +
      'oct staticmethod bin eval int open str bool isinstance ord sum bytearray filter ' +
      'issubclass pow super bytes float iter tuple callable format len property type ' +
      'chr frozenset list range vars classmethod getattr locals repr zip compile globals map ' +
      'reversed __import__ complex hasattr max round delattr hash memoryview set'
  };
  var PROMPT = {
    className: 'meta',  begin: /^(>>>|\.\.\.) /
  };
  var SUBST = {
    className: 'subst',
    begin: /\{/, end: /\}/,
    keywords: KEYWORDS,
    illegal: /#/
  };
  var STRING = {
    className: 'string',
    contains: [hljs.BACKSLASH_ESCAPE],
    variants: [
      {
        begin: /(u|b)?r?'''/, end: /'''/,
        contains: [PROMPT],
        relevance: 10
      },
      {
        begin: /(u|b)?r?"""/, end: /"""/,
        contains: [PROMPT],
        relevance: 10
      },
      {
        begin: /(fr|rf|f)'''/, end: /'''/,
        contains: [PROMPT, SUBST]
      },
      {
        begin: /(fr|rf|f)"""/, end: /"""/,
        contains: [PROMPT, SUBST]
      },
      {
        begin: /(u|r|ur)'/, end: /'/,
        relevance: 10
      },
      {
        begin: /(u|r|ur)"/, end: /"/,
        relevance: 10
      },
      {
        begin: /(b|br)'/, end: /'/
      },
      {
        begin: /(b|br)"/, end: /"/
      },
      {
        begin: /(fr|rf|f)'/, end: /'/,
        contains: [SUBST]
      },
      {
        begin: /(fr|rf|f)"/, end: /"/,
        contains: [SUBST]
      },
      hljs.APOS_STRING_MODE,
      hljs.QUOTE_STRING_MODE
    ]
  };
  var NUMBER = {
    className: 'number', relevance: 0,
    variants: [
      {begin: hljs.BINARY_NUMBER_RE + '[lLjJ]?'},
      {begin: '\\b(0o[0-7]+)[lLjJ]?'},
      {begin: hljs.C_NUMBER_RE + '[lLjJ]?'}
    ]
  };
  var PARAMS = {
    className: 'params',
    begin: /\(/, end: /\)/,
    contains: ['self', PROMPT, NUMBER, STRING]
  };
  SUBST.contains = [STRING, NUMBER, PROMPT];
  return {
    aliases: ['py', 'gyp'],
    keywords: KEYWORDS,
    illegal: /(<\/|->|\?)|=>/,
    contains: [
      PROMPT,
      NUMBER,
      STRING,
      hljs.HASH_COMMENT_MODE,
      {
        variants: [
          {className: 'function', beginKeywords: 'def'},
          {className: 'class', beginKeywords: 'class'}
        ],
        end: /:/,
        illegal: /[${=;\n,]/,
        contains: [
          hljs.UNDERSCORE_TITLE_MODE,
          PARAMS,
          {
            begin: /->/, endsWithParent: true,
            keywords: 'None'
          }
        ]
      },
      {
        className: 'meta',
        begin: /^[\t ]*@/, end: /$/
      },
      {
        className: 'type',
        begin: /([a-zA-Z_]+)=["a-zA-Z\.0-9 ,]+\n|([a-zA-Z_]+)=["a-zA-Z\. ,]+[)]/
      },
      {
        className: 'symbol',
        begin: /\.([A-Z0-9_]+)/
      },
      {
        begin: /\b(print|exec)\(/ // don’t highlight keywords-turned-functions in Python 3
      }
    ]
  };
}
