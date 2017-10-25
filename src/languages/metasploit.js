/*
Language: Metasploit Framework Session
Author: Tod Beardsley <tod_beardsley@rapid.com>
Category: common
Description: Metasploit Framework is an open source penetration testing framework, available at https://metasploit.com
*/

function(hljs) {
  return {
    aliases: ['msf'],
    case_insensitive: false,
    keywords: {
      keyword: 'msf|10',
      nomarkup: 'exploit auxiliary post nop encoder' // Helps classification
    },
    contains: [
      {
        className: 'strong',
        begin: '^\\[\\*\\]', end: ' ',
        relevance: 10
      },
      {
        className: 'literal',
        begin: '^\\[\\+\\]', end: ' ',
        relevance: 10
      },
      {
        className: 'number',
        begin: '^\\[[-!]\\]', end: ' ',
        relevance: 10
      },
    ]
  }
}
