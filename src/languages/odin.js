/*
Language: Odin
Author: Marian Pekár
Description: Odin is a general-purpose programming language with distinct typing built for high performance, modern systems and data-oriented programming.
Website: https://odin-lang.org/
Category: system
*/

export default function (hljs) {
  const TYPES = [
    "bool", "b8", "b16", "b32", "b64",
    "int",  "i8", "i16", "i32", "i64", "i128",
    "uint", "u8", "u16", "u32", "u64", "u128",

    "i16le", "i32le", "i64le", "i128le",
    "u16le", "u32le", "u64le", "u128le",
    "i16be", "i32be", "i64be", "i128be",
    "u16be", "u32be", "u64be", "u128be",

    "f16",   "f32",   "f64",
    "f16le", "f32le", "f64le",
    "f16be", "f32be", "f64be",

    "complex32", "complex64", "complex128",

    "quaternion64", "quaternion128", "quaternion256",

    "rune", "string", "cstring",

    "rawptr", "uintptr",
    "typeid", "any",

    "Maybe", "Objc_Block",
  ];

  const KEYWORDS = [
    "allocate",
    "auto_cast",
    "bit_field",
    "bit_set",
    "break",
    "case",
    "cast",
    "context",
    "continue",
    "defer",
    "delete",
    "distinct",
    "do",
    "dynamic",
    "else",
    "enum",
    "fallthrough",
    "for",
    "foreign",
    "free",
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
    "union",
    "using",
    "when",
    "where",
  ];

  const BUILT_IN = [
    "abs",
    "align_of",
    "cap",
    "clamp",
    "complex",
    "compress_values",
    "conj",
    "expand_values",
    "imag",
    "jmag",
    "kmag",
    "len",
    "max",
    "min",
    "offset_of",
    "offset_of_by_string",
    "offset_of_member",
    "offset_of_selector",
    "quaternion",
    "raw_data",
    "real",
    "size_of",
    "soa_unzip",
    "soa_zip",
    "swizzle",
    "type_info_of",
    "type_of",
    "typeid_of",
    "append_elem",
    "append_elem_string",
    "append_elems",
    "append_fixed_capacity_elem",
    "append_fixed_capacity_elems",
    "append_fixed_capacity_string",
    "append_nothing_dynamic_array",
    "append_nothing_fixed_capacity_dynamic_array",
    "append_nothing_soa",
    "append_soa_elem",
    "append_soa_elems",
    "append_string",
    "assert",
    "assert_contextless",
    "assign_at_elem",
    "assign_at_elem_fixed_capacity_dynamic_array",
    "assign_at_elem_string",
    "assign_at_elem_string_fixed_capacity_dynamic_array",
    "assign_at_elems",
    "assign_at_elems_fixed_capacity_dynamic_array",
    "card",
    "clear_dynamic_array",
    "clear_fixed_capacity_dynamic_array",
    "clear_map",
    "clear_soa_dynamic_array",
    "container_of",
    "copy_from_string",
    "copy_from_string16",
    "copy_slice",
    "delete_cstring",
    "delete_cstring16",
    "delete_dynamic_array",
    "delete_key",
    "delete_map",
    "delete_slice",
    "delete_soa_dynamic_array",
    "delete_soa_slice",
    "delete_string",
    "delete_string16",
    "ensure",
    "ensure_contextless",
    "init_global_temporary_allocator",
    "inject_at_elem",
    "inject_at_elem_fixed_capacity_dynamic_array",
    "inject_at_elem_soa",
    "inject_at_elem_string",
    "inject_at_elem_string_fixed_capacity_dynamic_array",
    "inject_at_elems",
    "inject_at_elems_fixed_capacity_dynamic_array",
    "inject_at_elems_soa",
    "make_aligned",
    "make_dynamic_array",
    "make_dynamic_array_len",
    "make_dynamic_array_len_cap",
    "make_map",
    "make_map_cap",
    "make_multi_pointer",
    "make_slice",
    "make_soa_aligned",
    "make_soa_dynamic_array",
    "make_soa_dynamic_array_len",
    "make_soa_dynamic_array_len_cap",
    "make_soa_slice",
    "map_entry",
    "map_insert",
    "map_upsert",
    "mem_free",
    "mem_free_all",
    "new",
    "new_aligned",
    "new_clone",
    "non_zero_append_elem",
    "non_zero_append_elem_fixed_capacity_string",
    "non_zero_append_elem_string",
    "non_zero_append_elems",
    "non_zero_append_soa_elem",
    "non_zero_append_soa_elems",
    "non_zero_reserve_dynamic_array",
    "non_zero_reserve_soa",
    "non_zero_resize_dynamic_array",
    "non_zero_resize_fixed_capacity_dynamic_array",
    "non_zero_resize_soa",
    "ordered_remove_dynamic_array",
    "ordered_remove_fixed_capacity_dynamic_array",
    "ordered_remove_soa",
    "panic",
    "panic_contextless",
    "pop_dynamic_array",
    "pop_fixed_capacity_dynamic_array",
    "pop_front_dynamic_array",
    "pop_front_fixed_capacity_dynamic_array",
    "pop_front_safe_dynamic_array",
    "pop_front_safe_fixed_capacity_dynamic_array",
    "pop_front_safe_soa",
    "pop_front_soa",
    "pop_safe_dynamic_array",
    "pop_safe_fixed_capacity_dynamic_array",
    "pop_safe_soa",
    "pop_soa",
    "raw_soa_footer_dynamic_array",
    "raw_soa_footer_slice",
    "remove_range_dynamic_array",
    "remove_range_fixed_capacity_dynamic_array",
    "reserve_dynamic_array",
    "reserve_map",
    "reserve_soa",
    "resize_dynamic_array",
    "resize_fixed_capacity_dynamic_array",
    "resize_soa",
    "shrink_dynamic_array",
    "shrink_map",
    "unimplemented",
    "unimplemented_contextless",
    "unordered_remove_dynamic_array",
    "unordered_remove_fixed_capacity_dynamic_array",
    "unordered_remove_soa",
  ];

  const NUMBER_CONTENT = {
    className: "number",
    variants: [
      hljs.C_NUMBER_MODE
    ]
  }

  const DYNAMIC_KEYWORD_CONTENT =     {
    className: 'keyword',
    begin: /\bdynamic\b/,
    relevance: 0
  }

  const CARET_AND_AMPERSAND_CONTENT =     {
    className: 'meta',
    begin: /[\^&]/,
    relevance: 0
  }

  const RETURN_TYPE_CONTAINS = [
    {
      className: 'type',
      begin: /(?:(?<=\^)|(?<=->\s?|]\s*))[A-Za-z_][A-Za-z0-9_.]*/,
    },
    NUMBER_CONTENT,
    DYNAMIC_KEYWORD_CONTENT,
    CARET_AND_AMPERSAND_CONTENT
  ]

  const STRUCT_AND_PARAM_TYPE_CONTAINS = [
    {
      className: 'type',
      begin: /(?:(?<=\^)|(?<=:\s?|]\s*))[A-Za-z_][A-Za-z0-9_.]*/,
    },
    NUMBER_CONTENT,
    DYNAMIC_KEYWORD_CONTENT,
    CARET_AND_AMPERSAND_CONTENT
  ];

  return {
    name: "Odin",
    case_sensitive: true,
    aliases: ["odin", "odinlang", "odin-lang", "language-odin"],
    keywords: {
      keyword: KEYWORDS,
      type: TYPES,
      literal: "true false nil",
      built_in: BUILT_IN
    },
    illegal: "</",
    contains: [
      CARET_AND_AMPERSAND_CONTENT,
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      {
        className: "string",
        variants: [
          hljs.QUOTE_STRING_MODE,
          {
            begin: "'",
            end: "[^\\\\]'"
          },
          {
            begin: "`",
            end: "`"
          }
        ]
      },
      {
        className: "number",
        variants: [
          {
            begin: hljs.C_NUMBER_RE + "[ijk]",
            relevance: 1
          },
          hljs.C_NUMBER_MODE
        ]
      },
      {
        className: 'function', // function declaration
        begin: /\b([A-Za-z_][A-Za-z0-9_]*)\s*::\s*proc\b/,
        end: /[{\n]/,
        returnBegin: true,
        contains: [
          {
            className: 'title',
            begin: /\b[A-Za-z_][A-Za-z0-9_]*(?=\s*::\s*proc\b)/,
            relevance: 0
          },
          {
            className: 'keyword',
            begin: /\bproc\b/,
            relevance: 0
          },
          {
            className: 'params',
            begin: /\(/,
            end: /\)/,
            illegal: /["']/,
            contains: STRUCT_AND_PARAM_TYPE_CONTAINS
          },
          {
            // return type
            begin: /->/,
            end: /\{/,
            returnBegin: true,
            contains: RETURN_TYPE_CONTAINS,
            relevance: 0
          },
        ]
      },
      {
        className: 'built_in', // function call
        begin: /\b(?!(?:proc|if|for|switch|when)\b)([A-Za-z_][A-Za-z0-9_]*)(?=\s*\()/,
        excludeEnd: true,
      },
      {
        className: 'struct',
        begin: /\b([A-Za-z_][A-Za-z0-9_]*)\s*::\s*struct\b/,
        end: /[}]/,
        returnBegin: true,
        contains: [
          {
            className: 'title',
            begin: /\b[A-Za-z_][A-Za-z0-9_]*(?=\s*::\s*struct\b)/,
            relevance: 0
          },
          {
            className: 'keyword',
            begin: /\bstruct\b/,
            relevance: 0
          },
          {
            begin: /(?<=:\s*)[\[^A-Za-z_][A-Za-z0-9_.\]^[]*/,
            end: /\n/,
            returnBegin: true,
            contains: STRUCT_AND_PARAM_TYPE_CONTAINS,
            relevance: 0
          },
        ]
      }
    ]
  };
};
