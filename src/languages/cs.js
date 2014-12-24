/*
Language: C#
Author: Jason Diamond <jason@diamond.name>
Contributors: Matt Ellis <m.t.ellis@gmail.com>
Category: common
*/

function(hljs) {
  var _KEYWORDS =
    // Normal keywords.
    'abstract as async base break case catch checked const continue ' +
    'default delegate do double else event explicit extern finally fixed ' +
    'for foreach goto if implicit in interface internal is lock ' +
    'operator out override params private protected public readonly ref ' +
    'sealed sizeof stackalloc static switch this try typeof ' +
    'unchecked unsafe using virtual volatile while ' +
    // Contextual keywords.
    'ascending descending from get group into join let orderby partial select set value var ' +
    'where yield';
  var BUILTIN_TYPES = 'bool byte char decimal float int long object sbyte short string uint ulong ushort void';
  var KEYWORDS = _KEYWORDS + ' ' + BUILTIN_TYPES;
  var LITERALS = 'true false null';

  // We can't really do arbitrarily nested generics, but since we don't do anything
  // with the matched content, we can fake it
  var FAKE_NESTED_GENERIC_IDENT_RE = hljs.IDENT_RE + '(<[^>]>)?';
  var GENERIC_IDENT_RE = hljs.IDENT_RE + '(<' + FAKE_NESTED_GENERIC_IDENT_RE + '(,\\s*' + FAKE_NESTED_GENERIC_IDENT_RE + ')*>)?';
  var GENERIC_TITLE_MODE = {
    className: 'title',
    begin: GENERIC_IDENT_RE,
    relevance: 0
  };
  var QUALIFIED_IDENT_RE = GENERIC_IDENT_RE + '([.]' + GENERIC_IDENT_RE + ')*';
  var QUALIFIED_TITLE_MODE = {
    className: 'title',
    begin: QUALIFIED_IDENT_RE,
    relevance: 0
  };
  var GENERIC_CONSTRAINT_RE = '(new\\(\\)|struct|class|(' + QUALIFIED_IDENT_RE + '))';

  var ATTRIBUTE_TARGET_RE = '(\\s*(return|assembly|field|method|event|param)\\s*:)?\\s*';
  var ATTRIBUTE_RE = ATTRIBUTE_TARGET_RE + QUALIFIED_IDENT_RE + '\\s*(\\(.+?\\))?\\s*';
  var ATTRIBUTES_MODE = {
    className: 'attribute',
    begin: '\\[' + ATTRIBUTE_RE + '(,' + ATTRIBUTE_RE + ')*\\]',
    returnBegin: true,
    contains: [
      {
        begin: '\\[', end: '\\]',
        contains: [
          {
            beginKeywords: 'return assembly field method event param',
          },
          QUALIFIED_TITLE_MODE,
          {
            className: 'params',
            begin: /\(/, end: /\)/,
            keywords: { keyword: 'typeof', literals: LITERALS },
            relevance: 0,
            contains: [
              hljs.APOS_STRING_MODE,
              hljs.QUOTE_STRING_MODE,
              hljs.C_NUMBER_MODE,
              hljs.C_BLOCK_COMMENT_MODE
            ]
          }
        ]
      },
    ]
  };

  return {
    aliases: ['csharp'],
    keywords: { keyword: KEYWORDS, literal: LITERALS },
    illegal: /::/,
    contains: [
      {
        className: 'comment',
        begin: '///', end: '$', returnBegin: true,
        contains: [
          {
            className: 'xmlDocTag',
            variants: [
              {
                begin: '///', relevance: 0
              },
              {
                begin: '<!--|-->'
              },
              {
                className: '',
                begin: '</?', end: '>',
                subLanguage: 'xml'
              }
            ]
          }
        ]
      },
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      {
        className: 'preprocessor',
        begin: '#', end: '$',
        keywords: 'if else elif endif define undef warning error line region endregion pragma checksum disable restore'
      },
      {
        className: 'string',
        begin: '@"', end: '"',
        contains: [{begin: '""'}]
      },
      hljs.APOS_STRING_MODE,
      hljs.QUOTE_STRING_MODE,
      hljs.C_NUMBER_MODE,
      {
        className: 'class',
        begin: '(' + hljs.IDENT_RE + ')*\\s*(class|interface|struct)', end: /[{;=]/,
        exludeEnd: true,
        keywords: KEYWORDS + ' class interface struct',
        illegal: /[^\s:,]/,
        contains: [
          {
            begin: 'where ' + hljs.IDENT_RE + '\\s*:\\s*' + GENERIC_CONSTRAINT_RE + '(,\\s*' + GENERIC_CONSTRAINT_RE + '\\s*)*',
            keywords: 'where new struct class'
          },
          {
            begin: ':', end: '$',
            contains: [
              {
                begin: QUALIFIED_IDENT_RE
              }
            ]
          },
          GENERIC_TITLE_MODE,
          hljs.C_LINE_COMMENT_MODE,
          hljs.C_BLOCK_COMMENT_MODE
        ]
      },
      {
        beginKeywords: 'namespace', end: /{/,
        illegal: /[^\s:]/,
        contains: [
          QUALIFIED_TITLE_MODE,
          hljs.C_LINE_COMMENT_MODE,
          hljs.C_BLOCK_COMMENT_MODE
        ]
      },
      {
        className: 'class',
        beginKeywords: 'enum', end: /{/,
        illegal: /[^\s:]/,
        contains: [
          hljs.TITLE_MODE,
          hljs.C_LINE_COMMENT_MODE,
          hljs.C_BLOCK_COMMENT_MODE
        ],
        relevance: 0
      },
      {
        // Expression keywords prevent 'keyword Name(...)' from being
        // recognized as a function definition
        beginKeywords: 'new return throw await',
        relevance: 0
      },
      {
        className: 'function',
        begin: '(' + QUALIFIED_IDENT_RE + '\\s+)+' + GENERIC_IDENT_RE + '\\s*\\(', returnBegin: true, end: /[{;=]/,
        excludeEnd: true,
        keywords: KEYWORDS,
        contains: [
          {
            begin: GENERIC_IDENT_RE + '\\s*\\(', returnBegin: true,
            contains: [GENERIC_TITLE_MODE],
            relevance: 0
          },
          {
            className: 'params',
            begin: /\(/, end: /\)/,
            keywords: 'out ref params void ' + BUILTIN_TYPES,
            relevance: 0,
            contains: [
              ATTRIBUTES_MODE,
              hljs.APOS_STRING_MODE,
              hljs.QUOTE_STRING_MODE,
              hljs.C_NUMBER_MODE,
              hljs.C_BLOCK_COMMENT_MODE
            ]
          },
          hljs.C_LINE_COMMENT_MODE,
          hljs.C_BLOCK_COMMENT_MODE
        ]
      },
      {
        begin: '(' + QUALIFIED_IDENT_RE + '\\s+)+' + GENERIC_IDENT_RE + '\\s*(\\[[^\\]]+\\])?\\s*{',
        returnBegin: true,
        keywords: KEYWORDS,
        contains: [
          {
            begin: QUALIFIED_IDENT_RE + '\\s+',
            keywords: KEYWORDS,
            contains: [GENERIC_TITLE_MODE],
            relevance: 0
          },
          {
            className: 'params',
            begin: /\[/, end: /\]/,
            keywords: BUILTIN_TYPES,
            contains: [ATTRIBUTES_MODE],
            relevance: 0
          },
          hljs.C_LINE_COMMENT_MODE,
          hljs.C_BLOCK_COMMENT_MODE
        ]
      },
      ATTRIBUTES_MODE
    ]
  };
}
