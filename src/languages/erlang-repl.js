/*
 Language: Erlang
 Author: Sergey Ignatov <sergey@ignatov.spb.su>
 */

hljs.LANGUAGES.erlang_repl = {
  defaultMode: {
    lexems: hljs.UNDERSCORE_IDENT_RE,
    contains: [
      'comment', 'number', 'string', 'module_attributes',
      'statement', 'constant', 'special_functions', 'function',
      'arrow', 'ok', 'exclamation_mark'],
    keywords: {
      'special_functions':{
        'spawn':10,
        'spawn_link':50,
        'self':2
      },
      'reserved':{
        'after':1,
        'and':1,
        'andalso':5,
        'band':1,
        'begin':1,
        'bnot':1,
        'bor':1,
        'bsl':1,
        'bsr':1,
        'bxor':1,
        'case':1,
        'catch':0,
        'cond':1,
        'div':1,
        'end':1,
        'fun':5,
        'if':0,
        'let':1,
        'not':0,
        'of':1,
        'or':1,
        'orelse':1,
        'query':1,
        'receive':5,
        'rem':1,
        'try':0,
        'when':1,
        'xor':1
      }
    }
  },
  modes: [
    {
      className: 'comment',
      begin: '%',
      end: '$'
    },
    {
      className: 'constant',
      begin: '\\?(::)?([A-Z]\\w*(::)?)+',
      end: hljs.IMMEDIATE_RE
    },
    {
      className: 'module_attributes',
      begin: '^-[a-z][a-zA-Z0-9_]*',
      end: hljs.IMMEDIATE_RE,
      relevance: 20
    },
    {
      className: 'arrow',
      begin: '->',
      end: hljs.IMMEDIATE_RE,
      relevance: 1
    },
    {
      className: 'ok',
      begin: 'ok',
      end: hljs.IMMEDIATE_RE,
      relevance: 2
    },
    {
      className: 'exclamation_mark',
      begin: '!',
      end: hljs.IMMEDIATE_RE,
      relevance: 2
    },
    {
      className: 'function',
      begin: '^[a-z][a-zA-Z0-9_]*\\b',
      end: hljs.IMMEDIATE_RE
    },
    hljs.NUMBER_MODE,
    hljs.APOS_STRING_MODE,
    hljs.QUOTE_STRING_MODE
  ]
};