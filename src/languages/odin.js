/*
Language: Odin
Author: xoxorwr
Source: https://odin-lang.org/ (overview) & package builtin (pkg.odin-lang.org)
*/

export default function(hljs) {
  const LITERALS = [
    "true",
    "false",
    "nil"
  ];

  // Common built-in procedures / predeclared procs (pulled from package builtin)
  const BUILT_INS = [
    "len", "cap", "size_of", "align_of", "offset_of", "offset_of_selector", "offset_of_member", "offset_of_by_string",
    "type_of", "type_info_of", "typeid_of",
    "raw_data", "copy", "copy_slice", "copy_from_string",
    "make", "new", "new_clone", "make_slice", "make_dynamic_array", "make_map",
    "append", "append_elems", "append_string", "append_elem",
    "inject_at", "inject_at_elems", "assign_at", "assign_at_elems",
    "pop", "pop_safe", "pop_front", "pop_front_safe",
    "delete", "delete_dynamic_array", "delete_slice", "delete_map",
    "reserve", "reserve_map", "shrink_map", "resize_dynamic_array",
    "unordered_remove", "ordered_remove", "remove_range",
    "map_insert", "map_upsert", "map_entry",
    "soa_zip", "soa_unzip", "raw_soa_footer_slice", "raw_soa_footer_dynamic_array",
    "min", "max", "abs", "clamp", "assert", "ensure", "panic", "unimplemented",
    "swizzle", "complex", "quaternion", "real", "imag", "conj"
  ];

  // Predeclared type names (from package builtin). Also include 'matrix' which is a built-in type constructor.
  const TYPES = [
    "byte","bool","b8","b16","b32","b64",
    "i8","u8","i16","u16","i32","u32","i64","u64",
    "i128","u128","rune",
    "f16","f32","f64",
    "complex32","complex64","complex128",
    "quaternion64","quaternion128","quaternion256",
    "int","uint","uintptr","rawptr","string","cstring","typeid","any",
    "i16le","u16le","i32le","u32le","i64le","u64le","i128le","u128le",
    "i16be","u16be","i32be","u32be","i64be","u64be","i128be","u128be",
    "f16le","f32le","f64le","f16be","f32be","f64be",
    "Maybe","Objc_Block",
    "matrix"
  ];

  const KWS = [
    "package","import","foreign","proc","struct","enum","union","map","matrix","matrix",
    "matrix","matrix","type","package","return","if","else","for","do","when","where",
    "asm","context","dynamic","or_else","or_return","not_in","in","using","break","continue",
    "defer","fallthrough","switch","case","transmute","cast","auto_cast","distinct","using"
  ];

  const KEYWORDS = {
    keyword: KWS,
    type: TYPES,
    literal: LITERALS,
    built_in: BUILT_INS
  };

  return {
    name: 'Odin',
    aliases: ['odin'],
    keywords: KEYWORDS,
    illegal: '</',
    contains: [
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      {
        className: 'string',
        variants: [
          hljs.QUOTE_STRING_MODE,
          {
            begin: /`/,
            end: /`/
          }
        ]
      },
      {
        className: 'char',
        begin: /'(?:\\(?:.|[0Uux][0-9A-Fa-f]{1,6})|[^\n\r'\\])'/,
        end: /'/,
        illegal: /./
      },
      {
        className: 'number',
        variants: [
          { match: /\b0b[01_]+\b/ },
          { match: /\b0o[0-7_]+\b/ },
          { match: /\b0x[\dA-F_a-f]+\b/ },
          { match: /\b\d+(?:\.\d*)?(?:[eE][+-]?\d+)?[ijk]?\b/ },
          { match: /-\.\d(_?\d)*([eE][+-]?\d+)?i?/ }
        ],
        relevance: 0
      },
      // procedure definitions like: name :: proc(...) { ... }
      {
        className: 'function',
        begin: /\b\w+(?=\s*::\s*proc\b)/,
        relevance: 0
      },
      // proc keyword (for anonymous/typed procs)
      {
        className: 'function',
        beginKeywords: 'proc',
        end: '\\s*(\\{|$)',
        excludeEnd: true,
        contains: [
          hljs.TITLE_MODE,
          {
            className: 'params',
            begin: /\(/,
            end: /\)/,
            endsParent: true,
            keywords: KEYWORDS,
            illegal: /["']/
          }
        ]
      }
    ]
  };
}
