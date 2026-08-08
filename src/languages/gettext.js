/*
Language: GNU Gettext
Description: GNU gettext PO and POT translation catalog files
Website: https://www.gnu.org/software/gettext/manual/html_node/PO-Files.html
Category: config
*/

/** @type LanguageFn */
export default function(hljs) {
  const ESCAPE = hljs.inherit(hljs.BACKSLASH_ESCAPE, {
    scope: 'char.escape'
  });

  const FORMAT = {
    scope: 'char.escape',
    variants: [
      { match: /[&_][A-Za-z0-9\u00C0-\uFFFF]/ },
      { match: /<[a-zA-Z="/ ]+>/ },
      { match: /%(?:\([\w\s]*\))?[-+#0 ]*(?:[1-9]\d*|\*)?(?:\.(?:\d+|\*))?[hlL]?[diouxXeEfFgGcrsab%]/ },
      { match: /%(?:%|(?:[1-9]\d*\$)?[#0\- +'I]*(?:\*|[1-9]\d*)?(?:\.(?:\*|\d+)?)?(?:hh|h|ll|l|j|t|z|L)?[diouxXDOUeEfFgGaAcCsSpn])/ }
    ],
    relevance: 0
  };

  const STRING = {
    scope: 'string',
    begin: /"/,
    end: /"/,
    contains: [ ESCAPE, FORMAT ]
  };

  const DIRECTIVE = {
    begin: [
      /^\s*/,
      /domain\b|msgctxt\b|msgid_plural\b|msgid\b|msgstr\b/
    ],
    beginScope: {
      2: 'keyword'
    },
    end: /$/,
    contains: [ STRING ]
  };

  const FORMAT_COMMENT = {
    scope: 'comment',
    begin: /^#,/,
    end: /$/,
    contains: [
      ESCAPE,
      {
        scope: 'doctag',
        match: /\bfuzzy\b/,
        relevance: 0
      }
    ]
  };

  const LOCATION_COMMENT = {
    scope: 'comment',
    begin: /^#:/,
    end: /$/,
    contains: [ ESCAPE ]
  };

  return {
    name: 'GNU Gettext',
    aliases: [ 'po', 'pot' ],
    disableAutodetect: true,
    contains: [
      FORMAT_COMMENT,
      LOCATION_COMMENT,
      hljs.COMMENT(/^#/, /$/),
      DIRECTIVE,
      STRING
    ]
  };
}
