/*
Language: LaTeX
Author: Benedikt Wilde <bwilde@posteo.de>
Website: https://www.latex-project.org
Category: markup
*/

export default function(hljs) {
  var KNOWN_CS = new RegExp([
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
  ]
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
    relevance: 0,
    contains: [
      {
        endsParent: true,
        relevance: 10,
        begin: KNOWN_CS
      },
      {
        endsParent: true,
        relevance: 10,
        variants: L3_VARIANTS
      },
      {
        endsParent: true,
        relevance: 10,
        variants: DOUBLE_CARET_VARIANTS
      },
      {
        endsParent: true,
        relevance: 0,
        variants: L2_VARIANTS
      },
    ]
  };
  var ACTIVE_CHAR = {
    className: 'keyword',
    relevance: 0,
    begin: /~|"/
  };
  var MACRO_PARAM = {
    className: 'params',
    relevance: 0,
    begin: /#+\d?/
  };
  var DOUBLE_CARET_CHAR = {
    relevance: 10,
    variants: DOUBLE_CARET_VARIANTS
  };
  var SPECIAL_CATCODE = {
    className: 'built_in',
    relevance: 0,
    begin: /[{}$&^_]/
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
  return {
    name: 'LaTeX',
    aliases: ['TeX'],
    contains: [
      CONTROL_SEQUENCE,
      ACTIVE_CHAR,
      MACRO_PARAM,
      DOUBLE_CARET_CHAR,
      SPECIAL_CATCODE,
      MAGIC_COMMENT,
      COMMENT
    ]
  };
}
