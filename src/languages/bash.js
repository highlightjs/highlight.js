/*
Language: Bash
Author: Benjamin Pannell <contact@sierrasoftworks.com>
*/

function(hljs) {
    var BASH_LITERAL = 'true false';
    var BASH_KEYWORD = 'if then else elif fi for break continue while in do done exit return set declare case esac export exec';
    var BASH_BUILTIN = 'printf echo read cd pwd pushd popd dirs let eval unset typeset readonly getopts source shopt caller type hash bind help sudo';
    var BASH_OPERATOR = '== -ne -eq -lt -gt -f -d -e -s -l -a';

    var STRING_ESCAPES = [
        { className: 'variable', begin: /\$[\w\d#@][\w\d_]*/, relevance: 1 },
        { className: 'variable', begin: /\$\{[^}]+\}/, relevance: 1 },
        { className: 'escape', begin: /\\[\w$'"]/, relevance: 0 },
        { className: 'title', begin: /\$\([^)]*\)/, relevance: 5 }
    ];

    return {
        keywords: {
            literal: BASH_LITERAL,
            keyword: BASH_KEYWORD,
            built_in: BASH_BUILTIN,
            operator: BASH_OPERATOR
        },
        contains: [
            { className: 'shebang', begin: /^#![^\r\n$]+/, relevance: 5, contains: [ { begin: /(?:ba)?sh/g, relevance: 20 } ] },
            { className: 'comment', begin: /#[^\r\n$]*/, relevance: 0 },
            { className: 'string', begin: /"/, end: /"/, contains: STRING_ESCAPES, relevance: 0 },
            { className: 'string', begin: /'/, end: /'/, contains: STRING_ESCAPES, relevance: 0 },
            { className: 'variable', begin: /\$[\w\d#@][\w\d_]*/, relevance: 1 },
            { begin: /[\w][\w\d_]*\s*=/, returnBegin: true, relevance: 0, contains: [ { className: 'variable', begin: /[\w][\w\d_]*/, relevance: 0 } ] }, //Variable names in assignment operations
            { className: 'path', begin: /[^\s\/]*\//, end: /[^\\]\s/, contains: [ { className: 'variable', begin: /\$[\w\d#@][\w\d#@_]*/, relevance: 0 } ] },
            { className: 'number', begin: /\d+(?:\.\d*)?/, relevance: 0 },
            { className: 'function', begin: /[\w][\w\d_]*\s*\(\s*\)\s*\{/, returnBegin: true, relevance: 0, contains: [ { className: 'title', begin: /[\w][\w\d_]*/, relevance: 0 } ] } 
            ]
    }
}
