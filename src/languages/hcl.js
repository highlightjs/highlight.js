/*
Language: HCL
Author: Brian Hicks <brian@brianthicks.com>
Description: Hashicorp Configuration Language. For info about language see https://github.com/hashicorp/hcl.
Category: config
*/

function(hljs) {
  var PATH = {
    begin: /[A-Z\_\.\-]+\s*:/
  };

  BACKTICK_STRING = {
    className: 'string',
    begin: /[`"]/, end: /[`"]/
  };

  KEYWORD = {
    className: 'keyword',
    begin: /[A-Za-z\_\.\-]+\s*/
  };

  LITERAL = {
    className: 'literal',
    begin: /(true|false|null)/
  };

  SUBST_CONTAINS = [
    hljs.C_NUMBER_MODE,
    LITERAL,
    BACKTICK_STRING
  ];

  return {
    aliases: [
      'tf' // Terraform configuration files
    ],
    contains: [
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      hljs.C_NUMBER_MODE,
      KEYWORD,
      LITERAL,
      {
        className: 'string',
        contains: [
          {
            // HIL blocks, as used in Terraform
            className: 'subst',
            begin: /\$\{/, end: /\}/,
            contains: SUBST_CONTAINS
          },
          {
            // Go template blocks, as used in Converge
            className: 'subst',
            begin: /\{\{/, end: /\}\}/,
            contains: SUBST_CONTAINS
          }
        ],
        variants: [
          { begin: /"/, end: /"/ },
          { begin: "<<EOF", end: "EOF" }
        ]
      }
    ]
  };
}
