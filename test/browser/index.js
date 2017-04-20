'use strict';

describe('browser build', function() {
  before(function() {
    this.text   = 'var say = "Hello";';
    this.html   = `<pre><code class="javascript">${this.text}</code></pre>`;
    this.expect = '<span class="hljs-keyword">' +
                  'var</span> say = <span class="hljs-string">' +
                  '"Hello"</span>;';
  });

  require('./plain');
  require('./worker');
});
