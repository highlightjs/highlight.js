'use strict';

let hljs   = require('../../build');
let should = require('should');

describe('.highlight()', function() {
  it('should works without continuation', function() {
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
});
