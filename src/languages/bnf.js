/*
 Language: Backus–Naur Form
 Author: Oleg Efimov <efimovov@gmail.com>
 */

function(hljs){
  return {
    contains: [
      // Attribute
      {
        className: 'attribute',
        begin: /</,
        end: />/,
        excludeBegin: true,
        excludeEnd: true
      },
      // Specific
      {
        begin: /::=/
      },
      // Common
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      hljs.APOS_STRING_MODE,
      hljs.QUOTE_STRING_MODE
    ]
  };
}
