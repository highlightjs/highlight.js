/*
Language: CoffeeScript
Author: Dmytrii Nagirniak <dnagir@gmail.com>
Contributors: Oleg Efimov <efimovov@gmail.com>
Description: CoffeeScript is a programming language that transcompiles to JavaScript. For info about language see http://coffeescript.org/
*/

function(hljs) {
  var KEYWORDS = {
    keyword:
      // JS keywords
      'in if for while finally new do return else break catch instanceof throw try this ' +
      'switch continue typeof delete debugger super' +
      // Coffee keywords
      'then unless until loop of by when and or is isnt not extends',
    native: 'npm require console print module exports global window document',
    literal:
      // JS literals
      'true false null undefined ' +
      // Coffee literals
      'yes no on off ',
    reserved: 'case default function var void with const let enum export import native ' +
      '__hasProp __extends __slice __bind __indexOf'
  };
  var JS_IDENT_RE = '[A-Za-z$_][0-9A-Za-z$_]*';
  var JS_CONSTANT_RE = '\\b[A-Z][0-9A-Za-z$_]*';
  var TITLE = {className: 'title', begin: JS_IDENT_RE};
  var PROPERTY = {
    className: 'property',
    begin: '@(' + JS_IDENT_RE + ')*'
  }
  var CONSTANT = {
    className: 'constant',
    begin: JS_CONSTANT_RE
  }
  var OPERATORS = {
    className: 'operators',
    begin: '\\+|\\*|\\||/|-|&|=|&&=|==|===|!=|!==|\\|\\|=|\\|\\||&&|\\?'
  }
  var PUNCTUATION = {
    className: 'punctuation',
    begin: '\\$|\\(|:|\\)|\\{|\\}|\\[|\\]'
  }
  var SUBST_PUNCTUATION = {
    className: 'punctuation',
    begin: '\\$|\\(|:|\\)|\\[|\\]'
  }
  var SINGLE_QUOTE_STRING = {
    className: 'string',
    begin: '\'',
    end: '\'',
    markBegin: true,
    markEnd: true,
    contains: [hljs.BACKSLASH_ESCAPE],
    relevance: 0
  }
  var HEREDOCS_SIMPLE = {
    className: 'string',
    begin: "'''",
    end: "'''",
    markBegin: true,
    markEnd: true,
    contains: [hljs.BACKSLASH_ESCAPE],
  }
  var EMBEDDED =  {
    begin: '`',
    end: '`',
    markBegin: true,
    markEnd: true,
    className: 'embedded'
  }
  var REGEXP_CHAR_GROUP = {
    className: 'char_group',
    begin: '\\[',
    end: '\\]',
    markBegin: true,
    markEnd: true,
    contains: [
      hljs.BACKSLASH_ESCAPE
    ]
  }
  var REGEXP_RANGE = {
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
  var REGEXP_OPERATORS = {
    className: 'regexp_operators',
    begin: '\\(\\?:|\\?=|\\(\\?!|\\*|\\+|\\^|\\?|\\$|\\(|\\)'
  }
  var REGEXP = {
    className: 'regexp',
    begin: '/[^\\s]',
    end: '/[gim]*(\\b|[,.)]|$)',
    illegal: '\\n',
    returnBegin: true,
    markBegin: true,
    markEnd: true,
    contains: [
      REGEXP_CHAR_GROUP,
      hljs.BACKSLASH_ESCAPE,
      REGEXP_RANGE,
      REGEXP_OPERATORS
    ]
  }
  var HASH_KEY = {
    className: 'hash',
    begin: '@?' + JS_IDENT_RE+'\\s*:',
    returnBegin: true,
    end: ':',
    markEnd: true
  }
  var SUBST = {
    className: 'subst',
    begin: '#\\{',
    end: '\\}',
    markBegin: true,
    markEnd: true,
    keywords: KEYWORDS,
    contains: [
      hljs.BINARY_NUMBER_MODE,
      hljs.C_NUMBER_MODE,
      SINGLE_QUOTE_STRING,
      {
        className: 'string',
        begin: '"',
        end: '"',
        markBegin: true,
        markEnd: true,
        contains: [hljs.BACKSLASH_ESCAPE],
        relevance: 0
      },
      REGEXP,
      OPERATORS,
      SUBST_PUNCTUATION,
      CONSTANT,
      PROPERTY
    ]
  }
  var HEREDOCS_DOUBLE = {
    className: 'heredocs',
    begin: '"""',
    end: '"""',
    markBegin: true,
    markEnd: true,
    contains: [hljs.BACKSLASH_ESCAPE, SUBST],
  }
  var DOUBLE_QUOTE_STRING = {
    className: 'string',
    begin: '"',
    end: '"',
    markBegin: true,
    markEnd: true,
    contains: [hljs.BACKSLASH_ESCAPE, SUBST],
    relevance: 0
  }
  var HEREREGEXP = {
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
      HEREREGEXP,
      REGEXP,
      EMBEDDED,
      // Comments
      {
        className: 'comment',
        begin: '###',
        end: '###',
        markBegin: true,
        markEnd: true
      },
      hljs.HASH_COMMENT_MODE,
      {
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
      },
      {
        className: 'class',
        beginWithKeyword: true,
        keywords: 'class',
        markBegin: true,
        markEnd: true,
        end: '\\s*' + JS_IDENT_RE
      },
      OPERATORS,
      PUNCTUATION,
      HASH_KEY,
      CONSTANT,
      PROPERTY
    ]
  };
}
