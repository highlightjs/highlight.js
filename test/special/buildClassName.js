'use strict';

describe('block class names', function() {
  it('should add language class name to block', function() {
    var expected = 'some-class hljs xml',
        actual   = document.getElementById('without-hljs-class').className;

    actual.should.equal(expected);
  });

  it('should not clutter block class (first)', function () {
    var expected = 'hljs some-class xml',
      actual = document.getElementById('with-hljs-class-first').className;

    actual.should.equal(expected);
  });

  it('should not clutter block class (last)', function () {
    var expected = 'some-class hljs xml',
      actual = document.getElementById('with-hljs-class-last').className;

    actual.should.equal(expected);
  });

  it('should not clutter block class (spaces around)', function () {
    var expected = 'hljs some-class xml',
      actual = document.getElementById('with-hljs-class-spaces-around').className;

    actual.should.equal(expected);
  });
});
