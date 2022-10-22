/*
 Language: Gherkin
 Author: Sam Pikesley (@pikesley) <sam.pikesley@theodi.org>
 Description: Gherkin is the format for cucumber specifications. It is a domain specific language which helps you to describe business behavior without the need to go into detail of implementation.
 Website: https://cucumber.io/docs/gherkin/
 */

export default function(hljs) {
  return {
    name: 'Gherkin',
    aliases: [ 'feature' ],
    keywords: {
      // Custom pattern to support keywords with spaces and those ending with a colon
      $pattern: /[A-Z][a-z]+(?: [A-Z][a-z]+)?:?/,
      // Add positive lookbehind to ensure keywords are at the beginning of a line
      // $pattern: /(?<=^[ \t]*)[A-Z][a-z]+(?: [A-Z][a-z]+)?:?/,
      keyword: [
        'Feature:',
        'Rule:',
        'Example:', 'Scenario:',
        'Given', 'When', 'Then', 'And', 'But',
        'Background:',
        'Scenario Outline:', 'Scenario Template:',
        'Examples:', 'Scenarios:'
      ]
    },
    contains: [
      {
        className: 'keyword',
        begin: '\\*',
        relevance: 0
      },
      {
        className: 'meta',
        begin: '@[^@\\s]+'
      },
      {
        begin: '\\|',
        end: '\\|\\w*$',
        contains: [
          {
            className: 'string',
            begin: '[^|]+'
          }
        ]
      },
      {
        className: 'variable',
        begin: /<[^>\s]+>/
      },
      // Comments can only start at the beginning of a line
      hljs.COMMENT(/^[ \t]*#/, /$/),
      // Use positive lookbehind (once available) to exclude leading spaces from comment
      // hljs.COMMENT(/(?<=^[ \t]*)#/, /$/),
      {
        className: 'string',
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
      }
    ]
  };
}
