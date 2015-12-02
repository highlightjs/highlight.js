'use strict';

var utility = require('../utility');

describe('sub-languages', function() {
  before(function() {
    this.block = document.querySelector('#sublanguages');
  });

  it('should highlight XML with PHP and JavaScript', function() {
    var filename = utility.buildPath('fixtures', 'expect',
                                     'sublanguages.txt'),
        actual   = this.block.innerHTML;

    return utility.expectedFile(filename, 'utf-8', actual);
  });
});
