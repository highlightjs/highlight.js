/*
 Language: Erlang
 Author: Sergey Ignatov <sergey@ignatov.spb.su>
 */

hljs.LANGUAGES.erlang_repl = {
  defaultMode: {
    lexems: hljs.UNDERSCORE_IDENT_RE,
    contains: [
      'input_number', 'comment', 'number', 'string',
      'statement', 'constant', 'special_functions',
      'arrow', 'ok', 'exclamation_mark', 'function_or_atom', 'variable'],
    keywords: {
      'special_functions':{
        'spawn':10,
        'spawn_link':10,
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
        'fun':0,
        'if':0,
        'let':1,
        'not':0,
        'of':1,
        'or':1,
        'orelse':5,
        'query':1,
        'receive':0,
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
      className: 'arrow',
      begin: '->',
      end: hljs.IMMEDIATE_RE,
      relevance: 1
    },
    {
      className: 'exclamation_mark',
      begin: '!',
      end: hljs.IMMEDIATE_RE,
      relevance: 1
    },
    {
      className: 'function_or_atom',
      begin: '(\\b[a-z\'][a-zA-Z0-9_\']*:[a-z\'][a-zA-Z0-9_\']*)|(\\b[a-z\'][a-zA-Z0-9_\']*)',
      end: hljs.IMMEDIATE_RE,
      relevance: 0
    },
    {
      className: 'variable',
      begin: '[A-Z][a-zA-Z0-9_\']*',
      end: hljs.IMMEDIATE_RE,
      relevance: 0
    },
    {
      className: 'ok',
      begin: 'ok',
      end: hljs.IMMEDIATE_RE,
      relevance: 1
    },
    {
      className: 'input_number',
      begin: '^[0-9]+>',
      end: hljs.IMMEDIATE_RE,
      relevance: 1
    },
    hljs.NUMBER_MODE,
    hljs.APOS_STRING_MODE,
    hljs.QUOTE_STRING_MODE
  ]
};
