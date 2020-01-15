'use strict';

const {promisify} = require('util');

const {newTestCase, defaultCase, buildFakeDOM } = require('./test_case')

class ContentAdder {
  constructor(params) {
    this.content = params.content
  }
  'before:highlightBlock'({block,language}) {
    block.innerHTML += this.content;
  }
}

describe('callback system', function() {
  it("supports class based plugins", async function() {
    const testCase = newTestCase({
      code: "var b",
      language: "javascript",
      expect: `<span class="hljs-keyword">var</span> b = <span class="hljs-number">5</span>;`
    });
    await buildFakeDOM.bind(this)(testCase);

    this.hljs.addPlugin(new ContentAdder({content:" = 5;"}))
    this.hljs.highlightBlock(this.block);
    const actual = this.block.innerHTML;
    actual.should.equal(testCase.expect);

  })
})

describe('before:highlightBlock', function() {
  it('is called', async function() {
    await buildFakeDOM.bind(this)(defaultCase);
    var called = false;
    this.hljs.addPlugin({
      'before:highlightBlock': ({block, result}) => {
        called = true;
      }
    });
    this.hljs.highlightBlock(this.block);
    called.should.equal(true);
  })
  it('can modify block content before highlight', async function() {
    const testCase = newTestCase({
      code: "This is the original content.",
      language: "javascript"
    })
    await buildFakeDOM.bind(this)(testCase);

    this.hljs.addPlugin({
      'before:highlightBlock': ({block, language}) => {
        language.should.equal("javascript")
        block.innerHTML = "var a;"
      }
    });

    this.hljs.highlightBlock(this.block);
    const actual = this.block.innerHTML;
    actual.should.equal(
      `<span class="hljs-keyword">var</span> a;`);
  });

})

describe('after:highlightBlock', function() {
  it('is called', async function() {
    await buildFakeDOM.bind(this)(defaultCase);
    var called = false;
    this.hljs.addPlugin({
      'after:highlightBlock': ({block, result}) => {
        called = true;
      }
    });
    this.hljs.highlightBlock(this.block);
    called.should.equal(true);
  })
  it('receives result data', async function() {
    await buildFakeDOM.bind(this)(defaultCase);

    this.hljs.addPlugin({
      'after:highlightBlock': ({block, result}) => {
        result.language.should.equal("javascript")
        result.relevance.should.above(0)
      }
    });

    this.hljs.highlightBlock(this.block);
  });
})
