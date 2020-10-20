/*
Language: LaTeX
Author: Benedikt Wilde <bwilde@posteo.de>
Website: https://www.latex-project.org
Category: markup
*/

import * as regex from '../lib/regex.js';

/** @type LanguageFn */
export default function(hljs) {
  // Chain some modes to be applied consecutively.
  // If modes == [A, [B, C], [D, E, F]], then an outer chain (i.e. any link may
  // be omitted) <A-B-D> will be created, which contains the inner chains (i.e.
  // only trailing links may be omitted) <B-C> and <D-E-F> as subchains.
  // If lookahead is true, the begin value of the first mode in the chain is
  // used as the begin lookahead of the outermost mode of the chain. If
  // lookahead is truthy but not true, it is assumed to be a regex and itself
  // used.
  // Since chaining is realized using the starts field, that field cannot be
  // used by the modes that shall be chained. (Except for the last mode in a
  // subchain, which may use it with care.)
  const MODE_CHAIN = function(modes, lookahead = true) {
    var skeleton = {};
    if (lookahead === true) {
      skeleton = {begin: regex.lookahead(GET_FIRST_BEGIN(modes[0]))};
    } else if (lookahead) {
      skeleton = {begin: regex.lookahead(lookahead)};
    }
    if (Array.isArray(modes)) {
      if (modes.length) {
        return hljs.inherit(
          {
            contains: MODE_SUBCHAIN(modes[0]),
            starts: MODE_CHAIN(modes.slice(1), false)
          },
          skeleton
        );
      } else {
        return {};
      }
    } else {
      return modes;
    }
  }
  const MODE_SUBCHAIN = function(modes) {
    if (Array.isArray(modes)) {
      if (modes.length) {
        return [hljs.inherit(
          {starts: {
            endsParent: true,
            contains: MODE_SUBCHAIN(modes.slice(1))
          }},
          modes[0]
        )];
      } else {
        return [];
      }
    } else {
      return MODE_SUBCHAIN([modes]);
    }
  };
  const GET_FIRST_BEGIN = function(modes) {
    if (Array.isArray(modes)) {
      return GET_FIRST_BEGIN(modes[0]);
    } else {
      return modes.begin;
    }
  };
  // Append a mode to every subchain in the chain.
  // If omit_last is n, it is not appended to the n last subchains in chain.
  // This can be useful for inserting modes only "between" subchains.
  const APPEND_TO_SUBCHAINS = function(chain, appendix, omit_last = 0) {
      if (omit_last == 0) {
        return chain.map(subchain => APPEND_TO_SUBCHAIN(subchain, appendix));
      } else {
        return [
          ...chain.slice(0, -omit_last).map(subchain => APPEND_TO_SUBCHAIN(subchain, appendix)),
          ...chain.slice(-omit_last)
        ];
      }
  };
  const APPEND_TO_SUBCHAIN = function(subchain, appendix) {
    if (Array.isArray(subchain)) {
      return [...subchain, appendix];
    } else {
      return [subchain, appendix];
    }
  };
  // TeX's normal space gobbling behavior: Whitespace containing at most one newline.
  const GOBBLE_SPACES = {
    begin: /[ \t]+(?:\r?\n[ \t]*)?|\r?\n[ \t]*/,
    relevance: 0
  };
  const CSNAME = function(csname, arg_chain, omit_space_gobbling = 1) {
    var chain = [
      {begin: '\\\\' + csname + '(?![a-zA-Z@:_])', className: 'keyword'},
      ...arg_chain
    ];
    if (omit_space_gobbling === true) {
      return MODE_CHAIN(chain);
    } else {
      if (omit_space_gobbling === false) {omit_space_gobbling = 0;}
      return MODE_CHAIN(APPEND_TO_SUBCHAINS(chain, GOBBLE_SPACES, omit_space_gobbling));
    }
  };
  const BEGIN_ENV = function(envname, arg_chain, omit_space_gobbling = 1) {
    var tail = [
      [{begin: /\{/}, {begin: envname}, {begin: /\}/}],
      ...arg_chain
    ];
    if (omit_space_gobbling !== true) {
      if (omit_space_gobbling === false) {omit_space_gobbling = 0;}
      tail = APPEND_TO_SUBCHAINS(tail, GOBBLE_SPACES, omit_space_gobbling);
    }
    return MODE_CHAIN(
      [
        [{begin: /\\begin/, className: 'keyword'}, GOBBLE_SPACES],
        ...tail
      ],
      '\\\\begin[ \t]*(?:\\r?\\n)?[ \t]*\\{' + envname + '\\}'
    );
  };
  const KNOWN_CONTROL_WORDS = regex.either(...[
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
      '(?:label|(?:eq|page|name)?ref|(?:paren|foot|super)?cite)',
      '(?:alpha|beta|[Gg]amma|[Dd]elta|(?:var)?epsilon|zeta|eta|[Tt]heta|vartheta)',
      '(?:iota|(?:var)?kappa|[Ll]ambda|mu|nu|[Xx]i|[Pp]i|varpi|(?:var)rho)',
      '(?:[Ss]igma|varsigma|tau|[Uu]psilon|[Pp]hi|varphi|chi|[Pp]si|[Oo]mega)',
      '(?:frac|sum|prod|lim|infty|times|sqrt|leq|geq|left|right|middle|[bB]igg?)',
      '(?:[lr]angle|q?quad|[lcvdi]?dots|d?dot|hat|tilde|bar)'
    ].map(word => word + '(?![a-zA-Z@:_])'));
  const L3_REGEX = new RegExp([
      // A function \module_function_name:signature or \__module_function_name:signature,
      // where both module and function_name need at least two characters and
      // function_name may contain single underscores.
      '(?:__)?[a-zA-Z]{2,}_[a-zA-Z](?:_?[a-zA-Z])+:[a-zA-Z]*',
      // A variable \scope_module_and_name_type or \scope__module_ane_name_type,
      // where scope is one of l, g or c, type needs at least two characters
      // and module_and_name may contain single underscores.
      '[lgc]__?[a-zA-Z](?:_?[a-zA-Z])*_[a-zA-Z]{2,}',
      // A quark \q_the_name or \q__the_name or
      // scan mark \s_the_name or \s__vthe_name,
      // where variable_name needs at least two characters and
      // may contain single underscores.
      '[qs]__?[a-zA-Z](?:_?[a-zA-Z])+',
      // Other LaTeX3 macro names that are not covered by the three rules above.
      'use(?:_i)?:[a-zA-Z]*',
      '(?:else|fi|or):',
      '(?:if|cs|exp):w',
      '(?:hbox|vbox):n',
      '::[a-zA-Z]_unbraced',
      '::[a-zA-Z:]'
    ].map(pattern => pattern + '(?![a-zA-Z:_])').join('|'));
  const L2_VARIANTS = [
    {begin: /[a-zA-Z@]+/}, // control word
    {begin: /[^a-zA-Z@]?/} // control symbol
  ];
  const DOUBLE_CARET_VARIANTS = [
    {begin: /\^{6}[0-9a-f]{6}/},
    {begin: /\^{5}[0-9a-f]{5}/},
    {begin: /\^{4}[0-9a-f]{4}/},
    {begin: /\^{3}[0-9a-f]{3}/},
    {begin: /\^{2}[0-9a-f]{2}/},
    {begin: /\^{2}[\u0000-\u007f]/}
  ];
  const CONTROL_SEQUENCE = {
    className: 'keyword',
    begin: /\\/,
    relevance: 0,
    contains: [
      {
        endsParent: true,
        begin: KNOWN_CONTROL_WORDS
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
  const MACRO_PARAM = {
    className: 'params',
    relevance: 0,
    begin: /#+\d?/
  };
  const DOUBLE_CARET_CHAR = {
    // relevance: 1
    variants: DOUBLE_CARET_VARIANTS
  };
  const SPECIAL_CATCODE = {
    className: 'built_in',
    relevance: 0,
    begin: /[$&^_]/
  };
  const MAGIC_COMMENT = {
    className: 'meta',
    begin: '% !TeX',
    end: '$',
    relevance: 10
  };
  const COMMENT = hljs.COMMENT(
    '%',
    '$',
    {
      relevance: 0
    }
  );
  const EVERYTHING_BUT_VERBATIM = [
    CONTROL_SEQUENCE,
    MACRO_PARAM,
    DOUBLE_CARET_CHAR,
    SPECIAL_CATCODE,
    MAGIC_COMMENT,
    COMMENT
  ];
  const BRACE_GROUP_NO_VERBATIM = {
    begin: /\{/, end: /\}/,
    relevance: 0,
    contains: ['self', ...EVERYTHING_BUT_VERBATIM]
  };
  const ARG_M = {
    begin: /\{/, end: /\}/,
    relevance: 0,
    contains: [BRACE_GROUP_NO_VERBATIM, ...EVERYTHING_BUT_VERBATIM]
  };
  const ARG_O = {
    begin: /\[/, end: /\]/,
    relevance: 0,
    contains: [BRACE_GROUP_NO_VERBATIM, ...EVERYTHING_BUT_VERBATIM]
  };
  const VERBATIM_DELIMITED_EQUAL = (innerName = 'string') => {
    return hljs.END_SAME_AS_BEGIN({
      className: innerName,
      begin: /(.|\r?\n)/,
      end: /(.|\r?\n)/,
      excludeBegin: true,
      excludeEnd: true,
      endsParent: true
    });
  };
  const VERBATIM_DELIMITED_BRACES = (innerName = 'string') => {
    return {
      begin: /\{/,
      relevance: 0,
      starts: {
        endsParent: true,
        relevance: 0,
        contains: [
          {
            className: innerName,
            end: /(?=\})/,
            relevance: 0,
            endsParent: true,
            contains: [
              {
                begin: /\{/,
                end: /\}/,
                relevance: 0,
                contains: ['self']
              }
            ],
          }
        ]
      }
    };
  };
  const GOBBLE_SPACES_NO_NEWLINE = {
    begin: /[ \t]+/,
    relevance: 0
  };
  const GOBBLE_NEWLINE = {
    begin: /\r?\n/,
    relevance: 0
  };
  const VERBATIM_DELIMITED_ENV = function(envname) {
    return {
      className: 'string',
      relevance: 0,
      end: '(?=\\\\end\\{' + envname + '\\})'
    };
  };
  const VERBATIM = [
    ...['verb', 'lstinline'].map(csname => CSNAME(csname, [GOBBLE_SPACES_NO_NEWLINE, VERBATIM_DELIMITED_EQUAL()], true)),
    CSNAME('mint', [GOBBLE_SPACES, ARG_M, GOBBLE_NEWLINE, VERBATIM_DELIMITED_EQUAL()], true),
    CSNAME('mintinline', [GOBBLE_SPACES, ARG_M, GOBBLE_NEWLINE, {variants: [VERBATIM_DELIMITED_BRACES(), VERBATIM_DELIMITED_EQUAL()]}], true),
    CSNAME('url', [{variants: [VERBATIM_DELIMITED_BRACES('link'), VERBATIM_DELIMITED_EQUAL('link')]}]),
    CSNAME('hyperref', [VERBATIM_DELIMITED_BRACES('link')]),
    CSNAME('href', [ARG_O, VERBATIM_DELIMITED_BRACES('link')]),
    ...[].concat(...['', '\\*'].map(suffix => [
      BEGIN_ENV('verbatim' + suffix, [VERBATIM_DELIMITED_ENV('verbatim' + suffix)], 2),
      BEGIN_ENV('filecontents' + suffix, [ARG_M, VERBATIM_DELIMITED_ENV('filecontents' + suffix)], 2),
      ...['', 'B', 'L'].map(prefix =>
        BEGIN_ENV(prefix + 'Verbatim' + suffix, [ARG_O, VERBATIM_DELIMITED_ENV(prefix + 'Verbatim' + suffix)], 2)
      )
    ])),
    BEGIN_ENV('minted', [ARG_O, ARG_M, VERBATIM_DELIMITED_ENV('minted')], 2)
  ];

  return {
    name: 'LaTeX',
    aliases: ['TeX'],
    contains: [
      ...VERBATIM,
      ...EVERYTHING_BUT_VERBATIM
    ]
  };
}
