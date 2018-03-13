/*
Language: IBM UIM
Author: Hanna Goodbar <hanna.goodbar@gmail.com>
Description: IBM User Interface Manager markup language. Modifed from xml.js language file.
*/

function(hljs) {
	var XML_IDENT_RE = '[A-Za-z0-9]+';
	var TAG_INTERNALS = {
		endsWithParent: true,
		illegal: /:/,
		relevance: 0,
		contains: [
			{
				className: 'attr',
				begin: XML_IDENT_RE,
				relevance: 0
			},
			{
				begin: /=\s*/,
				relevance: 0,
				contains: [
					{
						className: 'string',
						endsParent: true,
						variants: [
							{
								begin: /"/, 
								end: /"/
							},
							{
								begin: /'/, 
								end: /'/
							},
							{
								begin: /[^\s"'=]+/
							}
						]
					}
				]
			}
		]
	};
	return {
		aliases: ['uim'],
		case_insensitive: true,
		contains: [
			hljs.COMMENT(/^\.\*/, '$'),
			{
				className: 'symbol',
				begin: /(&(amp;)?(amp|colon|cont|msg|period|slr)[.])/,
				relevance: 5
			},
			{
				className: 'tag',
				begin: /\:/, 
				end: /\./,
				relevance: 5,
				contains: [
					{
						className: 'name', 
						begin: /[^.]+/, 
						endsWithParent: true, 
						relevance: 0
					},
					TAG_INTERNALS
				]
			}
		]
	};
}
