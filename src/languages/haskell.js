/*
Language: Haskell
Author: Jeremy Hull <sourdrums@gmail.com>
Contributors: Zena Treep <zena.treep@gmail.com>
*/

function(hljs) {

  var COMMENT = {
    className: 'comment',
    variants: [
      { begin: '--', end: '$' },
      { begin: '{-', end: '-}'
      , contains: ['self']
      }
    ]
  };

  var PRAGMA = {
    className: 'pragma',
    begin: '{-#', end: '#-}'
  };

  var PREPROCESSOR = {
    className: 'preprocessor',
    begin: '^#', end: '$'
  };

  var CONSTRUCTOR = {
    className: 'type',
    begin: '\\b[A-Z][\\w\']*', // TODO: other constructors (build-in, infix).
    relevance: 0
  };

  var LIST = {
    className: 'container',
    begin: '\\(', end: '\\)',
    illegal: '"',
    contains: [
      PRAGMA,
      COMMENT,
      PREPROCESSOR,
      {className: 'type', begin: '\\b[A-Z][\\w]*(\\((\\.\\.|,|\\w+)\\))?'},
      { className: 'title', begin: '[_a-z][\\w\']*' }
    ]
  };

  var RECORD = {
    className: 'container',
    begin: '{', end: '}',
    contains: LIST.contains
  };

  return {
    keywords:
      'let in if then else case of where do module import hiding ' +
      'qualified type data newtype deriving class instance as default ' +
      'infix infixl infixr foreign export ccall stdcall cplusplus ' +
      'jvm dotnet safe unsafe family forall mdo proc rec',
    contains: [

      // Top-level constructions.

      {
        className: 'module',
        begin: '\\bmodule\\b', end: 'where',
        keywords: 'module where',
        contains: [LIST, COMMENT],
        illegal: '\\W\\.|;'
      },
      {
        className: 'import',
        begin: '\\bimport\\b', end: '$',
        keywords: 'import|0 qualified as hiding',
        contains: [LIST, COMMENT],
        illegal: '\\W\\.|;'
      },

      {
        className: 'class',
        begin: '^(\\s*)?(class|instance)\\b', end: 'where',
        keywords: 'class family instance where',
        contains: [CONSTRUCTOR, LIST, COMMENT]
      },
      {
        className: 'typedef',
        begin: '\\b(data|(new)?type)\\b', end: '$',
        keywords: 'data family type newtype deriving',
        contains: [PRAGMA, COMMENT, CONSTRUCTOR, LIST, RECORD]
      },
      {
        className: 'default',
        beginKeywords: 'default', end: '$',
        contains: [CONSTRUCTOR, LIST, COMMENT]
      },
      {
        className: 'infix',
        beginKeywords: 'infix infixl infixr', end: '$',
        contains: [hljs.C_NUMBER_MODE, COMMENT]
      },
      {
        className: 'foreign',
        begin: '\\bforeign\\b', end: '$',
        keywords: 'foreign import export ccall stdcall cplusplus jvm ' +
                  'dotnet safe unsafe',
        contains: [CONSTRUCTOR, hljs.QUOTE_STRING_MODE, COMMENT]
      },
      {
        className: 'shebang',
        begin: '#!\\/usr\\/bin\\/env\ runhaskell', end: '$'
      },

      // "Whitespaces".

      PRAGMA,
      COMMENT,
      PREPROCESSOR,

      // Literals and names.

      // TODO: characters.
      hljs.QUOTE_STRING_MODE,
      hljs.C_NUMBER_MODE,
      CONSTRUCTOR,
      { className: 'title', begin: '^[_a-z][\\w\']*', relevance: 0 },

      {begin: '->|<-'} // No markup, relevance booster
    ]
  };
}
