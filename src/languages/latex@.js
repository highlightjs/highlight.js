/*
Language: LaTeX@
Description: LaTeX with @ considered a letter
Requires: latex.js, latex3@.js
Author: Benedikt Wilde <bwilde@posteo.de>
Website: https://www.latex-project.org
Category: markup
*/

export default function(hljs) {
  return {
    name: 'latex@',
    aliases: ['tex@'],
    contains: [
      {
        className: 'control_sequence',
        begin: /\\/,
        relevance: 0,
        contains: [
          {
            // Special control sequences that indicate LaTeX with @ as letter.
            endsParent: true,
            relevance: 10,
            begin: new RegExp([
              'NeedsTeXFormat',
              'ProvidesPackage',
              'RequirePackage',
              'DeclareOption',
              'ProcessOptions',
              '(?:new|renew|provide)?command',
              '(?:re)newenvironment',
              '(?:New|Renew|Provide|Declare)(?:Expandable)?DocumentCommand',
              '(?:New|Renew|Provide|Declare)DocumentEnvironment',
              'def',
              'let',
              'begin',
              'end',
              'makeatother',
              'ExplSyntaxOn'
            ].map(csname => csname + '(?![a-zA-Z@])').join('|'))
          },
          {
            // A control sequence starting with @.
            endsParent: true,
            relevance: 1,
            begin: /@[a-zA-Z@]+/
          },
          {
            // Any control sequence.
            endsParent: true,
            relevance: 0,
            variants: [
              {begin: /[a-zA-Z@]+/}, // control word
              {begin: /[^a-zA-Z@]?/} // control symbol
            ]
          }
        ],
        starts: { // The control sequence may have changed the category code regime.
          relevance: 0,
          contains: [
            {
              begin: /(?<=\\makeatother)/,
              end: /0^/,
              subLanguage: 'latex'
            },
            {
              begin: /(?<=\\ExplSyntaxOn)/,
              end: /0^/,
              subLanguage: 'latex3@'
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
