/*
Language: HAML
Requires: ruby.js
Author: Dan Allen <dan.j.allen@gmail.com>
Website: http://haml.info
Category: template
*/

// TODO support filter tags like :javascript, support inline HTML
export default function(hljs) {
  const regex = hljs.regex;
  const SELECTOR_ID = {
    scope: 'selector-id',
    match: /#[\w-]+/
  };
  const SELECTOR_CLASS = {
    scope: 'selector-class',
    match: /\.[\w-]+/
  };
  const RUBY_HASH_ATTRS = {
    begin: /\{\s*/,
    end: /\s*\}/,
    contains: [
      {
        begin: /:\w+\s*=>/,
        end: /,\s+/,
        returnBegin: true,
        endsWithParent: true,
        contains: [
          {
            scope: 'attr',
            match: /:\w+/
          },
          hljs.APOS_STRING_MODE,
          hljs.QUOTE_STRING_MODE,
          {
            match: /\w+/
          }
        ]
      }
    ]
  };
  const HTML_ATTRS = {
    begin: /\(\s*/,
    end: regex.lookahead(/\s*\)/),
    contains: [
      {
        begin: /\w+\s*=/,
        end: /\s+/,
        returnBegin: true,
        endsWithParent: true,
        contains: [
          {
            scope: 'attr',
            match: /\w+/
          },
          hljs.APOS_STRING_MODE,
          hljs.QUOTE_STRING_MODE,
          {
            match: /\w+/
          }
        ]
      }
    ]
  };

  return {
    name: 'HAML',
    case_insensitive: true,
    contains: [
      {
        className: 'meta',
        begin: '^!!!( (5|1\\.1|Strict|Frameset|Basic|Mobile|RDFa|XML\\b.*))?$',
        relevance: 10
      },
      // FIXME these comments should be allowed to span indented lines
      hljs.COMMENT(
        '^\\s*(!=#|=#|-#|/).*$',
        null,
        { relevance: 0 }
      ),
      {
        begin: '^\\s*(-|=|!=)(?!#)',
        end: /$/,
        subLanguage: 'ruby',
        excludeBegin: true,
        excludeEnd: true
      },
      {
        className: 'tag',
        begin: '^\\s*%',
        contains: [
          {
            className: 'selector-tag',
            begin: '\\w+'
          },
          SELECTOR_ID,
          SELECTOR_CLASS,
          RUBY_HASH_ATTRS,
          HTML_ATTRS
        ]
      },
      {
        scope: 'tag',
        // implicit div: the line starts directly with `.class` or `#id`;
        // `[\w-]` keeps `#{interpolation}` out of this case
        begin: /^\s*(?=[.#][\w-])/,
        contains: [
          SELECTOR_ID,
          SELECTOR_CLASS,
          RUBY_HASH_ATTRS,
          HTML_ATTRS
        ]
      },
      { begin: '^\\s*[=~]\\s*' },
      {
        begin: /#\{/,
        end: /\}/,
        subLanguage: 'ruby',
        excludeBegin: true,
        excludeEnd: true
      }
    ]
  };
}
