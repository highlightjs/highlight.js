/*
Language: Brainfuck
Author: Evgeny Stepanischev <imbolk@gmail.com>
Website: https://esolangs.org/wiki/Brainfuck
*/

/** @type LanguageFn */
export default function(hljs) {
  const LITERAL = {
    className: 'literal',
    begin: /[+-]+/
  };
  return {
    name: 'Brainfuck',
    aliases: [ 'bf' ],
    contains: [
      hljs.COMMENT(
        /[^\[\]\.,\+\-<> \r\n]/,
        /[\[\]\.,\+\-<> \r\n]/,
        {
          contains: [
            {
              match: /[ ]+[^\[\]\.,\+\-<> \r\n]/
            }
          ],
          returnEnd: true
        }
      ),
      {
        className: 'title',
        begin: '[\\[\\]]'
      },
      {
        className: 'string',
        begin: '[\\.,]'
      },
      {
        // this mode works as the only real relevance counter
        // it looks ahead to find the start of a run of literals
        // so only the runs are counted as relevant
        begin: /(?=\+\+\+|---)/,
        contains: [ LITERAL ]
      },
      LITERAL
    ]
  };
}
