/*
Language: Logtalk
Author: Paulo Moura <pmoura@logtalk.org>
Description: Logtalk is an object-oriented logic programming language that extends and leverages the Prolog language with a feature set suitable for programming in the large.
*/

function(hljs) {

  var ATOMS = {
    className: 'atom',
    begin: /[a-z][A-Za-z0-9_]*/,
    relevance: 0
  };

  var QUOTED_ATOMS = {
    className: 'string',
    begin: /'/, end: /'/,
    contains: [hljs.BACKSLASH_ESCAPE],
    illegal: /\n/,
    relevance: 0
  };

  var VARIABLES = {
    className: 'symbol',
    variants: [
      {begin: /[A-Z][a-zA-Z0-9_]*/},
      {begin: /_[A-Za-z0-9_]*/},
    ],
    relevance: 0
  };

  var NUMBERS = {
    className: 'number',
    begin: /0\'.|0b[0-1]+|0o[0-7]+|0x[0-9a-fA-F]+|[0-9]+(\.[0-9]+)?([eE]([-+])?[0-9]+)?/,
    relevance: 0
  };

  var CURLY_BRACKTED_TERMS = {
    begin: /(?!#)\{/, end: /\}/,
    relevance: 0
  };

  var DOUBLE_QUOTE_STRINGS = hljs.QUOTE_STRING_MODE;

  var BACKTICK_STRINGS = {
    className: 'string',
    begin: /`/, end: /`/,
    contains: [hljs.BACKSLASH_ESCAPE]
  };

  var PARENTED = {
    begin: /\(/, end: /\)/,
    relevance: 0
  };

  var LISTS = {
    begin: /\[/, end: /\]/,
    relevance: 0
  };

  var LINE_COMMENTS = {
    className: 'comment',
    begin: /%/, end: /$/,
    relevance: 0
  };

  var BLOCK_COMMENTS = hljs.C_BLOCK_COMMENT_MODE;

  var HEAD_BODY_CONJUNCTION = {
    className: 'built_in',
    begin: /:-|-->/,
    relevance: 2
  };

  var MESSAGE_SENDING = {
    className: 'built_in',
    begin: /\b::(?!=)\b/,
    relevance: 10
  };

  var SUPER_CALL = {
    className: 'built_in',
    begin: /\b\^\^\b/,
    relevance: 10
  };

  var BASIC_TERMS = [
    ATOMS,
    QUOTED_ATOMS,
    VARIABLES,
    NUMBERS,
    CURLY_BRACKTED_TERMS,
    DOUBLE_QUOTE_STRINGS,
    BACKTICK_STRINGS,
    PARENTED,
    LISTS
  ];

  var PARAMETERS = {
    className: 'params',
    begin: /\(/, end: /\)/
  };

  var DIRECTIVES = {
    className: 'keyword',
    begin: /^\s*:-\s+[a-z][a-z_]+\b/, end: '\\.',
    relevance: 5,
    excludeBegin: false,
    excludeEnd: false,
    returnBegin: false,
    contains: [PARAMETERS]
  };

  var inner = [
    DIRECTIVES,
    MESSAGE_SENDING,
    SUPER_CALL,
    HEAD_BODY_CONJUNCTION,
    ATOMS,
    QUOTED_ATOMS,
    VARIABLES,
    NUMBERS,
    PARENTED,
    LISTS,
    CURLY_BRACKTED_TERMS,
    LINE_COMMENTS,
    BLOCK_COMMENTS,
    BACKTICK_STRINGS,
    DOUBLE_QUOTE_STRINGS
  ];

  PARENTED.contains = BASIC_TERMS;
  LISTS.contains = BASIC_TERMS;
  CURLY_BRACKTED_TERMS.contains = BASIC_TERMS;
  PARAMETERS.contains = BASIC_TERMS;

  return {
    aliases: ['lgt'],
    case_insensitive: false,
    contains: inner.concat([
      {begin: /:-/} // relevance booster
    ])
  };
}
