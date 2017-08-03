/*
Language: Yara
Author: Kiran Tambe <kiran.tambe08@gmail.com>
Description: The pattern matching swiss knife http://virustotal.github.io/yara//
Category: security
*/

function(hljs) {
  var YARA_KEYWORDS = {
    keyword:
      'all and any ascii at condition contains entrypoint false filesize ' +
      'fullword for global in import include int8 int16 int32 int8be int16be ' +
      'int32be matches meta nocase not or of private rule strings them true ' +
      'uint8 uint16 uint32 uint8be uint16be uint32be wide',
    literal:
       'true false',
  };
  return {
    aliases: ['yara'],
    keywords: YARA_KEYWORDS,
    illegal: '</',
    contains: [
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      {
        className: 'string',
        begin: /"/, end: /"/,
        contains: [
          hljs.BACKSLASH_ESCAPE,
        ]
      },
      {
        className: 'variable',
        variants: [
          {begin: /\$[\w\d#@][\w\d_]*/},
          {begin: /\$\{(.*?)}/}
        ]
      }
    ]
  };
}
