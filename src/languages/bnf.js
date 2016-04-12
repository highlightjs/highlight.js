/*
 Language: Backus–Naur Form
 Author: Oleg Efimov <efimovov@gmail.com>
 */

function(hljs){
  return {
    contains: [
      // Attribute
      {
        className: 'attr',
        begin: /</,
        end: />/
      },
      // Specific
      {
        begin: /::=/
      },
      {
        className: 'string',
        begin: /'"'/
      },
      // Common
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      hljs.QUOTE_STRING_MODE
    ]
  };
}
