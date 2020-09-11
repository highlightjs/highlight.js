/*
Language: Microsoft Axapta (now Dynamics 365)
Author: Dmitri Roudakov <dmitri@roudakov.ru>
Website: https://dynamics.microsoft.com/en-us/ax-overview/
Category: enterprise
*/

/** @type LanguageFn */
export default function(hljs) {
  return {
    name: 'Dynamics 365',
    keywords: 'false int abstract private char boolean static null if for true ' +
    'while long throw finally protected final return void enum else ' +
    'break new catch byte super case short default double public try this switch ' +
    'continue reverse firstfast firstonly forupdate nofetch sum avg minof maxof count ' +
    'order group by asc desc index hint like display edit client server ttsbegin ' +
    'ttscommit str real date container anytype common div mod ' +
    'next guid int64 utcdatetime class interface implements extends in do print ' +
    'breakpoint retry select delete_from from firstonly1 firstonly10 ' +
    'firstonly100 firstonly1000 forceliterals forcenestedloop forceselectorder ' +
    'forceplaceholders repeatableread optimisticlock pessimisticlock ' +
    'generateonly crosscompany where outer exists notexists join ' +
    'insert_recordset update_recordset setting ttsabort ' +
    'flush changecompany client eventhandler delegate as is byref ' +
    'unchecked validtimestate namespace using const readonly internal var ',
    contains: [
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      hljs.APOS_STRING_MODE,
      hljs.QUOTE_STRING_MODE,
      hljs.C_NUMBER_MODE,
      {
        className: 'meta',
        begin: '#', end: '$'
      },
      {
        className: 'class',
        beginKeywords: 'class interface', end: '{', excludeEnd: true,
        illegal: ':',
        contains: [
          {beginKeywords: 'extends implements'},
          hljs.UNDERSCORE_TITLE_MODE
        ]
      }
    ]
  };
}
