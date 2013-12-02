/*
Language: Haskell
Author: Jeremy Hull <sourdrums@gmail.com>
Contributors: Zena Treep <zena.treep@gmail.com>
*/

function(hljs) {

  var COMMENT1 = {
    className: 'comment',
    begin: '--', end: '$'
  };

  var COMMENT2 = {
    className: 'comment',
    contains: ['self'],
    begin: '{-', end: '-}'
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
      COMMENT1,
      COMMENT2,
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
        contains: [LIST, COMMENT2],
        illegal: '\\W\\.|;'
      },
      {
        className: 'import',
        begin: '\\bimport\\b', end: '$',
        keywords: 'import qualified as hiding',
        contains: [LIST, COMMENT1, COMMENT2],
        illegal: '\\W\\.|;'
      },

      {
        className: 'class',
        begin: '\\b(class|instance)\\b', end: 'where',
        keywords: 'class family instance where',
        contains: [CONSTRUCTOR, LIST, COMMENT2]
      },
      {
        className: 'typedef',
        begin: '\\b(data|(new)?type)\\b', end: '$',
        keywords: 'data family type newtype deriving',
        contains: [PRAGMA, COMMENT1, COMMENT2, CONSTRUCTOR, LIST, RECORD]
      },
      {
        className: 'default',
        beginWithKeyword: true, end: '$',
        keywords: 'default',
        contains: [CONSTRUCTOR, LIST, COMMENT1, COMMENT2]
      },
      {
        className: 'infix',
        beginWithKeyword: true, end: '$',
        keywords: 'infix infixl infixr',
        contains: [hljs.C_NUMBER_MODE, COMMENT1, COMMENT2]
      },
      {
        className: 'foreign',
        begin: '\\bforeign\\b', end: '$',
        keywords: 'foreign import export ccall stdcall cplusplus jvm ' +
                  'dotnet safe unsafe',
        contains: [CONSTRUCTOR, hljs.QUOTE_STRING_MODE, COMMENT1, COMMENT2]
      },
      {
        className: 'shebang',
        begin: '#!\\/usr\\/bin\\/env\ runhaskell', end: '$'
      },

      // "Whitespaces".

      PRAGMA,
      COMMENT1,
      COMMENT2,
      PREPROCESSOR,

      // Literals and names.

      // TODO: characters.
      hljs.QUOTE_STRING_MODE,
      hljs.C_NUMBER_MODE,
      CONSTRUCTOR,
      { className: 'title', begin: '^[_a-z][\\w\']*' },

      {begin: '->|<-'} // No markup, relevance booster
    ]
  };
}
