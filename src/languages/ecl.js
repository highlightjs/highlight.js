/*
Language: ECL
Category: database
Author: David de Hilster <david.dehilster@lexisnexisrisk.com>
Description: Enterprise Computing Language
Website: https://hpccsystems.com
*/

/** @type LanguageFn */
export default function(hljs) {

    const FUNCTION = [
        "abs",
        "acos",
        "aggregate",
        "allnodes",
        "apply",
        "apply",
        "ascii",
        "asin",
        "assert",
        "asstring",
        "atan",
        "atan2",
        "ave",
        "build",
        "buildindex",
        "case",
        "catch",
        "choose",
        "choosen",
        "choosesets",
        "clustersize",
        "combine",
        "correlation",
        "cos",
        "cosh",
        "count",
        "covariance",
        "cron",
        "dataset",
        "dedup",
        "define",
        "denormalize",
        "deprecated",
        "dictionary",
        "distribute",
        "distributed",
        "distribution",
        "ebcdic",
        "enth",
        "evaluate",
        "evaluate",
        "event",
        "eventextra",
        "eventname",
        "exists",
        "exp",
        "fail",
        "failcode",
        "failmessage",
        "fetch",
        "fromunicode",
        "fromxml",
        "getenv",
        "getisvalid",
        "graph",
        "group",
        "hashcrc",
        "hashmd5",
        "having",
        "httpcall",
        "httpheader",
        "if",
        "iff",
        "index",
        "interface",
        "intformat",
        "isvalid",
        "iterate",
        "join",
        "keydiff",
        "keypatch",
        "keyunicode",
        "length",
        "library",
        "limit",
        "ln",
        "loadxml",
        "local",
        "log",
        "loop",
        "map",
        "matched",
        "matchlength",
        "matchposition",
        "matchtext",
        "matchunicode",
        "max",
        "merge",
        "mergejoin",
        "min",
        "nofold",
        "nolocal",
        "nonempty",
        "normalize",
        "nothor",
        "notify",
        "opt",
        "output",
        "parse",
        "pattern",
        "penalty",
        "pipe",
        "power",
        "preload",
        "process",
        "project",
        "pull",
        "random",
        "range",
        "rank",
        "ranked",
        "realformat",
        "recordof",
        "regexfind",
        "regexfindset",
        "regexreplace",
        "regroup",
        "rejected",
        "rollup",
        "round",
        "roundup",
        "row",
        "rowdiff",
        "rule",
        "sample",
        "sequential",
        "sin",
        "sinh",
        "sizeof",
        "soapcall",
        "sort",
        "sorted",
        "sqrt",
        "stepped",
        "stored",
        "sum",
        "table",
        "tan",
        "tanh",
        "thisnode",
        "topn",
        "tounicode",
        "toxml",
        "transfer",
        "transform",
        "trim",
        "truncate",
        "typeof",
        "ungroup",
        "unicodeorder",
        "use",
        "validate",
        "variance",
        "wait",
        "when",
        "which",
        "xmldecode",
        "xmlencode",
        "xmltext",
        "xmlunicode"
    ];

    const FUNCTION_ACTIONS = [
        "algorithm",
        "cluster",
        "escape",
        "encrypt",
        "expire",
        "heading",
        "keyed",
        "maxlength",
        "module",
        "named",
        "ordered",
        "parallel",
        "quote",
        "terminator",
        "threshold",
        "timelimit",
        "timeout",
        "separator",
        "set",
        "skew",
        "virtual",
        "wild"
    ];
    
    const POUND_FUNCTIONS = [
        "append",
        "break",
        "constant",
        "declare",
        "demangle",
        "end",
        "else",
        "elseif",
        "error",
        "expand",
        "export",
        "exportXML",
        "for",
        "getdatatype",
        "if",
        "inmodule",
        "loop",
        "mangle",
        "onwarning",
        "option",
        "set",
        "stored",
        "text",
        "uniquename",
        "warning",
        "webservice",
        "workunit"
    ];

    const BUILT_IN = [
        "after",
        "all",
        "andor",
        "any",
        "as",
        "atmost",
        "before",
        "beginc",
        "best",
        "between",
        "case",
        "compressed",
        "compression",
        "const",
        "counter",
        "csv",
        "default",
        "descend",
        "distributed",
        "embed",
        "encoding",
        "end",
        "endc",
        "endembed",
        "endmacro",
        "enum",
        "error",
        "except",
        "exclusive",
        "expand",
        "export",
        "exportxml",
        "extend",
        "fail",
        "failcode",
        "few",
        "fileposition",
        "first",
        "flat",
        "for",
        "forward",
        "from",
        "full",
        "group",
        "grouped",
        "hole",
        "if",
        "ifblock",
        "import",
        "inmodule",
        "inner",
        "internal",
        "joined",
        "keep",
        "keyed",
        "last",
        "left",
        "limit",
        "linkcounted",
        "literal",
        "little_endian",
        "load",
        "local",
        "locale",
        "lookup",
        "lzw",
        "mangle",
        "many",
        "maxcount",
        "maxlength",
        "min skew",
        "mofn",
        "multiple",
        "named",
        "namespace",
        "nocase",
        "noroot",
        "noscan",
        "nosort",
        "noxpath",
        "of",
        "onfail",
        "only",
        "opt",
        "option",
        "outer",
        "overwrite",
        "packed",
        "partition",
        "physicallength",
        "pipe",
        "prefetch",
        "repeat",
        "retry",
        "return",
        "right",
        "right1",
        "right2",
        "rows",
        "rowset",
        "scan",
        "scope",
        "self",
        "service",
        "set",
        "shared",
        "skip",
        "smart",
        "soapaction",
        "sql",
        "stable",
        "store",
        "stored",
        "success",
        "thor",
        "token",
        "trim",
        "type",
        "unicodeorder",
        "uniquename",
        "unordered",
        "unsorted",
        "unstable",
        "update",
        "virtual",
        "warning",
        "whole",
        "width",
        "within",
        "wnotrim",
        "xml",
        "xpath",
        "__compressed_"
    ];

    const CLASSES = [
        "endmacro",
        "function",
        "functionmacro",
        "interface",
        "macro",
        "module",
        "record",
        "transform"
    ];

    const LITERALS = [
        "false",
        "true",
        "and",
        "in",
        "not",
        "or"
    ];

    const TYPE_NUMBER = [
        "data",
        "string",
        "qstring",
        "varstring",
        "varunicode",
        "unicode",
        "udecimal",
        "unsigned"
    ];

    const TYPE_REST = [
        "ascii",
        "big_endian",
        "data",
        "ebcdic",
        "grouped",
        "integer",
        "linkcounted",
        "pattern",
        "rule",
        "set of",
        "streamed",
        "token"
    ];

    const VARIABLES = {
        scope: 'variable',
        relevance: 0,
        variants: [
          { begin: `\\b(integer|unsigned)[1-8]?\\b` }  // unicode
        ]
    };

    const EMBED_BLOCK = {
        className: 'comment',
        variants: [
            {
                begin: 'embed',
                end: 'endembed',
                excludeBegin: true,
                excludeEnd: true,
            }
        ]
    };

    const EMBED_CPP_BLOCK = {
        className: 'comment',
        variants: [
            {
                begin: 'beginc\\+\\+',
                end: 'endc\\+\\+',
                excludeBegin: true,
                excludeEnd: true,
            }
        ]
    };

    const STRING = {
        className: 'string',
        contains: [ hljs.BACKSLASH_ESCAPE ],
        variants: [
            {
                begin: /'''/,
                end: /'''|(?:[^\\\\\\n]$)/,
                contains: [
                    hljs.BACKSLASH_ESCAPE
                ],
                relevance: 10
            },
            hljs.APOS_STRING_MODE,
            hljs.QUOTE_STRING_MODE
        ]
    };

    const types = `${TYPE_NUMBER.join('|')}`;
    const TYPE_NUMBERS = {
        className: 'variable',
        relevance: 0,
        variants: [
            { begin: `\\b(${types})[0-9]*\\b` },
            { begin: '\\butf8(_(de|\\d)(_\\d+)?)?\\b' },
            { begin: `\\bboolean\\b` }
        ]
    }

    const pounds = `${POUND_FUNCTIONS.join('|')}`;
    const FUNCTIONS_POUND = {
        className: 'keyword',
        relevance: 0,
        variants: [
            { begin: `#(${pounds})` }
        ]
    }

    const NUMBER = {
        className: 'number',
        relevance: 0,
        variants: [
            { begin: '\\b([0-9]+(\\.[0-9]+))+\\b' },  // doted
            { begin: '\\b([0-9a-fA-F]+)\\b' }, // numeric
            { begin: '\\b([0-9a-fA-F]+(x|X|u|U)([0-9a-fA-F]+)?)\\b' },  // hex or unsigned
            { begin: '(0(o|O)[0-7]+)' },
            { begin: '\\b(0(b|B)(0|1)+)\\b' },  // binary
            // //{ begin: '\\b([0-9]+(\\.[0-9]+)?)([eE]([+-]?)[0-9]+(\\.[0-9]+)\\b'},  // exponetials
            { begin: '\\breal(4|8)?\\b' }, // real
            { begin: '\\b(u?)decimal(\\d+(_\\d+)?)\\b' } // decimal
        ]
    };

    const LINE_COMMENT_MODE = hljs.COMMENT('//', '$', { contains: [ { begin: /\\\n/ } ] });

    const KEYWORDS_ALL = [
        ...FUNCTION,
        ...CLASSES,
        ...FUNCTION_ACTIONS,
        ...TYPE_REST
    ];

    const KEYWORDS = {
        keyword: KEYWORDS_ALL,
        built_in: BUILT_IN,
        literal: LITERALS,
        type: TYPE_NUMBER
    };
    
    return {
        name: 'ECL',
        aliases: [
            'ecl'
        ],
        case_insensitive: true,
        keywords: KEYWORDS,
        contains: [
            EMBED_BLOCK,
            EMBED_CPP_BLOCK,
            NUMBER,
            VARIABLES,
            TYPE_NUMBERS,
            FUNCTIONS_POUND,
            STRING,
            hljs.C_BLOCK_COMMENT_MODE,
            LINE_COMMENT_MODE
        ]
    };
}