'use strict';

describe('browser build', function() {
  before(function() {
    this.text   = 'var say = "Hello";class Car {}';
    this.html   = `<pre><code>${this.text}</code></pre>`;
    this.expect = '<span class="hljs-variable"><span class="hljs-keyword">' +
                  'var</span> say</span> = <span class="hljs-string">' +
                  '"Hello"</span>;<span class="hljs-class">' +
                  '<span class="hljs-keyword">class</span> ' +
                  '<span class="hljs-title">Car</span> </span>{}';
  });

  require('./plain');
  require('./worker');
});
