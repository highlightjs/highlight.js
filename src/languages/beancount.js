/*
Language: Beancount
Author: Henrique Bastos <henrique@bastos.net>
Description: Double-Entry Accounting from Text Files
*/
function(hljs) {
    var ACCOUNT_RE = '[A-Z][A-Za-z0-9\-]*';

    var COMMODITY_RE = '[A-Z][A-Z0-9\'._\\-]{0,22}[A-Z0-9]';

    var DATE_RE = '[0-9]{4}[\\-|/][0-9]{2}[\\-|/][0-9]{2}'

    var ACCOUNT = {
        className: 'type',
        begin: ACCOUNT_RE + ':',
        contains: [
            {
                className: 'subst',
                begin: ACCOUNT_RE + ':?'
            }
        ]
    }

    var AMOUNT = {
        className: 'literal',
        begin: /([\-|\+]?)([\d]+[\.]?[\d]*)/
    };

    var COMMENT = hljs.COMMENT(';', '$');

    var DATE = {
        className: 'type',
        begin: '^' + DATE_RE,
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

    var STRING = {
        className: 'string',
        begin: '"', end: '"',
        contains: [hljs.BACKSLASH_ESCAPE]
    }

    var TAG = {
        className: ['emphasis'],
        begin: /#[A-Za-z0-9\-_/.]+/
    }

    var PRICE = {
        className: 'name',
        begin: '@'
    }

    var COST = {
        className: 'name',
        begin: '\\{',
        end: '\\}',
        contains: [
            DATE, AMOUNT, STRING,
            // Commodity
            {
                className: 'subst',
                begin: COMMODITY_RE
            }
        ]
    }

    return {
        aliases: ['beancount', 'bean', 'ledger'],
        keywords:
            'balance commodity custom document event include' +
            'note open option pad plugin popmeta poptag price' +
            'pushmeta pushtag query',
        contains: [
            COMMENT,
            STRING,
            DATE,
            META,
            AMOUNT,
            COST,
            PRICE,
            ACCOUNT,
            ORGMODE,
            LINK,
            TAG
        ]
    }
}
