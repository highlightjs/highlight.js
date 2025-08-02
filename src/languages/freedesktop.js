/*
Language: FreeDesktop Configs
Description: FreeDesktop Config Specification file format
Contributors: Lee Yunjin <gzblues61@daum.net>
Category: common, config
Website: https://www.freedesktop.org/
*/
export default function(hljs) {
  const FIELD_CODES = {
    className: 'variable',
    begin: /%[a-z]/i,
    relevance: 0
  };

  const STRING = {
    className: 'string',
    begin: /"/,
    end: /"/,
    contains: [ hljs.BACKSLASH_ESCAPE ],
    relevance: 0
  };

  const COMMENT = {
    className: 'comment',
    begin: /[#]/,
    end: /$/,
    relevance: 0
  };

  const SECTION = {
    className: 'section',
    begin: /^\[(Desktop Entry|Unit|Service|Install|Socket|Mount|Automount|Swap|Path|Timer|Slice|Scope|Manager|connection|ipv4|wifi|wifi-security|ipv6|802-3-ethernet|802-11-wireless|802-11-wireless-security|vpn|Journal|Bridge|Desktop Action\s+[A-Za-z0-9_-]+)\]$/,
    relevance: 10
  };

  const KEY_NAME = {
    className: 'attr',
    begin: /^[A-Za-z0-9_-]+(\[[A-Za-z0-9_@.]+\])?/,
    end: /\s*=/,
    excludeEnd: true,
    relevance: 10
  };

  const OPERATOR = {
    className: 'operator',
    match: /=/,
    relevance: 0
  };

  const VALUE = {
    begin: /=\s*/,
    end: /$/,
    excludeBegin: true,
    contains: [
      STRING,
      {
        className: 'literal',
        match: /\b(Application|Link|Directory|forking|oneshot|OneShot|true|false|True|False)\b/,
        relevance: 10
      }
    ]
  };

  const KEY_VALUE = {
    begin: /^([A-Za-z0-9_-]+(\[[A-Za-z0-9_@.]+\])?)\s*=/,
    returnBegin: true,
    contains: [
      KEY_NAME,
      FIELD_CODES,
      OPERATOR,
      VALUE
    ]
  };

  return {
    name: 'FreeDesktop configuration format',
    aliases: ['desktop', 'service', 'mount', 'socket', 'timer', 'nmconnection', 'systemd', 'freedesktop'],
    case_insensitive: false,
    contains: [
      COMMENT,
      SECTION,
      KEY_VALUE
    ]
  };
}

