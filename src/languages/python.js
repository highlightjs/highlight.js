/*
Language: Python
*/

function(hljs) {
  var PROMPT = {
    className: 'prompt',  begin: /^(>>>|\.\.\.) /
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
  var FUNC_CLASS_PROTO = {
    end: /:/,
    illegal: /[${=;\n]/,
    contains: [hljs.UNDERSCORE_TITLE_MODE, PARAMS]
  };

  return {
    aliases: ['py', 'gyp'],
    keywords: {
      keyword:
        'and elif is global as in if from raise for except finally print import pass return ' +
        'exec else break not with class assert yield try while continue del or def lambda ' +
        'nonlocal|10 None True False',
      built_in:
        'Ellipsis NotImplemented'
    },
    illegal: /(<\/|->|\?)/,
    contains: [
      PROMPT,
      NUMBER,
      STRING,
      hljs.HASH_COMMENT_MODE,
      hljs.inherit(FUNC_CLASS_PROTO, {className: 'function', beginKeywords: 'def', relevance: 10}),
      hljs.inherit(FUNC_CLASS_PROTO, {className: 'class', beginKeywords: 'class'}),
      {
        className: 'decorator',
        begin: /@/, end: /$/
      },
      {
        begin: /\b(print|exec)\(/ // don’t highlight keywords-turned-functions in Python 3
      }
    ]
  };
}
