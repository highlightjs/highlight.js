/*
 Language: Step_definitions
 Author: Sam Pikesley (@pikesley) <sam.pikesley@theodi.org>
 Description: Gherkin Step Definitions
 */

function (hljs) {
    return {
        keywords: 'Before After Given And Then But When do end',
        contains: [
            {
                className: 'variable',
                begin: '\\|', end: '\\|',
                relevance: 5
            },
            {
                className: 'variable',
                begin: '/\\^', end: '\\$/'
            },
            hljs.HASH_COMMENT_MODE,
            hljs.APOS_STRING_MODE,
            hljs.QUOTE_STRING_MODE
        ]
    }
}
