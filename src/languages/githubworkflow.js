/*
Language: GitHub Workflow
Description: The GitHub Workflow Language
Author: Mark Everitt <mark.s.everitt@gmail.com>
Category: config
*/

function(hljs) {
  return {
    aliases: ['ghwf'],
    keywords: {
      keyword: 'workflow action',
      built_in: 'on resolves runs args needs secret env uses'
    },
    contains: [
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      hljs.HASH_COMMENT_MODE,
      hljs.APOS_STRING_MODE,
      hljs.QUOTE_STRING_MODE,
    ]
  };
}
