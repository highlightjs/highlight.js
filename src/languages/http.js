/*
Language: HTTP
Description: HTTP request and response headers with automatic body highlighting
Author: Ivan Sagalaev <maniac@softwaremaniacs.org>
Category: common, protocols
Website: https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview
*/

import * as regex from '../lib/regex.js';

export default function(hljs) {
  const VERSION = 'HTTP/(2|1\\.[01])';
  const HEADER_NAME = /[A-Za-z][A-Za-z0-9-]*/;
  const HEADERS_AND_BODY = [
    {
      className: 'attribute',
      begin: regex.concat('^', HEADER_NAME, '(?=\\:\\s)'),
      starts: {
        contains: [
          {
            className: "punctuation",
            begin: /: /,
            relevance: 0,
            starts: {
              end: '$',
              relevance: 0
            }
          }
        ]
      }
    },
    {
      begin: '\\n\\n',
      starts: { subLanguage: [], endsWithParent: true }
    }
  ];

  return {
    name: 'HTTP',
    aliases: ['https'],
    illegal: /\S/,
    contains: [
      // response
      {
        begin: '^(?=' + VERSION + " \\d{3})",
        end: /$/,
        contains: [
          {
            className: "meta",
            begin: VERSION
          },
          {
            className: 'number', begin: '\\b\\d{3}\\b'
          }
        ],
        starts: {
          end: /\b\B/,
          illegal: /\S/,
          contains: HEADERS_AND_BODY
        }
      },
      // request
      {
        begin: '(?=^[A-Z]+ (.*?) ' + VERSION + '$)',
        end: /$/,
        contains: [
          {
            className: 'string',
            begin: ' ',
            end: ' ',
            excludeBegin: true,
            excludeEnd: true
          },
          {
            className: "meta",
            begin: VERSION
          },
          {
            className: 'keyword',
            begin: '[A-Z]+'
          }
        ],
        starts: {
          end: /\b\B/,
          illegal: /\S/,
          contains: HEADERS_AND_BODY
        }
      }
    ]
  };
}
