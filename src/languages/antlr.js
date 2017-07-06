/*
Language: Antlr
Author: Bill Wagner <wiwagn@microsoft.com>
Website: http://thebillwagner.com/
Description: Language definition for grammar described using ANTLR
*/

function(hljs) {
  return {
    keywords: ['parser', 'grammar', 'options'],
    aliases: ['antlr'],
    case_insensitive: false,
    illegal: '<!--|-->|</|::|`|\\s=\\s',
    contains: [
      hljs.C_BLOCK_COMMENT_MODE,
      hljs.C_LINE_COMMENT_MODE,
      hljs.HASH_COMMENT_MODE,
      hljs.APOS_STRING_MODE,
      {
         className: 'title',
         begin: '^' + hljs.UNDERSCORE_IDENT_RE,
         relevance: 0
      },
      {
          begin: ';|\\||:' // relevance booster
      }
    ]
  };
}
