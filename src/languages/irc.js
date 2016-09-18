/*
Language: irc
Authors: Swant <hljs@swant.pw>
Website: https://swant.pw/
Category: misc
*/

function(hljs) {
  return {
  case_insensitive: true,
  aliases: ['irc-logs'],
  contains: [
    {
      className: 'meta',
      begin: '^\\[', end: '\\]'
    },
    {
      className: 'title',
      begin: ' -', end: '- '
    },
    {
      className: 'title',
      begin: '^-', end: '- '
    },
    {
      className: 'built_in',
      begin: ' <', end: '> '
    },
    {
      className: 'built_in',
      begin: '^<', end: '> '
    }
  ]
}
}
