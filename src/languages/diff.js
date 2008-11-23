/*

Unified and context diff definition (c) Vasily Polovnyov <vast@whiteants.net>

*/
hljs.LANGUAGES.diff = {
  case_insensitive: true,
  defaultMode: {
    contains: ['chunk', 'header', 'addition', 'deletion', 'change']
  },
  modes: [
    {
      className: 'chunk',
      begin: '^\\@\\@ +\\-\\d+,\\d+ +\\+\\d+,\\d+ +\\@\\@$', end:'^',
      relevance: 10
    },
    {
      className: 'chunk',
      begin: '^\\*\\*\\* +\\d+,\\d+ +\\*\\*\\*\\*$', end: '^',
      relevance: 10
    },
    {
      className: 'chunk',
      begin: '^\\-\\-\\- +\\d+,\\d+ +\\-\\-\\-\\-$', end: '^',
      relevance: 10
    },
    {
      className: 'header',
      begin: 'Index: ', end: '$'
    },
    {
      className: 'header',
      begin: '=====', end: '=====$'
    },
    {
      className: 'header',
      begin: '^\\-\\-\\-', end: '$'
    },
    {
      className: 'header',
      begin: '^\\*{3} ', end: '$'
    },
    {
      className: 'header',
      begin: '^\\+\\+\\+', end: '$'
    },
    {
      className: 'header',
      begin: '\\*{5}', end: '\\*{5}$'
    },
    {
      className: 'addition',
      begin: '^\\+', end: '$'
    },
    {
      className: 'deletion',
      begin: '^\\-', end: '$'
    },
    {
      className: 'change',
      begin: '^\\!', end: '$'
    }
  ]
}
