'use strict';

const {newTestCase, defaultCase, buildFakeDOM } = require('./test_case')

describe('plain browser', function() {

  it('should return relevance key', async function() {
    await buildFakeDOM.bind(this, defaultCase)();
    var out = this.hljs.highlight("", { language: "javascript" });
    out.relevance.should.equal(0);
  });

  it('should highlight block', defaultCase.runner);
});
