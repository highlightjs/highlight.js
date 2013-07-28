/*
Language: Chat Logs
Author: Doug Alcorn <dougalcorn@gmail.com>
Description: Chat logs (as formatted by EVE Online)
*/
function(hljs) {
  return {
    contains: [
        {
            className: 'date',
            begin: '^.?﻿\\[ \\d{4}.\\d{2}.\\d{2} \\d{2}:\\d{2}:\\d{2}',
            relevance: 10
        },
        {
            className: 'keyword',
            begin: ' \\] ',
            end: ' \\> '
        }
    ]
  };
}
