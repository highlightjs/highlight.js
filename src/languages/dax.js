/*
Language: Data Analysis Expressions (DAX)
Author: Stanislaw Swierc <stanislaw.swierc@gmail.com>
Description: Data Analysis Expressions (DAX) is a library of functions and operators that can be combined to build formulas and expressions in Microsoft SQL Server Analysis Services, Power Pivot in Excel, and Power BI Desktop.
Website: https://msdn.microsoft.com/en-us/library/ee634217.aspx
Category: scientific
*/

function(hljs) {
  var IDENT_RE = '[a-zA-Z][a-zA-Z0-9._]*';

  return {
    case_insensitive: true,
    contains: [
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      {
        begin: IDENT_RE,
        lexemes: IDENT_RE,
        keywords: {
          keyword:
            'ABS ACOS ACOSH ADDCOLUMNS ADDMISSINGITEMS ALL ALLEXCEPT ALLNOBLANKROW ' +
            'ALLSELECTED AND ASIN ASINH ATAN ATANH AVERAGE AVERAGEA AVERAGEX BETA.DIST ' +
            'BETA.INV BLANK CALCULATE CALCULATETABLE CALENDAR CALENDARAUTO CEILING ' +
            'CHISQ.INV CHISQ.INV.RT CLOSINGBALANCEMONTH CLOSINGBALANCEQUARTER ' +
            'CLOSINGBALANCEYEAR CODE COMBIN COMBINA CONCATENATE CONCATENATEX ' +
            'CONFIDENCE.NORM CONFIDENCE.T CONTAINS COS COSH COUNT COUNTA COUNTAX ' +
            'COUNTBLANK COUNTROWS COUNTX CROSSFILTER CURRENCY CUSTOMDATA DATATABLE ' +
            'DATE DATEADD DATEDIFF DATESBETWEEN DATESINPERIOD DATESMTD DATESQTD ' +
            'DATESYTD DATEVALUE DAY DEGREES DISTINCT DISTINCTCOUNT DIVIDE EARLIER ' +
            'EARLIEST EDATE ENDOFMONTH ENDOFQUARTER ENDOFYEAR EOMONTH EVEN EXACT EXCEPT ' +
            'EXP EXPON.DIST FACT FILTER FILTERS FIND FIRSTDATE FIRSTNONBLANK FIXED ' +
            'FLOOR FORMAT GCD GENERATEALL GEOMEAN GEOMEANX GROUPBY HASONEFILTER ' +
            'HASONEVALUE HOUR IF IFERROR INT INTERSECT ISBLANK ISCROSSFILTERED ISEMPTY ' +
            'ISERROR ISEVEN ISFILTERED ISLOGICAL ISNONTEXT ISNUMBER ISO.CEILING ISODD ' +
            'ISONORAFTER ISTEXT KEEPFILTERS LASTDATE LASTNONBLANK LCM LEFT LEN LN LOG ' +
            'LOOKUPVALUE LOWER MAX MAXA MAXX MEDIAN MEDIANX MID MIN MINA MINUTE MINX ' +
            'MOD MONTH MROUND NATURALINNERJOIN NATURALLEFTOUTERJOIN NEXTDAY NEXTMONTH ' +
            'NEXTQUARTER NEXTYEAR NOT NOW ODD OPENINGBALANCEMONTH OPENINGBALANCEQUARTER ' +
            'OPENINGBALANCEYEAR OR PARALLELPERIOD PATH PATHCONTAINS PATHITEM ' +
            'PATHITEMREVERSE PATHLENGTH PERCENTILE.EXC PERCENTILE.INC PERCENTILEX.EXC ' +
            'PERCENTILEX.INC PERMUT PI POISSON.DIST POWER PREVIOUSDAY PREVIOUSMONTH ' +
            'PREVIOUSQUARTER PREVIOUSYEAR PRODUCT PRODUCTX QUOTIENT RADIANS RAND ' +
            'RANDBETWEEN RANKX RELATED RELATEDTABLE REPLACE REPT RIGHT ROUND ROUNDDOWN ' +
            'ROUNDUP ROW SAMEPERIODLASTYEAR SAMPLE SEARCH SECOND SELECTCOLUMNS SIGN ' +
            'SIN SINH SQRT SQRTPI STARTOFMONTH STARTOFQUARTER STARTOFYEAR STDEV.P ' +
            'STDEV.S STDEVX.P STDEVX.S SUBSTITUTE SUBSTITUTEWITHINDEX SUM SUMMARIZE ' +
            'SUMMARIZECOLUMNS SUMX SWITCH TAN TANH TIME TIMEVALUE TODAY TOPN TOTALMTD ' +
            'TOTALQTD TOTALYTD TRIM TRUNC UNION UPPER USERELATIONSHIP USERNAME VALUE ' +
            'VALUES VAR.P VAR.S VARX.P VARX.S WEEKDAY WEEKNUM XIRR XNPV YEAR YEARFRAC ' +
            'FALSE TRUE VAR RETURN'
        },
        relevance: 0
      },
      {
        className: 'string',
        begin: '"', end: '"',
        contains: [ 
            {
              begin: '""' 
            }
        ],
        relevance: 0
      },
      {
        className: 'number',
        begin: '((\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)',
        relevance: 0
      },
      {
        // quoted identifier
        begin: '\'',
        end: '\'',
        illegal: '\\.,;:/\\\\\\*\\|\\?&%\\$!\\+=\\(\\)\\[\\]\\{\\}<>',
        relevance: 0
      },
      {
        // enclosed identifier
        begin: '\\[',
        end: '\\]',
        illegal: '\\.,;:/\\\\\\*\\|\\?&%\\$!\\+=\\(\\)\\[\\]\\{\\}<>',
        relevance: 0
      }
    ]
  };
}
