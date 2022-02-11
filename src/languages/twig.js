/*
Language: Twig
Requires: xml.js
Author: Luke Holder <lukemh@gmail.com>
Description: Twig is a templating language for PHP
Website: https://twig.symfony.com
Category: template
*/

export default function(hljs) {
  const regex = hljs.regex;
  const FUNCTION_NAMES = [
    "attribute",
    "block",
    "constant",
    "country_timezones",
    "cycle",
    "date",
    "dump",
    "html_classes",
    "include",
    "max",
    "min",
    "parent",
    "random",
    "range",
    "source",
    "template_from_string"
  ];

  const FILTERS = [
    "abs",
    "batch",
    "capitalize",
    "column",
    "convert_encoding",
    "country_name",
    "currency_name",
    "currency_symbol",
    "data_uri",
    "date",
    "date_modify",
    "default",
    "escape",
    "filter",
    "first",
    "format",
    "format_currency",
    "format_date",
    "format_datetime",
    "format_number",
    "format_time",
    "html_to_markdown",
    "inky_to_html",
    "inline_css",
    "join",
    "json_encode",
    "keys",
    "language_name",
    "last",
    "length",
    "locale_name",
    "lower",
    "map",
    "markdown",
    "markdown_to_html",
    "merge",
    "nl2br",
    "number_format",
    "raw",
    "reduce",
    "replace",
    "reverse",
    "round",
    "slice",
    "slug",
    "sort",
    "spaceless",
    "split",
    "striptags",
    "timezone_name",
    "title",
    "trim",
    "u|0",
    "upper",
    "url_encode"
  ];

  let TAG_NAMES = [
    "apply",
    "autoescape",
    "block",
    "cache",
    "deprecated",
    "do",
    "embed",
    "extends",
    "filter",
    "flush",
    "for",
    "from",
    "if",
    "import",
    "include",
    "macro",
    "sandbox",
    "set",
    "use",
    "verbatim",
    "with"
  ];

  TAG_NAMES = TAG_NAMES.concat(TAG_NAMES.map(t => `end${t}`));

  const STRING = {
    scope: 'string',
    variants: [
      {
        begin: /'/,
        end: /'/
      },
      {
        begin: /"/,
        end: /"/
      },
    ]
  };

  const NUMBER = {
    scope: "number",
    match: /\d+/
  };

  const PARAMS = {
    begin: /\(/,
    end: /\)/,
    excludeBegin: true,
    excludeEnd: true,
    contains: [
      STRING,
      NUMBER
    ]
  };


  const FUNCTIONS = {
    beginKeywords: FUNCTION_NAMES.join(" "),
    keywords: { name: FUNCTION_NAMES },
    relevance: 0,
    contains: [ PARAMS ]
  };

  const FILTER = {
    match: /\|(?=[A-Za-z_]+:?)/,
    beginScope: "punctuation",
    relevance: 0,
    contains: [
      {
        match: /[A-Za-z_]+:?/,
        keywords: FILTERS
      },
    ]
  };

  const tagNamed = (tagnames, {relevance}) => {
    return {
      beginScope: {
        1: 'template-tag',
        3: 'name'
      },
      relevance: relevance || 2,
      endScope: 'template-tag',
      begin: [
        /\{%/,
        /\s*/,
        regex.either(...tagnames)
      ],
      end: /%\}/,
      keywords: "in",
      contains: [
        FILTER,
        FUNCTIONS,
        STRING,
        NUMBER
      ]
    };
  };

  const CUSTOM_TAG_RE = /[a-z_]+/;
  const TAG = tagNamed(TAG_NAMES, { relevance: 2 });
  const CUSTOM_TAG = tagNamed([ CUSTOM_TAG_RE ], { relevance: 1 });

  return {
    name: 'Twig',
    aliases: [ 'craftcms' ],
    case_insensitive: true,
    subLanguage: 'xml',
    contains: [
      hljs.COMMENT(/\{#/, /#\}/),
      TAG,
      CUSTOM_TAG,
      {
        className: 'template-variable',
        begin: /\{\{/,
        end: /\}\}/,
        contains: [
          'self',
          FILTER,
          FUNCTIONS,
          STRING,
          NUMBER
        ]
      }
    ]
  };
}
