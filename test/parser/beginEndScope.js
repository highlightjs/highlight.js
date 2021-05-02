'use strict';

const hljs = require('../../build');
hljs.debugMode();

describe('beginScope and endScope', () => {
  before(() => {
    const grammar = function() {
      return {
        contains: [
          {
            begin: /xyz/,
            end: /123/,
            scope: "string",
            beginScope: "red",
            endScope: "green"
          },
          {
            begin: /123/,
            end: [ /a/,/((b))/,/c/,/d/ ],
            endScope: { 1: "apple", 2: "boy", 4: "delta" }
          },
          {
            begin: /dumb/,
            end: /luck/,
            beginScope: "red",
            endScope: "green"
          },
          {
            begin: /abc/,
            beginScope: "letters",
            contains: [
              { match: /def/, scope: "more" }
            ]
          }
        ]
      }
    };
    hljs.registerLanguage("test", grammar);
  });
  after(() => {
    hljs.unregisterLanguage("test");
  });
  it('should support multi-class', () => {
    const code = "123 abcd";
    const result = hljs.highlight(code, { language: 'test' });

    result.value.should.equal(`123 <span class="hljs-apple">a</span><span class="hljs-boy">b</span>c<span class="hljs-delta">d</span>`);
  })
  it('should support an outer scope wrapper', () => {
    const code = "xyz me 123";
    const result = hljs.highlight(code, { language: 'test' });

    result.value.should.equal(
      `<span class="hljs-string">` +
        `<span class="hljs-red">xyz</span> me <span class="hljs-green">123</span>` +
      `</span>`);
  })
  it('should support textual beginScope & endScope pair', () => {
    const code = "dumb really luck";
    const result = hljs.highlight(code, { language: 'test' });

    result.value.should.equal(`<span class="hljs-red">dumb</span> really <span class="hljs-green">luck</span>`);
  });
  it('should support textual beginScope', () => {
    const code = "abcdef";
    const result = hljs.highlight(code, { language: 'test' });

    result.value.should.equal(`<span class="hljs-letters">abc</span><span class="hljs-more">def</span>`);
  });

});
