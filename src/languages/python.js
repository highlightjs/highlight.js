/*
Language: Python
*/

function(hljs) {
  var PROMPT = {
    className: 'prompt',  begin: /^(>>>|\.\.\.) /
  }
  var STRINGS = [
    {
      className: 'string',
      begin: /(u|b)?r?'''/, end: /'''/,
      contains: [PROMPT],
      relevance: 10
    },
    {
      className: 'string',
      begin: /(u|b)?r?"""/, end: /"""/,
      contains: [PROMPT],
      relevance: 10
    },
    {
      className: 'string',
      begin: /(u|r|ur)'/, end: /'/,
      contains: [hljs.BACKSLASH_ESCAPE],
      relevance: 10
    },
    {
      className: 'string',
      begin: /(u|r|ur)"/, end: /"/,
      contains: [hljs.BACKSLASH_ESCAPE],
      relevance: 10
    },
    {
      className: 'string',
      begin: /(b|br)'/, end: /'/,
      contains: [hljs.BACKSLASH_ESCAPE]
    },
    {
      className: 'string',
      begin: /(b|br)"/, end: /"/,
      contains: [hljs.BACKSLASH_ESCAPE]
    }
  ].concat([
    hljs.APOS_STRING_MODE,
    hljs.QUOTE_STRING_MODE
  ]);
  var TITLE = {
    className: 'title', begin: hljs.UNDERSCORE_IDENT_RE
  };
  var NUMBERS = [
    {className: 'number', begin: hljs.BINARY_NUMBER_RE + '[lLjJ]?', relevance: 0},
    {className: 'number', begin: '\\b(0o[0-7]+)[lLjJ]?', relevance: 0},
    {className: 'number', begin: hljs.C_NUMBER_RE + '[lLjJ]?', relevance: 0}
  ]
  var PARAMS = {
    className: 'params',
    begin: /\(/, end: /\)/,
    contains: ['self', PROMPT].concat(STRINGS).concat(NUMBERS)
  };
  var FUNC_CLASS_PROTO = {
    beginWithKeyword: true, end: /:/,
    illegal: /[${=;\n]/,
    contains: [TITLE, PARAMS],
    relevance: 10
  };

  return {
    keywords: {
      keyword:
        'and elif is global as in if from raise for except finally print import pass return ' +
        'exec else break not with class assert yield try while continue del or def lambda ' +
        'nonlocal|10 None True False',
      built_in:
        'Ellipsis NotImplemented'
    },
    illegal: /(<\/|->|\?)/,
    contains: STRINGS.concat(NUMBERS).concat([
      PROMPT,
      hljs.HASH_COMMENT_MODE,
      hljs.inherit(FUNC_CLASS_PROTO, {className: 'function', keywords: 'def'}),
      hljs.inherit(FUNC_CLASS_PROTO, {className: 'class', keywords: 'class'}),
      {
        className: 'decorator',
        begin: /@/, end: /$/
      },
      {
        begin: /\b(print|exec)\(/ // don’t highlight keywords-turned-functions in Python 3
      }
    ])
  };
}
