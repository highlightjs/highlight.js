/*
Language: Swift
Author: Chris Eidhof <chris@eidhof.nl>
*/


function(hljs) {
  return {
    aliases: ['swift'],
    keywords: {
      keyword:
         'class deinit enum extension func import init let protocol static ' +
         'struct subscript typealias var break case continue default do ' +
         'else fallthrough if in for return switch where while as dynamicType ' + 
         'is new super self Self Type __COLUMN__ __FILE__ __FUNCTION__ ' +
         '__LINE__ associativity didSet get infix inout left mutating none ' +
         'nonmutating operator override postfix precedence prefix right set '+ 
         'unowned unowned safe unsafe weak willSet',
      literal:
        'true false nil',
      built_in:
        ''
    },
    contains: [
      hljs.QUOTE_STRING_MODE,
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      hljs.C_NUMBER_MODE,
      {
        className: 'func',
        beginKeywords: 'func', end: /\{/, excludeEnd: true,
        contains: [
          hljs.inherit(hljs.TITLE_MODE, {begin: /[A-Za-z$_][0-9A-Za-z$_]*/}),
          {
            className: 'params',
            begin: /\(/, end: /\)/,
            contains: [
              hljs.C_LINE_COMMENT_MODE,
              hljs.C_BLOCK_COMMENT_MODE
            ],
            illegal: /["'\(]/
          }
        ],
        illegal: /\[|%/
      },
    ]
  };
}
