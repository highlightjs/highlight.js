'use strict';

var fs      = require('fs');
var utility = require('../utility');

describe('use br', function() {
  before(function() {
    var filename = utility.buildPath('expect', 'useBr.txt'),
        testHTML = document.querySelector('#use-br');

    this.expected = fs.readFileSync(filename, 'utf-8').trim();
    this.blocks   = testHTML.querySelectorAll('.hljs');
  });

  it('should replace literal newlines with <br>', function() {
    var actual = this.blocks[0].innerHTML;

    actual.should.equal(this.expected);
  });

  it('should replace literal newlines with <br> (with <br>)', function() {
    var actual = this.blocks[1].innerHTML;

    actual.should.equal(this.expected);
  });

  it('should replace literal newlines with <br> (with <br/>)', function() {
    var actual = this.blocks[2].innerHTML;

    actual.should.equal(this.expected);
  });

  it('should replace literal newlines with <br> (with <br />)', function() {
    var actual = this.blocks[3].innerHTML;

    actual.should.equal(this.expected);
  });
});
