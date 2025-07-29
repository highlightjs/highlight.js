/*
Language: XDGDesktop
Description: XDG Desktop Entry Specification file format.
Contributors: Lee Yunjin <gzblues61@daum.net>
Category: common, config
Website: https://www.freedesktop.org/wiki/Specifications/desktop-entry-spec/
*/

export default function(hljs) {
  const LITERALS = {
    className: 'literal',
    begin: /\b(true|false|Application|Link|Directory)\b/,
    relevance: 0
  };

  const FIELD_CODES = {
    className: 'variable',
    match: /%[fFuUcCiIkKvV]/
  };

  const QUOTED_STRING = {
    className: 'string',
    begin: /"/,
    end: /"/,
    contains: [ hljs.BACKSLASH_ESCAPE ],
    relevance: 0
  };

  const COMMENT_MODE = {
    className: 'comment',
    begin: /#/,
    end: /$/,
    relevance: 0
  };

  const SECTION_HEADER = {
    className: 'section',
    begin: /^\[(Desktop Entry|Desktop Action\s+[A-Za-z0-9_-]+)\]/,
    relevance: 10
  };

  const KEY_VALUE_PAIR = {
    begin: /^[A-Za-z0-9_-]+(\[[A-Za-z0-9_@.]+\])?\s*=/,
    end: /$/,
    returnBegin: true,
    contains: [
      {
        className: 'attribute',
        begin: /^[A-Za-z0-9_-]+(\[[A-Za-z0-9_@.]+\])?/,
        relevance: 10
      },
      {
        className: 'operator',
        match: /=/,
        relevance: 0
      },
      COMMENT_MODE,
      LITERALS,
      QUOTED_STRING,
      FIELD_CODES,
      {
        className: 'punctuation',
        match: /;/,
        relevance: 0
      }
    ]
  };

  return {
    name: 'Desktop',
    aliases: ['desktop'],
    case_insensitive: false,
    contains: [
      COMMENT_MODE,
      SECTION_HEADER,
      KEY_VALUE_PAIR
    ]
  };
}

