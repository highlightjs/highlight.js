/*
Language: Haskell
Author: Jeremy Hull <sourdrums@gmail.com>
*/

hljs.LANGUAGES.haskell = function(){
  var LABEL = {
    className: 'label',
    begin: '\\b[A-Z][\\w\']*',
    relevance: 0
  };
  var CONTAINER = {
    className: 'container',
    begin: '\\(', end: '\\)',
    contains: [
      {className: 'label', begin: '\\b[A-Z][\\w\\(\\)\\.\']*'},
      {className: 'title', begin: '[_a-z][\\w\']*'}
    ]
  };

  return {
    defaultMode: {
      keywords:
        'let in if then else case of where do module import hiding qualified type data ' +
        'newtype deriving class instance null not as',
      contains: [
        {
          className: 'comment',
          begin: '--', end: '$'
        },
        {
          className: 'comment',
          begin: '{-', end: '-}'
        },
        {
          className: 'string',
          begin: '\\s+\'', end: '\'',
          contains: [hljs.BACKSLASH_ESCAPE],
          relevance: 0
        },
        hljs.QUOTE_STRING_MODE,
        {
          className: 'import',
          begin: '\\bimport', end: '$',
          keywords: 'import qualified as hiding',
          contains: [CONTAINER]
        },
        {
          className: 'module',
          begin: '\\bmodule', end: 'where',
          keywords: 'module where',
          contains: [CONTAINER]
        },
        {
          className: 'class',
          begin: '\\b(class|instance|data|(new)?type)', end: '(where|$)',
          keywords: 'class where instance data type newtype deriving',
          contains: [LABEL]
        },
        hljs.C_NUMBER_MODE,
        {
          className: 'shebang',
          begin: '#!\\/usr\\/bin\\/env\ runhaskell', end: '$'
        },
        LABEL,
        {
          className: 'title', begin: '^[_a-z][\\w\']*'
        }
      ]
    }
  };
}();
