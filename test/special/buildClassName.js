'use strict';

const _ = require('lodash');

describe('block class names',  () => {
  before( () => {
    const testHTML = document.querySelectorAll('#build-classname .hljs');

    this.blocks = _.map(testHTML, 'className');
  });

  it('should add language class name to block',  () => {
    const expected = 'some-class hljs xml',
          actual   = this.blocks[0];

    actual.should.equal(expected);
  });

  it('should not clutter block class (first)',  () => {
    const expected = 'hljs some-class xml',
          actual   = this.blocks[1];

    actual.should.equal(expected);
  });

  it('should not clutter block class (last)',  () => {
    const expected = 'some-class hljs xml',
          actual   = this.blocks[2];

    actual.should.equal(expected);
  });

  it('should not clutter block class (spaces around)',  () => {
    const expected = 'hljs some-class xml',
          actual   = this.blocks[3];

    actual.should.equal(expected);
  });
});
