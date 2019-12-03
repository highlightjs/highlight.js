/*
Language: LaTeX
Author: Nathanael Demacon <nathanael.dmc@outlook.fr>
Description: A document preparation system
Website: https://www.latex-project.org/
Category: common, markdown
*/

function(hljs) {
  var LINEJUMP = {
    className: 'built_in',
    begin: /\\\\/
  }

  var KEYWORD = {
    className: 'built_in',
    begin: /\\\w+/,
  }

  return {
    aliases: ['tex'],
    contains: [
      hljs.COMMENT('%', '\n'),
      LINEJUMP,
      KEYWORD,
    ],
  }
}