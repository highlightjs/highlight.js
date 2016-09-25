/*
 Language: Flix
 Category: functional
 Author: Magnus Madsen <mmadsen@uwaterloo.ca>
 */

function (hljs) {

    var CHAR = {
        className: 'string',
        begin: /'(.|\\[xXuU][a-zA-Z0-9]+)'/,
        relevance: 0
    };

    var STRING = {
        className: 'string',
        variants: [
            {
                begin: '"', end: '"'
            }
        ],
        relevance: 0
    };

    var NAME = {
        className: 'title',
        begin: /[^0-9\n\t "'(),.`{}\[\]:;][^\n\t "'(),.`{}\[\]:;]+|[^0-9\n\t "'(),.`{}\[\]:;=]/,
        relevance: 0
    };

    var METHOD = {
        className: 'function',
        beginKeywords: 'def',
        end: /[:={\[(\n;]/,
        excludeEnd: true,
        contains: [NAME],
        relevance: 0
    };

    return {
        keywords: {
            literal: 'true false',
            keyword: 'case|10 class def|0 else|0 enum|0 if|0 impl import|0 in|0 lat|10 rel|10 index|10 let|0 match|0 namespace|10 switch|0 type|0 yield|0 with|0'
        },
        contains: [
            hljs.C_LINE_COMMENT_MODE,
            hljs.C_BLOCK_COMMENT_MODE,
            CHAR,
            STRING,
            METHOD,
            hljs.C_NUMBER_MODE
        ]
    };
}
