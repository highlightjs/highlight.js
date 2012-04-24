/*
Language: R
Author: Joe Cheng <joe@rstudio.org>
*/

hljs.LANGUAGES.r = (function() {
  var IDENT_RE = '([a-zA-Z]|\\.[a-zA-Z.])[a-zA-Z0-9._]*';

  return {
    defaultMode: {
      contains: [
        hljs.HASH_COMMENT_MODE,
        {
          begin: IDENT_RE,
          lexems: IDENT_RE,
          keywords: {
            'keyword': {
               'function' : 1, 'if' : 1, 'in' : 1, 'break' : 1, 'next' : 1, 'repeat' : 1, 'else' : 1, 'for' : 1,
               'return' : 1, 'switch' : 1, 'while' : 1, 'try' : 1, 'tryCatch' : 10, 'stop' : 1, 'warning' : 1,
               'require' : 1, 'library' : 1, 'attach' : 1, 'detach' : 1, 'source' : 1, 'setMethod' : 1,
               'setGeneric' : 1, 'setGroupGeneric' : 1, 'setClass' : 1, '...' : 10
            },
            'literal': {'NULL': 1, 'NA': 1, 'TRUE': 1, 'FALSE': 1, 'T': 1, 'F': 1, 'Inf': 1, 'NaN': 1,
                        'NA_integer_': 10, 'NA_real_': 10, 'NA_character_': 10, 'NA_complex_': 10}
          },
          relevance: 0
        },
        {
          // hex value
          className: 'number',
          begin: "0[xX][0-9a-fA-F]+[Li]?\\b",
          relevance: 0
        },
        {
          // explicit integer
          className: 'number',
          begin: "\\d+(?:[eE][+\\-]?\\d*)?L\\b",
          relevance: 0
        },
        {
          // number with trailing decimal
          className: 'number',
          begin: "\\d+\\.(?!\\d)(?:i\\b)?",
          relevance: 0
        },
        {
          // number
          className: 'number',
          begin: "\\d+(?:\\.\\d*)?(?:[eE][+\\-]?\\d*)?i?\\b",
          relevance: 0
        },
        {
          // number with leading decimal
          className: 'number',
          begin: "\\.\\d+(?:[eE][+\\-]?\\d*)?i?\\b",
          relevance: 0
        },

        {
          // escaped identifier
          begin: '`',
          end: '`',
          relevance: 0
        },

        {
          className: 'string',
          begin: '"',
          end: '"',
          contains: [hljs.BACKSLASH_ESCAPE],
          relevance: 0
        },
        {
          className: 'string',
          begin: "'",
          end: "'",
          contains: [hljs.BACKSLASH_ESCAPE],
          relevance: 0
        },
      ]
    }
  };
})();

