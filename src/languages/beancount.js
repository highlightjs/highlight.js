/*
Language: Beancount
Author: Henrique Bastos <henrique@bastos.net>
Description: Double-Entry Accounting from Text Files
*/
function(hljs) {
    var ACCOUNT_RE = '[A-Z][A-Za-z0-9\-]*';

    var ACCOUNT = {
        className: 'type',
        begin: ACCOUNT_RE + ':',
        relevance: 0,
        contains: [
            {
                className: 'subst',
                begin: ACCOUNT_RE + '(:' + ACCOUNT_RE + ')?'
            }
        ]
    }

    var AMOUNT = {
        className: 'literal',
        begin: /([\-|\+]?)([\d]+[\.]?[\d]*)/,
        relevance: 0
    };

    var COMMAND = {
        className: 'built_in',
        begin: '^(include|option|plugin|popmeta|poptag|pushmeta|pushtag)',
        relevance: 0
    }

    var COMMENT = hljs.COMMENT(';', '$');

    var COMMODITY_RE = '[A-Z][A-Z0-9\'._-]{0,22}[A-Z0-9]';

    var DATE_RE = '[0-9]{4}[-|/][0-9]{2}[-|/][0-9]{2}';

    var DIRECTIVE_RE = '(balance|commodity|custom|document|event|note|open|pad|price|query)';

    var DIRECTIVE = {
        begin: '^' + DATE_RE + '\\s+' + DIRECTIVE_RE,
        returnBegin: true,
        relevance: 10,
        contains: [
            {
                className: 'type',
                begin: DATE_RE,
                end: /\s+/,
                excludeEnd: true
            },
            {
                className: 'keyword',
                begin: DIRECTIVE_RE
            }
        ]
    }

    var LINK = {
        className: 'link',
        begin: /\^[A-Za-z0-9\-_/.]+/
    }

    var META = {
        className: 'meta',
        begin: /^\s{2,}[a-z][A-Za-z0-9\-_]+:/
    }

    var ORGMODE = {
        className: 'section',
        begin: /^\*\s+?.*/
    }

    var PRICE = {
        className: 'name',
        begin: '@'
    }

    var STRING = {
        className: 'string',
        begin: '"', end: '"',
        relevance: 0,
        contains: [hljs.BACKSLASH_ESCAPE]
    }

    // Note: out of order because depends on STRING.
    var COST = {
        className: 'name',
        begin: '\\{',
        end: '\\}',
        contains: [
            {
                className: 'literal',
                begin: DATE_RE
            },
            AMOUNT,
            STRING,
            // Commodity
            {
                className: 'subst',
                begin: COMMODITY_RE
            }
        ]
    }

    var TAG = {
        className: ['emphasis'],
        begin: /#[A-Za-z0-9\-_/.]+/
    }

    var TRANSACTION = {
        begin: '^' + DATE_RE + '\\s+.\\s',
        returnBegin: true,
        relevance: 10,
        contains: [
            {
                className: 'type',
                begin: DATE_RE,
                end: '\\s+',
                excludeEnd: true
            },
            {
                className: 'variable',
                begin: '.',
                endsParent: true
            }
        ]
    }

    return {
        aliases: ['beancount', 'bean', 'ledger'],
        contains: [
            COMMAND,
            DIRECTIVE,
            TRANSACTION,
            COMMENT,
            META,
            COST,
            PRICE,
            ACCOUNT,
            ORGMODE,
            LINK,
            TAG,
            STRING,
            AMOUNT,
        ]
    }
}
