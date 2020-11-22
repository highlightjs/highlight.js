/**
 * Language: Visual Basic .NET
 * Description: Visual Basic .NET (VB.NET) is a multi-paradigm, object-oriented programming language, implemented on the .NET Framework.
 * Authors: Poren Chiang <ren.chiang@gmail.com>, Jan Pilzer
 * Website: https://docs.microsoft.com/dotnet/visual-basic/getting-started/
 */

export default function(hljs) {
  const CHAR = {
    className: 'string',
    begin: /"(""|[^/n])"C\b/
  };

  const STRING = {
    className: 'string',
    begin: /"/,
    end: /"/,
    illegal: /\n/,
    contains: [
      {
        begin: /""/
      }
    ] // double quote escape
  };

  /**
   * Date Literals consist of a date or a time or both separated by whitespace, surrounded by #.
   * Date can be in M/D/YYYY or YYYY-MM-DD format.
   * A time value may be specified either using a 24-hour value (H:mm[:ss]) or a 12-hour value (h[:mm[:ss]] A)
   */
  const DATE = {
    className: 'literal',
    begin: /# *(((\d+[-/]){2}\d+)|((\d+(:\d+){1,2} ?(AM|PM)?)|(\d+ ?(AM|PM)))|((\d+[-/]){2}\d+ ((\d+(:\d+){1,2} ?(AM|PM)?)|(\d+ ?(AM|PM))))) *#/
  };

  /**
   * Float: /-?\b\d[\d_]*((\.[\d_]+(E[+-]?[\d_]+)?)|(E[+-]?[\d_]+))[RFD@!#]?/
   * Integer (base 10): /-?\b\d[\d_]*((U?[SIL])|[%&])?/
   * Integer (base 16): /&H[\dA-F_]+((U?[SIL])|[%&])?/
   * Integer (base  8): /&O[0-7_]+((U?[SIL])|[%&])?/
   * Integer (base  2): /&B[01_]+((U?[SIL])|[%&])?/
   */
  const NUMBER = {
    className: 'number',
    begin: /((&[HOB])[\dA-F_]+|(-?\b\d[\d_]*))((\.[\d_]+)?(E[+-]?[\d_]+)?)?((U?[SIL])|[RFD@!#%&])?/,
    relevance: 0
  };

  const LABEL = {
    className: 'symbol',
    begin: /^\w+:$/
  };

  const COMMENT = hljs.COMMENT(/'(?!'')|\bREM\b/, /$/);

  const DOC_COMMENT = hljs.COMMENT(/'''/, /$/, {
    contains: [
      {
        className: 'doctag',
        begin: /<\/?/,
        end: />/,
        contains: [ hljs.PHRASAL_WORDS_MODE ]
      }
    ]
  });

  const DIRECTIVES = {
    className: 'meta',
    begin: /#(const|disable|else|elseif|enable|end|externalsource|if|region)\b/,
    end: /$/,
    keywords: {
      'meta-keyword':
        'const disable else elseif enable end externalsource if region then'
    },
    contains: [ COMMENT ]
  };

  return {
    name: 'Visual Basic .NET',
    aliases: [ 'vb' ],
    case_insensitive: true,
    keywords: {
      keyword:
        'addhandler alias aggregate ansi as async assembly auto binary by byref byval ' + /* a-b */
        'call case catch class compare const continue custom declare default delegate dim distinct do ' + /* c-d */
        'each equals else elseif end enum erase error event exit explicit finally for friend from function ' + /* e-f */
        'get global goto group handles if implements imports in inherits interface into iterator ' + /* g-i */
        'join key let lib loop me mid module mustinherit mustoverride mybase myclass ' + /* j-m */
        'namespace narrowing new next notinheritable notoverridable ' + /* n */
        'of off on operator option optional order overloads overridable overrides ' + /* o */
        'paramarray partial preserve private property protected public ' + /* p */
        'raiseevent readonly redim removehandler resume return ' + /* r */
        'select set shadows shared skip static step stop structure strict sub synclock ' + /* s */
        'take text then throw to try unicode until using when where while widening with withevents writeonly yield' /* t-y */,
      built_in:
        // Operators https://docs.microsoft.com/dotnet/visual-basic/language-reference/operators
        'addressof and andalso await directcast gettype getxmlnamespace is isfalse isnot istrue like mod nameof new not or orelse trycast typeof xor ' +
        // Type Conversion Functions https://docs.microsoft.com/dotnet/visual-basic/language-reference/functions/type-conversion-functions
        'cbool cbyte cchar cdate cdbl cdec cint clng cobj csbyte cshort csng cstr cuint culng cushort',
      type:
        // Data types https://docs.microsoft.com/dotnet/visual-basic/language-reference/data-types
        'boolean byte char date decimal double integer long object sbyte short single string uinteger ulong ushort',
      literal: 'true false nothing'
    },
    illegal:
      '//|\\{|\\}|endif|gosub|variant|wend|^\\$ ' /* reserved deprecated keywords */,
    contains: [
      CHAR,
      STRING,
      DATE,
      NUMBER,
      LABEL,
      COMMENT,
      DOC_COMMENT,
      DIRECTIVES
    ]
  };
}
