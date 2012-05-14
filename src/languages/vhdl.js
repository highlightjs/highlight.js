/*
Language: VHDL
Author: Igor Kalnitsky <igor@kalnitsky.org>
Contributors: Daniel C.K. Kho <daniel.kho@gmail.com>
Description: VHDL is a hardware description language used in electronic design automation to describe digital and mixed-signal systems.
*/

hljs.LANGUAGES.vhdl = function() {
  return {
    case_insensitive: true,
    defaultMode: {
      keywords: {
        'keyword': {
            'abs': 1,               'access': 1,            'after': 1,
            'alias': 1,             'all': 1,               'and': 1,
            'architecture': 1,      'array': 1,             'assert': 1,
            'attribute': 1,         'begin': 1,             'block': 1,
            'body': 1,              'buffer': 1,            'bus': 1,
            'case': 1,              'component': 1,         'configuration': 1,
            'constant': 1,          'context': 1,           'cover': 1,
            'disconnect': 1,        'downto': 2,            'default': 1,
            'else': 1,              'elsif': 1,             'end': 1,
            'entity': 1,            'exit': 1,              'fairness': 1,
            'file': 1,              'for': 1,               'force': 1,
            'function': 1,          'generate': 1,          'generic': 1,
            'group': 1,             'guarded': 1,           'if': 1,
            'impure': 1,            'in': 1,                'inertial': 1,
            'inout': 1,             'is': 1,                'label': 1,
            'library': 1,           'linkage': 1,           'literal': 1,
            'loop': 1,              'map': 1,               'mod': 1,
            'nand': 1,              'new': 1,               'next': 1,
            'nor': 1,               'not': 1,               'null': 1,
            'of': 1,                'on': 1,                'open': 1,
            'or': 1,                'others': 1,            'out': 1,
            'package': 1,           'port': 1,              'postponed': 1,
            'procedure': 1,         'process': 1,           'property': 1,
            'protected':1,          'pure': 1,              'range': 1,
            'record': 1,            'register': 1,          'reject': 1,
            'release':1,            'rem':1,                'report': 1,
            'restrict':1,           'restrict_guarantee':1, 'return': 1,
            'rol': 1,               'ror': 1,               'select': 1,
            'sequence':1,           'severity': 1,          'shared': 1,
            'signal': 1,            'sla': 1,               'sll': 1,
            'sra': 1,               'srl': 1,               'strong':1,
            'subtype': 1,           'then': 1,              'to': 1,
            'transport': 1,         'type': 1,              'unaffected': 1,
            'units': 1,             'until': 1,             'use': 1,
            'variable': 1,          'vmode': 1,             'vprop': 1,
            'vunit':1,              'wait': 1,              'when': 1,
            'while': 1,             'with': 1,              'xnor': 1,
            'xor': 1
        },

        'typename': {
            'boolean': 1,           'bit': 1,               'character': 1,
            'severity_level': 1,    'integer': 1,           'time': 1,
            'delay_length': 1,      'natural': 1,           'positive': 1,
            'string': 1,            'bit_vector': 1,        'file_open_kind': 1,
            'file_open_status': 1,  'std_ulogic': 1,        'std_ulogic_vector': 1,
            'std_logic': 1,         'std_logic_vector': 1,  'unsigned': 1,
            'signed': 1,            'boolean_vector': 1,    'integer_vector': 1,
            'real_vector': 1,       'time_vector': 1
        }
      },
      illegal: '{',
      contains: [
        hljs.C_BLOCK_COMMENT_MODE,        // VHDL-2008 block commenting.
        {
          className: 'comment',
          begin: '--', end: '$'
        },
        hljs.QUOTE_STRING_MODE,
        hljs.C_NUMBER_MODE,
        {
          className: 'literal',
          begin: '\'(U|X|0|1|Z|W|L|H|-)', end: '\'',
          contains: [hljs.BACKSLASH_ESCAPE]
        },
        {
          className: 'attribute',
          begin: '\'[A-Za-z](_?[A-Za-z0-9])*',
          contains: [hljs.BACKSLASH_ESCAPE]
        }
      ]
    } // defaultMode
  } // return;
}();
