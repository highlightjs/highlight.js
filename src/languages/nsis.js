/*
Language: NSIS
Description: Nullsoft Scriptable Install System
Author: Jan T. Sott <jan.sott@gmail.com>
Website: http://whyeye.org
*/

function(hljs) {

	var CONSTANTS = {
		className: 'built_in',
		begin: '\\$(ADMINTOOLS|APPDATA|CDBURN_AREA|CMDLINE|COMMONFILES32|COMMONFILES64|COMMONFILES|COOKIES|DESKTOP|DOCUMENTS|EXEDIR|EXEFILE|EXEPATH|FAVORITES|FONTS|HISTORY|HWNDPARENT|INSTDIR|INTERNET_CACHE|LANGUAGE|LOCALAPPDATA|MUSIC|NETHOOD|OUTDIR|PICTURES|PLUGINSDIR|PRINTHOOD|PROFILE|PROGRAMFILES32|PROGRAMFILES64|PROGRAMFILES|QUICKLAUNCH|RECENT|RESOURCES_LOCALIZED|RESOURCES|SENDTO|SMPROGRAMS|SMSTARTUP|STARTMENU|SYSDIR|TEMP|TEMPLATES|VIDEOS|WINDIR)'
	};

	var DEFINES = {
		// ${defines}
		className: 'constant',
		begin: '\\$+{[a-zA-Z0-9_]+}'
	};

	var VARIABLES = {
		// $variables
		className: 'variable',
		begin: '\\$+[a-zA-Z0-9_]+',
		illegal: '\\(\\){}'
	};

	var LANGUAGES ={
		// $(language_strings)
		className: 'constant',
		begin: '\\$+\\([a-zA-Z0-9_]+\\)',
	};

	var COMPILER ={
		// !compiler_flags
		className: 'constant',
		begin: '\\!(addincludedir|addplugindir|appendfile|cd|define|delfile|echo|else|endif|error|execute|finalize|getdllversionsystem|ifdef|ifmacrodef|ifmacrondef|ifndef|if|include|insertmacro|macroend|macro|packhdr|searchparse|searchreplace|tempfile|undef|verbose|warning)',
	};

	return {
		case_insensitive: false,
		keywords: {
			keyword:
				'Abort AddBrandingImage AddSize AllowRootDirInstall AllowSkipFiles AutoCloseWindow BGFont BGGradient BrandingText BringToFront Call CallInstDLL Caption ChangeUI CheckBitmap ClearErrors CompletedText ComponentText CopyFiles CRCCheck CreateDirectory CreateFont CreateShortCut Delete DeleteINISec DeleteINIStr DeleteRegKey DeleteRegValue DetailPrint DetailsButtonText DirText DirVar DirVerify EnableWindow EnumRegKey EnumRegValue Exch Exec ExecShell ExecWait ExpandEnvStrings File FileBufSize FileClose FileErrorText FileOpen FileRead FileReadByte FileReadUTF16LE FileReadWord FileSeek FileWrite FileWriteByte FileWriteUTF16LE FileWriteWord FindClose FindFirst FindNext FindWindow FlushINI FunctionEnd GetCurInstType GetCurrentAddress GetDlgItem GetDLLVersion GetDLLVersionLocal GetErrorLevel GetFileTime GetFileTimeLocal GetFullPathName GetFunctionAddress GetInstDirError GetLabelAddress GetTempFileName Goto HideWindow Icon IfAbort IfErrors IfFileExists IfRebootFlag IfSilent InitPluginsDir InstallButtonText InstallColors InstallDir InstallDirRegKey InstProgressFlags InstType InstTypeGetText InstTypeSetText IntCmp IntCmpU IntFmt IntOp IsWindow LangString LicenseBkColor LicenseData LicenseForceSelection LicenseLangString LicenseText LoadLanguageFile LockWindow LogSet LogText ManifestDPIAware ManifestSupportedOS MessageBox MiscButtonText Name Nop OutFile Page PageCallbacks PageExEnd Pop Push Quit ReadEnvStr ReadINIStr ReadRegDWORD ReadRegStr Reboot RegDLL Rename RequestExecutionLevel ReserveFile Return RMDir SearchPath SectionEnd SectionGetFlags SectionGetInstTypes SectionGetSize SectionGetText SectionGroupEnd SectionIn SectionSetFlags SectionSetInstTypes SectionSetSize SectionSetText SendMessage SetAutoClose SetBrandingImage SetCompress SetCompressor SetCompressorDictSize SetCtlColors SetCurInstType SetDatablockOptimize SetDateSave SetDetailsPrint SetDetailsView SetErrorLevel SetErrors SetFileAttributes SetFont SetOutPath SetOverwrite SetPluginUnload SetRebootFlag SetRegView SetShellVarContext SetSilent ShowInstDetails ShowUninstDetails ShowWindow SilentInstall SilentUnInstall Sleep SpaceTexts StrCmp StrCmpS StrCpy StrLen SubCaption SubSectionEnd Unicode UninstallButtonText UninstallCaption UninstallIcon UninstallSubCaption UninstallText UninstPage UnRegDLL Var VIAddVersionKey VIFileVersion VIProductVersion WindowIcon WriteINIStr WriteRegBin WriteRegDWORD WriteRegExpandStr WriteRegStr WriteUninstaller XPStyle', 
			literal:
				'admin all auto both colored false force hide highest lastused leave listonly none normal notset off on open print show silent silentlog smooth textonly true user ',
		},
		contains: [
			hljs.HASH_COMMENT_MODE,
			hljs.C_BLOCK_COMMENT_MODE,
			{
				className: 'string',
			    begin: '"', end: '"',
			    illegal: '\\n',
			    contains: [
				    { // $\n, $\r, $\t, $$
						className: 'built_in',
						begin: '\\$(\\\\(n|r|t)|\\$)',
					},
					CONSTANTS,
					DEFINES,
					VARIABLES,
					LANGUAGES,
				],
			},
			{ // line comments
				className: 'comment',
				begin: ';', end: '$',
			},
			{
				className: 'function',
				beginWithKeyword: true, end: '$',
				keywords: 'Function PageEx Section SectionGroup SubSection',
			},
			COMPILER,
			DEFINES,
			VARIABLES,
			LANGUAGES,
			{
				className: 'number',
				begin: hljs.NUMBER_RE,
			},
			{ // plug::ins
				className: 'literal',
				begin: hljs.IDENT_RE + '::', end: hljs.IDENT_RE,
			},
		]
	};
}