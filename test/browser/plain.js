'use strict';


const {newTestCase, defaultCase, buildFakeDOM } = require('./test_case')

describe('browser with html with quotes in attributes', function() {
  it('should property escape all quotes', async function() {
    var testCase = newTestCase({
      code: "const oops = pick(employee, <span data-title=\" Type '&quot;height&quot;' is not assignable to type '&quot;name&quot; | &quot;age'&quot; | &quot;profession&quot;'.\">['name', 'height']</span>)\n",
      language: "javascript",
      expect: `<span class="hljs-keyword">const</span> oops = pick(employee, <span data-title=" Type '&quot;height&quot;' is not assignable to type '&quot;name&quot; | &quot;age'&quot; | &quot;profession&quot;'.">[<span class="hljs-string">'name'</span>, <span class="hljs-string">'height'</span>]</span>)\n`
    });

    // can't use before because we need to do setup first
    await buildFakeDOM.bind(this, testCase)();

    this.hljs.highlightBlock(this.block);
    const actual = this.block.innerHTML;
    actual.should.equal(
      testCase.expect
      );
  });
})

describe('plain browser', function() {

  before(async function() { await buildFakeDOM.bind(this, defaultCase)(); });

  it('should return relevance key', function() {
    var out = this.hljs.highlight("javascript","");
    out.relevance.should.equal(0);
  })

  it('should highlight block', function() {
    this.hljs.highlightBlock(this.block);

    const actual = this.block.innerHTML;

    actual.should.equal(defaultCase.expect);
  });
});
