/*
Language: VHDL
Description: VHDL is a hardware description language used in electronic design automation to describe digital and mixed-signal systems.
Author: Igor Kalnitsky <igor.kalnitsky@gmail.com>
Website: http://kalnitsky.org.ua/
*/

hljs.LANGUAGES.vhdl = {

  defaultMode: {
    lexems: hljs.IDENT_RE,

    keywords: {
      'keyword': { 'abs': 1, 'access': 1, 'after': 1, 'alias': 1, 'all': 1, 'and': 1, 'architecture': 2, 'array': 1, 'assert': 1, 'attribute': 1, 'begin': 1, 'block': 1, 'body': 1, 'buffer': 1, 'bus': 1, 'case': 1, 'component': 2, 'configuration': 1, 'constant': 1, 'disconnect': 2, 'downto': 2, 'else': 1, 'elsif': 1, 'end': 1, 'entity': 2, 'exit': 1, 'file': 1, 'for': 1, 'function': 1, 'generate': 2, 'generic': 2, 'group': 1, 'guarded': 2, 'if': 0, 'impure': 2, 'in': 1, 'inertial': 1, 'inout': 1, 'is': 1, 'label': 1, 'library': 1, 'linkage': 1, 'literal': 1, 'loop': 1, 'map': 1, 'mod': 1, 'nand': 1, 'new': 1, 'next': 1, 'nor': 1, 'not': 1, 'null': 1, 'of': 1, 'on': 1, 'open': 1, 'or': 1, 'others': 1, 'out': 1,  'package': 1,  'port': 2,  'postponed': 1,  'procedure': 1,  'process': 1,  'pure': 2,  'range': 1,  'record': 1,  'register': 1,  'reject': 1,  'return': 1,  'rol': 1,  'ror': 1,  'select': 1,  'severity': 1,  'signal': 1,  'shared': 1, 'sla': 1, 'sli': 1,  'sra': 1,  'srl': 1,  'subtype': 2,  'then': 1,  'to': 1,  'transport': 1,  'type': 1,  'units': 1,  'until': 1,  'use': 1,  'variable': 1,  'wait': 1,  'when': 1,  'while': 1,  'with': 1,  'xnor': 1,  'xor': 1},
      'type': { 'boolean': 1, 'bit': 1, 'character': 1, 'severity_level': 2, 'integer': 1, 'time': 1, 'delay_length': 2, 'natural': 1, 'positive': 1, 'string': 1, 'bit_vector': 2, 'file_open_kind': 2, 'file_open_status': 2, 'std_ulogic': 2, 'std_ulogic_vector': 2, 'std_logic': 2, 'std_logic_vector': 2 }
    },

    contains: ['comment', 'string', 'number', 'literal']
  },

  case_insensitive: true,
  modes: [
    {
      className: 'comment',
      begin: '--',
      end: '$'
    },
    hljs.C_NUMBER_MODE,
    hljs.QUOTE_STRING_MODE,
    {
      className: 'literal',
      begin: '\'(U|X|0|1|Z|W|L|H|-)',
      end: '\'',
      contains: [hljs.BACKSLASH_ESCAPE],
      relevance: 5
    }
  ]
};
