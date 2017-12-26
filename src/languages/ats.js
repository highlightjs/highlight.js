/*
Language: ATS2
Author:: Ryan King <rtking@bu.edu>
Description: ATS language definition.
Category: functional
*/
function(hljs) {
    var NUMBERS = {
        className: 'number',
        variants: [
            { begin: '\\b(0b[01\']+)' },
            { begin: '(-?)\\b([\\d\']+(\\.[\\d\']*)?|\\.[\\d\']+)(u|U|l|L|ul|UL|f|F|b|B)' },
            { begin: '(-?)(\\b0[xX][a-fA-F0-9\']+|(\\b[\\d\']+(\\.[\\d\']*)?|\\.[\\d\']+)([eE][-+]?[\\d\']+)?)' }
        ],
        relevance: 0
    };

    var STRINGS = {
        className: 'string',
        variants: [
            {
                begin: '(u8?|U)?L?"', end: '"',
                illegal: '\\n',
                contains: [hljs.BACKSLASH_ESCAPE]
            },
            {
                begin: '(u8?|U)?R"', end: '"',
                contains: [hljs.BACKSLASH_ESCAPE]
            },
            {
                begin: '\'\\\\?.', end: '\'',
                illegal: '.'
            }
        ]
    };

    var ATS_COMMENT_MODE =
        hljs.COMMENT(
            '\\(\\*',
            '\\*\\)',
            {
                contains: ['self']
            }
        );


    var C_MODE = {
        className: 'meta',
        begin: /%{#/,
        end: /%}/
    };

    var PREPROCESSOR = {
        className: 'meta',
        begin: /#\s*[a-z]+\b/,
        end: / /,
        keywords: {
            'meta-keyword':
            'assert define elif elifdef elifndef else endif error if ifdef ' +
                'ifndef include print then undef'
        }
    };

    var ATS_SPECIAL_KEYWORDS = {
        className: 'meta',
        begin: /\$[_a-zA-Z0-9]+\b/,
        end: /[\s+\.]/,
        keywords: {
            'meta-keyword':
            'arrpsz arrptrsize delay ldelay effmask effmask_ntm ' +
                'effmask_exn effmask_ref effmask_wrt effmask_all extern ' +
                'extkind  extype extype_struct extval lst lst_t lst_vt list ' +
                'list_t list_vt rec rec_t rec_vt record record_t record_vt ' +
                'tup tup_t tup_vt tuple tuple_t tuple_vt raise showtype ' +
                'myfilename mylocation myfunction'
        }
    };

    var ATS_KEYWORDS = {
        keyword:
        'abstype abst0ype abst@ype absprop absview absvtype absviewtype ' +
            'absvt0ype absvt@ype absviewt0ype and as assume begin break ' +
            'case continue classdec datasort datatype dataprop dataview ' +
            'datavtype dataviewtype do dynload else end exception extern ' +
            'extype extval fn fnx fun prfn prfun praxi castfn if ifcase in ' +
            'infix infixl infixr prefix postfix implmnt implement ' +
            'primplmnt primplement lam llam fix let local macdef ' +
            'macrodef nonfix overload of op rec scase sif sortdef sta ' +
            'stacst stadef stavar staload symelim symintr then try ' +
            'tkindef type typedef propdef viewdef vtypedef viewtypedef ' +
            'val prval var prvar when where for while with withtype ' +
            'withprop withview withvtype withviewtype',
        built_in:
        'bool char schar uchar float uint lint ulint llint ullint size_t ' +
            'ssize_t sint usint string',
        literal:
        'true false nil'
    };

    var ATS_TYPE = {
        className: 'type',
        begin: /:\s*[a-zA-Z0-9_]+/,
        end: /[\s*,)]/,
        excludeEnd: true,
        keywords: {
            keyword: ':'
        }
    };

    return {
        aliases: ['dats', 'sats', 'hats'],
        keywords: ATS_KEYWORDS,
        contains: [
            C_MODE,
            PREPROCESSOR,
            ATS_SPECIAL_KEYWORDS,
            STRINGS,
            NUMBERS,
            ATS_TYPE,
            ATS_COMMENT_MODE,
            hljs.C_LINE_COMMENT_MODE,
            hljs.C_BLOCK_COMMENT_MODE
        ]
    };
}
