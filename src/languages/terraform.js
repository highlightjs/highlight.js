/*
Language: terraform
Author: Nikos Tsirmirakis <nikos.tsirmirakis@winopsdba.com>
Description: Terraform (HCL) language definition
Category: scripting
*/

function(hljs) {
	var NUMBERS = {
		className: 'number',
		begin: '\\b\\d+(\\.\\d+)?'
	};
	var STRINGS = {
		className: 'string',
		begin: '"',
		end: '"',
		contains: [{
			className: 'variable',
			begin: '\\${',
			end: '\\}',
			relevance: 10,
			contains: [{
				className: 'string',
				begin: '"',
				end: '"'
			}, {
			className: 'meta',
			begin: '[A-Za-z_0-9]*' + '\\(',
			end: '\\)',
			contains: [
				NUMBERS, {
					className: 'string',
					begin: '"',
					end: '"',
					contains: [{
						className: 'variable',
						begin: '\\${',
						end: '\\}',
						contains: [{
							className: 'string',
							begin: '"',
							end: '"',
							contains: [{
								className: 'variable',
								begin: '\\${',
								end: '\\}'
							}]
						}, {
							className: 'meta',
							begin: '[A-Za-z_0-9]*' + '\\(',
							end: '\\)'
						}]
					}]
          		},
          	'self']
			}]
		}]
	};

return {
	aliases: ['tf', 'hcl'],
	keywords: 'resource variable provider output locals module data terraform|10',
	literal: 'false true null',
	contains: [
   		hljs.COMMENT('\\#', '$'),
   		NUMBERS,
		STRINGS
	]
}
}