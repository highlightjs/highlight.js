/*
Language: OCaml
Author: Mehdi Dogguy <mehdi@dogguy.org>
Contributors: Nicolas Braud-Santoni <nicolas.braud-santoni@ens-cachan.fr>, Mickael Delahaye <mickael.delahaye@gmail.com>
Description: OCaml language definition.
Website: https://ocaml.org
Category: functional
*/

export default function(hljs) {
  /* missing support for heredoc-like string (OCaml 4.0.2+) */
  return {
    name: 'OCaml',
    aliases: [ 'ml' ],
    keywords: {
      $pattern: '[a-z_]\\w*!?',
      keyword:
        'and as assert asr begin class constraint do done downto else end '
        + 'exception external for fun function functor if in include '
        + 'inherit! inherit initializer land lazy let lor lsl lsr lxor match method!|10 method '
        + 'mod module mutable new object of open! open or private rec sig struct '
        + 'then to try type val! val virtual when while with '
        /* camlp4 */
        + 'parser value',
      built_in:
        /* built-in types */
        'array bool bytes char exn|5 float int int32 int64 list lazy_t|5 nativeint|5 string unit '
        /* (some) types in Pervasives */
        + 'in_channel out_channel ref',
      literal:
        'true false'
    },
    illegal: /\/\/|>>/,
    contains: [
      {
        className: 'literal',
        begin: '\\[(\\|\\|)?\\]|\\(\\)',
        relevance: 0
      },
      hljs.COMMENT(
        '\\(\\*',
        '\\*\\)',
        { contains: [ 'self' ] }
      ),
      { /* type variable */
        className: 'symbol',
        begin: '\'[A-Za-z_](?!\')[\\w\']*'
        /* the grammar is ambiguous on how 'a'b should be interpreted but not the compiler */
      },
      { /* polymorphic variant */
        className: 'type',
        begin: '`[A-Z][\\w\']*'
      },
      { /* module or constructor */
        className: 'type',
        begin: '\\b[A-Z][\\w\']*',
        relevance: 0
      },
      { /* don't color identifiers, but safely catch all identifiers with ' */
        begin: '[a-z_]\\w*\'[\\w\']*',
        relevance: 0
      },
      hljs.APOS_STRING_MODE,
      hljs.inherit(hljs.QUOTE_STRING_MODE, { illegal: null }),
      {
        className: 'number',
        relevance: 0,
        variants: [
          { match: '\\b0[xX][a-fA-F0-9_]+[Lln]?' },
          { match: '\\b0[oO][0-7_]+[Lln]?' },
          { match: '\\b0[bB][01_]+[Lln]?' },
          { match: '\\b[0-9][0-9_]*([Lln]|(\\.[0-9_]*)?([eE][-+]?[0-9_]+)?)?' }
        ]
      },
      { begin: /->/ // relevance booster
      }
    ]
  };
}
