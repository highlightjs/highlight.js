/*
Language: AngelScript
Author: Melissa Geels <melissa@nimble.tools>
Category: scripting
*/

function(hljs) {
  var builtInTypeMode = {
    className: 'built_in',
    begin: '\\b(void|bool|int|int8|int16|int32|int64|uint|uint8|uint16|uint32|uint64|string|ref|array|double|float|auto|dictionary)'
  };

  var objectHandleMode = {
    className: 'symbol',
    begin: '[a-zA-Z0-9_]+@'
  };

  var genericMode = {
    className: 'keyword',
    begin: '<', end: '>',
    contains: [ builtInTypeMode, objectHandleMode ]
  };

  builtInTypeMode.contains = [ genericMode ];
  objectHandleMode.contains = [ genericMode ];

  return {
    aliases: [ 'asc' ],

    keywords:
      'for in break continue while do return if else case switch namespace is cast ' +
      'or and xor not get in inout out override set private public const default ' +
      'final shared external mixin enum typedef funcdef this super import from interface',

    // avoid close detection with C#
    illegal: '^using\\s+[A-Za-z0-9_\\.]+;$',

    contains: [
      hljs.QUOTE_STRING_MODE, // "strings"
      hljs.APOS_STRING_MODE, // 'strings'

      // """heredoc strings"""
      {
        className: 'string',
        begin: '"""', end: '"""'
      },

      hljs.C_LINE_COMMENT_MODE, // single-line comments
      hljs.C_BLOCK_COMMENT_MODE, // comment blocks

      { // interface or namespace declaration
        beginKeywords: 'interface namespace', end: '{',
        contains: [
          { // interface or namespace name
            className: 'symbol',
            begin: '[a-zA-Z0-9_]+'
          }
        ]
      },

      { // class declaration
        beginKeywords: 'class', end: '{',
        contains: [
          { // class name
            className: 'symbol',
            begin: '[a-zA-Z0-9_]+',
            contains: [
              {
                begin: '[:,]\\s*',
                contains: [
                  {
                    className: 'symbol',
                    begin: '[a-zA-Z0-9_]+'
                  }
                ]
              }
            ]
          }
        ]
      },

      builtInTypeMode, // built-in types
      objectHandleMode, // object handles

      { // literals
        className: 'literal',
        begin: '\\b(null|true|false)'
      },

      { // numbers
        className: 'number',
        begin: '(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?f?|\\.\\d+f?)([eE][-+]?\\d+f?)?)'
      }
    ]
  };
}
