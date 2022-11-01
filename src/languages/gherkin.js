/*
 Language: Gherkin
 Author: Sam Pikesley (@pikesley) <sam.pikesley@theodi.org>
 Description: Gherkin is the format for cucumber specifications. It is a domain specific language which helps you to describe business behavior without the need to go into detail of implementation.
 Website: https://cucumber.io/docs/gherkin/
 */

const VARIABLE = {
  scope: 'variable',
  begin: /<[^>\s]+>/
};

export default function(hljs) {
  return {
    name: 'Gherkin',
    aliases: [ 'feature' ],
    // No global keywords since they're all situational
    contains: [
      {
        // Eat whitespace at the start of the line
        begin: /^[ \t]+/,
        relevance: 0,
      },
      {
        // "Business Need" and "Ability" are not part of the spec above, but are included in the English "translation"
        // https://cucumber.io/docs/gherkin/languages/#gherkin-dialect-en-content
        begin: [
          /(Feature|Business Need|Ability|Rule|Examples?|Scenario(?:s| Outline| Template)?|Background)/,
          /:/
        ],
        beginScope: {
          1: 'keyword',
          2: 'punctuation',
        },
        end: /$/,
        relevance: 10,
        contains: [ VARIABLE ]
      },
      {
        begin: /(?:Given|When|Then|And|But)\b/,
        beginScope: 'keyword',
        end: /$/,
        contains: [ VARIABLE ]
      },
      {
        begin: /\*(?=[ \t])/,
        relevance: 0,
        beginScope: 'keyword',
        end: /$/,
        contains: [ VARIABLE ]
      },
      {
        scope: 'meta',
        begin: /@[^@\s]+/
      },
      hljs.HASH_COMMENT_MODE,
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
  };
}
