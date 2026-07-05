/*
Language: PHP Template
Requires: xml.js, php.js
Author: Josh Goebel <hello@joshgoebel.com>
Website: https://www.php.net
Description: Use this for HTML (or other markup) with embedded PHP, i.e. code
             that includes the `<?php ... ?>` (or `<?= ... ?>`) tags. For
             plain PHP code without the surrounding tags, use `php` instead.
Category: common
*/

export default function(hljs) {
  return {
    name: "PHP template",
    subLanguage: 'xml',
    contains: [
      {
        begin: /<\?(php|=)?/,
        end: /\?>/,
        subLanguage: 'php',
        contains: [
          // We don't want the php closing tag ?> to close the PHP block when
          // inside any of the following blocks:
          {
            begin: '/\\*',
            end: '\\*/',
            skip: true
          },
          {
            begin: 'b"',
            end: '"',
            skip: true
          },
          {
            begin: 'b\'',
            end: '\'',
            skip: true
          },
          hljs.inherit(hljs.APOS_STRING_MODE, {
            illegal: null,
            className: null,
            contains: null,
            skip: true
          }),
          hljs.inherit(hljs.QUOTE_STRING_MODE, {
            illegal: null,
            className: null,
            contains: null,
            skip: true
          })
        ]
      }
    ]
  };
}
