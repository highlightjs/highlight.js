/*
Language: Dylan
Author: P Hull <peterhull90@gmail.com>
Category: functional
*/

function(hljs) {
    var DYLAN_CORE_WORDS = ["define", "end", "handler", "let", "local", "macro", "otherwise"],
        DYLAN_BEGIN_WORDS = ["begin", "block", "case", "for", "if", "method",
            "select", "unless", "until", "while"
        ],
        DYLAN_FUNCTION_WORDS = [],
        DYLAN_DEFINE_BODY_WORDS = ["class", "library", "method", "module"],
        DYLAN_DEFINE_LIST_WORDS = ["constant", "variable", "domain"],
        DYLAN_RESERVED_WORDS = [].concat(DYLAN_CORE_WORDS,
            DYLAN_BEGIN_WORDS,
            DYLAN_FUNCTION_WORDS,
            DYLAN_DEFINE_BODY_WORDS.map(function(word) {
                return word + '|2';
            }),
            DYLAN_DEFINE_LIST_WORDS
        ),
        DYLAN_HASH_WORDS = ["#t", "#f", "#next", "#rest", "#key", "#all-keys", "#include"],
        DYLAN_WORD = '[a-z\-+\*/^=#!%$_><@\?~][a-z0-9\-+\*/^=#!%$_><@\?~]*',
        KEYWORDS = {
            literal: DYLAN_HASH_WORDS.join(" "),
            keyword: DYLAN_RESERVED_WORDS.join(" ")
        },
        DYLAN_CODE = {
            case_insensitive: true,
            className: 'dylan',
            lexemes: DYLAN_WORD,
            keywords: KEYWORDS,
            contains: [{
                    className: 'class',
                    begin: '<' + DYLAN_WORD + '>',
                    relevance: 0
                },
                {
                    className: 'symbol',
                    begin: '#' + DYLAN_WORD
                },
                {
                    className: 'symbol',
                    begin: DYLAN_WORD + ':',
                    relevance: 0
                },
                {
                    className: 'string',
                    begin: '\'\\\\?.',
                    end: '\'',
                    illegal: '.'
                },
                hljs.C_NUMBER_MODE,
                hljs.QUOTE_STRING_MODE,
                hljs.C_LINE_COMMENT_MODE,
                hljs.C_BLOCK_COMMENT_MODE
            ]
        };

    return DYLAN_CODE;
}