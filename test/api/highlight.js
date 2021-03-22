'use strict';

const hljs   = require('../../build');
const should = require('should');

describe('.highlight()', () => {
  it('should support ignoreIllegals (old API)', () => {
    let code = "float # float";
    let result = hljs.highlight("java", code, true);
    result.value.should.equal(`<span class="hljs-keyword">float</span> # <span class="hljs-keyword">float</span>`);

    code = "float # float";
    result = hljs.highlight("java", code, false);
    result.value.should.equal("float # float");
    result.illegal.should.equal(true);
  });
  it('should support ignoreIllegals (new API)', () => {
    let code = "float # float";
    let result = hljs.highlight(code, { language: "java", ignoreIllegals: true });
    result.value.should.equal(`<span class="hljs-keyword">float</span> # <span class="hljs-keyword">float</span>`);

    code = "float # float";
    result = hljs.highlight(code, { language: "java", ignoreIllegals: false });
    result.value.should.equal("float # float");
    result.illegal.should.equal(true);

    // defaults to false
    code = "float # float";
    result = hljs.highlight(code, { language: "java" });
    result.value.should.equal("float # float");
    result.illegal.should.equal(true);
  });
  it('should use new API with options', () => {
    const code = "public void moveTo(int x, int y, int z);";
    const result = hljs.highlight(code, { language: "java" });

    result.value.should.equal(
      '<span class="hljs-function"><span class="hljs-keyword">public</span> ' +
      '<span class="hljs-keyword">void</span> <span class="hljs-title">moveTo</span>' +
      '<span class="hljs-params">(<span class="hljs-keyword">int</span> x, ' +
      '<span class="hljs-keyword">int</span> y, ' +
      '<span class="hljs-keyword">int</span> z)</span></span>;'
    );
  });
  it('should works without continuation', () => {
    const code = "public void moveTo(int x, int y, int z);";
    const result = hljs.highlight(code, { language: 'java' });

    result.value.should.equal(
      '<span class="hljs-function"><span class="hljs-keyword">public</span> ' +
      '<span class="hljs-keyword">void</span> <span class="hljs-title">moveTo</span>' +
      '<span class="hljs-params">(<span class="hljs-keyword">int</span> x, ' +
      '<span class="hljs-keyword">int</span> y, ' +
      '<span class="hljs-keyword">int</span> z)</span></span>;'
    );
  });
});
