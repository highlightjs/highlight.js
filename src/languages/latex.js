/*
Language: LaTeX
Author: Benedikt Wilde <bwilde@posteo.de>
Website: https://www.latex-project.org
Category: markup
*/

export default function(hljs) {
  return {
    name: 'latex',
    aliases: ['tex'],
    contains: [
      {
        className: 'control_sequence',
        begin: /\\/,
        relevance: 0,
        contains: [
          { // Special control sequences that indicate LaTeX
            endsParent: true,
            relevance: 10,
            begin: new RegExp([
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
            ].map(csname => csname + '(?![a-zA-Z@:_])').join('|'))
          },
          { // Control sequences following the LaTeX3 naming scheme
            endsParent: true,
            relevance: 10,
            variants: [
              {begin: /(?:__)?[a-zA-Z]{2,}_[a-zA-Z_]{2,}:[nNcVvoxefTFpwD]*/}, // functions
              {begin: /[lgc]__?[a-zA-Z]+_[a-zA-Z_]+/},                        // variables
              {begin: /[qs]__?[a-zA-Z_]{2,}/},                    // quarks and scan marks
              {begin: /use(?:_i)?:[nNcVvoxef]*/},
              {begin: /(?:else|fi|or):/},
              {begin: /(?:if|cs|exp):w/},
              {begin: /::[NnpcoefxvV:]/},
              {begin: /::[oefxvV]_unbraced/}
            ]
          },
          { // A specially input character
            endsParent: true,
            relevance: 10,
            variants: [
              {begin: /\^{6}[0-9a-f]{6}/},
              {begin: /\^{5}[0-9a-f]{5}/},
              {begin: /\^{4}[0-9a-f]{4}/},
              {begin: /\^{3}[0-9a-f]{3}/},
              {begin: /\^{2}[0-9a-f]{2}/},
              {begin: /\^{2}[\u0000-\u007f]/}
            ]
          },
          { // Any non-LaTeX3 control sequence
            endsParent: true,
            relevance: 0,
            variants: [
              {begin: /[a-zA-Z@]+/}, // control word
              {begin: /[^a-zA-Z@]?/} // control symbol
            ]
          },
        ],
      },
      {
        className: 'macro_param',
        relevance: 0,
        begin: /#+\d?/
      },
      {
        className: 'char_input',
        relevance: 10,
        variants: [
          {begin: /\^{6}[0-9a-f]{6}/},
          {begin: /\^{5}[0-9a-f]{5}/},
          {begin: /\^{4}[0-9a-f]{4}/},
          {begin: /\^{3}[0-9a-f]{3}/},
          {begin: /\^{2}[0-9a-f]{2}/},
          {begin: /\^{2}[\u0000-\u007f]/}
        ]
      },
      {
        className: 'special_cc',
        relevance: 0,
        begin: /[{}$&^_]/
      },
      hljs.COMMENT(
        '%',
        '$',
        {
          relevance: 0
        }
      )
    ]
  };
}
