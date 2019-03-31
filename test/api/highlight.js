'use strict';

let hljs   = require('../../build');
let should = require('should');

describe('.highlight()', function() {
  it('should work without continuation', function() {
    const code   = "public void moveTo(int x, int y, int z);";
    const result = hljs.highlight('java', code, false, false);

    result.value.should.equal(
      '<span class="hljs-function"><span class="hljs-keyword">public</span> ' +
      '<span class="hljs-keyword">void</span> <span class="hljs-title">moveTo</span>' +
      '<span class="hljs-params">(<span class="hljs-keyword">int</span> x, ' +
      '<span class="hljs-keyword">int</span> y, ' +
      '<span class="hljs-keyword">int</span> z)</span></span>;'
    );
  });

  it('should work with continuation', function() {
    const code1 = 'var x =';
    const code2 = '    /\w+/;';
    const result1 = hljs.highlight('javascript', code1, true);
    const result2 = hljs.highlight('javascript', code2, true, result1.top);

    result1.value.should.equal('<span class="hljs-keyword">var</span> x =');
    result2.value.should.equal('    <span class="hljs-regexp">/\w+/</span>;');
  });
});
