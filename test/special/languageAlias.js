'use strict';

let _       = require('lodash');
let utility = require('../utility');

describe('language alias', function() {
  before(function() {
    const testHTML = document.querySelectorAll('#language-alias .hljs');

    this.blocks = _.map(testHTML, 'innerHTML');
  });

  it('should highlight as aliased language', function() {
    const filename = utility.buildPath('fixtures', 'expect',
                                       'languagealias.txt'),
          actual   = this.blocks[0];

    return utility.expectedFile(filename, 'utf-8', actual);
  });
});
