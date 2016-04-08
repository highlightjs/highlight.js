/*
Language: PureBASIC
Author: Tristano Ajmone <tajmone@gmail.com>
Description: Syntax highlighting for PureBASIC (v.5). No inline ASM highlighting. First release (v.1.0), April 2016.
Credits: I've taken inspiration from the PureBasic language file for GeSHi, created by Gustavo Julio Fiorenza (GuShH).
Category: misc
*/

// Base deafult colors in PB IDE: background: #FFFFDF; foreground: #000000;

function(hljs) {
	var STRINGS = { // PB IDE color: #0080FF (Azure Radiance)
		className: 'string',
		begin: '(~)?"', end: '"',
		illegal: '\\n'
	};
	var CONSTANTS = { // PB IDE color: #924B72 (Cannon Pink)
		//  "#" + a letter or underscore + letters, digits or underscores + (optional) "$"
			className: 'symbol',
			begin: '#[a-zA-Z_]\\w*\\$?'
	};
	var PROCEDURES_RHS = { // PB IDE color: #006666 (Blue Stone)
		// ")"
		className: 'function',
		begin: '\\)',
		relevance: 0
	};

  return {
		aliases: ['pb', 'pbi'],
		keywords: {
			keyword: // PB IDE color: #006666 (Blue Stone)
				// The following keywords list was taken and adapted from GuShH's PureBasic language file for GeSHi...
				'And As Break CallDebugger Case CompilerCase CompilerDefault CompilerElse CompilerEndIf CompilerEndSelect ' +
				'CompilerError CompilerIf CompilerSelect Continue Data DataSection EndDataSection Debug DebugLevel Declare ' +
				'DeclareCDLL DeclareDLL Default Define Dim DisableASM DisableDebugger DisableExplicit Else ElseIf EnableASM ' +
				'EnableDebugger EnableExplicit End EndEnumeration EndIf EndImport EndInterface EndMacro EndProcedure ' +
				'EndSelect EndStructure EndStructureUnion EndWith Enumeration Extends FakeReturn For Next ForEach ' +
				'ForEver Global Gosub Goto If Import ImportC IncludeBinary IncludeFile IncludePath Interface Macro ' +
				'NewList Not Or Procedure ProcedureC ProcedureCDLL ProcedureDLL ProcedureReturn Protected Prototype ' +
				'PrototypeC Read ReDim Repeat Until Restore Return Select Shared Static Step Structure StructureUnion ' +
				'Swap To Wend While With XIncludeFile XOr'
		},
		contains: [
			// COMMENTS | PB IDE color: #00AAAA (Persian Green)			
			hljs.COMMENT(';', '$', {relevance: 0}),
			
			// PROCEDURES_LHS | PB IDE color: #006666 (Blue Stone)
			{
				className: 'function',
				begin: '[a-zA-Z_]\\w*\\s*\\(',
				relevance: 0,
			},
			STRINGS,
			CONSTANTS,
			PROCEDURES_RHS
		]
	};
}