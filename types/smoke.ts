/// <reference path="./index.d.ts" />

import hljs, { HighlightJS, hljs as named } from "highlight.js";
import type { HLJSApi, LanguageFn, HighlightResult } from "highlight.js";
import javascript from "highlight.js/languages/javascript.js";
import python from "highlight.js/languages/python";

const _a: HLJSApi = hljs;
const _b: HLJSApi = named;
const _c: LanguageFn = javascript;
const _d: LanguageFn = python;

hljs.configure({ grammarPath: "/langs/" });
hljs.registerAliases(["uc"], {
  languageName: "unicorn",
  url: "https://example/unicorn.js"
});

async function dom(): Promise<void> {
  await hljs.loadLanguage("js");
  await hljs.loadLanguages(["xml", "python"], { grammarPath: "/langs/" });
  await hljs.highlightAll();
  const el = document.createElement("code");
  await hljs.highlightElement(el);
}

const r: HighlightResult = hljs.highlight("const x = 1", { language: "javascript" });
void r.value;
void dom;

const other: HLJSApi = new HighlightJS();
hljs.registerLanguage("javascript", javascript);
void other;

// @ts-expect-error vuePlugin removed in v12
void hljs.vuePlugin;
