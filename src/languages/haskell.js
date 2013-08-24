/*
Language: Haskell
Author: Jeremy Hull <sourdrums@gmail.com>
*/

function(hljs) {
  var TYPE = {
    className: 'haskell_type',
    begin: '\\b[A-Z][\\w\']*',
    relevance: 0
  };
  var CONTAINER = {
    className: 'haskell_container',
    begin: '\\(', end: '\\)',
    illegal: '"',
    contains: [
      {className: 'haskell_type', begin: '\\b[A-Z][\\w]*(\\((\\.\\.|,|\\w+)\\))?'},
      {className: 'haskell_title', begin: '[_a-z][\\w\']*'}
    ]
  };
  var CONTAINER2 = {
    className: 'haskell_container',
    begin: '{', end: '}',
    contains: CONTAINER.contains
  };

  return {
    keywords:
      'let in if then else case of where do module import hiding qualified type data ' +
      'newtype deriving class instance not as foreign ccall safe unsafe',
    contains: [
      {
        className: 'haskell_comment',
        begin: '--', end: '$'
      },
      {
        className: 'haskell_preprocessor',
        begin: '{-#', end: '#-}'
      },
      {
        className: 'haskell_comment',
        contains: ['self'],
        begin: '{-', end: '-}'
      },
      {
        className: 'haskell_string',
        begin: '\\s+\'', end: '\'',
        contains: [hljs.BACKSLASH_ESCAPE],
        relevance: 0
      },
      hljs.QUOTE_STRING_MODE,
      {
        className: 'haskell_import',
        begin: '\\bimport', end: '$',
        keywords: 'import qualified as hiding',
        contains: [CONTAINER],
        illegal: '\\W\\.|;'
      },
      {
        className: 'haskell_module',
        begin: '\\bmodule', end: 'where',
        keywords: 'module where',
        contains: [CONTAINER],
        illegal: '\\W\\.|;'
      },
      {
        className: 'haskell_class',
        begin: '\\b(class|instance)', end: 'where',
        keywords: 'class where instance',
        contains: [TYPE]
      },
      {
        className: 'haskell_typedef',
        begin: '\\b(data|(new)?type)', end: '$',
        keywords: 'data type newtype deriving',
        contains: [TYPE, CONTAINER, CONTAINER2]
      },
      hljs.C_NUMBER_MODE,
      {
        className: 'haskell_shebang',
        begin: '#!\\/usr\\/bin\\/env\ runhaskell', end: '$'
      },
      TYPE,
      {
        className: 'haskell_title', begin: '^[_a-z][\\w\']*'
      },
      {begin: '->|<-'} // No markup, relevance booster
    ]
  };
}
