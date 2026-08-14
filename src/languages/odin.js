/*
Language: Odin
Author: xoxorwr
Description: The Odin programming language
Website: https://odin-lang.org/
Category: system
*/

/** @type LanguageFn */
export default function(hljs) {
  const LITERALS = [
    "true",
    "false",
    "nil"
  ];

  const BUILT_INS = [
    "abs",
    "align_of",
    "append",
    "append_elem",
    "append_elems",
    "append_string",
    "assert",
    "assign_at",
    "assign_at_elems",
    "cap",
    "clamp",
    "complex",
    "conj",
    "copy",
    "copy_from_string",
    "copy_slice",
    "delete",
    "delete_dynamic_array",
    "delete_map",
    "delete_slice",
    "ensure",
    "imag",
    "inject_at",
    "inject_at_elems",
    "len",
    "make",
    "make_dynamic_array",
    "make_map",
    "make_slice",
    "map_entry",
    "map_insert",
    "map_upsert",
    "max",
    "min",
    "new",
    "new_clone",
    "offset_of",
    "offset_of_by_string",
    "offset_of_member",
    "offset_of_selector",
    "ordered_remove",
    "panic",
    "pop",
    "pop_front",
    "pop_front_safe",
    "pop_safe",
    "quaternion",
    "raw_data",
    "raw_soa_footer_dynamic_array",
    "raw_soa_footer_slice",
    "real",
    "remove_range",
    "reserve",
    "reserve_map",
    "resize_dynamic_array",
    "shrink_map",
    "size_of",
    "soa_unzip",
    "soa_zip",
    "swizzle",
    "type_info_of",
    "type_of",
    "typeid_of",
    "unimplemented",
    "unordered_remove"
  ];

  const TYPES = [
    "Maybe",
    "Objc_Block",
    "any",
    "b16",
    "b32",
    "b64",
    "b8",
    "bool",
    "byte",
    "complex128",
    "complex32",
    "complex64",
    "cstring",
    "f16",
    "f16be",
    "f16le",
    "f32",
    "f32be",
    "f32le",
    "f64",
    "f64be",
    "f64le",
    "i128",
    "i128be",
    "i128le",
    "i16",
    "i16be",
    "i16le",
    "i32",
    "i32be",
    "i32le",
    "i64",
    "i64be",
    "i64le",
    "i8",
    "int",
    "matrix",
    "quaternion128",
    "quaternion256",
    "quaternion64",
    "rawptr",
    "rune",
    "string",
    "typeid",
    "u128",
    "u128be",
    "u128le",
    "u16",
    "u16be",
    "u16le",
    "u32",
    "u32be",
    "u32le",
    "u64",
    "u64be",
    "u64le",
    "u8",
    "uint",
    "uintptr"
  ];

  const KEYWORDS = [
    "asm",
    "auto_cast",
    "break",
    "case",
    "cast",
    "context",
    "continue",
    "defer",
    "distinct",
    "do",
    "dynamic",
    "else",
    "enum",
    "fallthrough",
    "for",
    "foreign",
    "if",
    "import",
    "in",
    "map",
    "matrix",
    "not_in",
    "or_else",
    "or_return",
    "package",
    "proc",
    "return",
    "struct",
    "switch",
    "transmute",
    "type",
    "union",
    "using",
    "when",
    "where"
  ];

  return {
    name: 'Odin',
    aliases: [ 'odinlang' ],
    keywords: {
      keyword: KEYWORDS,
      type: TYPES,
      literal: LITERALS,
      built_in: BUILT_INS
    },
    contains: [
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      {
        scope: 'string',
        variants: [
          hljs.QUOTE_STRING_MODE,
          {
            begin: /`/,
            end: /`/
          }
        ]
      },
      {
        scope: 'string',
        match: /'(?:\\(?:.|[0Uux][0-9A-Fa-f]{1,6})|[^\n\r'\\])'/
      },
      {
        scope: 'number',
        variants: [
          { match: /\b0b[01_]+\b/ },
          { match: /\b0o[0-7_]+\b/ },
          { match: /\b0x[\dA-F_a-f]+\b/ },
          { match: /\b\d+(?:\.\d*)?(?:[eE][+-]?\d+)?[ijk]?\b/ },
          { match: /-\.\d(_?\d)*([eE][+-]?\d+)?i?/ }
        ]
      },
      {
        match: [
          /\b[A-Za-z_]\w*/,
          /\s*::\s*/,
          /\bproc\b/
        ],
        scope: {
          1: "title.function",
          3: "keyword"
        }
      }
    ]
  };
}
