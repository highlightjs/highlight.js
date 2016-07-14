/*
Language: Augmented Backus-Naur Form
Category: Meta
Author: Alex McKibben <alex@nullscope.net>
*/

function(hljs) {
    // reusable regular expressions
    var regexes = {
        ruleDeclaration: /^[a-zA-Z][a-zA-Z0-9-]*/,
        ruleReference: /[a-zA-Z][a-zA-Z0-9-]*/,
        unexpectedChars: /[!@#$^&',?+~`|:]/
    };

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

    var keywordMode = {
        beginKeywords: keywords.join(" ")
    };

    var commentMode = hljs.COMMENT(";", "$");

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

    var caseSensitivityIndicatorMode = {
        className: "built_in",
        begin: /%[si]/
    };

    var ruleReferenceMode = {
        className: "type",
        begin: regexes.ruleReference
    };

    var ruleDeclarationMode = {
        className: "type",
        begin: regexes.ruleDeclaration,
        starts: {
            end: /=/,
            excludeEnd: true,
            illegal: /\S/,
            starts: {
                end: regexes.ruleDeclaration,
                returnEnd: true,
                illegal: regexes.unexpectedChars,
                contains: [
                    commentMode,
                    keywordMode,
                    ruleReferenceMode,
                    terminalBinaryMode,
                    terminalDecimalMode,
                    terminalHexadecimalMode,
                    caseSensitivityIndicatorMode,
                    hljs.QUOTE_STRING_MODE,
                    hljs.NUMBER_MODE
                ]
            }
        }
    };

    return {
        contains: [
            commentMode,
            ruleDeclarationMode
        ]
    };
}
