/*
Language: Augmented Backus-Naur Form
Author: Alex McKibben <alex@nullscope.net>
Website: https://tools.ietf.org/html/rfc5234
*/

function(hljs) {
    var regexes = {
        ruleDeclaration: "^[a-zA-Z][a-zA-Z0-9-]*",
        unexpectedChars: "[!@#$^&',?+~`|:]"
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

    var commentMode = hljs.COMMENT(";", "$");

    var terminalBinaryMode = {
        className: "symbol",
        begin: /%b[0-1]+(-[0-1]+|(\.[0-1]+)+){0,1}/
    };

    var terminalDecimalMode = {
        className: "symbol",
        begin: /%d[0-9]+(-[0-9]+|(\.[0-9]+)+){0,1}/
    };

    var terminalHexadecimalMode = {
        className: "symbol",
        begin: /%x[0-9A-F]+(-[0-9A-F]+|(\.[0-9A-F]+)+){0,1}/,
    };

    var caseSensitivityIndicatorMode = {
        className: "symbol",
        begin: /%[si]/
    };

    var ruleDeclarationMode = {
        className: "attribute",
        begin: regexes.ruleDeclaration + '(?=\\s*=)',
    };

    return {
      illegal: regexes.unexpectedChars,
      keywords: keywords.join(" "),
      contains: [
          ruleDeclarationMode,
          commentMode,
          terminalBinaryMode,
          terminalDecimalMode,
          terminalHexadecimalMode,
          caseSensitivityIndicatorMode,
          hljs.QUOTE_STRING_MODE,
          hljs.NUMBER_MODE
      ]
    };
}
