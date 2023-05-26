/*
Language: Leaf
Author: Samuel Bishop <sambobjr@gmail.com>
Description: A Swift-based templating language created for the Vapor project.
Website: https://docs.vapor.codes/leaf/overview
Category: template
*/

export default function(hljs) {
  return {
    name: 'Leaf',
    contains: [
      {
        className: 'function',
        begin: '#' + '[A-Za-z_0-9]*' + '\\(',
        returnBegin: true,
        contains: [
          {
            className: 'keyword',
            begin: '#'
          },
          {
            className: 'title',
            begin: '[A-Za-z_][A-Za-z_0-9]*'
          },
          {
            className: 'params',
            begin: '\\(',
            end: '\\)\\:?',
            endsParent: true,
            relevance: 7,
            contains: [
              {
                className: 'string',
                begin: '"',
                end: '"'
              },
              {
                className: 'keyword',
                begin: 'true|false|in',
              },
              {
                className: 'variable',
                begin: '[A-Za-z_][A-Za-z_0-9]*'
              },
              {
                className: 'operator',
                begin: '[\\+|\\-|\\*|\\/|\\%|\\=|\\!|\\>|\\<|\\&\\&|\\|\\|]'
              },
            ]
          }
        ]
      },
      {
        className: 'keyword',
        begin: '#' + '[A-Za-z_0-9]*',
        end: '\\s|\\:',
        returnBegin: true,
        excludeEnd: true,
        relevance: 0,
        contains: [
          {
            className: 'keyword',
            begin: '#',
            relevance: 0,
          },
          {
            className: 'title',
            begin: '[A-Za-z_][A-Za-z_0-9]*',
            relevance: 0,
          },
          {
            className: 'params',
            begin: '\\:',
            endsParent: true,
            relevance: 3,
          }
        ]
      },
    ]
  };
}
