/*
Language: TLA+
Author: All-less <all.less.mail@gmail.com>
Category: misc
*/

function(hljs) {
  return {
    keywords: {
      keyword:
        'ASSUME ASSUMPTION AXIOM BOOLEAN CASE CONSTANT CONSTANTS ELSE EXCEPT EXTENDS FALSE ' +
        'IF IN INSTANCE LET LOCAL MODULE OTHER STRING THEN THEOREM LEMMA PROPOSITION COROLLARY ' +
        'TRUE VARIABLE VARIABLES WITH CHOOSE ENABLED UNCHANGED SUBSET UNION DOMAIN BY OBVIOUS ' +
        'HAVE QED TAKE DEF HIDE RECURSIVE USE DEFINE PROOF WITNESS PICK DEFS PROVE SUFFICES ' +
        'NEW LAMBDA STATE ACTION TEMPORAL ONLY OMITTED '
    },
    contains: [
      hljs.QUOTE_STRING_MODE,
      hljs.COMMENT('\\(\\*', '\\*\\)'),
      hljs.COMMENT('\\\\\\*', '$'),
      hljs.C_NUMBER_MODE,
      { begin: /\/\\/ } // relevance booster
    ]
  };
}
