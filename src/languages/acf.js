/*
Language: ACF
Author: Ole Kristian Ek Hornnes <ole@webapptech.no>
Contributors: 
Category: common
*/

function(hljs) {
  var PARAMS = {
    className: 'params',
    begin: '\\(', end: '\\)'
  };

  var VARIABLE = {
    begin: '\\[a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff]*'
  };
/*  var FMVARIABLE = {
        begin: /\${1,2}[a-zA-Z0-9_]+/
  };*/
  var PREPROCESSOR = {
    className: 'meta', begin: /(package|function)/
  };
  var STRING = {
    className: 'string',
    contains: [hljs.BACKSLASH_ESCAPE, PREPROCESSOR],
    variants: [
      {
        begin: 'b"', end: '"'
      },
      {
        begin: 'b\'', end: '\''
      },
     
      hljs.inherit(hljs.APOS_STRING_MODE, {illegal: null}),
      hljs.inherit(hljs.QUOTE_STRING_MODE, {illegal: null})
    ]
  };
  var FM_STRING = {
    className: 'fmstring',
    contains: [hljs.BACKSLASH_ESCAPE, PREPROCESSOR],
    variants: [
      {
        begin: '@@', end: '@@'
      },
      {
        begin: '@', end: '@'
      },
      hljs.inherit(hljs.APOS_STRING_MODE, {illegal: null}),
      hljs.inherit(hljs.QUOTE_STRING_MODE, {illegal: null})
    ]
  };
  var ACF_KEYWORDS = {
    literal: 'pi e iswindows ismac false true',
    keywords:
      'package function end return for endfor in if endif elseif else then do while endwhile ' +
      'repeat until case endcase default or xor and not ' +
      'throw print functionid set_markdown_css_path set_markdown_html_root ' +
      'int long double float string date time bool timestamp array void',
    built_in:
    'sqrt sin cos tan fact open close read readline write mod floor length left right mid pos ' +
    'between substring substitute round abs eval format valuecount getvalue patterncount sizeof ' +
    'file_exists directory_exists delete_file create_directory list_files delete_directory ' +
    'temporary_directory desktop_directory documents_directory home_directory ' +
    'applicationsupport_directory file_size created_date Modified_date move_file copy_file ' +
    'select_file select_directory save_file_dialogue lower upper from_utf to_utf now usec ' +
    'char ascii explode implode markdown2html mdsnippet regex_match regex_search regex_extract ' +
    'regex_replace sql_query sql_getrow executesql sql_getrowcount sql_getcolumncount sql_close ' +
    'in2cm cm2in chain2m fathom2m furlong2m leage2m lighty2m m2chain m2fathom m2furlong m2leage ' +
    'm2lighty angstrom2m m2angstrom au2m m2au fldr2ml floz2l UKfloz2l gal2l UKgal2l gill2l ' +
    'USdryPk2l pt2l UKpt2l USdryPt2l qt2l UKqt2l USdryQt2l ml2fldr l2floz l2UKfloz l2gal  ' +
    'l2UKgal l2gill l2USdryPk l2pt l2UKpt l2USdryPt l2qt l2UKqt l2USdryQt c2f f2c c2k f2k  ' +
    'k2c k2f amu2g carat2g cental2kg dram2g grain2g hundredwt2kg N2kg oz2g dwt2g lb2kg  ' +
    'quarter2kg stone2kg troyOz2g g2amu g2carat kg2cental g2dram g2grain kg2hundredwt  ' +
    'kg2N g2oz g2dwt kg2lb kg2quarter kg2stone g2troyoz'
  
  };
  var NUMBER = {variants: [hljs.C_NUMBER_MODE]};
  return {
    aliases: ['acf'],
    case_insensitive: true,
    literal: 'pi e iswindows ismac false true',
    keywords: ACF_KEYWORDS,
    contains: [
      hljs.HASH_COMMENT_MODE,
      hljs.COMMENT('//', '$', {contains: [PREPROCESSOR]}),
      hljs.COMMENT(
        '/\\*',
        '\\*/',
        {
          contains: [
            {
              className: 'doctag',
              begin: '@[A-Za-z]+'
            }
          ]
        }
      ),
      {
        className: 'string',
        begin: /<<<['"]?\w+['"]?$/, end: /^\w+;?$/,
        contains: [
          hljs.BACKSLASH_ESCAPE,
          {
            className: 'subst',
            variants: [
              {begin: /\$\w+/},
              {begin: /\{\$/, end: /\}/}
            ]
          }
        ]
      },
      {
        className: 'function',
        beginKeywords: 'function',
        illegal: '[${=\\n]',
        contains: [hljs.UNDERSCORE_TITLE_MODE, PARAMS]
      },
      PREPROCESSOR,
      {
        className: 'keyword', begin: /\$this\b/
      },
      VARIABLE,
     
      {
        className: 'function',
        beginKeywords: 'function', end: /[;{]/, excludeEnd: true,
        illegal: '\\$|\\[|%',
        contains: [
          hljs.UNDERSCORE_TITLE_MODE,
          {
            className: 'params',
            begin: '\\(', end: '\\)',
            contains: [
              'self',
              VARIABLE,
              hljs.C_BLOCK_COMMENT_MODE,
              STRING,
              NUMBER
            ]
          }
        ]
      },
      STRING,
      FM_STRING,
      NUMBER
    ]
  };
}
