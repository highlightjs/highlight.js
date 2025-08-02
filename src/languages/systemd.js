/*
Language: Systemd
Description: Systemd/XDG Entry Specification file format.
Contributors: Lee Yunjin <gzblues61@daum.net>
Category: common, config
Website: https://www.freedesktop.org/
*/
export default function(hljs) {
  const regex = hljs.regex;

  const FIELD_CODES = {
    className: 'variable',
    match: /%[fFuUcCiIkKvV]/,
    relevance: 0
  };

  const STRINGS = {
    className: 'string',
    contains: [ hljs.BACKSLASH_ESCAPE ],
    variants: [
      { begin: '"', end: '"' }
    ],
    relevance: 0
  };

  const COMMENT = {
    className: 'comment',
    begin: /[#;]/,
    end: /$/,
    relevance: 0
  };

  const BOOL_LITERAL = {
    className: 'literal',
    begin: /\b(true|false|True|False)\b/,
    relevance: 10
  };

  const TYPE_LITERAL = {
    className: 'literal',
    begin: /\b(Application|Link|Directory|forking|oneshot|OneShot)\b/,
    relevance: 10
  };

  const NUMBER = {
    className: 'number',
    relevance: 0,
    variants: [
      { begin: /([+-])?[\d]+(_[\d]+)*/ },
      { begin: hljs.NUMBER_RE }
    ]
  };

  const SECTION = {
    className: 'section',
    begin: /^\[(Desktop Entry|Unit|Service|Install|Socket|Mount|Automount|Swap|Path|Timer|Slice|Scope|Manager|connection|ipv4|ipv6|802-3-ethernet|802-11-wireless|802-11-wireless-security|vpn|Journal|Bridge|Desktop Action\s+[A-Za-z0-9_-]+)\]/,
    end: /\]/,
    relevance: 10
  };

  const BARE_KEY = /[A-Za-z0-9_-]+/;
  const KEY_WITH_INDEX = regex.concat(
    BARE_KEY,
    '(\\[[A-Za-z0-9_@.]+\\])?'
  );

  const KEY_VALUE = {
    begin: regex.concat('^', KEY_WITH_INDEX, '\\s*='),
    returnBegin: true,
    contains: [
      {
        className: 'attr',
        begin: KEY_WITH_INDEX,
        end: /\s*=/,
        excludeEnd: true,
        relevance: 10
      },
      {
        className: 'operator',
        match: /=/,
        relevance: 0
      },
      {
        className: 'literal',
        begin: /\b(Application|Link|Directory|forking|oneshot|OneShot)\b/,
        relevance: 10
      },
      {
        className: 'literal',
        begin: /\b(true|false|True|False)\b/,
        relevance: 10
      },
      STRINGS,
      FIELD_CODES,
      COMMENT
    ]
  };

  return {
    name: 'Systemd/XDG',
    aliases: [ 'desktop', 'service', 'mount', 'socket', 'timer', 'nmconnection', 'systemd' ],
    case_insensitive: false,
    contains: [
      COMMENT,
      SECTION,
      KEY_VALUE
    ]
  };
}

