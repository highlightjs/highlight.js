/*
Language: Iptables
Description: Iptables is a firewall program under linux.
Website: https://linux.die.net/man/8/iptables
Author: Dorian CHECCONI <contact@dorianchecconi.fr>
Category: common
*/

export default function(hljs) {
  return {
    name: 'Iptables',
    aliases: ['iptables'],
    case_insensitive: false,
    contains: [
      {
        // Concerns the parameter of the commands
        scope: 'attribute',
        begin: / -[a-z]| --[a-z-]+/
      },
      {
        // Action of commands
        scope: 'type',
        begin: /-[A-Z]/
      },
      {
        // Character strings
        scope: 'string',
        begin: '"', end: '"'
      },
      hljs.HASH_COMMENT_MODE,
      {
        // Address IP
        className: "number",
        begin: /\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}(\/\d{1,2})?/
      },
      {
        // All number
        className: "number",
        begin: /\d+/
      },
      {
        className: 'symbol',
        begin: /:([A-Z-]+)?/
      },
      {
        // Type of traffic
        className: "variable",
        begin: /[A-Z-]{3,}/
      },
    ]
  };
}
