/*
Language: Apache config
Author: Ruslan Keba <rukeba@gmail.com>
Contributors: Ivan Sagalaev <maniac@softwaremaniacs.org>
Website: https://httpd.apache.org
Description: language definition for Apache configuration files (httpd.conf & .htaccess)
Category: config, web
Audit: 2020
*/

/** @type LanguageFn */
export default function(hljs) {
  const NUMBER_REF = {
    className: 'number',
    begin: /[$%]\d+/
  };
  const NUMBER = {
    className: 'number',
    begin: /\b\d+/
  };
  const IP_ADDRESS = {
    className: "number",
    begin: /\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}(:\d{1,5})?/
  };
  const PORT_NUMBER = {
    className: "number",
    begin: /:\d{1,5}/
  };
  return {
    name: 'Apache config',
    aliases: [ 'apacheconf' ],
    case_insensitive: true,
    contains: [
      hljs.HASH_COMMENT_MODE,
      {
        className: 'section',
        begin: /<\/?/,
        end: />/,
        contains: [
          IP_ADDRESS,
          PORT_NUMBER,
          hljs.QUOTE_STRING_MODE
        ]
      },
      {
        className: 'attribute',
        begin: /\w+/,
        starts: {
          end: /$/,
          keywords: { literal: 'on off all deny allow' },
          contains: [
            {
              scope: "punctuation",
              match: /\\\n/
            },
            {
              className: 'meta',
              begin: /\s\[/,
              end: /\]$/
            },
            {
              className: 'variable',
              begin: /[\$%]\{/,
              end: /\}/,
              contains: [
                'self',
                NUMBER_REF
              ]
            },
            IP_ADDRESS,
            NUMBER,
            hljs.QUOTE_STRING_MODE
          ]
        }
      }
    ],
    illegal: /\S/
  };
}
