/*
Language: Systemd
Description: Systemd/XDG Entry Specification file format.
Contributors: Lee Yunjin <gzblues61@daum.net>
Category: common, config
Website: https://www.freedesktop.org/
*/
export default function(hljs) {
  const LITERALS = {
    className: 'literal',
    begin: /\b(true|false|Application|Link|Directory|forking|oneshot|OneShot)\b/,
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
    begin: /^\[(Desktop Entry|Unit|Service|Install|Socket|Mount|Automount|Swap|Path|Timer|Slice|Scope|Manager|connection|ipv4|ipv6|802-3-ethernet|802-11-wireless|802-11-wireless-security|vpn|Journal|Bridge|Desktop Action\s+[A-Za-z0-9_-]+)\]/,
    relevance: 10
  };

  const VALUE_CONTENT_MODE = {
    begin: /(?<==)/,
    end: /$/,
    contains: [
      LITERALS,
      QUOTED_STRING,
      FIELD_CODES,
      COMMENT_MODE
    ],
    relevance: 0
  };

  const KEY_VALUE_PAIR = {
    begin: /^([A-Za-z0-9_-]+(\[[A-Za-z0-9_@.]+\])?)\s*(=)/,
    end: /$/,
    contains: [
      {
        className: 'attribute',
        begin: /^[A-Za-z0-9_-]+(\[[A-Za-z0-9_@.]+\])?/,
        end: /\s*=/,
        excludeEnd: true,
        relevance: 10
      },
      {
        className: 'operator',
        match: /=/,
        relevance: 0
      },
      VALUE_CONTENT_MODE
    ]
  };

  return {
    name: 'Systemd',
    aliases: ['desktop', 'service', 'mount', 'socket', 'timer', 'nmconnection','systemd'],
    case_insensitive: false,
    contains: [
      COMMENT_MODE,
      SECTION_HEADER,
      KEY_VALUE_PAIR
    ]
  };
}
