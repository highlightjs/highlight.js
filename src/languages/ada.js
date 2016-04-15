/*
  Language: Ada
  Author: Igor Kalnitsky <igor@kalnitsky.org>
  Contributors: Lars Schulna <kartoffelbrei.mit.muskatnuss@gmail.org>
  Description: Ada is a general-purpose programming language that has great support for saftey critical and real-time applications.
               It has been developed by the DoD and thus has been used in military and safety-critical applications (like civil aviation).
               The first version appeared in the 80s, but it's still actively developed today with
               the newest standard being Ada2012.
*/

// We try to support full Ada2012
//
// We highlight all appearances of types, keywords, literals (string, char, number, bool)
// and titles (user defined function/procedure/package)
// CSS classes are set accordingly
//
// Languages causing problems for language detection:
// xml (broken by Foo : Bar type), elm (broken by Foo : Bar type), vbscript-html (broken by body keyword)

function(hljs) {
    // Regular expression for Ada numeric literals.
    // stolen form the VHDL highlighter

    // Decimal literal:
    var INTEGER_RE = '\\d(_|\\d)*';
    var EXPONENT_RE = '[eE][-+]?' + INTEGER_RE;
    var DECIMAL_LITERAL_RE = INTEGER_RE + '(\\.' + INTEGER_RE + ')?' + '(' + EXPONENT_RE + ')?';

    // Based literal:
    var BASED_INTEGER_RE = '\\w+';
    var BASED_LITERAL_RE = INTEGER_RE + '#' + BASED_INTEGER_RE + '(\\.' + BASED_INTEGER_RE + ')?' + '#' + '(' + EXPONENT_RE + ')?';

    var NUMBER_RE = '\\b(' + BASED_LITERAL_RE + '|' + DECIMAL_LITERAL_RE + ')';

    // Identifier regex
    var ID_REGEX = '[A-Za-z](_?[A-Za-z0-9.])*';

    // bad chars, only allowed in literals
    var BAD_CHARS = '[]{}%#\'\"'

    // variable declarations of the form
    // Foo : Bar := Baz;
    // where only Bar will be highlighted
    var VAR_DECLS = {
        // var decls
        begin: ':[^=]\\s*', end: '\\s*(:=|;|\\)|=>)',
        // endsWithParent: true,
        returnEnd: true,
        contains: [
            {
                // workaround to avoid highlighting
                // named loops and declare blocks
                beginKeywords: 'loop for declare others',
                endsParent: true
            },
            {
                // properly highlight all modifiers
                className: 'keyword',
                beginKeywords: 'not null constant access function procedure in out aliased exception'
            },
            {
                className: 'type',
                begin: ID_REGEX,
                relevance: 0,
            }
        ]
    };

    return {
        case_insensitive: true,
        keywords: {
            keyword:
                'abort else new return abs elsif not reverse abstract end ' +
                'accept entry|5 select|5 access exception of separate|10 aliased exit or some ' +
                'all others subtype and for out synchronized|5 array function overriding ' +
                'at tagged generic|5 package task|5 begin goto pragma terminate ' +
                'body private then if procedure type case in protected constant interface ' +
                'is raise use declare range delay|5 limited|10 record when delta|5 loop rem while ' +
                'digits|5 renames|5 with do mod requeue|5 xor',
            literal:
                'True False',
        },
        contains: [
            // Ada doesn't have block comments, only line comments
            hljs.COMMENT('--', '$'),
            // strings "foobar"
            {
                // like C# @"", a literal " is quoted as ""
                //
                // TODO: it's not working perfectly,
                // as "f""oo" will be marked up as <lit>f</lit><lit>oo</lit>
                // but this difference is not visible
                className: 'literal',
                begin: /"/, end: /"/,
                relevance: 0
            },
            // characters ''
            {
                // character literals always contain one char
                className: 'literal',
                begin: /'.'/,
                relevance: 0
            },
            {
                // number literals
                className: 'literal',
                begin: NUMBER_RE,
                relevance: 0
            },
            {
                // package definition, maybe inside generic
                className: 'title',
                begin: '(\\bwith\\s+)?(\\bprivate\\s+)?\\bpackage\\s+(\\bbody\\s+)?', end: '(is|$)',
                keywords: 'package body',
                excludeBegin: true,
                excludeEnd: true,
                illegal: BAD_CHARS
            },
            {
                // function/procedure declaration/definition
                // maybe inside generic
                begin: '(\\b(with|overriding)\\s+)?\\b(function|procedure)\\s+', end: '(\\bis|\\bwith|\\brenames|\\)\\s*;)',
                keywords: 'overriding function procedure with is return',
                // we need to re-match the 'function' keyword, so that
                // the title mode below matches only exactly once
                returnBegin: true,
                contains:
                [
                    {
                        // name of the function/procedure
                        className: 'title',
                        begin: '(\\bwith\\s+)?\\b(function|procedure)\\s+',
                        end: '(\\(|\\s+|$)',
                        excludeBegin: true,
                        excludeEnd: true,
                        illegal: BAD_CHARS
                    },
                    // 'self'
                    // // parameter types
                    VAR_DECLS,
                    {
                        // return type
                        className: 'type',
                        begin: '\\breturn\\s+', end: '(\\s+|;|$)',
                        keywords: 'return',
                        excludeBegin: true,
                        excludeEnd: true,
                        // we are done with functions
                        endsParent: true,
                        illegal: BAD_CHARS

                    },
                ]
            },
            {
                // new type declarations
                // maybe inside generic
                className: 'title',
                begin: '\\b(sub)?type\\s+', end: '\\s+',
                keywords: 'type',
                excludeBegin: true,
                illegal: BAD_CHARS
            },

            // see comment above the definition
            VAR_DECLS,

            // no markup
            // relevance boosters for small snippets
            // {begin: '\\s*=>\\s*'},
            // {begin: '\\s*:=\\s*'},
            // {begin: '\\s*:[^=]\\s*'},
        ]
    };
}
