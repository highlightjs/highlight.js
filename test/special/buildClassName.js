'use strict';

var fs      = require('fs');
var utility = require('../utility');

describe('block class names', function() {
  it('should add language class name to block', function() {
    var expected = 'some-class hljs xml',
        actual   = document.getElementById('without-hljs-class').className;

    actual.should.equal(expected);
  });

  describe('do not clutter block class name', function() {
    it('first', function () {
      var expected = 'hljs some-class xml',
        actual = document.getElementById('with-hljs-class-first').className;

      actual.should.equal(expected);
    });

    it('last', function () {
      var expected = 'some-class hljs xml',
        actual = document.getElementById('with-hljs-class-last').className;

      actual.should.equal(expected);
    });

    it('spaces around', function () {
      var expected = 'hljs some-class xml',
        actual = document.getElementById('with-hljs-class-spaces-around').className;

      actual.should.equal(expected);
    });
  });
});
