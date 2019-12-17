module.exports = {
    "build_dir": "build",
    "copyrightYears": "2006-2019",
    "clean_css": {},
    "CJS": {
      format: "cjs",
      strict: false
    },
    "terser": {
        // output: { ascii_only: true },
        "compress": {
          passes: 2,
          unsafe: true,
          warnings: true,
          dead_code: true,
          toplevel: "funcs",
          global_defs: {
            LEGACY: false,
            DEBUG: false
          }
        },
        "mangle": {
//           "properties": {
//             "only_cache": true,
//             "reserved": [],
//             // "keep_quoted": true,
//             "builtins": []
// ,              "cache": {
//               "propsx" : new Map([
//                 ["relevance","r"],
//                 ["contains", "c"],
//                 ["keywords", "k"],
//                 ['begin', 'b'],
//                 ['beginKeywords', 'bK'],
//                 ['end', 'e'],
//                 ['endsWithParent', 'eW'],
//                 ['excludeBegin', 'eB'],
//                 ['excludeEnd', 'eE'],
//                 ['returnBegin', 'rB'],
//                 ['returnEnd', 'rE'],
//                 ['variants', 'v'],
//                 // ['className', 'cN'],

//                 ['IDENT_RE', 'IR'],
//                 ['UNDERSCORE_IDENT_RE', 'UIR'],
//                 ['NUMBER_RE', 'NR'],
//                 ['C_NUMBER_RE', 'CNR'],
//                 ['BINARY_NUMBER_RE', 'BNR'],
//                 ['RE_STARTERS_RE', 'RSR'],
//                 ['BACKSLASH_ESCAPE', 'BE'],
//                 ['APOS_STRING_MODE', 'ASM'],
//                 ['QUOTE_STRING_MODE', 'QSM'],
//                 ['PHRASAL_WORDS_MODE', 'PWM'],
//                 ['C_LINE_COMMENT_MODE', 'CLCM'],
//                 ['C_BLOCK_COMMENT_MODE', 'CBCM'],
//                 ['HASH_COMMENT_MODE', 'HCM'],
//                 ['NUMBER_MODE', 'NM'],
//                 ['C_NUMBER_MODE', 'CNM'],
//                 ['BINARY_NUMBER_MODE', 'BNM'],
//                 ['CSS_NUMBER_MODE', 'CSSNM'],
//                 ['REGEXP_MODE', 'RM'],
//                 ['TITLE_MODE', 'TM'],
//                 ['UNDERSCORE_TITLE_MODE', 'UTM'],
//                 ['COMMENT', 'C'],
//               ])
//             }
//           }
        }
    }
}
