'use strict';

var fs      = require('fs');
var utility = require('../utility');

var blocks;

describe('language alias', function() {
  before(function() {
    blocks = document.querySelectorAll('.hljs');
  });

  it('should highlight as aliased language', function() {
    var filename  = utility.buildPath('expect', 'languagealias.txt'),

        expected = fs.readFileSync(filename, 'utf-8'),
        actual   = blocks[7].innerHTML;

    actual.should.equal(expected);
  });
});
