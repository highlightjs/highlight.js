/*
Language: R
Author: Joe Cheng <joe@rstudio.org>
*/

hljs.LANGUAGES.r = (function() {
  var HEX_RE = "0[xX][0-9a-fA-F]+[Li]?\\b";
  var INT_RE = "\\d+(?:[eE][+\\-]?\\d*)?L\\b";
  var TRAILING_DEC_RE = "\\d+\\.(?!\\d)(?:i\\b)?";
  var NUM_RE = "\\d+(?:\\.\\d*)?(?:[eE][+\\-]?\\d*)?i?\\b";
  var LEADING_DEC_RE = "\\.\\d+(?:[eE][+\\-]?\\d*)?i?\\b";

  return {
    defaultMode: {
      lexems: '[a-zA-Z.][a-zA-Z0-9._]*',
      keywords: {
        'keyword': {
           'function' : 2, 'if' : 1, 'in' : 1, 'break' : 1, 'next' : 1, 'repeat' : 1, 'else' : 1, 'for' : 1,
           'return' : 1, 'switch' : 1, 'while' : 1, 'try' : 1, 'tryCatch' : 10, 'stop' : 1, 'warning' : 1,
           'require' : 1, 'library' : 10, 'attach' : 1, 'detach' : 1, 'source' : 1, 'setMethod' : 1,
           'setGeneric' : 10, 'setGroupGeneric' : 10, 'setClass' : 1, '...' : 10
        },
        'literal': {'NULL': 1, 'NA': 10, 'TRUE': 1, 'FALSE': 1, 'T': 1, 'F': 1, 'Inf': 1, 'NaN': 1,
                    'NA_integer_': 10, 'NA_real_': 10, 'NA_character_': 10, 'NA_complex_': 10}
      },
      contains: [
        hljs.HASH_COMMENT_MODE,
        {
          begin: "\\s|,|=|!|\\||&|\\+|\\-|\\*|/|\\^|>|<|:|%|~|\\[|\\]|\\(|\\)|\\{|\\}",
          contains: [
           {
              // hex value
              className: 'number',
              begin: "\\b" + HEX_RE,
              relevance: 0
            },
            {
              // explicit integer
              className: 'number',
              begin: "\\b" + INT_RE,
              relevance: 0
            },
            {
              // number with trailing decimal
              className: 'number',
              begin: "\\b" + TRAILING_DEC_RE,
              relevance: 1
            },
            {
              // number
              className: 'number',
              begin: "\\b" + NUM_RE,
              relevance: 0
            },
            {
              // number with leading decimal
              className: 'number',
              begin: LEADING_DEC_RE,
              relevance: 1
            }
          ],
          relevance: 0
        },

        {
          // hex value
          className: 'number',
          begin: "^" + HEX_RE,
          relevance: 0
        },
        {
          // explicit integer
          className: 'number',
          begin: "^" + INT_RE,
          relevance: 0
        },
        {
          // number with trailing decimal
          className: 'number',
          begin: "^" + TRAILING_DEC_RE,
          relevance: 1
        },
        {
          // number
          className: 'number',
          begin: "^" + NUM_RE,
          relevance: 0
        },
        {
          // number with leading decimal
          className: 'number',
          begin: "^" + LEADING_DEC_RE,
          relevance: 1
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

