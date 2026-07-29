/*
Language: FreeDesktop Configs
Description: FreeDesktop Config Specification file format
Category: config
Website: https://www.freedesktop.org/
*/
export default function(hljs) {
  const regex = hljs.regex;

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

  const SECTIONS = [
    'Desktop Entry',
    'Unit',
    'Service',
    'Install',
    'Socket',
    'Mount',
    'Automount',
    'Swap',
    'Path',
    'Timer',
    'Slice',
    'Scope',
    'Manager',
    'connection',
    'ipv4',
    'wifi-security',
    'wifi',
    'ipv6',
    '802-11-wireless-security',
    '802-11-wireless',
    '802-3-ethernet',
    'vpn',
    'Journal',
    'Bridge',
    'Desktop Action\\s+[A-Za-z0-9_-]+'
  ];

  SECTIONS.sort().reverse();

  const SECTION = {
    scope: 'section',
    begin: new RegExp('^\\[(' + SECTIONS.join('|') + ')\\]$')
  };

  const OPERATOR = {
    scope: 'operator',
    match: /=/
  };

  const LITERALS = [
    'Application',
    'Link',
    'Directory',
    'forking',
    'oneshot',
    'OneShot',
    'true',
    'false',
    'True',
    'False'
  ];

  const LITERAL = {
    scope: 'literal',
    match: new RegExp('\\b(' + LITERALS.join('|') + ')\\b')
  };

  const KEY_VALUE = {
    begin: regex.concat(
      /^[A-Za-z0-9_-]+(\[[A-Za-z0-9_@.]+\])?/,
      regex.lookahead(/\s*=/)
    ),
    beginScope: 'attr',
    end: /$/,
    contains: [
      OPERATOR,
      STRING,
      LITERAL,
      FIELD_CODES
    ]
  };

  return {
    name: 'FreeDesktop config',
    aliases: ['desktop', 'systemd'],
    case_insensitive: false,
    contains: [
      COMMENT,
      SECTION,
      KEY_VALUE
    ]
  };
}
