/*
Language: FreeDesktop Configs
Description: FreeDesktop Config Specification file format
Category: config
Website: https://www.freedesktop.org/
*/
export default function(hljs) {
  const FIELD_CODES = {
    scope: 'variable',
    match: /%[a-zA-Z]/
  };

  const STRING = {
    scope: 'string',
    begin: /"/,
    end: /"/,
    contains: [ hljs.BACKSLASH_ESCAPE ]
  };

  const COMMENT = {
    scope: 'comment',
    begin: /#/,
    end: /$/
  };

  const SECTION = {
    scope: 'section',
    begin: /^\[(Desktop Entry|Unit|Service|Install|Socket|Mount|Automount|Swap|Path|Timer|Slice|Scope|Manager|connection|ipv4|wifi|wifi-security|ipv6|802-3-ethernet|802-11-wireless|802-11-wireless-security|vpn|Journal|Bridge|Desktop Action\s+[A-Za-z0-9_-]+)\]$/
  };

  const OPERATOR = {
    scope: 'operator',
    match: /=/
  };

  const LITERALS = {
    scope: 'literal',
    match: /\b(Application|Link|Directory|forking|oneshot|OneShot|true|false|True|False)\b/
  };

  const KEY_VALUE = {
    begin: /^[A-Za-z0-9_-]+(\[[A-Za-z0-9_@.]+\])?/m,
    beginScope: 'attr',
    end: /$/,
    contains: [
      OPERATOR,
      STRING,
      LITERALS,
      FIELD_CODES
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

