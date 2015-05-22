'use strict';

describe('block class names', function() {
  before(function() {
    var testHTML = document.querySelector('#build-classname');

    this.blocks = testHTML.querySelectorAll('.hljs');
  });

  it('should add language class name to block', function() {
    var expected = 'some-class hljs xml',
        actual   = this.blocks[0].className;

    actual.should.equal(expected);
  });

  it('should not clutter block class (first)', function () {
    var expected = 'hljs some-class xml',
        actual   = this.blocks[1].className;

    actual.should.equal(expected);
  });

  it('should not clutter block class (last)', function () {
    var expected = 'some-class hljs xml',
        actual   = this.blocks[2].className;

    actual.should.equal(expected);
  });

  it('should not clutter block class (spaces around)', function () {
    var expected = 'hljs some-class xml',
        actual   = this.blocks[3].className;

    actual.should.equal(expected);
  });
});
