/*
Language: AspectJ
Author: Hakan Ozler <ozler.hakan@gmail.com>
Description: Syntax Highlighting for the AspectJ Language which is a general-purpose aspect-oriented extension to the Java programming language.
*/
function (hljs) {
	var KEYWORDS =
		'false synchronized int abstract float private char boolean static null if const ' +
		'for true while long throw strictfp finally protected import native final return void ' +
		'enum else break transient new catch instanceof byte super volatile case assert short ' +
		'package default double public try this switch continue throws protected public private ' + 'privileged aspectOf adviceexecution proceed cflowbelow cflow initialization preinitialization '+'staticinitialization withincode target within call execution getWithinTypeName handler '+'thisJoinPoint thisJoinPointStaticPart thisEnclosingJoinPointStaticPart';
	var SHORTKEYS = 'get set args';
	return {
		keywords : KEYWORDS,
		illegal : /<\//,
		contains : [{
				className : 'javadoc',
				begin : '/\\*\\*',
				end : '\\*/',
				relevance : 0,
				contains : [{
						className : 'javadoctag',
						begin : '(^|\\s)@[A-Za-z]+'
					}
				]
			},
			hljs.C_LINE_COMMENT_MODE,
			hljs.C_BLOCK_COMMENT_MODE,
			hljs.APOS_STRING_MODE,
			hljs.QUOTE_STRING_MODE, {
				className : 'class',
				beginKeywords : 'class interface',
				end : /[{;=]/,
				excludeEnd : true,
				keywords : 'class interface',
				illegal : /[:"\[\]]/,
				contains : [{
						beginKeywords : 'extends implements'
					},
					hljs.UNDERSCORE_TITLE_MODE
				]
			}, {
			    // aspect module
				className : 'aspect',
				beginKeywords : 'aspect',
				end : /[{;=]/,
				excludeEnd : true,
				keywords : 'aspect',
				illegal : /[:;"\[\]]/,
				contains : [{
						beginKeywords : 'extends implements pertypewithin perthis percflowbelow percflow issingleton'
					},
					hljs.UNDERSCORE_TITLE_MODE, {
						begin : '\\(' + hljs.UNDERSCORE_IDENT_RE + '(\\()?',
						end : /[)]+/,
						keywords : KEYWORDS,
						excludeEnd : false
					}
				]
			}, {
			    // AspectJ Constructs such as after advice, around advice.
				className : 'crosscuttingaction',
				beginKeywords : 'pointcut after before around throwing returning',
				end : /[)]/,
				excludeEnd : false,
				keywords : 'pointcut after before around throwing returning',
				illegal : /["\[\]]/,
				contains : [{
						begin : hljs.UNDERSCORE_IDENT_RE + '\\s*\\(',
						returnBegin : true,
						contains : [hljs.UNDERSCORE_TITLE_MODE]
					}
				]
			}, {
				className : 'signature',
				begin : /[:]/,
				returnBegin : true,
				end : /[{;]/,
				excludeEnd : true,
				keywords : KEYWORDS + ' ' + SHORTKEYS,
				illegal : /["\[\]]/,
				contains : [{
						className : 'params',
						begin : /\(([\d\w\(.\s\*\.\+\@])+[^()]*[\)\s\w\d\w\<\>\=\+\*\.]+\)/,
						keywords : KEYWORDS,
						excludeBegin : false
					}, {
						beginKeywords : 'extends implements'
					},
					hljs.QUOTE_STRING_MODE
				]
			}, {
				className : 'declare',
				beginKeywords : 'declare',
				end : /[:]/,
				excludeEnd : true,
				keywords : 'declare parents warning error soft precedence'
			},{
				// a copy of the file called java.js
				// this prevents 'new Name(...), or throw ...' from being recognized as a function definition
				beginKeywords : 'new throw',
				end : /\s/,
				relevance : 0
			}, {
				// Did some work in the begin regex for AspectJ compared to the java language
				className : 'operation',
				begin : /\w+ +\w+(\.)?\w+ *\([^\)]*\) *[\{\;]/,
				returnBegin : true,
				end : /[{;=]/,
				keywords : KEYWORDS,
				excludeEnd : true,
				contains : [{
						begin : hljs.UNDERSCORE_IDENT_RE + '\\s*\\(',
						returnBegin : true,
						contains : [hljs.UNDERSCORE_TITLE_MODE]
					}, {
						className : 'params',
						begin : /\(/,
						end : /\)/,
						keywords : KEYWORDS,
						contains : [
							hljs.APOS_STRING_MODE,
							hljs.QUOTE_STRING_MODE,
							hljs.C_NUMBER_MODE,
							hljs.C_BLOCK_COMMENT_MODE
						]
					},
					hljs.C_LINE_COMMENT_MODE,
					hljs.C_BLOCK_COMMENT_MODE
				]
			},
			// annotation is also used in this language
			hljs.C_NUMBER_MODE, {
				className : 'annotation',
				begin : '@[A-Za-z]+'
			}
		]
	}
}