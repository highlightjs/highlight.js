'use strict';

let _       = require('lodash');
let utility = require('../utility');

describe('custom markup', function() {
  before(function() {
    const testHTML = document.querySelectorAll('#custom-markup .hljs');

    this.blocks = _.map(testHTML, 'innerHTML');
  });

  it('should replace tabs', function() {
    const filename = utility.buildPath('fixtures', 'expect',
                                       'tabreplace.txt'),
          actual   = this.blocks[0];

    return utility.expectedFile(filename, 'utf-8', actual);
  });

  it('should keep custom markup', function() {
    const filename = utility.buildPath('fixtures', 'expect',
                                       'custommarkup.txt'),
          actual   = this.blocks[1];

    return utility.expectedFile(filename, 'utf-8', actual);
  });

  it('should keep custom markup and replace tabs', function() {
    const filename = utility.buildPath('fixtures', 'expect',
                                       'customtabreplace.txt'),
          actual   = this.blocks[2];

    return utility.expectedFile(filename, 'utf-8', actual);
  });

  it('should keep the same amount of void elements (<br>, <hr>, ...)', function() {
    const filename = utility.buildPath('fixtures', 'expect', 'brInPre.txt'),
          actual   = this.blocks[3];

    return utility.expectedFile(filename, 'utf-8', actual);
  });
});
