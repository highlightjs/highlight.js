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
    this.hljs.highlightElement(this.block);
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
    this.hljs.highlightElement(this.block);
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

    this.hljs.highlightElement(this.block);
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
    this.hljs.highlightElement(this.block);
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

    this.hljs.highlightElement(this.block);
  });
  it('can override language if not originally provided (in class)', async function() {
    var test = newTestCase({
      code: "anothingstring",
      language: ""
    });
    await buildFakeDOM.bind(this)(test);
    this.hljs.addPlugin({
      'after:highlightBlock': ({block, result}) => {
        result.language="basic";
      }
    });

    this.hljs.highlightElement(this.block);
    should(this.block.outerHTML.includes(`class="hljs basic"`)).equal(true);

  })
  it('can modify result and affect the render output', async function() {
    var test = newTestCase({
      code: "var a = 4;",
      language: "javascript"
    })
    await buildFakeDOM.bind(this)(test);
    this.hljs.addPlugin({
      'after:highlightBlock': ({block, result}) => {
        result.value="redacted";
      }
    });

    this.hljs.highlightElement(this.block);
    this.block.outerHTML.should.equal(`<code class="javascript hljs">redacted</code>`);
  })
})
