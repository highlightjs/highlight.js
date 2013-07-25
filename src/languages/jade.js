/*
Language: Jade
Author: Tomas Aparicio <tomas@aparicio.me>
Description: Jade is a high performance template engine heavily influenced by Haml and implemented with JavaScript for node. 
*/

// TODO work in process: detect indentation (comments, multiline), attributes with classes
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
        relevance: 3
      },
      {
        begin: '^\\s*-(?!#)',
        starts: {
          end: '\\n'
        },
        relevance: 0
      },
      {
        className: 'attribute keyword',
        begin: '^[A-Za-z$_][0-9A-Za-z$_]*',
        keywords: {
          keyword: 'mixin include if for while do '
            + 'else break instanceof switch continue typeof'
        },
        end: '[\\s\\n]+'
      },
      {
        className: 'tag',
        begin: '^(?!#)\\s*',
        end: '[\\n]+',
        contains: [
          {
            className: 'value keyword',
            begin: '#{.*}',
            relevance: 1
          },
          {
            className: 'value keyword',
            begin: '{{.*}}',
            relevance: 1
          },
          {
            className: 'value',
            begin: '[#]\\w+',
            end: '[\\s\\n\\(\\.]+',
            excludeEnd: true,
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
            end: '[\\(\\n\\s)]+',
            excludeEnd: true,
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
        className: 'value keyword',
        begin: '#{.*}',
        relevance: 1
      },
      {
        className: 'value keyword',
        begin: '{{.*}}',
        relevance: 1
      }
    ]
  };
}