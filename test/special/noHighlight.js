'use strict';

describe('no highlighting', function() {
  it('should keep block unchanged', function() {
    var expected = '&lt;div id="contents"&gt;\n  &lt;p&gt;Hello, World!c\n&lt;/div&gt;',
        actual   = document.querySelector('.nohighlight').innerHTML;

    actual.should.equal(expected);
  });

  it('should skip pre tags without a child code tag', function() {
    var expected = 'Computer output',
        actual   = document.querySelector('pre samp').innerHTML;

    actual.should.equal(expected);
  });
});
