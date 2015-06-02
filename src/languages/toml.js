/*
Language: Toml
Author: GuillaumeGomez <guillaume1.gomez@gmail.com>
Category: common
*/

function(hljs) {
    var VARIABLE = {
		className: "variable",
		variants: [{
			begin: /\$[\w\d#@][\w\d_]*/
		}, {
			begin: /\$\{(.*?)}/
		}]
	};
	var STRING = {
		className: "string",
		begin: /"/,
		end: /"/
	};
	var PREPROC = {
		className: "preprocessor",
		begin: /\[[^\"]+\]/
	};
	return {
		contains: [hljs.HASH_COMMENT_MODE, VARIABLE, STRING, PREPROC]
	};
}
