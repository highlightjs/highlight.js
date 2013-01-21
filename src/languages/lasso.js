/*
Language: Lasso
Author: Eric Knibbe <eric@lassosoft.com>
Description: Lasso is a language and server platform for database-driven web applications. This definition handles Lasso 9 syntax and LassoScript for Lasso 8.6 and earlier.
*/

function(hljs) {
  var LASSO_IDENT_RE = '[a-zA-Z_][a-zA-Z0-9_.]*';
  var LASSO_START = '<\\?(lasso(script)?|=)';
  return {
    case_insensitive: true,
    lexems: LASSO_IDENT_RE,
    keywords: {
      literal:  // omits lt and gt due to conflict with &lt; and &gt;
        'true false none minimal full all infinity nan and or not ' +
        'bw ew cn lte gte eq neq ft rx nrx',
      built_in:
        'array date decimal duration integer map pair string tag xml null ' +
        'local var variable data self inherited global void',
      keyword:
        'namespace_using cache database_names database_schemanames ' +
        'database_tablenames define_tag define_type email_batch ' +
        'encode_set html_comment handle handle_error header if inline ' +
        'iterate ljax_target link link_currentaction link_currentgroup ' +
        'link_currentrecord link_detail link_firstgroup found_count ' +
        'link_firstrecord link_lastgroup link_lastrecord link_nextgroup ' +
        'link_nextrecord link_prevgroup link_prevrecord log loop ' +
        'noprocess output_none portal private protect records referer ' +
        'referrer repeating resultset rows search_args search_arguments ' +
        'select sort_args sort_arguments thread_atomic value_list while ' +
        'abort case else if_empty if_false if_null if_true loop_abort ' +
        'loop_continue loop_count params params_up return return_value ' +
        'run_children soap_definetag soap_lastrequest soap_lastresponse ' +
        'tag_name ascending average by define descending do equals ' +
        'frozen group handle_failure import in into join let match max ' +
        'min on order parent protected provide public require skip ' +
        'split_thread sum take thread to trait type where with yield'
    },
    contains: [
      {
        className: 'preprocessor',
        begin: '\\]|\\?>',
        relevance: 0,
        starts: {
          className: 'markup',
          end: '\\[|' + LASSO_START,
          returnEnd: true
        }
      },
      {
        className: 'preprocessor',
        begin: '\\[noprocess\\]',
        starts: {
          className: 'markup',
          end: '\\[/noprocess\\]',
          returnEnd: true
        }
      },
      {
        className: 'preprocessor',
        begin: '\\[no_square_brackets|\\[/noprocess|' + LASSO_START,
      },
      {
        className: 'preprocessor',
        begin: '\\[',
        relevance: 0
      },
      {
        className: 'shebang',
        begin: '^#!.+lasso9\\b',
        relevance: 10
      },
      hljs.C_LINE_COMMENT_MODE,
      {
        className: 'javadoc',
        begin: '/\\*\\*!', end: '\\*/',
      },
      hljs.C_BLOCK_COMMENT_MODE,
      hljs.C_NUMBER_MODE,
      hljs.inherit(hljs.APOS_STRING_MODE, {illegal: null}),
      hljs.inherit(hljs.QUOTE_STRING_MODE, {illegal: null}),
      {
        className: 'string',
        begin: '`', end: '`'
      },
      {
        className: 'variable',
        begin: '#\\d+|[#$]' + LASSO_IDENT_RE
      },
      {
        className: 'tag',
        begin: '::', end: LASSO_IDENT_RE
      },
      {
        className: 'attribute',
        begin: '\\.\\.\\.|-' + hljs.UNDERSCORE_IDENT_RE
      },
      {
        className: 'class',
        beginWithKeyword: true, end: '\\(|=>',
        keywords: 'define', excludeEnd: true,
        contains: [
          {
            className: 'title',
            begin: hljs.UNDERSCORE_IDENT_RE + '=?'
          }
        ]
      }
    ]
  };
}
