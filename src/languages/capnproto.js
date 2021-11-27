/*
Language: Cap’n Proto
Author: Oleg Efimov <efimovov@gmail.com>
Description: Cap’n Proto message definition format
Website: https://capnproto.org/capnp-tool.html
Category: protocols
*/

/** @type LanguageFn */
export default function(hljs) {
  const KEYWORDS = [
    "struct",
    "enum",
    "interface",
    "union",
    "group",
    "import",
    "using",
    "const",
    "annotation",
    "extends",
    "in",
    "of",
    "on",
    "as",
    "with",
    "from",
    "fixed"
  ];
  const BUILT_INS = [
    "Void",
    "Bool",
    "Int8",
    "Int16",
    "Int32",
    "Int64",
    "UInt8",
    "UInt16",
    "UInt32",
    "UInt64",
    "Float32",
    "Float64",
    "Text",
    "Data",
    "AnyPointer",
    "AnyStruct",
    "Capability",
    "List"
  ];
  const LITERALS = [
    "true",
    "false"
  ];
  return {
    name: 'Cap’n Proto',
    aliases: ['capnp'],
    keywords: {
      keyword: KEYWORDS,
      built_in: BUILT_INS,
      literal: LITERALS
    },
    contains: [
      hljs.QUOTE_STRING_MODE,
      hljs.NUMBER_MODE,
      hljs.HASH_COMMENT_MODE,
      {
        className: 'meta',
        begin: /@0x[\w\d]{16};/,
        illegal: /\n/
      },
      {
        className: 'symbol',
        begin: /@\d+\b/
      },
      {
        className: 'class',
        beginKeywords: 'struct enum',
        end: /\{/,
        illegal: /\n/,
        contains: [hljs.inherit(hljs.TITLE_MODE, {
          starts: {
            endsWithParent: true,
            excludeEnd: true
          } // hack: eating everything after the first title
        })]
      },
      {
        className: 'class',
        beginKeywords: 'interface',
        end: /\{/,
        illegal: /\n/,
        contains: [hljs.inherit(hljs.TITLE_MODE, {
          starts: {
            endsWithParent: true,
            excludeEnd: true
          } // hack: eating everything after the first title
        })]
      }
    ]
  };
}
