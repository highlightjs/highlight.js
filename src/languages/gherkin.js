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

// Leading indent is part of multi-match (unscoped); Gherkin keywords are line-head only.
// https://cucumber.io/docs/gherkin/reference/
const LINE_START = /^[ \t]*/;

export default function(hljs) {
  const STEP_KEYWORDS = {
    begin: [
      LINE_START,
      /\b(?:Given|When|Then|And|But)\b/
    ],
    beginScope: {
      2: 'keyword'
    },
    end: /$/,
    contains: [
      VARIABLE,
      hljs.QUOTE_STRING_MODE
    ]
  };

  const STAR_STEP = {
    begin: [
      LINE_START,
      /\*(?=[ \t])/
    ],
    beginScope: {
      2: 'keyword'
    },
    end: /$/,
    contains: [
      VARIABLE,
      hljs.QUOTE_STRING_MODE
    ]
  };

  return {
    name: 'Gherkin',
    aliases: [ 'feature' ],
    // No global keywords — they are line-head structural tokens only
    contains: [
      {
        scope: 'comment',
        begin: /^[ \t]*#/,
        end: /$/
      },
      {
        // One or more tags on a line (after optional indent)
        begin: [
          LINE_START,
          /@[^@\s]+(?:[ \t]+@[^@\s]+)*/
        ],
        beginScope: {
          2: 'meta'
        }
      },
      {
        scope: 'string',
        variants: [
          {
            // Optional content type after opener, e.g. """markdown
            // Closer must be alone on the line (indent + delimiter only).
            begin: /^[ \t]*"""\w*/,
            end: /^[ \t]*"""[ \t]*$/
          },
          {
            begin: /^[ \t]*```\w*/,
            end: /^[ \t]*```[ \t]*$/
          }
        ]
      },
      {
        // "Business Need" and "Ability" are English dialect aliases, not primary keywords:
        // https://cucumber.io/docs/gherkin/languages/#gherkin-dialect-en-content
        begin: [
          LINE_START,
          /(Feature|Business Need|Ability|Rule|Examples?|Scenario(?:s| Outline| Template)?|Background)/,
          /:/
        ],
        beginScope: {
          2: 'keyword',
          3: 'punctuation'
        },
        end: /$/,
        contains: [
          VARIABLE,
          hljs.QUOTE_STRING_MODE
        ]
      },
      STEP_KEYWORDS,
      STAR_STEP,
      {
        // Data tables: line-head `| … |` rows (Gherkin secondary keyword)
        begin: /^[ \t]*\|/,
        end: /$/,
        contains: [
          VARIABLE,
          {
            // Text runs between pipes; `<vars>` matched first above
            scope: 'string',
            match: /[^|<\n]+/
          }
        ]
      }
    ]
  };
}
