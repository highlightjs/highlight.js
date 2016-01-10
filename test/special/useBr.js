'use strict';

let utility = require('../utility');

describe('use br', function() {
  before(function() {
    let filename = utility.buildPath('fixtures', 'expect', 'useBr.txt'),
        testHTML = document.querySelectorAll('#use-br .hljs');

    return utility.setupFile(filename, 'utf-8', this, testHTML);
  });

  it('should respect <br> tags', function() {
    let actual = this.blocks[0];

    actual.should.equal(this.expected);
  });

  it('should ignore literal new lines', function() {
    let actual = this.blocks[1];

    actual.should.equal(this.expected);
  });

  it('should recognize xml-style <br/>', function() {
    let actual = this.blocks[2];

    actual.should.equal(this.expected);
  });
});
