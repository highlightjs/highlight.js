/*

VBScript definition (c) Nikita Ledyaev <lenikita@yandex.ru>

*/
VBS_BUILT_IN_FUNCTIONS = 'Abs|Array|Asc|Atn|CBool|CByte|CCur|CDate|CDbl|Chr|CInt|CLng|Conversions|Cos|CreateObject|CSng|Date|DateAdd|DateDiff|DatePart|DateSerial|DateValue|Day|Derived|Maths|Eval|Exp|Filter|FormatCurrency|FormatDateTime|FormatNumber|FormatPercent|GetLocale|GetObject|GetRef|Hex|Hour|InputBox|InStr|InStrRev|Int|Fixs|IsArray|IsDate|IsEmpty|IsNull|sNumeric|IsObject|Join|LBound|LCase|Left|Len|LoadPicture|Log|LTrim|RTrim|Trim|Maths|Mid|Minute|Month|MonthName|MsgBox|Now|Oct|Replace|RGB|Right|Rnd|Round|ScriptEngine|ScriptEngineBuildVersion|ScriptEngineMajorVersion|ScriptEngineMinorVersion|Second|SetLocale|Sgn|Sin|Space|Split|Sqr|StrComp|String|Tan|Time|Timer|TimeSerial|TimeValue|TypeName|UBound|UCase|VarType|Weekday|WeekdayName|Year';

LANGUAGES.vbscript = {
  defaultMode: {
    lexems: [IDENT_RE],
    contains: ['string', 'comment', 'number', 'built_in'],
    keywords: {'call' : 1,'class' : 1,'const' : 1,'dim' : 1,'do' : 1,'loop' : 1,'erase' : 1,'execute' : 1,'executeglobal' : 1,'exit' : 1,'for' : 1,'each' : 1,'next' : 1,'function' : 1,'if' : 1,'then' : 1,'else' : 1,'on' : 1, 'error' : 1,'option' : 1, 'explicit' : 1,'private' : 1,'property' : 1,'let' : 1,'get' : 1,'public' : 1,'randomize' : 1,'redim' : 1,'rem' : 1,'select' : 1,'case' : 1,'set' : 1,'stop' : 1,'sub' : 1,'while' : 1,'wend' : 1,'with' : 1, 'end' : 1, 'to' : 1}
  },
  case_insensitive: true,
  modes: [
    QUOTE_STRING_MODE,
    BACKSLASH_ESCAPE,
    {
      className: 'comment',
      begin: '\'', end: '$'
    },
    C_NUMBER_MODE,
    {
      className: 'built_in',
      begin: '\\b('+VBS_BUILT_IN_FUNCTIONS+')',
      end: '^'
    }
  ]
};//vbscript