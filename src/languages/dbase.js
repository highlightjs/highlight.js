/*
Language: dBase
Author: Hanna Goodbar <hanna.goodbar@gmail.com>
Description: Ashton-Tate/Borland dBase IV database application language.
*/
function(hljs) {
	var DBASE_KEYWORDS = {
		keyword: 'accept activate append application array assist average bar ' +
			'begin box browse calculate call cancel case change clear close ' +
			'command compile continue convert copy count create deactivate ' +
			'debug declare define delete dir display do edit eject else ' +
			'end endcase enddo endif endprintjob ' +
			'environment erase error escape export extended file ' +
			'files fill find form from function go goto help history if ' +
			'import index indexes input insert join key label list load ' +
			'locate logout macro macros memo memory menu modify move of off ' +
			'on pack pad page parameters play popup print printjob private ' +
			'procedure ' +
			'protect public query quit read readerror recall reindex release ' +
			'rename replace report reset restore resume retry return rollback ' +
			'run save say scan screen seek select selection show skip sort ' +
			'status store structure sum suspend tag text to total transaction ' +
			'type unlock update use users using view view wait while window ' +
			'with zap',
		built_in: 'abs access acos alias asc asin at atan atn2 bar bof call ' +
			'cdow ceiling change chr cmonth col completed cos ctodo date day ' +
			'dbf deleted dereference diskspace dmy dow dtoc dtor dtos eof ' +
			'error exp field file fixed fklabel fkmax float flock floor found ' +
			'fv getenv iif inkey int isalpha iscolor islower ismarked isupper ' +
			'key lastkey left len like lineno lksys log logio lookup lower ' +
			'ltrim lupdate max mdx mdy memlines memory menu message min mline ' +
			'mod month ndx network order os pad payment pcol pi popup ' +
			'printstatus program prompt prow pv rand readkey reccount recno ' +
			'recsize replicate right rlock lock rollback round row rtod rtrim ' +
			'seek select set sign sin soundex space sqrt str stuff substr tag ' +
			'tan time transform type upper user val varread version year ',
		literal: 'bof bottom eof top '
	};
	var DBASE_SET = /set (alternate|autosave|bell|blocksize|border|carry|catalog|century|clock|color|confirm|console|currency|left|right|date|debug|decimals|default|deleted|delimiters|design|development|device|display|dohistory|echo|encryption|escape|exact|exclusive|fields|filter|fixed|format|fullpath|function|heading|help|history|hours|index|instruct|intensity|lock|margin|lock|memowidth|menu|message|near|odometer|order|path|pause|point|precision|printer|procedure|refresh|relation|reprocess|safety|scoreboard|separator|skip|space|sql|status|step|talk|title|trap|typeahead|unique|view|window)/
	return {
		aliases: ['prg', 'prs'],
		case_insensitive: true,
		keywords: DBASE_KEYWORDS,
		contains: [
			// hljs.COMMENT(/^\*/, '$'),
			hljs.COMMENT(/^(\s+)?\*.+/, '$'),
			hljs.COMMENT(/&&/, '$'),
			{
				className: 'string',
				begin: '\'', end: '\'',
				contains: [hljs.BACKSLASH_ESCAPE, {begin: '\'\''}]
			},
			{
				className: 'string',
				begin: '"', end: '"',
				contains: [hljs.BACKSLASH_ESCAPE, {begin: '""'}]
			},
			{
				className: 'symbol',
				begin: /@.+?,.+?\s+?/,
				relevance: 10
			},
			{
				className: 'symbol',
				begin: /&\w+\./,
				relevance: 10
			},
			{
				className: 'literal',
				begin: /\.not\./,
				relevance: 10
			},
			{
				className: 'literal',
				begin: /\.and\./,
				relevance: 10
			},
			{
				className: 'literal',
				begin: /\.or\./,
				relevance: 10
			},
			{
				className: 'literal',
				begin: DBASE_SET
			},
			hljs.C_NUMBER_MODE
		]
	}
}
