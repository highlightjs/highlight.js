/* eslint-disable no-unused-vars */
/* eslint-disable no-use-before-define */
// For TS consumers who use Node and don't have dom in their tsconfig lib, import the necessary types here.
/// <reference lib="dom" />

export { default } from './generated/highlight.js';
export type * from './generated/lib/hljs_types.js';

declare module 'highlight.js/private' {
    export type MatchType = import('./generated/lib/hljs_types.js').MatchType;
    export type EnhancedMatch = import('./generated/lib/hljs_types.js').EnhancedMatch;
    export type AnnotatedError = import('./generated/lib/hljs_types.js').AnnotatedError;
    export type KeywordData = import('./generated/lib/hljs_types.js').KeywordData;
    export type KeywordDict = import('./generated/lib/hljs_types.js').KeywordDict;
}

declare module 'highlight.js/lib/languages/*' {
    import type { LanguageFn } from './generated/lib/hljs_types.js';
    const defineLanguage: LanguageFn;
    export default defineLanguage;
}
