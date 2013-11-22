/*
Language: Delphi
*/

function(hljs) {
  var KEYWORDS =
    'exports register file shl array record property for mod while set ally label uses raise not ' +
    'stored class safecall var interface or private static exit index inherited to else stdcall ' +
    'override shr asm far resourcestring finalization packed virtual out and protected library do ' +
    'xorwrite goto near function end div overload object unit begin string on inline repeat until ' +
    'destructor write message program with read initialization except default nil if case cdecl in ' +
    'downto threadvar of try pascal const external constructor type public then implementation ' +
    'finally published procedure';
  var CURLY_COMMENT =  {
    className: 'comment',
    begin: /{/, end: /}/,
    relevance: 0
  };
  var PAREN_COMMENT = {
    className: 'comment',
    begin: /\(\*/, end: /\*\)/,
    relevance: 10
  };
  var STRING = {
    className: 'string',
    begin: /'/, end: /'/,
    contains: [{begin: /''/}],
    relevance: 0
  };
  var CHAR_STRING = {
    className: 'string', begin: /(#\d+)+/
  };
  var FUNCTION = {
    className: 'function',
    beginWithKeyword: true, end: /[:;]/,
    keywords: 'function constructor|10 destructor|10 procedure|10',
    contains: [
      {
        className: 'title', begin: hljs.IDENT_RE
      },
      {
        className: 'params',
        begin: /\(/, end: /\)/,
        keywords: KEYWORDS,
        contains: [STRING, CHAR_STRING]
      },
      CURLY_COMMENT, PAREN_COMMENT
    ]
  };
  return {
    case_insensitive: true,
    keywords: KEYWORDS,
    illegal: /("|\$[G-Zg-z]|\/\*|<\/)/,
    contains: [
      CURLY_COMMENT, PAREN_COMMENT, hljs.C_LINE_COMMENT_MODE,
      STRING, CHAR_STRING,
      hljs.NUMBER_MODE,
      FUNCTION
    ]
  };
}
