/*
Language: Ceylon
Author: Lucas Werkmeister <mail@lucaswerkmeister.de>
*/
function(hljs) {
  // 2.3. Identifiers and keywords
  var KEYWORDS =
    'assembly module package import alias class interface object given value ' +
    'assign void function new of extends satisfies|10 abstracts in out return ' +
    'break continue throw assert dynamic if else switch case for while try ' +
    'catch finally then let this outer super is exists|10 nonempty|10';
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
    contains: [
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      hljs.APOS_STRING_MODE, // TODO proper string literals with interpolation and unicode escapes
      hljs.QUOTE_STRING_MODE
    ]
  };
}
