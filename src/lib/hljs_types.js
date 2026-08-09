/**
 * Public and internal highlight.js types (JSDoc source of truth).
 * Emitted to types/generated; packaging re-exports from types/index.d.ts.
 */

/**
 * @typedef {object} VuePlugin
 * @property {(vue: any) => void} install
 */

/**
 * @typedef {object} RegexEitherOptions
 * @property {boolean} [capture]
 */

/**
 * @typedef {object} HighlightOptions
 * @property {string} language
 * @property {boolean} [ignoreIllegals]
 */

/**
 * @typedef {object} illegalData
 * @property {string} message
 * @property {string} context
 * @property {number} index
 * @property {string} resultSoFar
 * @property {CompiledMode} mode
 */

/**
 * @typedef {object} HighlightResult
 * @property {string} [code]
 * @property {number} relevance
 * @property {string} value
 * @property {string} [language]
 * @property {boolean} illegal
 * @property {Error} [errorRaised]
 * @property {Omit<HighlightResult, 'secondBest'>} [secondBest]
 * @property {illegalData} [_illegalBy]
 * @property {Emitter} _emitter
 * @property {Language | CompiledMode} [_top]
 */

/**
 * @typedef {HighlightResult} AutoHighlightResult
 */

/**
 * @typedef {object} BeforeHighlightContext
 * @property {string} code
 * @property {string} language
 * @property {HighlightResult} [result]
 */

/**
 * @typedef {object} CallbackResponse
 * @property {Record<string, any>} data
 * @property {() => void} ignoreMatch
 * @property {boolean} isMatchIgnored
 */

/**
 * @callback ModeCallback
 * @param {RegExpMatchArray} match
 * @param {CallbackResponse} response
 * @returns {void}
 */

/**
 * @typedef {{
 *   "on:end"?: Function,
 *   "on:begin"?: ModeCallback
 * }} ModeCallbacks
 */

/**
 * @typedef {object} ModeDetails
 * @property {RegExp | string | (RegExp | string)[]} [begin]
 * @property {RegExp | string | (RegExp | string)[]} [match]
 * @property {RegExp | string | (RegExp | string)[]} [end]
 * @property {string} [className]
 * @property {string | Record<number, string>} [scope]
 * @property {string | Record<number, string>} [beginScope]
 * @property {string | Record<number, string>} [endScope]
 * @property {("self" | Mode)[]} [contains]
 * @property {boolean} [endsParent]
 * @property {boolean} [endsWithParent]
 * @property {boolean} [endSameAsBegin]
 * @property {boolean} [skip]
 * @property {boolean} [excludeBegin]
 * @property {boolean} [excludeEnd]
 * @property {boolean} [returnBegin]
 * @property {boolean} [returnEnd]
 * @property {Function} [__beforeBegin]
 * @property {Mode} [parent]
 * @property {Mode} [starts]
 * @property {string | RegExp} [lexemes]
 * @property {string | string[] | (Record<string, string | string[] | RegExp> & { $pattern?: RegExp | string })} [keywords]
 * @property {string} [beginKeywords]
 * @property {number} [relevance]
 * @property {string | RegExp | Array<string | RegExp>} [illegal]
 * @property {Mode[]} [variants]
 * @property {Mode[]} [cachedVariants]
 * @property {string | string[]} [subLanguage]
 * @property {boolean} [isCompiled]
 * @property {string} [label]
 * @property {RegExp | string} [beforeMatch]
 */

/**
 * @typedef {ModeCallbacks & ModeDetails} Mode
 */

/**
 * @callback CompilerExt
 * @param {Mode} mode
 * @param {Mode | Language | CompiledMode | null} parent
 * @returns {void}
 */

