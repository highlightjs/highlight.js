/*
Language: Scheme
Description: Generic scheme syntax
Author: JP Verkamp (me@jverkamp.com)

Keywords based on:
Based on http://community.schemewiki.org/?scheme-keywords

Based on Generic lisp syntax by Vasily Polovnyov <vast@whiteants.net>
*/

function(hljs) {
    var SCHEME_IDENT_RE = '[^\\(\\)\\[\\]\\{\\}",\'`;#|\\\\\\s]+';
    var SCHEME_SIMPLE_NUMBER_RE = '(\\-|\\+)?\\d+([./]\\d+)?';
    var SCHEME_COMPLEX_NUMBER_RE = SCHEME_SIMPLE_NUMBER_RE + '[+\\-]' + SCHEME_SIMPLE_NUMBER_RE + 'i';

    var SHEBANG = {
        className: 'shebang',
        begin: '^#!',
        end: '$'
    };

    var LITERAL = {
        className: 'literal',
        begin: '(#t|#f|#\\\\' + SCHEME_IDENT_RE + '|#\\\\.)'
    };

    var NUMBER = {
        className: 'number',
        variants: [
            { begin: SCHEME_SIMPLE_NUMBER_RE, relevance: 0 },
            { begin: SCHEME_COMPLEX_NUMBER_RE, relevance: 0 },
            { begin: '#b[0-1]+(/[0-1]+)?' },
            { begin: '#o[0-7]+(/[0-7]+)?' },
            { begin: '#x[0-9a-f]+(/[0-9a-f]+)?' }
        ]
    };

    var STRING = hljs.QUOTE_STRING_MODE;

    var REGULAR_EXPRESSION = {
        className: 'regex',
        begin: '#[pr]x"',
        end: '[^\\\\]"'
    };

    var COMMENT = {
        className: 'comment',
        variants: [
            { begin: ';',  end: '$', relevance: 0 },
            { begin: '#\\|', end: '\\|#' }
        ]
    };

    var IDENT = {
        className: '',
        begin: SCHEME_IDENT_RE,
        relevance: 0
    };

    var QUOTED_IDENT = {
        className: 'variable',
        begin: '\'' + SCHEME_IDENT_RE
    };

    var BODY = {
        endsWithParent: true,
        relevance: 0
    };

    var LIST = {
        className: 'list',
        variants: [
            { begin: '\\(', end: '\\)' },
            { begin: '\\[', end: '\\]' }
        ],
        contains: [{className: 'keyword', begin: SCHEME_IDENT_RE}, BODY]
    };

    BODY.contains = [LITERAL, NUMBER, STRING, COMMENT, IDENT, QUOTED_IDENT, LIST];

    return {
        lexemes: '([\\(\\)\\[\\]\\{\\}",\'`;#|\\\\\\s]|' + SCHEME_IDENT_RE + ')',
        illegal: /\S/,
        contains: [SHEBANG, NUMBER, STRING, COMMENT, QUOTED_IDENT, LIST]
    };
}
