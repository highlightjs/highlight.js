/*
Language: ABNF
Description: Augmented Backus-Naur Form
Category: Meta
Author: Alex McKibben <alex@nullscope.net>
*/

function(hljs) {
    var keywords = [
        "ALPHA",
        "DIGIT",
        "HEXDIG",
        "DQUOTE",
        "SP",
        "HTAB",
        "WSP",
        "LWSP",
        "VCHAR",
        "CHAR",
        "OCTET",
        "CTL",
        "CR",
        "LF",
        "CRLF",
        "BIT"
    ];

    var ruleMode = {
        className: "type",
        begin: "\\b(?!\\b" + keywords.join("|") + "\\b)[a-zA-Z][a-zA-Z0-9-]+\\b",
        illegal: /_\W/
    };

    var terminalBinaryMode = {
        className: "built_in",
        begin: /%b[0-1]+/
    };

    var terminalDecimalMode = {
        className: "built_in",
        begin: /%d[0-9]+/
    };

    var terminalHexadecimalMode = {
        className: "built_in",
        begin: /%x[0-9A-F]+/
    };

    var terminalUpperValueRangeMode = {
        className: "built_in",
        begin: /-/, end: /[0-9A-F]+/,
        excludeBegin: true,
        relevance: 0
    };

    return {
        lexemes: /[a-zA-Z]+/,
        keywords: keywords.join(" "),
        contains: [
            ruleMode,
            terminalBinaryMode,
            terminalDecimalMode,
            terminalHexadecimalMode,
            terminalUpperValueRangeMode,
            hljs.QUOTE_STRING_MODE,
            hljs.NUMBER_MODE,
            hljs.COMMENT(";", "$")
        ],
        illegal: /\W(?==)/
    };
}
