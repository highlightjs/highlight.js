/*

VBScript definition (c) Nikita Ledyaev <lenikita@yandex.ru>

*/
LANGUAGES.vbscript = {
  defaultMode: {
    lexems: [IDENT_RE],
    contains: ['string', 'comment', 'number', 'built_in'],
    keywords: {
      'keyword': {'call' : 1,'class' : 1,'const' : 1,'dim' : 1,'do' : 1,'loop' : 1,'erase' : 1,'execute' : 1,'executeglobal' : 1,'exit' : 1,'for' : 1,'each' : 1,'next' : 1,'function' : 1,'if' : 1,'then' : 1,'else' : 1,'on' : 1, 'error' : 1,'option' : 1, 'explicit' : 1,'private' : 1,'property' : 1,'let' : 1,'get' : 1,'public' : 1,'randomize' : 1,'redim' : 1,'rem' : 1,'select' : 1,'case' : 1,'set' : 1,'stop' : 1,'sub' : 1,'while' : 1,'wend' : 1,'with' : 1, 'end' : 1, 'to' : 1},
      'built_in': {'lcase': 1, 'month': 1, 'vartype': 1, 'instrrev': 1, 'ubound': 1, 'setlocale': 1, 'getobject': 1, 'rgb': 1, 'getref': 1, 'string': 1, 'weekdayname': 1, 'rnd': 1, 'dateadd': 1, 'monthname': 1, 'now': 1, 'day': 1, 'minute': 1, 'isarray': 1, 'cbool': 1, 'round': 1, 'formatcurrency': 1, 'conversions': 1, 'csng': 1, 'timevalue': 1, 'second': 1, 'year': 1, 'space': 1, 'abs': 1, 'clng': 1, 'timeserial': 1, 'fixs': 1, 'len': 1, 'asc': 1, 'isempty': 1, 'maths': 1, 'dateserial': 1, 'atn': 1, 'timer': 1, 'isobject': 1, 'filter': 1, 'weekday': 1, 'datevalue': 1, 'ccur': 1, 'isdate': 1, 'instr': 1, 'datediff': 1, 'formatdatetime': 1, 'replace': 1, 'isnull': 1, 'right': 1, 'sgn': 1, 'array': 1, 'snumeric': 1, 'log': 1, 'cdbl': 1, 'hex': 1, 'chr': 1, 'lbound': 1, 'msgbox': 1, 'ucase': 1, 'getlocale': 1, 'cos': 1, 'cdate': 1, 'cbyte': 1, 'rtrim': 1, 'join': 1, 'hour': 1, 'oct': 1, 'typename': 1, 'trim': 1, 'strcomp': 1, 'int': 1, 'createobject': 1, 'loadpicture': 1, 'tan': 1, 'formatnumber': 1, 'mid': 1, 'scriptenginebuildversion': 1, 'scriptengine': 1, 'split': 1, 'scriptengineminorversion': 1, 'cint': 1, 'sin': 1, 'datepart': 1, 'ltrim': 1, 'sqr': 1, 'scriptenginemajorversion': 1, 'time': 1, 'derived': 1, 'eval': 1, 'date': 1, 'formatpercent': 1, 'exp': 1, 'inputbox': 1, 'left': 1}
    }
  },
  case_insensitive: true,
  modes: [
    QUOTE_STRING_MODE,
    BACKSLASH_ESCAPE,
    {
      className: 'comment',
      begin: '\'', end: '$'
    },
    C_NUMBER_MODE
  ]
};//vbscript