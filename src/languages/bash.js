/*
Language: Bash
Author: vah <vahtenberg@gmail.com>
*/

hljs.LANGUAGES.bash = function(){
  var BASH_LITERAL = {'true' : 1, 'false' : 1}
  return {
    defaultMode: {
      lexems: hljs.IDENT_RE,
      contains: ['string', 'shebang', 'comment', 'number', 'test_condition', 'string', 'variable'],
      keywords: {
        'keyword': {'if' : 1, 'then' : 1, 'else' : 1, 'fi' : 1, 'for' : 1, 'break' : 1, 'continue' : 1, 'while' : 1, 'in' : 1, 'do' : 1, 'done' : 1, 'echo' : 1, 'exit' : 1, 'return' : 1, 'set' : 1, 'declare' : 1},
        'literal': BASH_LITERAL
      }
    },
    case_insensitive: false,
    modes: [
      {
        className: 'shebang',
        begin: '(#!\\/bin\\/bash)|(#!\\/bin\\/sh)',
        relevance: 10
      },
      hljs.HASH_COMMENT_MODE,
      {
        className: 'test_condition',
        begin: '\\[ ',
        end: ' \\]',
        contains: ['string', 'variable', 'number'],
        lexems: hljs.IDENT_RE,
        keywords: {
          'literal': BASH_LITERAL
        },
        relevance: 0
      },
      {
        className: 'test_condition',
        begin: '\\[\\[ ',
        end: ' \\]\\]',
        contains: ['string', 'variable', 'number'],
        lexems: hljs.IDENT_RE,
        keywords: {
          'literal': BASH_LITERAL
        }
      },
      {
        className: 'variable',
        begin: '\\$([a-zA-Z0-9_]+)\\b'
      },
      {
        className: 'variable',
        begin: '\\$\\{(([^}])|(\\\\}))+\\}',
        contains: ['number']
      },
      {
        className: 'string',
        begin: '"', end: '"',
        illegal: '\\n',
        contains: [hljs.BACKSLASH_ESCAPE, 'variable'],
        relevance: 0
      },
      hljs.C_NUMBER_MODE,
      {
        className: 'comment',
        begin: '\\/\\/', end: '$',
        illegal: '.'
      }
    ]
  };
}();
