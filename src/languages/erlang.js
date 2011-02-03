/*
Language: Erlang
Description: Erlang is a general-purpose functional language, with strict evaluation, single assignment, and dynamic typing.
Author: Nikolay Zakharov <nikolay.desh@gmail.com>, Dmitry Kovega <arhibot@gmail.com>
*/

hljs.LANGUAGES.erlang = function(){
  var BASIC_ATOM_RE = '[a-z\'][a-zA-Z0-9_\']*';
  var BASIC_MODES = ['comment', 'named_fun', 'block_statements', 'function_call', 'atom', 'string', 'number', 'tuple', 'variable', 'record_access'];
  var FUNCTION_NAME_RE = '(' + BASIC_ATOM_RE + ':' + BASIC_ATOM_RE + '|' + BASIC_ATOM_RE + ')';

  var ERLANG_RESERVED = {
    'keyword': {
        'after': 1,
        'and': 1,
        'andalso': 10,
        'band': 1,
        'begin': 1,
        'bnot': 1,
        'bor': 1,
        'bsl': 1,
        'bzr': 1,
        'bxor': 1,
        'case': 1,
        'catch': 1,
        'cond': 1,
        'div': 1,
        'end': 1,
        'fun': 1,
        'let': 1,
        'not': 1,
        'of': 1,
        'orelse': 10,
        'query': 1,
        'receive': 1,
        'rem': 1,
        'try': 1,
        'when': 1,
        'xor': 1,
    },
    'literal': {'false': 1, 'true': 1}
  };
  return {
    defaultMode: {
      lexems: hljs.UNDERSCORE_IDENT_RE,
      illegal: '(</|\\*=|\\+=|-=|/=|/\\*|\\*/|\\(\\*|\\*\\))',
      contains: ['function', 'operators', 'dot', 'comment', 'pp', 'number', 'string', 'record_access', 'variable', 'tuple'],
      keywords: ERLANG_RESERVED
    },
    modes: [
      hljs.C_NUMBER_MODE,
      hljs.QUOTE_STRING_MODE,
      {
        className: 'comment',
        begin: '%', end: '$',
        relevance: 0
      },
      {
        className: 'function',
        begin: '^' + BASIC_ATOM_RE + '\\(', end: ';|\\.',
        returnBegin: true,
        contains: ['params', 'title','function_body']
      },
      {
        className: 'function_body',
        begin: '->', endsWithParent: true,
        contains: BASIC_MODES
      },
      {
        className: 'function_name',
        begin: FUNCTION_NAME_RE, end: hljs.IMMEDIATE_RE
      },
      {
        className: 'title',
        begin: BASIC_ATOM_RE, end: hljs.IMMEDIATE_RE
      },
      {
        className: 'variable',
        begin: '\\b_([A-Z][A-Za-z0-9_]*)?', end: hljs.IMMEDIATE_RE,
        relevance: 0
      },
      {
        className: 'named_fun',
        begin: 'fun\\s+' + BASIC_ATOM_RE + '/\\d+', end: hljs.IMMEDIATE_RE
      },
      {
        className: 'block_statements',
        lexems: BASIC_ATOM_RE,
        keywords: ERLANG_RESERVED,
        begin: '(fun|receive|if|try|case)', end: 'end',
        contains: ['comment', 'named_fun', 'quoted_atom', 'block_statements', 'function_call', 'string', 'number', 'tuple', 'variable', 'record_access']
      },
      {
        className: 'variable',
        begin: '[A-Z][a-zA-Z0-9_]*', end: hljs.IMMEDIATE_RE,
        relevance: 0
      },
      {
        className: 'function_call',
        begin: FUNCTION_NAME_RE + '\\(', end: '\\)',
        returnBegin: true,
        relevance: 0,
        contains: ['function_name', 'params_wo_rparen']
      },
      {
        className: 'quoted_atom',
        begin: '\'', end: '\'',
        illegal: '\\n',
        contains: [hljs.BACKSLASH_ESCAPE],
        relevance: 0
      },
      {
        className: 'pp',
        begin: '^-', end: '\\.',
        relevance: 0,
        excludeEnd: true,
        returnBegin: true,
        lexems: '-' + hljs.UNDERSCORE_IDENT_RE,
        keywords: {
          '-module':1,
          '-record':1,
          '-undef':1,
          '-export':1,
          '-ifdef':1,
          '-ifndef':1,
          '-author':1,
          '-copyright':1,
          '-doc':1,
          '-vsn':1,
          '-import': 1,
          '-include': 1,
          '-include_lib': 1,
          '-compile': 1,
          '-define': 1,
          '-else': 1,
          '-endif': 1,
          '-file': 1,
          '-behaviour': 1,
          '-behavior': 1
        },
        contains: ['params']
      },
      {
        className: 'record_access',
        begin: '#', end: '}',
        illegal: '.',
        relevance: 0,
        returnBegin: true,
        contains: ['record_name', 'field_access']
      },
      {
        className: 'record_name',
        begin: '#' + hljs.UNDERSCORE_IDENT_RE, end: hljs.IMMEDIATE_RE,
        relevance: 0
      },
      {
        className: 'field_access',
        begin: '{', endsWithParent: true,
        relevance: 0,
        contains: BASIC_MODES
      },
      {
        className: 'tuple',
        begin: '{', end: '}',
        contains: BASIC_MODES
      },
      {
        className: 'params_wo_rparen',
        begin: '\\(', end: '\\)',
        returnEnd: true,
        endsWithParent: true,
        contains: BASIC_MODES
      },
      {
        className: 'params',
        begin: '\\(', end: '\\)',
        endsWithParent: true,
        contains: BASIC_MODES
      }
    ]
  };
}();
