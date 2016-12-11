module.exports = function(hljs) {

  // https://msdn.microsoft.com/en-us/library/ms714428(v=vs.85).aspx
  var VALID_VERBS =
    'Add|Clear|Close|Copy|Enter|Exit|Find|Format|Get|Hide|Join|Lock|' +
    'Move|New|Open|Optimize|Pop|Push|Redo|Remove|Rename|Reset|Resize|' +
    'Search|Select|Set|Show|Skip|Split|Step|Switch|Undo|Unlock|' +
    'Watch|Backup|Checkpoint|Compare|Compress|Convert|ConvertFrom|' +
    'ConvertTo|Dismount|Edit|Expand|Export|Group|Import|Initialize|' +
    'Limit|Merge|New|Out|Publish|Restore|Save|Sync|Unpublish|Update|' +
    'Approve|Assert|Complete|Confirm|Deny|Disable|Enable|Install|Invoke|Register|' +
    'Request|Restart|Resume|Start|Stop|Submit|Suspend|Uninstall|' +
    'Unregister|Wait|Debug|Measure|Ping|Repair|Resolve|Test|Trace|Connect|' +
    'Disconnect|Read|Receive|Send|Write|Block|Grant|Protect|Revoke|Unblock|' +
    'Unprotect|Use|ForEach|Sort|Tee|Where'

  var KEYWORDS = {
    keyword:
      'if else foreach return do while until elseif begin for trap data dynamicparam ' +
      'end break throw param continue finally in switch exit filter try process catch ' +
      'hidden static',

    name:
      '-ne -eq -lt -gt -ge -le -not -like -notlike -match -notmatch -contains '+
      '-notcontains -in -notin -replace -split -join'
  }

  var BACKTICK_ESCAPE = {
    begin: '`[\\s\\S]',
    relevance: 0
  }
  var VAR = {
    className: 'variable',
    variants: [
      {begin: /\$[\w\d][\w\d_:]*/}
    ]
  }
  var LITERAL = {
    className: 'literal',
    begin: /\$(null|true|false)\b/
  }
  var QUOTE_STRING = {
    className: 'string',
    variants: [
      { begin: /"/, end: /"/ },
      { begin: /@"/, end: /^"@/ }
    ],
    contains: [
      BACKTICK_ESCAPE,
      VAR,
      {
        className: 'variable',
        begin: /\$[A-z]/, end: /[^A-z]/
      }
    ]
  }
  var APOS_STRING = {
    className: 'string',
    variants: [
      { begin: /'/, end: /'/ },
      { begin: /@'/, end: /^'@/ }
    ]
  }

  var PS_HELPTAGS = {
    className: 'doctag',
    variants: [
      /* no paramater help tags */
      { begin: /\.(synopsis|description|example|inputs|outputs|notes|link|component|role|functionality)/ },
      /* one parameter help tags */
      { begin: /\.(parameter|forwardhelptargetname|forwardhelpcategory|remotehelprunspace|externalhelp)\s+\S+/ }
    ]
  }
  var PS_COMMENT = hljs.inherit(
    hljs.COMMENT(null, null),
    {
      variants: [
        /* single-line comment */
        { begin: /#/, end: /$/ },
        /* multi-line comment */
        { begin: /<#/, end: /#>/ }
      ],
      contains: [PS_HELPTAGS]
    }
  )

  var CMDLETS = {
    className: 'built_in',
    variants: [
      { begin: '('.concat( VALID_VERBS, ')+(-)[\\w\\d]+') },
      { className: 'name', begin: /[\w\d]+(-)[\w\d]+/ }
    ]
  }
  var PS_CLASS = {
    className: 'class',
    beginKeywords: 'class enum', end: /[{]/, excludeEnd: true,
    contains: [
      { beginKeywords: ':' },
      hljs.TITLE_MODE
    ]
  }

  var IDENT_RE = '[a-zA-Z-_]\\w*';

  var PS_FUNCTION =  {
    className: 'keyword',
    begin: /function\s/, end: /(\s|[^A-Z0-9-])/,
    excludeEnd: true,
    contains: [
      CMDLETS,
      { className: 'name', begin: /[\w\d]+/ }
    ]
  }

  var PS_USING =  {
    className: 'keyword hljs-strong',
    begin: /using\s/, end: /$/,
    contains: [
      QUOTE_STRING,
      APOS_STRING,
      { className: 'type', begin: /(assembly|command|module|namespace|type)/ },
      { className: 'meta', begin: /\S+/ }
    ]
  }

  var PS_ARGUMENTS =  {
    className: 'literal hljs-strong',
    variants: [
      { begin: '(-)[\\w\\d]+' },
    ]
  }

  return {
    aliases: ['ps'],
    lexemes: /-?[A-z\.\-]+/,
    case_insensitive: true,
    keywords: KEYWORDS,
    contains: [
      CMDLETS,
      BACKTICK_ESCAPE,
      hljs.NUMBER_MODE,
      QUOTE_STRING,
      APOS_STRING,
      LITERAL,
      VAR,
      PS_COMMENT,
      PS_CLASS,
      PS_FUNCTION,
      PS_USING,
      PS_ARGUMENTS

    ]
  }
}
