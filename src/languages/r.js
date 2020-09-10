/*
Language: R
Description: R is a free software environment for statistical computing and graphics.
Author: Joe Cheng <joe@rstudio.org>
Contributors: Konrad Rudolph <konrad.rudolph@gmail.com>
Website: https://www.r-project.org
Category: scientific
*/

export default function(hljs) {
  // FIXME: Support Unicode identifiers.
  var IDENT_RE = '(([a-zA-Z]|\\.[._a-zA-Z])[._a-zA-Z0-9]*)|\\.(!=\\d)'

  return {
    name: 'R',
    contains: [
      hljs.HASH_COMMENT_MODE,
      {
        begin: IDENT_RE,
        keywords: {
          $pattern: IDENT_RE,
          keyword:
            'function if in break next repeat else for while',
          literal:
            'NULL NA TRUE FALSE Inf NaN NA_integer_|10 NA_real_|10 ' +
            'NA_character_|10 NA_complex_|10',
          built_in:
            // Builtin constants
            'LETTERS letters month.abb month.name pi T F ... ..1 ..2 ' +
            // Primitive functions
            // These are all the functions in `base` that are implemented as a
            // `.Primitive`, minus those functions that are also keywords.
            'abs acos acosh all any anyNA Arg as.call as.character' +
            'as.complex as.double as.environment as.integer as.logical' +
            'as.null.default as.numeric as.raw asin asinh atan atanh attr' +
            'attributes baseenv browser c call ceiling class Conj cos cosh' +
            'cospi cummax cummin cumprod cumsum digamma dim dimnames' +
            'emptyenv exp expression floor forceAndCall gamma gc.time' +
            'globalenv Im interactive invisible is.array is.atomic is.call' +
            'is.character is.complex is.double is.environment is.expression' +
            'is.finite is.function is.infinite is.integer is.language' +
            'is.list is.logical is.matrix is.na is.name is.nan is.null' +
            'is.numeric is.object is.pairlist is.raw is.recursive is.single' +
            'is.symbol lazyLoadDBfetch length lgamma list log max min' +
            'missing Mod names nargs nzchar oldClass on.exit pos.to.env' +
            'proc.time prod quote range Re rep retracemem return round' +
            'seq_along seq_len seq.int sign signif sin sinh sinpi sqrt' +
            'standardGeneric substitute sum switch tan tanh tanpi tracemem' +
            'trigamma trunc unclass untracemem UseMethod xtfrm',
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
        contains: [hljs.BACKSLASH_ESCAPE],
        variants: [
          {begin: '"', end: '"'},
          {begin: "'", end: "'"}
        ]
      }
    ]
  };
}
