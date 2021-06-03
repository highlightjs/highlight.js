import { assertStrictEquals } from "https://deno.land/std@0.97.0/testing/asserts.ts";

import hljs from "../../build/es/core.js";
import js from "../../build/es/languages/javascript.min.js";

hljs.registerLanguage("javascript", js);

Deno.test({
  name: "should return relevance key",
  async fn() {
    const out = hljs.highlight("", { language: "javascript" });
    assertStrictEquals(out.relevance, 0);
  },
});

Deno.test({
  name: "should highlight block",
  async fn() {
    const code = 'var say = "Hello";';
    const expected =
      '<span class="hljs-keyword">' +
      'var</span> say = <span class="hljs-string">' +
      '&quot;Hello&quot;</span>;';

    const out = hljs.highlight(code, { language: "javascript" });
    assertStrictEquals(out.value, expected);
  },
});
