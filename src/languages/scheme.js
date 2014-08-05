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

    return {
        lexemes: '([\\(\\)\\[\\]\\{\\}",\'`;#|\\\\\\s]|' + SCHEME_IDENT_RE + ')',
        keywords: {
            keyword: '#f #t * + - ... / < <= = => > >= abs acos and angle append apply asin assoc assq assv atan begin boolean? caar cadr call-with-current-continuation call-with-input-file call-with-input-file call-with-output-file call-with-output-file call-with-values call/cc car case case-lambda cdddar cddddr cdr ceiling char->integer char-alphabetic? char-ci<=? char-ci<? char-ci=? char-ci>=? char-ci>? char-downcase char-lower-case? char-numeric? char-ready? char-upcase char-upper-case? char-whitespace? char<=? char<? char=? char>=? char>? char? class close-input-port close-output-port complex? cond cons cos current-input-port current-output-port define define-class define-syntax delay denominator display do dynamic-wind else eof-object? eq? equal? eqv? eval even? exact->inexact exact? exit-handler exp expt field floor for-each force gcd if imag-part import inexact->exact inexact? inherit init-field input-port? integer->char integer? interaction-environment interface lambda lcm length let let* let*-values let-syntax let-values let/ec letrec letrec-syntax list list->string list->vector list-ref list-tail list? load log magnitude make-polar make-rectangular make-string make-vector map max member memq memv min mixin modulo negative? newline not null-environment null? number->string number? numerator odd? open-input-file open-output-file opt-lambda or output-port? override pair? peek-char port? positive? procedure? protect provide public quasiquote quote quotient rational? rationalize read read-char real-part real? remainder rename require require-for-syntax reverse round scheme-report-environment set! set-car! set-cdr! sin sqrt string string->list string->number string->symbol string-append string-ci<=? string-ci<? string-ci=? string-ci>=? string-ci>? string-copy string-fill! string-length string-ref string-set! string<=? string<? string=? string>=? string>? string? substring symbol->string symbol? syntax syntax-case syntax-error syntax-rules tan transcript-off transcript-on truncate unit/sig unless values vector vector->list vector-fill! vector-length vector-ref vector-set! when with-input-from-file with-output-to-file with-syntax write write-char zero?'
        },
        contains: [
            {
                className: 'shebang',
                begin: '^#!', end: '$'
            },
            {
                className: 'literal',
                begin: '(#t|#f|#\\\\' + SCHEME_IDENT_RE + '|#\\\\.)',
                relevance: 10,
            },
            {
                className: 'number',
                variants: [
                    { begin: SCHEME_SIMPLE_NUMBER_RE, relevance: 0 },
                    { begin: SCHEME_COMPLEX_NUMBER_RE, relevance: 0 },
                    { begin: '#b[0-1]+(/[0-1]+)?' },
                    { begin: '#o[0-7]+(/[0-7]+)?' },
                    { begin: '#x[0-9a-f]+(/[0-9a-f]+)?' }
                ]
            },
            hljs.QUOTE_STRING_MODE,
            {
                className: 'regex',
                begin: '#[pr]x"',
                end: '[^\\\\]"'
            },
            {
                className: 'comment',
                variants: [
                    { begin: ';',  end: '$' },
                    { begin: '#\\|', end: '\\|#' }
                ]
            },
            /*{
                className: 'variable',
                begin: SCHEME_IDENT_RE
            },*/
            {
                className: 'keyword',
                begin: 'for\\*?(/\\w+)?'
            },
            {
                className: 'variable',
                begin: '\'' + SCHEME_IDENT_RE
            }
        ]
    };
}
