/*
 Language: Groovy
 Author: Guillaume Laforge <glaforge@gmail.com>
 Website: http://glaforge.appspot.com
 Description: Groovy programming language implementation inspired from Vsevolod's Java mode
 */

function(hljs) {
    return {
        keywords: {
            typename: 'byte short char int long boolean float double void',
            literal : 'true false null',
            keyword:
            'def super this as in assert abstract static volatile transient public private protected synchronized final ' +
            'class interface trait enum if else for while switch case break default continue ' +
            'throw throws try catch finally implements extends new import package return instanceof ' +
                // unused but reserved
            'const strictfp native'
        },

        contains: [
            {
                className: 'javadoc',
                begin: '/\\*\\*', end: '\\*//*',
                contains: [
                    {
                        className: 'javadoctag', begin: '@[A-Za-z]+'
                    }
                ],
                relevance: 10
            },
            {
                className: 'string',
                begin: '"""', end: '"""',
                relevance: 10
            },
            {
                className: 'string',
                begin: "'''", end: "'''",
                relevance: 10
            },
            {
                className: 'string',
                begin: "\\$/", end: "/\\$",
                relevance: 10
            },
            hljs.C_LINE_COMMENT_MODE,
            hljs.C_BLOCK_COMMENT_MODE,
            hljs.APOS_STRING_MODE,
            hljs.QUOTE_STRING_MODE,
            hljs.HASH_COMMENT_MODE,
            hljs.REGEXP_MODE,
            hljs.BINARY_NUMBER_MODE,
            {
                className: 'class',
                beginKeywords: 'class interface trait', end: '{',
                illegal: ':',
                contains: [
                    {
                        beginKeywords: 'extends implements',
                        relevance: 10
                    },
                    {
                        className: 'title',
                        begin: hljs.UNDERSCORE_IDENT_RE
                    }
                ]
            },
            hljs.C_NUMBER_MODE,
            {
                className: 'annotation', begin: '@[A-Za-z]+'
            }
        ]
    }
}
