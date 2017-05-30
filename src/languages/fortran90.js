/*
Language: FORTRAN 90
Author: Demitri Muna <demitri.muna@gmail.com>
Description: Language file for FORTRAN 90
*/

function(hljs) {
  var FORTRAN_KEYWORDS = {
    keyword:
      'assign backspace block data call close common continue data dimension ' +
      'do else else if end endfile endif entry equivalence external format ' +
      'function goto if implicit inquire intrinsic open parameter pause print ' +
      'program read return rewind rewrite save stop subroutine then write ' +
      'allocatable allocate case contains cycle deallocate elsewhere exit ' +
      'include interface intent module namelist nullify only operator optional ' +
      'pointer private procedure public recursive result select sequence ' +
      'target use while where',
    built_in: 'integer real double precision complex logical character' + 
      'type enddo'
  };
  return {
    aliases: ["f90", "F90"],
    case_insensitive: true,
    keywords: FORTRAN_KEYWORDS,
    illegal: '</',
    contains: [
      hljs.QUOTE_STRING_MODE,
      {
        className: 'string',
        begin: '\'\\\\?.', end: '\'',
        illegal: '.'
      },
      {
        className: 'number',
        begin: '\\b(\\d+(\\.\\d*)?|\\.\\d+)(u|U|l|L|ul|UL|f|F)'
      },
      {
        className: 'comment',
        begin: /!/, end: /$/,
        relevance: 10
      },
      {
        className: 'built_in',
        begin: /\.[Ee][Qq]/, end: /\./,
        relevance: 10
      },
      {
        className: 'built_in',
        begin: /\.[Aa][Nn][Dd]/, end: /\./,
        relevance: 10
      },
      {
        className: 'built_in',
        begin: /\.[Nn][Oo][Tt]/, end: /\./,
        relevance: 10
      },
      {
        className: 'built_in',
        begin: /\.[Nn][Ee]/, end: /\./,
        relevance: 10
      },
      {
        className: 'built_in',
        begin: /\.[Ll][Tt]/, end: /\./,
        relevance: 10
      },
      {
        className: 'built_in',
        begin: /\.[Gg][Tt]/, end: /\./,
        relevance: 10
      },
      {
        className: 'built_in',
        begin: /\.[Gg][Ee]/, end: /\./,
        relevance: 10
      },
      {
        className: 'built_in',
        begin: /\.[Ll][Ee]/, end: /\./,
        relevance: 10
      },
      {
        className: 'built_in',
        begin: /\.[Tt][Rr][Uu][Ee]/, end: /\./,
        relevance: 10
      },
      {
        className: 'built_in',
        begin: /\.[Ff][Aa][Ll][Ss][Ee]/, end: /\./,
        relevance: 10
      },
      /*
      This seems to hang the browser.
      {
        className: 'built_in',
        begin: /\./, end: /\./,
        contains: [
          {
            literal: 'eq ne lt gt ge le not and or true false'
          }
        ],
        relevance: 10
      },*/
      hljs.C_NUMBER_MODE
    ]
  };
}