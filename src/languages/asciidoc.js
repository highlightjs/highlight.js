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

  const HEX_RANGE_RX = /([A-F0-9]{4})(?:-([A-F0-9]{4}))?/g

  /**
   * @param {string} str
   */
  function unpack_hex_range(str) {
    return str.replace(HEX_RANGE_RX, function (_, p1, p2) {
      return `\\u${p1}${p2 ? `-\\u${p2}` : ''}`
    })
  }

  // Unicode property aliases (P_<name> constant is equivalent to \p{<name>})
  const P_L = 'A-Za-z' + (unpack_hex_range('00AA00B500BA00C0-00D600D8-00F600F8-02C102C6-02D102E0-02E402EC02EE0370-037403760377037A-037D037F03860388-038A038C038E-03A103A3-03F503F7-0481048A-052F0531-055605590561-058705D0-05EA05F0-05F20620-064A066E066F0671-06D306D506E506E606EE06EF06FA-06FC06FF07100712-072F074D-07A507B107CA-07EA07F407F507FA0800-0815081A082408280840-085808A0-08B20904-0939093D09500958-09610971-09800985-098C098F09900993-09A809AA-09B009B209B6-09B909BD09CE09DC09DD09DF-09E109F009F10A05-0A0A0A0F0A100A13-0A280A2A-0A300A320A330A350A360A380A390A59-0A5C0A5E0A72-0A740A85-0A8D0A8F-0A910A93-0AA80AAA-0AB00AB20AB30AB5-0AB90ABD0AD00AE00AE10B05-0B0C0B0F0B100B13-0B280B2A-0B300B320B330B35-0B390B3D0B5C0B5D0B5F-0B610B710B830B85-0B8A0B8E-0B900B92-0B950B990B9A0B9C0B9E0B9F0BA30BA40BA8-0BAA0BAE-0BB90BD00C05-0C0C0C0E-0C100C12-0C280C2A-0C390C3D0C580C590C600C610C85-0C8C0C8E-0C900C92-0CA80CAA-0CB30CB5-0CB90CBD0CDE0CE00CE10CF10CF20D05-0D0C0D0E-0D100D12-0D3A0D3D0D4E0D600D610D7A-0D7F0D85-0D960D9A-0DB10DB3-0DBB0DBD0DC0-0DC60E01-0E300E320E330E40-0E460E810E820E840E870E880E8A0E8D0E94-0E970E99-0E9F0EA1-0EA30EA50EA70EAA0EAB0EAD-0EB00EB20EB30EBD0EC0-0EC40EC60EDC-0EDF0F000F40-0F470F49-0F6C0F88-0F8C1000-102A103F1050-1055105A-105D106110651066106E-10701075-1081108E10A0-10C510C710CD10D0-10FA10FC-1248124A-124D1250-12561258125A-125D1260-1288128A-128D1290-12B012B2-12B512B8-12BE12C012C2-12C512C8-12D612D8-13101312-13151318-135A1380-138F13A0-13F41401-166C166F-167F1681-169A16A0-16EA16F1-16F81700-170C170E-17111720-17311740-17511760-176C176E-17701780-17B317D717DC1820-18771880-18A818AA18B0-18F51900-191E1950-196D1970-19741980-19AB19C1-19C71A00-1A161A20-1A541AA71B05-1B331B45-1B4B1B83-1BA01BAE1BAF1BBA-1BE51C00-1C231C4D-1C4F1C5A-1C7D1CE9-1CEC1CEE-1CF11CF51CF61D00-1DBF1E00-1F151F18-1F1D1F20-1F451F48-1F4D1F50-1F571F591F5B1F5D1F5F-1F7D1F80-1FB41FB6-1FBC1FBE1FC2-1FC41FC6-1FCC1FD0-1FD31FD6-1FDB1FE0-1FEC1FF2-1FF41FF6-1FFC2071207F2090-209C21022107210A-211321152119-211D212421262128212A-212D212F-2139213C-213F2145-2149214E218321842C00-2C2E2C30-2C5E2C60-2CE42CEB-2CEE2CF22CF32D00-2D252D272D2D2D30-2D672D6F2D80-2D962DA0-2DA62DA8-2DAE2DB0-2DB62DB8-2DBE2DC0-2DC62DC8-2DCE2DD0-2DD62DD8-2DDE2E2F300530063031-3035303B303C3041-3096309D-309F30A1-30FA30FC-30FF3105-312D3131-318E31A0-31BA31F0-31FF3400-4DB54E00-9FCCA000-A48CA4D0-A4FDA500-A60CA610-A61FA62AA62BA640-A66EA67F-A69DA6A0-A6E5A717-A71FA722-A788A78B-A78EA790-A7ADA7B0A7B1A7F7-A801A803-A805A807-A80AA80C-A822A840-A873A882-A8B3A8F2-A8F7A8FBA90A-A925A930-A946A960-A97CA984-A9B2A9CFA9E0-A9E4A9E6-A9EFA9FA-A9FEAA00-AA28AA40-AA42AA44-AA4BAA60-AA76AA7AAA7E-AAAFAAB1AAB5AAB6AAB9-AABDAAC0AAC2AADB-AADDAAE0-AAEAAAF2-AAF4AB01-AB06AB09-AB0EAB11-AB16AB20-AB26AB28-AB2EAB30-AB5AAB5C-AB5FAB64AB65ABC0-ABE2AC00-D7A3D7B0-D7C6D7CB-D7FBF900-FA6DFA70-FAD9FB00-FB06FB13-FB17FB1DFB1F-FB28FB2A-FB36FB38-FB3CFB3EFB40FB41FB43FB44FB46-FBB1FBD3-FD3DFD50-FD8FFD92-FDC7FDF0-FDFBFE70-FE74FE76-FEFCFF21-FF3AFF41-FF5AFF66-FFBEFFC2-FFC7FFCA-FFCFFFD2-FFD7FFDA-FFDC'))
  const P_Nl = unpack_hex_range('16EE-16F02160-21822185-218830073021-30293038-303AA6E6-A6EF')
  const P_Nd = '0-9' + (unpack_hex_range('0660-066906F0-06F907C0-07C90966-096F09E6-09EF0A66-0A6F0AE6-0AEF0B66-0B6F0BE6-0BEF0C66-0C6F0CE6-0CEF0D66-0D6F0DE6-0DEF0E50-0E590ED0-0ED90F20-0F291040-10491090-109917E0-17E91810-18191946-194F19D0-19D91A80-1A891A90-1A991B50-1B591BB0-1BB91C40-1C491C50-1C59A620-A629A8D0-A8D9A900-A909A9D0-A9D9A9F0-A9F9AA50-AA59ABF0-ABF9FF10-FF19'))
  const P_Pc = unpack_hex_range('005F203F20402054FE33FE34FE4D-FE4FFF3F')

  // Asciidoctor regular expression character classes and groups
  const CC_ALPHA = `${P_L}${P_Nl}` // NOTE Chinese numbers are included in the Alpha properties block
  //const CG_ALPHA = `[${CC_ALPHA}]`
  const CC_ALNUM = `${CC_ALPHA}${P_Nd}`
  //const CG_ALNUM = `[${CC_ALNUM}]`
  const CC_WORD = `${CC_ALNUM}${P_Pc}` // FIXME technically includes M too, but seems superfluous
  const CG_WORD = `[${CC_WORD}]`
  //const CG_BLANK = '[ \\t]' // in AsciiDoc, we only consider space or tab when looking for a blank character
  //const CC_EOL = '(?=\\n|$)' // $ matches end of string (not line) unless multiline flag is set
  //const CG_GRAPH = '[^\s\x00-\x1F\x7F]' // non-blank character (equivalent to [^\p{Z}\p{C}])
  //const CC_ALL = '[\\s\\S]' // matches all characters, including newlines
  const CC_ANY = '[^\\n]' // matches any character, except newlines

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
        begin: `\\*{2}(${CC_ANY}+?)\\*{2}`
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
      // this rule is not 100% compliant with Asciidoctor but we are entering undefined behavior territory...
      {
        begin: /\\\\\*{2}[^\n]*\*{2}/
      },
      {
        begin: /\\\\_{2}[^\n]*_{2}/
      },
      {
        begin: /\\\\`{2}[^\n]*`{2}/
      },
      // constrained preceded by ":", ";", or "}".
      {
        begin: /[:;}][*_`](?!\*)/
      },
      // inline constrained string (single line)
      {
        className: 'strong',
        // must not precede or follow a word character
        begin: `\\B\\*(\\S|\\S${CC_ANY}*?\\S)\\*(?!${CG_WORD})`,
      },
      // inline constrained strong (multi-line)
      {
        className: 'strong',
        // must not precede or follow a word character
        begin: /\B\*(\w\n?)*\*(?!\w)/,
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
