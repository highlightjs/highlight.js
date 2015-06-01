'use strict';

var _       = require('lodash');
var fs      = require('fs');
var utility = require('../utility');

describe('language alias', function() {
  before(function() {
    var testHTML = document.querySelectorAll('#language-alias .hljs');

    this.blocks = _.map(testHTML, 'innerHTML');
  });

  it('should highlight as aliased language', function() {
    var filename = utility.buildPath('expect', 'languagealias.txt'),

        expected = fs.readFileSync(filename, 'utf-8'),
        actual   = this.blocks[0];

    actual.should.equal(expected);
  });
});
