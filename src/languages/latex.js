/*
Language: LaTeX
Author: Benedikt Wilde <bwilde@posteo.de>
Website: https://www.latex-project.org
Category: markup
*/

export default function(hljs) {
  var KNOWN_CONTROL_WORDS = new RegExp([
      '(?:NeedsTeXFormat|RequirePackage|GetIdInfo)',
      'Provides(?:Expl)?(?:Package|Class|File)',
      '(?:DeclareOption|ProcessOptions)',
      '(?:documentclass|usepackage|input|include)',
      'makeat(?:letter|other)',
      'ExplSyntax(?:On|Off)',
      '(?:new|renew|provide)?command',
      '(?:re)newenvironment',
      '(?:New|Renew|Provide|Declare)(?:Expandable)?DocumentCommand',
      '(?:New|Renew|Provide|Declare)DocumentEnvironment',
      '(?:(?:e|g|x)?def|let)',
      '(?:begin|end)',
      '(?:part|chapter|(?:sub){0,2}section|(?:sub)?paragraph)',
      'caption',
      '(?:label|(?:eq|page|name)?ref|(?:paren|foot|super)?cite)'
    ].map(csname => csname + '(?![a-zA-Z@:_])').join('|'));
  var KNOWN_CONTROL_SYMBOLS = /\\|\(|\)|\[|\]|\s|!|,|:|;/
  var L3_VARIANTS = [
    {begin: /(?:__)?[a-zA-Z]{2,}_[a-zA-Z_]{2,}:[nNcVvoxefTFpwD]*/}, // functions
    {begin: /[lgc]__?[a-zA-Z]+_[a-zA-Z_]+/},                        // variables
    {begin: /[qs]__?[a-zA-Z_]{2,}/},                    // quarks and scan marks
    {begin: /use(?:_i)?:[nNcVvoxef]*/},
    {begin: /(?:else|fi|or):/},
    {begin: /(?:if|cs|exp):w/},
    {begin: /::[NnpcoefxvV:]/},
    {begin: /::[oefxvV]_unbraced/}
  ];
  var L2_VARIANTS = [
    {begin: /[a-zA-Z@]+/}, // control word
    {begin: /[^a-zA-Z@]?/} // control symbol
  ];
  var DOUBLE_CARET_VARIANTS = [
    {begin: /\^{6}[0-9a-f]{6}/},
    {begin: /\^{5}[0-9a-f]{5}/},
    {begin: /\^{4}[0-9a-f]{4}/},
    {begin: /\^{3}[0-9a-f]{3}/},
    {begin: /\^{2}[0-9a-f]{2}/},
    {begin: /\^{2}[\u0000-\u007f]/}
  ];
  var CONTROL_SEQUENCE = {
    className: 'keyword',
    begin: /\\/,
    contains: [
      {
        endsParent: true,
        variants: [
          {begin: KNOWN_CONTROL_WORDS},
          {begin: KNOWN_CONTROL_SYMBOLS}
        ]
      },
      {
        endsParent: true,
        variants: L3_VARIANTS
      },
      {
        endsParent: true,
        variants: DOUBLE_CARET_VARIANTS
      },
      {
        endsParent: true,
        relevance: 0,
        variants: L2_VARIANTS
      }
    ]
  };
  var MACRO_PARAM = {
    className: 'params',
    relevance: 0,
    begin: /#+\d?/
  };
  var DOUBLE_CARET_CHAR = {
    variants: DOUBLE_CARET_VARIANTS
  };
  var SPECIAL_CATCODE = {
    className: 'built_in',
    relevance: 0,
    begin: /[$&^_]/
  };
  var BRACES = {
    className: 'built_in',
    relevance: 0,
    begin: /[{}]/
  };
  var MAGIC_COMMENT = hljs.COMMENT(
    '% !TeX',
    '$',
    {
      className: 'meta',
      relevance: 10
    }
  );
  var COMMENT = hljs.COMMENT(
    '%',
    '$',
    {
      relevance: 0
    }
  );
  var EVERYTHING_BUT_BRACES_AND_VERBATIM = [
    CONTROL_SEQUENCE,
    MACRO_PARAM,
    DOUBLE_CARET_CHAR,
    SPECIAL_CATCODE,
    MAGIC_COMMENT,
    COMMENT
  ];
  var EVERYTHING_BUT_VERBATIM = [...EVERYTHING_BUT_BRACES_AND_VERBATIM, BRACES];
  var BRACE_GROUP_NO_VERBATIM = {
    begin: /\{/, end: /\}/,
    keywords: {
      $pattern: /\{|\}/,
      built_in: '{ }'
    },
    relevance: 0,
    contains: ['self', ...EVERYTHING_BUT_BRACES_AND_VERBATIM]
  }
  var ARGUMENT_BRACES = hljs.inherit(
    BRACE_GROUP_NO_VERBATIM,
    {endsParent: true, contains: [BRACE_GROUP_NO_VERBATIM, ...EVERYTHING_BUT_BRACES_AND_VERBATIM]}
  );
  var ARGUMENT_BRACKETS = {
    begin: /\[/, end: /\]/,
    endsParent: true,
    relevance: 0,
    contains: [BRACE_GROUP_NO_VERBATIM, ...EVERYTHING_BUT_BRACES_AND_VERBATIM]
  }
  var ARGUMENT_ABSENT = {
    begin: /(?=[.$])/, end: /(?=[.$])/,
    endsParent: true,
    relevance: 0
  }
  var SPACE_GOBBLER = {
    begin: /\s+/,
    endsParent: true,
    relevance: 0
  };
  var ARGUMENT_M = [ARGUMENT_BRACES];
  var ARGUMENT_O = [ARGUMENT_BRACKETS, ARGUMENT_ABSENT];
  var ARGUMENT_NONE = [ARGUMENT_ABSENT];
  var ARGUMENT_AND_THEN = function(arg, starts_mode) {
    return {
      contains: [SPACE_GOBBLER],
      starts: {
        relevance: 0,
        contains: arg,
        starts: starts_mode
      }
    };
  };
  var CSNAME = function(csname, starts_mode) {
    return hljs.inherit(
      {
        begin: '\\\\' + csname + '(?![a-zA-Z@:_])',
        keywords: {$pattern: /\\[a-zA-Z]+/, keyword: '\\' + csname}
      },
      ARGUMENT_AND_THEN(ARGUMENT_NONE, starts_mode)
    );
  };
  var BEGIN_ENV = function(envname, starts_mode) {
    return hljs.inherit(
      {
        begin: '\\\\begin(?=\\s*\\r?\\n?\\s*\\{' + envname + '\\})',
        keywords: {$pattern: /\\[a-zA-Z]+/, keyword: '\\begin'}
      },
      ARGUMENT_AND_THEN(ARGUMENT_M, starts_mode)
    );
  };
  var VERBATIM_DELIMITED_EQUAL = hljs.END_SAME_AS_BEGIN({
    className: 'string',
    begin: /(.|\r?\n)/, end: /(.|\r?\n)/,
    excludeBegin: true, excludeEnd: true,
    endsParent: true
  });
  var VERBATIM_DELIMITED_BRACES = {
    className: 'string',
    begin: /\{/, end: /\}/,
    excludeBegin: true, excludeEnd: true,
    endsParent: true
  };
  var VERBATIM_DELIMITED_ENV = function(envname) {
    return {
      className: 'string',
      end: '(?=\\\\end\\{' + envname + '\\})'
    };
  };
  var PATCH_CLASSNAME = function(mode, class_name) {
    return hljs.inherit(mode, {className: class_name});
  };
  var VERBATIM = {
    variants: [
      CSNAME('verb', {contains: [VERBATIM_DELIMITED_EQUAL]}),
      CSNAME('lstinline', {contains: [VERBATIM_DELIMITED_EQUAL]}),
      CSNAME('mint', ARGUMENT_AND_THEN(ARGUMENT_M, {contains: [VERBATIM_DELIMITED_EQUAL]})),
      CSNAME('mintinline', ARGUMENT_AND_THEN(ARGUMENT_M, {contains: [VERBATIM_DELIMITED_BRACES, VERBATIM_DELIMITED_EQUAL]})),
      CSNAME('url', {contains: [PATCH_CLASSNAME(VERBATIM_DELIMITED_BRACES, 'link'),
                                PATCH_CLASSNAME(VERBATIM_DELIMITED_EQUAL, 'link')]}),
      BEGIN_ENV('verbatim',    VERBATIM_DELIMITED_ENV('verbatim')),
      BEGIN_ENV('verbatim\\*', VERBATIM_DELIMITED_ENV('verbatim\\*')),
      BEGIN_ENV('Verbatim',     ARGUMENT_AND_THEN(ARGUMENT_O, VERBATIM_DELIMITED_ENV('Verbatim'))),
      BEGIN_ENV('Verbatim\\*',  ARGUMENT_AND_THEN(ARGUMENT_O, VERBATIM_DELIMITED_ENV('Verbatim\\*'))),
      BEGIN_ENV('BVerbatim',    ARGUMENT_AND_THEN(ARGUMENT_O, VERBATIM_DELIMITED_ENV('BVerbatim'))),
      BEGIN_ENV('BVerbatim\\*', ARGUMENT_AND_THEN(ARGUMENT_O, VERBATIM_DELIMITED_ENV('BVerbatim\\*'))),
      BEGIN_ENV('LVerbatim',    ARGUMENT_AND_THEN(ARGUMENT_O, VERBATIM_DELIMITED_ENV('LVerbatim'))),
      BEGIN_ENV('LVerbatim\\*', ARGUMENT_AND_THEN(ARGUMENT_O, VERBATIM_DELIMITED_ENV('LVerbatim\\*'))),
      BEGIN_ENV('minted', ARGUMENT_AND_THEN(ARGUMENT_O, ARGUMENT_AND_THEN(ARGUMENT_M, VERBATIM_DELIMITED_ENV('minted')))),
      BEGIN_ENV('filecontents',  ARGUMENT_AND_THEN(ARGUMENT_M, VERBATIM_DELIMITED_ENV('filecontents'))),
      BEGIN_ENV('filecontents*', ARGUMENT_AND_THEN(ARGUMENT_M, VERBATIM_DELIMITED_ENV('filecontents*')))
    ]
  };
  var EVERYTHING = [VERBATIM, ...EVERYTHING_BUT_VERBATIM];
  return {
    name: 'LaTeX',
    aliases: ['TeX'],
    contains: EVERYTHING
  };
}
