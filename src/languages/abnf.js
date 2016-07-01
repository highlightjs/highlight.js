/*
Language: ABNF
Description: Augmented Backus-Naur Form
Category: Meta
Author: Alex McKibben <alex@nullscope.net>
*/

function(hljs) {
    var keywords = [
        "ALPHA|10",
        "DIGIT|10",
        "HEXDIG|10",
        "DQUOTE|10",
        "SP|10",
        "HTAB|10",
        "WSP|10",
        "LWSP|10",
        "VCHAR|10",
        "CHAR|10",
        "OCTET|10",
        "CTL|10",
        "CR|10",
        "LF|10",
        "CRLF|10",
        "BIT|10"
    ];

    var terminalBinaryMode = {
        className: "built_in",
        begin: /%b[0-1]+-{0,1}[0-1]*/,
        relevance: 10
    };

    var terminalDecimalMode = {
        className: "built_in",
        begin: /%d[0-9]+-{0,1}[0-9]*/,
        relevance: 10
    };

    var terminalHexadecimalMode = {
        className: "built_in",
        begin: /%x[0-9A-F]+-{0,1}[0-9A-F]*/,
        relevance: 10
    };

    var commentMode = hljs.COMMENT(";", "$");

    var ruleNameMode = {
        className: "type",
        begin: "\\b(?!\\b" + keywords.join("|") + "\\b)[a-zA-Z][a-zA-Z0-9-]+\\b",
        relevance: 10
    };

    var ruleNameDeclarationMode = {
        className: "type",
        begin: /[a-zA-Z][a-zA-Z0-9-]+/,
        starts: {
            end: /=/,
            excludeEnd: true,
            illegal: /\s/,
            starts: {
                end: /$/,
                keywords: keywords.join(" "),
                contains: [
                    commentMode,
                    ruleNameMode,
                    terminalBinaryMode,
                    terminalDecimalMode,
                    terminalHexadecimalMode,
                    hljs.QUOTE_STRING_MODE,
                    hljs.NUMBER_MODE
                ],
                relevance: 10
            },
            relevance: 0
        }
    };

    return {
        contains: [
            commentMode,
            ruleNameDeclarationMode
        ]
    };
}
