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
                // groovy specific keywords
            'def|2 as|2 in|2 assert|2 trait|2 ' +
                // common keywords with Java
            'super this abstract static volatile transient public private protected synchronized final ' +
            'class interface enum if else for while switch case break default continue ' +
            'throw throws try catch finally implements extends new import package return instanceof ' +
                // unused but reserved keywords
            'const|0 strictfp|0 native|0 do|0'
        },

        contains: [
            hljs.C_LINE_COMMENT_MODE,
            {
                className: 'javadoc',
                begin: '/\\*\\*', end: '\\*//*',
                contains: [
                    {
                        className: 'javadoctag', begin: '@[A-Za-z]+'
                    }
                ]
            },
            hljs.C_BLOCK_COMMENT_MODE,
            {
                className: 'string',
                begin: '"""', end: '"""'
            },
            {
                className: 'string',
                begin: "'''", end: "'''"
            },
            {
                className: 'string',
                begin: "\\$/", end: "/\\$",
                relevance: 10 // bumping relevance as it's specific to Groovy
            },
            hljs.APOS_STRING_MODE,
            {
                className: 'regexp',
                begin: /~?\/[^\/\n]+\//,
                contains: [
                    hljs.BACKSLASH_ESCAPE
                ]
            },
            hljs.QUOTE_STRING_MODE,
            {
                className: 'shebang',
                begin: "^#!/usr/bin/env", end: '$',
                illegal: '\n'
            },
            hljs.BINARY_NUMBER_MODE,
            {
                className: 'class',
                beginKeywords: 'class interface trait enum', end: '{',
                illegal: ':',
                contains: [
                    {
                        beginKeywords: 'extends implements'
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
            },
            {
                // highlight map keys and named parameters as strings
                className: 'string', begin: /[^\?]{0}[A-Za-z0-9_$]+ *:/
            },
            {
                // catch middle element of the ternary operator
                // to avoid highlight it as a label, named parameter, or map key
                begin: /\?/, end: /\:/
            },
            {
                // highlight labeled statements
                className: 'label', begin: '^\\s*[A-Za-z0-9_$]+:'
            },
        ]
    }
}
