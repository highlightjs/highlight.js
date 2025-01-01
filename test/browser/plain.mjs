'use strict';

import {newTestCase, defaultCase, buildFakeDOM } from './test_case.mjs';

describe('plain browser', function() {

  it('should do the basics', async function() {
    await buildFakeDOM.bind(this, defaultCase)();
    var out = this.hljs.highlight("for", { language: "javascript" });
    out.value.should.equal("<span class=\"hljs-keyword\">for</span>");
  });

  it('should highlight element', defaultCase.runner);
});
