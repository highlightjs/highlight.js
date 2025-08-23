/*
Language: Ruchy
Description: Ruchy is a systems programming language with built-in actor model support and functional programming features
Author: Ruchy Language Team
Website: https://ruchy-lang.org
Category: system
*/

export default function(hljs) {
  // Keywords organized by category for better maintainability
  const KEYWORDS = {
    keyword: [
      // Control flow
      'if', 'else', 'match', 'case', 'for', 'while', 'loop', 'break', 'continue', 'return',
      // Declarations
      'fn', 'let', 'mut', 'const', 'static', 'struct', 'enum', 'trait', 'impl', 'type', 'mod', 'use',
      // Modifiers
      'pub', 'async', 'await', 'unsafe', 'extern', 'move', 'ref', 'box',
      // Actor keywords (Ruchy-specific)
      'actor', 'spawn', 'send',
      // Special identifiers
      'self', 'Self', 'super', 'crate', 'as', 'in', 'where'
    ].join(' '),
    
    type: [
      // Primitive types
      'bool', 'char', 'str',
      // Integer types
      'i8', 'i16', 'i32', 'i64', 'i128', 'isize',
      'u8', 'u16', 'u32', 'u64', 'u128', 'usize',
      // Float types
      'f32', 'f64',
      // Standard library types
      'String', 'Vec', 'HashMap', 'HashSet', 'Result', 'Option',
      'Box', 'Rc', 'Arc'
    ].join(' '),
    
    literal: 'true false Some None Ok Err'
  };

  const OPERATORS = {
    className: 'operator',
    variants: [
      // Pipeline operator (Ruchy-specific)
      { begin: '>>' },
      // Actor operators (Ruchy-specific)
      { begin: '<-|<\\?' },
      // Regular operators
      { begin: '[=!<>+\\-*/%&|^~:?]+' },
      { begin: '\\.\\.=?' },
      { begin: '=>' },
      { begin: '->' },
      { begin: '::' }
    ]
  };

  const LIFETIME = {
    className: 'symbol',
    begin: '\'[a-z_]\\w*'
  };

  const FUNCTION_DEFINITION = {
    className: 'function',
    beginKeywords: 'fn',
    end: '\\(',
    excludeEnd: true,
    contains: [hljs.UNDERSCORE_TITLE_MODE]
  };

  const ACTOR_DEFINITION = {
    className: 'class',
    beginKeywords: 'actor',
    end: '\\{',
    excludeEnd: true,
    contains: [hljs.UNDERSCORE_TITLE_MODE]
  };

  const TYPE_DEFINITION = {
    className: 'class',
    beginKeywords: 'struct enum trait type',
    end: '[\\{\\(;]',
    excludeEnd: true,
    contains: [hljs.UNDERSCORE_TITLE_MODE]
  };

  const MACRO_INVOCATION = {
    className: 'built_in',
    begin: '\\w+!'
  };

  const ATTRIBUTE = {
    className: 'meta',
    begin: '#!?\\[[^\\]]*\\]'
  };

  const NUMBER = {
    className: 'number',
    variants: [
      // Binary literals
      { begin: '\\b0b[01_]+(?:[iu](?:8|16|32|64|128|size))?\\b' },
      // Octal literals
      { begin: '\\b0o[0-7_]+(?:[iu](?:8|16|32|64|128|size))?\\b' },
      // Hexadecimal literals
      { begin: '\\b0x[0-9a-fA-F_]+(?:[iu](?:8|16|32|64|128|size))?\\b' },
      // Float literals
      { begin: '\\b\\d[\\d_]*\\.\\d[\\d_]*(?:[eE][+-]?\\d[\\d_]+)?(?:f32|f64)?\\b' },
      { begin: '\\b\\d[\\d_]*(?:[eE][+-]?\\d[\\d_]+)(?:f32|f64)?\\b' },
      { begin: '\\b\\d[\\d_]*(?:f32|f64)\\b' },
      // Integer literals with type suffixes
      { begin: '\\b\\d[\\d_]*(?:[iu](?:8|16|32|64|128|size))?\\b' }
    ]
  };

  const RAW_STRING = {
    className: 'string',
    begin: 'r#*"',
    end: '"#*',
    contains: []
  };

  const STRING = {
    className: 'string',
    begin: '"',
    end: '"',
    contains: [
      hljs.BACKSLASH_ESCAPE,
      {
        className: 'subst',
        begin: '\\$\\{',
        end: '\\}',
        contains: []
      }
    ]
  };

  const CHAR = {
    className: 'string',
    begin: '\'[^\']*\''
  };

  const COMMENT_DOC = {
    className: 'comment',
    variants: [
      { begin: '///', end: '$' },
      { begin: '/\\*\\*', end: '\\*/' }
    ],
    contains: [
      {
        className: 'doctag',
        begin: '@\\w+'
      }
    ]
  };

  const COMMENT = {
    className: 'comment',
    variants: [
      { begin: '//', end: '$' },
      { begin: '/\\*', end: '\\*/' }
    ],
    contains: [
      {
        className: 'keyword',
        begin: '\\b(?:TODO|FIXME|NOTE|HACK|XXX|BUG|DEBT|WORKAROUND)\\b'
      }
    ]
  };

  // Set up recursive references for string interpolation
  STRING.contains[1].contains = [
    hljs.UNDERSCORE_IDENT_MODE,
    NUMBER,
    OPERATORS
  ];

  return {
    name: 'Ruchy',
    aliases: ['rhy'],
    keywords: KEYWORDS,
    illegal: '</',
    contains: [
      COMMENT_DOC,
      COMMENT,
      LIFETIME,
      FUNCTION_DEFINITION,
      ACTOR_DEFINITION,
      TYPE_DEFINITION,
      MACRO_INVOCATION,
      ATTRIBUTE,
      RAW_STRING,
      STRING,
      CHAR,
      NUMBER,
      OPERATORS,
      {
        className: 'punctuation',
        begin: '[{}\\[\\];():]'
      }
    ]
  };
}