/*
Language: Erlang
Description: Erlang is a general-purpose functional language, with strict evaluation, single assignment, and dynamic typing.
Author: Nikolay Zakharov <nikolay.desh@gmail.com>, Dmitry Kovega <arhibot@gmail.com>
*/

hljs.LANGUAGES.erlang = function(){
  var BASIC_ATOM_RE = '[a-z\'][a-zA-Z0-9_\']*';
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

  var COMMENT = {
    className: 'comment',
    begin: '%', end: '$',
    relevance: 0
  };
  var NAMED_FUN = {
    begin: 'fun\\s+' + BASIC_ATOM_RE + '/\\d+'
  };
  var FUNCTION_CALL = {
    begin: FUNCTION_NAME_RE + '\\(', end: '\\)',
    returnBegin: true,
    relevance: 0,
    contains: [
      {
        className: 'function_name', begin: FUNCTION_NAME_RE
      },
      {
        begin: '\\(', end: '\\)', endsWithParent: true,
        returnEnd: true
        // "contains" defined later
      }
    ]
  };
  var TUPLE = {
    className: 'tuple',
    begin: '{', end: '}'
    // "contains" defined later
  };
  var VAR1 = {
    className: 'variable',
    begin: '\\b_([A-Z][A-Za-z0-9_]*)?',
    relevance: 0
  };
  var VAR2 = {
    className: 'variable',
    begin: '[A-Z][a-zA-Z0-9_]*',
    relevance: 0
  };
  var RECORD_ACCESS = {
    begin: '#', end: '}',
    illegal: '.',
    relevance: 0,
    returnBegin: true,
    contains: [
      {
        className: 'record_name',
        begin: '#' + hljs.UNDERSCORE_IDENT_RE,
        relevance: 0
      },
      {
        begin: '{', endsWithParent: true,
        relevance: 0
        // "contains" defined later
      }
    ]
  };

  var BLOCK_STATEMENTS = {
    lexems: BASIC_ATOM_RE,
    keywords: ERLANG_RESERVED,
    begin: '(fun|receive|if|try|case)', end: 'end'
  };
  BLOCK_STATEMENTS.contains = [
    COMMENT,
    NAMED_FUN,
    hljs.inherit(hljs.APOS_STRING_MODE, {className: ''}),
    BLOCK_STATEMENTS,
    FUNCTION_CALL,
    hljs.QUOTE_STRING_MODE,
    hljs.C_NUMBER_MODE,
    TUPLE,
    VAR1, VAR2,
    RECORD_ACCESS
  ];

  var BASIC_MODES = [
    COMMENT,
    NAMED_FUN,
    BLOCK_STATEMENTS,
    FUNCTION_CALL,
    hljs.QUOTE_STRING_MODE,
    hljs.C_NUMBER_MODE,
    TUPLE,
    VAR1, VAR2,
    RECORD_ACCESS
  ];
  FUNCTION_CALL.contains[1].contains = BASIC_MODES;
  TUPLE.contains = BASIC_MODES;
  RECORD_ACCESS.contains[1].contains = BASIC_MODES;

  var PARAMS = {
    className: 'params',
    begin: '\\(', end: '\\)',
    endsWithParent: true,
    contains: BASIC_MODES
  };
  return {
    defaultMode: {
      lexems: hljs.UNDERSCORE_IDENT_RE,
      keywords: ERLANG_RESERVED,
      illegal: '(</|\\*=|\\+=|-=|/=|/\\*|\\*/|\\(\\*|\\*\\))',
      contains: [
        {
          className: 'function',
          begin: '^' + BASIC_ATOM_RE + '\\(', end: ';|\\.',
          returnBegin: true,
          contains: [
            PARAMS,
            {
              className: 'title', begin: BASIC_ATOM_RE
            },
            {
              lexems: BASIC_ATOM_RE,
              keywords: ERLANG_RESERVED,
              begin: '->', endsWithParent: true,
              contains: BASIC_MODES
            }
          ]
        },
        COMMENT,
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
          contains: [PARAMS]
        },
        hljs.C_NUMBER_MODE,
        hljs.QUOTE_STRING_MODE,
        RECORD_ACCESS,
        VAR1, VAR2,
        TUPLE
      ]
    }
  };
}();
