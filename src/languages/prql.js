export default function (hljs) {
    const TRANSFORMS = ['from', 'select|2', 'derive|3', 'filter', 'take', 'sort', 'join', 'aggregate|3', 'func', 'group', 'window|4', 'prql|10'];
    const ILLEGAL = [/:=/, /\[:/, /`/];

    return {
        name: 'PRQL',
        case_insensitive: true,
        keywords: {
            keyword: TRANSFORMS.join(' '),
            literal: 'false true null and or not',
        },
        illegal: ILLEGAL,
        contains: [
            hljs.COMMENT('#', '$'),
            { // named arg
                scope: 'params',
                begin: /\w+\s*:/,
                end: '',
                illegal: ILLEGAL,
                relevance: 1
            },
            { // assign
                // TODO: handle operators like `== `
                scope: { 1: 'variable' },
                match: [/\w+\s*/, /=[^=]/],
                illegal: ILLEGAL,
                relevance: 0
            },
            { // date
                scope: 'literal',
                begin: /@\d{2}/,
                end: ' ',
                illegal: ILLEGAL,
                relevance: 2
            },
            { // interpolation string
                scope: 'attribute',
                begin: '(s|f)"', end: '"',
                relevance: 3
            },
            { // normal string
                scope: 'string',
                begin: '"', end: '"',
                relevance: 0
            },

        ]
    }
}
