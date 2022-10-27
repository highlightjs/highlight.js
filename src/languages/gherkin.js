/*
 Language: Gherkin
 Author: Sam Pikesley (@pikesley) <sam.pikesley@theodi.org>
 Description: Gherkin is the format for cucumber specifications. It is a domain specific language which helps you to describe business behavior without the need to go into detail of implementation.
 Website: https://cucumber.io/docs/gherkin/
 */

export default function() {
  return {
    name: 'Gherkin',
    aliases: [ 'feature' ],
    contains: [
      {
        begin: [
          /^(Feature|Rule|Examples?|Scenario(?:s| Outline| Template)?|Background)/,
          /:/
        ],
        beginScope: {
          1: 'keyword',
          2: 'punctuation',
        },
        end: /$/,
        contains: [
          {
            scope: 'variable',
            begin: /<[^>\s]+>/
          },
        ]
      },
      {
        begin: /^(?:Given|When|Then|And|But)\b/,
        beginScope: 'keyword',
        end: /$/,
        contains: [
          {
            scope: 'variable',
            begin: /<[^>\s]+>/
          },
        ]
      },
      {
        begin: /^\*(?=[ \t])/,
        relevance: 0,
        beginScope: 'keyword',
        end: /$/,
        contains: [
          {
            scope: 'variable',
            begin: /<[^>\s]+>/
          },
        ]
      },
      {
        scope: 'meta',
        begin: '@[^@\\s]+'
      },
      {
        scope: 'comment',
        begin: /^#/,
        end: /$/
      },
      {
        scope: 'string',
        variants: [
          {
            begin: /^"""/,
            end: /"""/
          },
          {
            begin: /^```/,
            end: /```/
          }
        ],
      },
      {
        begin: /^\|.*\|$/,
        scope: 'string'
      },
      {
        begin: /^[ \t]+/,
        relevance: 0,
        contains: [
          {
            begin: [
              /(Feature|Rule|Examples?|Scenario(?:s| Outline| Template)?|Background)/,
              /:/
            ],
            beginScope: {
              1: 'keyword',
              2: 'punctuation',
            },
            end: /$/,
            relevance: 10,
            contains: [
              {
                scope: 'variable',
                begin: /<[^>\s]+>/
              },
            ]
          },
          {
            begin: /(?:Given|When|Then|And|But)\b/,
            beginScope: 'keyword',
            end: /$/,
            contains: [
              {
                scope: 'variable',
                begin: /<[^>\s]+>/
              },
            ]
          },
          {
            begin: /\*(?=[ \t])/,
            relevance: 0,
            beginScope: 'keyword',
            end: /$/,
            contains: [
              {
                scope: 'variable',
                begin: /<[^>\s]+>/
              },
            ]
          },
          {
            scope: 'comment',
            begin: /#/,
            end: /$/
          },
          {
            scope: 'string',
            variants: [
              {
                begin: /"""/,
                end: /"""/
              },
              {
                begin: /```/,
                end: /```/
              }
            ]
          },
          {
            begin: /\|.*\|$/,
            scope: 'string'
          },
        ]
      },
    ]
  };
}