/**
 * @typedef {object} LanguageDetail
 * @property {string} [name]
 * @property {boolean} [unicodeRegex]
 * @property {() => Language} [rawDefinition]
 * @property {string[]} [aliases]
 * @property {boolean} [disableAutodetect]
 * @property {Mode[]} contains
 * @property {boolean} [case_insensitive]
 * @property {string | string[] | Record<string, string | string[] | RegExp>} [keywords]
 * @property {boolean} [isCompiled]
 * @property {any} [exports]
 * @property {Record<string, string>} [classNameAliases]
 * @property {CompilerExt[]} [compilerExtensions]
 * @property {string} [supersetOf]
 * @property {(code: string, emitter: Emitter) => void} [__emitTokens]
 */

/**
 * @typedef {LanguageDetail & Partial<Mode>} Language
 */

/**
 * @typedef {Record<number, string> & {_emit?: Record<number, boolean>, _multi?: boolean, _wrap?: string}} CompiledScope
 */

/**
 * Compiled mode is a Mode after the compiler has finished with it.
 * @typedef {Omit<Mode, 'contains' | 'keywords' | 'isCompiled' | 'beginScope' | 'endScope' | 'starts' | 'parent' | 'begin' | 'end' | 'scope' | 'illegal'> & {
 *   begin?: RegExp | string,
 *   end?: RegExp | string,
 *   scope?: string,
 *   contains: CompiledMode[],
 *   keywords: KeywordDict,
 *   data: Record<string, any>,
 *   terminatorEnd: string,
 *   keywordPatternRe: RegExp,
 *   beginRe: RegExp,
 *   endRe: RegExp,
 *   illegalRe: RegExp,
 *   matcher: any,
 *   isCompiled: true,
 *   starts?: CompiledMode,
 *   parent?: CompiledMode,
 *   beginScope?: CompiledScope,
 *   endScope?: CompiledScope,
 *   illegal?: string | RegExp | Array<string | RegExp>
 * }} CompiledMode
 */

/**
 * @typedef {LanguageDetail & CompiledMode & { isCompiled: true, contains: CompiledMode[], keywords: Record<string, any> }} CompiledLanguage
 */

/**
 * Public emitter surface plus internal helpers the parser actually calls.
 * @typedef {object} Emitter
 * @property {(name: string) => void} startScope
 * @property {() => void} endScope
 * @property {(text: string) => void} addText
 * @property {() => string} toHTML
 * @property {() => void | boolean} finalize
 * @property {(emitter: Emitter, subLanguageName: string) => void} __addSublanguage
 * @property {(scope: any) => void} [openNode]
 * @property {() => any} [closeNode]
 */

/**
 * @typedef {new (opts: any) => Emitter} EmitterConstructor
 */

/**
 * @typedef {object} HLJSOptions
 * @property {RegExp} noHighlightRe
 * @property {RegExp} languageDetectRe
 * @property {string} classPrefix
 * @property {string} cssSelector
 * @property {string[]} [languages]
 * @property {EmitterConstructor} __emitter
 * @property {boolean} [ignoreUnescapedHTML]
 * @property {boolean} [throwUnescapedHTML]
 */

/**
 * @typedef {{
 *   "after:highlight"?: (result: HighlightResult) => void,
 *   "before:highlight"?: (context: BeforeHighlightContext) => void,
 *   "after:highlightElement"?: (data: { el: Element, result: HighlightResult, text: string }) => void,
 *   "before:highlightElement"?: (data: { el: Element, language: string }) => void,
 *   "after:highlightBlock"?: (data: { block: Element, result: HighlightResult, text: string }) => void,
 *   "before:highlightBlock"?: (data: { block: Element, language: string }) => void,
 * }} HLJSPlugin
 */

/**
 * @typedef {string} PluginEvent
 */

/**
 * @typedef {HTMLElement & { result?: object, secondBest?: object, parentNode: HTMLElement }} HighlightedHTMLElement
 */

/**
 * @callback LanguageFn
 * @param {HLJSApi} hljs
 * @returns {Language}
 */

