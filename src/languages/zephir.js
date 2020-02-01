/*
 Language: Zephir
 Description: Zephir, an open source, high-level language designed to ease the creation and maintainability of extensions for PHP with a focus on type and memory safety.
 Author: Oleg Efimov <efimovov@gmail.com>
 Website: https://zephir-lang.com/en
 */

function(hljs) {
  var STRING = {
    className: 'string',
    contains: [hljs.BACKSLASH_ESCAPE],
    variants: [
      {
        begin: 'b"', end: '"'
      },
      {
        begin: 'b\'', end: '\''
      },
      hljs.inherit(hljs.APOS_STRING_MODE, {illegal: null}),
      hljs.inherit(hljs.QUOTE_STRING_MODE, {illegal: null})
    ]
  };
  var TITLE_MODE = hljs.UNDERSCORE_TITLE_MODE;
  var NUMBER = {variants: [hljs.BINARY_NUMBER_MODE, hljs.C_NUMBER_MODE]};
  return {
    aliases: ['zep'],
    case_insensitive: true,
    keywords:
      'and include_once list  global   interface as  endswitch ' +
      'null  endwhile or endforeach self   ' +
      'exit foreach include  require_once do xor ' +
      'parent clone  print eval  ' +
      'catch  exception default die ' +
      'enddeclare try endfor endif declare unset ' +
      'trait goto instanceof insteadof ' +
      'yield finally int uchar bool ' +

      // classes and objects
      'namespace class use extends ' +
      'function return ' +
      'abstract final public protected private static deprecated ' +
      // error handling
      'throw catch Exception ' +
      // keyword-ish things their website does NOT seem to highlight (in their own snippets)
      // 'typeof fetch ' +
      // operators/helpers
      'echo empty isset ' +
      // assignment/variables
      'let var new const ' +
      // control
      'require ' +
      'if else elseif switch case ' +
      'while loop for continue break ' +
      // magic constants
      // https://github.com/phalcon/zephir/blob/master/Library/Expression/Constants.php
      '__LINE__ __FILE__ __DIR__ __FUNCTION__ __CLASS__ __TRAIT__ __METHOD__ __NAMESPACE__ ' +
      // types - https://docs.zephir-lang.com/0.12/en/types
      'array boolean float double integer object resource string ' +
      'char long unsigned uint ulong ' +
      // optimizations
      'likely unlikely ' +
      // built-ins
      'true false null undefined',
    contains: [
      hljs.C_LINE_COMMENT_MODE,
      hljs.COMMENT(
        '/\\*',
        '\\*/',
        {
          contains: [
            {
              className: 'doctag',
              begin: '@[A-Za-z]+'
            }
          ]
        }
      ),
      {
        className: 'string',
        begin: '<<<[\'"]?\\w+[\'"]?$', end: '^\\w+;',
        contains: [hljs.BACKSLASH_ESCAPE]
      },
      {
        // swallow composed identifiers to avoid parsing them as keywords
        begin: /(::|->)+[a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff]*/
      },
      {
        className: 'function',
        beginKeywords: 'function', end: /[;{]/, excludeEnd: true,
        illegal: '\\$|\\[|%',
        contains: [
          TITLE_MODE,
          {
            className: 'params',
            begin: '\\(', end: '\\)',
            contains: [
              'self',
              hljs.C_BLOCK_COMMENT_MODE,
              STRING,
              NUMBER
            ]
          }
        ]
      },
      {
        className: 'class',
        beginKeywords: 'class interface', end: '{', excludeEnd: true,
        illegal: /[:\(\$"]/,
        contains: [
          {beginKeywords: 'extends implements'},
          TITLE_MODE
        ]
      },
      {
        beginKeywords: 'namespace', end: ';',
        illegal: /[\.']/,
        contains: [TITLE_MODE]
      },
      {
        beginKeywords: 'use', end: ';',
        contains: [TITLE_MODE]
      },
      {
        begin: '=>' // No markup, just a relevance booster
      },
      STRING,
      NUMBER
    ]
  };
}
