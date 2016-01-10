'use strict';

let _ = require('lodash');

describe('no highlighting', function() {
  before(function() {
    let testHTML = document.querySelectorAll('#no-highlight pre');

    this.blocks   = _.map(testHTML, 'children[0].innerHTML');
    this.expected = {
      html:   '&lt;div id="contents"&gt;\n  ' +
              '&lt;p&gt;Hello, World!\n&lt;/div&gt;',
      python: 'for x in [1, 2, 3]: count(x)',
      javascript: '<span class="hljs-keyword">var</span> x = ' +
                  '<span class="hljs-string">\'foo\'</span>;'
    };
  });

  it('should keep block unchanged (nohighlight)', function() {
    let expected = this.expected.html,
        actual   = this.blocks[0];

    actual.should.equal(expected);
  });

  it('should keep block unchanged (no-highlight)', function() {
    let expected = this.expected.html,
        actual   = this.blocks[1];

    actual.should.equal(expected);
  });

  it('should keep block unchanged (plain)', function() {
    let expected = this.expected.html,
        actual   = this.blocks[2];

    actual.should.equal(expected);
  });

  it('should keep block unchanged (text)', function() {
    let expected = this.expected.html,
        actual   = this.blocks[3];

    actual.should.equal(expected);
  });

  it('should skip pre tags without a child code tag', function() {
    let expected = 'Computer output',
        actual   = this.blocks[4];

    actual.should.equal(expected);
  });

  it('should keep block unchanged (unsupported language)', function() {
    let expected = this.expected.python,
        actual   = this.blocks[5];

    actual.should.equal(expected);
  });

  it('should keep block unchanged (unsupported lang)', function() {
    let expected = this.expected.python,
        actual   = this.blocks[6];

    actual.should.equal(expected);
  });

  it('should keep block unchanged (unsupported prefixed language)', function() {
    let expected = this.expected.python,
        actual   = this.blocks[7];

    actual.should.equal(expected);
  });

  it('should highlight class names containing text at the start', function() {
    let expected = this.expected.javascript,
        actual   = this.blocks[8];

    actual.should.equal(expected);
  });

  it('should highlight class names containing text at the end', function() {
    let expected = this.expected.javascript,
        actual   = this.blocks[9];

    actual.should.equal(expected);
  });
});
