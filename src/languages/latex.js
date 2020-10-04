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
          { // Special control sequences that indicate LaTeX.
            endsParent: true,
            relevance: 10,
            begin: new RegExp([
              'NeedsTeXFormat',
              'Provides(?:Expl)?(?:Package|Class|File)',
              'RequirePackage',
              'GetIdInfo',
              'DeclareOption',
              'ProcessOptions',
              'documentclass',
              'usepackage',
              'input',
              'include',
              '(?:new|renew|provide)?command',
              '(?:re)newenvironment',
              '(?:New|Renew|Provide|Declare)(?:Expandable)?DocumentCommand',
              '(?:New|Renew|Provide|Declare)DocumentEnvironment',
              'def',
              'let',
              'begin',
              'end',
              'part',
              'chapter',
              '(?:sub){0,2}section',
              '(?:sub)?paragraph',
              'caption',
              'label',
              '(?:eq|page|name)?ref',
              'makeat(?:letter|other)',
              'ExplSyntax(?:On|Off)'
            ].map(csname => csname + '(?![a-zA-Z@:_])').join('|'))
          },
          { // Control sequences following the LaTeX3 naming scheme.
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
          { // Any non-LaTeX3 control sequence.
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
