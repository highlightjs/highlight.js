'use strict';

var fs      = require('fs');
var utility = require('../utility');

describe('language alias', function() {
  before(function() {
    var testHTML = document.querySelector('#language-alias');

    this.blocks = testHTML.querySelectorAll('.hljs');
  });

  it('should highlight as aliased language', function() {
    var filename = utility.buildPath('expect', 'languagealias.txt'),

        expected = fs.readFileSync(filename, 'utf-8'),
        actual   = this.blocks[0].innerHTML;

    actual.should.equal(expected);
  });
});
