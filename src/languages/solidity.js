/*
Language: Solidity
Author: Kaustav Haldar <khaldar@uwaterloo.ca>
*/

function (hljs) {
  var IDENT_RE = '[A-Za-z$_][0-9A-Za-z$_]*';

	var NUMBER = {
		className: 'number',
	    variants: [
		   // jacked from julia.js, should match ethereum addresses too
	      { begin: /(\b0x[\d_]*(\.[\d_]*)?|0x\.\d[\d_]*)p[-+]?\d+|\b0[box][a-fA-F0-9][a-fA-F0-9_]*|(\b\d[\d_]*(\.[\d_]*)?|\.\d[\d_]*)([eEfF][-+]?\d+)?/ },
	    ],
	    relevance: 0
	}
	var COMMONS = {
		contains: [
		  hljs.C_LINE_COMMENT_MODE,
	      hljs.C_BLOCK_COMMENT_MODE,
	      hljs.APOS_STRING_MODE,
	      hljs.QUOTE_STRING_MODE,
	      NUMBER,
	      hljs.REGEXP_MODE
		]
	}

	var FUNC = {
		className: 'function',
		beginKeywords: 'function',
		end: /\{/,
		excludeEnd: true,
        contains: [
          hljs.inherit(hljs.TITLE_MODE, {begin: IDENT_RE}),
          {
            className: 'params',
            begin: /\(/, end: /\)/,
            excludeBegin: true,
            excludeEnd: true,
            contains: COMMONS.contains
          }
        ],
        illegal: /\[|%/
	}

	var CONTRACT = {
		className: 'class',
		variants: [
			{
				begin: '/(contract|library|interface|struct)/'
			}
		],
		relevance: 10,
		end: /[{;=]/, 
		excludeEnd: true,        
		illegal: /[:"\[\]]/,
		contains: COMMONS.contains
	}

	function getStr() {
		return 
		  'uint' + Array(256/8).fill().map(function(_, i) { (i+1)*8}).join(' uint') + ' ' +
		  'uint' + Array(256/8).fill().map(function(_, i) { (i+1)*8}).join('[] uint') + ' ' +
		  'int' + Array(256/8).fill().map(function(_, i) { (i+1)*8}).join(' int') + ' ' +
		  'int' + Array(256/8).fill().map(function(_, i) { (i+1)*8}).join('[] int') + ' ' +
		  'bytes' + Array(32).fill().map(function(_, i) { i+1}).join(' bytes') + ' ' +
		  'bytes' + Array(32).fill().map(function(_, i) { i+1}).join('[] bytes') + ' ' +
		  'fixed' + [].concat.apply(
		  	[], Array(32).fill().map(function(_, i) {
		  		Array(81).fill().map(function(_, j) {
		  			((i+1)*8)+'x'+j
		  		})
		  	})
		  	).join(' fixed') + ' ' +
		  'ufixed' + [].concat.apply([], Array(32).fill().map(function(_, i) { Array(81).fill().map(function(_, j) { ((i+1)*8)+'x'+j})})).join(' ufixed');
	}

	var KEYWORDS = {
		keyword: 
		  'anonymous as assembly break constant continue do delete else external for hex if ' +
		  'indexed internal import is mapping memory new payable public pragma ' +
		  'private pure return returns storage super this throw using view while' +
		  'var function event modifier struct enum contract library interface ' +
		  'abstract after case catch default final in inline let match ' +
		  'of relocatable static switch try type typeof'
		  ,
		literal: 'true false null',
		built_in: 
		  'block msg tx now suicide selfdestruct addmod mulmod sha3 keccak256 log ' +
		  'sha256 ecrecover ripemd160 assert revert require ' +
		  'bytes string address uint int bool byte ' + 
		  'bytes[] string[] address[] uint[] int[] bool[] byte[] ' +
		  'wei szabo finney ether seconds minutes hours days weeks years ' +
		  getStr()
		}

	COMMONS = [].concat.apply(COMMONS.contains, [FUNC, CONTRACT])

	return {
		aliases: ['sol'],
		keywords: KEYWORDS,
		contains: COMMONS
	}
}