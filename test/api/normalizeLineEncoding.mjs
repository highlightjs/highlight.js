'use strict';

import { hljs } from "../../build/lib/all.js";

export default function() {
  describe('line encoding', () => {
    it('highlight: should normalize CRLF to LF', () => {
      const text = "this is\r\na test";
      let result = hljs.highlight(text, {language: "plaintext"});
      result.value.should.equal("this is\na test");
    });

    it('highlight: should normalize bare CR to LF', () => {
      const text = "this is\ra test";
      let result = hljs.highlight(text, {language: "plaintext"});
      result.value.should.equal("this is\na test");
    });

    // https://github.com/highlightjs/highlight.js/issues/3298
    it('should correct highlight dos', () => {
      const s = "rem line1\r\nrem line2"
      let result = hljs.highlight(s, {language: "dos"})
      result.value.should.equal(
        `<span class="hljs-comment">rem line1</span>\n` +
        `<span class="hljs-comment">rem line2</span>`
        );
    })
  });
}
