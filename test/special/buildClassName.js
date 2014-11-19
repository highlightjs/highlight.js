'use strict';

var blocks;

describe('block class names', function() {
  before(function() {
    var testHTML = document.querySelector('#build-classname');

    blocks = testHTML.querySelectorAll('.hljs');
  });

  it('should add language class name to block', function() {
    var expected = 'some-class hljs xml',
        actual   = blocks[0].className;

    actual.should.equal(expected);
  });

  it('should not clutter block class (first)', function () {
    var expected = 'hljs some-class xml',
        actual   = blocks[1].className;

    actual.should.equal(expected);
  });

  it('should not clutter block class (last)', function () {
    var expected = 'some-class hljs xml',
        actual   = blocks[2].className;

    actual.should.equal(expected);
  });

  it('should not clutter block class (spaces around)', function () {
    var expected = 'hljs some-class xml',
        actual   = blocks[3].className;

    actual.should.equal(expected);
  });
});
