/*
Language: Ceylon
Author: Lucas Werkmeister <mail@lucaswerkmeister.de>
*/
function(hljs) {
  // 2.3. Identifiers and keywords
  var KEYWORDS =
    'assembly module package import|0 alias class|0 interface|0 object given value ' +
    'assign void|0 function new|0 of extends|0 satisfies|10 abstracts in out return|0 ' +
    'break|0 continue|0 throw|0 assert dynamic if|0 else|0 switch|0 case|0 for|0 while|0 try|0 ' +
    'catch|0 finally|0 then let this|0 outer super|0 is exists|10 nonempty|10';
  // 7.4.1 Declaration Modifiers
  var DECLARATION_MODIFIERS =
    'shared|10 abstract formal|10 default|10 actual|10 variable late native deprecated' +
    'final sealed annotation suppressWarnings small';
  // 7.4.2 Documentation
  var DOCUMENTATION =
    'doc by license see throws tagged';
  var LANGUAGE_ANNOTATIONS = DECLARATION_MODIFIERS + ' ' + DOCUMENTATION;
  return {
    keywords: {
      keyword: KEYWORDS,
      annotation: LANGUAGE_ANNOTATIONS
    },
    illegal: '\\$[^01]|#[^0-9a-fA-F]',
    contains: [
      hljs.C_LINE_COMMENT_MODE,
      {
        // block comment (can be nested, so no hljs.C_BLOCK_COMMENT_MODE)
        className: 'comment',
        begin: '/\\*',
        contains: ['self'],
        end: '\\*/',
        relevance: 0
      },
      {
        // verbatim string
        className: 'string',
        begin: '"""',
        end: '"""',
        relevance: 5
      },
      {
        // string literal or template
        className: 'string',
        begin: '"|``',
        end: '"|``',
        relevance: 0
      },
      {
        // character literal
        className: 'string',
        begin: "'",
        end: "'",
        relevance: 0
      },
      {
        // numeric literal
        className: 'number',
        begin: '#[0-9a-fA-F_]+|\\$[01_]+|[0-9_]+(?:\\.[0-9_](?:[eE][+-]?\\d+)?)?[kMGTPmunpf]?',
        relevance: 0
      },
      {
        // compiler annotation
        className: 'annotation',
        begin: '@[a-z]\\w*(?:\\:\"[^\"]*\")?',
        relevance: 5
      }
    ]
  };
}
