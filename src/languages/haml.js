/*
Language: Haml
Requires: ruby.js
Author: Dan Allen <dan.j.allen@gmail.com>, Aaron Reisman <aaron@lifeiscontent.net>
Website: http://google.com/profiles/dan.j.allen
Category: template
*/

function(hljs) {
  var HAML_IDENT_RE = '[A-Za-z][0-9A-Za-z_-]*';
  var EXPRESSIONS = [
    {
      className: 'doctype',
      begin: '!!!', end: '$'
    },
    {
      className: 'comment',
      begin: '/', end: '$',
      contains: [hljs.PHRASAL_WORDS_MODE]
    },
    {
      begin: '\\(',
      end: '\\)',
      excludeBegin: true,
      excludeEnd: true,
      className: 'attribute',
      contains: [
        {
          begin: HAML_IDENT_RE,
          end: '=',
          excludeEnd: true,
          className: 'attribute'
        },
        {
          begin: '\'',
          end: '\'',
          excludeBegin: true,
          excludeEnd: true,
          className: 'string'
        }
      ]
    },
    {
      variants: [
        { begin: '^\\s*-|^\\s*=|^\\s*~', end: '$', excludeBegin: true },
        { begin: '#{', end: '}', excludeBegin: true, excludeEnd: true }
      ],
      subLanguage: 'ruby'
    },
    {
      begin: '^\\s*',
      end: '$',
      className: 'tag',
      contains: [
        {
          variants: [
            {
              begin: '%' + HAML_IDENT_RE,
              contains: [
                {
                  variants: [
                    { begin: '#' + HAML_IDENT_RE, },
                    { begin: '\\.' + HAML_IDENT_RE }
                  ],
                  className: 'value'
                }
              ]
            },
            { begin: '#' + HAML_IDENT_RE, },
            { begin: '\\.' + HAML_IDENT_RE }
          ],
          className: 'title'
        },
        {
          begin: '{',
          end: '}',
          excludeBegin: true,
          excludeEnd: true,
          subLanguage: 'ruby'
        }
      ]
    }
  ]

  return {
    aliases: ['haml'],
    contains: EXPRESSIONS
  };
}
