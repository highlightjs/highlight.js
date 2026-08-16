/*
Language: HAML
Requires: ruby.js
Author: Dan Allen <dan.j.allen@gmail.com>
Website: http://haml.info
Category: template
*/

// TODO support filter tags like :javascript, support inline HTML
export default function(hljs) {
  const SELECTOR_ID = {
    className: 'selector-id',
    begin: '#[\\w-]+'
  };
  const SELECTOR_CLASS = {
    className: 'selector-class',
    begin: '\\.[\\w-]+'
  };
  const RUBY_HASH_ATTRS = {
    begin: /\{\s*/,
    end: /\s*\}/,
    contains: [
      {
        begin: ':\\w+\\s*=>',
        end: ',\\s+',
        returnBegin: true,
        endsWithParent: true,
        contains: [
          {
            className: 'attr',
            begin: ':\\w+'
          },
          hljs.APOS_STRING_MODE,
          hljs.QUOTE_STRING_MODE,
          {
            begin: '\\w+',
            relevance: 0
          }
        ]
      }
    ]
  };
  const HTML_ATTRS = {
    begin: '\\(\\s*',
    end: '\\s*\\)',
    excludeEnd: true,
    contains: [
      {
        begin: '\\w+\\s*=',
        end: '\\s+',
        returnBegin: true,
        endsWithParent: true,
        contains: [
          {
            className: 'attr',
            begin: '\\w+',
            relevance: 0
          },
          hljs.APOS_STRING_MODE,
          hljs.QUOTE_STRING_MODE,
          {
            begin: '\\w+',
            relevance: 0
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
        className: 'tag',
        // implicit div: the line starts directly with `.class` or `#id`;
        // `[\w-]` keeps `#{interpolation}` out of this case
        begin: '^\\s*(?=[.#][\\w-])',
        // relevance 0 everywhere: lines starting with `.foo` / `#foo` are
        // common in other languages (CSS selectors, C preprocessor,
        // assembler directives), so they must not count towards HAML
        relevance: 0,
        contains: [
          hljs.inherit(SELECTOR_ID, { relevance: 0 }),
          hljs.inherit(SELECTOR_CLASS, { relevance: 0 }),
          hljs.inherit(RUBY_HASH_ATTRS, { relevance: 0 }),
          hljs.inherit(HTML_ATTRS, { relevance: 0 })
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
