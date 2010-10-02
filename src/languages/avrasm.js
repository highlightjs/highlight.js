/*
Language: AVR Assembler
Author: Vladimir Ermakov <vooon341@gmail.com>
*/

hljs.LANGUAGES.avrasm =
{
  case_insensitive: true,
  defaultMode: {
    lexems: [hljs.IDENT_RE],
    contains: ['comment',  'number', 'string', 'label', 'preprocessor', 'localvars'],
    illegal: '',
    keywords: {
        'keyword': {
          /* mnemonic */
          'adc': 1,  'add': 1 , 'adiw': 1 , 'and': 1 , 'andi': 1 , 'asr': 1 , 'bclr': 1 , 'bld': 1 , 'brbc': 1 , 'brbs': 1 , 'brcc': 1 ,
          'brcs': 1, 'break': 1, 'breq': 1, 'brge': 1, 'brhc': 1, 'brhs': 1, 'brid': 1, 'brie': 1, 'brlo': 1, 'brlt': 1, 'brmi': 1,
          'brne': 1, 'brpl': 1, 'brsh': 1, 'brtc': 1, 'brts': 1, 'brvc': 1, 'brvs': 1, 'bset': 1, 'bst': 1, 'call': 1, 'cbi': 1,
          'cbr': 1, 'clc': 1, 'clh': 1, 'cli': 1, 'cln': 1, 'clr': 1, 'cls': 1, 'clt': 1, 'clv': 1, 'clz': 1, 'com': 1, 'cp': 1,
          'cpc': 1, 'cpi': 1, 'cpse': 1, 'dec': 1, 'eicall': 1, 'eijmp': 1, 'elpm': 1, 'eor': 1, 'fmul': 1, 'fmuls': 1, 'fmulsu': 1,
          'icall': 1, 'ijmp': 1, 'in': 1, 'inc': 1, 'jmp': 1, 'ld': 1, 'ldd': 1, 'ldi': 1, 'lds': 1, 'lpm': 1, 'lsl': 1, 'lsr': 1,
          'mov': 1, 'movw': 1, 'mul': 1, 'muls': 1, 'mulsu': 1, 'neg': 1, 'nop': 1, 'or': 1, 'ori': 1, 'out': 1, 'pop': 1, 'push': 1,
          'rcall': 1, 'ret': 1, 'reti': 1, 'rjmp': 1, 'rol': 1, 'ror': 1, 'sbc': 1, 'sbr': 1, 'sbrc': 1, 'sbrs': 1, 'sec': 1, 'seh': 1,
          'sbi': 1, 'sbci': 1, 'sbic': 1, 'sbis': 1, 'sbiw': 1, 'sei': 1, 'sen': 1, 'ser': 1, 'ses': 1, 'set': 1, 'sev': 1, 'sez': 1,
          'sleep': 1, 'spm': 1, 'st': 1, 'std': 1, 'sts': 1, 'sub': 1, 'subi': 1, 'swap': 1, 'tst': 1, 'wdr': 1
        },
        'built_in': {
          /* general purpose registers */
          'r0': 1, 'r1': 1, 'r2': 1, 'r3': 1, 'r4': 1, 'r5': 1, 'r6': 1, 'r7': 1, 'r8': 1, 'r9': 1, 'r10': 1, 'r11': 1, 'r12': 1,
          'r13': 1, 'r14': 1, 'r15': 1, 'r16': 1, 'r17': 1, 'r18': 1, 'r19': 1,  'r20': 1, 'r21': 1, 'r22': 1, 'r23': 1, 'r24': 1,
          'r25': 1, 'r26': 1, 'r27': 1, 'r28': 1, 'r29': 1, 'r30': 1, 'r31': 1,
          'x': 1 /* R27:R26 */, 'xh': 1 /* R27 */, 'xl': 1 /* R26 */,
          'y': 1 /* R29:R28 */, 'yh': 1 /* R29 */, 'yl': 1 /* R28 */,
          'z': 1 /* R31:R30 */, 'zh': 1 /* R31 */, 'zl': 1 /* R30 */,
          /* IO Registers (ATMega128) */
          'ucsr1c': 1, 'udr1': 1, 'ucsr1a': 1, 'ucsr1b': 1, 'ubrr1l': 1, 'ubrr1h': 1, 'ucsr0c': 1, 'ubrr0h': 1, 'tccr3c': 1,
          'tccr3a': 1, 'tccr3b': 1, 'tcnt3h': 1, 'tcnt3l': 1, 'ocr3ah': 1, 'ocr3al': 1, 'ocr3bh': 1, 'ocr3bl': 1, 'ocr3ch': 1,
          'ocr3cl': 1, 'icr3h': 1, 'icr3l': 1, 'etimsk': 1, 'etifr': 1, 'tccr1c': 1, 'ocr1ch': 1, 'ocr1cl': 1, 'twcr': 1,
          'twdr': 1, 'twar': 1, 'twsr': 1, 'twbr': 1, 'osccal': 1, 'xmcra': 1, 'xmcrb': 1, 'eicra': 1, 'spmcsr': 1, 'spmcr': 1,
          'portg': 1, 'ddrg': 1, 'ping': 1, 'portf': 1, 'ddrf': 1, 'sreg': 1, 'sph': 1, 'spl': 1, 'xdiv': 1, 'rampz': 1,
          'eicrb': 1, 'eimsk': 1, 'gimsk': 1, 'gicr': 1, 'eifr': 1, 'gifr': 1, 'timsk': 1, 'tifr': 1, 'mcucr': 1,
          'mcucsr': 1, 'tccr0': 1, 'tcnt0': 1, 'ocr0': 1, 'assr': 1, 'tccr1a': 1, 'tccr1b': 1, 'tcnt1h': 1, 'tcnt1l': 1,
          'ocr1ah': 1, 'ocr1al': 1, 'ocr1bh': 1, 'ocr1bl': 1, 'icr1h': 1, 'icr1l': 1, 'tccr2': 1, 'tcnt2': 1, 'ocr2': 1,
          'ocdr': 1, 'wdtcr': 1, 'sfior': 1, 'eearh': 1, 'eearl': 1, 'eedr': 1, 'eecr': 1, 'porta': 1, 'ddra': 1, 'pina': 1,
          'portb': 1, 'ddrb': 1, 'pinb': 1, 'portc': 1, 'ddrc': 1, 'pinc': 1, 'portd': 1, 'ddrd': 1, 'pind': 1, 'spdr': 1,
          'spsr': 1, 'spcr': 1, 'udr0': 1, 'ucsr0a': 1, 'ucsr0b': 1, 'ubrr0l': 1, 'acsr': 1, 'admux': 1, 'adcsr': 1, 'adch': 1,
          'adcl': 1, 'porte': 1, 'ddre': 1, 'pine': 1, 'pinf': 1
        }
      }
  },

  modes: [
    hljs.C_BLOCK_COMMENT_MODE,
    {
      className: 'comment',
      begin: ';',  end: '$'
    },
    hljs.BACKSLASH_ESCAPE,
    hljs.QUOTE_STRING_MODE,
    {
      className: 'string',
      begin: '\'', end: '[^\\\\]\'',
      illegal: '[^\\\\][^\']'
    },
    hljs.C_NUMBER_MODE,
    /*{  // Hex: 0x00, $00;  Oct: 0o00;  Bin: 0b00000000;  Dec: 0
      // пока что-то не получается :(, буду использовать сишную моду.
      className: 'number',
      begin: '((0[xX]|\$)[A-Fa-f0-9]+|0[oO][0-7]+|0[bB][0-1]+|\\d+)',  end: hljs.IMMEDIATE_RE
    }*/
    {
      className: 'label',
      begin: '^[A-Za-z0-9_.$]+:',  end: hljs.IMMEDIATE_RE
    },
    {
      className: 'preprocessor',
      begin: '#', end: '$'
    },
    {  // директивы «.include» «.macro» и т.д.
      className: 'preprocessor',
      begin: '\\.[a-zA-Z]+', end: hljs.IMMEDIATE_RE
    },
    {  // подстановка в «.macro»
      className: 'localvars',
      begin: '@[0-9]+', end: hljs.IMMEDIATE_RE
    }
  ]
};

