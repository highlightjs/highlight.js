/*
 * Language: ST
 * Author: Sergey Romanov <serg4172@mail.ru>
 * Category: misc
 * Home page: http://www.plcopen.org/pages/tc1_standards/
 * Description: Structured Text - one of the 5 languages of IEC-61131 standard for PLC program development.
 */

function(hljs) {
    return {
        aliases: ['stl', 'scl', 'structured-text'],
        case_insensitive: true,
        keywords: {
            keyword: 'if then end_if elsif else case of end_case ' +
            'to do by while repeat end_while end_repeat for end_for from ' + 
            'or and not xor constant return exit at retain non_retain task with until',
            title: 'program end_program function end_function function_block end_function_block configuration end_configuration action end_action transition end_transition type end_type struct end_struct step end_step initial_step' +
            'var var_global end_var var_input var_out var_output var_in_out var_temp var_interval var_external var_access var_config',
            literal: 'false true null ',
            built_in: 'array pointer int sint dint lint usint uint udint ulint real lreal time date time_of_day date_and_time dt tod string bool byte world dworld lworld',
            function: 'mod abs acos asin atan cos exp expt ln log sin sqrt tan sel max min limit mux shl shr rol ror indexof sizeof adr adrinst bitadr add mul div sub trunc move',
        },
        contains: [
            {
                className: 'string',
                begin: '\'', end: '\'',
                contains: [hljs.BACKSLASH_ESCAPE, { begin: '\'\'' }]
            },
            {
                className: 'string',
                begin: '"', end: '"',
                contains: [hljs.BACKSLASH_ESCAPE, { begin: '""' }]
            },
            {
                className: 'symbol',
                begin: '(T|DT|TOD)#[0-9:-_shmyd]*',
                relevance: 0
            },
            {
                className: 'symbol',
                begin: '[A-Za-z]{1,6}#[0-9]*',
                relevance: 0
            },
            {
                className: 'number',
                begin: '[a-zA-Z_]*#[a-zA-Z_]*',
                relevance: 0
            },
            {
                className: 'symbol',
                begin: '\%(I|Q|M)(X|B|W|D|L)[0-9\.]*',
                relevance: 0
            },
            {
                className: 'symbol',
                begin: '\%(I|Q|M)[0-9\.]*',
                relevance: 0
            },
            hljs.C_NUMBER_MODE,
            hljs.COMMENT('//', '$'),
            hljs.C_BLOCK_COMMENT_MODE,
            hljs.COMMENT('\\(\\*', '\\*\\)')
        ]
    }
}