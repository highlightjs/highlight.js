/*
Language: Extended Backus-Naur Form
Author: Alex McKibben <alex@nullscope.net>
Website: https://en.wikipedia.org/wiki/Extended_Backus–Naur_form
*/

export default function(hljs) {
    var commentMode = hljs.COMMENT(/\(\*/, /\*\)/);

    var nonTerminalMode = {
        className: "attribute",
        begin: /^[ ]*[a-zA-Z][a-zA-Z-_]*([\s-_]+[a-zA-Z][a-zA-Z]*)*/
    };

    var specialSequenceMode = {
        className: "meta",
        begin: /\?.*\?/
    };

    var ruleBodyMode = {
        begin: /=/, end: /[.;]/,
        contains: [
            commentMode,
            specialSequenceMode,
            {
              // terminals
              className: 'string',
              variants: [
                hljs.APOS_STRING_MODE,
                hljs.QUOTE_STRING_MODE,
                {begin: '`', end: '`'},
              ]
            },
        ]
    };

    return {
        name: 'Extended Backus-Naur Form',
        illegal: /\S/,
        contains: [
            commentMode,
            nonTerminalMode,
            ruleBodyMode
        ]
    };
}
