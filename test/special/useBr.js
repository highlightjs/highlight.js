'use strict';

var _       = require('lodash');
var fs      = require('fs');
var utility = require('../utility');

describe('use br', function() {
  before(function() {
    var filename = utility.buildPath('expect', 'useBr.txt'),
        testHTML = document.querySelectorAll('#use-br .hljs');

    this.expected = fs.readFileSync(filename, 'utf-8').trim();
    this.blocks   = _.map(testHTML, 'innerHTML');
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
