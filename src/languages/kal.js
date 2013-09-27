/*
Language: Kal
Author: Robert Zimmerman <rmzimmerman@gmail.com>
Thanks To: Dmytrii Nagirniak <dnagir@gmail.com>, Oleg Efimov <efimovov@gmail.com>, Cédric Néhémie <cedric.nehemie@gmail.com>
Description: Kal is a programming language that transcompiles to JavaScript. For info about language see http://rzimmerman.github.io/kal
*/

function(hljs) {
  var KEYWORDS = {
    keyword:
      // JS keywords
      'in if for while finally new do return else break catch instanceof throw try this ' +
      'switch continue typeof delete debugger super ' +
      // Coffee keywords
      'unless except until of when and or xor is isnt not doesnt exist exists function ' +
      'method task inherits from raise fail with run parallel series pass pause until ' +
      'safe wait otherwise property value bitwise',
    literal:
      // JS literals
      'true false null undefined ' +
      // Coffee literals
      'yes no on off nothing none empty me',
    reserved:
      'case default var void const let enum export import native ' +
      '__hasProp __extends __slice __bind __indexOf then',
    built_in:
      'npm require console print module exports global window document'
  };
  var JS_IDENT_RE = '[A-Za-z$_][0-9A-Za-z$_]*';
  var TITLE = {className: 'title', begin: JS_IDENT_RE};
  var SUBST = {
    className: 'subst',
    begin: '#\\{', end: '}',
    keywords: KEYWORDS,
  };
  var EXPRESSIONS = [
    // Numbers
    hljs.BINARY_NUMBER_MODE,
    hljs.inherit(hljs.C_NUMBER_MODE, {starts: {end: '(\\s*/)?', relevance: 0}}), // a number tries to eat the following slash to prevent treating it as a regexp
    // Strings
    {
      className: 'string',
      begin: '\'\'\'', end: '\'\'\'',
      contains: [hljs.BACKSLASH_ESCAPE]
    },
    {
      className: 'string',
      begin: '\'', end: '\'',
      contains: [hljs.BACKSLASH_ESCAPE],
      relevance: 0
    },
    {
      className: 'string',
      begin: '"""', end: '"""',
      contains: [hljs.BACKSLASH_ESCAPE, SUBST]
    },
    {
      className: 'string',
      begin: '"', end: '"',
      contains: [hljs.BACKSLASH_ESCAPE, SUBST],
      relevance: 0
    },
    // RegExps
    {
      className: 'regexp',
      begin: '///', end: '///',
      contains: [hljs.HASH_COMMENT_MODE]
    },
    {
      className: 'regexp', begin: '//[gim]*',
      relevance: 0
    },
    {
      className: 'regexp',
      begin: '/\\S(\\\\.|[^\\n])*?/[gim]*(?=\\s|\\W|$)' // \S is required to parse x / 2 / 3 as two divisions
    }
  ];
  SUBST.contains = EXPRESSIONS;

  return {
    keywords: KEYWORDS,
    illegal: '%|</|@|>>|<<|;$',
    contains: EXPRESSIONS.concat([
      {
        className: 'comment',
        begin: '###', end: '###'
      },
      hljs.HASH_COMMENT_MODE,
      {
        className: 'function',
        begin: '(' + JS_IDENT_RE + '\\s*[=:]\\s*)?(\\(.*\\))?\\s*->\\n', end: '->\\n',
        returnBegin: true,
        illegal: '=>',
        contains: [
          TITLE,
          {
            className: 'params',
            begin: '\\(', returnBegin: true,
            /* We need another contained nameless mode to not have every nested
            pair of parens to be called "params" */
            contains: [{
              begin: /\(/, end: /\)/,
              keywords: KEYWORDS,
              contains: ['self'].concat(EXPRESSIONS)
            }]
          }
        ]
      },
      {
        className: 'function',
        begin: '(' + JS_IDENT_RE + '\\s*[=:])?\\s*(function|method|task)',
        end: '$',
        keywords: 'method function task',
        illegal: '\\{\\s*$',
        contains: [
          {
              beginWithKeyword: true, keywords: 'of',
              endsWithParent: true,
              illegal: '[:\\{]',
              contains: [TITLE]
          },
          TITLE,
          {
            className: 'params',
            begin: '\\(', returnBegin: true,
            /* We need another contained nameless mode to not have every nested
            pair of parens to be called "params" */
            contains: [{
              begin: /\(/, end: /\)/,
              keywords: KEYWORDS,
              contains: EXPRESSIONS
            }]
          }
        ]
      },
      {
        className: 'class',
        beginWithKeyword: true, keywords: 'class',
        end: '$',
        illegal: '[:\\[\\]]\\{',
        contains: [
          {
            beginWithKeyword: true, keywords: 'inherits',
            endsWithParent: true,
            illegal: ':',
            contains: [
              {
                beginWithKeyword: true, keywords: 'from',
                endsWithParent: true,
                contains: [TITLE]
              }
            ]
          },
          TITLE
        ]
      },
      {
        className: 'attribute',
        begin: JS_IDENT_RE + ':', end: ':',
        returnBegin: true, excludeEnd: true
      },
    ])
  };
}
