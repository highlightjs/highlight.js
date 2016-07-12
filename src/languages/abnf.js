/*
Language: Augmented Backus-Naur Form
Category: Meta
Author: Alex McKibben <alex@nullscope.net>
*/

function(hljs) {
    var keywords = [
        "ALPHA",
        "BIT",
        "CHAR",
        "CR",
        "CRLF",
        "CTL",
        "DIGIT",
        "DQUOTE",
        "HEXDIG",
        "HTAB",
        "LF",
        "LWSP",
        "OCTET",
        "SP",
        "VCHAR",
        "WSP"
    ];

    var terminalBinaryMode = {
        className: "built_in",
        begin: /%b[0-1]+(-[0-1]+|(\.[0-1]+)+){0,1}/
    };

    var terminalDecimalMode = {
        className: "built_in",
        begin: /%d[0-9]+(-[0-9]+|(\.[0-9]+)+){0,1}/
    };

    var terminalHexadecimalMode = {
        className: "built_in",
        begin: /%x[0-9A-F]+(-[0-9A-F]+|(\.[0-9A-F]+)+){0,1}/,
    };

    var ruleNameRegex = /^[a-zA-Z][a-zA-Z0-9-]+/;

    var ruleReferenceMode = {
        className: "type",
        begin: "\\b(?!\\b" + keywords.join("|") + "\\b)[a-zA-Z][a-zA-Z0-9-]+\\b"
    };

    var commentMode = hljs.COMMENT(";", "$");

    var ruleNameDeclarationMode = {
        className: "type",
        begin: ruleNameRegex,
        starts: {
            end: /=/,
            excludeEnd: true,
            illegal: /\S/,
            starts: {
                end: ruleNameRegex,
                returnEnd: true,
                keywords: keywords.join(" "),
                contains: [
                    commentMode,
                    ruleReferenceMode,
                    terminalBinaryMode,
                    terminalDecimalMode,
                    terminalHexadecimalMode,
                    hljs.QUOTE_STRING_MODE,
                    hljs.NUMBER_MODE
                ]
            }
        }
    };

    return {
        contains: [
            commentMode,
            ruleNameDeclarationMode
        ]
    };
}
