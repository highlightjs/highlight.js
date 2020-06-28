/*
Language: Verifpal
Author: Nadim Kobeissi <nadim@symbolic.software>
Description: Verifpal protocol modeling langauge.
Website: https://verifpal.com
Category: modeling
*/

export default function(hljs) {
	var VERIFPAL_KEYWORDS = {
		keyword:
			'principal phase queries attacker confidentiality authentication freshness unlinkability precondition',
		literal:
			'knows generates leaks',
		built_in:
			'UNBLIND BLIND RINGSIGNVERIF RINGSIGN PW_HASH HASH HKDF AEAD_ENC AEAD_DEC ENC DEC ASSERT CONCAT SPLIT MAC SIGNVERIF SIGN PKE_ENC PKE_DEC SHAMIR_SPLIT SHAMIR_JOIN G nil _'
	}
	return {
		name: 'Verifpal',
		aliases: ['verifpal'],
		case_insensitive: true,
		keywords: VERIFPAL_KEYWORDS,
		illegal: '</',
		contains: [
			hljs.C_LINE_COMMENT_MODE,
			hljs.C_BLOCK_COMMENT_MODE,
			{
				className: 'number',
				variants: [
					{ begin: hljs.C_NUMBER_RE + '[i]', relevance: 1 },
					hljs.C_NUMBER_MODE
				]
			},
		]
	}
}
