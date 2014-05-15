/*
Language: TP
Author: Jay Strybis <jay.strybis@gmail.com>
Description: FANUC TP programming language (TPP).
*/


function(hljs) {
  var TPID = {
    className: 'number',
    begin: '[1-9][0-9]*' /* no leading zeros */
  }
  var TPLABEL = {
    className: 'label',
    begin: ':[^\\]]+'
  }
  var TPDATA = {
    className: 'data',
    begin: '(AR|P|PAYLOAD|PR|R|SR|RSR|LBL|VR|UALM|MESSAGE|UTOOL|UFRAME|TIMER|\
    TIMER_OVERFLOW|JOINT_MAX_SPEED|RESUME_PROG|DIAG_REC)\\[', end: '\\]',
    relevance: 10,
    contains: [
      'self',
      TPID,
      TPLABEL
    ]
  };
  var TPIO = {
    className: 'io',
    begin: '(AI|AO|DI|DO|F|RI|RO|UI|UO|GI|GO|SI|SO)\\[', end: '\\]',
    relevance: 10,
    contains: [
      'self',
      TPID,
      hljs.QUOTE_STRING_MODE, /* for pos section at bottom */
      TPLABEL
    ]
  };

  return {
    keywords: {
      keyword:
        'ABORT ACC ADJUST AND AP_LD BREAK CALL CNT COL CONDITION CONFIG DA DB ' +
        'DIV DETECT ELSE END ENDFOR ERR_NUM ERROR_PROG FINE FOR GP GUARD INC ' +
        'IF JMP LINEAR_MAX_SPEED LOCK MOD MONITOR OFFSET Offset OR OVERRIDE ' +
        'PAUSE PREG PTH RT_LD RUN SELECT SKIP Skip TA TB TO TOOL_OFFSET ' +
        'Tool_Offset UF UT UFRAME_NUM UTOOL_NUM UNLOCK WAIT X Y Z W P R STRLEN ' +
        'SUBSTR FINDSTR VOFFSET',
      constant:
        'ON OFF max_speed LPOS JPOS ENABLE DISABLE START STOP RESET',
    },
    contains: [
      TPDATA,
      TPIO,
      {
        className: 'keyword',
        lexemes: '/[A-Z]+',
        begin: '/(PROG|ATTR|MN|POS|END)\\b'
      },
      {
        /* this is for cases like ,CALL */
        className: 'keyword',
        lexemes: '[A-Z]+',
        begin: '(CALL|RUN|POINT_LOGIC|LBL)\\b'
      },
      {
        /* this is for cases like CNT100 where the default lexemes do not
         * separate the keyword and the number */
        className: 'keyword',
        lexemes: '[A-Z]+',
        begin: '\\b(ACC|CNT|Skip|Offset|PSPD|RT_LD|AP_LD|Tool_Offset)'
      },
      {
        /* to catch numbers that do not have a word boundary on the left */
        className: 'number',
        lexemes: '[0-9]+',
        begin: '\\d+\\b'
      },
      {
        className: 'units',
        lexemes: '[a-z\\/]+',
        begin: '(sec|msec|mm/sec|cm/min|inch/min|deg/sec|mm|in|cm)',
        relevance: 0
      },
      {
        className: 'comment',
        variants: [
          { begin: '//', end: ';', excludeEnd: true },
          { begin: '!', end: ';', excludeEnd: true },
          { begin: '--eg:', end: ';', excludeEnd: true }
        ],
        contains: [hljs.PHRASAL_WORDS_MODE]
      },
      hljs.QUOTE_STRING_MODE,
      {
        className: 'string',
        begin: '\'', end: '\''
      },
      hljs.C_NUMBER_MODE,
      {
        className: 'variable',
        lexemes: '[A-Za-z0-9_$]+',
        begin: '\\$[A-Za-z0-9_]+'
      }
    ]
  };
}
