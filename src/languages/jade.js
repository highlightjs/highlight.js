/*
Language: Jade
Author: Tomas Aparicio <tomas@aparicio.me>
Description: Jade is a high performance template engine heavily influenced by Haml and implemented with JavaScript for node. 
*/

// TODO work in process: detect indentation (comments, multiline), support specific keywords
function (hljs) {
  return {
    case_insensitive: true,
    contains: [
      {
        className: 'doctype',
        begin: '^!!!( (5|1\\.1|Strict|Frameset|Basic|Mobile|RDFa|XML\\b.*))?$',
        relevance: 10
      },
      {
        className: 'comment',
        // add identation support
        begin: '^\\s*(//|//-).*$',
        relevance: 0
      },
      {
        begin: '^\\s*-(?!#)',
        starts: {
          end: '\\n'
        },
        relevance: 0
      },
      {
        className: 'tag',
        begin: '^(?!#)\\s*',
        contains: [
          {
            className: 'value',
            begin: '[#]\\w+',
            relevance: 1
          },
          {
            className: 'title',
            begin: '\\w+',
            relevance: 0
          },
          {
            className: 'bullet',
            begin: '[\.]\\w+',
            relevance: 0
          },
          {
            className: 'attribute',
            begin: '\\(\\s*',
            end: '\\s*\\)',
            excludeEnd: true,
            contains: [
              {
                className: 'attribute',
                begin: '\\w+\\s*\.',
                end: '\\s+',
                returnBegin: true,
                endsWithParent: true,
                relevance: 0,
                contains: [
                  {
                    className: 'attribute',
                    begin: '\\w+',
                    relevance: 0
                  },
                  {
                    className: 'string',
                    begin: '"',
                    end: '"',
                    relevance: 0
                  },
                  {
                    className: 'string',
                    begin: '\'',
                    end: '\'',
                    relevance: 0
                  },
                  {
                    begin: '\\w+',
                    relevance: 0
                  }
                ]
              },
            ],
            relevance: 0
          }
        ],
        relevance: 10
      },
      {
        className: 'bullet',
        begin: '^\\s*[=~]\\s*',
        relevance: 0
      },
      {
        className: 'title',
        begin: '#{.*}',
        relevance: 0
      }
    ]
  };
}