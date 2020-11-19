/*
Language: AsciiDoc
Requires: xml.js
Author: Dan Allen <dan.j.allen@gmail.com>
Website: http://asciidoc.org
Description: A semantic, text-based document format that can be exported to HTML, DocBook and other backends.
Category: markup
*/

/** @type LanguageFn */
export default function(hljs) {
  return {
    name: 'AsciiDoc',
    aliases: ['adoc'],
    contains: [
      // block comment
      hljs.COMMENT(
        '^/{4,}\\n',
        '\\n/{4,}$',
        // can also be done as...
        // '^/{4,}$',
        // '^/{4,}$',
        {
          relevance: 10
        }
      ),
      // line comment
      hljs.COMMENT(
        '^//',
        '$',
        {
          relevance: 0
        }
      ),
      // title
      {
        className: 'title',
        begin: '^\\.\\w.*$'
      },
      // example, admonition & sidebar blocks
      {
        begin: '^[=\\*]{4,}\\n',
        end: '\\n^[=\\*]{4,}$',
        relevance: 10
      },
      // headings
      {
        className: 'section',
        relevance: 10,
        variants: [
          {
            begin: '^(={1,6})[ \t].+?([ \t]\\1)?$'
          },
          {
            begin: '^[^\\[\\]\\n]+?\\n[=\\-~\\^\\+]{2,}$'
          }
        ]
      },
      // document attributes
      {
        className: 'meta',
        begin: '^:.+?:',
        end: '\\s',
        excludeEnd: true,
        relevance: 10
      },
      // block attributes
      {
        className: 'meta',
        begin: '^\\[.+?\\]$',
        relevance: 0
      },
      // quoteblocks
      {
        className: 'quote',
        begin: '^_{4,}\\n',
        end: '\\n_{4,}$',
        relevance: 10
      },
      // listing and literal blocks
      {
        className: 'code',
        begin: '^[\\-\\.]{4,}\\n',
        end: '\\n[\\-\\.]{4,}$',
        relevance: 10
      },
      // passthrough blocks
      {
        begin: '^\\+{4,}\\n',
        end: '\\n\\+{4,}$',
        contains: [{
          begin: '<',
          end: '>',
          subLanguage: 'xml',
          relevance: 0
        }],
        relevance: 10
      },
      // lists (can only capture indicators)
      {
        className: 'bullet',
        begin: '^(\\*+|-+|\\.+|[^\\n]+?::)\\s+'
      },
      // admonition
      {
        className: 'symbol',
        begin: '^(NOTE|TIP|IMPORTANT|WARNING|CAUTION):\\s+',
        relevance: 10
      },
      // inline unconstrained strong (single line)
      {
        className: 'strong',
        begin: /\*{2}([^\n]+?)\*{2}/
      },
      // inline unconstrained strong (multi-line)
      {
        className: 'strong',
        begin: /\*{2}(([^*\n\\]|\\[^\n])+\n)+([^*\n\\]|\\[^\n])*\*{2}/,
        relevance: 0
      },
      // escaped constrained formatting marks (i.e., \* \_ or \`)
      {
        begin: /\\[*_`]/
      },
      // escaped unconstrained formatting marks (i.e., \\** \\__ or \\``)
      // must ignore until the next formatting marks
      // this rule might not be 100% compliant with Asciidoctor 2.0 but we are entering undefined behavior territory...
      {
        begin: /\\\\\*{2}[^\n]*?\*{2}/
      },
      {
        begin: /\\\\_{2}[^\n]*_{2}/
      },
      {
        begin: /\\\\`{2}[^\n]*`{2}/
      },
      // constrained formatting mark may not be preceded by ":", ";" or "}".
      // match these so the constrained rule doesn't see them
      {
        begin: /[:;}][*_`](?!\*)/
      },
      // inline constrained string (single line)
      {
        className: 'strong',
        // must not precede or follow a word character
        begin: /\B\*(\S|\S[^\n]*?\S)\*(?!\w)/,
      },
      // inline constrained strong (multi-line)
      {
        className: 'strong',
        // must not precede or follow a word character
        begin: /\*[^\s]([^\n]*\n)+([^\n]+)\*/,
      },
      // TODO emphasis and code should get same treatment as strong!
      // inline unconstrained emphasis
      {
        className: 'emphasis',
        begin: /_{2}/,
        end: /(\n{2}|_{2})/
      },
      // inline emphasis
      {
        className: 'emphasis',
        // must not follow a word character or be followed by a single quote or space
        begin: '\\B\'(?![\'\\s])',
        end: '(\\n{2}|\')',
        // allow escaped single quote followed by word char
        contains: [{
          begin: '\\\\\'\\w',
          relevance: 0
        }],
        relevance: 0
      },
      // inline emphasis (alt)
      {
        className: 'emphasis',
        // must not follow a word character or be followed by an underline or space
        begin: '_(?![_\\s])',
        end: '(\\n{2}|_)',
        relevance: 0
      },
      // inline smart quotes
      {
        className: 'string',
        variants: [
          {
            begin: "``.+?''"
          },
          {
            begin: "`.+?'"
          }
        ]
      },
      // inline unconstrained emphasis
      {
        className: 'code',
        begin: /`{2}/,
        end: /(\n{2}|`{2})/
      },
      // inline code snippets (TODO should get same treatment as strong and emphasis)
      {
        className: 'code',
        begin: '(`.+?`|\\+.+?\\+)',
        relevance: 0
      },
      // indented literal block
      {
        className: 'code',
        begin: '^[ \\t]',
        end: '$',
        relevance: 0
      },
      // horizontal rules
      {
        begin: '^\'{3,}[ \\t]*$',
        relevance: 10
      },
      // images and links
      {
        begin: '(link:)?(http|https|ftp|file|irc|image:?):\\S+?\\[[^[]*?\\]',
        returnBegin: true,
        contains: [
          {
            begin: '(link|image:?):',
            relevance: 0
          },
          {
            className: 'link',
            begin: '\\w',
            end: '[^\\[]+',
            relevance: 0
          },
          {
            className: 'string',
            begin: '\\[',
            end: '\\]',
            excludeBegin: true,
            excludeEnd: true,
            relevance: 0
          }
        ],
        relevance: 10
      }
    ]
  };
}
