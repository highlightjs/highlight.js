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
            'ABS ACOS ACOSH ADDCOLUMNS ADDMISSINGITEMS|10 ALL ALLEXCEPT|10 ALLNOBLANKROW|10 ' +
            'ALLSELECTED|10 AND ASIN ASINH ATAN ATANH AVERAGE AVERAGEA AVERAGEX BETA.DIST ' +
            'BETA.INV BLANK CALCULATE CALCULATETABLE|10 CALENDAR CALENDARAUTO|10 CEILING ' +
            'CHISQ.INV CHISQ.INV.RT CLOSINGBALANCEMONTH|10 CLOSINGBALANCEQUARTER|10 ' +
            'CLOSINGBALANCEYEAR|10 CODE COMBIN COMBINA CONCATENATE CONCATENATEX ' +
            'CONFIDENCE.NORM CONFIDENCE.T CONTAINS COS COSH COUNT COUNTA COUNTAX ' +
            'COUNTBLANK|10 COUNTROWS COUNTX CROSSFILTER|10 CROSSJOIN|10 CURRENCY CUSTOMDATA ' +
            'DATATABLE|10 DATE DATEADD DATEDIFF DATESBETWEEN|10 DATESINPERIOD|10 DATESMTD ' +
            'DATESQTD|10 DATESYTD|10 DATEVALUE DAY DEGREES DISTINCT DISTINCTCOUNT DIVIDE ' +
            'EARLIER EARLIEST EDATE ENDOFMONTH|10 ENDOFQUARTER|10 ENDOFYEAR|10 EOMONTH|10 EVEN ' +
            'EXACT EXCEPT EXP EXPON.DIST FACT FILTER FILTERS FIND FIRSTDATE ' +
            'FIRSTNONBLANK|10 FIXED FLOOR FORMAT GCD GENERATE GENERATEALL GEOMEAN ' +
            'GEOMEANX GROUPBY HASONEFILTER|10 HASONEVALUE|10 HOUR IF IFERROR INT INTERSECT ' +
            'ISBLANK|10 ISCROSSFILTERED|10 ISEMPTY ISERROR ISEVEN ISFILTERED ISLOGICAL ' +
            'ISNONTEXT ISNUMBER ISO.CEILING ISODD ISONORAFTER ISTEXT KEEPFILTERS ' +
            'LASTDATE LASTNONBLANK|10 LCM LEFT LEN LN LOG LOG10 LOOKUPVALUE|10 LOWER MAX ' +
            'MAXA MAXX MEDIAN MEDIANX MID MIN MINA MINUTE MINX MOD MONTH MROUND ' +
            'NATURALINNERJOIN|10 NATURALLEFTOUTERJOIN|10 NEXTDAY|10 NEXTMONTH|10 NEXTQUARTER|10 ' +
            'NEXTYEAR|10 NOT NOW ODD OPENINGBALANCEMONTH|10 OPENINGBALANCEQUARTER|10 ' +
            'OPENINGBALANCEYEAR|10 OR PARALLELPERIOD|10 PATH PATHCONTAINS|10 PATHITEM|10 ' +
            'PATHITEMREVERSE|10 PATHLENGTH|10 PERCENTILE.EXC PERCENTILE.INC PERCENTILEX.EXC ' +
            'PERCENTILEX.INC PERMUT PI POISSON.DIST POWER PREVIOUSDAY|10 PREVIOUSMONTH|10 ' +
            'PREVIOUSQUARTER|10 PREVIOUSYEAR|10 PRODUCT PRODUCTX QUOTIENT RADIANS RAND ' +
            'RANDBETWEEN RANK.EQ RANKX RELATED RELATEDTABLE|10 REPLACE REPT RIGHT ROUND ' +
            'ROUNDDOWN ROUNDUP ROW SAMEPERIODLASTYEAR|10 SAMPLE SEARCH SECOND SIGN SIN ' +
            'SINH SQRT SQRTPI STARTOFMONTH|10 STARTOFQUARTER|10 STARTOFYEAR|10 STDEV.P STDEV.S ' +
            'STDEVX.P STDEVX.S SUBSTITUTE SUBSTITUTEWITHINDEX|10 SUM SUMMARIZE ' +
            'SUMMARIZECOLUMNS|10 SUMX SWITCH TAN TANH TIME TIMEVALUE TODAY TOPN TOTALMTD|10 ' +
            'TOTALQTD|10 TOTALYTD|10 TRIM TRUNC UNION UPPER USERELATIONSHIP|10 USERNAME VALUE ' +
            'VALUES VAR.P VAR.S VARX.P VARX.S WEEKDAY WEEKNUM XIRR|10 XNPV|10 YEAR YEARFRAC|10 ' +
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
