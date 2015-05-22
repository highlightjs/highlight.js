'use strict';

var fs      = require('fs');
var utility = require('../utility');

describe('sub-languages', function() {
  before(function() {
    this.block = document.querySelector('#sublanguages');
  });

  it('should highlight XML with PHP and JavaScript', function() {
    var filename = utility.buildPath('expect', 'sublanguages.txt'),

        expected = fs.readFileSync(filename, 'utf-8'),
        actual   = this.block.innerHTML;

    actual.should.equal(expected);
  });
});
