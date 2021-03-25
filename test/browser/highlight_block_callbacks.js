'use strict';

const {promisify} = require('util');

const {newTestCase, defaultCase, buildFakeDOM } = require('./test_case')

class ContentAdder {
  constructor(params) {
    this.content = params.content;
  }

  'before:highlightElement'({ el, language}) {
    el.innerHTML += this.content;
  }
}

class OldPlugin {
  'before:highlightBlock'({ block, language }) {}
  'after:highlightBlock'({ block, result, text }) {}
}

describe('old highlightBlock plugin', function() {
  it("is upgraded to new API automatically", async function() {
    // we need a stub testcase juts for buildFakeDOM to work
    const testCase = newTestCase({ html: "" });
    await buildFakeDOM.bind(this)(testCase);

    const old = new OldPlugin();
    should(old["after:highlightElement"]).be.undefined();
    should(old["before:highlightElement"]).be.undefined();
    this.hljs.addPlugin(old);
    should(old["after:highlightElement"]).not.be.undefined();
    should(old["before:highlightElement"]).not.be.undefined();
  });
}
);

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

describe('before:highlightElement', function() {
  it('is called', async function() {
    await buildFakeDOM.bind(this)(defaultCase);
    var called = false;
    this.hljs.addPlugin({
      'before:highlightElement': ({el, result}) => {
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
      'before:highlightElement': ({el, language}) => {
        language.should.equal("javascript")
        el.innerHTML = "var a;"
      }
    });

    this.hljs.highlightElement(this.block);
    const actual = this.block.innerHTML;
    actual.should.equal(
      `<span class="hljs-keyword">var</span> a;`);
  });

})

describe('after:highlightElement', function() {
  it('is called', async function() {
    await buildFakeDOM.bind(this)(defaultCase);
    var called = false;
    this.hljs.addPlugin({
      'after:highlightElement': ({el, result}) => {
        called = true;
      }
    });
    this.hljs.highlightElement(this.block);
    called.should.equal(true);
  })
  it('receives result data', async function() {
    await buildFakeDOM.bind(this)(defaultCase);

    this.hljs.addPlugin({
      'after:highlightElement': ({el, result}) => {
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
      'after:highlightElement': ({el, result}) => {
        result.language="basic";
      }
    });

    this.hljs.highlightElement(this.block);
    should(this.block.outerHTML.includes(`class="hljs hljs-basic"`)).equal(true);

  })
  it('can modify result and affect the render output', async function() {
    var test = newTestCase({
      code: "var a = 4;",
      language: "javascript"
    })
    await buildFakeDOM.bind(this)(test);
    this.hljs.addPlugin({
      'after:highlightElement': ({el, result}) => {
        result.value="redacted";
      }
    });

    this.hljs.highlightElement(this.block);
    this.block.outerHTML.should.equal(`<code class="javascript hljs hljs-javascript">redacted</code>`);
  })
})
