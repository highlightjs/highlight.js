/*
Language: Twig
Requires: xml.js
Author: Luke Holder <lukemh@gmail.com>
Description: Twig is a templating language for PHP
Website: https://twig.symfony.com
Category: template
*/

export default function(hljs) {
  var PARAMS = {
    className: 'params',
    begin: '\\(', end: '\\)'
  };

  var FUNCTION_NAMES = 'attribute block constant country_timezones cycle date dump html_classes include ' +
                  'max min parent random range source template_from_string';

  var FUNCTIONS = {
    beginKeywords: FUNCTION_NAMES,
    keywords: {name: FUNCTION_NAMES},
    relevance: 0,
    contains: [
      PARAMS
    ]
  };

  var FILTER = {
    begin: /\|[A-Za-z_]+:?/,
    keywords:
      'abs batch capitalize column convert_encoding country_name currency_name currency_symbol data_uri date date_modify default ' +
      'escape filter first format format_currency format_date format_datetime format_number format_time html_to_markdown inky_to_html inline_css join json_encode keys language_name last ' +
      'length locale_name lower map markdown markdown_to_html merge nl2br number_format raw reduce replace ' +
      'reverse round slice slug sort spaceless split striptags timezone_name title u|0 trim upper url_encode',
    contains: [
      FUNCTIONS
    ]
  };

  var TAGS = 'apply autoescape block cache deprecated do embed extends filter flush for from ' +
    'if import include macro sandbox set use verbatim with';

  TAGS = TAGS + ' ' + TAGS.split(' ').map(function(t){return 'end' + t}).join(' ');

  return {
    name: 'Twig',
    aliases: ['craftcms'],
    case_insensitive: true,
    subLanguage: 'xml',
    contains: [
      hljs.COMMENT(/\{#/, /#\}/),
      {
        className: 'template-tag',
        begin: /\{%/, end: /%\}/,
        contains: [
          {
            className: 'name',
            begin: /\w+/,
            keywords: TAGS,
            starts: {
              endsWithParent: true,
              contains: [FILTER, FUNCTIONS],
              relevance: 0
            }
          }
        ]
      },
      {
        className: 'template-variable',
        begin: /\{\{/, end: /\}\}/,
        contains: ['self', FILTER, FUNCTIONS]
      }
    ]
  };
}
