/*
Language: LaTeX3
Requires: latex.js, latex3@.js
Author: Benedikt Wilde <bwilde@posteo.de>
Website: https://www.latex-project.org
Category: markup
*/

export default function(hljs) {
  return {
    name: 'latex3',
    aliases: ['expl3'],
    contains: [
      {
        className: 'control_sequence',
        begin: /\\/,
        relevance: 0,
        contains: [
          {
            // Special control sequences that indicate LaTeX3.
            endsParent: true,
            relevance: 10,
            begin: new RegExp([
              '(?:New|Renew|Provide|Declare)(?:Expandable)?DocumentCommand',
              '(?:New|Renew|Provide|Declare)DocumentEnvironment',
              'makeatletter',
              'ExplSyntaxOff'
            ].map(csname => csname + '(?![a-zA-Z:_])').join('|'))
          },
          {
            // Control sequences following the LaTeX3 naming scheme.
            endsParent: true,
            relevance: 10,
            variants: [
              {begin: /(?:__)?[a-zA-Z]+_[a-zA-Z_]+:[nNpTFDwcVvxefo]*/}, // function
              {begin: /[lgc]__?[a-zA-Z]+_[a-zA-Z_]+_[a-zA-Z]+/},        // variable
              {begin: /[lgc]_tmp[a-z]_[a-zA-Z]+/},            // temporary variable
              {begin: /[sq]_[a-zA-Z_]+/}                   // quarks and scan marks
            ]
          },
          {
            // Any control sequence.
            endsParent: true,
            relevance: 0,
            variants: [
              {begin: /[a-zA-Z:_]+/}, // control word
              {begin: /[^a-zA-Z:_]?/} // control symbol
            ]
          },
        ],
        starts: { // The control sequence may have changed the category code regime.
          relevance: 0,
          contains: [
            {
              begin: /(?<=\\makeatletter)/,
              end: /0^/,
              subLanguage: 'latex3@'
            },
            {
              begin: /(?<=\\ExplSyntaxOff)/,
              end: /0^/,
              subLanguage: 'latex'
            }
          ]
        }
      },
      {
        className: 'macro_param',
        relevance: 0,
        begin: /#+\d?/
      },
      {
        className: 'special_cc',
        relevance: 0,
        begin: /[{}$&^]/
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
