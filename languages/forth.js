/*
Forth definition (c) Alex <v5791@yandex.ru>
*/
LANGUAGES.forth = {
  defaultMode: {
    lexems: ['\\S+'],
    contains: ['comment', 'string', 'number', 'word', 'controlkey'],
    keywords: {
      'keyword': {'!': 1, '#': 1 , '<#': 1, '#>': 1, '#S': 1, '#TIB': 1, '<': 1, '>': 1, '<>': 1, '*': 1, '*/': 1, '*/MOD': 1, '+!': 1, '+': 1, ',': 1, '-': 1, '.': 1, '.0': 1, '.S': 1, '/': 1, '/MOD': 1, '2/': 1, '2>R': 1, '2DROP': 1, '2DUP': 1, '2LITERAL': 1, '2OVER': 1, '2R>': 1, '2R@': 1, '2SWAP': 1, ':NONAME': 1, ':': 1, '=': 1, '?DUP': 1, '@': 1, 'ABORT"': 1, 'ABS': 1, 'ACCEPT': 1, 'AGAIN': 1, 'ALIGN': 1, 'ALIGNED': 1, 'ALLOCATE': 1, 'ALLOT': 1, 'ALSO': 1, 'AND': 1, 'ASCII': 1, 'BASE': 1, 'BETWEEN': 1, 'BL': 1, 'BLK': 1, 'BUFFER:': 1, 'BYE': 1, 'CATCH': 1, 'CELL': 1, 'CELL+': 1, 'CELL-': 1, 'CELLS': 1, 'CHAR': 1, 'CHAR+': 1, 'CHARS': 1, 'CLITERAL': 1, 'CLOSE-FILE': 1, 'CMOVE': 1, 'CMOVE>': 1, 'CODE>': 1, 'COMPARE': 1, 'compile': 1, 'CONSTANT': 1, 'CONTEXT': 1, 'COUNT': 1, 'CR': 1, 'CREATE': 1, 'CREATE-FILE': 1, 'CURRENT': 1, 'DABS': 1, 'DEFFER': 1, 'DELETE-FILE': 1, 'DEPTH': 1, 'DIGIT': 1, 'DNEGATE': 1, 'DP': 1, 'DROP': 1, 'DUMP': 1, 'DUP': 1, 'EKEY': 1, 'EKEY?': 1, 'EMIT': 1, 'ENVIRONMENT?': 1, 'ERASE': 1, 'EVALUATE': 1, 'EXECUTE': 1, 'EXIT': 1, 'FALSE': 1, 'FIELD': 1, 'FILE-POSITION': 1, 'FILE-SIZE': 1, 'FILL': 1, 'FIND': 1, 'FM/MOD': 1, 'FORTH': 1, 'FORTH-WORDLIST': 1, 'FREE': 1, 'GET-CURRENT': 1, 'GET-ORDER': 1, 'HANDLER': 1, 'HEADER': 1, 'HERE': 1, 'HIDE': 1, 'HLD': 1, 'HOLD': 1, 'INCLUDE': 1, 'INCLUDE-FILE': 1, 'INCLUDED': 1, 'INTERPRET': 1, 'INVERT': 1, 'IS': 1, 'KEY': 1, 'KEY?': 1, 'LATEST': 1, 'LEAVE': 1, 'LITERAL': 1, 'LSHIFT': 1, 'M*': 1, 'MAX': 1, 'MIN': 1, 'MOD': 1, 'MOVE': 1, 'NAME>': 1, 'NEGATE': 1, 'NIP': 1, 'NLIST': 1, 'NOOP': 1, 'NOT': 1, 'ONLY': 1, 'OPEN-FILE': 1, 'OR': 1, 'ORDER': 1, 'OVER': 1, 'PAD': 1, 'PARSE': 1, 'PICK': 1, 'POSTPONE': 1, 'PREVIOUS': 1, 'QUIT': 1, 'R/O': 1, 'R/W': 1, 'R0': 1, 'R>': 1, 'R@': 1, 'RDROP': 1, 'READ-FILE': 1, 'READ-LINE': 1, 'RECURSE': 1, 'REFILL': 1, 'REPOSITION-FILE': 1, 'RESIZE': 1, 'RESIZE-FILE': 1, 'ROLL': 1, 'ROT': 1, 'RP!': 1, 'RP@': 1, 'RSHIFT': 1, 'S0': 1, 'SEARCH': 1, 'SEARCH-WORDLIST': 1, 'SET-CURRENT': 1, 'SET-ORDER': 1, 'SIGN': 1, 'SKIP': 1, 'SLITERAL': 1, 'SM/REM': 1, 'SMUDGE': 1, 'SOURCE': 1, 'SOURCE-ID': 1, 'SP!': 1, 'SP@': 1, 'SPACE': 1, 'SPACES': 1, 'STATE': 1, 'SWAP': 1, 'THROW': 1, 'TIB': 1, 'TO': 1, 'TRUE': 1, 'TUCK': 1, 'TYPE': 1, 'U<': 1, 'U.': 1, 'U/': 1, 'U>': 1, 'U>D': 1, 'UM*': 1, 'UM/MOD': 1, 'UNLOOP': 1, 'VALUE': 1, 'VARIABLE': 1, 'VOCABULARY': 1, 'VOCS': 1, 'W!': 1, 'W,': 1, 'W/O': 1, 'W@': 1, 'WARNING': 1, 'WITHIN': 1, 'WORD': 1, 'WORDLIST': 1, 'WORDS': 1, 'WRITE-FILE': 1, 'WRITE-LINE': 1, 'XOR': 1, '[': 1, '[CHAR]': 1, ']': 1, '->': 1, '-ROT': 1, '-TRAILING': 1, '0<': 1, '0<>': 1, '0=': 1, '1+': 1, '1-': 1, '2+': 1, '2-': 1, '>>': 1, '>BODY': 1, '>CODE': 1, '>IN': 1, '>R': 1, 'ABORT"': 1, 'C!': 1, 'C,': 1, 'C/L': 1, 'C@': 1, 'D<': 1, 'D0=': 1, 'D>S': 1, 'D+': 1, 'D.': 1, 'S>D': 1, '.S': 1, 'USER': 1 },
      'controlkey': {'THEN': 1, '?DO': 1, 'DO': 1, 'WHILE': 1, 'DOES>': 1, 'DEFINITIONS': 1, 'CASE': 1, 'BEGIN': 1, 'IMMEDIATE': 1, 'IF': 1, 'AGAIN': 1, 'REPEAT': 1, '+LOOP': 1, 'HEX': 1, 'DECIMAL': 1, 'ENDCASE': 1, 'ENDOF': 1, 'ELSE': 1, 'OCTAL': 1, 'UNTIL': 1, 'PREVIOUS': 1, 'OF': 1, 'LOOP': 1}
    }
  },
  modes: [
    {
      className: 'number',
      begin: C_NUMBER_RE + '(\\s|$)', end: '^',
      relevance: 0
    },
    {
      className: 'string',
      begin: '[\\.CS]" ', end: '"'
    },
    {
      className: 'string',
      begin: '\\.\\( ', end: '\\)'
    },
    {
      className: 'comment',
      begin: '\\\\ ', end: '$'
    },
    {
      className: 'comment',
      begin: '\\( ', end: '\\)',
      relevance: 0
    },
    {
      className: 'word',
      begin: '\\:\\s+[^\\s]+', end: '^'
    }, 
    {
      className: 'word',
      begin: '(WINAPI:|CREATE|VARIABLE|VALUE|USER|CONSTANT|VOCABULARY|VECT|ASCII|\\[char\\])\\s+[^\\s]+', end: '^'
    }
  ]
};//forth