/**
 * @typedef {object} PublicApi
 * @property {{
 *   (code: string, options: HighlightOptions): HighlightResult
 *   (languageName: string, code: string, ignoreIllegals?: boolean): HighlightResult
 * }} highlight
 * @property {(code: string, languageSubset?: string[]) => AutoHighlightResult} highlightAuto
 * @property {(element: HTMLElement) => void} highlightBlock
 * @property {(element: HTMLElement) => void} highlightElement
 * @property {(options: Partial<HLJSOptions>) => void} configure
 * @property {() => void} initHighlighting
 * @property {() => void} initHighlightingOnLoad
 * @property {() => void} highlightAll
 * @property {(languageName: string, language: LanguageFn) => void} registerLanguage
 * @property {(languageName: string) => void} unregisterLanguage
 * @property {() => string[]} listLanguages
 * @property {(aliasList: string | string[], opts: { languageName: string }) => void} registerAliases
 * @property {(languageName: string) => Language | undefined} getLanguage
 * @property {(languageName: string) => boolean} autoDetection
 * @property {<T>(original: T, ...args: Record<string, any>[]) => T} inherit
 * @property {(plugin: HLJSPlugin) => void} addPlugin
 * @property {(plugin: HLJSPlugin) => void} removePlugin
 * @property {() => void} debugMode
 * @property {() => void} safeMode
 * @property {string} versionString
 * @property {() => VuePlugin} vuePlugin
 * @property {{
 *   concat: (...args: (RegExp | string)[]) => string,
 *   lookahead: (re: RegExp | string) => string,
 *   either: (...args: (RegExp | string)[] | [...(RegExp | string)[], RegexEitherOptions]) => string,
 *   optional: (re: RegExp | string) => string,
 *   anyNumberOfTimes: (re: RegExp | string) => string
 * }} regex
 * @property {() => HLJSApi} newInstance
 */

/**
 * @typedef {object} ModesAPI
 * @property {(mode?: Partial<Mode> & { binary?: string | RegExp }) => Mode} SHEBANG
 * @property {Mode} BACKSLASH_ESCAPE
 * @property {Mode} QUOTE_STRING_MODE
 * @property {Mode} APOS_STRING_MODE
 * @property {Mode} PHRASAL_WORDS_MODE
 * @property {(begin: string | RegExp, end: string | RegExp, modeOpts?: Mode | {}) => Mode} COMMENT
 * @property {Mode} C_LINE_COMMENT_MODE
 * @property {Mode} C_BLOCK_COMMENT_MODE
 * @property {Mode} HASH_COMMENT_MODE
 * @property {Mode} NUMBER_MODE
 * @property {Mode} C_NUMBER_MODE
 * @property {Mode} BINARY_NUMBER_MODE
 * @property {Mode} REGEXP_MODE
 * @property {Mode} TITLE_MODE
 * @property {Mode} UNDERSCORE_TITLE_MODE
 * @property {Mode} METHOD_GUARD
 * @property {(mode: Mode) => Mode} END_SAME_AS_BEGIN
 * @property {string} IDENT_RE
 * @property {string} UNDERSCORE_IDENT_RE
 * @property {RegExp} MATCH_NOTHING_RE
 * @property {string} NUMBER_RE
 * @property {string} C_NUMBER_RE
 * @property {string} BINARY_NUMBER_RE
 * @property {string} RE_STARTERS_RE
 */

/**
 * @typedef {PublicApi & ModesAPI} HLJSApi
 */

/* formerly highlight.js/private */

/**
 * @typedef {"begin" | "end" | "illegal"} MatchType
 */

/**
 * @typedef {RegExpMatchArray & { rule: CompiledMode, type: MatchType }} EnhancedMatch
 */

/**
 * @typedef {Error & { mode?: Mode | Language | CompiledMode, languageName?: string, badRule?: Mode | CompiledMode }} AnnotatedError
 */

/**
 * @typedef {[string, number]} KeywordData
 */

/**
 * @typedef {Record<string, KeywordData>} KeywordDict
 */

export {};
