/*
Language: Extended Backus-Naur Form
Author: Alex McKibben <alex@nullscope.net>
*/

function(hljs) {
    return {
        contains: [
            hljs.COMMENT(/\(\*/, /\*\)/),
            // terminals
            hljs.APOS_STRING_MODE, hljs.QUOTE_STRING_MODE
        ]
    };
}
