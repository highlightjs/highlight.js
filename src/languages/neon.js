/*
Language: NEON
Author: Dan Kadera <me@subsonic.cz>
Description: NEON (Nette Object Notation)
Category: config
*/
function(hljs) {
  
  var literal = {
    className: 'literal',
    variants: [
      {beginKeywords: 'on On ON off Off OFF', relevance: 2},
      {beginKeywords: 'yes Yes YES no No NO', relevance: 1},
      {beginKeywords: 'true True TRUE false False FALSE null Null NULL', relevance: 0}
    ]
  };

  var variable = {
    className: 'subst',
    begin: '%[\\w.-]*%'
  };

  var string = {
    className: 'string',
    variants: [
      {begin: '\'\'\'\\n', end: '^[ \\t]*\'\'\'', relevance: 10},
      {begin: '"""\\n', end: '^[ \\t]*"""', relevance: 10},
      {begin: "'", end: "'(?=[ \\t]*(?:,|$))", illegal: '\\n', relevance: 0},
      {begin: '"', end: '"(?=[ \\t]*(?:,|$))', relevance: 0, contains: [{begin: '\\\\.'}, variable]}
    ],
    contains: [variable]
  };

  var number = {
    className: 'number',
    variants: [
      {begin: '0x[0-9a-fA-F]+(?=[ \\t]*$)', relevance: 0},
      {begin: '0o[0-7]+(?=[ \\t]*$)'},
      {begin: '0b[0-1]+(?=[ \\t]*$)', relevance: 0},
      {begin: '(?=[\\d.])(?:\\d|[1-9]\\d*)?(?:\\.\\d+)?(?=[ \\t]*$)', relevance: 0}
    ]
  };

  var stringLiteral = {
    className: 'string',
    begin: '(?:[^#"\',:=[\\]{}()\x00-\x20!`-]|[:-][^"\',\\]})\\s])(?:[^,:=\\]})(\x00-\x20]+|:(?![\\s,\\]})]|$)|[ \\t]+[^#,:=\\]})(\x00-\x20])*',
    relevance: 0
  };

  var types = [
    string,
    number,
    literal,
    variable,
    stringLiteral,
  ];

  var valueContainer = {
    end: '[ \\t]*[,\\n][ \\t]*',
    excludeEnd: true,
    endsWithParent: true,
    contains: types,
    relevance: 0,
    illegal: '\\S'
  };

  var comment = {
    className: 'comment',
    begin: '#.*',
    relevance: 0
  };

  var key = {
    className: 'attr',
    variants: [
      {begin: '[^\\s,:=[\\]{}()-]+(?:[ \\t]+[^\\s,:=[\\]{}()-]+)+'},
      {begin: '[^\\s,:=[\\]{}()-]+', relevance: 0}
    ]
  };

  var keyValuePair = {
    begin: '(?<=(?:^|[,{(-])[ \\t]*)[^\\s,:=[\\]{}()-]+(?:[ \\t]+[^\\s,:=[\\]{}()-]+)*(?=[ \\t]*[:=]|[ \\t]*$(?![\\s\\S]))',
    returnBegin: true,
    contains: [
      key,
      {begin: ':[ \\t]*\\n', endsParent: true},
      hljs.inherit(valueContainer, {
        begin: '[ \\t]*[:=][ \\t]*',
        endsParent: true
      })
    ],
    illegal: '\\S'
  };

  var bullet = {
    begin: '[ \\t]*-[ \\t]*',
    contains: [
      hljs.inherit(keyValuePair, { endsParent: true }),
      {begin: '\\n', endsParent: true},
      hljs.inherit(valueContainer)
    ],
    relevance: 0,
    illegal: '\\S'
  };

  var inlineMap = {
    begin: '[ \\t*]*{[ \\t]*',
    end: '[ \\t]*}[ \\t]*',
    contains: [keyValuePair],
    illegal: '\\S'
  };

  var inlineArray = {
    begin: '[ \\t]*\\[[ \\t]*',
    end: '[ \\t]*][ \\t]*',
    contains: [
      hljs.inherit(valueContainer)
    ],
    illegal: '\\S'
  };

  var entity = {
    begin: '[ \\t]*\\([ \\t]*',
    end: '[ \\t]*\\)[ \\t]*',
    contains: [
      keyValuePair,
      hljs.inherit(valueContainer)
    ],
    relevance: 5,
    illegal: '\\S'
  };

  types.unshift(inlineMap, inlineArray, entity);

  return {
    case_insensitive: false,
    aliases: ['neon', 'NEON'],
    contains: [
      comment,
      bullet,
      keyValuePair
    ],
    illegal: '[,:=[\\]{}()-]'
  };
}
