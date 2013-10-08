/*
 Language: Gherkin
 Author: Sam Pikesley (@pikesley) <sam.pikesley@theodi.org>
 Description: Gherkin (Cucumber etc)
 */

function (hljs) {
    return {
        keywords: 'Feature Background Ability Business\ Need Scenario Scenarios Scenario\ Outline Scenario\ Template Examples Given And Then But When',
        contains: [
            {
                className: 'keyword',
                begin: '\\*'
            },
            {
                className: 'comment',
                begin: '@[^@\r\n\t ]+', end: '$'
            },
            {
                className: 'string',
                begin: '\\|', end: '\\$',
                relevance: 10
            },
            {
                className: 'variable',
                begin: '<', end: '>',
            },
            hljs.HASH_COMMENT_MODE,
            {
                className: 'string',
                begin: '"""', end: '"""',
                relevance: 0
            },
            hljs.APOS_STRING_MODE,
            hljs.QUOTE_STRING_MODE
        ]
    }
}
