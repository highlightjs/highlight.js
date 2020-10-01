/*
Language: AL
Author: Esben Nyhuus Kristoffersen 
Description: Provides highlighting of Microsoft Dynamics 365 Business Central AL language
Website: https://docs.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/devenv-dev-overview
*/

/** @type LanguageFn */
export default function(hljs) {
  var NORMAL_KEYWORDS = [
    'array',
    'asserterror|10',
    'begin',
    'break',
    'case',
    'do',
    'downto',
    'else',
    'end',
    'event',
    'exit',
    'for',
    'foreach',
    'if',
    'in',
    'indataset|10',
    'interface',
    'internal',
    'local|10',
    'of',
    'procedure|10',
    'protected',
    'repeat',
    'runonclient',
    'securityfiltering|10',
    'suppressdispose|10',
    'temporary',
    'then',
    'to',
    'trigger|10',
    'until',
    'var',
    'while',
    'with',
    'withevents|10'
  ];
  var OPERATOR_KEYWORDS = [
    'and',
    'div',
    'mod',
    'not',
    'or',
    'xor'
  ];
  var METADATA_KEYWORDS = [
    'action',
    'actions|10',
    'addafter',
    'addbefore',
    'addfirst',
    'addlast',
    'area|10',
    'assembly',
    'chartpart',
    'column',
    'cuegroup',
    'customizes',
    'dataitem',
    'dataset',
    'elements|10',
    'extends',
    'field',
    'fieldattribute',
    'fieldelement',
    'fieldgroup|10',
    'fieldgroups|10',
    'fields|10',
    'filter',
    'fixed',
    'grid',
    'group',
    'implements',
    'key',
    'keys',
    'label',
    'labels',
    'layout|10',
    'modify',
    'moveafter',
    'movebefore',
    'movefirst',
    'movelast',
    'part',
    'repeater',
    'requestpage|10',
    'schema',
    'separator',
    'systempart',
    'tableelement',
    'textattribute',
    'textelement',
    'type',
    'value',
  ];

  var BUILTIN_TYPES_KEYWORDS = [
    'action',
    'array',
    'automation',
    'biginteger',
    'bigtext',
    'blob',
    'boolean',
    'byte',
    'char',
    'clienttype',
    'code',
    'codeunit',
    'connectiontype',
    'database',
    'dataclassification',
    'datascope',
    'date',
    'dateformula',
    'datetime',
    'decimal',
    'defaultlayout',
    'dialog',
    'dictionary',
    'dotnet',
    'dotnetassembly',
    'dotnettypedeclaration',
    'duration',
    'enum',
    'errorinfo',
    'errortype',
    'executioncontext',
    'executionmode',
    'fieldclass',
    'fieldref',
    'fieldtype',
    'file',
    'filterpagebuilder',
    'guid',
    'httpclient',
    'httpcontent',
    'httpheaders',
    'httprequestmessage',
    'httpresponsemessage',
    'instream',
    'integer',
    'joker',
    'jsonarray',
    'jsonobject',
    'jsontoken',
    'jsonvalue',
    'keyref',
    'list',
    'moduledependencyinfo',
    'moduleinfo',
    'none',
    'notification',
    'notificationscope',
    'objecttype',
    'option',
    'outstream',
    'page',
    'pageresult',
    'query',
    'record',
    'recordid',
    'recordref',
    'report',
    'reportformat',
    'securityfilter',
    'securityfiltering',
    'sessionsettings',
    'table',
    'tableconnectiontype',
    'tablefilter',
    'testaction',
    'testfield',
    'testfilterfield',
    'testpage',
    'testpermissions',
    'testrequestpage',
    'text',
    'textbuilder',
    'textconst',
    'textencoding',
    'time',
    'transactionmodel',
    'transactiontype',
    'variant',
    'verbosity',
    'version',
    'view',
    'views',
    'webserviceactioncontext',
    'webserviceactionresultcode',
    'xmlattribute',
    'xmlattributecollection',
    'xmlcdata',
    'xmlcomment',
    'xmldeclaration',
    'xmldocument',
    'xmldocumenttype',
    'xmlelement',
    'xmlnamespacemanager',
    'xmlnametable',
    'xmlnode',
    'xmlnodelist',
    'xmlport',
    'xmlprocessinginstruction',
    'xmlreadoptions',
    'xmltext',
    'xmlwriteoptions',
  ];
  var OBJECT_WITH_ID_KEYWORDS = [
    'codeunit|10',
    'enum',
    'enumextension|10',
    'page',
    'pageextension|10',
    'profile',
    'query',
    'report',
    'table',
    'tableextension|10',
    'xmlport|10'
  ]
  var OBJECT_WITHOUT_ID_KEYWORDS = [
    'pagecustomization|10',
    'dotnet',
    'controladdin|10',
    'interface',
    'assembly'
  ]

  var OBJECT_KEYWORDS = OBJECT_WITH_ID_KEYWORDS.concat(OBJECT_WITHOUT_ID_KEYWORDS);

  var STRING_MODE = {
    className: 'string',
    begin: '\'',
    end: '\'',
    illegal: '\\n',
  };

  var LITERAL_KEYWORDS = [
    'false', 
    'true'
  ];

  var STRING = {
    variants: [
      STRING_MODE
    ]
  };
  
  var QUOTED_IDENT_RE = '"([^"]|"")*"';
  var IDENT_RE = '(' + hljs.IDENT_RE + '|' + QUOTED_IDENT_RE + ')';

  var COMMENT_MODES = [
    hljs.COMMENT(
      '///',
      '$',
      {
        returnBegin: true,
        contains: [
          {
            className: 'doctag',
            variants: [
              {
                begin: '///', relevance: 0
              }
            ]
          }
        ]
      }
    ),
    hljs.C_LINE_COMMENT_MODE,
    hljs.C_BLOCK_COMMENT_MODE,
  ];

  var QUOTED_IDENTIFIER_GUARD = {
    // excludes quoted identifiers  from keyword processing
    begin: '"',
    end: '"',
    illegal: '\\n',
    relevance: 0
  };

  var OBJECTWITHID = {
    className: 'class',
    begin: '(' + OBJECT_WITH_ID_KEYWORDS.join('|') + ')\\s+(\\d+)\\s+' + IDENT_RE,
    returnBegin: true,
    end: '{',
    contains: [
      { beginKeywords: OBJECT_WITH_ID_KEYWORDS.join(' ') + ' extends implements'},
      hljs.NUMBER_MODE,
      hljs.TITLE_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
    ]
  };

  var OBJECTWITHOUTID = {
    className: 'class',
    begin: '[^:]\\s*(' + OBJECT_WITHOUT_ID_KEYWORDS.join('|') + ')\\s+' + IDENT_RE,
    returnBegin: true,
    end: '{',
    contains: [
      { beginKeywords: OBJECT_WITHOUT_ID_KEYWORDS.join(' ') + ' extends implements'},
      hljs.NUMBER_MODE,
      hljs.TITLE_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
    ]
  };

  var PROCEDURE = {
    className: 'function',
    beginKeywords: 'procedure trigger', returnBegin: true, 
    end: /\(/, excludeEnd: true,
    contains: [
      {
        beginKeywords: 'procedure trigger',
      },
      hljs.TITLE_MODE
    ].concat(COMMENT_MODES)
  };

  // var CHAR_STRING = {
  //   className: 'string', begin: /(#\d+)+/
  // };
  // var DATE = {
  //     className: 'number',
  //     begin: '\\b\\d+(\\.\\d+)?(DT','D','T)',
  //     relevance: 0
  // };

  // var PROCEDURE = {
  //   className: 'function',
  //   beginKeywords: 'procedure', end: /[:;]/,
  //   keywords: 'procedure|10',
  //   contains: [
  //     hljs.TITLE_MODE,
  //     {
  //       className: 'params',
  //       begin: /\(/, end: /\)/,
  //       keywords: KEYWORDS,
  //       contains: [STRING, CHAR_STRING]
  //     }
  //   ].concat(COMMENT_MODES)
  // };

  var KEYWORDS = {
    keyword: NORMAL_KEYWORDS.concat(OBJECT_KEYWORDS).concat(OPERATOR_KEYWORDS).concat(METADATA_KEYWORDS).join(' '),
    built_in: BUILTIN_TYPES_KEYWORDS.join(' '),
    literal: LITERAL_KEYWORDS.join(' ')
  };

  return {
    name: 'AL',
    aliases: ['al'],
    case_insensitive: true,
    keywords: KEYWORDS,
    illegal: /\/\*/,
    contains: [
      hljs.COMMENT(
        '///',
        '$',
        {
          returnBegin: true,
          contains: [
            {
              className: 'doctag',
              variants: [
                {
                  begin: '///', relevance: 0
                }
              ]
            }
          ]
        }
      ),
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      {
        className: 'meta',
        begin: '#', end: '$',
        keywords: {
          'meta-keyword': 'if else elif endif define undef region endregion pragma'
        }
      },
      STRING, 
      QUOTED_IDENTIFIER_GUARD,
      hljs.NUMBER_MODE,
      OBJECTWITHID,
      OBJECTWITHOUTID,
      PROCEDURE,
    ]
  };
}
