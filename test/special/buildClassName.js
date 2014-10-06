'use strict';

var fs      = require('fs');
var utility = require('../utility');

var block_with_hljs_class, block_without_hljs_class;

describe('block class names', function() {
  before(function() {
    block_with_hljs_class    = document.getElementById('with-hljs-class');
    block_without_hljs_class = document.getElementById('without-hljs-class');
  });

  it('should add language class name to block', function() {
    var expected = 'hljs xml',
        actual   = block_without_hljs_class.className;

    actual.should.equal(expected);
  });

  it('do not clutter block class name', function() {
    var expected = 'hljs xml',
      actual   = block_with_hljs_class.className;

    actual.should.equal(expected);
  });
});
