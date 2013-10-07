/*
Language: Gherkin
Author: Sam Pikesley (@pikesley) <sam.pikesley@theodi.org>
Description: Gherkin (Cucumber etc)
*/

function(hljs) {
  return {
      contains: [
        {
          className: 'keyword',
          begin: '^\\s*(But |And |Then |When |Given |\\* |Scenarios|Examples|Scenario Template|Scenario Outline|Scenario|Background|Ability|Business Need|Feature)',
          relevance: 0
        },
        {
          className: 'string',
          begin: '\\|',
          relevance: 0
        },
        hljs.HASH_COMMENT_MODE,
        {
          className: 'string',
          begin: '"""', end: '"""',
          relevance: 10
        },
        hljs.APOS_STRING_MODE,
        hljs.QUOTE_STRING_MODE,
        hljs.C_NUMBER_MODE,
        {
          className: 'annotation', begin: '@[^@\r\n\t ]+'
        }
      ]
  };
}
