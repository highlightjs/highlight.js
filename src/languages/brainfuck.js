/*
Language: Brainfuck
Author: JCarles Vilaseca <joan.carles.vilaseca@gmail.com>
Description: Brainfuck language. For info about language see http://es.wikipedia.org/wiki/Brainfuck
*/

function(hljs) {
  return {
    defaultMode: {
      keywords: {
        built_in: ', . < > + [ ]'
      },
      contains: [
        {
          className: 'comment', 
          begin: ';',  
          end: '$'
        }
      ]
    }
  };
}
