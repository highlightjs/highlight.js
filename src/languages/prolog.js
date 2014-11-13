/*
Language: Prolog
Description: Prolog is a general purpose logic programming language associated with artificial intelligence and computational linguistics.
Author: Raivo Laanemets <raivo@infdot.com>
*/

function(hljs) {

  var ATOM = {

    className: 'atom',
    begin: /[a-z][A-Za-z0-9_]*/,
    relevance: 0
  };

  var VAR = {

    className: 'variable',
    begin: /[A-Z][a-zA-Z0-9_]*/,
    relevance: 0
  };

  var ANON_VAR = {

    className: 'variable',
    begin: /_[A-Za-z0-9_]*/,
    relevance: 0
  };

  var PARENTED = {

    begin: /\(/,
    end: /\)/
  };

  var LIST = {

    begin: /\[/,
    end: /\]/
  };

  var LINE_COMMENT = {

    className: 'comment',
    begin: /%/, end: /$/,
    contains: [hljs.PHRASAL_WORDS_MODE]
  };

  var BACKTICK_STRING = {

    className: 'string',
    begin: /`/, end: /`/,
    contains: [hljs.BACKSLASH_ESCAPE]
  };

  var CHAR_CODE = {

    className: 'string', // 0'a etc.
    begin: /0\'(\\\'|.)/
  };

  var SPACE_CODE = {

    className: 'string',
    begin: /0\'\\s/ // 0'\s
  };

  var PRED_OP = {

    begin: /:\-/,
    relevance: 10 // boost for :- operator, makes difference from Erlang
  };

  var END_DOT = {

    begin: /\.$/ // boost for dots used at line ends
  };

  var inner = [

    ATOM,
    VAR,
    ANON_VAR,
    PARENTED,
    PRED_OP,
    LIST,
    LINE_COMMENT,
    hljs.C_BLOCK_COMMENT_MODE,
    hljs.QUOTE_STRING_MODE,
    hljs.APOS_STRING_MODE,
    BACKTICK_STRING,
    CHAR_CODE,
    SPACE_CODE,
    hljs.C_NUMBER_MODE
  ];

  PARENTED.contains = inner;
  LIST.contains = inner;

  var top = inner.slice(0);

  top.push(END_DOT);

  return {

    contains: top
  };
}
