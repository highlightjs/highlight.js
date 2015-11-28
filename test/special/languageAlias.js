'use strict';

var _       = require('lodash');
var utility = require('../utility');

describe('language alias', function() {
  before(function() {
    var testHTML = document.querySelectorAll('#language-alias .hljs');

    this.blocks = _.map(testHTML, 'innerHTML');
  });

  it('should highlight as aliased language', function() {
    var filename = utility.buildPath('fixtures', 'expect',
                                     'languagealias.txt'),
        actual   = this.blocks[0];

    return utility.expectedFile(filename, 'utf-8', actual);
  });
});
