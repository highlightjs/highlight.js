/*
Language: Lua
Author: Andrew Fedorov <dmmdrs@mail.ru>
Category: scripting
*/

function(hljs) {
  var OPENING_LONG_BRACKET = '\\[=*\\[';
  var CLOSING_LONG_BRACKET = '\\]=*\\]';
  var LONG_BRACKETS = {
    begin: OPENING_LONG_BRACKET, end: CLOSING_LONG_BRACKET,
    contains: ['self']
  };
  var COMMENTS = [
    hljs.COMMENT('--(?!' + OPENING_LONG_BRACKET + ')', '$'),
    hljs.COMMENT(
      '--' + OPENING_LONG_BRACKET,
      CLOSING_LONG_BRACKET,
      {
        contains: [LONG_BRACKETS],
        relevance: 10
      }
    )
  ];
  return {
    lexemes: hljs.UNDERSCORE_IDENT_RE,
    keywords: {
      literal: 'true false nil',
      keyword: 'and break do else elseif end for if in local not or repeat return then until while',
      built_in:
        '_G _ENV _VERSION __index __newindex __mode __call __metatable __tostring __len' +
        '__gc __add __sub __mul __div __mod __pow __concat __unm __eq __lt __le assert' + 
        'collectgarbage dofile error getfenv getmetatable ipairs load loadfile loadstring' +
        'module next pairs pcall print rawequal rawlen rawget rawset require select self' +
        'setfenv setmetatable tonumber tostring type unpack xpcall coroutine debug io' +
        'math abs acos asin atan ceil cos deg exp floor fmod huge max maxinteger min' +
        'mininteger modf pi rad random randomseed sin sqrt tan tointeger ult os clock' +
        'date difftime execute exit getenv remove rename setlocale time tmpname string' +
        'byte char dump find format gfind gmatch gsub len lower match rep reverse sub' +
        'upper table concat insert maxn pack remove sort unpack'
    }, //TODO: Add the remaining libraries: IO, debug, coroutine and package.
    contains: COMMENTS.concat([
      {
        className: 'function',
        beginKeywords: 'function', end: '\\)',
        contains: [
          hljs.inherit(hljs.TITLE_MODE, {begin: '([_a-zA-Z]\\w*\\.)*([_a-zA-Z]\\w*:)?[_a-zA-Z]\\w*'}),
          {
            className: 'params',
            begin: '\\(', endsWithParent: true,
            contains: COMMENTS
          }
        ].concat(COMMENTS)
      },
      hljs.C_NUMBER_MODE,
      hljs.APOS_STRING_MODE,
      hljs.QUOTE_STRING_MODE,
      {
        className: 'string',
        begin: OPENING_LONG_BRACKET, end: CLOSING_LONG_BRACKET,
        contains: [LONG_BRACKETS],
        relevance: 5
      }
    ])
  };
}
