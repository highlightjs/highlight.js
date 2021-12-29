'use strict';

const hljs = require('../../build');
hljs.debugMode();

describe('multi-class matchers', () => {
  before(() => {
    const grammar = function() {
      return {
        contains: [
          {
            begin: ["a", "b", "c"],
            className: {
              1: "a",
              3: "c"
            },
            contains: [
              {
                match: "def",
                className: "def"
              }
            ]
          },
          {
            className: "carrot",
            begin: /\^\^\^/,
            end: /\^\^\^/,
            contains: [
              {
                begin: ["a", "b", "c"],
                className: {
                  1: "a",
                  3: "c"
                }
              }
            ]
          },
          {
            match: [
              /((func))/,
              /\(\)/,
              /{.*}/
            ],
            className: {
              1: "keyword",
              2: "params",
              3: "body"
            }
          }
        ]
      };
    };
    hljs.registerLanguage("test", grammar);
  });
  after(() => {
    hljs.unregisterLanguage("test");
  });
  it('should support begin', () => {
    const code = "abcdef";
    const result = hljs.highlight(code, { language: 'test' });

    result.value.should.equal(`<span class="hljs-a">a</span>b<span class="hljs-c">c</span><span class="hljs-def">def</span>`);
    result.relevance.should.equal(2);
  });
  it('basic functionality', () => {
    const code = "func(){ test }";
    const result = hljs.highlight(code, { language: 'test' });

    result.value.should.equal(`<span class="hljs-keyword">func</span><span class="hljs-params">()</span><span class="hljs-body">{ test }</span>`);
    result.relevance.should.equal(1);
  });
  it('works inside a classified parent mode', () => {
    const code = "^^^what abc now^^^";
    const result = hljs.highlight(code, { language: 'test' });

    result.value.should.equal(
      `<span class="hljs-carrot">^^^what ` +
      `<span class="hljs-a">a</span>b<span class="hljs-c">c</span>` +
      ` now^^^</span>`);
  })
});
