/*
Language: Kusto
Description: Kusto is a service for storing and running interactive analytics over Big Data.
Author: Marat Kopytjuk <kopytjuk@gmail.com>
Website: https://docs.microsoft.com/en-us/azure/kusto/query/
Category: common
*/

export default function (hljs) {
    var AGGFUNCS = 'any anyif arg_max arg_min avg avgif binary_all_and ' +
        'binary_all_or binary_all_xor buildschema count countif dcount dcountif ' +
        'hll hll_merge make_bag make_bag_if make_list make_list_if make_list_with_nulls ' +
        'make_set make_set_if max maxif min minif percentiles stdev stdevif stdevp ' +
        'sum sumif tdigest tdigest tdigest_merge variance varianceif variancep ';
    var KEYWORDS = {
        keyword:
            'where and or count project desc by limit sort consume ' +
            'summarize render top join on kind extend sort let union' +
            'range from to step reduce with evaluate invoke range',
        built_in:
            AGGFUNCS +
            'bool abs acos datetime anomalychart double todouble ' +
            'bin ago datatable totimespan string int toscalar ',
        literal: 'false true null',
    };
    return {
        name: "Kusto",
        case_insensitive: true,
        keywords: KEYWORDS,
        contains: [
            //hljs.NUMBER_MODE,
            hljs.QUOTE_STRING_MODE,
            hljs.APOS_STRING_MODE,
            hljs.C_LINE_COMMENT_MODE,
            // contains numbers and timeperiods
            {
                className: 'number',
                begin: hljs.NUMBER_RE + '(' +
                    'tick|microsecond|ms|s|h|d' +
                    ')?',
                relevance: 10
            }
        ],
        aliases: ['kql', 'kusto']
    }
}