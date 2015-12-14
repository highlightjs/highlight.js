/*
Language: Smarty
Requires: xml.js, javascript.js
Author: Arnold Stoba <arnold.stoba@web.de>
Description: Smarty is a templating language for PHP
Category: template
*/

function(hljs) {

  var FUNCTION_NAMES = '$var append assign block call capture config_load counter cycle debug extends eval fetch' +
    'for foreach foreachelse function html_checkboxes html_image html_options html_radios html_select_date' +
    'html_select_time html_table if elseif else include include_php insert idelim mailto math rdelim literal' +
    'nocache php section sectionelse setfilter strip textformat while';

  var MODIFIER = 'capitalize cat count_characters count_paragraphs count_sentences count_words date_format default' +
    'escape from_charset indent lower nl2br regex_replace replace spacity string_format strip strip_tags' +
    'to_charset truncate trim unescape upper wordwrap';

  return {
    case_insensitive: true,
    subLanguage: 'xml',
    contains: [
      hljs.COMMENT(/\{\*/, /\*}/),

      {
        className: 'template-tag',
        begin: /\{/,
        end: /\}/,
        contains: [

          {
            className: 'template-variable',
            begin: /\$[A-z,.0-9]+/
          },

          {
            className: 'name',
            beginKeywords: FUNCTION_NAMES,
            relevance: 0
          },

          {
            className: 'name',
            relevance: 0,
            begin: /\|/,
            beginKeywords: MODIFIER
          },

          {
            className: 'name',
            relevance: 0,
            begin: /.as./
          },

          {
            className: 'tag',
            begin: '<script(?=\\s|>|$)',
            end: '>',
            keywords: {
              name: 'script'
            },
            contains: [{
              className: 'attr',
              begin: '[A-Za-z0-9\\._:-]+',
              relevance: 0
            }],
            starts: {
              end: '\<\/script\>',
              returnEnd: true,
              subLanguage: ['actionscript', 'javascript', 'handlebars', 'xml']
            }
          },

          {
            className: 'attr',
            relevance: 0,
            begin: /(\w+\=)/
          },

          {
            className: 'number',
            relevance: 0,
            begin: /[0-9]+/
          },

          {
            className: 'string',
            relevance: 0,
            variants: [{
              begin: /"/,
            }, 
            {
              begin: /'/,
            }]
          }
        ]
      }

    ]
  }
}
