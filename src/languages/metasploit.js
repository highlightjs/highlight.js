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
      keyword: 'msf|10 auxiliary|10 encoder exploit|10 nop payload post|5'
    }
    contains: [
      {
        className: 'print_status',
        begin: '^\\[\\*\\]',
	end:   ' ',
        relevance: 10
      }
    ]
  }
}
