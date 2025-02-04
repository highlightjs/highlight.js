hljs.registerLanguage('ryton', function(hljs) {
  return {
    name: 'Ryton',
    aliases: ['ry', 'ryt'],
    keywords: {
      keyword: 'func pack table parallel infinit try elerr elif else module import trash_cleaner init data struct chain event guard match protect defer lazy void',
      built_in: 'MetaTable Terminal print input this none pylib jvmlib',
      literal: 'true false none',
      type: 'int str float bool list dict tuple',
      operator: ':: -> => |> <=> >> := ?='
    },
    contains: [
      // Комментарии
      hljs.HASH_COMMENT_MODE,
      {
        className: 'comment',
        begin: '//', end: '$'
      },
      // Строки
      hljs.QUOTE_STRING_MODE,
      {
        className: 'string',
        begin: '"""', end: '"""',
        contains: [{ begin: '\\$[NTRVFBBs0]' }]
      },
      // Декораторы
      {
        className: 'meta',
        begin: '@\\w+'
      },
      // Zig блоки
      {
        className: 'meta',
        begin: '#Zig\\(start\\)', end: '#Zig\\(end:.*?\\)',
        contains: [{ begin: '[^]+' }]
      },
      // MetaTable
      {
        className: 'class',
        beginKeywords: 'table', end: '{',
        contains: [hljs.TITLE_MODE]
      },
      // Функции
      {
        className: 'function',
        beginKeywords: 'func', end: '{',
        contains: [
          hljs.TITLE_MODE,
          {
            className: 'params',
            begin: '\\(', end: '\\)',
            contains: [
              hljs.TITLE_MODE,
              {
                className: 'type',
                begin: ':', end: '[ ,\\)]'
              }
            ]
          }
        ]
      },
      // Классы
      {
        className: 'class',
        beginKeywords: 'pack', end: '{',
        contains: [
          hljs.TITLE_MODE,
          {
            className: 'inheritance',
            begin: '::', end: '[ {]'
          }
        ]
      }
    ]
  }
});
