export type VuePlugin = {
    install: (vue: any) => void;
};
export type RegexEitherOptions = {
    capture?: boolean;
};
export type HighlightOptions = {
    language: string;
    ignoreIllegals?: boolean;
};
export type illegalData = {
    message: string;
    context: string;
    index: number;
    resultSoFar: string;
    mode: CompiledMode;
};
export type HighlightResult = {
    code?: string;
    relevance: number;
    value: string;
    language?: string;
    illegal: boolean;
    errorRaised?: Error;
    secondBest?: Omit<HighlightResult, "secondBest">;
    _illegalBy?: illegalData;
    _emitter: Emitter;
    _top?: Language | CompiledMode;
};
export type AutoHighlightResult = HighlightResult;
export type BeforeHighlightContext = {
    code: string;
    language: string;
    result?: HighlightResult;
};
export type CallbackResponse = {
    data: Record<string, any>;
    ignoreMatch: () => void;
    isMatchIgnored: boolean;
};
export type ModeCallback = (match: RegExpMatchArray, response: CallbackResponse) => void;
export type ModeCallbacks = {
    "on:end"?: Function;
    "on:begin"?: ModeCallback;
};
export type ModeDetails = {
    begin?: RegExp | string | (RegExp | string)[];
    match?: RegExp | string | (RegExp | string)[];
    end?: RegExp | string | (RegExp | string)[];
    className?: string;
    scope?: string | Record<number, string>;
    beginScope?: string | Record<number, string>;
    endScope?: string | Record<number, string>;
    contains?: ("self" | Mode)[];
    endsParent?: boolean;
    endsWithParent?: boolean;
    endSameAsBegin?: boolean;
    skip?: boolean;
    excludeBegin?: boolean;
    excludeEnd?: boolean;
    returnBegin?: boolean;
    returnEnd?: boolean;
    __beforeBegin?: Function;
    parent?: Mode;
    starts?: Mode;
    lexemes?: string | RegExp;
    keywords?: string | string[] | (Record<string, string | string[] | RegExp> & {
        $pattern?: RegExp | string;
    });
    beginKeywords?: string;
    relevance?: number;
    illegal?: string | RegExp | Array<string | RegExp>;
    variants?: Mode[];
    cachedVariants?: Mode[];
    subLanguage?: string | string[];
    isCompiled?: boolean;
    label?: string;
    beforeMatch?: RegExp | string;
};
export type Mode = ModeCallbacks & ModeDetails;
export type CompilerExt = (mode: Mode, parent: Mode | Language | CompiledMode | null) => void;
export type LanguageDetail = {
    name?: string;
    unicodeRegex?: boolean;
    rawDefinition?: () => Language;
    aliases?: string[];
    disableAutodetect?: boolean;
    contains: Mode[];
    case_insensitive?: boolean;
    keywords?: string | string[] | Record<string, string | string[] | RegExp>;
    isCompiled?: boolean;
    exports?: any;
    classNameAliases?: Record<string, string>;
    compilerExtensions?: CompilerExt[];
    supersetOf?: string;
    __emitTokens?: (code: string, emitter: Emitter) => void;
};
export type Language = LanguageDetail & Partial<Mode>;
export type CompiledScope = Record<number, string> & {
    _emit?: Record<number, boolean>;
    _multi?: boolean;
    _wrap?: string;
};
/**
 * Compiled mode is a Mode after the compiler has finished with it.
 */
export type CompiledMode = Omit<Mode, "contains" | "keywords" | "isCompiled" | "beginScope" | "endScope" | "starts" | "parent" | "begin" | "end" | "scope" | "illegal"> & {
    begin?: RegExp | string;
    end?: RegExp | string;
    scope?: string;
    contains: CompiledMode[];
    keywords: KeywordDict;
    data: Record<string, any>;
    terminatorEnd: string;
    keywordPatternRe: RegExp;
    beginRe: RegExp;
    endRe: RegExp;
    illegalRe: RegExp;
    matcher: any;
    isCompiled: true;
    starts?: CompiledMode;
    parent?: CompiledMode;
    beginScope?: CompiledScope;
    endScope?: CompiledScope;
    illegal?: string | RegExp | Array<string | RegExp>;
};
export type CompiledLanguage = LanguageDetail & CompiledMode & {
    isCompiled: true;
    contains: CompiledMode[];
    keywords: Record<string, any>;
};
/**
 * Public emitter surface plus internal helpers the parser actually calls.
 */
