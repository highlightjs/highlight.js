'use strict';

describe('no highlighting', function() {
  it('should keep block unchanged (nohighlight)', function() {
    var expected = '&lt;div id="contents"&gt;\n  ' +
                   '&lt;p&gt;Hello, World!\n&lt;/div&gt;',
        actual   = document.querySelector('.nohighlight').innerHTML;

    actual.should.equal(expected);
  });

  it('should keep block unchanged (no-highlight)', function() {
    var expected = '&lt;div id="contents"&gt;\n  ' +
                   '&lt;p&gt;Hello, World!\n&lt;/div&gt;',
        actual   = document.querySelector('.no-highlight').innerHTML;

    actual.should.equal(expected);
  });

  it('should keep block unchanged (plain)', function() {
      var expected = '&lt;div id="contents"&gt;\n  ' +
                     '&lt;p&gt;Hello, World!\n&lt;/div&gt;',
          actual   = document.querySelector('.plain').innerHTML;

      actual.should.equal(expected);
  });

  it('should keep block unchanged (text)', function() {
      var expected = '&lt;div id="contents"&gt;\n  ' +
                     '&lt;p&gt;Hello, World!\n&lt;/div&gt;',
          actual   = document.querySelector('.text').innerHTML;

      actual.should.equal(expected);
  });

  it('should skip pre tags without a child code tag', function() {
    var expected = 'Computer output',
        actual   = document.querySelector('pre samp').innerHTML;

    actual.should.equal(expected);
  });
});
