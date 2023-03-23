/*
Language: C3
Website: https://www.learn-c3.org
*/
export default function(hljs) {
  const C3_NESTED_COMMENT = hljs.COMMENT(
    '/\\*', '\\*/',
    { contains: [ hljs.C_BLOCK_COMMENT_MODE ] }
  );
  const NUMBERS = {
    className: 'number',
    variants: [
      { begin: '\\b(0b[01\']+)' },
      { begin: '(u|u8|u16|u32|u64|u128|i8|i16|i32|i64|i128|f|f16|bf16|f32|f64|f128)' },
      { begin: '(-?)(\\b0[xX][a-fA-F0-9\']+|(\\b[\\d\']+(\\.[\\d\']*)?|\\.[\\d\']+)([eE][-+]?[\\d\']+)?)' }
    ],
    relevance: 0
  };
  const CHARACTER_ESCAPES = '\\\\(x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4,8}|[0-7]{3}|\\S)';
  const STRINGS = {
    className: 'string',
    variants: [
      {
        begin: '(x|b64)?"',
        end: '"',
        illegal: '\\n',
        contains: [ hljs.BACKSLASH_ESCAPE ]
      },
      {
        begin: '(u8?|U|L)?\'(' + CHARACTER_ESCAPES + "|.)",
        end: '\'',
        illegal: '.'
      },
      hljs.END_SAME_AS_BEGIN({
        begin: /(?:u8?|U|L)?([^()\\ ]{0,16})\(/,
        end: /\)([^()\\ ]{0,16})"/
      })
    ]
  };
  const C3_KEYWORDS = "alias as assert asm bitstruct break case catch const continue define default defer do else enum extern false fault for foreach foreach_r fn generic tlocal if import macro module nextcase null private return static struct switch true try union var while typedef";
  const KEYWORDS = {
    keyword: C3_KEYWORDS,
  };
  const SKEYWORDS = {
    className: 'keyword',
    match:'\\$alignof|\\$assert|\\$case|\\$checks|\\$default|\\$defined|\\$echo|\\$elif|\\$else|\\$endfor|\\$endforeach|\\$endif|\\$endswitch|\\$eval|\\$evaltype|\\$extnameof|\\$for|\\$foreach|\\$if|\\$include|\\$nameof|\\$offsetof|\\$qnameof|\\$sizeof|\\$stringify|\\$switch|\\$vacount|\\$vaconst|\\$varef|\\$vaarg|\\$vaexpr|\\$vasplat',
    relevance: 0
  };
  const SKEYWORDS2 = {
    className: 'title',
    match:'\\$\\$abs|\\$\\$bitreverse|\\$\\$bswap|\\$\\$ceil|\\$\\$compare_exchange|\\$\\$copysign|\\$\\$cos|\\$\\$clz|\\$\\$ctz|\\$\\$add|\\$\\$div|\\$\\$mod|\\$\\$mul|\\$\\$neg|\\$\\$sub|\\$\\$exp|\\$\\$exp2|\\$\\$expect|\\$\\$expect_with_probability|\\$\\$floor|\\$\\$fma|\\$\\$fmuladd|\\$\\$frameaddress|\\$\\$fshl|\\$\\$fshr|\\$\\$get_rounding_mode|\\$\\$log|\\$\\$log10|\\$\\$log2|\\$\\$max|\\$\\$memcpy|\\$\\$memcpy_inline|\\$\\$memmove|\\$\\$memset|\\$\\$memset_inline|\\$\\$min|\\$\\$nearbyint|\\$\\$overflow_add|\\$\\$overflow_mul|\\$\\$overflow_sub|\\$\\$popcount|\\$\\$pow|\\$\\$pow_int|\\$\\$prefetch|\\$\\$reduce_add|\\$\\$reduce_and|\\$\\$reduce_fadd|\\$\\$reduce_fmul|\\$\\$reduce_max|\\$\\$reduce_min|\\$\\$reduce_mul|\\$\\$reduce_or|\\$\\$reduce_xor|\\$\\$reverse|\\$\\$rint|\\$\\$round|\\$\\$roundeven|\\$\\$sat_add|\\$\\$sat_shl|\\$\\$sat_sub|\\$\\$set_rounding_mode|\\$\\$swizzle|\\$\\$swizzle2|\\$\\$sin|\\$\\$sqrt|\\$\\$stacktrace|\\$\\$syscall|\\$\\$sysclock|\\$\\$trap|\\$\\$trunc|\\$\\$unreachable|\\$\\$veccomplt|\\$\\$veccomple|\\$\\$veccompgt|\\$\\$veccompge|\\$\\$veccompeq|\\$\\$veccompne|\\$\\$volatile_load|\\$\\$volatile_store|\\$\\$wasm_memory_size|\\$\\$wasm_memory_grow|\\$\\$DATE|\\$\\$FILE|\\$\\$FILEPATH|\\$\\$FUNC|\\$\\$FUNCTION|\\$\\$LINE|\\$\\$LINE_RAW|\\$\\$MODULE|\\$\\$TEST_NAMES|\\$\\$TEST_FNS|\\$\\$TIME',
    relevance: 0
  };
  const TYPES = {
    className: 'type',
    variants: [
      { begin: '\\b[A-Z]+[0-9a-zA-Z_]*[a-z]+[0-9a-zA-Z_]*!?' },
      { begin: '\\bvoid!?|\\bbool!?|\\bchar!?|\\bdouble!?|\\bfloat!?|\\bfloat16!?|\\bint!?|\\bint128!?|\\bichar!?|\\biptr!?|\\bisz!?|\\blong!?|\\bshort!?|\\buint128!?|\\buint!?|\\bulong!?|\\buptr!?|\\bushort!?|\\busz!?|\\bfloat128!?|\\bvariant!?|\\banyerr!?|\\btypeid!?|\\bireg!?|\\bureg!?' },
      { begin: '\\$vatype|\\$typeof|\\$typefrom' }
    ]
  };
  const CONSTANTS = {
    className: 'symbol',
    variants: [
      { begin: '\\b[A-Z]+[0-9A-Z_]*\\b' }
    ]
  };
  const regex = hljs.regex;
  const NAMESPACE_RE = '[a-z_]\\w*::';
  const TEMPLATE_ARGUMENT_RE = '<[^<>]+>';
  const FUNCTION_TYPE_RE = '('
    + DECLTYPE_AUTO_RE + '|'
    + regex.optional(NAMESPACE_RE)
    + '[a-zA-Z_]\\w*' + regex.optional(TEMPLATE_ARGUMENT_RE)
  + ')';
  const TITLE_MODE = {
    className: 'title',
    begin: regex.optional(NAMESPACE_RE) + hljs.IDENT_RE,
    relevance: 0
  };
  const FUNCTION_TITLE = regex.optional(NAMESPACE_RE) + hljs.IDENT_RE + '\\s*\\(';
  const FUNCTION_DECLARATION = {
    begin: '\\s*fn\\s*' + '(' + FUNCTION_TYPE_RE + '[!\\*&\\s]+)+' + FUNCTION_TITLE,
    returnBegin: true,
    end: /[{;=]/,
    excludeEnd: true,
    keywords: KEYWORDS,
    illegal: /[^\w\s\*&:<>.]/,
    contains: [
      {
        begin: DECLTYPE_AUTO_RE,
        keywords: KEYWORDS,
        relevance: 0
      },
      {
        begin: FUNCTION_TITLE,
        returnBegin: true,
        contains: [ hljs.inherit(TITLE_MODE, { className: "title.function" }) ],
        relevance: 0
      },
      {
        className: 'params',
        begin: /\(/,
        end: /\)/,
        keywords: KEYWORDS,
        relevance: 0,
        contains: [
          hljs.C_LINE_COMMENT_MODE,
          C3_NESTED_COMMENT,
          STRINGS,
          NUMBERS,
          TYPES,
          {
            begin: /\(/,
            end: /\)/,
            keywords: KEYWORDS,
            relevance: 0,
            contains: [
              'self',
              hljs.C_LINE_COMMENT_MODE,
              C3_NESTED_COMMENT,
              STRINGS,
              NUMBERS,
              TYPES
            ]
          }
        ]
      },
      TYPES,
      hljs.C_LINE_COMMENT_MODE,
      C3_NESTED_COMMENT
    ]
  };

  return {
    name: "C3",
    keywords: KEYWORDS,
    contains: [
      hljs.C_LINE_COMMENT_MODE,
      C3_NESTED_COMMENT,
      NUMBERS,
      STRINGS,
      TYPES,
      SKEYWORDS,
      SKEYWORDS2,
      CONSTANTS,
      FUNCTION_DECLARATION
    ]
  }
}