export type Emitter = {
    startScope: (name: string) => void;
    endScope: () => void;
    addText: (text: string) => void;
    toHTML: () => string;
    finalize: () => void | boolean;
    __addSublanguage: (emitter: Emitter, subLanguageName: string) => void;
    openNode?: (scope: any) => void;
    closeNode?: () => any;
};
export type EmitterConstructor = new (opts: any) => Emitter;
export type HLJSOptions = {
    noHighlightRe: RegExp;
    languageDetectRe: RegExp;
    classPrefix: string;
    cssSelector: string;
    languages?: string[];
    __emitter: EmitterConstructor;
    ignoreUnescapedHTML?: boolean;
    throwUnescapedHTML?: boolean;
};
export type HLJSPlugin = {
    "after:highlight"?: (result: HighlightResult) => void;
    "before:highlight"?: (context: BeforeHighlightContext) => void;
    "after:highlightElement"?: (data: {
        el: Element;
        result: HighlightResult;
        text: string;
    }) => void;
    "before:highlightElement"?: (data: {
        el: Element;
        language: string;
    }) => void;
    "after:highlightBlock"?: (data: {
        block: Element;
        result: HighlightResult;
        text: string;
    }) => void;
    "before:highlightBlock"?: (data: {
        block: Element;
        language: string;
    }) => void;
};
export type PluginEvent = string;
export type HighlightedHTMLElement = HTMLElement & {
    result?: object;
    secondBest?: object;
    parentNode: HTMLElement;
};
export type LanguageFn = (hljs: HLJSApi) => Language;
export type PublicApi = {
    highlight: {
        (code: string, options: HighlightOptions): HighlightResult;
        (languageName: string, code: string, ignoreIllegals?: boolean): HighlightResult;
    };
    highlightAuto: (code: string, languageSubset?: string[]) => AutoHighlightResult;
    highlightBlock: (element: HTMLElement) => void;
    highlightElement: (element: HTMLElement) => void;
    configure: (options: Partial<HLJSOptions>) => void;
    initHighlighting: () => void;
    initHighlightingOnLoad: () => void;
    highlightAll: () => void;
    registerLanguage: (languageName: string, language: LanguageFn) => void;
    unregisterLanguage: (languageName: string) => void;
    listLanguages: () => string[];
    registerAliases: (aliasList: string | string[], opts: {
        languageName: string;
    }) => void;
    getLanguage: (languageName: string) => Language | undefined;
    autoDetection: (languageName: string) => boolean;
    inherit: <T>(original: T, ...args: Record<string, any>[]) => T;
    addPlugin: (plugin: HLJSPlugin) => void;
    removePlugin: (plugin: HLJSPlugin) => void;
    debugMode: () => void;
    safeMode: () => void;
    versionString: string;
    vuePlugin: () => VuePlugin;
    regex: {
        concat: (...args: (RegExp | string)[]) => string;
        lookahead: (re: RegExp | string) => string;
        either: (...args: (RegExp | string)[] | [...(RegExp | string)[], RegexEitherOptions]) => string;
        optional: (re: RegExp | string) => string;
        anyNumberOfTimes: (re: RegExp | string) => string;
    };
    newInstance: () => HLJSApi;
};
export type ModesAPI = {
    SHEBANG: (mode?: Partial<Mode> & {
        binary?: string | RegExp;
    }) => Mode;
    BACKSLASH_ESCAPE: Mode;
    QUOTE_STRING_MODE: Mode;
    APOS_STRING_MODE: Mode;
    PHRASAL_WORDS_MODE: Mode;
    COMMENT: (begin: string | RegExp, end: string | RegExp, modeOpts?: Mode | {}) => Mode;
    C_LINE_COMMENT_MODE: Mode;
    C_BLOCK_COMMENT_MODE: Mode;
    HASH_COMMENT_MODE: Mode;
    NUMBER_MODE: Mode;
    C_NUMBER_MODE: Mode;
    BINARY_NUMBER_MODE: Mode;
    REGEXP_MODE: Mode;
    TITLE_MODE: Mode;
    UNDERSCORE_TITLE_MODE: Mode;
    METHOD_GUARD: Mode;
    END_SAME_AS_BEGIN: (mode: Mode) => Mode;
    IDENT_RE: string;
    UNDERSCORE_IDENT_RE: string;
    MATCH_NOTHING_RE: RegExp;
    NUMBER_RE: string;
    C_NUMBER_RE: string;
    BINARY_NUMBER_RE: string;
    RE_STARTERS_RE: string;
};
export type HLJSApi = PublicApi & ModesAPI;
export type MatchType = "begin" | "end" | "illegal";
export type EnhancedMatch = RegExpMatchArray & {
    rule: CompiledMode;
    type: MatchType;
};
export type AnnotatedError = Error & {
    mode?: Mode | Language | CompiledMode;
    languageName?: string;
    badRule?: Mode | CompiledMode;
};
export type KeywordData = [string, number];
export type KeywordDict = Record<string, KeywordData>;
