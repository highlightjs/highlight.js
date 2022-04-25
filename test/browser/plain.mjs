'use strict';

import {newTestCase, defaultCase, buildFakeDOM } from './test_case.mjs';

describe('plain browser', function() {

  it('should return relevance key', async function() {
    await buildFakeDOM.bind(this, defaultCase)();
    var out = this.hljs.highlight("", { language: "javascript" });
    out.relevance.should.equal(0);
  });

  it('should highlight block', defaultCase.runner);
});
