/*
Language: CSHTML
Requires: xml.js, cs.js
Author: Roman Resh <romanresh@live.com>
Category: common
*/

function(hljs) {
    var SPECIAL_SYMBOL_CLASSNAME = "built_in";

    var BLOCK_TEXT = {
        begin: "[@]{0,1}<text>",
        returnBegin: true,  
        end: "</text>",
        returnEnd: true,
        subLanguage: "cshtml",
        contains: [
            {
                begin: "[@]{0,1}<text>",
                className: SPECIAL_SYMBOL_CLASSNAME
            },
            {
                begin: "</text>",
                className: SPECIAL_SYMBOL_CLASSNAME,
                endsParent: true,
            }
        ]
    };

    var DIRECTIVES = {
        begin: "^@(model|using|inherits|inject)[^\\r\\n{\\(]*$",
        end: "$",
        className: SPECIAL_SYMBOL_CLASSNAME,
        returnBegin: true,
        returnEnd: true,
        contains: [ 
            {
                begin: "@(model|using|inherits|inject)",
                className: SPECIAL_SYMBOL_CLASSNAME,
            },
            {
                variants: [
                    {
                        begin: "\\s+",
                        end: "$",
                    },
                    {
                        begin: "$"
                    },
                ],
                className: "type",
                endsParent: true
            }
        ]
    };

    var EXCEPTIONS = {
        variants: [
            { begin: "@@" },
            { begin: "[a-zA-Z]+@" },
        ],
        skip: true
    }

    var ONE_LINE_EXPRESSION = {
        begin: "@[a-zA-Z]+",
        returnBegin: true,
        end: "(\\r|\\n|<|\\s)",
        subLanguage: 'cs',
        contains: [
            {
                begin: '@',
                className: SPECIAL_SYMBOL_CLASSNAME
            },
            { 
                begin: '".*(?!$)"',
                skip: true
            },
            {
                begin: '"',
                endsParent: true
            }
        ],
        returnEnd: true
    };

    var ONE_LINE_AWAIT = {
        begin: "@await ",
        returnBegin: true,
        subLanguage: 'cs',
        end: "(\\r|\\n|<|\\s)",
        contains: [
            {
                begin: "@await ",
                className: SPECIAL_SYMBOL_CLASSNAME
            },
            {
                begin: "[<\\r\\n]",
                endsParent: true
            }
        ]
    };

    var BLOCK_ROUND_BRACKET = {
        begin: "@\\(",
        end: "\\)",
        returnBegin: true,
        returnEnd: true,
        subLanguage: 'cs',
        contains: [
            {
                begin: "@\\(",
                className: SPECIAL_SYMBOL_CLASSNAME
            },
            {
                begin: "\\(",
                end: "\\)",
                subLanguage: 'cs',
                contains: [hljs.QUOTE_STRING_MODE, BLOCK_TEXT, 'self']
            },
            BLOCK_TEXT,
            {
                begin: "\\)",
                className: SPECIAL_SYMBOL_CLASSNAME,
                endsParent: true
            }
        ]
    };

    var BLOCK_FIGURE_BRACKET = {
        begin: "@\\{",
        returnBegin: true,
        returnEnd: true,
        end: "\\}",
        subLanguage: 'cs',
        contains: [
            {
                begin: "@\\{",
                className: SPECIAL_SYMBOL_CLASSNAME
            },
            {
                begin: "{",
                end: "}",
                contains: [hljs.QUOTE_STRING_MODE, BLOCK_TEXT, 'self']
            },
            BLOCK_TEXT,
            {
                begin: "\\}",
                className: SPECIAL_SYMBOL_CLASSNAME,
                endsParent: true
            }
        ],
    };

    

    var BUILT_IN_CODE_BLOCKS_VARIANTS = [
        {
            begin: "@for[\\s]*\\([^{]+[\\s]*{",
            end: "}"
        },
        {
            begin: "@if[\\s]*\\([^{]+[\\s]*{",
            end: "}"
        },
        {
            begin: "@switch[\\s]*\\([^{]+[\\s]*{",
            end: "}"
        },
        {
            begin: "@while[\\s]*\\([^{]+[\\s]*{",
            end: "}"
        },
        {
            begin: "@using[\\s]*\\([^{]+[\\s]*{",
            end: "}"
        },
        {
            begin: "@lock[\\s]*\\([^{]+[\\s]*{",
            end: "}"
        },
        {
            begin: "@foreach[\\s]*\\([^{]+[\\s]*{",
            end: "}"
        },
    ];
    var BUILT_IN_CODE_BLOCKS = {
        variants: BUILT_IN_CODE_BLOCKS_VARIANTS,
        returnBegin: true,
        returnEnd: true,
        subLanguage: "cshtml",
        contains: [
            {
                variants: BUILT_IN_CODE_BLOCKS_VARIANTS.map(function(v) {
                    return {
                        begin: v.begin
                    };
                }),
                returnBegin: true,
                contains: [
                     { begin: "@", className: SPECIAL_SYMBOL_CLASSNAME },
                     { 
                         variants: BUILT_IN_CODE_BLOCKS_VARIANTS.map(function(v) { 
                            return {
                                begin: v.begin.substr(1, v.begin.length - 2)
                            }; }), 
                         subLanguage: "cs" },
                     { begin: "{", className: SPECIAL_SYMBOL_CLASSNAME }
                ]
            },
            {
                begin: "{",
                end: "}",
                contains: [hljs.QUOTE_STRING_MODE, 'self']
            },
            BLOCK_TEXT,

            {
                variants: [
                    {
                        begin: "}[\\s]*else\\sif[\\s]*\\([^\\)]+\\)[\\s]*{"
                    },
                    {
                        begin: "}[\\s]*else[\\s]*{"
                    }
                ],
                returnBegin: true,
                contains: [
                    {
                        begin: "}",
                        className: SPECIAL_SYMBOL_CLASSNAME
                    },
                    {
                        variants: [
                            {
                                begin: "[\\s]*else\\sif[\\s]*\\([^\\)]+\\)[\\s]*",
                            },
                            {
                                begin: "[\\s]*else[\\s]*",
                            },
                        ],
                        subLanguage: "cs"
                    },
                    {
                        begin: "{",
                        className: SPECIAL_SYMBOL_CLASSNAME
                    }
                ]
            },

            {
                begin: "}",
                className: SPECIAL_SYMBOL_CLASSNAME,
                endsParent: true
            },
        ]
    };


    var BLOCK_TRY = {
        begin: "@try[\\s]*{",
        end: "}",
        returnBegin: true,
        returnEnd: true,
        subLanguage: "cs",
        contains: [
            {
                begin: "@",
                className: SPECIAL_SYMBOL_CLASSNAME
            },
            {
                begin: "try[\\s]*{",
                subLanguage: "cs"
            },
            {
                begin: "{",
                end: "}",
                contains: [hljs.QUOTE_STRING_MODE, 'self']
            },
            {
                variants: [
                    {
                        begin: "}[\\s]*catch[\\s]*\\([^\\)]+\\)[\\s]*{"
                    },
                    {
                        begin: "}[\\s]*finally[\\s]*{"
                    }
                ],
                returnBegin: true,
                contains: [
                    {
                        begin: "}",
                        className: SPECIAL_SYMBOL_CLASSNAME
                    },
                    {
                        variants: [
                            {
                                begin: "[\\s]*catch[\\s]*\\([^\\)]+\\)[\\s]*",
                            },
                            {
                                begin: "[\\s]*finally[\\s]*",
                            },
                        ],
                        subLanguage: "cs"
                    },
                    {
                        begin: "{",
                        className: SPECIAL_SYMBOL_CLASSNAME
                    }
                ]
            },
            {
                begin: "}",
                className: SPECIAL_SYMBOL_CLASSNAME,
                endsParent: true
            },
        ]
    };


    var BLOCK_FUNCTIONS = {
        begin: "@functions[\\s]*{",
        end: "}",
        returnBegin: true,
        returnEnd: true,
        subLanguage: "cs",
        contains: [
            {
                begin: "@functions[\\s]*{",
                className: SPECIAL_SYMBOL_CLASSNAME
            },
            {
                begin: "{",
                end: "}",
                contains: [hljs.QUOTE_STRING_MODE, 'self']
            },
            {
                begin: "}",
                className: SPECIAL_SYMBOL_CLASSNAME,
                endsParent: true
            }
        ]
    };

    var BLOCK_SECTION = {
        begin: "@section[\\s]+[a-zA-Z0-9]+[\\s]*{",
        returnBegin: true,
        returnEnd: true,
        subLanguage: "cshtml",
        end: "}",
        contains: [
            {
                begin: "@section[\\s]+[a-zA-Z0-9]+[\\s]*{",
                className: SPECIAL_SYMBOL_CLASSNAME
            },
            {
                begin: "{",
                end: "}",
                contains: [hljs.QUOTE_STRING_MODE, 'self']
            },
            {
                begin: "}",
                className: SPECIAL_SYMBOL_CLASSNAME,
                endsParent: true
            }
        ]
    }

    return {
        subLanguage: 'xml',
        contains: [
            hljs.COMMENT("@\\*", "\\*@"),
            EXCEPTIONS,
            DIRECTIVES,
            BLOCK_FUNCTIONS,
            BLOCK_SECTION,
            BLOCK_TRY,
            BUILT_IN_CODE_BLOCKS,
            ONE_LINE_AWAIT,
            ONE_LINE_EXPRESSION,
            BLOCK_ROUND_BRACKET,
            BLOCK_FIGURE_BRACKET,
            BLOCK_TEXT
        ]
    };
}