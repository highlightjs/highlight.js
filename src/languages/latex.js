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
  var KNOWN_CONTROL_SYMBOLS = /\\|\(|\)|\[|\]|\s|!|,|;/
  var L3_REGEX = new RegExp([
      '(?:__)?[a-zA-Z]{2,}_[a-zA-Z](?:_?[a-zA-Z])+:[a-zA-Z]*',
      '[lgc]__?[a-zA-Z]+_[a-zA-Z](?:_?[a-zA-Z])*[a-zA-Z]',
      '[qs]__?[a-zA-Z](?:_?[a-zA-Z])+',
      'use(?:_i)?:[a-zA-Z]*',
      '(?:else|fi|or):',
      '(?:if|cs|exp):w',
      '(?:hbox|vbox):n',
      '::[a-zA-Z]_unbraced',
      '::[a-zA-Z:]'
    ].map(pattern => pattern + '(?![a-zA-Z:_])').join('|'));
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
        begin: L3_REGEX
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
    relevance: 0
  };
  var ARGUMENT_M = [ARGUMENT_BRACES];
  var ARGUMENT_O = [ARGUMENT_BRACKETS, ARGUMENT_ABSENT];
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
    return {
        begin: '\\\\' + csname + '(?![a-zA-Z@:_])',
        keywords: {$pattern: /\\[a-zA-Z]+/, keyword: '\\' + csname},
        contains: [SPACE_GOBBLER],
        starts: starts_mode
      };
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
  var VERBATIM_DELIMITED_EQUAL = (innerName = "string") => {
    return hljs.END_SAME_AS_BEGIN({
      className: innerName,
      begin: /(.|\r?\n)/, end: /(.|\r?\n)/,
      excludeBegin: true, excludeEnd: true,
      endsParent: true
    });
  };
  var VERBATIM_DELIMITED_ENV = function(envname) {
    return {
      className: 'string',
      end: '(?=\\\\end\\{' + envname + '\\})'
    };
  };

  var VERBATIM_DELIMITED_BRACES = (innerName = "string") => {
    return {
      className: 'built_in',
      begin: /{/,
      starts: {
        endsParent: true,
        contains: [
          {
            className: innerName,
            end: /(?=})/,
            endsParent:true,
            contains: [
              {
                begin: /\{/,
                end: /\}/,
                contains: ["self"]
              }
            ],
            // starts: {
            //   endsParent: true,
            //   contains: [{
            //     end: /}/,
            //     className : "built_in",
            //     endsParent: true
            //   }
            // ],
            // }
          }
        ]
      }
    }
  };
  var VERBATIM = {
    variants: [
      ...['verb', 'lstinline'].map(csname => CSNAME(csname, {contains: [VERBATIM_DELIMITED_EQUAL()]})),
      CSNAME('mint', ARGUMENT_AND_THEN(ARGUMENT_M, {contains: [VERBATIM_DELIMITED_EQUAL()]})),
      CSNAME('mintinline', ARGUMENT_AND_THEN(ARGUMENT_M, {contains: [VERBATIM_DELIMITED_BRACES(), VERBATIM_DELIMITED_EQUAL()]})),
      CSNAME('url', {contains: [VERBATIM_DELIMITED_BRACES("link"), VERBATIM_DELIMITED_BRACES("link")]}),
      CSNAME('hyperref', {contains: [VERBATIM_DELIMITED_BRACES("link")]}),
      CSNAME('href', ARGUMENT_AND_THEN(ARGUMENT_O, {contains: [VERBATIM_DELIMITED_BRACES("link")]})),
      ...[].concat(...['', '\\*'].map(suffix => [
        BEGIN_ENV('verbatim' + suffix, VERBATIM_DELIMITED_ENV('verbatim' + suffix)),
        BEGIN_ENV('filecontents' + suffix,  ARGUMENT_AND_THEN(ARGUMENT_M, VERBATIM_DELIMITED_ENV('filecontents' + suffix))),
        ...['', 'B', 'L'].map(prefix =>
          BEGIN_ENV(prefix + 'Verbatim' + suffix, ARGUMENT_AND_THEN(ARGUMENT_O, VERBATIM_DELIMITED_ENV(prefix + 'Verbatim' + suffix)))
        )
      ])),
      BEGIN_ENV('minted', ARGUMENT_AND_THEN(ARGUMENT_O, ARGUMENT_AND_THEN(ARGUMENT_M, VERBATIM_DELIMITED_ENV('minted')))),
    ]
  };
  var EVERYTHING = [VERBATIM, ...EVERYTHING_BUT_VERBATIM];
  return {
    name: 'LaTeX',
    aliases: ['TeX'],
    contains: EVERYTHING
  };
}
