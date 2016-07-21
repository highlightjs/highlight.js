/*
Language: Extended Backus-Naur Form
Author: Alex McKibben <alex@nullscope.net>
*/

function(hljs) {
    var unexpectedChars = /[:!@#%&+/$^.*]/;

    var commentMode = hljs.COMMENT(/\(\*/, /\*\)/);

    var nonTerminalMode = {
        className: "attribute",
        begin: /^[ ]*[a-zA-Z][a-zA-Z-]*([\s-]+[a-zA-Z][a-zA-Z]*)*/
    };

    var specialSequenceMode = {
        className: "meta",
        begin: /\?.*\?/
    };

    var ruleBodyMode = {
        begin: /=/, end: /;/,
        contains: [
            commentMode,
            specialSequenceMode,
            // terminals
            hljs.APOS_STRING_MODE, hljs.QUOTE_STRING_MODE
        ]
    };

    return {
        illegal: unexpectedChars,
        contains: [
            commentMode,
            nonTerminalMode,
            ruleBodyMode
        ]
    };
}
