/*
Language: Crystal
Author: TSUYUSATO Kitsune <make.just.on@gmail.com>
Category: common
*/

function(hljs) {
  var CRYSTAL_IDENT_RE = '[a-zA-Z_]\\w*[!?]?';
  var CRYSTAL_METHOD_RE = '[a-zA-Z_]\\w*[!?=]?|[-+~]\\@|<<|>>|=~|===?|<=>|[<>]=?|\\*\\*|[-/+%^&*~`|]|\\[\\][=?]?';
  var CRYSTAL_KEYWORDS =
    'abstract alias asm begin break case class def do else elsif end ensure enum extend false for fun if ifdef ' +
    'include instance_sizeof is_a? lib macro module next nil of out pointerof private protected rescue responds_to? ' +
    'return require self sizeof struct super then true type undef union unless until when while with yield ' +
    '__DIR__ __FILE__ __LINE__';
  var SUBST = {
    className: 'subst',
    begin: '#\\{', end: '}',
    keywords: CRYSTAL_KEYWORDS
  };
  var EXPANSION = {
    className: 'expansion',
    begin: '\\{[{%]', end: '[%}]\\}',
    keywords: CRYSTAL_KEYWORDS,
    relevance: 10,
  };
  var
  STRING = {
    className: 'string',
    contains: [hljs.BACKSLASH_ESCAPE, SUBST],
    variants: [
      {begin: /'/, end: /'/},
      {begin: /"/, end: /"/},
      {begin: /`/, end: /`/},
      {begin: '%w?\\(', end: '\\)'},
      {begin: '%w?\\[', end: '\\]'},
      {begin: '%w?{', end: '}'},
      {begin: '%w?<', end: '>'},
      {begin: '%w?/', end: '/'},
      {begin: '%w?%', end: '%'},
      {begin: '%w?-', end: '-'},
      {begin: '%w?\\|', end: '\\|'},
    ],
    relevance: 0,
  };
  var CRYSTAL_DEFAULT_CONTAINS = [
    EXPANSION,
    STRING,
    hljs.HASH_COMMENT_MODE,
    {
      className: 'class',
      beginKeywords: 'class module struct', end: '$|;',
      illegal: /=/,
      contains: [
        hljs.HASH_COMMENT_MODE,
        hljs.inherit(hljs.TITLE_MODE, {begin: '[A-Za-z_]\\w*(::\\w+)*(\\?|\\!)?'}),
        {
          className: 'inheritance',
          begin: '<\\s*',
          contains: [{
            className: 'parent',
            begin: '(' + hljs.IDENT_RE + '::)?' + hljs.IDENT_RE
          }]
        }
      ]
    },
    {
      className: 'class',
      beginKeywords: 'lib enum union', end: '$|;',
      illegal: /=/,
      contains: [
        hljs.HASH_COMMENT_MODE,
        hljs.inherit(hljs.TITLE_MODE, {begin: '[A-Za-z_]\\w*(::\\w+)*(\\?|\\!)?'}),
      ],
      relevance: 10
    },
    {
      className: 'function',
      beginKeywords: 'def', end: /\B\b/,
      contains: [
        hljs.inherit(hljs.TITLE_MODE, {
          begin: CRYSTAL_METHOD_RE,
          endsParent: true
        })
      ]
    },
    {
      className: 'function',
      beginKeywords: 'fun macro', end: /\B\b/,
      contains: [
        hljs.HASH_COMMENT_MODE,
        hljs.inherit(hljs.TITLE_MODE, {
          begin: CRYSTAL_METHOD_RE,
          endsParent: true
        })
      ],
      relevance: 5
    },
    {
      className: 'constant',
      begin: '(::)?(\\b[A-Z]\\w*(::)?)+',
      relevance: 0
    },
    {
      className: 'symbol',
      begin: hljs.UNDERSCORE_IDENT_RE + '(\\!|\\?)?:',
      relevance: 0
    },
    {
      className: 'symbol',
      begin: ':',
      contains: [STRING, {begin: CRYSTAL_METHOD_RE}],
      relevance: 0
    },
    {
      className: 'number',
      begin: '((\\b0[0-7_]+)|(\\b0x[0-9a-fA-F_]+)|(\\b[1-9][0-9_]*(\\.[0-9_]+([eE]-?[0-9]+))?))(_[fui](8|16|32|64))?',
      relevance: 0
    },
    {
      className: 'variable',
      begin: '(\\$\\W)|((\\$|\\@\\@?|%)(\\w+))'
    },
    { // regexp container
      begin: '(' + hljs.RE_STARTERS_RE + ')\\s*',
      contains: [
        hljs.HASH_COMMENT_MODE,
        {
          className: 'regexp',
          contains: [hljs.BACKSLASH_ESCAPE, SUBST],
          variants: [
            {begin: '/', end: '/[a-z]*'},
          ]
        }
      ],
      relevance: 0
    }
  ];
  SUBST.contains = CRYSTAL_DEFAULT_CONTAINS;
  EXPANSION.contains = CRYSTAL_DEFAULT_CONTAINS.slice(1); // without EXPANSION

  return {
    aliases: ['cr'],
    lexemes: CRYSTAL_IDENT_RE,
    keywords: CRYSTAL_KEYWORDS,
    contains: CRYSTAL_DEFAULT_CONTAINS
  };
}
