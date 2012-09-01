/*
Language: CoffeeScript
Author: Dmytrii Nagirniak <dnagir@gmail.com>
Contributors: Oleg Efimov <efimovov@gmail.com>
Description: CoffeeScript is a programming language that transcompiles to JavaScript. For info about language see http://coffeescript.org/
*/

function(hljs) {
  var keywords = {
    keyword:
      // JS keywords
      'in if for while finally new do return else break catch instanceof throw try this ' +
      'switch continue typeof delete debugger super ' +
      // Coffee keywords
      'then unless until loop of by when and or is isnt not',
    literal:
      // JS literals
      'true false null undefined ' +
      // Coffee literals
      'yes no on off ',
    reserved: 'case default function var void with const let enum export import native ' +
      '__hasProp __extends __slice __bind __indexOf'
  };

  var JS_IDENT_RE = '[A-Za-z$_][0-9A-Za-z$_]*';

  var TITLE = {className: 'title', begin: JS_IDENT_RE};

  var COFFEE_QUOTE_STRING_SUBST_MODE = {
    className: 'subst',
    begin: '#\\{', end: '}',
    keywords: keywords,
    contains: [hljs.C_NUMBER_MODE, hljs.BINARY_NUMBER_MODE]
  };

  var COFFEE_QUOTE_STRING_MODE = {
    className: 'string',
    begin: '"', end: '"',
    relevance: 0,
    contains: [hljs.BACKSLASH_ESCAPE, COFFEE_QUOTE_STRING_SUBST_MODE]
  };

  var COFFEE_HEREDOC_MODE = {
    className: 'string',
    begin: '"""', end: '"""',
    contains: [hljs.BACKSLASH_ESCAPE, COFFEE_QUOTE_STRING_SUBST_MODE]
  };

  var COFFEE_HERECOMMENT_MODE = {
    className: 'comment',
    begin: '###', end: '###'
  };

  var COFFEE_HEREGEX_MODE = {
    className: 'regexp',
    begin: '///', end: '///',
    contains: [hljs.HASH_COMMENT_MODE]
  };

  var COFFEE_EMPTY_REGEX_MODE = {
    className: 'regexp', begin: '//[gim]*'
  };

  var COFFEE_REGEX_MODE = {
    className: 'regexp',
    begin: '/\\S(\\\\.|[^\\n])*/[gim]*' // \S is required to parse x / 2 / 3 as two divisions
  };

  var COFFEE_FUNCTION_DECLARATION_MODE = {
    className: 'function',
    begin: JS_IDENT_RE + '\\s*=\\s*(\\(.+\\))?\\s*[-=]>',
    returnBegin: true,
    contains: [
      TITLE,
      {
        className: 'params',
        begin: '\\(', end: '\\)'
      }
    ]
  };

  var COFFE_CLASS_DECLARATION_MODE = {
    className: 'class',
    beginWithKeyword: true, keywords: 'class',
    end: '$',
    illegal: ':',
    contains: [
      {
        beginWithKeyword: true, keywords: 'extends',
        endsWithParent: true,
        illegal: ':',
        contains: [TITLE]
      },
      TITLE
    ]
  };

  var COFFEE_PROPERTY_MODE = {
    className: 'property',
    begin: '@' + JS_IDENT_RE
  };

  var COFFEE_EMBEDDED_JAVASCRIPT = {
    begin: '`', end: '`',
    excludeBegin: true, excludeEnd: true,
    subLanguage: 'javascript'
  };

  return {
    keywords: keywords,
    contains: [
      // Numbers
      hljs.C_NUMBER_MODE,
      hljs.BINARY_NUMBER_MODE,
      // Strings
      hljs.APOS_STRING_MODE,
      COFFEE_HEREDOC_MODE, // Should be before COFFEE_QUOTE_STRING_MODE for greater priority
      COFFEE_QUOTE_STRING_MODE,
      // Comments
      COFFEE_HERECOMMENT_MODE, // Should be before hljs.HASH_COMMENT_MODE for greater priority
      hljs.HASH_COMMENT_MODE,
      // CoffeeScript specific modes
      COFFEE_HEREGEX_MODE,
      COFFEE_EMPTY_REGEX_MODE,
      COFFEE_REGEX_MODE,
      COFFEE_EMBEDDED_JAVASCRIPT,
      COFFEE_FUNCTION_DECLARATION_MODE,
      COFFE_CLASS_DECLARATION_MODE,
      COFFEE_PROPERTY_MODE
    ]
  };
}
