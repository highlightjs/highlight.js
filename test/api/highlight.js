'use strict';

var hljs   = require('../../build');
var should = require('should');
describe('.highlight()', function() {
  it('should works without continuation', function() {
    var code = "public void moveTo(int x, int y, int z);";

    var result = hljs.highlight('java', code, false, false);

    result.value.should.equal(
      '<span class="hljs-function"><span class="hljs-keyword">public</span> ' +
      '<span class="hljs-keyword">void</span> <span class="hljs-title">moveTo</span>' +
      '<span class="hljs-params">(<span class="hljs-keyword">int</span> x, ' +
      '<span class="hljs-keyword">int</span> y, ' +
      '<span class="hljs-keyword">int</span> z)</span></span>;'
    );
  });
});
