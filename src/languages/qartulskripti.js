/*
Language: Qartulskripti
Requires: javascript.js
Author: Nodari Chkuaselidze <nodar.chkuaselidze@gmail.com>
Description: Qartulskripti is a programming language that transcompiles to JavaScript and based on CoffeeScript.
*/

function(hljs) {
  var KEYWORDS = {
    keyword:
      // JS keywords
      'in if for while finally new do return else break catch instanceof throw try this ' +
      'switch continue typeof delete debugger super ' +
      // QS keywords
      'შედის თუ როცა სანამ საბოლოოდ ახალი შეასრულე დააბრუნე თუარადა შეწყვიტე დაიჭირე ნიმუშია ისროლე ცადე ეს ' +
      'შეამოწმე გამოტოვე ტიპი წაშალე წინაპარი ' +
      // Coffee keywords
      'then unless until loop of by when and or is isnt not ' +
      'მაშინ მანამ ეკუთვნის იზრდება როდესაც და ან არის არარის არ ',
    literal:
      // JS literals
      'true false null undefined ' +
      // QS literals
      'კი არა განუსაზღვრელი' +
      // Coffee literals
      'yes no on off',
    reserved:
      'case default function var void with const let enum export import native ' +
      '__hasProp __extends __slice __bind __indexOf',
    built_in:
      'npm require console print module global window document'
  };
  var QS_IDENT_RE = '[A-Za-zა-ჰ$_][0-9A-Za-zა-ჰ$_]*';
  var TITLE = hljs.inherit(hljs.TITLE_MODE, {begin: QS_IDENT_RE, lexemes : QS_IDENT_RE });
  var SUBST = {
    className: 'subst',
    begin: /#\{/, end: /}/,
    lexemes : QS_IDENT_RE,
    keywords: KEYWORDS
  };
  var EXPRESSIONS = [
    hljs.inherit(hljs.BINARY_NUMBER_MODE, { lexemes : QS_IDENT_RE }),
    hljs.inherit(hljs.C_NUMBER_MODE, {lexemes : QS_IDENT_RE, starts: {end: '(\\s*/)?', relevance: 0}}),
    {
      className: 'string',
      variants: [
        {
          begin: /'''/, end: /'''/,
          contains: [hljs.BACKSLASH_ESCAPE]
        },
        {
          begin: /'/, end: /'/,
          contains: [hljs.BACKSLASH_ESCAPE]
        },
        {
          begin: /"""/, end: /"""/,
          contains: [hljs.BACKSLASH_ESCAPE, SUBST]
        },
        {
          begin: /"/, end: /"/,
          contains: [hljs.BACKSLASH_ESCAPE, SUBST]
        }
      ]
    },
    {
      className: 'regexp',
      variants: [
        {
          begin: '///', end: '///',
          contains: [SUBST, hljs.HASH_COMMENT_MODE]
        },
        {
          begin: '//[gim]*',
          relevance: 0
        },
        {
          begin: '/\\S(\\\\.|[^\\n])*?/[gim]*(?=\\s|\\W|$)' // \S is required to parse x / 2 / 3 as two divisions
        }
      ]
    },
    {
      className: 'property',
      begin: '@' + QS_IDENT_RE
    },
    {
      begin: '`', end: '`',
      excludeBegin: true, excludeEnd: true,
      subLanguage: 'javascript'
    }
  ];
  SUBST.contains = EXPRESSIONS;

  return {
    aliases: ['qartulskripti', 'qs'],
    keywords: KEYWORDS,
    lexemes : QS_IDENT_RE,
    contains: EXPRESSIONS.concat([
      {
        className: 'comment',
        lexemes : QS_IDENT_RE,
        begin: '###', end: '###'
      },
      hljs.HASH_COMMENT_MODE,
      {
        className: 'function',
        lexemes : QS_IDENT_RE,
        begin: '(' + QS_IDENT_RE + '\\s*=\\s*)?(\\(.*\\))?\\s*\\B[-=]>', end: '[-=]>',
        returnBegin: true,
        contains: [
          TITLE,
          {
            lexemes : QS_IDENT_RE,
            className: 'params',
            begin: '\\(', returnBegin: true,
            /* We need another contained nameless mode to not have every nested
            pair of parens to be called "params" */
            contains: [{
              begin: /\(/, end: /\)/,
              keywords: KEYWORDS,
              lexemes : QS_IDENT_RE,
              contains: ['self'].concat(EXPRESSIONS)
            }]
          }
        ]
      },
      {
        className: 'class',
        begin: '(?:^|\\s)(კლასი|class) ',
        keywords : 'კლასი class',
        lexemes: QS_IDENT_RE,
        end: '$',
        illegal: /[:="\[\]]/,
        contains: [
          {
            lexemes: QS_IDENT_RE,
            begin : '(?:^|\\s)(მემკვიდრეა|extends) ',
            keywords: 'მემკვიდრეა extends',
            endsWithParent: true,
            illegal: /[:="\[\]]/,
            contains: [TITLE]
          },
          TITLE
        ]
      },
      {
        className: 'attribute',
        lexemes: QS_IDENT_RE,
        begin: QS_IDENT_RE + ':', end: ':',
        returnBegin: true, excludeEnd: true,
        relevance: 0
      }
    ])
  };
}
