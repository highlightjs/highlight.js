'use strict';

var fs      = require('fs');
var utility = require('../utility');

describe('sub-languages', function() {
  before(function() {
    this.block = document.querySelector('#sublanguages');
  });

  it('should highlight XML with PHP and JavaScript', function(done) {
    var filename = utility.buildPath('expect', 'sublanguages.txt'),
        actual   = this.block.innerHTML;

    fs.readFile(filename, 'utf-8',
                utility.handleExpectedFile(actual, done));
  });
});
