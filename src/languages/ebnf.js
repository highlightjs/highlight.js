/*
Language: Extended Backus-Naur Form
Author: Alex McKibben <alex@nullscope.net>
*/

function(hljs) {
    var nonTerminalMode = {
        className: "attribute",
        begin: /^[ ]*[a-zA-Z][a-zA-Z-]*([\s-]+[a-zA-Z][a-zA-Z]*)*/,
    };

    var specialSequenceMode = {
        className: "meta",
        begin: /\?.*\?/
    };

    return {
        contains: [
            nonTerminalMode,
            specialSequenceMode,
            hljs.COMMENT(/\(\*/, /\*\)/),
            // terminals
            hljs.APOS_STRING_MODE, hljs.QUOTE_STRING_MODE
        ]
    };
}
