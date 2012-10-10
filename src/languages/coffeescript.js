/*
Language: CoffeeScript
Author: Dmytrii Nagirniak <dnagir@gmail.com>
Contributors: Oleg Efimov <efimovov@gmail.com>, Cédric Néhémie <cedric.nehemie@gmail.com>
Description: CoffeeScript is a programming language that transcompiles to JavaScript. For info about language see http://coffeescript.org/

Styles defined for the coffeescript language:

char_range        // for [a-b]
char_range_begin
char_range_end
class
class_begin
class_end
comment
comment_begin     // only with ### ... ### comments
comment_end       // only with ### ... ### comments
constant
embedded
embedded_begin
embedded_end
escaped
function
global
hash
hash_begin
hash_end
heredocs
heredocs_begin
heredocs_end
hereregexp
keyword
literal
number
operators
params
params_begin
params_end
property
property_end     // match the : in object literals and class members
punctuation
regexp
regexp_operators // ?, ^, $, etc...
string
string_begin
string_end
subst
subst_begin
subst_end
title
*/

function(hljs) {
  var KEYWORDS, JS_IDENT_RE, JS_CONSTANT_RE, PROPERTY, CONSTANT, OPERATORS, PUNCTUATION, SINGLE_QUOTE_STRING, DOUBLE_QUOTE_STRING, DOUBLE_QUOTE_STRING_NO_INTERPOLATION, HEREDOCS_SIMPLE, HEREDOCS_DOUBLE,REGEXP, HEREREGEXP, CLASS, FUNCTION, COMMENTS, EMBEDDED, REGEXP_RANGE, REGEXP_OPERATORS, REGEXP_CHAR_GROUP, HASH, HASH_KEY, HASH_COMMENT_MODE, NO_INTERPOLATION, SUBST, SHADOWED, SHADOWS, CODE_CONTENT;

  KEYWORDS = {
    keyword:
      // JS keywords
      'in if for while finally new do return else break catch instanceof throw try this ' +
      'switch continue typeof delete debugger super ' +
      // Coffee keywords
      'then unless until loop of by when and or is isnt not extends',
    global: 'require console print module exports global window document',
    literal:
      // JS literals
      'true false null undefined ' +
      // Coffee literals
      'yes no on off ',
    reserved: 'case default function var void with const let enum export import native ' +
      '__hasProp __extends __slice __bind __indexOf'
  };
  JS_IDENT_RE = '[A-Za-z$_][0-9A-Za-z$_]*';
  JS_CONSTANT_RE = '\\b[A-Z][0-9A-Za-z$_]*';

  /*
    To have circular references between modes the modes are shadowed with
    pre-defined objects that are populated at the end of the file.

    This array list the modes to shadow.
  */
  SHADOWED = [
    'HEREDOCS_DOUBLE',
    'HEREDOCS_SIMPLE',
    'SINGLE_QUOTE_STRING',
    'DOUBLE_QUOTE_STRING',
    'HEREREGEXP',
    'REGEXP',
    'EMBEDDED',
    'FUNCTION',
    'CLASS',
    'OPERATORS',
    'HASH',
    'PUNCTUATION',
    'HASH_KEY',
    'CONSTANT',
    'PROPERTY'
  ]
  // Stores the shadow instances.
  SHADOWS = {};
  for(var i=0; i<SHADOWED.length; i++) SHADOWS[SHADOWED[i]] = {};
  // Stores the real instances.
  REALS = {};

  PROPERTY = REALS['PROPERTY'] = {
    className: 'property',
    begin: '@(' + JS_IDENT_RE + ')*'
  }
  CONSTANT = REALS['CONSTANT'] = {
    className: 'constant',
    begin: JS_CONSTANT_RE
  }
  OPERATORS = REALS['OPERATORS'] = {
    className: 'operators',
    begin: '\\+|\\*|\\||/|-|&|=|&&=|==|===|!=|!==|\\|\\|=|\\|\\||&&|\\?'
  }
  PUNCTUATION = REALS['PUNCTUATION'] = {
    className: 'punctuation',
    begin: '\\$|\\(|:|\\)|\\[|\\]|\\.|,'
  }
  NO_INTERPOLATION = REALS['NO_INTERPOLATION'] = {
    className: 'string_quote',
    begin: '#\\{',
    end: '\\}'
  }
  SINGLE_QUOTE_STRING = REALS['SINGLE_QUOTE_STRING'] = {
    className: 'string',
    begin: '\'',
    end: '\'',
    markBegin: true,
    markEnd: true,
    contains: [
      hljs.BACKSLASH_ESCAPE,
      NO_INTERPOLATION,
    ],
    relevance: 0
  }
  DOUBLE_QUOTE_STRING_NO_INTERPOLATION = REALS['DOUBLE_QUOTE_STRING_NO_INTERPOLATION'] = {
    className: 'string',
    begin: '"',
    end: '"',
    markBegin: true,
    markEnd: true,
    contains: [hljs.BACKSLASH_ESCAPE],
    relevance: 0
  }
  HEREDOCS_SIMPLE = REALS['HEREDOCS_SIMPLE'] = {
    className: 'string',
    begin: "'''",
    end: "'''",
    markBegin: true,
    markEnd: true,
    contains: [
      hljs.BACKSLASH_ESCAPE,
      NO_INTERPOLATION
    ],
  }
  EMBEDDED = REALS['EMBEDDED'] =  {
    begin: '`',
    end: '`',
    markBegin: true,
    markEnd: true,
    className: 'embedded'
  }
  REGEXP_CHAR_GROUP = REALS['REGEXP_CHAR_GROUP'] = {
    className: 'char_range',
    begin: '\\[',
    end: '\\]',
    markBegin: true,
    markEnd: true,
    contains: [
      hljs.BACKSLASH_ESCAPE
    ]
  }
  REGEXP_RANGE = REALS['REGEXP_RANGE'] = {
    className: 'range',
    begin: '\\{',
    end: '\\}',
    markBegin: true,
    markEnd: true,
    contains: [
      hljs.C_NUMBER_MODE,
      {
        className: 'punctuation',
        begin: ','
      }
    ]
  }
  REGEXP_OPERATORS = REALS['REGEXP_OPERATORS'] = {
    className: 'regexp_operators',
    begin: '\\(\\?:|\\?=|\\(\\?!|\\*|\\+|\\^|\\?|\\$|\\(|\\)'
  }
  REGEXP = REALS['REGEXP'] = {
    className: 'regexp',
    begin: '/[^\\s]',
    end: '/[gim]*(\\b|[,.)\\}\\]]|$)',
    illegal: '\\n',
    returnBegin: true,
    endCaptures: {
      '1' : 'punctuation'
    },
    contains: [
      REGEXP_CHAR_GROUP,
      hljs.BACKSLASH_ESCAPE,
      REGEXP_RANGE,
      REGEXP_OPERATORS
    ]
  }
  HASH_KEY = REALS['HASH_KEY'] = {
    className: 'property',
    begin: '@?' + JS_IDENT_RE+'\\s*:',
    returnBegin: true,
    end: ':',
    endCaptures: {
      '0' : 'punctuation'
    }
  }
  SUBST = REALS['SUBST'] = {
    className: 'subst',
    begin: '#\\{',
    end: '\\}',
    markBegin: true,
    markEnd: true,
    keywords: KEYWORDS,
    contains: [
      // Numbers
      hljs.BINARY_NUMBER_MODE,
      hljs.C_NUMBER_MODE,
      // Strings
      SHADOWS['HEREDOCS_DOUBLE'],
      SHADOWS['HEREDOCS_SIMPLE'],
      SHADOWS['SINGLE_QUOTE_STRING'],
      SHADOWS['DOUBLE_QUOTE_STRING'],
      // RegExps
      SHADOWS['HEREREGEXP'],
      SHADOWS['REGEXP'],
      // Javascript
      SHADOWS['EMBEDDED'],
      // Entity
      SHADOWS['FUNCTION'],
      SHADOWS['CLASS'],
      SHADOWS['HASH'],
      SHADOWS['HASH_KEY'],
      // Punctations
      SHADOWS['OPERATORS'],
      SHADOWS['PUNCTUATION'],
      // Words
      SHADOWS['CONSTANT'],
      SHADOWS['PROPERTY']
    ]
  }
  HEREDOCS_DOUBLE = REALS['HEREDOCS_DOUBLE'] = {
    className: 'heredocs',
    begin: '"""',
    end: '"""',
    markBegin: true,
    markEnd: true,
    contains: [
      hljs.BACKSLASH_ESCAPE,
      SUBST
    ],
  }
  DOUBLE_QUOTE_STRING = REALS['DOUBLE_QUOTE_STRING'] = {
    className: 'string',
    begin: '"',
    end: '"',
    markBegin: true,
    markEnd: true,
    contains: [
      hljs.BACKSLASH_ESCAPE,
      SUBST
    ],
    relevance: 0
  }
  HASH = REALS['HASH'] = {
    className: 'hash',
    begin: '\\{',
    end: '\\}',
    markBegin: true,
    markEnd: true,
    contains: [
      HASH_KEY,
      DOUBLE_QUOTE_STRING,
      SINGLE_QUOTE_STRING,
      hljs.C_NUMBER_MODE
    ]
  }

  HEREREGEXP = REALS['HEREREGEXP'] = {
    className: 'hereregexp',
    begin: '///',
    end: '///[gim]*',
    markBegin: true,
    markEnd: true,
    contains: [
      SUBST,
      hljs.HASH_COMMENT_MODE,
      REGEXP_CHAR_GROUP,
      hljs.BACKSLASH_ESCAPE,
      REGEXP_RANGE,
      REGEXP_OPERATORS
    ]
  }
  COMMENTS = REALS['COMMENTS'] = {
    className: 'comment',
    begin: '###',
    end: '###',
    markBegin: true,
    markEnd: true
  }
  FUNCTION = REALS['FUNCTION'] = {
    className: 'function',
    begin: '(\\([^)]+\\))?\\s*[-=]>',
    returnBegin: true,
    end: '>',
    keywords: KEYWORDS,
    contains: [
      {
        className: 'params',
        begin: '\\(',
        end: '\\)',
        markBegin: true,
        markEnd: true,
        contains: [
          HEREDOCS_SIMPLE,
          HEREDOCS_DOUBLE,
          SINGLE_QUOTE_STRING,
          DOUBLE_QUOTE_STRING,
          HEREREGEXP,
          REGEXP,
          OPERATORS,
          CONSTANT,
          PROPERTY
        ]
      }
    ]
  }
  CLASS = REALS['CLASS'] = {
    className: 'class',
    beginWithKeyword: true,
    keywords: 'class',
    end: '\\s*(' + JS_IDENT_RE + ')',
    endCaptures: {
      '1': 'title'
    }
  }

  // Here the shadowing is perfected, content of shadowed modes
  // is pasted in the shadows.
  for(var i=0; i<SHADOWED.length; i++){
    k = SHADOWED[i]
    o = REALS[k]
    for(var key in o)
      SHADOWS[k][key] = o[key]
  }

  return {
    keywords: KEYWORDS,
    contains: [
      // Numbers
      hljs.BINARY_NUMBER_MODE,
      hljs.C_NUMBER_MODE,
      // Strings
      HEREDOCS_DOUBLE,
      HEREDOCS_SIMPLE,
      SINGLE_QUOTE_STRING,
      DOUBLE_QUOTE_STRING,
      // RegExps
      HEREREGEXP,
      REGEXP,
      // Javascript
      EMBEDDED,
      // Comments
      COMMENTS,
      hljs.HASH_COMMENT_MODE,
      // Entity
      FUNCTION,
      CLASS,
      HASH,
      HASH_KEY,
      // Punctuation
      OPERATORS,
      PUNCTUATION,
      // Words
      CONSTANT,
      PROPERTY
    ]
  };
}
