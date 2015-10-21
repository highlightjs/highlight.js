'use strict';

var fs      = require('fs');
var path    = require('path');
var jsdom   = require('jsdom').jsdom;
var utility = require('../utility');
var glob    = require('glob');

describe('browser build', function() {
  before(function(done) {
    // Will match both `highlight.pack.js` and `highlight.min.js`
    var hljsPath = glob.sync(utility.buildPath('..', 'build', 'highlight.*.js'));
    var that     = this;

    jsdom.env(
      '<pre><code>' +
      'var say = "Hello";' +
      'class Car {}' +
      '</code></pre>',
      [hljsPath[0]],
      function(error, window) {
        that.block = window.document.querySelector('pre code');
        that.hljs  = window.hljs;

        done(error);
      }
    );
  });

  it('should highlight block', function() {
    this.hljs.highlightBlock(this.block);

    var actual = this.block.innerHTML;

    actual.should.equal(
      '<span class="hljs-variable"><span class="hljs-keyword">var</span> say</span> = <span class="hljs-string">"Hello"</span>;' +
      '<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Car</span> </span>{}'
    );
  });
});
