/* eslint-disable no-unused-vars */
/* eslint-disable no-use-before-define */
// For TS consumers who use Node and don't have dom in their tsconfig lib, import the necessary types here.
/// <reference lib="dom" />

export { default } from './generated/highlight.js';

// Public API types only (private aliases: import from 'highlight.js/private').
export type {
  VuePlugin,
  RegexEitherOptions,
  HighlightOptions,
  illegalData,
  HighlightResult,
  AutoHighlightResult,
  BeforeHighlightContext,
  CallbackResponse,
  ModeCallback,
  Mode,
  CompilerExt,
  LanguageDetail,
  Language,
  CompiledScope,
  CompiledMode,
  CompiledLanguage,
  Emitter,
  EmitterConstructor,
  HLJSOptions,
  HLJSPlugin,
  PluginEvent,
  HighlightedHTMLElement,
  LanguageFn,
  PublicApi,
  ModesAPI,
  HLJSApi
} from './generated/lib/hljs_types.js';

declare module 'highlight.js/lib/languages/*' {
    import type { LanguageFn } from './generated/lib/hljs_types.js';
    const defineLanguage: LanguageFn;
    export default defineLanguage;
}
