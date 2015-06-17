'use strict';

var fs      = require('fs');
var utility = require('../utility');

describe('use br', function() {
  before(function(done) {
    var filename = utility.buildPath('expect', 'useBr.txt'),
        testHTML = document.querySelectorAll('#use-br .hljs');

    fs.readFile(filename, 'utf-8',
                utility.handleSetup(this, testHTML, done));
  });

  it('should respect <br> tags', function() {
    var actual = this.blocks[0];

    actual.should.equal(this.expected);
  });

  it('should ignore literal new lines', function() {
    var actual = this.blocks[1];

    actual.should.equal(this.expected);
  });

  it('should recognize xml-style <br/>', function() {
    var actual = this.blocks[2];

    actual.should.equal(this.expected);
  });
});
