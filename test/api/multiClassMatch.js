'use strict';

const hljs = require('../../build');

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
            match: [
              /func/,
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
      }
    }
    hljs.registerLanguage("test", grammar);
  });
  after(() => {
    hljs.unregisterLanguage("test");
  });
  it('should support begin', () => {
    const code = "abcdef";
    const result = hljs.highlight(code, { language: 'test' });

    result.relevance.should.equal(2);
    result.value.should.equal(`<span class="hljs-a">a</span>b<span class="hljs-c">c</span><span class="hljs-def">def</span>`);
  })
  it('basic functionality', () => {
    const code = "func(){ test }";
    const result = hljs.highlight(code, { language: 'test' });

    result.relevance.should.equal(1);
    result.value.should.equal(`<span class="hljs-keyword">func</span><span class="hljs-params">()</span><span class="hljs-body">{ test }</span>`);
  });
});
