/*
Language: Haskell
Author: Jeremy Hull <sourdrums@gmail.com>
*/

function(hljs) {

  var COMMENT1 = {
    className: 'haskell_comment',
    begin: '--', end: '$'
  };

  var COMMENT2 = {
    className: 'haskell_comment',
    contains: ['self'],
    begin: '{-', end: '-}'
  };

  var PRAGMA = {
    className: 'haskell_pragma',
    begin: '{-#', end: '#-}'
  };

  var PREPROCESSOR = {
    className: 'haskell_preprocessor',
    begin: '^#', end: '$'
  };

  var VARIABLE = {
    className: 'haskell_variable',
    begin: '^[_a-z][\\w\']*'
  };

  // Value, type, class constructors.
  var CONSTRUCTOR = {
    className: 'haskell_constructor',
    begin: '\\b[A-Z][\\w\']*', // TODO: other constructors.
    relevance: 0
  };

  // Not [] :: * -> * but lists in module, import, deriving, class context, default etc.
  var LIST = {
    className: 'haskell_list',
    begin: '\\(', end: '\\)',
    illegal: '"',
    contains: [
      PRAGMA,
      COMMENT1,
      COMMENT2,
      PREPROCESSOR,
      {className: 'haskell_constructor', begin: '\\b[A-Z][\\w]*(\\((\\.\\.|,|\\w+)\\))?'},
      VARIABLE
    ]
  };

  var RECORD = {
    className: 'haskell_record',
    begin: '{', end: '}',
    contains: LIST.contains
  };

  return {
    keywords:
      'let in if then else case of where do module import hiding qualified type data ' +
      'newtype deriving class instance as default infix infixl infixr ' +
      'foreign export ccall stdcall cplusplus jvm dotnet safe unsafe ' +
      'family forall mdo proc rec',
    contains: [

      // Top-level constructions.

      {
        className: 'haskell_module',
        begin: '\\bmodule ', end: 'where',
        keywords: 'module where',
        contains: [LIST, COMMENT2],
        illegal: '\\W\\.|;'
      },
      {
        className: 'haskell_import',
        begin: '\\bimport ', end: '$',
        keywords: 'import qualified as hiding',
        contains: [LIST, COMMENT1, COMMENT2],
        illegal: '\\W\\.|;'
      },

      {
        className: 'haskell_class',
        begin: '\\b(class |instance )', end: 'where',
        keywords: 'class family instance where',
        contains: [CONSTRUCTOR, LIST, COMMENT2]
      },
      {
        className: 'haskell_type',
        begin: '\\b(data |(new)?type )', end: '$',
        keywords: 'data family type newtype deriving',
        contains: [CONSTRUCTOR, LIST, RECORD, COMMENT1, COMMENT2]
      },
      {
        className: 'haskell_default',
        begin: '\\bdefault ', end: '$',
        keywords: 'default',
        contains: [CONSTRUCTOR, LIST, COMMENT1, COMMENT2]
      },
      {
        className: 'haskell_infix',
        begin: '\\b(infix |infixl |infixr )', end: '$',
        keywords: 'infix infixl infixr',
        contains: [hljs.C_NUMBER_MODE, COMMENT1, COMMENT2]
      },
      {
        className: 'haskell_foreign',
        begin: '\\bforeign ', end: '$',
        keywords: 'foreign import export ccall stdcall cplusplus jvm dotnet safe unsafe',
        contains: [CONSTRUCTOR, hljs.QUOTE_STRING_MODE, COMMENT1, COMMENT2]
      },
      {
        className: 'haskell_shebang',
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
      VARIABLE,

      {begin: '->|<-'} // No markup, relevance booster
    ]
  };
}
