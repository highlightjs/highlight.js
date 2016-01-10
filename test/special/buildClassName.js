'use strict';

let _ = require('lodash');

describe('block class names', function() {
  before(function() {
    const testHTML = document.querySelectorAll('#build-classname .hljs');

    this.blocks = _.map(testHTML, 'className');
  });

  it('should add language class name to block', function() {
    const expected = 'some-class hljs xml',
          actual   = this.blocks[0];

    actual.should.equal(expected);
  });

  it('should not clutter block class (first)', function () {
    const expected = 'hljs some-class xml',
          actual   = this.blocks[1];

    actual.should.equal(expected);
  });

  it('should not clutter block class (last)', function () {
    const expected = 'some-class hljs xml',
          actual   = this.blocks[2];

    actual.should.equal(expected);
  });

  it('should not clutter block class (spaces around)', function () {
    const expected = 'hljs some-class xml',
          actual   = this.blocks[3];

    actual.should.equal(expected);
  });
});
