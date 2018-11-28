/*
Language: Dream Maker
Author: Pieter-Jan Briers <pieterjan.briers@gmail.com>
Various bits taken from Javascript, Rust and C++'s file. 
Description: Dream Maker language used by the BYOND game engine.
Category: common
*/

function(hljs) {
  var BLOCK_COMMENT = hljs.COMMENT('/\\*', '\\*/', {contains: ['self']});
  var KEYWORDS =
    'var proc verb global tmp static const set as ' +
    'new del ' + 
    'sleep spawn break continue do else for in step goto if return switch while try catch throw';
  var BUILTINS = 
    'usr src world args ' +
    'list datum area turf obj mob atom movable client database exception ' +
    'icon image matrix mutable_appearance savefile sound regex operator';
  var LITERAL = 'null';
  var SUBST = {
    className: 'subst',
    begin: '\\[', end: '\\]',
    keywords: {
      built_in: BUILTINS,
      literal: LITERAL
    },
    contains: []  // defined later
  };
  var STRING = {
    className: 'string',
    begin: '"', end: '"',
    contains: [
      hljs.BACKSLASH_ESCAPE,
      SUBST
    ]
  };
  var STRING_MULTILINE = {
    className: 'string',
    begin: '\\{"', end: '"\\}',
    contains: [
      hljs.BACKSLASH_ESCAPE,
      SUBST
    ]
  };
  var FILE_STRING = {
    className: 'string',
    begin: "'", end: "'"
  };
  var NUMBER = {
    className: 'number',
    variants: [
      { begin: '1\\.\\#IND' },
      { begin: '1\\.\\#INF' },
      { begin: hljs.C_NUMBER_RE },
    ],
    relevance: 0
  };
  var CONSTANT = {
    className: 'literal',
    begin: /\b[A-Z_][A-Z_0-9]*\b/
  };
  var PREPROCESSOR = {
    className: 'meta',
    begin: /#\s*[a-z]+\b/, end: /$/,
    keywords: {
      'meta-keyword':
        'if else elif endif define undef warn error ' +
        'ifdef ifndef include'
    },
    contains: [
      {
        begin: /\\\n/, relevance: 0
      },
      STRING,
      FILE_STRING,
      NUMBER,
      CONSTANT,
      hljs.C_LINE_COMMENT_MODE,
      BLOCK_COMMENT,
    ]
  };
  SUBST.contains = [
    STRING,
    FILE_STRING,
    NUMBER,
    CONSTANT
  ];
  return {
    aliases: ['byond', 'dreammaker'],
    keywords: {
      keyword: KEYWORDS,
      literal: LITERAL,
      built_in: BUILTINS
    },
    contains: [
      hljs.C_LINE_COMMENT_MODE,
      BLOCK_COMMENT,
      PREPROCESSOR,
      STRING,
      FILE_STRING,
      STRING_MULTILINE,
      NUMBER,
      CONSTANT
    ]
  }
}
