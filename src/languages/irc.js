/*
Language: IRC
Author: Nicolas LLOBERA <nllobera@gmail.com>
Description: language definition for IRC commands
*/

function(hljs) {

  return {
    keywords: 'NickServ VERIFY REGISTER GROUP',
    contains: [
      hljs.COMMENT('-!-', '$'),
      {
        className: 'section',
        begin: /\/[a-z]+/
      },
      {
        className: 'variable',
        begin: /#[a-z]+/
      },
    ]
  };

}
