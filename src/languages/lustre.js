/*
Language: Lustre
Author: Erwan Jahier <jahierwan@gmail.com>
Description: Lustre language definition.
Website: http://www-verimag.imag.fr/Lustre-V6.html
*/

function(hljs) {
  return {
    aliases: ['lus'],
    keywords: {
      keyword:
        'extern unsafe assert const current enum function ' +
        'let tel|10 node|10 operator returns|10 ' +
        'step struct  type var|10  model package needs ' +
        'provides uses is body end include merge|10 ' +
        'div and xor mod or not nor if then else fby|10 pre|10 when|10 with',
      built_in:
        /* built-in types */
        'bool real int ',
      literal:
        'true false'
    },
    illegal: '^/\/\*/|\\$[A-Za-z_]|\\{\\}',
    lexemes: '[a-z_]\\w*!?',
    contains: [
      {
        className: 'literal',
        begin: '\\[(\\|\\|)?\\]|\\(\\)',
        relevance: 0
      },
      hljs.COMMENT(
        '\\(\\*',
        '\\*\\)',
        {
          contains: ['self']
        }
      ),
      hljs.COMMENT(
        '--',
        '$',
        {
          contains: ['self']
        } 
      ),
        { /* type variable */
        className: 'symbol',
        begin: '\'[A-Za-z_](?!\')[\\w\']*'
      },
      hljs.inherit(hljs.APOS_STRING_MODE, {className: 'string', relevance: 0}),
      hljs.inherit(hljs.QUOTE_STRING_MODE, {illegal: null}),
      {
        className: 'number',
        begin:
          '\\b(0[xX][a-fA-F0-9_]+[Lln]?|' +
          '0[oO][0-7_]+[Lln]?|' +
          '0[bB][01_]+[Lln]?|' +
          '[0-9][0-9_]*([Lln]|(\\.[0-9_]*)?([eE][-+]?[0-9_]+)?)?)',
        relevance: 0
      }
    ]
  }
}
