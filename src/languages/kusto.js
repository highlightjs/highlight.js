/*
Language: Kusto
Description: Kusto is a service for storing and running interactive analytics over Big Data.
Author: Marat Kopytjuk <kopytjuk@gmail.com>
Website: https://docs.microsoft.com/en-us/azure/kusto/query/
Category: common
*/

export default function (hljs) {

    var MISC_OPS = 'let datatable range ';

    var TABULAR_OPS = 'as consume count distinct evaluate extend externaldata ' +
        'facet find fork getschema invoke join limit lookup make-series mv-apply ' +
        'mv-expand order project project-away project-rename project-reorder parse ' +
        'parse-where partition print reduce render sample sample-distinct search ' +
        'serialize sort summarize take top top-nested top-hitters union where ';

    var AGGFUNCS = 'any anyif arg_max arg_min avg avgif binary_all_and ' +
        'binary_all_or binary_all_xor buildschema count countif dcount dcountif ' +
        'hll hll_merge make_bag make_bag_if make_list make_list_if make_list_with_nulls ' +
        'make_set make_set_if max maxif min minif percentiles stdev stdevif stdevp ' +
        'sum sumif tdigest tdigest tdigest_merge variance varianceif variancep ';

    var JOIN_FLAVOURS = 'innerunique inner leftouter rightouter fullouter leftanti ' +
        'anti leftantisemi rightanti rightantisemi leftsemi rightsemi '

    var KEYWORDS = {
        keyword: TABULAR_OPS + MISC_OPS,

        built_in:
            AGGFUNCS + JOIN_FLAVOURS +
            'by on kind from with bool step to desc abs acos datetime ' +
            'anomalychart double todouble bin ago datatable totimespan ' +
            'string int toscalar inner outer',

        literal: 'false true null',
    };

    var NUMBER = {
        className: 'number', relevance: 0,
        variants: [
            { begin: /\b\d+(tick|microsecond|ms|s|h|d)/ }, // time literal
            { begin: hljs.C_NUMBER_RE },
        ]
    };

    return {
        name: "Kusto",
        case_insensitive: true,
        keywords: KEYWORDS,
        contains: [
            hljs.QUOTE_STRING_MODE,
            hljs.APOS_STRING_MODE,
            hljs.C_LINE_COMMENT_MODE,
            // contains numbers and timeperiods
            NUMBER,
        ],
        aliases: ['kql', 'kusto']
    }
}